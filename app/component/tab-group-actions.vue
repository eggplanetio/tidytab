<template>
  <div class="button-group actions">
    <a @click="restore">Restore</a>
    <a @click="newWindow">Restore in new</a>
    <a @click="remove" class="remove">Remove</a>
  </div>
</template>

<script>
import store from '../store/index.js'
import pluralize from 'pluralize'

export default {
  props: [
    'tabGroup'
  ],
  methods: {
    remove () {
      const tabString = pluralize('tab', this.tabGroup.tabs.length, true)
      const shouldRemove = confirm(`
        This tab group contains ${tabString} – are you sure you want to delete it?`)

      if (!shouldRemove) return

      if (this.tabGroup.id) {
        store.dispatch('DELETE_TAB_GROUP', this.tabGroup)
      } else {
        this.tabGroup.tabs.forEach(tab => store.dispatch('DELETE_TAB', tab))
      }
    },
    restore () {
      this.tabGroup.tabs.forEach(t => {
        chrome.tabs.create({
          url: t.url,
          selected: false
        })
      })
    },
    newWindow () {
      let urls = this.tabGroup.tabs.map(t => t.url)
      chrome.windows.create({ url: urls })
    }
  }

}
</script>

<style scoped lang="scss">
@import "../styles/settings";

.actions {
  font-size: $font-size-small;
}

</style>
