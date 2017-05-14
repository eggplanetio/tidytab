<template>
  <select id="theme" v-model="theme" @change="onThemeSelect">
    <option v-for="theme in THEMES" :value="theme">{{ theme }}</option>
  </select>
</template>

<script>
import store from '../store/index.js';
import { THEMES } from '../store/index.js';
import { mapState } from 'vuex';

export default {
  data: () => ({
    THEMES
  }),

  methods: {
    onThemeSelect(e) {
      store.commit('SET_THEME', e.target.value);
    },
  },

  computed: {
    ...mapState([ 'theme' ]),
  },
}
</script>
