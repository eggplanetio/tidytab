<template lang="html">
  <div>
    <header class="app-header">
      <h1>
        <span class="icon">🚿</span> TidyTab
      </h1>

      <DashboardStats :tabGroups="tabGroups"></DashboardStats>
    </header>

    <span v-for="tabGroup in tabGroups">
      <TabGroup :tabGroup="tabGroup"></TabGroup>
    </span>

    <AdUnit></AdUnit>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import store from '../store/index.js';
import TabGroup from './tab-group.vue';
import AdUnit from './ad-unit.vue';
import DashboardStats from './dashboard-stats.vue';

export default {
  components: {
    AdUnit,
    DashboardStats,
    TabGroup,
  },

  methods: {
    fetchData () {
      chrome.storage.sync.get('tidyStorage', (items) => {
        let data = items['tidyStorage'];
        this.tabGroups = data
      })
    }
  },
  created () {
    this.fetchData();
  },

  data () {
    return {
      tabGroups: []
    }
  },

  computed: mapState({
    /* tabGroups: 'tabGroups' */ // should work
  })
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
    }
  }

  .stats {
    float: right
  }
}
</style>
