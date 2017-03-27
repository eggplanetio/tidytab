<template lang="html">
  <div>
    <header class="app-header">
      <h1>
        <span class="icon">🚿</span> TidyTab
      </h1>

      <DashboardStats></DashboardStats>
    </header>

    <TabGroup v-for="n in 23"></TabGroup>
    <AdUnit></AdUnit>

  </div>
</template>

<script>
import store from '../store/index.js';
import TabGroup from './tab-group.vue';
import AdUnit from './ad-unit.vue';
import DashboardStats from './dashboard-stats.vue';

export default {
  components: {
    AdUnit,
    DashboardStats,
    TabGroup,
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
    }
  }

  .stats {
    float: right
  }
}
</style>
