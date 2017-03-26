<template lang="html">
  <div>

    <h1>
      🚿
    </h1>

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

<style scoped lang="sass">
@import "../styles/settings";

title {
  margin: $size-unit * 3;
}

h1 {
  text-align: center;
  font-size: 400%;
  font-style: italic;
}
</style>
