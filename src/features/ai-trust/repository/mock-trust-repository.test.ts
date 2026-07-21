import { describe, expect, it } from 'vitest'
import { MockTrustRepository } from './mock-trust-repository'
import { createPersistedDecision, createPersistedEvent } from './repository-test-fixtures'

describe('MockTrustRepository', () => {
  it('appends an event and retrieves its resource chain deterministically', async () => {
    const repository = new MockTrustRepository()
    const genesis = await createPersistedEvent()
    const successor = await createPersistedEvent({
      eventId: 'synthetic-persisted-event-002',
      occurredAt: '2026-07-21T20:02:00.000Z',
      previousEventHash: genesis.eventHash,
    })

    await repository.appendEvent(genesis)
    await repository.appendEvent(successor)

    await expect(repository.getEventsByResource(genesis.resourceId)).resolves.toEqual([
      genesis,
      successor,
    ])
  })

  it('retrieves the latest event', async () => {
    const repository = new MockTrustRepository()
    const genesis = await createPersistedEvent()
    const successor = await createPersistedEvent({
      eventId: 'synthetic-persisted-event-002',
      previousEventHash: genesis.eventHash,
    })

    await repository.appendEvent(genesis)
    await repository.appendEvent(successor)

    await expect(repository.getLatestEvent(genesis.resourceId)).resolves.toEqual(successor)
  })

  it('appends a decision without mutating the caller value', async () => {
    const repository = new MockTrustRepository()
    const decision = createPersistedDecision()
    const stored = await repository.appendDecision(decision)

    stored.decision.reasonCode = 'MUTATED_COPY'
    expect(decision.decision.reasonCode).toBe('SYNTHETIC_REVIEW')
  })

  it('rejects a duplicate event ID', async () => {
    const repository = new MockTrustRepository()
    const event = await createPersistedEvent()
    await repository.appendEvent(event)

    await expect(repository.appendEvent(event)).rejects.toMatchObject({
      code: 'DUPLICATE_EVENT_ID',
    })
  })

  it('rejects a duplicate event hash', async () => {
    const repository = new MockTrustRepository()
    const event = await createPersistedEvent()
    await repository.appendEvent(event)

    await expect(
      repository.appendEvent({ ...event, eventId: 'synthetic-persisted-event-copy' }),
    ).rejects.toMatchObject({ code: 'DUPLICATE_EVENT_HASH' })
  })

  it('rejects an event that does not extend the latest resource hash', async () => {
    const repository = new MockTrustRepository()
    const genesis = await createPersistedEvent()
    const disconnected = await createPersistedEvent({
      eventId: 'synthetic-disconnected-event',
      previousEventHash: 'b'.repeat(64),
    })
    await repository.appendEvent(genesis)

    await expect(repository.appendEvent(disconnected)).rejects.toMatchObject({
      code: 'INVALID_APPEND_ORDER',
    })
  })

  it('rejects an event whose canonical hash was altered', async () => {
    const repository = new MockTrustRepository()
    const event = await createPersistedEvent()

    await expect(
      repository.appendEvent({ ...event, eventHash: 'f'.repeat(64) }),
    ).rejects.toMatchObject({ code: 'INVALID_EVENT_HASH' })
  })

  it('validates a complete resource chain', async () => {
    const repository = new MockTrustRepository()
    const genesis = await createPersistedEvent()
    const successor = await createPersistedEvent({
      eventId: 'synthetic-persisted-event-002',
      previousEventHash: genesis.eventHash,
    })
    await repository.appendEvent(genesis)
    await repository.appendEvent(successor)

    await expect(repository.validateResourceChain(genesis.resourceId)).resolves.toEqual({
      valid: true,
      errors: [],
    })
  })

  it('detects a broken persisted resource chain', async () => {
    const genesis = await createPersistedEvent()
    const broken = await createPersistedEvent({
      eventId: 'synthetic-broken-event',
      previousEventHash: 'b'.repeat(64),
    })
    const repository = new MockTrustRepository([genesis, broken])

    const result = await repository.validateResourceChain(genesis.resourceId)
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('CHAIN_LINK_INVALID:synthetic-broken-event')
  })
})
