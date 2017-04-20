<template>
  <a title="Toggle mode" @click="toggleTheme" href="#">
    {{ nextTheme }}
  </a>
</template>

<script>
import store from '../store/index.js';
import { mapState } from 'vuex';

const THEMES = [
  'dark',
  'light',
  'night'
];

export default {
  methods: {
    toggleTheme() {
      store.commit('SET_THEME', this.nextTheme);
    }
  },

  watch: {
    theme() {
      this.$emit('updateHead');
    }
  },

  head: {
    link() {
      const theme = this.theme || 'light';
      const href = `../styles/dashboard-${theme}.css`;
      return [
        { rel: 'stylesheet', type: 'text/css', href, id: 'theme' },
      ];
    },
  },

  computed: {
    ...mapState([
      'theme'
    ]),

    nextTheme() {
      const themeIndex = THEMES.indexOf(this.theme);
      let nextIndex = themeIndex + 1;
      if (nextIndex + 1 > THEMES.length) nextIndex = 0;
      const next = THEMES[nextIndex];
      return next;
    }
  }
}
</script>

<style scoped lang="sass">
@import "../styles/settings";

a, a:visited, a:hover, a:active {
  text-transform: capitalize;
}
</style>
