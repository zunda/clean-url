import { describe, expect, test } from 'vitest'
import { UrlCleaner } from './UrlCleaner'

describe('UrlCleaner', () => {

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
    parsed.removeQueriesExceptFor({ p: true })
    expect(parsed.toString()).toBe(dest)
  })
})
