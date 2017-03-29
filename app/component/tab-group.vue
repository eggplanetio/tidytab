<template>
  <section :class="{ collapsed }">
    <header>
      <a href="#" @click="toggleCollapsedState">
        <h2>
          {{ tabGroup.tabs.length }} tabs
        </h2>
        <date>
          {{ tabGroup.createdAt | moment('ddd MM/D') }} at
          {{ tabGroup.createdAt | moment('h:m:sa') }}
        </date>

        <span class="fav-group">
          <span class="fav-wrapper" v-for="tab in tabGroup.tabs">
            <Favicon :url="tab.favIconUrl"></Favicon>
          </span>
        </span>
      </a>

      <TabGroupActions :tabGroup="tabGroup"></TabGroupActions>
    </header>

    <ul>
      <li v-for="tab in tabGroup.tabs">
        <Favicon :url="tab.favIconUrl"></Favicon>
        {{ tab.title }}
        <span class="tab-actions">
          <a :href="tab.url" target="_blank">open</a> <a href="#" @click="removeTab(tab)">remove</a>
        </span>
      </li>
    </ul>

  </section>
</template>

<script>
import store from '../store/index.js';
import Favicon from './favicon.vue';
import TabGroupActions from './tab-group-actions.vue';

export default {
  components: {
    Favicon,
    TabGroupActions
  },
  props: [
    'tabGroup',
  ],
  methods: {
    toggleCollapsedState() {
      store.dispatch('TOGGLE_COLLAPSED_STATE_FOR_TAB_GROUP', { createdAt: this.tabGroup.createdAt })
    },
    removeTab(tab) {
      store.dispatch('DELETE_TAB', { tab: tab, createdAt: this.tabGroup.createdAt });
    }
  },

  computed: {
    collapsed () {
      return this.tabGroup.collapsed;
    }
  }

}
</script>

<style scoped lang="sass">
@import "../styles/settings";

section {
  margin-bottom: $size-unit;
  border-radius: 1px;
  padding: $size-unit * 1.5;
  box-shadow: 0 3px 3px rgba(black, 0.1);
  background: linear-gradient(to left, desaturate($color-primary, 15%), desaturate($color-primary, 10%));

  * { transition: all 250ms ease; }
}

section.collapsed {
  ul { display: none; }
  header { margin-bottom: 0; }
  .fav-group { display: inline-block; }
}

header {
  margin-bottom: $size-unit;
}

h2 {
  display: inline;
  font-weight: 600;
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

    .tab-actions {
      opacity: 0;
      a {
        font-size: $font-size-small;
        opacity: 0.5;
        margin-left: $size-unit/2;
        color: $color-secondary;

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
