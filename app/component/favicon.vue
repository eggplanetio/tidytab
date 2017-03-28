<template>
  <span>
    <object :data="imgSrc" type="image/jpg" class="favicon">
      <img src="https://www.google.com/s2/favicons?domain=test">
    </object>
  </span>
</template>

<script>
export default {
  props: [
    'icon'
  ],
  computed: {
    imgSrc () {
      if(this.icon === ""){
        return 'https://www.google.com/s2/favicons?domain=this.tab'
      }
      return this.icon;
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
