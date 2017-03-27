<template>
  <span class="stats">
    23 windows tidied
  </span>
</template>

<script>
export default {
  props: [
    'tabGroups'
  ]
}
</script>

<style lang="sass" scoped="true">
@import "../styles/settings";

.stats {
  color: $color-secondary;
  font-weight: 300;
}
</style>
