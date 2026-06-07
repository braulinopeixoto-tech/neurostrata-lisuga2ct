import { supabase } from '@/lib/supabase/client'
import { generate_sha256, verify_document_hash } from '@/services/hash-service'
import type {
  AuditEvent,
  ClinicalCommit,
  EvidenceManifest,
  PublicVerificationResult,
  TrustCertificate,
} from '@/types/sense-trust'

type EdgeAction =
  | 'create_evidence_manifest'
  | 'create_clinical_commit'
  | 'generate_trust_certificate'
  | 'verify_document_hash'
  | 'revoke_certificate'
  | 'append_audit_event'
  | 'verify_token'

async function invokeSenseTrust<T>(action: EdgeAction, payload: Record<string, unknown>) {
  const { data, error } = await supabase.functions.invoke<T>('sense-trust', {
    body: { action, ...payload },
  })

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error('SenseTrust nao retornou dados.')
  }

  return data
}

export async function create_evidence_manifest(case_id: string) {
  return invokeSenseTrust<EvidenceManifest>('create_evidence_manifest', { case_id })
}

export async function create_clinical_commit(
  case_id: string,
  parent_commit_id: string | null,
  reason: string,
  diff_json: Record<string, unknown>,
) {
  return invokeSenseTrust<ClinicalCommit>('create_clinical_commit', {
    case_id,
    parent_commit_id,
    reason,
    diff_json,
  })
}

export async function generate_trust_certificate(document_id: string) {
  return invokeSenseTrust<TrustCertificate>('generate_trust_certificate', { document_id })
}

export async function revoke_certificate(certificate_id: string, reason: string) {
  return invokeSenseTrust<TrustCertificate>('revoke_certificate', { certificate_id, reason })
}

export async function append_audit_event(
  actor: string,
  action: string,
  resource: string,
  reason?: string,
) {
  return invokeSenseTrust<AuditEvent>('append_audit_event', {
    actor,
    audit_action: action,
    resource,
    reason,
  })
}

export async function verifyPublicToken(token: string) {
  return invokeSenseTrust<PublicVerificationResult>('verify_token', { token })
}

export async function validatePdfExport(params: {
  pdf: Blob | ArrayBuffer | Uint8Array | string
  certificateHash: string
}) {
  const result = await verify_document_hash({
    file: params.pdf,
    expectedHash: params.certificateHash,
  })

  await append_audit_event(
    'current_user',
    'export',
    `document_hash/${params.certificateHash}`,
    result.isValid ? 'pdf_hash_confirmed' : 'pdf_hash_mismatch',
  )

  if (!result.isValid) {
    throw new Error('PDF alterado: hash nao confere com o certificado SenseTrust.')
  }

  return result
}

export { generate_sha256, verify_document_hash }
