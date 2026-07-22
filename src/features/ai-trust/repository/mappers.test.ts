import { describe, expect, it } from 'vitest'
import { fromTrustEventRow, toTrustEventRow } from './mappers'
import { createPersistedEvent } from './repository-test-fixtures'
import type { AiTrustEventRow } from './database-types'

describe('AI Trust persistence mappers', () => {
  it('round-trips a domain event through the database row shape', async () => {
    const event = await createPersistedEvent()
    const insert = toTrustEventRow(event)
    const row: AiTrustEventRow = {
      ...insert,
      id: '00000000-0000-4000-8000-000000000001',
      organization_id: '00000000-0000-4000-8000-000000000001',
      sequence_number: 1,
      created_at: '2026-07-21T20:00:01.000Z',
    }

    expect(fromTrustEventRow(row)).toEqual(event)
  })

  it('rejects an invalid event row hash', async () => {
    const event = await createPersistedEvent()
    const insert = toTrustEventRow(event)
    const row = {
      ...insert,
      event_hash: 'not-a-sha256',
      id: '00000000-0000-4000-8000-000000000001',
      organization_id: '00000000-0000-4000-8000-000000000001',
      sequence_number: 1,
      created_at: '2026-07-21T20:00:01.000Z',
    } as AiTrustEventRow

    expect(() => fromTrustEventRow(row)).toThrowError(
      expect.objectContaining({ code: 'INVALID_DATABASE_ROW' }),
    )
  })

  it('normalizes PostgreSQL timestamptz offsets to the canonical UTC form', async () => {
    const event = await createPersistedEvent()
    const insert = toTrustEventRow(event)
    const row: AiTrustEventRow = {
      ...insert,
      occurred_at: '2026-07-21T20:00:00+00:00',
      id: '00000000-0000-4000-8000-000000000001',
      organization_id: '00000000-0000-4000-8000-000000000001',
      sequence_number: 1,
      created_at: '2026-07-21T20:00:01+00:00',
    }

    expect(fromTrustEventRow(row).occurredAt).toBe('2026-07-21T20:00:00.000Z')
  })
})
