import type { ClinicalCommitType } from '@/types/sensetrust/clinical-commit-chain'
import type { DocumentState } from '@/types/sensetrust/document-state'
import type {
  EmissionIntegrityObject,
  EmissionIntegrityValidationResult,
  InstitutionalSignature,
  LogicalTimestamp,
  ProfessionalSignature,
  PublicSignaturePayload,
  SignatureVerificationResult,
} from '@/types/sensetrust/signature-timestamp'
import {
  SIGNATURE_TIMESTAMP_SENSITIVE_DENYLIST,
  SIMULATED_SIGNATURE_ACTOR,
  SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE,
} from '@/fixtures/sensetrust/simulated-signature-timestamp'
import { generateSha256FromContent } from './pdf-hash-service'

const VALID_EMISSION_STATES = ['signed', 'active']

export async function createSimulatedProfessionalSignature(): Promise<ProfessionalSignature> {
  const payload = {
    actor_id: SIMULATED_SIGNATURE_ACTOR.actor_id,
    role: SIMULATED_SIGNATURE_ACTOR.display_role,
    organization: SIMULATED_SIGNATURE_ACTOR.organization,
    scope: 'emission_integrity',
    signed_at: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.issued_at,
  }

  return {
    signature_id: 'SIG-PRO-SIM-2026-0001',
    signature_type: 'simulated_professional_signature',
    actor_id: payload.actor_id,
    role: payload.role,
    organization: payload.organization,
    scope: 'emission_integrity',
    signature_hash: await sha256(payload),
    signed_at: payload.signed_at,
    status: 'signed',
    simulated_only: true,
  }
}

export async function createSimulatedInstitutionalSignature(): Promise<InstitutionalSignature> {
  const payload = {
    institution_id: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.institution_id,
    institution_name: 'NeuroStrata Simulated Lab',
    scope: 'emission_integrity',
    signed_at: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.issued_at,
  }

  return {
    signature_id: 'SIG-ORG-SIM-2026-0001',
    signature_type: 'simulated_institutional_signature',
    institution_id: payload.institution_id,
    institution_name: payload.institution_name,
    scope: 'emission_integrity',
    signature_hash: await sha256(payload),
    signed_at: payload.signed_at,
    status: 'countersigned',
    simulated_only: true,
  }
}

export async function createLogicalTimestamp(sequence = 1): Promise<LogicalTimestamp> {
  const payload = {
    timestamp_id: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.timestamp_id,
    issued_at: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.issued_at,
    authority_mode: 'internal_logical_timestamp',
    sequence,
  }

  return {
    ...payload,
    authority_mode: 'internal_logical_timestamp',
    timestamp_hash: await sha256(payload),
    simulated_only: true,
  }
}

export async function createEmissionIntegrityObject(params?: {
  documentState?: DocumentState['status']
  documentStateHash?: string
}): Promise<EmissionIntegrityObject> {
  const professionalSignature = await createSimulatedProfessionalSignature()
  const institutionalSignature = await createSimulatedInstitutionalSignature()
  const timestamp = await createLogicalTimestamp()
  const documentState = params?.documentState ?? 'active'

  const emissionWithoutHash = {
    schema: 'sensetrust.emission_integrity.v1' as const,
    emission_id: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.emission_id,
    document_id: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.document_id,
    trust_object_id: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.trust_object_id,
    evidence_manifest_id: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.evidence_manifest_id,
    clinical_chain_id: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.clinical_chain_id,
    certificate_id: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.certificate_id,
    clinical_commit_id: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.clinical_commit_id,
    document_state: documentState,
    timestamp_id: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.timestamp_id,
    document_hash: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.document_hash,
    trust_object_hash: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.trust_object_hash,
    evidence_manifest_hash: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.evidence_manifest_hash,
    clinical_chain_hash: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.clinical_chain_hash,
    document_state_hash: params?.documentStateHash ?? SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.document_state_hash,
    professional_signature: professionalSignature,
    institutional_signature: institutionalSignature,
    timestamp,
    status: toEmissionStatus(documentState),
    created_at: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.issued_at,
    public_exposure: 'metadata_only' as const,
    simulated_only: true as const,
  }

  return {
    ...emissionWithoutHash,
    emission_hash: await calculateEmissionIntegrityHash(emissionWithoutHash),
  }
}

export async function calculateEmissionIntegrityHash(
  emission: Omit<EmissionIntegrityObject, 'emission_hash'> | EmissionIntegrityObject,
) {
  const criticalPayload = {
    document_hash: emission.document_hash,
    trust_object_hash: emission.trust_object_hash,
    evidence_manifest_hash: emission.evidence_manifest_hash,
    clinical_chain_hash: emission.clinical_chain_hash,
    document_state_hash: emission.document_state_hash,
    professional_signature_hash: emission.professional_signature.signature_hash,
    institutional_signature_hash: emission.institutional_signature.signature_hash,
    timestamp_hash: emission.timestamp.timestamp_hash,
  }
  return sha256(criticalPayload)
}

