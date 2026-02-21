<template>
  <div class="urlCleaner">
    <input v-model="dirtyUrl"  placeholder="Dirty URL" type="url" />
    <br/>
    <input v-model="cleanUrl" placeholder="Clean URL" readonly="readonly" />
  </div>
</template>

<script>
import { UrlCleaner } from '../UrlCleaner'

export default {
  name: 'UrlCleanerComponent',
  data() {
    return {
      dirtyUrl: ""
    }
  },
  computed: {
    cleanUrl() {
      const x = UrlCleaner.parse(this.dirtyUrl)
      return x ? x.removeQueriesExceptFor([]).toString() : ""
    }
  }
}
</script>

<style scoped>
input {
  width: 100%;
  box-sizing: border-box
}
</style>
