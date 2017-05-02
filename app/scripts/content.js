// console.log('Hello from content script.');

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';

import 'babel-polyfill';
import store from '../store/index.js';
import Vue from 'vue';
import Popup from '../component/popup.vue';

const app = new Vue({
  el: '#app',
  store,
  render (h) {
    return (<Popup></Popup>)
  }
})

async function tidy () {
  const tabs = await store.dispatch('SAVE_TAB_GROUP')
}

const map = {}
document.addEventListener('keydown', e => {
  const slug = `${ e.shiftKey ? 'shift-' : '' }${ e.ctrlKey ? 'ctrl-' : '' }${ e.metaKey ? 'meta-' : '' }${e.key}`
  map[slug] = map[slug] || []
  map[slug].forEach(clearTimeout)
  map[slug].push(setTimeout(() => delete map[slug], 300))
  if (map[slug].length === 2 && slug === 'ctrl-c') {
    console.log(`Tidying via `)
    document.body.style.backgroundColor = 'red';
  };
})
