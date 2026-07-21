import type { ChainValidationResult } from '../chain'
import type { TrustDecision, TrustEvent } from '../contracts'

export type TrustMetadata = Record<string, unknown>

export interface PersistedTrustEvent extends TrustEvent {
  resourceId: string
  metadata: TrustMetadata
}

export interface PersistedTrustDecision {
  decisionId: string
  resourceId: string
  eventId: string | null
  occurredAt: string
  actorId: string
  decision: TrustDecision
  metadata: TrustMetadata
}

export interface TrustRepository {
  appendEvent(event: PersistedTrustEvent): Promise<PersistedTrustEvent>
  getEventsByResource(resourceId: string): Promise<PersistedTrustEvent[]>
  getLatestEvent(resourceId: string): Promise<PersistedTrustEvent | null>
  appendDecision(decision: PersistedTrustDecision): Promise<PersistedTrustDecision>
  validateResourceChain(resourceId: string): Promise<ChainValidationResult>
}
