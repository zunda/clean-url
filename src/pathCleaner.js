export function cleanPathFrom(path) {
  return path.replace(RegExp("^/(-/[a-z]+/)?.[^/]+/dp/(?=[A-Za-z0-9])"), "/dp/")
}
