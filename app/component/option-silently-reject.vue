<template>
  <span>
    <label for="silently-reject">
      <input
        type="checkbox"
        name="silently-reject"
        v-model="silentlyRejectDuplicates"
        @change="onSelect"> Silently reject duplicates
    </label>
  </span>
</template>

<script>
import store from '../store/index.js'
import { mapState } from 'vuex'

export default {
  methods: {
    onSelect (e) {
      store.commit('SET_SILENTLY_REJECT_DUPLICATES', e.target.checked)
    }
  },

  computed: {
    ...mapState([ 'silentlyRejectDuplicates' ])
  }
}
</script>
