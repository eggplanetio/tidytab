<template lang="html">
  <div>

  <title>
    <h1>
      TidyTab
    </h1>

    <h2>
      23 windows
    </h2>
  </title>

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
  font-size: 250%;
  font-style: italic;
}

h1, h2 {
  text-align: center;
}
</style>
