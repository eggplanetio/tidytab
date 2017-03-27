import Vue from 'vue';
import Dashboard from '../component/dashboard.vue';

var app = new Vue({
  el:'#app',
  render: h => h(Dashboard)
})
