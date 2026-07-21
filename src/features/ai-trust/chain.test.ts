import { describe, expect, it } from 'vitest'
import { validateTrustChain } from './chain'
import { createSyntheticTrustEvent } from './test-fixtures'

describe('AI Trust chain validation', () => {
  it('validates chain continuity', async () => {
    const genesis = await createSyntheticTrustEvent({ eventId: 'synthetic-genesis' })
    const successor = await createSyntheticTrustEvent({
      eventId: 'synthetic-successor',
      previousEventHash: genesis.eventHash,
    })

    await expect(validateTrustChain([genesis, successor])).resolves.toEqual({
      valid: true,
      errors: [],
    })
  })

  it('detects a broken chain link', async () => {
    const genesis = await createSyntheticTrustEvent({ eventId: 'synthetic-genesis' })
    const successor = await createSyntheticTrustEvent({
      eventId: 'synthetic-successor',
      previousEventHash: 'b'.repeat(64),
    })

    const result = await validateTrustChain([genesis, successor])
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('CHAIN_LINK_INVALID:synthetic-successor')
  })
})
