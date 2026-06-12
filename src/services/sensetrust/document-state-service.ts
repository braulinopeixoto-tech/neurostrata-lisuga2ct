import type {
  DocumentLifecycleStatus,
  DocumentState,
  DocumentStateClinicalCommit,
  DocumentStateTransition,
  DocumentStateTransitionReason,
  DocumentStateTransitionType,
  DocumentStateValidationResult,
  PublicDocumentStatePayload,
} from '@/types/sensetrust/document-state'
import type { ClinicalCommitType } from '@/types/sensetrust/clinical-commit-chain'
import {
  DOCUMENT_STATE_SENSITIVE_DENYLIST,
  SIMULATED_DOCUMENT_STATE_ACTOR,
  SIMULATED_DOCUMENT_STATE_IDS,
  SIMULATED_DOCUMENT_STATE_POLICY,
  SIMULATED_DOCUMENT_STATE_REASONS,
} from '@/fixtures/sensetrust/simulated-document-state'
import { generateSha256FromContent } from './pdf-hash-service'

const NOW = '2026-06-07T10:00:00.000Z'

const ALLOWED_TRANSITIONS: Record<DocumentLifecycleStatus, DocumentLifecycleStatus[]> = {
  draft: ['reviewed'],
  reviewed: ['signed'],
  signed: ['active'],
  active: ['amended', 'revoked', 'expired', 'superseded', 'invalid_integrity'],
  amended: ['active_new_version', 'revoked'],
  active_new_version: ['amended', 'revoked', 'expired', 'superseded', 'invalid_integrity'],
  revoked: [],
  expired: [],
  superseded: ['archived'],
  archived: [],
  invalid_integrity: [],
}

const TRANSITION_TO_COMMIT: Record<DocumentStateTransitionType, ClinicalCommitType> = {
  review_document: 'human_review',
  sign_document: 'signed_final',
  activate_certificate: 'signed_final',
  amend_document: 'amended',
  revoke_document: 'revoked',
  expire_document: 'status_expired',
  supersede_document: 'superseded',
  restore_from_error: 'clinical_revision',
  integrity_invalidated: 'integrity_invalidated',
}

export async function createInitialDocumentState(): Promise<DocumentState> {
  const stateWithoutHash: Omit<DocumentState, 'state_hash'> = {
    schema: 'sensetrust.document_state.v1',
    document_id: SIMULATED_DOCUMENT_STATE_IDS.document_id,
    document_type: 'dnda_report',
    document_version: '1.0.0',
    trust_object_id: SIMULATED_DOCUMENT_STATE_IDS.trust_object_id,
    evidence_manifest_id: SIMULATED_DOCUMENT_STATE_IDS.evidence_manifest_id,
    chain_id: SIMULATED_DOCUMENT_STATE_IDS.chain_id,
    certificate_id: SIMULATED_DOCUMENT_STATE_IDS.certificate_id,
    status: 'reviewed',
    document_hash: 'sha256:simulated-dnda-document-hash-v06',
    issued_at: NOW,
    updated_at: NOW,
    expires_at: '2026-12-31T23:59:59.000Z',
    transitions: [],
    clinical_commit_ids: [],
    policy: SIMULATED_DOCUMENT_STATE_POLICY,
    simulated_only: true,
  }

  return { ...stateWithoutHash, state_hash: await calculateDocumentStateHash(stateWithoutHash) }
}

export async function signDocumentState(state: DocumentState): Promise<DocumentState> {
  return applyTransition(state, 'sign_document', 'signed', SIMULATED_DOCUMENT_STATE_REASONS.sign)
}

export async function activateDocumentCertificate(state: DocumentState): Promise<DocumentState> {
  if (state.status === 'revoked') throw new Error('revoked_certificate_cannot_be_reactivated')
  return applyTransition(state, 'activate_certificate', 'active', SIMULATED_DOCUMENT_STATE_REASONS.activate)
}

export async function amendDocument(state: DocumentState): Promise<DocumentState> {
  const next = await applyTransition(state, 'amend_document', 'amended', SIMULATED_DOCUMENT_STATE_REASONS.amend)
  const commitId = next.clinical_commit_ids.at(-1) ?? 'CMT-SIM-DOC-0000'
  return recalculateStateHash({
    ...next,
    amendment: {
      amendment_id: 'AMD-SIM-2026-0001',
      source_document_id: state.document_id,
      amended_document_id: SIMULATED_DOCUMENT_STATE_IDS.amended_document_id,
      clinical_commit_id: commitId,
      created_at: NOW,
      status: 'amended',
      public_reason: SIMULATED_DOCUMENT_STATE_REASONS.amend.public_reason,
      private_reason: SIMULATED_DOCUMENT_STATE_REASONS.amend.private_reason ?? '',
      simulated_only: true,
    },
  })
}

