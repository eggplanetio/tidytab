import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import BookmarkManager from '../../lib/bookmark-manager.js';
import tidyHelpers from '../../lib/helpers.js'

import ChromePromise from 'chrome-promise';
const chromep = new ChromePromise();

import merge from 'deepmerge';
import packageJson from '../../package.json';

const store = new Vuex.Store({

  state: {
    version: packageJson.version,
    stateVersion: packageJson.version.split('.')[0],
    data: {
      tabGroups: []
    }
  },

  actions: {
    async SAVE_TAB_GROUP ({ commit, dispatch }, { filter } = { filter: () => true }) {
      const currentWindow = await chromep.windows.getCurrent({});
      let tabs = await chromep.tabs.getAllInWindow(currentWindow.id);
      tabs = tabs
        .filter(tab => !tidyHelpers.isTidyExtensionTab(tab))
        .filter(filter);

      if (tabs.length < 1) return tabs;

      const tidyParent = await BookmarkManager.getTidyParent();
      const tabGroupParent = await chromep.bookmarks.create({
        title: BookmarkManager.newId(),
        parentId: tidyParent.id
      });

      tabs.forEach(async (tab) => {
        await chromep.bookmarks.create({
          parentId: tabGroupParent.id,
          title: tab.title,
          url: tab.url
        });
      });

      return tabs;
      dispatch('HYDRATE_STATE');
    },

    async DELETE_TAB_GROUP ({ commit, dispatch }, dateAdded) {
     await BookmarkManager.removeTabGroup(dateAdded)
      dispatch('HYDRATE_STATE');
    },
    async DELETE_TAB ({ commit, dispatch }, { tabGroup, dateAdded }) {
     await BookmarkManager.removeTabFromTabGroup(tabGroup, dateAdded)
      dispatch('HYDRATE_STATE');
    },
    async IMPORT_DATA ({ dispatch, commit }, raw) {
      await BookmarkManager.import(raw);
      dispatch('HYDRATE_STATE');
    },
    async HYDRATE_STATE ({ commit }) {
      const tabGroups = await BookmarkManager.tabGroupsFromBookmarks();
      commit('SET_DATA', { tabGroups });
    },
  },

  mutations: {
    SET_DATA (state, data) {
      state.data = data;
    },
  },

  getters: {
    sortedTabGroups: state => {
      const groups = state.data.tabGroups
      .filter(t => t.tabs.length > 0)
      .sort((a, b) => a.dateAdded < b.dateAdded)
      .reverse()
      .reverse(/* ¯\_(ツ)_/¯ */);

      return groups;
    },
  }

});

store.dispatch('HYDRATE_STATE');

const bindListeners = async () => {
  const currentTab = await chromep.tabs.getCurrent()

  chrome.tabs.onHighlighted.addListener(changedWindow => {
    if (changedWindow.tabIds[0] !== currentTab.id) return;
    store.dispatch('HYDRATE_STATE');
  });

  window.addEventListener('focus', () => {
    store.dispatch('HYDRATE_STATE');
  });
}

bindListeners();

export default store
