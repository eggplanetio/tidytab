<template lang="html">
  <form action="">
    <ul>

      <li>
        <h2>
          Dashboard Theme
        </h2>
        <p>
          Choose a dashboard theme.
        </p>
        <select id="theme" v-model="theme" @change="onThemeSelect">
          <option v-for="theme in THEMES" :value="theme">{{ theme }}</option>
        </select>
      </li>

      <li>
        <h2>
          Tab Storage
        </h2>
        <p>
          TidyTab uses your bookmarks to store each individual group after you tidy.
          By default TidyTab stores all data inside of <code>Other Bookmarks -> TidyTab</code>.
        </p>
        <p>
          <bookmark-indicator/>
        </p>
        <bookmark-selector/>
      </li>


      <div v-if="enableTabSavingStrategy">
        <li>
          <h2>
            Tab-Saving Strategy
          </h2>
          <p>
            By default, TidyTab will create a unique group for each tidy. This can get cumbersome
            when you often tidy one or two tabs. This will not affect already tidied tabs.
            Pro-tip: if you'd like to move bookmarks around, you can simply open the
            <a href="chrome://bookmarks/" target="_blank">Bookmark Manager</a> and move things around there.

          </p>
          <input type="radio" name="save-strategy"> Group by date added <br>
          <input type="radio" name="save-strategy" checked="checked"> Each tidy gets its own group (default)
        </li>
      </div>
    </ul>

  </form>
</template>

<script>
import tidyHelpers from '../../lib/helpers.js';
import BookmarkSelector from './bookmark-selector.js';
import BookmarkIndicator from './bookmark-indicator.vue';

import store from '../store/index.js';
import { THEMES } from '../store/index.js';
import ChromePromise from 'chrome-promise';
const chromep = new ChromePromise();
import { mapState } from 'vuex';


export default {

  data: () => ({
    enableTabSavingStrategy: false,
    THEMES
  }),

  components: {
    BookmarkIndicator
  },

  methods: {
    onThemeSelect(e) {
      store.commit('SET_THEME', e.target.value);
    },
  },

  computed: {
    ...mapState([
      'theme',
    ]),
  },

}
</script>

<style scoped="true" lang="sass">
@import '../styles/colors';
@import '../styles/settings';

form {
  line-height: 1.7;
  padding: $size-unit;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  margin-bottom: $size-unit;
}

input[type="text"],
select {
  display: block;
  width: 100%;
}

h2 {
  margin-top: 0;
  font-size: $font-size;
  display: block;
  margin-bottom: $size-unit/2;

  strong {
    display: block;
  }
}

p {
  margin-top: 0;
}

#folder {
  margin-bottom: $size-unit/2;
}

select[multiple="multiple"],
select[multiple="multiple"]:hover {
  background: none;
  padding: 0;
}

img.toolbar-icon {
  height: $size-unit;

  &.light {
    background: black;
  }
}

</style>

<style lang="sass">
@import "../styles/colors";
@import "../styles/settings";

.bookmark-selector {

  .multiselect {
    font-size: 13px;
  }

  .multiselect__tags {
    padding-top: 6px;
    border-radius: 0;
  }

  input[type="text"].multiselect__input {
    border: none;
  }
}
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
