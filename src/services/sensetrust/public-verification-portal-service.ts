import type { DocumentLifecycleStatus } from '@/types/sensetrust/document-state'
import type { EmissionIntegrityObject } from '@/types/sensetrust/signature-timestamp'
import type {
  PublicVerificationActionHint,
  PublicVerificationDisplaySection,
  PublicVerificationPortalPayload,
  PublicVerificationPortalResult,
  PublicVerificationSafetyCheck,
  PublicVerificationSeverity,
  PublicVerificationStatus,
} from '@/types/sensetrust/public-verification-portal'
import {
  PUBLIC_PORTAL_SENSITIVE_DENYLIST,
  SIMULATED_PUBLIC_VERIFICATION_IDS,
  SIMULATED_PUBLIC_VERIFICATION_SCENARIOS,
  SIMULATED_PUBLIC_VERIFICATION_TOKENS,
} from '@/fixtures/sensetrust/simulated-public-verification-portal'

export function createPublicVerificationPortalPayload(params?: {
  document_state?: DocumentLifecycleStatus | 'unavailable'
  token_status?: PublicVerificationPortalPayload['token_status']
  superseded_by_document_id?: string | null
}): PublicVerificationPortalPayload {
  const documentState = params?.document_state ?? 'active'
  const tokenStatus = params?.token_status ?? 'valid'
  const verificationStatus = tokenStatus === 'invalid' ? 'invalid_token' : mapDocumentStateToPublicStatus(documentState)
  const severity = toSeverity(verificationStatus)

  return {
    schema: 'sensetrust.public_verification_portal.v1',
    token_status: tokenStatus,
    verification_status: verificationStatus,
    severity,
    document_id: tokenStatus === 'invalid' ? 'unavailable' : SIMULATED_PUBLIC_VERIFICATION_IDS.document_id,
    certificate_id: tokenStatus === 'invalid' ? 'unavailable' : SIMULATED_PUBLIC_VERIFICATION_IDS.certificate_id,
    emission_id: tokenStatus === 'invalid' ? 'unavailable' : SIMULATED_PUBLIC_VERIFICATION_IDS.emission_id,
    document_state: tokenStatus === 'invalid' ? 'unavailable' : documentState,
    signature_status: tokenStatus === 'invalid' ? 'unavailable' : 'timestamped',
    timestamp_status: tokenStatus === 'invalid' ? 'unavailable' : 'valid',
    issued_at: tokenStatus === 'invalid' ? '' : SIMULATED_PUBLIC_VERIFICATION_IDS.issued_at,
    verified_at: SIMULATED_PUBLIC_VERIFICATION_IDS.verified_at,
    professional_role: tokenStatus === 'invalid' ? 'unavailable' : 'simulated_clinical_reviewer',
    institution_name: tokenStatus === 'invalid' ? 'unavailable' : 'NeuroStrata Simulated Lab',
    public_hashes: buildPublicHashSet(tokenStatus === 'invalid'),
    superseded_by_document_id: params?.superseded_by_document_id ?? null,
    public_message: buildPublicVerificationMessage(verificationStatus),
    safety_notice:
      'A SenseTrust certifica integridade, proveniencia e estado documental; nao certifica verdade diagnostica absoluta.',
    action_hints: buildPublicActionHints(verificationStatus),
    public_exposure: 'metadata_only',
    simulated_only: true,
  }
}

export function verifyPublicTokenExpanded(token?: string): PublicVerificationPortalResult {
  if (!token || token === SIMULATED_PUBLIC_VERIFICATION_TOKENS.invalid_token) {
    return buildResult(createInvalidTokenPortalResult())
  }

  const scenario = Object.values(SIMULATED_PUBLIC_VERIFICATION_SCENARIOS).find((item) => item.token === token)
  if (!scenario) return buildResult(createInvalidTokenPortalResult())

  if (scenario.document_state === 'revoked') return buildResult(createRevokedDocumentPortalResult())
  if (scenario.document_state === 'expired') return buildResult(createExpiredDocumentPortalResult())
  if (scenario.document_state === 'superseded') return buildResult(createSupersededDocumentPortalResult())
  if (scenario.document_state === 'invalid_integrity') return buildResult(createInvalidIntegrityPortalResult())

  return buildResult(
    createPublicVerificationPortalPayload({
      document_state: scenario.document_state,
      superseded_by_document_id: scenario.superseded_by_document_id,
    }),
  )
}

