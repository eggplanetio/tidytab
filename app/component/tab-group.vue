<template>
  <section>
    <h2># {{group['x']}} tabs / April 3, 2016</h2>

    <ul>
      <li v-for="n in ">
        <a href="#">Link {{ n }}</a>
      </li>
    </ul>

    <button>
      Restore All
    </button>
  </section>
</template>

<script>
export default {
  props: ['group'],
  // data () {
  //   return {
  //     count: Math.round(Math.random() * 10),
  //   }
  // }
}
</script>

<style scope="true" lang="sass">
@import "../styles/settings";

section {
  margin-bottom: $size-unit;
}

h2 {
  font-weight: 600;
}
</style>
