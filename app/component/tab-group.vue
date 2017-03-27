<template>
  <section :class="{ collapsed }">

    <header>
      <h2>
        {{ count }} tabs
      </h2>
      <date>
        April 3, 2016 at 5:13PM
      </date>

      <span class="fav-group">
        <span class="fav-wrapper" v-for="n in count">
          <img src="https://www.google.com/s2/favicons?domain=github.com" alt="favicon">
        </span>
      </span>

      <div class="button-group actions">
        <a href="#">Restore</a>
        <a href="#">Delete</a>

        <a href="#" @click="toggleCollapse">
          {{ toggleText }}
        </a>
      </div>
    </header>

    <ul>
      <li v-for="n in count">
        <img src="https://www.google.com/s2/favicons?domain=github.com" alt="favicon" class="favicon">
        espn.com
        <span class="tab-actions">
          <a href="#">open</a> <a href="#">remove</a> <a href="#">view screenshot</a>
        </span>
      </li>
    </ul>

  </section>
</template>

<script>
export default {
  data () {
    return {
      collapsed: true,
      count: Math.round(Math.random() * 3) + 3,
    }
  },
  computed: {
    isCollapsed () {
      // if (this.props.isCollapsed) return true;
      return this.collapsed;
    },
    toggleText () {
      return this.collapsed ? 'Expand' : 'Collapse';
    }
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    }
  }
}
</script>

<style scoped lang="sass">
@import "../styles/settings";

section {
  margin-bottom: $size-unit;
  border-radius: 1px;
  padding: $size-unit * 1.5;
  box-shadow: 0 3px 3px rgba(black, 0.1);
  background: linear-gradient(to left, desaturate($color-primary, 15%), desaturate($color-primary, 10%));

  * { transition: all 250ms ease; }
}

section.collapsed {
  ul { display: none; }
  header { margin-bottom: 0; }
  .fav-group { display: inline-block; }
}

header {
  margin-bottom: $size-unit;
}

h2 {
  display: inline;
  font-weight: 600;
}

date {
  font-size: $font-size-small;
  opacity: 0.5;
}

.actions {
  float: right;
  font-size: $font-size-small;
}

ul {
  li {
    .favicon {
      height: $size-unit/1.5;
      vertical-align: middle;
      margin-right: $size-unit/3;
    }

    .tab-actions {
      opacity: 0;
      a {
        font-size: $font-size-small;
        opacity: 0.5;
        margin-left: $size-unit/2;
        &:hover { opacity: 1; }
      }
    }

    &:hover {
      .tab-actions { opacity: 1; }
    }
  }
}

.actions {
  float: right;
}

.fav-group {
  margin-left: $size-unit;
  display: none;

  .fav-wrapper {
    display: inline-block;
    border-radius: 50%;
    text-align: center;
    margin-right: $size-unit/4;
    img { height: 15px; }
  }
}
</style>
