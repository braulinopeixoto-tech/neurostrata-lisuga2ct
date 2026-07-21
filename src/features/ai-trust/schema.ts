import { z } from 'zod'
import { INTEGRITY_POLICIES, TRUST_STATUSES } from './contracts'

const sha256Schema = z.string().regex(/^[a-f0-9]{64}$/, 'Expected a lowercase SHA-256 hash')

export const trustArtifactSchema = z.object({
  artifactId: z.string().min(1),
  artifactType: z.string().min(1),
  sha256: sha256Schema,
})

export const trustDecisionSchema = z.object({
  outcome: z.enum(['ALLOW', 'DENY', 'REQUIRE_HUMAN_REVIEW']),
  reasonCode: z.string().min(1),
  reviewedBy: z.string().min(1).optional(),
  reviewedAt: z.iso.datetime().optional(),
})

export const trustEventSchema = z.object({
  eventId: z.string().min(1),
  eventType: z.string().min(1),
  occurredAt: z.iso.datetime(),
  actorId: z.string().min(1),
  artifact: trustArtifactSchema,
  integrityPolicy: z.enum(INTEGRITY_POLICIES),
  status: z.enum(TRUST_STATUSES),
  decision: trustDecisionSchema,
  previousEventHash: sha256Schema.nullable(),
  eventHash: sha256Schema,
})
