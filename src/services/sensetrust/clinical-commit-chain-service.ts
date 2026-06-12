import type {
  ClinicalCommit,
  ClinicalCommitChain,
  ClinicalCommitChainValidationResult,
  ClinicalCommitDiff,
  ClinicalCommitStatus,
  ClinicalCommitType,
} from '@/types/sensetrust/clinical-commit-chain'
import {
  CLINICAL_COMMIT_SENSITIVE_DENYLIST,
  SIMULATED_CLINICAL_COMMIT_CHAIN_FIXTURE,
} from '@/fixtures/sensetrust/simulated-clinical-commit-chain'
import type { DndaTrustObject, EvidenceManifest } from '@/types/sensetrust/dnda-trust-object'
import { createSimulatedEvidenceManifest } from './evidence-manifest-service'
import { createSimulatedDndaTrustObject } from './dnda-trust-object-service'
import { generateSha256FromContent } from './pdf-hash-service'

type CommitInput = {
  commit_id?: string
  commit_type: ClinicalCommitType
  status: ClinicalCommitStatus
  reason: string
  diff_json: ClinicalCommitDiff
}

export async function calculateClinicalCommitHash(commit: Omit<ClinicalCommit, 'current_hash'> | ClinicalCommit) {
  const { current_hash: _currentHash, ...canonicalCommit } = commit as ClinicalCommit
  return `sha256:${await generateSha256FromContent(stableStringify(canonicalCommit))}`
}

export async function createInitialClinicalCommit(
  manifest?: EvidenceManifest,
  trustObject?: DndaTrustObject,
) {
  const evidenceManifest = manifest ?? (await createSimulatedEvidenceManifest())
  const dndaTrustObject = trustObject ?? (await createSimulatedDndaTrustObject(evidenceManifest))
  return createClinicalCommit({
    parent: null,
    sequence: 1,
    input: {
      commit_id: 'CMT-SIM-2026-0001',
      commit_type: 'initial_draft',
      status: 'draft',
      reason: 'Initial simulated DNDA draft created',
      diff_json: {
        operation: 'created',
        summary: 'Initial simulated draft without real clinical data',
        simulated_only: true,
        public_exposure: 'none',
      },
    },
    manifest: evidenceManifest,
    trustObject: dndaTrustObject,
  })
}

export async function createClinicalCommit(params: {
  parent: ClinicalCommit | null
  sequence: number
  input: CommitInput
  manifest: EvidenceManifest
  trustObject: DndaTrustObject
}): Promise<ClinicalCommit> {
  const fixture = SIMULATED_CLINICAL_COMMIT_CHAIN_FIXTURE
  const commitWithoutHash = {
    schema: 'sensetrust.clinical_commit.v1' as const,
    commit_id: params.input.commit_id ?? `CMT-SIM-2026-${String(params.sequence).padStart(4, '0')}`,
    parent_commit_id: params.parent?.commit_id ?? null,
    chain_id: fixture.chain_id,
    document_id: fixture.document_id,
    trust_object_id: params.trustObject.trust_object_id,
    evidence_manifest_id: params.manifest.manifest_id,
    commit_type: params.input.commit_type,
    status: params.input.status,
    actor: fixture.actor,
    reason: params.input.reason,
    diff_json: params.input.diff_json,
    previous_hash: params.parent?.current_hash ?? null,
    hash_algorithm: 'SHA-256' as const,
    evidence_manifest_hash: params.manifest.manifest_hash,
    document_hash: params.trustObject.document_hash,
    trust_object_hash: params.trustObject.trust_object_hash,
    created_at: fixture.created_at,
    sequence: params.sequence,
  }

  return {
    ...commitWithoutHash,
    current_hash: await calculateClinicalCommitHash(commitWithoutHash),
  }
}

export async function createSimulatedClinicalCommitChain(): Promise<ClinicalCommitChain> {
  const manifest = await createSimulatedEvidenceManifest()
  const trustObject = await createSimulatedDndaTrustObject(manifest)
  const commits: ClinicalCommit[] = []

  for (const [index, plan] of SIMULATED_CLINICAL_COMMIT_CHAIN_FIXTURE.commit_plan.entries()) {
    const [commitType, status, reason] = plan
    const parent = commits.at(-1) ?? null
    const commit = await createClinicalCommit({
      parent,
      sequence: index + 1,
      input: {
        commit_id: `CMT-SIM-2026-${String(index + 1).padStart(4, '0')}`,
        commit_type: commitType,
        status,
        reason,
        diff_json: {
          operation: commitType === 'signed_final' ? 'signed' : index === 0 ? 'created' : 'updated',
          summary: reason,
          simulated_only: true,
          public_exposure: 'none',
        },
      },
      manifest,
      trustObject,
    })
    commits.push(commit)
  }

  return {
    schema: 'sensetrust.clinical_commit_chain.v1',
    chain_id: SIMULATED_CLINICAL_COMMIT_CHAIN_FIXTURE.chain_id,
    document_id: SIMULATED_CLINICAL_COMMIT_CHAIN_FIXTURE.document_id,
    trust_object_id: trustObject.trust_object_id,
    evidence_manifest_id: manifest.manifest_id,
    status: 'signed',
    commits,
    created_at: SIMULATED_CLINICAL_COMMIT_CHAIN_FIXTURE.created_at,
    simulated_only: true,
  }
}

