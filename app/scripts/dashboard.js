import 'babel-polyfill';

import Vue from 'vue';
Vue.use(require('vue-moment'));

import store from '../store/index.js';
import { mapGetters } from 'vuex';

import Dashboard from '../component/dashboard.vue';

const app = new Vue({
  el:'#app',
  store,
  render (h) {
    return (
      <Dashboard tabGroups={ this.sortedTabGroups }>
      </Dashboard>
    )
  },
  computed: {
    ...mapGetters([ 'sortedTabGroups' ]),
  }
})
