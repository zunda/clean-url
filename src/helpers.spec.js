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

  test('parses a full URL', () => {
    const parsed = parseUrl('https://user:pass@www.example.com/path/to?q=query&p=parameter#fragment')
    const expected = {
      hash: '#fragment',
      host: 'www.example.com',
      password: 'pass',
      pathname: '/path/to',
      protocol: 'https:',
      search: '?q=query&p=parameter',
      username: 'user'
    }
    Object.entries(expected).forEach(([prop, goal]) => {
      expect(parsed[prop]).toBe(goal)
    })
  })

  test('parses an http URL with non-standard port', () => {
    const parsed = parseUrl('http://example.com:8080')
    const expected = { host: 'example.com:8080' }
    Object.entries(expected).forEach(([prop, goal]) => {
      expect(parsed[prop]).toBe(goal)
    })
  })

  test('parses an https URL with non-standard port', () => {
    const parsed = parseUrl('https://example.com:80')
    const expected = { host: 'example.com:80' }
    Object.entries(expected).forEach(([prop, goal]) => {
      expect(parsed[prop]).toBe(goal)
    })
  })
})
