import Vue from 'vue';
import store from '../store/index.js';

import Multiselect from 'vue-multiselect'

import ChromePromise from 'chrome-promise';
const chromep = new ChromePromise();

import BookmarkManager from '../../lib/bookmark-manager.js';

import { mapState } from 'vuex';

const createComponent = (bookmarks) => {
  return {
    render (h) {
      return (
        <span class="bookmark-selector">
          <multiselect
            value={this.bookmarkFolderId}
            placeholder="Search for folder"
            options={bookmarks}
            track-by={"value"}
            label="label"
            option-height={50}
            deselect-label={""}
            max-height={150}
            onSelect={this.onSelect}>
          </multiselect>
        </span>
      )
    },

    components: {
      Multiselect
    },

    methods: {
      onSelect(selection) {
        store.commit('SET_BOOKMARK_FOLDER_ID', selection.value);
      },
    },

    computed: {
      ...mapState([
        'bookmarkFolderId',
      ]),
    },

    data: () => {
      return { bookmarks }
    },
  }
}

Vue.component('bookmark-selector', async (resolve, reject) => {
  const bookmarks = await BookmarkManager.getBookmarks();
  resolve(createComponent(bookmarks));
});