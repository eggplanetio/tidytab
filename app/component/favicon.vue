<template>
  <span>
    <img v-if="faviconUrl" :src="faviconUrl" :title="title">
  </span>
</template>

<script>
function loadImgAsDataUri (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'

    xhr.onerror = () => resolve()
    xhr.onload = () => {
      const arrayBufferView = new Uint8Array(xhr.response)
      const blob = new Blob([ arrayBufferView ], { type: 'image/jpeg' })
      const reader = new window.FileReader()
      reader.onloadend = () => {
        if (reader.result === 'data:') return resolve()
        resolve(reader.result)
      }
      reader.readAsDataURL(blob)
    }

    xhr.send()
  })
}

export default {
  props: [
    'url',
    'title'
  ],
  data () {
    return { faviconUrl: false }
  },
  async created () {
    const parser = document.createElement('a')
    parser.href = this.url

    const urls = [
      `${parser.protocol}//${parser.host}/favicon.ico`,            // Favicon from site
      `https://www.google.com/s2/favicons?domain=${parser.host}`,   // Favicon from Google
      `generic-favicon`
    ]

    let blobUrl = await loadImgAsDataUri(urls[0])
    if (blobUrl) {
      this.faviconUrl = blobUrl
    } else {
      blobUrl = await loadImgAsDataUri(urls[1])
      this.faviconUrl = blobUrl
    }
  }
}
</script>

<style lang="scss" scoped="true">
@import "../styles/settings";

img {
  height: $size-unit/1.5;
  vertical-align: middle;
  margin-right: $size-unit/3;
}
</style>
