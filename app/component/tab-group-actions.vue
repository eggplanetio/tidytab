<template>
  <div class="button-group actions">
    <a href="#" @click="restore">Restore</a>
    <a href="#" @click="newWindow">Restore in new</a>
    <a href="#" @click="remove" class="remove">Remove</a>
  </div>
</template>

<script>
import store from '../store/index.js';
export default {
  props: [
    'tabGroup',
  ],
  methods: {
    remove() {
      store.dispatch('DELETE_TAB_GROUP', this.tabGroup.dateAdded);
    },
    restore() {
      this.tabGroup.tabs.forEach(t => {
        chrome.tabs.create({
          url: t.url,
          selected: false
        });
      })
    },
    newWindow() {
      let urls = this.tabGroup.tabs.map(t => t.url);
      chrome.windows.create({ url: urls })
    },
  }

}
</script>

<style scoped lang="sass">
@import "../styles/settings";

.actions {
  font-size: $font-size-small;
}

a.remove:hover {
  color: $color-danger;
}

</style>
