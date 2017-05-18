import BookmarkTitleParser from './bookmark-title-parser.js'
import ChromePromise from 'chrome-promise'
const chromep = new ChromePromise()

const OTHER_BOOKMARKS_ID = '2'

const sleep = (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), duration)
  })
}

export default {

  async import (raw) {
    const tidyParent = await this.getTidyFolder()

    for (let tabGroup of raw.data.tabGroups) {
      await sleep(1) // Get unique IDs when imported.
      const tabGroupParent = await chromep.bookmarks.create({
        title: this.newId(),
        parentId: tidyParent.id
      })

      for (let tab of tabGroup.tabs) {
        await chromep.bookmarks.create({
          parentId: tabGroupParent.id,
          title: tab.title,
          url: tab.url
        })
      };
    };
  },

  async getTidyFolder () {
    const items = await chromep.storage.local.get(['bookmarkFolderId'])
    let id = items.bookmarkFolderId

    if (typeof id === 'string') {
      const bookmarkArray = await chromep.bookmarks.getSubTree(id)
      return bookmarkArray[0]
    }

    id = OTHER_BOOKMARKS_ID
    const otherBookmarksSubTreeArray = await chromep.bookmarks.getSubTree(id)
    const otherBookmarksSubTree = otherBookmarksSubTreeArray[0]
    let tidyParent = otherBookmarksSubTree.children.find(c => c.title === 'TidyTab')
    if (!tidyParent) tidyParent = await chromep.bookmarks.create({ title: 'TidyTab' })
    return tidyParent
  },

  async findTabGroupByDateAdded (dateAdded) {
    const tidyParent = await this.getTidyFolder()
    return tidyParent.children.find(c => c.dateAdded === dateAdded)
  },

  async removeTabGroup (group) {
    await chromep.bookmarks.removeTree(group.id)
  },

  async deleteTab (tab) {
    await chromep.bookmarks.remove(tab.id)

    const tree = await chromep.bookmarks.getSubTree(tab.parentId)
    const parent = tree[0]
    const isLastTab = parent.children.length === 0

    if (isLastTab) await this.removeTabGroup(parent)
  },

  async tabGroupsFromBookmarks () {
    const tidyParent = await this.getTidyFolder()
    const tidyTree = await chromep.bookmarks.getSubTree(tidyParent.id)

    return tidyTree[0].children.map(parent => {
      const titleParser = new BookmarkTitleParser(parent.title)
      return {
        name: titleParser.name(),
        timestamp: titleParser.timestamp(),
        dateAdded: parent.dateAdded,
        tabs: parent.children
      }
    })
  },

  newId () {
    return new Date().getTime().toString()
  },

  async getBookmarkFolders () {
    const allBookmarks = await chromep.bookmarks.getTree()

    function constructFoldersArray (children, name, folders = []) {
      children.forEach(child => {
        const parentName = name ? [name, child.title].join(' / ') : child.title
        if (child.children) constructFoldersArray(child.children, parentName, folders)

        const isOtherBookmarksOrBookmarksFolder = [1, 2].includes(parseInt(child.id))
        const isBookmark = 'url' in child
        if (isOtherBookmarksOrBookmarksFolder || isBookmark) return

        folders.push({ label: parentName, value: child.id })
      })

      return folders
    }

    return constructFoldersArray(allBookmarks[0].children, '')
  }

}
