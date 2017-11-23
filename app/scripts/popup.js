/* eslint-disable no-unused-vars */
import 'babel-polyfill'
import store from '../store/index.js'
import Vue from 'vue'
import Popup from '../component/popup.vue'

import Vue2Filters from 'vue2-filters'
import AsyncComputed from 'vue-async-computed'

Vue.use(Vue2Filters)
Vue.use(AsyncComputed)

const app = new Vue({
  el: '#app',
  store,

  render () {
    return (
      <div data-theme="light">
        <Popup></Popup>
      </div>
    )
  }
})
