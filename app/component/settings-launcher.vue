<template>
  <a @click="launchSettings()">
    Settings
  </a>
</template>

<script>
import store from '../store/index.js';
export default {
  methods: {
    launchSettings() {
      chrome.runtime.openOptionsPage();
    }
  }
}
</script>

<style scoped lang="sass">
@import "../styles/settings";
@import "../styles/colors";
</style>
