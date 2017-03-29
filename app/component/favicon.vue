<template>
  <span>
    <img :src="faviconUrl" :title="title">
  </span>
</template>

<script>
export default {
  props: [
    'url',
    'title',
  ],
  computed: {
    faviconUrl () {
      return this.url || 'https://www.google.com/s2/favicons?domain=test';
    }
  }
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
