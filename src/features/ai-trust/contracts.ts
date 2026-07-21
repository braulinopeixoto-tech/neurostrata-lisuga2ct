export const TRUST_STATUSES = ['VALID', 'INVALID', 'PENDING_HUMAN_REVIEW'] as const
export type TrustStatus = (typeof TRUST_STATUSES)[number]

export const INTEGRITY_POLICIES = ['STRICT_HASH', 'OBSERVATIONAL_HASH'] as const
export type IntegrityPolicy = (typeof INTEGRITY_POLICIES)[number]

export type TrustDecisionOutcome = 'ALLOW' | 'DENY' | 'REQUIRE_HUMAN_REVIEW'

export interface TrustDecision {
  outcome: TrustDecisionOutcome
  reasonCode: string
  reviewedBy?: string
  reviewedAt?: string
}

export interface TrustArtifact {
  artifactId: string
  artifactType: string
  sha256: string
}

export interface TrustEvent {
  eventId: string
  eventType: string
  occurredAt: string
  actorId: string
  artifact: TrustArtifact
  integrityPolicy: IntegrityPolicy
  status: TrustStatus
  decision: TrustDecision
  previousEventHash: string | null
  eventHash: string
}
