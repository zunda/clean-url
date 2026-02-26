<script setup>
import { useClipboard } from "@vueuse/core"
import { UrlCleaner } from "../UrlCleaner"
const { copy, copied, isSupported } = useClipboard()
</script>

<template>
  <div class="urlCleaner">
    <p class="urlRow">
      <input class="url" v-model="dirtyUrl"  placeholder="Dirty URL" type="url" />
    </p>
    <p class="urlRow">
      <input class="url" v-model="cleanUrl" placeholder="Clean URL" readonly="readonly" />
      <span v-if="isSupported">
        <button @click="copy(cleanUrl)" :disabled="!cleanUrl" >
          <span v-if="!copied">Copy</span>
          <span v-else>Copied</span>
        </button>
      </span>
    </p>
    <ol>
      <li v-for="query in parsedQueries" :key="query.id" >
        <input type="checkbox" :id="query.id" :checked="keep[query.field]" :value="query.field" @change="check" />
        <label :for="query.id">{{ query.field }}={{ query.value }}</label>
      </li>
      <li v-if="parsedFragment">
        <input type="checkbox" id="fragment" :checked="keepFragment" @change="checkFragment" />
        <label for="fragment">{{ parsedFragment }}</label>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "UrlCleanerComponent",
  data() {
    return {
      dirtyUrl: "",
      keep: {
        q: true,
        v: true,
        t: true
      },
      keepFragment: true
    }
  },
  computed: {
    parsedUrl() {
      return URL.parse(this.dirtyUrl)
    },
    cleanUrl() {
      if (this.parsedUrl) {
        const cleanUrl = new UrlCleaner(this.parsedUrl)
        cleanUrl.removeQueriesExceptFor(this.keep)
        if (!this.keepFragment) {
          cleanUrl.hash = ""
        }
        return cleanUrl.toString()
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
          i++
        }
      }
      return q
    },
    parsedFragment() {
      if (this.parsedUrl) {
        return this.parsedUrl.hash
      } else {
        return ""
      }
    }
  },
  methods: {
    check(event) {
      this.keep[event.target.value] = event.target.checked
    },
    checkFragment(event) {
      this.keepFragment = event.target.checked
    }
  }
}
</script>

<style scoped>
p.urlRow {
  display: flex;
}
input.url {
  flex-grow: 100;
  font-family: monospace;
}
button {
  width: 5em;
}

ol {
  padding: 0;
  list-style: none;
}
li {
  display: flex;
}
label {
  flex-grow: 100;
  font-family: monospace;
  text-wrap-mode: nowrap;
}
</style>
