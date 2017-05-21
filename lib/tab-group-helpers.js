import moment from 'moment'

export function filteredAndSorted (tabGroups) {
  return tabGroups
    .filter(t => t.tabs.length > 0)
    .sort((a, b) => b.dateAdded - a.dateAdded) || []
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

  return Object.values(days)
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
