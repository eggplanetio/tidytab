<template lang="html">
  <div>
   <button @click="closeTabs">
    Tidy
   </button>
  </div>
</template>

<script>
export default {

  methods: {
    closeTabs () {
      chrome.storage.sync.set({'foo': { name: 'bar' }});
      chrome.storage.sync.set({'baz': { name: 'bar' }});
      chrome.storage.sync.get(null, function(items) {
        const allKeys = Object.keys(items);
      });

      chrome.windows.getCurrent(null, window => {
        chrome.tabs.query({}, tabs => {
          tabs.forEach(t => {
            if (t.windowId === window.id) {
              console.log(`Closing tab with url of ${t.url}`);
              chrome.tabs.remove(t.id)
            }
          })
        });
      });

      const dashboardURL = chrome.extension.getURL('pages/dashboard.html')
      chrome.tabs.create({ url: dashboardURL });
    }
  }
}
</script>

<style scoped="true" lang="sass">
@import '../styles/settings';
button {
  width: 100px;
  background: $color-primary;
  color: white;
}
</style>
