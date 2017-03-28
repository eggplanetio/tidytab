<template>
  <section :class="{ collapsed }">
    <header>
      <a @click="toggleCollapse">
        <h2>
          {{ tabGroup.tabs.length }} tabs
        </h2>
        <date>
          {{ tabGroup.createdAt }}
        </date>

        <span class="fav-group">
          <span class="fav-wrapper" v-for="tab in tabGroup.tabs">
            <Favicon :url="tab.favIconUrl"></Favicon>
          </span>
        </span>
      </a>

      <div class="button-group actions">
        <a href="#" @click="restore">Restore</a>
        <a href="#" @click="remove">Remove</a>

        <a href="#" @click="toggleCollapse">
          {{ toggleText }}
        </a>
      </div>
    </header>

    <ul>
      <li v-for="tab in tabGroup.tabs">
        <Favicon :url="tab.favIconUrl"></Favicon>
        {{ tab.title }}
        <span class="tab-actions">
          <a :href="tab.url">open</a> <a href="#" @click="removeTab(tab)">remove</a>
        </span>
      </li>
    </ul>

  </section>
</template>

<script>
import store from '../store/index.js';
import Favicon from './favicon.vue';
export default {
  components: {
    Favicon
  },
  props: [
    'tabGroup',
  ],
  data () {
    return {
      collapsed: false,
    }
  },
  computed: {
    isCollapsed () {
      if (this.tabGroup.isCollapsed) return true;
      return this.collapsed;
    },
    toggleText () {
      return this.collapsed ? 'Expand' : 'Collapse';
    }
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    restore() {
      this.tabGroup.tabs.forEach(t => {
        chrome.tabs.create({ url: t.url });
      })
    },
    remove() {
      store.dispatch('DELETE_TAB_GROUP', { createdAt: this.tabGroup.createdAt });
    },
    removeTab(tab) {
      store.dispatch('DELETE_TAB', { tab: tab, createdAt: this.tabGroup.createdAt });
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

.actions {
  float: right;
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
