// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly';

import 'babel-polyfill';
import ChromePromise from 'chrome-promise';
const chromep = new ChromePromise()

const viewDashboard = async () => {
  const currentWindow = await chromep.windows.getCurrent({});
  const tabs = await chromep.tabs.getAllInWindow(currentWindow.id);
  const isShowingDashboard = tabs[0].title === "TidyTab – Dashboard";
  if (!isShowingDashboard) {
    await chromep.tabs.create({ url: this.dashboardURL, pinned: true, index: 0 });
  }
  chrome.tabs.highlight({ tabs: [0] });
};

chrome.runtime.onMessage.addListener(async event => {
  console.log('Message received!', event);

  if (event.message === 'viewDashboard') {
    await viewDashboard();
  }

  if (event.message === 'removeTabs') {
    if (event.data.viewDashboard) await viewDashboard();
    await chromep.tabs.remove(event.data.tabIds);
  }
});

