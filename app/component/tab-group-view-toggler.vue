<template>
  <a @click="toggleView" title="Toggle">
    <span v-if="groupByDate">Group by Tidy</span>
    <span v-else>Group by Date</span>
  </a>
</template>

<script>
import store, { TAB_GROUP_VIEWS } from '../store/index.js'
import { mapState } from 'vuex'

export default {
  methods: {
    toggleView () {
      const view = this.tabGroupView === TAB_GROUP_VIEWS[0]
                   ? TAB_GROUP_VIEWS[1] : TAB_GROUP_VIEWS[0]
      store.commit('SET_TAB_GROUP_VIEW', view)
    }
  },
  computed: {
    ...mapState([ 'tabGroupView' ]),

    groupByDate () {
      return this.tabGroupView === 'group-by-date'
    }
  }
}
</script>

<style scoped lang="scss">
@import "../styles/settings";
</style>
