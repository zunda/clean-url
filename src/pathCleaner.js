export function cleanPathFrom(path) {
  return path.replace(RegExp("^/.[^/]+/dp/(?=[A-Za-z0-9])"), "/dp/")
}
