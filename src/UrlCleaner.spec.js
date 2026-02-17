import { describe, expect, test } from 'vitest'
import { parseUrl } from './helpers'

describe('parseUrl', () => {
  test('parses a minimal URL', () => {
    const parsed = parseUrl('https://example.com')
    const expected = { hostname: 'example.com', protocol: 'https:' }
    Object.entries(expected).forEach(([prop, goal]) => {
      expect(parsed[prop]).toBe(goal)
    })
  })

  test('parses a full URL', () => {
    const parsed = parseUrl('https://user:pass@www.example.com/path/to?p=parameter&q=query#fragment')
    const expected = {
      hash: '#fragment',
      hostname: 'www.example.com',
      password: 'pass',
      pathname: '/path/to',
      protocol: 'https:',
      search: '?p=parameter&q=query',
      username: 'user'
    }
    Object.entries(expected).forEach(([prop, goal]) => {
      expect(parsed[prop]).toBe(goal)
    })
    const pars = [
      ['p', 'parameter'],
      ['q', 'query']
    ]
    var i = 0
    for (const [k, v] of parsed.searchParams.entries()) {
      expect(k).toBe(pars[i][0])
      expect(v).toBe(pars[i][1])
      i++
    }
  })

  test('parses an http URL with non-standard port', () => {
    const parsed = parseUrl('http://example.com:8080')
    const expected = { host: 'example.com:8080', hostname: 'example.com' }
    Object.entries(expected).forEach(([prop, goal]) => {
      expect(parsed[prop]).toBe(goal)
    })
  })

  test('parses an https URL with non-standard port', () => {
    const parsed = parseUrl('https://example.com:80')
    const expected = { host: 'example.com:80', hostname: 'example.com' }
    Object.entries(expected).forEach(([prop, goal]) => {
      expect(parsed[prop]).toBe(goal)
    })
  })

  test('doesn\'t parse a URL queries spearated by smicolon', () => {
    const parsed = parseUrl('https://example.com/?p=parameter;q=query')
    const pars = [
      ['p', 'parameter;q=query'],
    ]
    var i = 0
    for (const [k, v] of parsed.searchParams.entries()) {
      expect(k).toBe(pars[i][0])
      expect(v).toBe(pars[i][1])
      i++
    }
  })
})
