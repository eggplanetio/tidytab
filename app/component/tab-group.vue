<template>
  <section class="tab-group">
    <header>
      <h2>
        {{ tabGroup.tabs.length }} {{ tabGroup.tabs.length | pluralize('tab') }}
      </h2>
      <time>
        {{ tabGroup.dateAdded | moment(momentFormat) }}
      </time>

      <TabGroupActions :tabGroup="tabGroup"></TabGroupActions>
    </header>

    <ul>
      <li v-for="tab in tabGroup.tabs">

        <span class="tab-actions">
          <a href="#" class="remove" @click="removeTab(tab)" title="Remove tab">
            ×
          </a>
          <Favicon :url="tab.url" class="favicon"/>
        </span>

        <a @click="openTab($event, tab)" @contextmenu="openAndRemoveTab($event, tab)" :title="tab.url" :href="tab.url">
          <span class="title">
            {{ tab.title | truncate(60) }}
          </span>
          <span class="url">
            {{ tab.url | host }}
          </span>
        </a>
      </li>
    </ul>

  </section>
</template>

<script>
import store from '../store/index.js'
import Favicon from './favicon.vue'
import TabGroupActions from './tab-group-actions.vue'
import { mapState } from 'vuex'

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
    openAndRemoveTab (event, tab) {
      event.preventDefault()
      this.openTab(event, tab)
      this.removeTab(tab)
    }
  },

  computed: {
    ...mapState(['tabGroupView']),
    momentFormat () {
      return this.tabGroupView === 'group-by-date' ? 'dddd MM/D' : 'ddd MM/D @ h:mma'
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/colors";
@import "../styles/settings";

section {
  opacity: 0.5;
  margin-bottom: $size-unit * 2.5;
  padding: $size-unit * 2;
  border-radius: 2px;

  [data-theme="dark"] & {
    background: $color-primary-dark + 20;
  }

  [data-theme="light"] & {
    background: $color-light-gray + 13;
  }

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
  margin-right: $size-unit/2;
}

time {
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
      width: $size-unit;
      display: inline-block;
      text-align: center;
    }

    .remove {
      display: none;
      color: $color-danger;
      font-weight: bold;
      font-size: 16px;
      line-height: 0;
    }

    &:hover {
      .favicon { display: none }
      .remove { display: inline-block }
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
