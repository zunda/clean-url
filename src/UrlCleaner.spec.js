import { describe, expect, test } from 'vitest'
import { UrlCleaner } from './UrlCleaner'

describe('UrlCleaner', () => {
  test('parses a minimal URL', () => {
    const parsed = UrlCleaner.parse('https://example.com')
    const expected = { hostname: 'example.com', protocol: 'https:' }
    Object.entries(expected).forEach(([prop, goal]) => {
      expect(parsed[prop]).toBe(goal)
    })
  })

  test('accepts empty input', () => {
    for (const x of [undefined, null, ""]) {
      expect(UrlCleaner.parse(x)).toBe(null)
    }
  })

  test('accepts non-URL input', () => {
    expect(UrlCleaner.parse("Hello, World!")).toBe(null)
  })

  test('parses a full URL', () => {
    const parsed = UrlCleaner.parse('https://user:pass@www.example.com/path/to?p=parameter&q=query&p=2ndparameter#fragment')
    const expected = {
      hash: '#fragment',
      hostname: 'www.example.com',
      password: 'pass',
      pathname: '/path/to',
      protocol: 'https:',
      search: '?p=parameter&q=query&p=2ndparameter',
      username: 'user'
    }
    Object.entries(expected).forEach(([prop, goal]) => {
      expect(parsed[prop]).toBe(goal)
    })
    const pars = [
      ['p', 'parameter'],
      ['q', 'query'],
      ['p', '2ndparameter']
    ]
    var i = 0
    for (const [k, v] of parsed.searchParams.entries()) {
      expect(k).toBe(pars[i][0])
      expect(v).toBe(pars[i][1])
      i++
    }
  })

  test('removes queries', () => {
    const orig = 'https://user:pass@www.example.com/path/to?p=parameter&q=query&p=2ndparameter#fragment'
    const dest = 'https://user:pass@www.example.com/path/to#fragment'
    const parsed = UrlCleaner.parse(orig)
    parsed.removeQueriesExceptFor([])
    expect(parsed.toString()).toBe(dest)
  })

  test('removes queries except for those to be kept', () => {
    const orig = 'https://user:pass@www.example.com/path/to?p=parameter&q=query&p=2ndparameter#fragment'
    const dest = 'https://user:pass@www.example.com/path/to?p=parameter&p=2ndparameter#fragment'
    const parsed = UrlCleaner.parse(orig)
    parsed.removeQueriesExceptFor(['p'])
    expect(parsed.toString()).toBe(dest)
  })

  test('parses an http URL with non-standard port', () => {
    const parsed = UrlCleaner.parse('http://example.com:8080')
    const expected = { host: 'example.com:8080', hostname: 'example.com' }
    Object.entries(expected).forEach(([prop, goal]) => {
      expect(parsed[prop]).toBe(goal)
    })
  })

  test('parses an https URL with non-standard port', () => {
    const parsed = UrlCleaner.parse('https://example.com:80')
    const expected = { host: 'example.com:80', hostname: 'example.com' }
    Object.entries(expected).forEach(([prop, goal]) => {
      expect(parsed[prop]).toBe(goal)
    })
  })

  test('doesn\'t parse a URL queries spearated by smicolon', () => {
    const parsed = UrlCleaner.parse('https://example.com/?p=parameter;q=query')
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
