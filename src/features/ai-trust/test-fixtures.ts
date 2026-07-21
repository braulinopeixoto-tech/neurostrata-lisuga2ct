import type { TrustEvent } from './contracts'
import { calculateTrustEventHash } from './hashing'

export async function createSyntheticTrustEvent(
  overrides: Partial<TrustEvent> = {},
): Promise<TrustEvent> {
  const event = {
    eventId: 'synthetic-event-001',
    eventType: 'SYNTHETIC_VALIDATION',
    occurredAt: '2026-07-21T17:00:00.000Z',
    actorId: 'synthetic-actor',
    artifact: {
      artifactId: 'synthetic-artifact-001',
      artifactType: 'SYNTHETIC_FIXTURE',
      sha256: 'a'.repeat(64),
    },
    integrityPolicy: 'STRICT_HASH',
    status: 'VALID',
    decision: { outcome: 'ALLOW', reasonCode: 'HASH_MATCH' },
    previousEventHash: null,
    ...overrides,
  } satisfies Omit<TrustEvent, 'eventHash'>

  return { ...event, eventHash: await calculateTrustEventHash(event) }
}
