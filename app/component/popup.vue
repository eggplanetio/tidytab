<template lang="html">
  <section>
    <button @click="tidy">
      <span v-if="tabCount">Tidy {{ tabCount }} {{ tabCount | pluralize('tab') }}</span>
      <span v-else>Nothing to tidy!</span>
    </button>

    <a @click='viewDashboard'>
      View Dashboard
    </a>
  </section>
</template>

<script>
import store from '../store/index.js';
import ChromePromise from 'chrome-promise';
const chromep = new ChromePromise();

export default {
  methods: {
    async tidy () {
      const tabGroup = await store.dispatch('SAVE_TAB_GROUP');
      if (tabGroup.tabs.length < 1) return;
      await this.viewDashboard();
      await chromep.tabs.remove(tabGroup.tabs.map(tab => tab.id));
    },

    async viewDashboard() {
      const currentWindow = await chromep.windows.getCurrent({});
      const tabs = await chromep.tabs.getAllInWindow(currentWindow.id);
      const isShowingDashboard = tabs[0].title === "TidyTab – Dashboard";
      if (!isShowingDashboard) {
        await chromep.tabs.create({ url: this.dashboardURL, pinned: true, index: 0 });
      }
      chrome.tabs.highlight({ tabs: [0] });
    }
  },

  data () {
    return {
      dashboardURL: chrome.extension.getURL('pages/dashboard.html')
    }
  },

  asyncComputed: {
    async tabCount () {
      const currentWindow = await chromep.windows.getCurrent({});
      let tabs = await chromep.tabs.getAllInWindow(currentWindow.id);
      tabs = tabs.filter(t => !t.title.startsWith('TidyTab'));
      return tabs.length;
    }
  }

}
</script>

<style scoped="true" lang="sass">
@import '../styles/settings';
section {
  text-align: center;
  width: 150px;
}

button, a {
  width: 100%;
}

button {
  background: $color-primary;
  color: white;
  display: block;
  margin-bottom: $size-unit/2;
}

a, a:visited, a:hover, a:active {
  color: $color-primary;
  font-size: $font-size-super-small;
  display: block;
  text-align: center;
  border: none;
}
</style>
