
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

  get parts () {
    return this.title.split(DELIMITER)
  }

  get name () {
    const nameIndex = PARTS_INDICES.name
    return this.parts[nameIndex]
  }

  get timestamp () {
    const timestampIndex = PARTS_INDICES.timestamp
    return this.parts[timestampIndex]
  }

  get date () {
    let d = new Date(this.timestamp)
    if (d.toString() !== 'Invalid Date') return d
    d = new Date(parseInt(this.timestamp))
    return d
  }

  get archived () {
    const archivedIndex = PARTS_INDICES.archived
    return this.parts[archivedIndex]
  }
}

export default BookmarkTitleParser
