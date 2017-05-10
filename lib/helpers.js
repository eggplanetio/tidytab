import packageJson from '../package.json';
import store from '../app/store/index.js';

import ChromePromise from 'chrome-promise';
const chromep = new ChromePromise()

export function isTidyExtensionTab(tab) {
  return tab.url.startsWith('chrome-extension') && tab.title.startsWith(packageJson.name)
}

export function shouldTidy(tab) {
  return tab.pinned || isTidyExtensionTab(tab)
}

export async function viewDashboard () {
  const currentWindow = await chromep.windows.getCurrent({});
  const tabs = await chromep.tabs.getAllInWindow(currentWindow.id);
  const isShowingDashboard = tabs[0].title === "TidyTab – Dashboard";
  const url = chrome.extension.getURL('pages/dashboard.html');
  if (!isShowingDashboard) {
    await chromep.tabs.create({ url, pinned: true, index: 0 });
  }
  chrome.tabs.highlight({ tabs: [0] });
}

export async function openNewTab () {
  const url = "chrome://newtab";
  await chromep.tabs.create({ url });
}

export async function removeTabs (tabs) {
  await chromep.tabs.remove(tabs.map(t => t.id));
}

export async function tidy () {
  const tabs = await store.dispatch('SAVE_TAB_GROUP');

  if (store.state.postTidyBehavior === 'new-tab') {
    openNewTab();
  } else {
    viewDashboard();
  }

  removeTabs(tabs);
}

export async function tidyRight () {
  const currentWindow = await chromep.windows.getCurrent({});
  const currentTab = await chromep.tabs.getSelected(currentWindow.id);
  const filter = (tab) => tab.index > currentTab.index;
  const tabs = await store.dispatch('SAVE_TAB_GROUP', { filter: filter });
  removeTabs(tabs);
}

export async function tidyLeft () {
  const currentWindow = await chromep.windows.getCurrent({});
  const currentTab = await chromep.tabs.getSelected(currentWindow.id);
  const filter = (tab) => tab.index < currentTab.index;

  const tabs = await store.dispatch('SAVE_TAB_GROUP', { filter });
  removeTabs(tabs);
}

export async function tidyCurrent () {
  const currentWindow = await chromep.windows.getCurrent({});
  const currentTab = await chromep.tabs.getSelected(currentWindow.id);
  const filter = (tab) => tab.index === currentTab.index;

  const tabs = await store.dispatch('SAVE_TAB_GROUP', { filter });
  removeTabs(tabs);
}

export async function tidyAllButCurrent () {
  const currentWindow = await chromep.windows.getCurrent({});
  const currentTab = await chromep.tabs.getSelected(currentWindow.id);
  const filter = (tab) => (tab.index < currentTab.index) || (tab.index > currentTab.index);

  const tabs = await store.dispatch('SAVE_TAB_GROUP', { filter });
  removeTabs(tabs);
}

export async function clear () {
  const currentWindow = await chromep.windows.getCurrent({});
  let tabs = await chromep.tabs.getAllInWindow(currentWindow.id);
  tabs = tabs.filter(tab => !shouldTidy(tab));
  viewDashboard();
  removeTabs(tabs);
}
