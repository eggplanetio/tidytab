<template lang="html">
  <div>
    <header class="app-header">
      <h1>
        <img class="icon" src="/images/logo.png" alt="icon"> TidyTab
        <span class="sep">/</span>
        <DashboardStats :tabGroups="tabGroups"></DashboardStats>
      </h1>

      <span class="actions-and-stats">
        <Export></Export>
        <span class="sep">/</span>
        <Import></Import>
      </span>
    </header>

    <span v-for="tabGroup in tabGroups">
      <TabGroup :tabGroup="tabGroup"></TabGroup>
    </span>

    <footer>
      useful software by <a href="http://www.eggplanet.io/" target="_blank">eggplanet</a> |
      <a href="https://github.com/eggplanetio/tidytab/issues" target="_blank">file a bug</a> |
      v{{ version }}
    </footer>
  </div>
</template>

<script>
import TabGroup from './tab-group.vue';
import Export from './export.vue';
import Import from './import.vue';
import DashboardStats from './dashboard-stats.vue';
import { mapState } from 'vuex';

export default {
  components: {
    DashboardStats,
    Export,
    Import,
    TabGroup,
  },

  props: [
    'tabGroups'
  ],

  computed: {
    ...mapState(['version'])
  }
}
</script>

<style scoped="true" lang="sass">
@import "../styles/settings";

header {
  margin-bottom: $size-unit;

  .sep {
    font-weight: 300;
    opacity: 0.2;
  }

  h1 {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 600;

    .icon {
      vertical-align: middle;
      height: $size-unit * 2;
      margin-right: $size-unit/2;
    }
  }

  .actions-and-stats {
    float: right;

    label, a {
      color: $color-secondary;
      font-weight: 300;
    }
  }
}

footer {
  color: $color-primary - 10;
  text-align: center;
  font-size: $font-size-super-small;

  a {
    opacity: 0.2;
  }
}
</style>
