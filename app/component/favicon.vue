<template>
  <span>
    <img :src="url" :title="title">
  </span>
</template>

<script>
export default {
  props: [
    'url',
    'title',
  ],
}
</script>

<style lang="sass" scoped="true">
@import "../styles/settings";

img {
  height: $size-unit/1.5;
  vertical-align: middle;
  margin-right: $size-unit/3;
}
</style>
