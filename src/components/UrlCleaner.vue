<script setup>
import { useClipboard } from '@vueuse/core'
import { UrlCleaner } from '../UrlCleaner'
const { copy, copied, isSupported } = useClipboard()
</script>

<template>
  <div class="urlCleaner">
    <p class="urlRow">
      <input v-model="dirtyUrl"  placeholder="Dirty URL" type="url" />
    </p>
    <p class="urlRow">
      <input v-model="cleanUrl" placeholder="Clean URL" readonly="readonly" />
      <span v-if="isSupported">
        <button @click="copy(cleanUrl)" :disabled="!cleanUrl" >
          <span v-if="!copied">Copy</span>
          <span v-else>Copied</span>
        </button>
      </span>
      <span v-else>
        Oops
      </span>
    </p>
  </div>
</template>

<script>
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
      return x ? x.removeQueriesExceptFor(["v"]).toString() : ""
    }
  }
}
</script>

<style scoped>
p.urlRow {
  display: flex;
}
input {
  flex-grow: 100;
}
button {
  width: 5em;
}
</style>
