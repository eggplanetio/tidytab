<template>
  <a @click="tidyExport" title="Export">Export</a>
</template>

<script>
import store from '../store/index.js';
export default {
  props: [
    'tabGroup',
  ],
  methods: {
    tidyExport () {
      const state = JSON.stringify(store.state);
      chrome.downloads.download({
        url: `data:text/json;charset=utf-8,${state}`,
        filename: `tidytab-export-${new Date().getTime()}.json`
      });
    }
  }
}
</script>

<style scoped lang="sass">
@import "../styles/settings";
</style>
