<template>
  <span>
    <label>
      <input type="file" class="import" name="file" @change="importFile" title="Import"/>
      Import
    </label>
  </span>
</template>

<script>
import store from '../store/index.js'
export default {
  props: [
    'tabGroup'
  ],
  methods: {
    importFile (e) {
      const file = e.target.files[0] || e.dataTransfer.files[0]
      const reader = new FileReader()
      reader.onload = readFile => {
        try {
          const raw = JSON.parse(readFile.target.result)
          store.dispatch('IMPORT_DATA', raw)
        } catch (e) {
          alert('Import failed.')
        }
      }

      const blob = reader.readAsText(file)
    }
  }
}
</script>

<style scoped lang="sass">
@import "../styles/settings";
@import "../styles/colors";

.import {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
</style>
