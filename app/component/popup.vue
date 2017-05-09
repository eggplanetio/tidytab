<template lang="html">
  <section>
    <button href="#" @click="tidy">
      <span v-if="tabCount">Tidy {{ tabCount }} {{ tabCount | pluralize('tab') }}</span>
      <span v-else>Nothing to tidy!</span>
    </button>

    <div class="button-group actions" @mouseleave="setDefaultMessage">
      <a href="#" @mouseover="setMessage('Tidy to the left of current tab')" title="Tidy to the left of current tab" @click="tidy('left')">← ○</a>
      <a href="#" @mouseover="setMessage('Tidy to the right of current tab')" title="Tidy to the right of current tab" @click="tidy('right')" >○ →</a>
      <a href="#" @mouseover="setMessage('Tidy all but current tab')" title="Tidy all but current tab" @click="tidy('allButCurrent')">← ○ →</a>
      <a href="#" @mouseover="setMessage('Tidy current tab')" title="Tidy current tab" @click="tidy('current')" >→ ○ ←</a>
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
import { shouldTidy } from '../../lib/helpers.js';

export default {

  methods: {

    tidy(which) {
      chrome.runtime.sendMessage({
        message: 'tidy',
        data: { which }
      });
    },

    clear() {
      chrome.runtime.sendMessage({ message: 'clear' });
    },

    setMessage(msg) {
      this.hoverMessage = msg;
    },

    setDefaultMessage(msg) {
      this.hoverMessage = 'View Dashboard';
    },

    async viewDashboard () {
      chrome.runtime.sendMessage({ message: 'viewDashboard' })
    },
  },

  data () {
    return {
      hoverMessage: 'View Dashboard'
    }
  },

  asyncComputed: {
    async tabCount () {
      const currentWindow = await chromep.windows.getCurrent({});
      let tabs = await chromep.tabs.getAllInWindow(currentWindow.id);
      tabs = tabs.filter(tab => !shouldTidy(tab));
      return tabs.length;
    }
  }

}
</script>

<style scoped="true" lang="sass">
@import '../styles/colors';
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
