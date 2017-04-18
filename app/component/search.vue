<template>
  <input type="text" v-model="query" @keyup="setQuery" placeholder="Type to filter" class="search">
</template>

<script>
import store from '../store/index.js';

export default {
  data() {
    return {
      query: ''
    }
  },

  created() {
    document.addEventListener('keydown', this.documentKeyDown);
  },

  beforeDestroy() {
    document.removeKeyListener('keydown', this.documentKeyDown);
  },

  methods: {
    documentKeyDown(e) {
      this.$el.focus();
    },
    setQuery(e) {
      store.commit('SET_SEARCH_QUERY', this.query);
      store.dispatch('HYDRATE_STATE');
    }
  }
}
</script>

<style scoped lang="sass">
input,
input::placeholder {
  background: transparent;
  outline: none;
  border: none;
  font-family: "Muli";
  opacity: 0.5;
  letter-spacing: 1px;
}
</style>
