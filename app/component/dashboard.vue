<template lang="html">
  <div>
    <header class="app-header">
      <h1>
        <img class="icon" src="/images/logo.png" alt="icon"> TidyTab
        <span class="sep">/</span>
        <DashboardStats :tabGroups="tabGroups"></DashboardStats>
        <span class="sep">/</span>
        <Search :query='searchQuery'/>
      </h1>

      <span class="actions-and-stats">
        <Export/>
        <span class="sep">/</span>
        <Import/>
        <span class="sep">/</span>
        <SettingsLauncher/>
      </span>
    </header>

    <div class="tab-groups">
      <span v-for="tabGroup in tabGroups">
        <TabGroup :tabGroup="tabGroup"></TabGroup>
      </span>
    </div>

    <footer>
      useful software by <a href="http://www.eggplanet.io/" target="_blank">eggplanet</a> |
      <a href="https://github.com/eggplanetio/tidytab/issues" target="_blank">file a bug or request a feature</a> |
      v{{ version }} |
      {{ theme }} theme
    </footer>
  </div>
</template>

<script>
import DashboardStats from './dashboard-stats.vue';
import Export from './export.vue';
import Import from './import.vue';
import Search from './search.vue';
import SettingsLauncher from './settings-launcher.vue';
import TabGroup from './tab-group.vue';
import { mapState } from 'vuex';

import ChromePromise from 'chrome-promise';
const chromep = new ChromePromise()

export default {
  components: {
    DashboardStats,
    Export,
    Import,
    Search,
    SettingsLauncher,
    TabGroup,
  },

  props: [
    'tabGroups'
  ],

  computed: {
    ...mapState([
      'searchQuery',
      'theme',
      'version',
    ]),
  }
}
</script>

<style scoped="true" lang="sass">
@import "../styles/colors";
@import "../styles/settings";

header {
  margin-bottom: $size-unit * 2;

  .sep {
    color: $color-light-gray;
    font-weight: 300;
    opacity: 0.5;
  }

  h1 {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 600;

    .icon {
      vertical-align: middle;
      height: $size-unit * 2;
      margin-right: $size-unit/2;
    }
  }
}

.tab-groups {
  padding-left: $size-unit/2;
  flex: 1;
}

footer {
  opacity: 0.5;
  text-align: center;
  font-size: $font-size-super-small;

  a {
    color: $color-light-gray;
    text-decoration: underline;
  }
}
</style>

<style lang="sass">

@import "../styles/colors";
@import "../styles/settings";

.actions-and-stats {
  float: right;

  label, a {
    font-size: $font-size-small;
    border: none;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