export async function revokeDocument(state: DocumentState): Promise<DocumentState> {
  const next = await applyTransition(state, 'revoke_document', 'revoked', SIMULATED_DOCUMENT_STATE_REASONS.revoke)
  const commitId = next.clinical_commit_ids.at(-1) ?? 'CMT-SIM-DOC-0000'
  return recalculateStateHash({
    ...next,
    revocation: {
      revocation_id: 'REV-SIM-2026-0001',
      document_id: state.document_id,
      certificate_id: state.certificate_id,
      clinical_commit_id: commitId,
      revoked_at: NOW,
      status: 'revoked',
      public_reason: SIMULATED_DOCUMENT_STATE_REASONS.revoke.public_reason,
      private_reason: SIMULATED_DOCUMENT_STATE_REASONS.revoke.private_reason ?? '',
      simulated_only: true,
    },
  })
}

export async function expireDocument(state: DocumentState): Promise<DocumentState> {
  const next = await applyTransition(state, 'expire_document', 'expired', SIMULATED_DOCUMENT_STATE_REASONS.expire)
  const commitId = next.clinical_commit_ids.at(-1) ?? 'CMT-SIM-DOC-0000'
  return recalculateStateHash({
    ...next,
    expiration: {
      expiration_id: 'EXP-SIM-2026-0001',
      document_id: state.document_id,
      certificate_id: state.certificate_id,
      clinical_commit_id: commitId,
      expired_at: NOW,
      status: 'expired',
      public_reason: SIMULATED_DOCUMENT_STATE_REASONS.expire.public_reason,
      private_reason: SIMULATED_DOCUMENT_STATE_REASONS.expire.private_reason ?? '',
      simulated_only: true,
    },
  })
}

export async function supersedeDocument(state: DocumentState): Promise<DocumentState> {
  const next = await applyTransition(state, 'supersede_document', 'superseded', SIMULATED_DOCUMENT_STATE_REASONS.supersede)
  const commitId = next.clinical_commit_ids.at(-1) ?? 'CMT-SIM-DOC-0000'
  return recalculateStateHash({
    ...next,
    supersession: {
      supersession_id: 'SUP-SIM-2026-0001',
      source_document_id: state.document_id,
      replacement_document_id: SIMULATED_DOCUMENT_STATE_IDS.replacement_document_id,
      clinical_commit_id: commitId,
      superseded_at: NOW,
      status: 'superseded',
      public_reason: SIMULATED_DOCUMENT_STATE_REASONS.supersede.public_reason,
      private_reason: SIMULATED_DOCUMENT_STATE_REASONS.supersede.private_reason ?? '',
      simulated_only: true,
    },
  })
}

export function validateDocumentStateTransition(
  previousStatus: DocumentLifecycleStatus,
  nextStatus: DocumentLifecycleStatus,
): DocumentStateValidationResult {
  const valid = ALLOWED_TRANSITIONS[previousStatus]?.includes(nextStatus) ?? false
  return {
    valid,
    status: valid ? 'valid' : 'invalid_integrity',
    errors: valid ? [] : [`invalid_transition:${previousStatus}->${nextStatus}`],
  }
}

export function assertNoDestructiveEditAfterSignature(state: DocumentState, patch: Record<string, unknown>) {
  if (!['signed', 'active', 'amended', 'revoked', 'expired', 'superseded'].includes(state.status)) return true
  const destructiveFields = ['document_id', 'document_hash', 'certificate_id', 'trust_object_id', 'evidence_manifest_id', 'content', 'body']
  const attempted = destructiveFields.filter((field) => Object.prototype.hasOwnProperty.call(patch, field))
  if (attempted.length > 0) throw new Error(`destructive_edit_blocked:${attempted.join(',')}`)
  return true
}

export async function createDocumentStateClinicalCommit(params: {
  transitionType: DocumentStateTransitionType
  documentId: string
  previousStatus: DocumentLifecycleStatus
  nextStatus: DocumentLifecycleStatus
  publicReason: string
  sequence: number
}): Promise<DocumentStateClinicalCommit> {
  const commitWithoutHash = {
    commit_id: `CMT-SIM-DOC-${String(params.sequence).padStart(4, '0')}`,
    commit_type: TRANSITION_TO_COMMIT[params.transitionType],
    document_id: params.documentId,
    previous_status: params.previousStatus,
    next_status: params.nextStatus,
    public_reason: params.publicReason,
    created_at: NOW,
    simulated_only: true as const,
  }

  return {
    ...commitWithoutHash,
    current_hash: `sha256:${await generateSha256FromContent(stableStringify(commitWithoutHash))}`,
  }
}

