
const DELIMITER = '|'

const PARTS_INDICES = {
  timestamp: 0,
  name: 1,
  archived: 2
}

class BookmarkTitleParser {
  constructor (title) {
    this.title = title
  }

  parts () {
    return this.title.split(DELIMITER)
  }

  name () {
    const nameIndex = PARTS_INDICES.name
    return this.parts()[nameIndex]
  }

  timestamp () {
    const timestampIndex = PARTS_INDICES.timestamp
    return this.parts()[timestampIndex]
  }

  archived () {
    const archivedIndex = PARTS_INDICES.archived
    return this.parts()[archivedIndex]
  }
}

export default BookmarkTitleParser
