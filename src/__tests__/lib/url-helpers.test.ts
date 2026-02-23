import { describe, it, expect } from 'vitest'
import { getSourceName, isValidUrl } from '@/lib/url-helpers'

describe('getSourceName', () => {
  it('should return known source names', () => {
    expect(getSourceName('https://www.dwell.com/article/test')).toBe('Dwell')
    expect(getSourceName('https://en.wikipedia.org/wiki/Test')).toBe('Wikipedia')
    expect(getSourceName('https://www.archdaily.com/project')).toBe('ArchDaily')
    expect(getSourceName('https://www.zillow.com/homedetails')).toBe('Zillow')
  })

  it('should capitalize unknown domains', () => {
    expect(getSourceName('https://www.unknown-site.com/page')).toBe('Unknown-site')
    expect(getSourceName('https://mysite.org/page')).toBe('Mysite')
  })

  it('should return "External Link" for invalid URLs', () => {
    expect(getSourceName('not-a-url')).toBe('External Link')
    expect(getSourceName('')).toBe('External Link')
  })
})

describe('isValidUrl', () => {
  it('should return true for valid URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
    expect(isValidUrl('http://localhost:3000')).toBe(true)
    expect(isValidUrl('https://sub.domain.com/path?query=value')).toBe(true)
  })

  it('should return false for invalid URLs', () => {
    expect(isValidUrl(null)).toBe(false)
    expect(isValidUrl(undefined)).toBe(false)
    expect(isValidUrl('')).toBe(false)
    expect(isValidUrl('not-a-url')).toBe(false)
  })
})
