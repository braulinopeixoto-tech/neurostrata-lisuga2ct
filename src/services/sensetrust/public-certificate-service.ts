import { supabase } from '@/lib/supabase/client'
import {
  SIMULATED_CERTIFICATE,
  SIMULATED_CERTIFICATE_CONTENT,
  SIMULATED_CERTIFICATE_TOKEN,
  SIMULATED_REVOKED_CERTIFICATE,
} from '@/fixtures/sensetrust/simulated-certificate'
import { compareSha256Hash } from './pdf-hash-service'
import { buildVerificationUrl } from './qr-verification-service'

export type PublicCertificateStatus = 'active' | 'revoked' | 'expired' | 'not_found' | 'invalid'
export type PublicVerificationStatus = 'valid' | 'invalid' | 'revoked' | 'hash_mismatch'

export interface PublicCertificatePayload {
  certificate_status: PublicCertificateStatus
  document_id: string
  document_type: string
  document_version: string
  issued_at: string
  issuer: string
  verification_status: PublicVerificationStatus
  hash_match: boolean
  revocation_status: 'not_revoked' | 'revoked' | 'unknown'
  verification_url?: string
}

const SAFE_DEFAULT_PAYLOAD: PublicCertificatePayload = {
  certificate_status: 'not_found',
  document_id: 'unavailable',
  document_type: 'unavailable',
  document_version: 'unavailable',
  issued_at: '',
  issuer: 'NeuroStrata SenseTrust Layer',
  verification_status: 'invalid',
  hash_match: false,
  revocation_status: 'unknown',
}

export function generateVerificationToken() {
  return SIMULATED_CERTIFICATE_TOKEN
}

export function createSimulatedTrustCertificate(): PublicCertificatePayload {
  return buildPublicVerificationPayload({
    ...SIMULATED_CERTIFICATE,
    verification_url: buildVerificationUrl(SIMULATED_CERTIFICATE.token).path,
  })
}

export function buildPublicVerificationPayload(input: Record<string, unknown>): PublicCertificatePayload {
  const certificateStatus = asStatus(input.certificate_status ?? input.certificate_status ?? input.status)
  const tokenStatus = String(input.token_status ?? '').toLowerCase()
  const isValid = Boolean(input.is_valid ?? input.isValid)
  const isRevoked = certificateStatus === 'revoked' || tokenStatus === 'revoked'

  return {
    certificate_status: isRevoked ? 'revoked' : certificateStatus,
    document_id: asString(input.document_id ?? input.documentId ?? input.certificate_number, 'unavailable'),
    document_type: asString(input.document_type, 'DNDA_REPORT_SIMULATED'),
    document_version: asString(input.document_version ?? input.version_label, 'unavailable'),
    issued_at: asString(input.issued_at, ''),
    issuer: asString(input.issuer, 'NeuroStrata SenseTrust Layer'),
    verification_status: isRevoked ? 'revoked' : isValid || certificateStatus === 'active' ? 'valid' : 'invalid',
    hash_match: Boolean(input.hash_match ?? input.hashMatch ?? isValid),
    revocation_status: isRevoked ? 'revoked' : 'not_revoked',
    verification_url: asOptionalString(input.verification_url),
  }
}

export async function validateCertificateHash(content: string | ArrayBuffer | Uint8Array, expectedHash: string) {
  const result = await compareSha256Hash(content, expectedHash)
  return {
    ...result,
    verification_status: result.hashMatch ? 'valid' : 'hash_mismatch',
  }
}

export function markCertificateAsRevoked(
  payload: PublicCertificatePayload = createSimulatedTrustCertificate(),
): PublicCertificatePayload {
  return {
    ...payload,
    certificate_status: 'revoked',
    verification_status: 'revoked',
    revocation_status: 'revoked',
  }
}

export async function verifyPublicCertificate(token: string): Promise<PublicCertificatePayload> {
  if (token === SIMULATED_CERTIFICATE.token) {
    return createSimulatedTrustCertificate()
  }

  if (token === SIMULATED_REVOKED_CERTIFICATE.token) {
    return markCertificateAsRevoked(buildPublicVerificationPayload(SIMULATED_REVOKED_CERTIFICATE))
  }

  if (token === 'sim-token-dnda-2026-mismatch') {
    const payload = createSimulatedTrustCertificate()
    return {
      ...payload,
      verification_status: 'hash_mismatch',
      hash_match: false,
    }
  }

  try {
    const { data, error } = await (supabase as { rpc: (fn: string, args: Record<string, unknown>) => Promise<{ data: unknown; error: { message?: string } | null }> }).rpc(
      'verify_public_certificate',
      { p_token: token },
    )

    if (error || !data) {
      return SAFE_DEFAULT_PAYLOAD
    }

    return buildPublicVerificationPayload(data as Record<string, unknown>)
  } catch {
    return SAFE_DEFAULT_PAYLOAD
  }
}

export { SIMULATED_CERTIFICATE_CONTENT }

function asString(value: unknown, fallback: string) {
  return typeof value === 'string' && value.length > 0 ? value : fallback
}

function asOptionalString(value: unknown) {
  return typeof value === 'string' && value.length > 0 ? value : undefined
}

function asStatus(value: unknown): PublicCertificateStatus {
  const status = typeof value === 'string' ? value.toLowerCase() : ''
  if (status === 'active' || status === 'revoked' || status === 'expired') return status
  if (status === 'not_found' || status === 'invalid') return status
  return 'invalid'
}