export async function validateEmissionIntegrityObject(
  emission: EmissionIntegrityObject,
): Promise<EmissionIntegrityValidationResult> {
  const errors: string[] = []
  if ((await calculateEmissionIntegrityHash(emission)) !== emission.emission_hash) errors.push('invalid_emission_hash')
  if (!verifyProfessionalSignature(emission.professional_signature).valid) errors.push('invalid_professional_signature')
  if (!verifyInstitutionalSignature(emission.institutional_signature).valid) errors.push('invalid_institutional_signature')
  if (!verifyLogicalTimestamp(emission.timestamp).valid) errors.push('invalid_logical_timestamp')
  if (!VALID_EMISSION_STATES.includes(emission.document_state)) errors.push(`invalid_document_state:${emission.document_state}`)

  return {
    valid: errors.length === 0,
    status: errors.length === 0 ? 'valid' : toEmissionStatus(emission.document_state),
    errors,
  }
}

export function verifyProfessionalSignature(signature: ProfessionalSignature): SignatureVerificationResult {
  const valid =
    signature.signature_type === 'simulated_professional_signature' &&
    signature.actor_id === SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.professional_actor_id &&
    signature.status === 'signed' &&
    signature.signature_hash.startsWith('sha256:')
  return { valid, status: valid ? 'valid' : 'invalid_signature', errors: valid ? [] : ['invalid_professional_signature'] }
}

export function verifyInstitutionalSignature(signature: InstitutionalSignature): SignatureVerificationResult {
  const valid =
    signature.signature_type === 'simulated_institutional_signature' &&
    signature.institution_id === SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.institution_id &&
    signature.status === 'countersigned' &&
    signature.signature_hash.startsWith('sha256:')
  return { valid, status: valid ? 'valid' : 'invalid_signature', errors: valid ? [] : ['invalid_institutional_signature'] }
}

export function verifyLogicalTimestamp(timestamp: LogicalTimestamp): SignatureVerificationResult {
  const valid =
    timestamp.timestamp_id === SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.timestamp_id &&
    timestamp.authority_mode === 'internal_logical_timestamp' &&
    timestamp.timestamp_hash.startsWith('sha256:') &&
    timestamp.sequence > 0
  return { valid, status: valid ? 'valid' : 'invalid_timestamp', errors: valid ? [] : ['invalid_logical_timestamp'] }
}

export async function detectEmissionTampering(emission: EmissionIntegrityObject) {
  return !(await validateEmissionIntegrityObject(emission)).valid
}

export function buildPublicSignaturePayload(emission: EmissionIntegrityObject): PublicSignaturePayload {
  return {
    schema: 'sensetrust.public_signature_payload.v1',
    emission_id: emission.emission_id,
    document_id: emission.document_id,
    signature_status: emission.status === 'timestamped' ? 'timestamped' : emission.status === 'superseded' ? 'superseded' : 'invalid_signature',
    professional_role: emission.professional_signature.role,
    institution_name: emission.institutional_signature.institution_name,
    issued_at: emission.timestamp.issued_at,
    timestamp_mode: emission.timestamp.authority_mode,
    emission_hash_partial: shortHash(emission.emission_hash),
    verification_status: toPublicVerificationStatus(emission),
    document_state: emission.document_state,
    public_exposure: 'metadata_only',
    simulated_only: true,
  }
}

export function validatePublicSignaturePayload(payload: PublicSignaturePayload): EmissionIntegrityValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const exposed = SIGNATURE_TIMESTAMP_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term))
  return {
    valid: exposed.length === 0,
    status: exposed.length === 0 ? 'valid' : 'invalid_integrity',
    errors: exposed.map((term) => `sensitive_public_field:${term}`),
  }
}

export function assertNoSensitiveSignatureExposure(payload: unknown) {
  const validation = validatePublicSignaturePayload(payload as PublicSignaturePayload)
  if (!validation.valid) throw new Error(validation.errors.join(';'))
  return true
}

export function linkEmissionToClinicalCommit(emission: EmissionIntegrityObject) {
  const commit_type: ClinicalCommitType = 'emission_timestamped'
  return {
    clinical_commit_id: emission.clinical_commit_id,
    commit_type,
    emission_id: emission.emission_id,
    certificate_id: emission.certificate_id,
    timestamp_id: emission.timestamp.timestamp_id,
    simulated_only: true as const,
  }
}

export function linkEmissionToDocumentState(emission: EmissionIntegrityObject) {
  return {
    document_id: emission.document_id,
    document_state: emission.document_state,
    document_state_hash: emission.document_state_hash,
    emission_id: emission.emission_id,
    certificate_id: emission.certificate_id,
    valid_for_emission: VALID_EMISSION_STATES.includes(emission.document_state),
    simulated_only: true as const,
  }
}

function toEmissionStatus(documentState: DocumentState['status']): EmissionIntegrityObject['status'] {
  if (documentState === 'signed' || documentState === 'active') return 'timestamped'
  if (documentState === 'revoked') return 'revoked'
  if (documentState === 'expired') return 'expired'
  if (documentState === 'superseded') return 'superseded'
  return 'invalid_integrity'
}

function toPublicVerificationStatus(emission: EmissionIntegrityObject): PublicSignaturePayload['verification_status'] {
  if (emission.document_state === 'signed' || emission.document_state === 'active') return 'valid'
  if (emission.document_state === 'revoked') return 'revoked'
  if (emission.document_state === 'expired') return 'expired'
  if (emission.document_state === 'superseded') return 'superseded'
  return 'invalid_integrity'
}

async function sha256(value: unknown) {
  return `sha256:${await generateSha256FromContent(stableStringify(value))}`
}

function shortHash(hash: string) {
  return hash.length > 22 ? `${hash.slice(0, 18)}...` : hash
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
