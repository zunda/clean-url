<template>
  <UrlCleaner />
  <footer><p>Fork me at <a href="https://github.com/zunda/clean-url">zunda/clean-url</a>.</p></footer>
</template>

<script>
import UrlCleaner from './components/UrlCleaner.vue'

export default {
  name: 'App',
  components: {
    UrlCleaner
  }
}
</script>

<style>
#app {
  font-family: sans-serif;
}
footer {
  text-align: right;
  font-size: small;
}
</style>
