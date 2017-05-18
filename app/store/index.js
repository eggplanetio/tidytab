import Vue from 'vue'
import Vuex from 'vuex'

import BookmarkManager from '../../lib/bookmark-manager.js'
import { shouldTidy } from '../../lib/helpers.js'

import ChromePromise from 'chrome-promise'
import packageJson from '../../package.json'

Vue.use(Vuex)
const chromep = new ChromePromise()

export const THEMES = ['dark', 'light']

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
    postTidyBehavior: null
  },

  actions: {
    async SAVE_TAB_GROUP (
      { commit, dispatch },
      { filter } = { filter: () => true }
    ) {
      const currentWindow = await chromep.windows.getCurrent({})
      let tabs = await chromep.tabs.getAllInWindow(currentWindow.id)
      tabs = tabs.filter(tab => !shouldTidy(tab)).filter(filter)

      if (tabs.length < 1) return tabs

      const tidyParent = await BookmarkManager.getTidyFolder()
      const newFolder = await chromep.bookmarks.create({
        title: BookmarkManager.newId(),
        parentId: tidyParent.id
      })

      tabs.forEach(async tab => {
        await chromep.bookmarks.create({
          parentId: newFolder.id,
          title: tab.title,
          url: tab.url
        })
      })

      dispatch('HYDRATE_STATE')
      return tabs
    },

    async DELETE_TAB_GROUP ({ commit, dispatch }, dateAdded) {
      await BookmarkManager.removeTabGroup(dateAdded)
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

      const items = await chromep.storage.local.get(['theme', 'bookmarkFolderId', 'postTidyBehavior'])
      commit('SET_THEME', items.theme || 'light')
      commit('SET_BOOKMARK_FOLDER_ID', items.bookmarkFolderId)
      commit('SET_POST_TIDY_BEHAVIOR', items.postTidyBehavior || 'dashboard')
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

    SET_SEARCH_QUERY (state, query) {
      state.searchQuery = query
    }
  },

  getters: {
    sortedAndFilteredTabGroups: state => {
      const q = state.searchQuery.toLowerCase()

      const tabGroups = state.data.tabGroups
        .filter(t => t.tabs.length > 0)
        .filter(tabGroup => {
          if (!q.length) return true

          const hasQuery = tabGroup.tabs.find(
            tab =>
              tab.title.toLowerCase().includes(q) ||
              tab.url.toLowerCase().includes(q)
          )
          return !!hasQuery
        })
        .sort((a, b) => b.dateAdded - a.dateAdded)
        .map(tabGroup => {
          if (!q) return tabGroup
          tabGroup.tabs = tabGroup.tabs.filter(tab => {
            const doesMatch =
              tab.title.toLowerCase().includes(q) ||
              tab.url.toLowerCase().includes(q)
            return doesMatch
          })

          return tabGroup
        })

      return tabGroups || []
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