export function mapDocumentStateToPublicStatus(
  state: DocumentLifecycleStatus | 'unavailable',
): PublicVerificationStatus {
  if (state === 'active' || state === 'signed' || state === 'active_new_version') return 'verified_active'
  if (state === 'amended') return 'verified_amended'
  if (state === 'revoked') return 'verified_revoked'
  if (state === 'expired') return 'verified_expired'
  if (state === 'superseded' || state === 'archived') return 'verified_superseded'
  if (state === 'invalid_integrity') return 'invalid_integrity'
  return 'unavailable'
}

export function mapSignatureToPublicStatus(signatureStatus: string) {
  if (signatureStatus === 'timestamped' || signatureStatus === 'signed' || signatureStatus === 'countersigned') {
    return 'verified_active' as const
  }
  if (signatureStatus === 'revoked') return 'verified_revoked' as const
  if (signatureStatus === 'superseded') return 'verified_superseded' as const
  return 'invalid_integrity' as const
}

export function mapEmissionIntegrityToPublicStatus(emission: Pick<EmissionIntegrityObject, 'status' | 'document_state'>) {
  if (emission.status === 'timestamped') return mapDocumentStateToPublicStatus(emission.document_state)
  if (emission.status === 'revoked') return 'verified_revoked' as const
  if (emission.status === 'expired') return 'verified_expired' as const
  if (emission.status === 'superseded') return 'verified_superseded' as const
  return 'invalid_integrity' as const
}

export function buildPublicHashSet(unavailable = false) {
  if (unavailable) {
    return {
      certificate_hash_partial: 'unavailable',
      emission_hash_partial: 'unavailable',
      document_hash_partial: 'unavailable',
    }
  }

  return {
    certificate_hash_partial: partialHash(SIMULATED_PUBLIC_VERIFICATION_IDS.certificate_hash),
    emission_hash_partial: partialHash(SIMULATED_PUBLIC_VERIFICATION_IDS.emission_hash),
    document_hash_partial: partialHash(SIMULATED_PUBLIC_VERIFICATION_IDS.document_hash),
  }
}

export function buildPublicVerificationMessage(status: PublicVerificationStatus) {
  const common = 'Esta consulta nao exibe dados clinicos.'
  if (status === 'verified_active') return `Documento verificavel pela SenseTrust. ${common}`
  if (status === 'verified_amended') return `Documento verificavel com adendo governado. ${common}`
  if (status === 'verified_revoked') return `Documento revogado no registro SenseTrust. ${common}`
  if (status === 'verified_expired') return `Documento expirado no registro SenseTrust. ${common}`
  if (status === 'verified_superseded') return `Documento substituido por nova versao no registro SenseTrust. ${common}`
  if (status === 'invalid_integrity') return `Integridade publica nao validada. ${common}`
  if (status === 'invalid_token') return `Token publico invalido ou indisponivel. ${common}`
  return `Verificacao publica indisponivel. ${common}`
}

export function buildPublicActionHints(status: PublicVerificationStatus): PublicVerificationActionHint[] {
  if (status === 'verified_active' || status === 'verified_amended') {
    return [{ action_id: 'keep_certificate_metadata', label: 'Conferir metadados do certificado e hash parcial.', severity: 'success' }]
  }
  if (status === 'verified_superseded') {
    return [{ action_id: 'check_replacement', label: 'Consultar a versao substituta informada.', severity: 'warning' }]
  }
  if (status === 'verified_revoked' || status === 'invalid_integrity') {
    return [{ action_id: 'do_not_use_document', label: 'Nao usar este documento como verificavel.', severity: 'blocked' }]
  }
  return [{ action_id: 'request_new_token', label: 'Solicitar novo token de verificacao ao emissor.', severity: 'neutral' }]
}

