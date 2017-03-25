<template lang="html">
  <div>
    <TabGroup v-for="n in 10"></TabGroup>
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

<style>
</style>