export function buildPublicDocumentStatePayload(state: DocumentState): PublicDocumentStatePayload {
  const publicReason =
    state.revocation?.public_reason ??
    state.amendment?.public_reason ??
    state.expiration?.public_reason ??
    state.supersession?.public_reason ??
    'Documento simulado verificavel por metadados publicos.'

  return {
    schema: 'sensetrust.public_document_state.v1',
    document_id: state.document_id,
    document_type: state.document_type,
    document_version: state.document_version,
    certificate_id: state.certificate_id,
    lifecycle_status: state.status,
    verification_status: toPublicVerificationStatus(state.status),
    public_reason: publicReason,
    amended_document_id: state.amendment?.amended_document_id,
    replacement_document_id: state.supersession?.replacement_document_id,
    expires_at: state.expires_at,
    updated_at: state.updated_at,
    simulated_only: true,
  }
}

export function validatePublicDocumentStatePayload(payload: PublicDocumentStatePayload): DocumentStateValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const exposed = DOCUMENT_STATE_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term))
  return {
    valid: exposed.length === 0,
    status: exposed.length === 0 ? 'valid' : 'invalid_integrity',
    errors: exposed.map((term) => `sensitive_public_field:${term}`),
  }
}

export function detectInvalidStateTransition(previousStatus: DocumentLifecycleStatus, nextStatus: DocumentLifecycleStatus) {
  return !validateDocumentStateTransition(previousStatus, nextStatus).valid
}

export async function detectStateTampering(state: DocumentState) {
  return (await calculateDocumentStateHash(state)) !== state.state_hash
}

async function applyTransition(
  state: DocumentState,
  transitionType: DocumentStateTransitionType,
  nextStatus: DocumentLifecycleStatus,
  reason: DocumentStateTransitionReason,
): Promise<DocumentState> {
  assertNoDestructiveEditAfterSignature(state, {})
  const validation = validateDocumentStateTransition(state.status, nextStatus)
  if (!validation.valid) throw new Error(validation.errors.join(';'))

  const commit = await createDocumentStateClinicalCommit({
    transitionType,
    documentId: state.document_id,
    previousStatus: state.status,
    nextStatus,
    publicReason: reason.public_reason,
    sequence: state.transitions.length + 1,
  })

  const transitionWithoutHash = {
    transition_id: `DST-SIM-2026-${String(state.transitions.length + 1).padStart(4, '0')}`,
    transition_type: transitionType,
    document_id: state.document_id,
    trust_object_id: state.trust_object_id,
    evidence_manifest_id: state.evidence_manifest_id,
    clinical_commit_id: commit.commit_id,
    certificate_id: state.certificate_id,
    previous_status: state.status,
    next_status: nextStatus,
    reason,
    actor: SIMULATED_DOCUMENT_STATE_ACTOR,
    created_at: NOW,
    terminal: isTerminalStatus(nextStatus),
  }
  const transition: DocumentStateTransition = {
    ...transitionWithoutHash,
    transition_hash: `sha256:${await generateSha256FromContent(stableStringify(transitionWithoutHash))}`,
  }

  return recalculateStateHash({
    ...state,
    status: nextStatus,
    updated_at: NOW,
    transitions: [...state.transitions, transition],
    clinical_commit_ids: [...state.clinical_commit_ids, commit.commit_id],
  })
}

async function recalculateStateHash(state: Omit<DocumentState, 'state_hash'> | DocumentState): Promise<DocumentState> {
  const { state_hash: _stateHash, ...stateWithoutHash } = state as DocumentState
  return {
    ...stateWithoutHash,
    state_hash: await calculateDocumentStateHash(stateWithoutHash),
  }
}

async function calculateDocumentStateHash(state: Omit<DocumentState, 'state_hash'> | DocumentState) {
  const { state_hash: _stateHash, ...stateWithoutHash } = state as DocumentState
  return `sha256:${await generateSha256FromContent(stableStringify(stateWithoutHash))}`
}

function toPublicVerificationStatus(status: DocumentLifecycleStatus): PublicDocumentStatePayload['verification_status'] {
  if (status === 'active' || status === 'amended' || status === 'active_new_version') return 'valid'
  if (status === 'revoked') return 'revoked'
  if (status === 'expired') return 'expired'
  if (status === 'superseded' || status === 'archived') return 'superseded'
  return 'invalid_integrity'
}

function isTerminalStatus(status: DocumentLifecycleStatus) {
  return ['revoked', 'expired', 'archived', 'invalid_integrity'].includes(status)
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
