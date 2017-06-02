/* eslint-disable no-unused-vars */

import 'babel-polyfill'
import Vue from 'vue'
import Vue2Filters from 'vue2-filters'
import VueTruncate from 'vue-truncate-filter'
import HostFilter from '../../lib/host-filter.js'
import VueHead from 'vue-head'
import store from '../store/index.js'
import { mapGetters, mapState } from 'vuex'
import Dashboard from '../component/dashboard.vue'
import AsyncComputed from 'vue-async-computed'

Vue.use(VueTruncate)
Vue.use(require('vue-moment'))

Vue.use(VueHead)
Vue.use(HostFilter)
Vue.use(Vue2Filters)
Vue.use(AsyncComputed)

export default new Vue({
  el: '#app',
  store,
  render (h) {
    return (
      <div class="app" data-theme={this.theme}>
        <Dashboard tabGroups={this.sortedAndFilteredTabGroups}>
        </Dashboard>
      </div>
    )
  },
  computed: {
    ...mapGetters(['sortedAndFilteredTabGroups']),
    ...mapState(['theme'])
  }
})
