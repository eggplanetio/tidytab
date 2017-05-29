<template>
  <span>
    <input type="radio" name="post-tidy-behavior" v-model="postTidyBehavior" value="dashboard" @change="onBehaviorSelect" id="dashboard"/> <label for="dashboard">Open the TidyTab dashboard (default) </label><br>
    <input type="radio" name="post-tidy-behavior" v-model="postTidyBehavior" value="new-tab" @change="onBehaviorSelect" id="new-tab"/> <label for="new-tab">Open default new tab</label>
  </span>
</template>

<script>
import store, { THEMES } from '../store/index.js'
import { mapState } from 'vuex'

export default {
  data: () => ({
    THEMES
  }),

  methods: {
    onBehaviorSelect (e) {
      store.commit('SET_POST_TIDY_BEHAVIOR', e.target.value)
    }
  },

  computed: {
    ...mapState([ 'postTidyBehavior' ])
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/settings';

input {
  margin-right: $size-unit/2;
}
</style>
