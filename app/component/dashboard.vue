<template lang="html">
  <div>
    <header class="app-header">
      <h1>
        <img class="icon" src="/images/logo.png" alt="icon"> TidyTab
      </h1>

      <DashboardStats :tabGroups="tabGroups"></DashboardStats>
    </header>

    <span v-for="tabGroup in tabGroups">
      <TabGroup :tabGroup="tabGroup"></TabGroup>
    </span>

    <AdUnit></AdUnit>

    <footer>
      made with love by <a href="https://eggplanet.io" target="_blank">eggplanet</a> | v{{ version }}
    </footer>
  </div>
</template>

<script>
import TabGroup from './tab-group.vue';
import AdUnit from './ad-unit.vue';
import DashboardStats from './dashboard-stats.vue';
import { mapState } from 'vuex';

export default {
  components: {
    AdUnit,
    DashboardStats,
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

  .stats {
    float: right
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
