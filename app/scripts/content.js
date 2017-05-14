
function tidy () {
  chrome.runtime.sendMessage({ message: 'tidy' })
}

const map = {}
document.addEventListener('keydown', e => {
  const slug = `${e.shiftKey ? '⇧-' : ''}${e.ctrlKey ? '⌥-' : ''}${e.metaKey ? '⌘-' : ''}${e.key}`
  map[slug] = map[slug] || []
  map[slug].forEach(clearTimeout)
  map[slug].push(setTimeout(() => delete map[slug], 300))

  const isDoubleKeypress = map[slug].length === 2
  const isOptT = slug === '†'

  if (isDoubleKeypress && isOptT) {
    console.log(`Tidying via keypress!`)
    tidy()
  }
})
