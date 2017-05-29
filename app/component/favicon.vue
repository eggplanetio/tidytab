<template>
  <span>
    <img :src="faviconUrl" :title="title">
  </span>
</template>

<script>
export default {
  props: [
    'url',
    'title'
  ],
  computed: {
    faviconUrl () {
      const parser = document.createElement('a')
      parser.href = this.url
      return `https://www.google.com/s2/favicons?domain=${parser.host}`
    }
  }
}
</script>

<style lang="scss" scoped="true">
@import "../styles/settings";

img {
  height: $size-unit/1.5;
  vertical-align: middle;
  margin-right: $size-unit/3;
}
</style>
