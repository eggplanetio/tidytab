<template lang="html">
  <section>
    <button href="#" @click="tidy">
      <span v-if="tabCount">Tidy {{ tabCount }} {{ tabCount | pluralize('tab') }}</span>
      <span v-else>Nothing to tidy!</span>
    </button>

    <div class="button-group actions" @mouseleave="setDefaultMessage">
      <a href="#" @mouseover="setMessage('Tidy to the left of current tab')" title="Tidy to the left of current tab" @click="tidyLeft">← ○</a>
      <a href="#" @mouseover="setMessage('Tidy to the right of current tab')" title="Tidy to the right of current tab" @click="tidyRight" >○ →</a>
      <a href="#" @mouseover="setMessage('Tidy all but current tab')" title="Tidy all but current tab" @click="tidyAllButCurrent">← ○ →</a>
      <a href="#" @mouseover="setMessage('Tidy current tab')" title="Tidy current tab" @click="tidyCurrent" >→ ○ ←</a>
      <a href="#" @mouseover="setMessage(`Clear all tabs – don't tidy`)" @click="clear" class="remove">Clear</a>
    </div>

    <a @click='viewDashboard' class="dashboard">
      {{ hoverMessage }}
    </a>

  </section>
</template>

<script>
import store from '../store/index.js';
import ChromePromise from 'chrome-promise';
const chromep = new ChromePromise();
import tidyHelpers from '../../lib/helpers.js';

export default {

  data () {
    return {
      hoverMessage: 'View Dashboard'
    }
  },

  methods: {
    setMessage(msg) {
      this.hoverMessage = msg;
    },

    setDefaultMessage(msg) {
      this.hoverMessage = 'View Dashboard';
    },

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

    async tidyCurrent () {
      const currentWindow = await chromep.windows.getCurrent({});
      const currentTab = await chromep.tabs.getSelected(currentWindow.id);
      const filter = (tab) => tab.index === currentTab.index;

      const tabs = await store.dispatch('SAVE_TAB_GROUP', { filter });
      this.removeTabs(tabs, true);
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
      tabs = tabs.filter(tab => !tidyHelpers.shouldTidy(tab));
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
      /*
        An issue with Windows requires us to close tabs then open Dashboard.
        This is likely due to the fact the popup has closed while tabs are being removed.
        */
      const isWindows = navigator.platform.toLowerCase().includes('win');
      if (isWindows) {
        await chromep.tabs.remove(tabs.map(tab => tab.id));
        if (viewDashboard) await this.viewDashboard();
      } else {
        if (viewDashboard) await this.viewDashboard();
        await chromep.tabs.remove(tabs.map(tab => tab.id));
      }
    }
  },

  data () {
    return {
      hoverMessage: 'View Dashboard',
      dashboardURL: chrome.extension.getURL('pages/dashboard.html')
    }
  },

  asyncComputed: {
    async tabCount () {
      const currentWindow = await chromep.windows.getCurrent({});
      let tabs = await chromep.tabs.getAllInWindow(currentWindow.id);
      tabs = tabs.filter(tab => !tidyHelpers.shouldTidy(tab));
      return tabs.length;
    }
  }

}
</script>

<style scoped="true" lang="sass">
@import '../styles/settings';

section {
  text-align: center;
  width: 260px;
}

button {
  background: $color-primary;
  margin-bottom: $size-unit/2;
  color: white;
  width: 250px;
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
