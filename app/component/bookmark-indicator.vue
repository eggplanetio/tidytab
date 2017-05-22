<template>
  <span v-if="bookmarkFolder">
    Currently your tabs are stored in: <strong>{{ bookmarkFolder.title }} ({{ bookmarkFolder.id }}</strong>).
  </span>
</template>

<script>
import BookmarkManager from '../../lib/bookmark-manager.js'
import { mapState } from 'vuex'

export default {
  asyncComputed: {
    async bookmarkFolder () {
      return BookmarkManager.getTidyFolder()
    }
  },

  computed: {
    ...mapState([
      'bookmarkFolderId'
    ])
  }
}
</script>
