<template>
  <select id="theme" v-model="theme" @change="onThemeSelect">
    <option v-for="theme in THEMES" :value="theme">{{ theme }}</option>
  </select>
</template>

<script>
import BookmarkSelector from './bookmark-selector.js';
import BookmarkIndicator from './bookmark-indicator.vue';

import store from '../store/index.js';
import { THEMES } from '../store/index.js';
import ChromePromise from 'chrome-promise';
const chromep = new ChromePromise();
import { mapState } from 'vuex';

export default {
  data: () => ({
    enableTabSavingStrategy: false,
    THEMES
  }),

  methods: {
    onThemeSelect(e) {
      store.commit('SET_THEME', e.target.value);
    },
  },

  computed: {
    ...mapState([
      'theme',
    ]),
  },
}
</script>
