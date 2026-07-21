import { describe, expect, it } from 'vitest'
import { sha256Hex } from './hashing'
import { evaluateIntegrityPolicy } from './policy'

describe('AI Trust hashing and integrity policies', () => {
  it('generates a deterministic SHA-256 hash', async () => {
    await expect(sha256Hex('abc')).resolves.toBe(
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
    )
  })

  it('denies a mismatch under STRICT_HASH', () => {
    expect(evaluateIntegrityPolicy('STRICT_HASH', 'expected', 'observed')).toEqual({
      status: 'INVALID',
      decision: { outcome: 'DENY', reasonCode: 'STRICT_HASH_MISMATCH' },
    })
  })

  it('observes a mismatch under OBSERVATIONAL_HASH without certifying it', () => {
    expect(evaluateIntegrityPolicy('OBSERVATIONAL_HASH', 'expected', 'observed').status).toBe(
      'PENDING_HUMAN_REVIEW',
    )
  })
})
