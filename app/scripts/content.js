function tidy () {
  chrome.runtime.sendMessage({ message: 'tidy' })
}

function viewDashboard () {
  chrome.runtime.sendMessage({ message: 'viewDashboard' })
}

const map = {}
document.addEventListener('keydown', e => {
  const slug = `${e.shiftKey ? '⇧-' : ''}${e.ctrlKey ? '⌥-' : ''}${e.metaKey ? '⌘-' : ''}${e.key}`
  map[slug] = map[slug] || []
  map[slug].forEach(clearTimeout)
  map[slug].push(setTimeout(() => delete map[slug], 300))

  const isDoubleKeypress = map[slug].length === 2
  const isOptT = slug === '†'
  const dashboardSequence = ['†', '¥']
  const isDashboardSequence = dashboardSequence
    .map(s => map[s] && map[s].length)
    .every(Boolean)

  if (isDoubleKeypress && isOptT) {
    tidy()
  }

  if (isDashboardSequence) {
    viewDashboard()
  }
})
