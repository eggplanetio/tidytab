<template>
  <span class="stats">
    {{ tabGroups.length }} windows tidied
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
