<script setup>
import { useClipboard } from "@vueuse/core"
import { UrlCleaner } from "../UrlCleaner"
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
    </p>
    <ul>
      <li v-for="query in parsedQueries" :key="query.id" >
        {{ query.field }}={{ query.value }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UrlCleanerComponent",
  data() {
    return {
      dirtyUrl: "",
      keep: ["v"]
    }
  },
  computed: {
    parsedUrl() {
      return URL.parse(this.dirtyUrl)
    },
    cleanUrl() {
      if (this.parsedUrl) {
        return new UrlCleaner(this.parsedUrl).removeQueriesExceptFor(this.keep).toString()
      } else {
        return ""
      }
    },
    parsedQueries() {
      const q = []
      if (this.parsedUrl) {
        var i = 0
        for (const [f, v] of this.parsedUrl.searchParams.entries()) {
          q.push({ id: i, field: f, value: v })
        }
      }
      return q
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
