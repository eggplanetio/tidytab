<template>
  <section>
    <h2># {{tabCount}} tabs / {{displayDate}}</h2>

    <ul>
      <li v-for="n in tabs">
        <img v-bind:src="n.icon"><a v-bind:href="n.url">{{n.title}}</a>
      </li>
    </ul>

    <button>
      Restore All
    </button>
  </section>
</template>

<script>
export default {
  props: ['group', 'timestamp'],
  computed: {
    tabCount () {
      return this.group["data"].length
    },
    tabs () {
      return this.group["data"]
    },
    displayDate () {
      return new Date(parseInt(this.timestamp)).toString()
    }
  }
  
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
li img {
  height: 20px;
  width: 20px;
}
</style>
