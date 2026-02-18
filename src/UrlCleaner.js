export class UrlCleaner extends URL {
  static parse(string) {
    return new UrlCleaner(URL.parse(string))
  }

  removeQueries() {
    const keys = []
    for (const k of this.searchParams.keys()) {
      keys.push(k)
    }
    for (const k of keys) {
      this.searchParams.delete(k)
    }
    return this
  }
}
