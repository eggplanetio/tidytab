<template>
  <section class="tab-group">
    <header>
      <h2>
        {{ tabGroup.tabs.length }} {{ tabGroup.tabs.length | pluralize('tab') }}
      </h2>
      <date>
        {{ tabGroup.dateAdded | moment('ddd MM/D') }} at {{ tabGroup.dateAdded | moment('h:mm:ssa') }}
      </date>

      <TabGroupActions :tabGroup="tabGroup"></TabGroupActions>
    </header>

    <ul>
      <li v-for="tab in tabGroup.tabs">
        <Favicon :url="tab.url"></Favicon>
        <a @click="openTab($event, tab)" @contextmenu="openAndRemoveTab($event, tab)" :title="tab.url" :href="tab.url">
          <span class="title">
            {{ tab.title | truncate(60) }}
          </span>
          <span class="url">
            {{ tab.url | host }}
          </span>
        </a>

        <span class="tab-actions">
          <a @click="removeTab(tab)">remove</a>
        </span>
      </li>
    </ul>

  </section>
</template>

<script>
import store from '../store/index.js'
import Favicon from './favicon.vue'
import TabGroupActions from './tab-group-actions.vue'

export default {
  components: {
    Favicon,
    TabGroupActions
  },
  props: [
    'tabGroup'
  ],
  methods: {
    removeTab (tab) {
      store.dispatch('DELETE_TAB', tab)
    },
    openTab (event, tab) {
      event.preventDefault()
      chrome.tabs.create({ url: tab.url, selected: false })
    },
    openAndRemoveTab (e, tab) {
      e.preventDefault()
      this.openTab(tab)
      this.removeTab(tab)
    }
  },

  computed: {
    collapsed () {
      return this.tabGroup.collapsed
    }
  }
}
</script>

<style scoped lang="sass">
@import "../styles/colors";
@import "../styles/settings";

section {
  opacity: 0.65;
  margin-bottom: $size-unit * 2.5;

  & { transition: all 250ms ease; }
  &:hover { opacity: 1 }
}

header {
  margin-bottom: $size-unit;
  padding-bottom: $size-unit;

  [data-theme="dark"] & {
    border-bottom: 1px solid $color-darker-gray;
  }

  [data-theme="light"] & {
    border-bottom: 1px solid $color-light-gray;
    color: $color-secondary-light;
  }
}

h2 {
  display: inline;
  font-weight: 600;
  margin-right: $size-unit;
}

date {
  font-size: $font-size-small;
  opacity: 0.5;
}

.actions {
  float: right;
  font-size: $font-size-small;
}

ul {
  li {
    font-size: $font-size-small;
    margin-bottom: $size-unit/2;

    a {

      .url {
        opacity: 0.5;
        font-size: $font-size-small;
      }
    }

    .tab-actions {
      opacity: 0;
      a {
        font-size: $font-size-small;
        opacity: 0.5;
        margin-left: $size-unit/2;
        color: $color-danger;

        &:hover { opacity: 1; }
      }
    }

    &:hover {
      .tab-actions { opacity: 1; }
    }
  }
}

.fav-group {
  margin-left: $size-unit;
  display: none;

  .fav-wrapper {
    display: inline-block;
    border-radius: 50%;
    text-align: center;
    margin-right: $size-unit/4;
    img { height: 15px; }
  }
}
</style>
