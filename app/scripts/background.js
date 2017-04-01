// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly';
import ChromePromise from 'chrome-promise';
const chromep = new ChromePromise();

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: ''});

chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
});

setInterval(() => {
  chrome.tabs.getCurrent((tab) => {
      chrome.windows.getCurrent(w => chrome.tabs.getAllInWindow(w.id, t => console.log(t)));
    });
}, 2500);
