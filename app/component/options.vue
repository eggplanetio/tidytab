<template lang="html">
  <form action="">
    <ul>

      <li>
        <h2>
          Dashboard Theme
        </h2>
        <p>
          Choose a dashboard theme.
        </p>
        <p>
          <ThemeSelector/>
        </p>
      </li>

      <li>
        <h2>
          Tab Storage
        </h2>
        <p>
          TidyTab uses your bookmarks to store each individual group after you tidy.
        </p>
        <p>
          <BookmarkIndicator/>
        </p>
        <p>
          <BookmarkSelector/>
        </p>
      </li>

      <li>
        <h2>
          Silently Reject Duplicates
        </h2>
        <p>
          When enabled, TidyTab will look through your bookmarks and check if you've already
          saved the current tab. If so, it will be cleared but not saved.
        </p>
        <p>
          <OptionSilentlyReject/>
        </p>
      </li

      <li>
        <h2>
          Post-Tidy Behavior
        </h2>
        <p>
          By default, TidyTab opens a dashboard of all of your tabs after you tidy.
          You can change this below.
        </p>
        <p>
          <OptionPostTidyBehavior/>
        </p>
      </li>

      <li>
        <h2>
          Tab-Saving Behavior
        </h2>
        <p>
          By default, TidyTab will create a unique group for each tidy. This can get cumbersome
          when you often tidy one or two tabs. This will not affect already tidied tabs.
          Pro-tip: if you'd like to move bookmarks around, you can simply open the
          <a href="chrome://bookmarks/" target="_blank">Bookmark Manager</a> and move things around there.

        </p>
        <input type="radio" name="save-strategy"> Group by date added <br>
        <input type="radio" name="save-strategy" checked="checked"> Each tidy gets its own group (default)
      </li>

      <li>
        <h2>Key Board Shortcuts</h2>
        <p>
          Tidy: <kbd>Alt + t</kbd> <kbd>Alt + t</kbd> (double keypress)
        </p>
      </li>

    </ul>


  </form>
</template>

<script>
import './bookmark-selector.js'
import ThemeSelector from './theme-selector.vue'
import BookmarkIndicator from './bookmark-indicator.vue'
import OptionPostTidyBehavior from './option-post-tidy-behavior.vue'
import OptionSilentlyReject from './option-silently-reject.vue'

export default {
  components: {
    ThemeSelector,
    BookmarkIndicator,
    OptionPostTidyBehavior,
    OptionSilentlyReject
  }
}
</script>

<style scoped="true" lang="scss">
@import '../styles/colors';
@import '../styles/settings';

form {
  line-height: 1.7;
  padding: $size-unit;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  margin-bottom: $size-unit * 2;
}

input[type="text"],
select {
  display: block;
  width: 100%;
}

h2 {
  margin-top: 0;
  font-size: $font-size;
  display: block;
  margin-bottom: $size-unit;

  strong {
    display: block;
  }
}

p {
  margin-top: 0;
}

#folder {
  margin-bottom: $size-unit/2;
}

select[multiple="multiple"],
select[multiple="multiple"]:hover {
  background: none;
  padding: 0;
}

img.toolbar-icon {
  height: $size-unit;

  &.light {
    background: black;
  }
}

</style>

<style lang="scss">
@import "../styles/colors";
@import "../styles/settings";

.bookmark-selector {
  .multiselect {
    font-size: 13px;
  }

  .multiselect__tags {
    padding-top: 6px;
    border-radius: 0;
  }

  input[type="text"].multiselect__input {
    border: none;
  }
}

kbd {
  padding:0.1em 0.6em;
  border:1px solid #ccc;
  font-size:11px;
  font-family: Arial,Helvetica,sans-serif;
  background-color:#f7f7f7;
  color:#333;
  box-shadow:0 1px 0px rgba(0, 0, 0, 0.2),0 0 0 2px #ffffff inset;
  border-radius:3px;
  display:inline-block;
  margin:0 0.1em;
  text-shadow:0 1px 0 #fff;
  white-space:nowrap;
}

</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
