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
    saveTabData (tabs){
      const timeStamp = Date.now();

      chrome.windows.getCurrent(null, window => {
        chrome.tabs.query({}, tabs => {
          let data = [];

          tabs.forEach(t => {
            if (t.windowId === window.id) {
              data.push({
                url: t.url,
                title: t.title,
                icon: t.favIconUrl,
              })
            }
          })

          chrome.storage.sync.get('tidyStorage', function(items) {
            let tabData = items['tidyStorage'] || [];

            tabData.push({timeStamp: timeStamp, tabs: data});

            chrome.storage.sync.set({'tidyStorage': tabData});
          });          
        });
      });
    },
    closeTabs () {
      this.saveTabData()

      chrome.windows.getCurrent(null, window => {
        chrome.tabs.query({}, tabs => {

          let windowTabs = tabs.filter(t => t.windowId === window.id);
          
          let tabsClosed = 0

          windowTabs.forEach(t => {
            tabsClosed++;
            if(tabsClosed == windowTabs.length){
              const dashboardURL = chrome.extension.getURL('pages/dashboard.html')
              chrome.tabs.create({ url: dashboardURL });
            }
            chrome.tabs.remove(t.id);
          })
        });
      });
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
