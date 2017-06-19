import Vue from 'vue'
import Vuex from 'vuex'

import BookmarkManager from '../../lib/bookmark-manager.js'
import {
  alreadyTidiedTab,
  shouldTidy
} from '../../lib/helpers.js'

import ChromePromise from 'chrome-promise'
import packageJson from '../../package.json'

import {
  filteredAndSorted,
  groupByDate,
  filteredUsingSearchQuery
} from '../../lib/tab-group-helpers'

Vue.use(Vuex)
const chromep = new ChromePromise()

export const THEMES = ['dark', 'light']
export const POST_TIDY_BEHAVIORS = ['dashboard', 'new-tab']
export const TAB_GROUP_VIEWS = ['default', 'group-by-date']

const store = new Vuex.Store({
  state: {
    version: packageJson.version,
    stateVersion: packageJson.version.split('.')[0],
    data: {
      tabGroups: []
    },
    searchQuery: '',
    theme: '',
    bookmarkFolderId: null,
    postTidyBehavior: null,
    silentlyRejectDuplicates: null,
    tabGroupView: null
  },

  actions: {
    async SAVE_TAB_GROUP (
      { commit, dispatch, state },
      { filter } = { filter: () => true }
    ) {
      const currentWindow = await chromep.windows.getCurrent({})

      let tabsToClear = await chromep.tabs.getAllInWindow(currentWindow.id)
      tabsToClear = tabsToClear.filter(tab => !shouldTidy(tab)).filter(filter)

      let tabsToSave = []
      if (state.silentlyRejectDuplicates) {
        let tabsToSaveHash = {}
        for (let tab of tabsToClear) {
          const tidied = await alreadyTidiedTab(tab)
          if (!tidied) tabsToSaveHash[tab.url] = tab
        }
        tabsToSave = Object.values(tabsToSaveHash)
      } else {
        tabsToSave = tabsToClear
      }

      if (tabsToClear.length === 0) return tabsToClear

      const tidyParent = await BookmarkManager.getTidyFolder()
      const newFolder = await chromep.bookmarks.create({
        title: BookmarkManager.newId(),
        parentId: tidyParent.id
      })

      for (let tab of tabsToSave) {
        await chromep.bookmarks.create({
          parentId: newFolder.id,
          title: tab.title,
          url: tab.url
        })
      }

      dispatch('HYDRATE_STATE')
      return tabsToClear
    },

    async DELETE_TAB_GROUP ({ commit, dispatch }, group) {
      await BookmarkManager.removeTabGroup(group)
      dispatch('HYDRATE_STATE')
    },

    async DELETE_TAB ({ commit, dispatch }, tab) {
      await BookmarkManager.deleteTab(tab)
      dispatch('HYDRATE_STATE')
    },

    async IMPORT_DATA ({ dispatch, commit }, raw) {
      await BookmarkManager.import(raw)
      dispatch('HYDRATE_STATE')
    },

    async HYDRATE_STATE ({ commit }) {
      const tabGroups = await BookmarkManager.tabGroupsFromBookmarks()
      commit('SET_DATA', { tabGroups })

      const items = await chromep.storage.local.get([
        'theme',
        'bookmarkFolderId',
        'postTidyBehavior',
        'silentlyRejectDuplicates',
        'tabGroupView'
      ])
      commit('SET_THEME', items.theme || 'light')
      commit('SET_BOOKMARK_FOLDER_ID', items.bookmarkFolderId)
      commit('SET_POST_TIDY_BEHAVIOR', items.postTidyBehavior || POST_TIDY_BEHAVIORS[0])
      commit('SET_SILENTLY_REJECT_DUPLICATES', items.silentlyRejectDuplicates)
      commit('SET_TAB_GROUP_VIEW', items.tabGroupView || TAB_GROUP_VIEWS[0])
    }
  },

  mutations: {
    SET_DATA (state, data) {
      state.data = data
    },

    SET_THEME (state, theme) {
      state.theme = theme
      chromep.storage.local.set({ theme })
    },

    SET_BOOKMARK_FOLDER_ID (state, id) {
      state.bookmarkFolderId = id
      chromep.storage.local.set({ bookmarkFolderId: id })
    },

    SET_POST_TIDY_BEHAVIOR (state, value) {
      state.postTidyBehavior = value
      chromep.storage.local.set({ postTidyBehavior: value })
    },

    SET_TAB_GROUP_VIEW (state, value) {
      state.tabGroupView = value
      chromep.storage.local.set({ tabGroupView: value })
    },

    SET_SILENTLY_REJECT_DUPLICATES (state, value) {
      state.silentlyRejectDuplicates = value
      chromep.storage.local.set({ silentlyRejectDuplicates: value })
    },

    SET_SEARCH_QUERY (state, query) {
      state.searchQuery = query
    }

  },

  getters: {
    sortedAndFilteredTabGroups: state => {
      let groups = state.data.tabGroups
      groups = filteredAndSorted(groups)
      if (state.tabGroupView === 'group-by-date') groups = groupByDate(groups)
      return filteredUsingSearchQuery(state.searchQuery, groups)
    }
  }
})

//
// Hydrate on app start.
//
const hydrate = async () => {
  await store.dispatch('HYDRATE_STATE')

  if (!THEMES.includes(store.state.theme)) {
    store.commit('SET_THEME', 'light')
  }
}
hydrate()

//
// Hydrate whenever chrome state changes or whenever we come back to the dashboard.
//
const bindListeners = async () => {
  const currentTab = await chromep.tabs.getCurrent()

  chrome.tabs && chrome.tabs.onHighlighted.addListener(changedWindow => {
    if (changedWindow.tabIds[0] !== currentTab.id) return
    store.dispatch('HYDRATE_STATE')
  })

  window.addEventListener('focus', () => {
    store.dispatch('HYDRATE_STATE')
  })

  chrome.storage.onChanged.addListener(() => {
    store.dispatch('HYDRATE_STATE')
  })
}

bindListeners()

export default store
