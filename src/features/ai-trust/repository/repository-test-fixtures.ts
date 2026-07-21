import { calculateTrustEventHash } from '../hashing'
import type { PersistedTrustDecision, PersistedTrustEvent } from './types'

export async function createPersistedEvent(
  overrides: Partial<PersistedTrustEvent> = {},
): Promise<PersistedTrustEvent> {
  const event = {
    resourceId: 'synthetic-resource-001',
    eventId: 'synthetic-persisted-event-001',
    eventType: 'SYNTHETIC_PERSISTENCE_VALIDATION',
    occurredAt: '2026-07-21T20:00:00.000Z',
    actorId: 'synthetic-actor',
    artifact: {
      artifactId: 'synthetic-artifact-001',
      artifactType: 'SYNTHETIC_FIXTURE',
      sha256: 'a'.repeat(64),
    },
    integrityPolicy: 'STRICT_HASH',
    status: 'VALID',
    decision: { outcome: 'ALLOW', reasonCode: 'SYNTHETIC_HASH_MATCH' },
    previousEventHash: null,
    metadata: { fixture: true },
    ...overrides,
  } satisfies Omit<PersistedTrustEvent, 'eventHash'>

  return { ...event, eventHash: await calculateTrustEventHash(event) }
}

export function createPersistedDecision(
  overrides: Partial<PersistedTrustDecision> = {},
): PersistedTrustDecision {
  return {
    decisionId: 'synthetic-decision-001',
    resourceId: 'synthetic-resource-001',
    eventId: 'synthetic-persisted-event-001',
    occurredAt: '2026-07-21T20:01:00.000Z',
    actorId: 'synthetic-reviewer',
    decision: { outcome: 'ALLOW', reasonCode: 'SYNTHETIC_REVIEW' },
    metadata: { fixture: true },
    ...overrides,
  }
}
