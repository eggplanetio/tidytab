<template>
  <span>
    <img :src="imgSrc" alt="favicon">
  </span>
</template>

<script>
export default {
  props: [
    'url'
  ],
  computed: {
    host () {
      return this.url;
    },
    imgSrc () {
      return `https://www.google.com/s2/favicons?domain=${this.host}`
    }
  }
}
</script>

<style lang="sass" scoped="true">
@import "../styles/settings";

.favicon {
  height: $size-unit/1.5;
  vertical-align: middle;
  margin-right: $size-unit/3;
}
</style>
