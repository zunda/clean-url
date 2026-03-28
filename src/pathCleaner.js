export function cleanPathFrom(path) {
  const m = RegExp('^(/-/[a-z]+)?(/[^/]+)?(?<clean>/dp/[A-Za-z0-9]+/?)').exec(path)
  if (m && m.groups) {
    return m.groups.clean
  }
  return path
}
