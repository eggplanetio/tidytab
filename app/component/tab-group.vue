<template>
  <section>
    <h2>
      Apr. {{ count }} / {{ count }} tabs
      <a href="#" class="restore">Restore</a>
    </h2>

    <ul>
      <li v-for="n in count">
        <a href="#">espn.com</a>
      </li>
    </ul>

  </section>
</template>

<script>
export default {
  data () {
    return {
      count: Math.round(Math.random() * 3) + 3,
    }
  }
}
</script>

<style scoped lang="sass">
@import "../styles/settings";

section {
  margin-bottom: $size-unit;
  border-radius: 2px;
  padding: $size-unit * 2;
  box-shadow: 0 3px 3px rgba(black, 0.2);

  background: #673AB7; /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #673AB7 , #512DA8); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #673AB7 , #512DA8); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  &:hover {
    h2, h3, li, a {
      color: white;
    }
  }
}

h2 {
  font-weight: 600;
}

h2, h3, li, a {
  color: rgba(white, 0.8);
  transition: all 250ms ease;
}

a.restore {
  float: right;
}
</style>
