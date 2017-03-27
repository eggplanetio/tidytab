<template lang="html">
  <div>
    <TabGroup v-for="group in groups" :group="group"></TabGroup>
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
  },
  data () {

    let x = {groups: [{'x':3},{'x':4},{'x':5}]}

    // chrome.storage.sync.get('tidy_storage', function(items) {
    //   x = {groups: items['tidy_storage']};
    //   this.$set('groups', x)
    //   vm.$forceUpdate();
    // });

    return x;
  }

}
</script>

<style>
</style>
