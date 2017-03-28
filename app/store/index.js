import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import ChromePromise from 'chrome-promise';
const chromep = new ChromePromise()

import packageJson from '../../package.json';
const stateVersion = packageJson.version.split('.')[0]; // v1.0.2 => state version 1

const store = new Vuex.Store({

  state: {
    version: stateVersion,
    data: {
      tabGroups: []
    }
  },

  actions: {
    async SAVE_TAB_GROUP ({ commit, dispatch }) {
      const currentWindow = await chromep.windows.getCurrent({});
      const tabs = await chromep.tabs.getAllInWindow(currentWindow.id);
      const filtered = tabs.filter(tab => !tab.title.startsWith(packageJson.name))
      const tabGroup = {
        createdAt: new Date().toString(),
        tabs: filtered
      };
      if (filtered.length < 1) return tabGroup;
      commit('CREATE_TAB_GROUP', tabGroup);
      dispatch('PERSIST_STATE');
      return tabGroup;
    },
    async HYDRATE_STATE ({ commit }) {
      const storage = await chromep.storage.local.get('tidyData');
      const isEmpty = Object.keys(storage).length === 0;
      if (isEmpty) return;
      commit('SET_DATA', storage.tidyData);
    },
    async PERSIST_STATE ({ commit, state }) {
      chrome.storage.local.set({ tidyData: state.data });
    },
    async DELETE_TAB_GROUP ({ commit, dispatch }, { createdAt }) {
      commit('DELETE_TAB_GROUP', createdAt);
      dispatch('PERSIST_STATE');
    },
    async DELETE_TAB ({ commit, dispatch }, { tab, createdAt }) {
      commit('REMOVE_TAB_FROM_GROUP', {tab, createdAt});
      dispatch('PERSIST_STATE');
    }
  },

  mutations: {
    SET_DATA (state, data) {
      state.data = data;
    },
    CREATE_TAB_GROUP (state, tabGroup) {
      state.data.tabGroups = state.data.tabGroups.concat([ tabGroup ])
    },
    DELETE_TAB_GROUP (state, createdAt) {
      const tabGroups = state.data.tabGroups;
      const newTabGroups = tabGroups.filter(t => t.createdAt !== createdAt);
      state.data.tabGroups = newTabGroups;
    },
    REMOVE_TAB_FROM_GROUP (state, {tab, createdAt}) {
      const tabGroups = state.data.tabGroups;
      let tabIndex = tabGroups.findIndex(t => t.createdAt === createdAt)
      let newTabGroups = tabGroups
      newTabGroups[tabIndex].tabs = newTabGroups[tabIndex].tabs.filter(t => t.url !== tab.url);
      if (newTabGroups[tabIndex].tabs.length < 1) newTabGroups.splice(tabIndex, 1);
      
      state.data.tabGroups = newTabGroups;
    },
  },

  getters: {
    sortedTabGroups: state => {
      return state.data.tabGroups.sort((a, b) =>
        Date.parse(a.createdAt) < Date.parse(b.createdAt)
      )
    }
  }

});

store.dispatch('HYDRATE_STATE');

chrome.storage.onChanged.addListener(() => {
  store.dispatch('HYDRATE_STATE');
})

export default store
