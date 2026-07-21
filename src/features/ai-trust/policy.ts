import type { IntegrityPolicy, TrustDecision, TrustStatus } from './contracts'

export interface IntegrityEvaluation {
  status: TrustStatus
  decision: TrustDecision
}

export function evaluateIntegrityPolicy(
  policy: IntegrityPolicy,
  expectedHash: string,
  observedHash: string,
): IntegrityEvaluation {
  if (expectedHash === observedHash) {
    return {
      status: 'VALID',
      decision: { outcome: 'ALLOW', reasonCode: 'HASH_MATCH' },
    }
  }

  if (policy === 'STRICT_HASH') {
    return {
      status: 'INVALID',
      decision: { outcome: 'DENY', reasonCode: 'STRICT_HASH_MISMATCH' },
    }
  }

  return {
    status: 'PENDING_HUMAN_REVIEW',
    decision: {
      outcome: 'REQUIRE_HUMAN_REVIEW',
      reasonCode: 'OBSERVATIONAL_HASH_MISMATCH',
    },
  }
}
