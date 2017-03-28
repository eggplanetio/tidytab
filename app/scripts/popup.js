import 'babel-polyfill';
import store from '../store/index.js';
import Vue from 'vue';
import Popup from '../component/popup.vue';

var app=new Vue({
  el: '#app',
  store,
  render () {
    return (
      <Popup></Popup>
    )
  }
})
