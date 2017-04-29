<template>
  <span>
    Currently using folder with an ID of {{ bookmarkFolderId }}
  </span>
</template>

<script>
import BookmarkManager from '../../lib/bookmark-manager.js';
import { mapState } from 'vuex';
import store from '../store/index.js';

export default {
  computed: {
    ...mapState([
      'bookmarkFolder',
      'bookmarkFolderId',
    ]),
  }
}
</script>
