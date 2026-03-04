import { describe, expect, test } from 'vitest'
import { cleanPathFrom } from './pathCleaner'

describe('UrlCleaner', () => {
  test('clean Amazon like path', () => {
    const dirty = "/example-product/dp/ABC012/"
    const clean = "/dp/ABC012/"
    expect(cleanPathFrom(dirty)).toBe(clean)
  })

  test('doesn\'t change non-Amazon like path', () => {
    [
      "/example/product/dp/ABC012",
      "/example-product/x/dp/ABC012",
      "/example-product/dp/",
      "/example-product/dp"
    ].forEach((path) => {
      expect(cleanPathFrom(path)).toBe(path)
    })
  })
})