export async function validateClinicalCommitChain(
  chain: ClinicalCommitChain,
): Promise<ClinicalCommitChainValidationResult> {
  const errors: string[] = []
  const results = await Promise.all(
    chain.commits.map(async (commit, index) => {
      const parent = index === 0 ? null : chain.commits[index - 1]
      const expectedHash = await calculateClinicalCommitHash(commit)
      const validHash = expectedHash === commit.current_hash
      const validParent = commit.parent_commit_id === (parent?.commit_id ?? null)
      const validPreviousHash = commit.previous_hash === (parent?.current_hash ?? null)

      if (!validHash) errors.push(`invalid_hash:${commit.commit_id}`)
      if (!validParent) errors.push(`invalid_parent:${commit.commit_id}`)
      if (!validPreviousHash) errors.push(`invalid_previous_hash:${commit.commit_id}`)

      return {
        commit_id: commit.commit_id,
        sequence: commit.sequence,
        valid_hash: validHash,
        valid_parent: validParent,
        valid_previous_hash: validPreviousHash,
      }
    }),
  )

  return {
    valid: errors.length === 0,
    status: errors.length === 0 ? 'valid' : 'invalid_integrity',
    results,
    errors,
  }
}

export async function detectClinicalCommitTampering(chain: ClinicalCommitChain) {
  return !(await validateClinicalCommitChain(chain)).valid
}

export function assertClinicalCommitNoSensitivePublicExposure(payload: unknown) {
  const serialized = JSON.stringify(payload).toLowerCase()
  const found = CLINICAL_COMMIT_SENSITIVE_DENYLIST.filter((field) => serialized.includes(field))
  if (found.length > 0) throw new Error(`sensitive_public_exposure_detected:${found.join(',')}`)
  return true
}

export async function appendClinicalCommit(
  chain: ClinicalCommitChain,
  input: Omit<CommitInput, 'commit_id'> & { commit_id?: string },
) {
  const latest = chain.commits.at(-1)
  if (!latest) throw new Error('empty_chain')
  if (latest.status === 'signed' && !['amended', 'revoked', 'superseded'].includes(input.status)) {
    throw new Error('signed_chain_requires_amendment_revocation_or_supersession')
  }

  const manifest = await createSimulatedEvidenceManifest()
  const trustObject = await createSimulatedDndaTrustObject(manifest)
  const commit = await createClinicalCommit({
    parent: latest,
    sequence: chain.commits.length + 1,
    input,
    manifest,
    trustObject,
  })
  return { ...chain, status: commit.status, commits: [...chain.commits, commit] }
}

export async function signClinicalCommitChain(chain: ClinicalCommitChain) {
  if (chain.commits.at(-1)?.commit_type === 'signed_final') return { ...chain, status: 'signed' as const }
  return appendClinicalCommit(chain, {
    commit_type: 'signed_final',
    status: 'signed',
    reason: 'Simulated final signature',
    diff_json: {
      operation: 'signed',
      summary: 'Signed without exposing clinical content',
      simulated_only: true,
      public_exposure: 'metadata_only',
    },
  })
}

export function createAmendmentCommit(chain: ClinicalCommitChain) {
  return appendClinicalCommit(chain, {
    commit_type: 'amended',
    status: 'amended',
    reason: 'Simulated amendment after signature',
    diff_json: {
      operation: 'amended',
      summary: 'Amendment represented as a new commit',
      simulated_only: true,
      public_exposure: 'metadata_only',
    },
  })
}

export function createRevocationCommit(chain: ClinicalCommitChain) {
  return appendClinicalCommit(chain, {
    commit_type: 'revoked',
    status: 'revoked',
    reason: 'Simulated revocation after signature',
    diff_json: {
      operation: 'revoked',
      summary: 'Revocation represented as a new commit',
      simulated_only: true,
      public_exposure: 'metadata_only',
    },
  })
}

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map((item) => stableStringify(item)).join(',')}]`
  const record = value as Record<string, unknown>
  return `{${Object.keys(record)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`)
    .join(',')}}`
}
