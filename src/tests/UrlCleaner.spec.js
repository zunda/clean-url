import { describe, expect, test } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/vue'
import UrlCleanerComponent from '../components/UrlCleaner.vue'

describe('UrlCleanerComponent', () => {
  test('removes queries from a URL', async () => {
    render(UrlCleanerComponent)
    const dirty = screen.getByPlaceholderText('Dirty URL')
    const clean = screen.getByPlaceholderText('Clean URL')

    const dirtyUrl = 'http://example.com/path/?p=parameter&v=keep'
    const cleanUrl = 'http://example.com/path/?v=keep'

    await fireEvent.update(dirty, dirtyUrl)

    expect(dirty.value).toBe(dirtyUrl)
    expect(clean.value).toBe(cleanUrl)
  })
})
