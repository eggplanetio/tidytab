<template lang="html">
  <section>
    <button href="#" @click="tidy">
      <span v-if="tabCount">Tidy {{ tabCount }} {{ tabCount | pluralize('tab') }}</span>
      <span v-else>Nothing to tidy!</span>
    </button>

    <div class="button-group actions" @mouseleave="setDefaultMessage">
      <a href="#" @mouseover="setMessage('Tidy to the left of current tab')" title="Tidy to the left of current tab" @click="tidy('left')">Left</a>
      <a href="#" @mouseover="setMessage('Tidy to the right of current tab')" title="Tidy to the right of current tab" @click="tidy('right')" >Right</a>
      <a href="#" @mouseover="setMessage('Tidy all but current tab')" title="Tidy all but current tab" @click="tidy('allButCurrent')">All else</a>
      <a href="#" @mouseover="setMessage('Tidy current tab')" title="Tidy current tab" @click="tidy('current')" >Current</a>
    </div>

    <a @click='viewDashboard' class="dashboard">
      {{ hoverMessage }}
    </a>

  </section>
</template>

<script>
import ChromePromise from 'chrome-promise'
import { shouldTidy } from '../../lib/helpers.js'
const chromep = new ChromePromise()

export default {

  methods: {

    async tidy (which) {
      const window = await chromep.windows.getCurrent({})
      chrome.runtime.sendMessage({
        message: 'tidy',
        data: {
          which,
          window
        }
      })
    },

    setMessage (msg) {
      this.hoverMessage = msg
    },

    setDefaultMessage (msg) {
      this.hoverMessage = 'View Dashboard'
    },

    async viewDashboard () {
      console.log('Dashboard')
      const window = await chromep.windows.getCurrent({})
      chrome.runtime.sendMessage({
        message: 'viewDashboard',
        data: { window }
      })
    }
  },

  data () {
    return {
      hoverMessage: 'View Dashboard'
    }
  },

  asyncComputed: {
    async tabCount () {
      const currentWindow = await chromep.windows.getCurrent({})
      let tabs = await chromep.tabs.getAllInWindow(currentWindow.id)
      tabs = tabs.filter(tab => !shouldTidy(tab))
      return tabs.length
    }
  }

}
</script>

<style scoped="true" lang="scss">
@import '../styles/colors';
@import '../styles/settings';

$buttonwidth: 320px;

section {
  text-align: center;
  width: $buttonwidth;
}

button {
  background: $color-primary-dark;
  margin-bottom: $size-unit/2;
  color: white;
  width: $buttonwidth;
}

a, a:visited, a:hover, a:active {
  font-size: $font-size-super-small;
}

.dashboard {
  border: none;
}

.button-group {
  a, a:visited, a:active {
    color: $color-primary-dark;
    width: 80px;
  }
}
</style>
