<template>
  <section>
    <h2>
      Apr. {{ count }} / {{ count }} tabs
      <span class="actions">
        <a href="#">Restore</a>
        <a href="#">Delete</a>
        <a href="#">Share</a>
      </span>
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
  background: linear-gradient(to left, $color-primary , $color-primary - 20);

  &:hover {
    h2, h3, li, a {
      color: rgba(white, 1);
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

.actions {
  float: right;
  font-size: 80%;
}
</style>
