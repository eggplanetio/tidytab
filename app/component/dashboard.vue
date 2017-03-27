<template lang="html">
  <div>
    <TabGroup v-for="(group, timestamp) in groups" :group="group" :timestamp="timestamp"></TabGroup>
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

  methods: {
    fetchData () {
      chrome.storage.sync.get('tidy_storage', (items) => {
        let data = items['tidy_storage'];
        this.groups = data
      })
    }
  },

  created () {
    this.fetchData();
  },

  data () {
    return {
      groups: []
    }
  }

}
</script>

<style>
</style>
