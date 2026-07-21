import type { SupabaseClient } from '@supabase/supabase-js'
import { describe, expect, it, vi } from 'vitest'
import type { AiTrustDatabase, AiTrustEventRow } from './database-types'
import { toTrustEventRow } from './mappers'
import { createPersistedEvent } from './repository-test-fixtures'
import { SupabaseTrustRepository } from './supabase-trust-repository'

describe('SupabaseTrustRepository', () => {
  it('uses only the injected client to append an event', async () => {
    const insert = vi.fn().mockResolvedValue({ data: null, error: null })
    const from = vi.fn().mockReturnValue({ insert })
    const repository = new SupabaseTrustRepository(
      { from } as unknown as SupabaseClient<AiTrustDatabase>,
    )
    const event = await createPersistedEvent()

    await expect(repository.appendEvent(event)).resolves.toEqual(event)
    expect(from).toHaveBeenCalledWith('ai_trust_events')
    expect(insert).toHaveBeenCalledWith(toTrustEventRow(event))
  })

  it('retrieves and maps an ordered resource chain from an injected mock', async () => {
    const event = await createPersistedEvent()
    const row: AiTrustEventRow = {
      ...toTrustEventRow(event),
      id: '00000000-0000-4000-8000-000000000001',
      sequence_number: 1,
      created_at: '2026-07-21T20:00:01.000Z',
    }
    const query: Record<string, unknown> = {}
    query.eq = vi.fn(() => query)
    query.order = vi.fn(() => query)
    query.then = (resolve: (value: unknown) => unknown) =>
      Promise.resolve({ data: [row], error: null }).then(resolve)
    const select = vi.fn(() => query)
    const from = vi.fn().mockReturnValue({ select })
    const repository = new SupabaseTrustRepository(
      { from } as unknown as SupabaseClient<AiTrustDatabase>,
    )

    await expect(repository.getEventsByResource(event.resourceId)).resolves.toEqual([event])
    expect(query.eq).toHaveBeenCalledWith('resource_id', event.resourceId)
    expect(query.order).toHaveBeenCalledWith('sequence_number', { ascending: true })
  })
})
