import { describe, expect, test } from 'vitest'
import { parseUrl } from './helpers'

describe('parseUrl', () => {
  test('parses a minimal URL', () => {
    const parsed = parseUrl('https://example.com')
    const expected = { host: 'example.com', protocol: 'https:' }
    Object.entries(expected).forEach(([prop, goal]) => {
      expect(parsed[prop]).toBe(goal)
    })
  })
})


