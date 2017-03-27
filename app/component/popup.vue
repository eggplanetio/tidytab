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
                icon: t.favIconUrl,
                title: t.title
              })
            }
          })

          chrome.storage.sync.get('tidy_storage', function(items) {
            let tabData = items['tidy_storage'] || {};

            chrome.extension.getBackgroundPage().console.log(data)

            tabData[timeStamp] = {data: data};

            chrome.storage.sync.set({'tidy_storage': tabData});
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
            // chrome.tabs.remove(t.id);
          })
        });
      });
    }
  }
}
</script>

<style scoped="true">
button {
  width: 100px;
}
</style>
