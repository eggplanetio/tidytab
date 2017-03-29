<template>
  <div class="button-group actions">
    <a href="#" @click="restore">Restore</a>
    <a href="#">Restore in new</a>
    <a href="#" @click="remove" class="remove">Remove</a>

    <a href="#" @click="toggleCollapsedState">
      <span v-if="tabGroup.collapsed">Expand</span>
      <span v-if="!tabGroup.collapsed">Collapse</span>
    </a>
  </div>
</template>

<script>
import store from '../store/index.js';
export default {
  props: [
    'tabGroup',
  ],
  methods: {
    toggleCollapsedState() {
      store.dispatch('TOGGLE_COLLAPSED_STATE_FOR_TAB_GROUP', { createdAt: this.tabGroup.createdAt })
    },
    remove() {
      store.dispatch('DELETE_TAB_GROUP', { createdAt: this.tabGroup.createdAt });
    },
    restore() {
      this.tabGroup.tabs.forEach(t => {
        chrome.tabs.create({ url: t.url });
      })
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
