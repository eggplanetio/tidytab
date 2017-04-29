<template>
  <span v-if="bookmarkFolder">
    Currently your tabs are stored in the "{{ bookmarkFolder.title }}" folder with an ID of {{ bookmarkFolder.id }}.
  </span>
</template>

<script>
import BookmarkManager from '../../lib/bookmark-manager.js';
import { mapState } from 'vuex';
import store from '../store/index.js';

import ChromePromise from 'chrome-promise';
const chromep = new ChromePromise();

export default {
  asyncComputed: {
    async bookmarkFolder() {
      const id = this.bookmarkFolderId;
      return BookmarkManager.getTidyFolder();
    }
  },

  computed: {
    ...mapState([
      'bookmarkFolderId',
    ]),
  }
}
</script>
