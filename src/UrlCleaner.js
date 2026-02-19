export class UrlCleaner extends URL {
  static parse(string) {
    return new UrlCleaner(URL.parse(string))
  }

  removeQueriesExceptFor(keep) {
    const keys = []
    for (const k of this.searchParams.keys()) {
      if (!keep.includes(k)) {
        keys.push(k)
      }
    }
    for (const k of keys) {
      this.searchParams.delete(k)
    }
    return this
  }
}
