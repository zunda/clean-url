import { describe, expect, test } from 'vitest'
import { render, cleanup, fireEvent, screen } from '@testing-library/vue'
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

    cleanup()
  })

  test.skip('copies clean URL to clipboard', async () => {
    // it looks like useClipboard().isSupported if false on testing-library
  })

  test('shows all queries from a URL', async () => {
    render(UrlCleanerComponent)

    await fireEvent.update(
      screen.getByPlaceholderText('Dirty URL'),
      'http://example.com/path/?p=parameter&v=keep'
    )

    screen.getByText('p=parameter')
    screen.getByText('v=keep')

    cleanup()
  })

  test('control fields with check boxes', async () => {
    render(UrlCleanerComponent)
    const clean = screen.getByPlaceholderText('Clean URL')

    await fireEvent.update(
      screen.getByPlaceholderText('Dirty URL'),
      'http://example.com/path/?p=parameter&v=keep'
    )

    const pCheckBox = screen.getByText('p=parameter')
    const vCheckBox = screen.getByText('v=keep')
    expect(clean.value).toBe('http://example.com/path/?v=keep')

    await fireEvent.click(pCheckBox)
    expect(clean.value).toBe('http://example.com/path/?p=parameter&v=keep')

    await fireEvent.click(vCheckBox)
    expect(clean.value).toBe('http://example.com/path/?p=parameter')

    await fireEvent.click(pCheckBox)
    expect(clean.value).toBe('http://example.com/path/')

    cleanup()
  })

  test('keeps fragment in a URL', async () => {
    render(UrlCleanerComponent)
    const dirty = screen.getByPlaceholderText('Dirty URL')
    const clean = screen.getByPlaceholderText('Clean URL')

    const url = 'http://example.com/path/#fragment'

    await fireEvent.update(dirty, url)

    expect(dirty.value).toBe(url)
    expect(clean.value).toBe(url)

    cleanup()
  })

  test('remobe fragment in a URL when unchecked', async () => {
    render(UrlCleanerComponent)
    const dirty = screen.getByPlaceholderText('Dirty URL')
    const clean = screen.getByPlaceholderText('Clean URL')

    const dirtyUrl = 'http://example.com/path/#fragment'
    const cleanUrl = 'http://example.com/path/'

    await fireEvent.update(dirty, dirtyUrl)

    const fCheckBox = screen.getByText('#fragment')
    await fireEvent.click(fCheckBox)

    expect(clean.value).toBe(cleanUrl)

    cleanup()
  })

  test('cleans path', async() => {
    render(UrlCleanerComponent)
    const dirty = screen.getByPlaceholderText('Dirty URL')
    const clean = screen.getByPlaceholderText('Clean URL')

    const dirtyUrl = 'http://www.example.com/%E4%BE%8B%E7%A4%BA%E7%94%A8%E5%95%86%E5%93%81%E5%90%8D/dp/ABC012'
    const cleanUrl = 'http://www.example.com/dp/ABC012'

    await fireEvent.update(dirty, dirtyUrl)
    expect(clean.value).toBe(cleanUrl)

    const fCheckBox = screen.getByText('/例示用商品名/dp/ABC012')
    await fireEvent.click(fCheckBox)

    expect(clean.value).toBe(dirtyUrl)

    cleanup()
  })
})
