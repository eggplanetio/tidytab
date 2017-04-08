// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly';

import 'babel-polyfill';
import ChromePromise from 'chrome-promise';
const chromep = new ChromePromise()

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: ''});

chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);
});
