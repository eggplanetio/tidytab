<template>
  <span class="stats">
    {{ tabGroups.length }} {{ tabGroups.length  | pluralize("window") }}
  </span>
</template>

<script>
export default {
  props: [
    'tabGroups'
  ]
}
</script>

<style lang="scss" scoped="true">
@import "../styles/settings";
</style>
