<template>
  <span>
    <img :src="blobUrl" alt="">
  </span>
</template>

<script>
import parse from 'url-parse'

function loadImgAsDataUri (url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'

    xhr.onerror = () => resolve()
    xhr.onload = () => {
      if (xhr.status >= 400) resolve()

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
    'url'
  ],

  computed: {
    host () {
      const parser = parse(this.url)
      return parser.host
    },

    protocol () {
      const parser = parse(this.url)
      return parser.protocol
    }
  },

  asyncComputed: {
    async blobUrl () {
      // Is it already a favicon?
      if (this.url.startsWith('data:image/jpeg')) {
        return this.url
      }

      const faviconUrls = [
        `https://www.google.com/s2/favicons?domain=${this.host}`,       // Favicon from Google
        `${this.protocol}//${this.host}/favicon.png`,                   // Favicon from site (png)
        `${this.protocol}//${this.host}/favicon.ico`                    // Favicon from site (ico)
      ]

      let blobUrl
      for (let faviconUrl of faviconUrls) {
        if (blobUrl) break
        blobUrl = await loadImgAsDataUri(faviconUrl)
        if (blobUrl) return blobUrl
      }
    }
  }
}
</script>

<style lang="scss" scoped="true">
@import "../styles/settings";

span {
  width: $size-unit;
  display: inline-block;
}

img {
  height: $size-unit/1.5;
  vertical-align: middle;
}
</style>