export function validatePublicVerificationPortalPayload(
  payload: PublicVerificationPortalPayload,
): PublicVerificationSafetyCheck {
  const serialized = JSON.stringify(payload).toLowerCase()
  const blockedTerms = PUBLIC_PORTAL_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term.toLowerCase()))
  const fullHashExposed = Object.values(payload.public_hashes).some((hash) => hash.startsWith('sha256:') && !hash.endsWith('...'))
  if (fullHashExposed) blockedTerms.push('full_hash')
  return {
    valid: blockedTerms.length === 0 && payload.public_exposure === 'metadata_only',
    blocked_terms: blockedTerms,
    public_exposure: 'metadata_only',
  }
}

export function assertNoSensitivePublicPortalExposure(payload: PublicVerificationPortalPayload) {
  const safety = validatePublicVerificationPortalPayload(payload)
  if (!safety.valid) throw new Error(`sensitive_public_portal_exposure:${safety.blocked_terms.join(',')}`)
  return true
}

export function detectPublicPortalPayloadTampering(payload: PublicVerificationPortalPayload) {
  return !validatePublicVerificationPortalPayload(payload).valid
}

export function createInvalidTokenPortalResult() {
  return createPublicVerificationPortalPayload({ token_status: 'invalid', document_state: 'unavailable' })
}

export function createRevokedDocumentPortalResult() {
  return createPublicVerificationPortalPayload({ document_state: 'revoked' })
}

export function createExpiredDocumentPortalResult() {
  return createPublicVerificationPortalPayload({ document_state: 'expired' })
}

export function createSupersededDocumentPortalResult() {
  return createPublicVerificationPortalPayload({
    document_state: 'superseded',
    superseded_by_document_id: SIMULATED_PUBLIC_VERIFICATION_IDS.replacement_document_id,
  })
}

export function createInvalidIntegrityPortalResult() {
  return createPublicVerificationPortalPayload({ document_state: 'invalid_integrity' })
}

function buildResult(payload: PublicVerificationPortalPayload): PublicVerificationPortalResult {
  const safety = validatePublicVerificationPortalPayload(payload)
  return {
    ok: safety.valid && !['invalid_token', 'invalid_integrity'].includes(payload.verification_status),
    payload,
    safety_check: safety,
    display_sections: buildDisplaySections(payload),
  }
}

function buildDisplaySections(payload: PublicVerificationPortalPayload): PublicVerificationDisplaySection[] {
  return [
    {
      section_id: 'document_state',
      title: 'Estado documental',
      severity: payload.severity,
      items: [
        { label: 'document_state', value: payload.document_state },
        { label: 'verification_status', value: payload.verification_status },
      ],
    },
    {
      section_id: 'signature_timestamp',
      title: 'Assinatura e timestamp',
      severity: 'neutral',
      items: [
        { label: 'signature_status', value: payload.signature_status },
        { label: 'timestamp_status', value: payload.timestamp_status },
        { label: 'issued_at', value: payload.issued_at || 'unavailable' },
      ],
    },
    {
      section_id: 'integrity',
      title: 'Integridade publica',
      severity: 'success',
      items: [
        { label: 'certificate_hash', value: payload.public_hashes.certificate_hash_partial },
        { label: 'emission_hash', value: payload.public_hashes.emission_hash_partial },
        { label: 'document_hash', value: payload.public_hashes.document_hash_partial },
      ],
    },
  ]
}

function toSeverity(status: PublicVerificationStatus): PublicVerificationSeverity {
  if (status === 'verified_active') return 'success'
  if (status === 'verified_amended' || status === 'verified_expired' || status === 'verified_superseded') return 'warning'
  if (status === 'verified_revoked') return 'danger'
  if (status === 'invalid_integrity') return 'blocked'
  return 'neutral'
}

function partialHash(hash: string) {
  return hash.length > 22 ? `${hash.slice(0, 18)}...` : hash
}
