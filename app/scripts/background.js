// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly';

import 'babel-polyfill'

import {
  tidyAllButCurrent,
  tidyCurrent,
  tidyLeft,
  tidyRight,
  tidy,
  viewDashboard
} from '../../lib/helpers.js'

const isDevMode = () => !('update_url' in chrome.runtime.getManifest())
if (isDevMode) {
  chrome.browserAction.setBadgeText({ text: '' })
}

chrome.runtime.onMessage.addListener(async ({ message, data }) => {
  console.log('Message received!', message, data)

  if (message === 'tidy' && data.which === 'right') {
    await tidyRight(data)
    return
  }

  if (message === 'tidy' && data.which === 'left') {
    await tidyLeft(data)
    return
  }

  if (message === 'tidy' && data.which === 'allButCurrent') {
    await tidyAllButCurrent(data)
    return
  }

  if (message === 'tidy' && data.which === 'current') {
    await tidyCurrent(data)
    return
  }

  if (message === 'tidy') {
    await tidy(data)
    return
  }

  if (message === 'viewDashboard') {
    await viewDashboard(data)
  }
})
