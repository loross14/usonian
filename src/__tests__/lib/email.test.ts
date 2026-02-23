import { describe, it, expect } from 'vitest'
import { isValidEmail, normalizeEmail } from '@/lib/validation/email'

describe('isValidEmail', () => {
  it('should return true for valid emails', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('user.name@domain.co.uk')).toBe(true)
    expect(isValidEmail('user+tag@example.org')).toBe(true)
  })

  it('should return false for invalid emails', () => {
    expect(isValidEmail('')).toBe(false)
    expect(isValidEmail('notanemail')).toBe(false)
    expect(isValidEmail('missing@domain')).toBe(false)
    expect(isValidEmail('@nodomain.com')).toBe(false)
    expect(isValidEmail('spaces in@email.com')).toBe(false)
  })
})

describe('normalizeEmail', () => {
  it('should lowercase and trim emails', () => {
    expect(normalizeEmail('TEST@EXAMPLE.COM')).toBe('test@example.com')
    expect(normalizeEmail('  user@domain.com  ')).toBe('user@domain.com')
    expect(normalizeEmail('  MIXED@Case.COM  ')).toBe('mixed@case.com')
  })
})
