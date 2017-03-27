<template lang="html">
  <div>
    <header class="app-header">
      <h1>
        <span class="icon">🚿</span> TidyTab
      </h1>

      <span class="stats">
        23 windows tidied
      </span>
    </header>

    <TabGroup v-for="n in 23"></TabGroup>
    <AdUnit></AdUnit>

  </div>
</template>

<script>
import TabGroup from './tab-group.vue';
import AdUnit from './ad-unit.vue';

export default {
  components: {
    AdUnit,
    TabGroup
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
    float: right;
    color: $color-secondary;
    font-weight: 300;
  }
}
</style>
