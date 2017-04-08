<template lang="html">
  <section>
    <button href="#" @click="tidy">
      <span v-if="tabCount">Tidy {{ tabCount }} {{ tabCount | pluralize('tab') }}</span>
      <span v-else>Nothing to tidy!</span>
    </button>

    <div class="button-group actions">
      <a href="#" @click="tidyLeft">← Tidy</a>
      <a href="#" @click="tidyRight">Tidy →</a>
      <a href="#" @click="tidyAllButCurrent">← Tidy →</a>
      <a href="#" @click="clear" class="remove">Clear</a>
    </div>

    <a @click='viewDashboard' class="dashboard">
      View Dashboard
    </a>
  </section>
</template>

<script>
import store from '../store/index.js';
import ChromePromise from 'chrome-promise';
const chromep = new ChromePromise();
import packageJson from '../../package.json';

export default {
  methods: {
    async tidy () {
      const tabs = await store.dispatch('SAVE_TAB_GROUP');
      this.removeTabs(tabs);
    },

    async tidyRight () {
      const currentWindow = await chromep.windows.getCurrent({});
      const currentTab = await chromep.tabs.getSelected(currentWindow.id);
      const filter = (tab) => tab.index > currentTab.index;

      const tabs = await store.dispatch('SAVE_TAB_GROUP', { filter: filter });
      this.removeTabs(tabs, false);
    },

    async tidyLeft () {
      const currentWindow = await chromep.windows.getCurrent({});
      const currentTab = await chromep.tabs.getSelected(currentWindow.id);
      const filter = (tab) => tab.index < currentTab.index;

      const tabs = await store.dispatch('SAVE_TAB_GROUP', { filter });
      this.removeTabs(tabs, false);
    },

    async tidyAllButCurrent () {
      const currentWindow = await chromep.windows.getCurrent({});
      const currentTab = await chromep.tabs.getSelected(currentWindow.id);
      const filter = (tab) => (tab.index < currentTab.index) || (tab.index > currentTab.index);

      const tabs = await store.dispatch('SAVE_TAB_GROUP', { filter });
      this.removeTabs(tabs, false);
    },

    async clear () {
      const currentWindow = await chromep.windows.getCurrent({});
      let tabs = await chromep.tabs.getAllInWindow(currentWindow.id);
      tabs = tabs.filter(tab => !tab.title.startsWith(packageJson.name));
      this.removeTabs(tabs);
    },

    async viewDashboard() {
      const currentWindow = await chromep.windows.getCurrent({});
      const tabs = await chromep.tabs.getAllInWindow(currentWindow.id);
      const isShowingDashboard = tabs[0].title === "TidyTab – Dashboard";
      if (!isShowingDashboard) {
        await chromep.tabs.create({ url: this.dashboardURL, pinned: true, index: 0 });
      }
      chrome.tabs.highlight({ tabs: [0] });
    },

    async removeTabs (tabs, viewDashboard = true) {
      if (tabs.length < 1) return;
      if (viewDashboard) await this.viewDashboard();
      await chromep.tabs.remove(tabs.map(tab => tab.id));
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
$width: 245px;

section {
  text-align: center;
}

button {
  width: $width;
  background: $color-primary;
  margin-bottom: $size-unit/2;
  color: white;
}

a, a:visited, a:hover, a:active {
  font-size: $font-size-super-small;
}

.dashboard {
  border: none;
}

.button-group {
  a, a:visited, a:hover, a:active {
    color: $color-primary;
    border-color: $color-primary;
    outline: none;
  }
}
</style>
