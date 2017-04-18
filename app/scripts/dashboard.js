import 'babel-polyfill';

import Vue from 'vue';

import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);

import VueTruncate from 'vue-truncate-filter';
Vue.use(VueTruncate);

import HostFilter from '../../lib/host-filter.js';
Vue.use(HostFilter);

Vue.use(require('vue-moment'));

import store from '../store/index.js';
import { mapGetters } from 'vuex';

import Dashboard from '../component/dashboard.vue';

const app = new Vue({
  el:'#app',
  store,
  render (h) {
    return (
      <Dashboard tabGroups={ this.sortedAndFilteredTabGroups }>
      </Dashboard>
    )
  },
  computed: {
    ...mapGetters([ 'sortedAndFilteredTabGroups' ]),
  }
})
