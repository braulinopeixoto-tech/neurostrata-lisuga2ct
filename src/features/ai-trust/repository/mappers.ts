import { trustDecisionSchema, trustEventSchema } from '../schema'
import type { TrustMetadata } from './types'
import type {
  AiTrustDecisionInsert,
  AiTrustDecisionRow,
  AiTrustEventInsert,
  AiTrustEventRow,
  Json,
} from './database-types'
import { TrustRepositoryError } from './errors'
import type { PersistedTrustDecision, PersistedTrustEvent } from './types'

function asJson(value: unknown): Json {
  return value as Json
}

function asMetadata(value: Json | null): TrustMetadata {
  if (!value || Array.isArray(value) || typeof value !== 'object') return {}
  return value as TrustMetadata
}

export function toTrustEventRow(event: PersistedTrustEvent): AiTrustEventInsert {
  return {
    event_id: event.eventId,
    resource_id: event.resourceId,
    event_type: event.eventType,
    occurred_at: event.occurredAt,
    actor_id: event.actorId,
    artifact: asJson(event.artifact),
    integrity_policy: event.integrityPolicy,
    status: event.status,
    decision: asJson(event.decision),
    previous_event_hash: event.previousEventHash,
    event_hash: event.eventHash,
    metadata: asJson(event.metadata),
  }
}

export function fromTrustEventRow(row: AiTrustEventRow): PersistedTrustEvent {
  const result = trustEventSchema.safeParse({
    eventId: row.event_id,
    eventType: row.event_type,
    occurredAt: row.occurred_at,
    actorId: row.actor_id,
    artifact: row.artifact,
    integrityPolicy: row.integrity_policy,
    status: row.status,
    decision: row.decision,
    previousEventHash: row.previous_event_hash,
    eventHash: row.event_hash,
  })

  if (!result.success) {
    throw new TrustRepositoryError(
      'INVALID_DATABASE_ROW',
      'map_event_row',
      `Invalid AI Trust event row: ${row.event_id}`,
      { cause: result.error },
    )
  }

  return {
    ...result.data,
    previousEventHash: result.data.previousEventHash ?? null,
    resourceId: row.resource_id,
    metadata: asMetadata(row.metadata),
  }
}

export function toTrustDecisionRow(decision: PersistedTrustDecision): AiTrustDecisionInsert {
  return {
    decision_id: decision.decisionId,
    resource_id: decision.resourceId,
    event_id: decision.eventId,
    occurred_at: decision.occurredAt,
    actor_id: decision.actorId,
    decision: asJson(decision.decision),
    metadata: asJson(decision.metadata),
  }
}

export function fromTrustDecisionRow(row: AiTrustDecisionRow): PersistedTrustDecision {
  const decisionResult = trustDecisionSchema.safeParse(row.decision)
  if (!decisionResult.success) {
    throw new TrustRepositoryError(
      'INVALID_DATABASE_ROW',
      'map_decision_row',
      `Invalid AI Trust decision row: ${row.decision_id}`,
      { cause: decisionResult.error },
    )
  }

  return {
    decisionId: row.decision_id,
    resourceId: row.resource_id,
    eventId: row.event_id,
    occurredAt: row.occurred_at,
    actorId: row.actor_id,
    decision: decisionResult.data,
    metadata: asMetadata(row.metadata),
  }
}
