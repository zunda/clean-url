export class UrlCleaner extends URL {
  static parse(string) {
    if (string) {
      const x = URL.parse(string)
      if (x) {
        return new UrlCleaner(x)
      }
    }
    return null
  }

  removeQueriesExceptFor(keep) {
    const keys = []
    for (const k of this.searchParams.keys()) {
      if (!keep[k]) {
        keys.push(k)
      }
    }
    for (const k of keys) {
      this.searchParams.delete(k)
    }
    return this
  }
}
