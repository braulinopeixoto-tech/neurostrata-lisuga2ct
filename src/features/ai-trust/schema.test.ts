import { describe, expect, it } from 'vitest'
import { evaluateIntegrityPolicy } from './policy'
import { trustEventSchema } from './schema'
import { createSyntheticTrustEvent } from './test-fixtures'

describe('AI Trust validation and review policy', () => {
  it('validates the governed event schema', async () => {
    expect(trustEventSchema.safeParse(await createSyntheticTrustEvent()).success).toBe(true)
  })

  it('requires human review for an observational mismatch', () => {
    const result = evaluateIntegrityPolicy('OBSERVATIONAL_HASH', 'expected', 'observed')
    expect(result.decision.outcome).toBe('REQUIRE_HUMAN_REVIEW')
    expect(result.decision.reviewedBy).toBeUndefined()
  })
})
