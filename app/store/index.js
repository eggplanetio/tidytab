import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({

  state: {
    tabGroups: [
      {
        createdAt: new Date().toString(),
        tabs: [
          { url: "https://espn.com/kobe", title: 'ESPN – Kobe Bryant' },
          { url: "https://google.com/kobe", title: 'Google Search - kobe' },
        ]
      },
      {
        createdAt: new Date().toString(),
        tabs: [
          { url: "https://espn.com/kobe", title: 'ESPN – Kobe Bryant' },
          { url: "https://google.com/kobe", title: 'Google Search - kobe' },
        ]
      }
    ]
  },

  actions: {
    async HYDRATE_STATE ({ dispatch, commit }) {
      /* chrome.storage.sync.get */
    },
  },

  mutations: {
    CREATE_TAB_GROUP (state, data) {
    },
    DELETE_TAB_GROUP (state, data) {
    },
    REMOVE_TAB_FROM_GROUP (state, data) {
    },
  },

  getters: {
    exampleGetter: state => {
    }
  }

})

export default store
