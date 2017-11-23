import moment from 'moment'

export function filteredAndSorted (tabGroups) {
  const sorted = tabGroups
    .filter(t => t.tabs.length > 0)
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)) || []

  return sorted
}

export function groupByDate (tabGroups) {
  const days = {}

  tabGroups.forEach(tabGroup => {
    const date = moment(tabGroup.dateAdded).format('MMDDYYYY')

    days[date] = days[date] || {
      dateAdded: tabGroup.dateAdded,
      tabs: []
    }

    days[date].tabs = days[date].tabs.concat(tabGroup.tabs)
  })

  const groups = Object.values(days)
  return filteredAndSorted(groups)
}

export function filteredUsingSearchQuery (searchQuery, tabGroups) {
  const q = searchQuery.toLowerCase()

  return tabGroups
    .filter(tabGroup => {
      if (!q.length) return true

      const hasQuery = tabGroup.tabs.find(
        tab =>
          tab.title.toLowerCase().includes(q) ||
          tab.url.toLowerCase().includes(q)
      )
      return !!hasQuery
    })
    .map(tabGroup => {
      if (!q) return tabGroup
      tabGroup.tabs = tabGroup.tabs.filter(tab => {
        const doesMatch =
          tab.title.toLowerCase().includes(q) ||
          tab.url.toLowerCase().includes(q)
        return doesMatch
      })

      return tabGroup
    }) || []
}
