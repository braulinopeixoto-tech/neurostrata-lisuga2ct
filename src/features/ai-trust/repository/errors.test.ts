import { describe, expect, it } from 'vitest'
import { normalizeSupabaseError } from './errors'

describe('Supabase error normalization', () => {
  it('normalizes duplicate event hashes without leaking database details', () => {
    const error = normalizeSupabaseError(
      { code: '23505', message: 'duplicate key on ai_trust_events_event_hash_key' },
      'append_event',
    )

    expect(error).toMatchObject({
      code: 'DUPLICATE_EVENT_HASH',
      operation: 'append_event',
      message: 'An event with the same hash already exists.',
    })
  })

  it('normalizes RLS denial', () => {
    expect(normalizeSupabaseError({ code: '42501' }, 'append_event')).toMatchObject({
      code: 'ACCESS_DENIED',
      operation: 'append_event',
    })
  })
})
