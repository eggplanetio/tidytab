import 'babel-polyfill';
import store from '../store/index.js';
import Vue from 'vue';
import Popup from '../component/popup.vue';

import Vue2Filters from 'vue2-filters';
Vue.use(Vue2Filters);

import AsyncComputed from 'vue-async-computed'
Vue.use(AsyncComputed)

const app = new Vue({
  el: '#app',
  store,
  render () {
    return (
      <Popup></Popup>
    )
  }
})
