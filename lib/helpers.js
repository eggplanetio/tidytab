import packageJson from '../package.json'
import store from '../app/store/index.js'

import ChromePromise from 'chrome-promise'
const chromep = new ChromePromise()

export function isTidyExtensionTab (tab) {
  return tab.url.startsWith('chrome-extension') && tab.title.startsWith(packageJson.name)
}

export async function alreadyTidiedTab (tab) {
  const tidied = await chromep.bookmarks.search({ url: tab.url })
  return tidied.length
}

export async function viewDashboard (window) {
  const tabs = await chromep.tabs.getAllInWindow(window.id)
  const isShowingDashboard = tabs[0] && tabs[0].title === 'TidyTab – Dashboard'
  const url = chrome.extension.getURL('pages/dashboard.html')
  if (!isShowingDashboard) {
    await chromep.tabs.create({ url, pinned: true, index: 0 })
  }
  chrome.tabs.highlight({ tabs: [0] })
}

export function shouldTidy (tab) {
  return tab.pinned || isTidyExtensionTab(tab)
}

export async function openNewTab () {
  const url = 'chrome://newtab'
  await chromep.tabs.create({ url })
}

export async function removeTabs (tabs, action = () => { }, window) {
  const firstSet = tabs.slice(0, tabs.length - 1)
  await chromep.tabs.remove(firstSet.map(t => t.id))
  await action(window)
  await chromep.tabs.remove(tabs[tabs.length - 1].id)
}

export async function tidy (window) {
  const tabs = await store.dispatch('SAVE_TAB_GROUP', { filter: () => true, window })

  let action
  if (store.state.postTidyBehavior === 'new-tab') {
    action = openNewTab
  } else {
    action = viewDashboard
  }

  removeTabs(tabs, action, window)
}

export async function tidyRight ({ window }) {
  const currentTab = await chromep.tabs.getSelected(window.id)
  const filter = (tab) => tab.index > currentTab.index

  const tabs = await store.dispatch('SAVE_TAB_GROUP', { filter, window })
  removeTabs(tabs)
}

export async function tidyLeft ({ window }) {
  const currentTab = await chromep.tabs.getSelected(window.id)
  const filter = (tab) => tab.index < currentTab.index

  const tabs = await store.dispatch('SAVE_TAB_GROUP', { filter, window })
  removeTabs(tabs)
}

export async function tidyCurrent ({ window }) {
  const currentTab = await chromep.tabs.getSelected(window.id)
  const filter = (tab) => tab.index === currentTab.index

  const tabs = await store.dispatch('SAVE_TAB_GROUP', { filter, window })
  removeTabs(tabs)
}

export async function tidyAllButCurrent ({ window }) {
  const currentTab = await chromep.tabs.getSelected(window.id)
  const filter = (tab) => (tab.index < currentTab.index) || (tab.index > currentTab.index)
  const tabs = await store.dispatch('SAVE_TAB_GROUP', { filter, window })
  removeTabs(tabs)
}

export async function clear ({ window }) {
  let tabs = await chromep.tabs.getAllInWindow(window.id)
  tabs = tabs.filter(tab => !shouldTidy(tab))

  viewDashboard(window)
  removeTabs(tabs)
}
