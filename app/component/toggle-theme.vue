<template>
  <a title="Toggle mode" @click="toggleTheme" href="#">
    {{ otherTheme }} Theme
  </a>
</template>

<script>
import store from '../store/index.js';
import { mapState } from 'vuex';

export default {
  methods: {
    toggleTheme() {
      store.commit('SET_THEME', this.otherTheme);
    }
  },

  watch: {
    theme() {
      this.$emit('updateHead');
    }
  },

  head: {
    link() {
      const theme = this.theme;
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

    otherTheme() {
      const other = this.theme === 'dark' ? 'light' : 'dark';
      return other;
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
