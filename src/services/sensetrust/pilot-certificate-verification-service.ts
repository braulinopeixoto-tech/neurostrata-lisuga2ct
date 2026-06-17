import {
  PILOT_CERTIFICATE_REAL_CLAIM_DENYLIST,
  PILOT_CERTIFICATE_REFERENCES,
  PILOT_CERTIFICATE_SENSITIVE_DENYLIST,
  SIMULATED_CERTIFICATE_ACCEPTANCE_SUMMARIES,
  SIMULATED_CERTIFICATE_CLAIM_GUARDRAILS,
  SIMULATED_CERTIFICATE_EVIDENCE_SUMMARIES,
  SIMULATED_CERTIFICATE_METADATA,
  SIMULATED_CERTIFICATE_MISUSE_BLOCKERS,
  SIMULATED_CERTIFICATE_STATUSES,
  SIMULATED_PILOT_CERTIFICATE_EXPORT_PAYLOAD,
  SIMULATED_PILOT_CERTIFICATE_PREVIEWS,
  SIMULATED_PILOT_CERTIFICATE_REPORTS,
  SIMULATED_PILOT_CERTIFICATE_VERIFICATION_STATE,
  SIMULATED_PUBLIC_METADATA_SNAPSHOTS,
  SIMULATED_PUBLIC_VERIFICATION_PREVIEWS,
  SIMULATED_PUBLIC_VERIFICATION_RESULTS,
  SIMULATED_QR_METADATA_PREVIEWS,
  SIMULATED_VERIFICATION_AUDIT_TRAIL,
  certificateHash,
} from '@/fixtures/sensetrust/simulated-pilot-certificate-verification'
import type {
  SenseTrustPilotCertificateStatusType,
  SenseTrustPilotCertificateVerificationState,
  SenseTrustPilotCertificateExportPayload,
  SenseTrustPilotCertificateValidationResult,
  SenseTrustPublicVerificationResultType,
  SenseTrustQRPreviewStateType,
} from '@/types/sensetrust/pilot-certificate-verification'

export function createPilotCertificateVerificationState() { return createDefaultPilotCertificateVerificationState() }
export function createPilotCertificatePreview() { return { ...SIMULATED_PILOT_CERTIFICATE_PREVIEWS[0] } }
export function createPilotCertificateMetadata() { return { ...SIMULATED_CERTIFICATE_METADATA[0] } }
export function createPilotCertificateStatus() { return cloneArrayFields(SIMULATED_CERTIFICATE_STATUSES[0], ['next_allowed_status', 'blockers']) }
export function createPublicVerificationPreview() { return cloneArrayFields(SIMULATED_PUBLIC_VERIFICATION_PREVIEWS[0], ['visible_public_fields', 'hidden_private_fields', 'blocked_fields']) }
export function createPublicVerificationResult() { return { ...SIMULATED_PUBLIC_VERIFICATION_RESULTS[0] } }
export function createQRMetadataPreview() { return cloneArrayFields(SIMULATED_QR_METADATA_PREVIEWS[0], ['allowed_metadata_fields', 'blocked_metadata_fields']) }
export function createCertificateClaimGuardrail() { return cloneArrayFields(SIMULATED_CERTIFICATE_CLAIM_GUARDRAILS[0], ['allowed_claims', 'prohibited_claims']) }
export function createCertificateEvidenceSummary() { return { ...SIMULATED_CERTIFICATE_EVIDENCE_SUMMARIES[0] } }
export function createCertificateAcceptanceSummary() { return { ...SIMULATED_CERTIFICATE_ACCEPTANCE_SUMMARIES[0] } }
export function createCertificateVerificationAuditTrailItem() { return { ...SIMULATED_VERIFICATION_AUDIT_TRAIL[0] } }
export function createCertificateMisuseBlocker() { return { ...SIMULATED_CERTIFICATE_MISUSE_BLOCKERS[0] } }
export function createCertificatePublicMetadataSnapshot() { return cloneArrayFields(SIMULATED_PUBLIC_METADATA_SNAPSHOTS[0], ['visible_fields', 'hidden_fields', 'blocked_fields']) }
export function createPilotCertificateExecutiveReport() { return cloneArrayFields(SIMULATED_PILOT_CERTIFICATE_REPORTS[0], ['pending_items']) }
export function createDefaultPilotCertificatePreviews() { return SIMULATED_PILOT_CERTIFICATE_PREVIEWS.map((item) => ({ ...item })) }
export function createDefaultPublicVerificationPreviews() { return SIMULATED_PUBLIC_VERIFICATION_PREVIEWS.map((item) => cloneArrayFields(item, ['visible_public_fields', 'hidden_private_fields', 'blocked_fields'])) }
export function createDefaultQRMetadataPreviews() { return SIMULATED_QR_METADATA_PREVIEWS.map((item) => cloneArrayFields(item, ['allowed_metadata_fields', 'blocked_metadata_fields'])) }
export function createDefaultCertificateClaimGuardrails() { return SIMULATED_CERTIFICATE_CLAIM_GUARDRAILS.map((item) => cloneArrayFields(item, ['allowed_claims', 'prohibited_claims'])) }
export function createDefaultCertificateEvidenceSummaries() { return SIMULATED_CERTIFICATE_EVIDENCE_SUMMARIES.map((item) => ({ ...item })) }
export function createDefaultCertificateAcceptanceSummaries() { return SIMULATED_CERTIFICATE_ACCEPTANCE_SUMMARIES.map((item) => ({ ...item })) }
export function createDefaultVerificationAuditTrail() { return SIMULATED_VERIFICATION_AUDIT_TRAIL.map((item) => ({ ...item })) }
export function createDefaultCertificateMisuseBlockers() { return SIMULATED_CERTIFICATE_MISUSE_BLOCKERS.map((item) => ({ ...item })) }
export function createDefaultPublicMetadataSnapshots() { return SIMULATED_PUBLIC_METADATA_SNAPSHOTS.map((item) => cloneArrayFields(item, ['visible_fields', 'hidden_fields', 'blocked_fields'])) }
export function createDefaultPilotCertificateExecutiveReports() { return SIMULATED_PILOT_CERTIFICATE_REPORTS.map((item) => cloneArrayFields(item, ['pending_items'])) }
export function createDefaultPilotCertificateVerificationState(): SenseTrustPilotCertificateVerificationState { return { ...SIMULATED_PILOT_CERTIFICATE_VERIFICATION_STATE, certificate_previews: createDefaultPilotCertificatePreviews(), certificate_metadata: SIMULATED_CERTIFICATE_METADATA.map((item) => ({ ...item })), certificate_statuses: SIMULATED_CERTIFICATE_STATUSES.map((item) => cloneArrayFields(item, ['next_allowed_status', 'blockers'])), public_verification_previews: createDefaultPublicVerificationPreviews(), public_verification_results: SIMULATED_PUBLIC_VERIFICATION_RESULTS.map((item) => ({ ...item })), qr_metadata_previews: createDefaultQRMetadataPreviews(), claim_guardrails: createDefaultCertificateClaimGuardrails(), evidence_summaries: createDefaultCertificateEvidenceSummaries(), acceptance_summaries: createDefaultCertificateAcceptanceSummaries(), verification_audit_trail: createDefaultVerificationAuditTrail(), misuse_blockers: createDefaultCertificateMisuseBlockers(), public_metadata_snapshots: createDefaultPublicMetadataSnapshots(), executive_reports: createDefaultPilotCertificateExecutiveReports(), references: [...PILOT_CERTIFICATE_REFERENCES] } }
export function generateLogicalCertificateHash(seed = 'certificate') { return `logical-${seed}-${seed.length * 29}` }
export function generateSimulatedVerificationUrl(certificateId = 'PCV-CERT-1') { return `https://example.invalid/verify/${certificateId}` }
export function generateSimulatedQRPayload(certificateId = 'PCV-CERT-1') { return `sensetrust://preview/certificate/${certificateId}` }
export function buildPublicMetadataSnapshot() { return createCertificatePublicMetadataSnapshot() }
export function buildCertificateEvidenceSummary() { return createCertificateEvidenceSummary() }
export function buildCertificateAcceptanceSummary() { return createCertificateAcceptanceSummary() }
export function buildPublicVerificationPreview() { return createPublicVerificationPreview() }
export function buildQRMetadataPreview() { return createQRMetadataPreview() }
export function buildVerificationAuditTrail() { return createDefaultVerificationAuditTrail() }
export function classifyCertificateStatus(ready = true, blocked = false): SenseTrustPilotCertificateStatusType { if (blocked) return 'blocked'; return ready ? 'verification_preview_available' : 'ready_for_review' }
export function classifyVerificationResult(status: SenseTrustPilotCertificateStatusType = 'verification_preview_available'): SenseTrustPublicVerificationResultType { if (status === 'blocked') return 'blocked'; if (status === 'revoked_simulated') return 'revoked_simulated'; if (status === 'superseded') return 'superseded'; return status === 'verification_preview_available' ? 'valid_metadata_preview' : 'pending_review' }
export function classifyQRPreviewState(blocked = false): SenseTrustQRPreviewStateType { return blocked ? 'blocked' : 'generated_simulated' }
export function calculateCertificateReadinessScore(evidence = 70, acceptance = 60) { return Math.round((evidence + acceptance) / 2) }
export function calculatePublicVerificationSafetyScore(blockedFields = 5, visibleFields = 4) { return Math.min(100, 70 + blockedFields * 5 - visibleFields) }
export function calculateClaimRiskScore(risk = 35) { return risk }
export function validatePilotCertificatePreviews(state = createDefaultPilotCertificateVerificationState()) { return countCheck(state.certificate_previews.length, 8, 'certificate_previews') }
export function validatePublicVerificationPreviews(state = createDefaultPilotCertificateVerificationState()) { return countCheck(state.public_verification_previews.length, 8, 'public_verification_previews') }
export function validateQRMetadataPreviews(state = createDefaultPilotCertificateVerificationState()) { return countCheck(state.qr_metadata_previews.length, 8, 'qr_metadata_previews') }
export function validateCertificateClaimGuardrails(state = createDefaultPilotCertificateVerificationState()) { return countCheck(state.claim_guardrails.length, 24, 'claim_guardrails') }
export function validatePublicMetadataSnapshots(state = createDefaultPilotCertificateVerificationState()) { return countCheck(state.public_metadata_snapshots.length, 8, 'public_metadata_snapshots') }
export function validateVerificationAuditTrail(state = createDefaultPilotCertificateVerificationState()) { return countCheck(state.verification_audit_trail.length, 24, 'verification_audit_trail') }
export function validateNoClinicalDataExposure(payload: unknown) { return denylistCheck(payload, PILOT_CERTIFICATE_SENSITIVE_DENYLIST, ['clinical_data_used":true', 'contains_clinical_data":true']) }
export function validateNoPatientData(payload: unknown) { return flagCheck(payload, ['patient_data_used":true', 'contains_patient_data":true'], 'patient_data_true') }
export function validateNoPersonalSensitiveData(payload: unknown) { return flagCheck(payload, ['personal_sensitive_data_used":true', 'contains_personal_sensitive_data":true'], 'personal_sensitive_data_true') }
export function validateNoRealPublicPortalClaim(payload: unknown) { return flagCheck(payload, ['real_public_portal_claimed":true', 'public_real_enabled":true'], 'real_public_portal_true') }
export function validateNoRealQRClaim(payload: unknown) { return flagCheck(payload, ['real_qr_claimed":true', 'qr_real_enabled":true'], 'real_qr_true') }
export function validateNoRealLegalSignature(payload: unknown) { return flagCheck(payload, ['legal_signature_claimed":true', 'legal_signature_enabled":true', 'legal_signature_claim":true'], 'legal_signature_true') }
export function validateNoICPClaim(payload: unknown) { return flagCheck(payload, ['icp_brasil_claimed":true', 'icp_brasil_enabled":true'], 'icp_true') }
export function validateNoGovBrClaim(payload: unknown) { return flagCheck(payload, ['gov_br_claimed":true', 'gov_br_enabled":true'], 'gov_br_true') }
export function validateNoBlockchainClaim(payload: unknown) { return flagCheck(payload, ['blockchain_claimed":true', 'blockchain_enabled":true'], 'blockchain_true') }
export function validateNoDiagnosticTruthClaim(payload: unknown) { return flagCheck(payload, ['diagnostic_truth_certification_claimed":true', 'diagnostic_truth_certification_claim":true'], 'diagnostic_truth_true') }
export function validateNoLegalCertificateClaim(payload: unknown) { return flagCheck(payload, ['legal_certificate_claim":true'], 'legal_certificate_true') }
export function validateNoRealClinicalOperation(payload: unknown) { return flagCheck(payload, ['real_clinical_operation_claimed":true'], 'real_clinical_operation_true') }
export function validateNoRealRevenueClaim(payload: unknown) { return denylistCheck(payload, PILOT_CERTIFICATE_REAL_CLAIM_DENYLIST, ['real_revenue_claimed":true']) }
export function validateNoRealBillingClaim(payload: unknown) { return flagCheck(payload, ['real_billing_claimed":true'], 'real_billing_true') }
export function validateNoContractBindingClaim(payload: unknown) { return flagCheck(payload, ['contract_binding_claimed":true', 'contract_binding_claim":true'], 'contract_binding_true') }
export function validateNoClientClaim(payload: unknown) { return flagCheck(payload, ['client_claim":true'], 'client_claim_true') }
export function validateNoPartnershipClaim(payload: unknown) { return flagCheck(payload, ['partnership_claim":true'], 'partnership_claim_true') }
export function buildPilotCertificateExportPayload(): SenseTrustPilotCertificateExportPayload { return { ...SIMULATED_PILOT_CERTIFICATE_EXPORT_PAYLOAD, state: createDefaultPilotCertificateVerificationState() } }
export function validatePilotCertificateExportPayload(payload = buildPilotCertificateExportPayload()) { const checks = [validatePilotCertificatePreviews(payload.state), validatePublicVerificationPreviews(payload.state), validateQRMetadataPreviews(payload.state), validateCertificateClaimGuardrails(payload.state), validatePublicMetadataSnapshots(payload.state), validateVerificationAuditTrail(payload.state), validateNoClinicalDataExposure(payload.state), validateNoPatientData(payload.state), validateNoPersonalSensitiveData(payload.state), validateNoRealPublicPortalClaim(payload.state), validateNoRealQRClaim(payload.state), validateNoRealLegalSignature(payload.state), validateNoICPClaim(payload.state), validateNoGovBrClaim(payload.state), validateNoBlockchainClaim(payload.state), validateNoDiagnosticTruthClaim(payload.state), validateNoLegalCertificateClaim(payload.state), validateNoRealClinicalOperation(payload.state), validateNoRealRevenueClaim(payload.state), validateNoRealBillingClaim(payload.state), validateNoContractBindingClaim(payload.state), validateNoClientClaim(payload.state), validateNoPartnershipClaim(payload.state)]; const errors = checks.flatMap((check) => check.errors); return { valid: errors.length === 0, errors } }
export function assertPilotCertificateNoSensitiveExposure(payload: unknown) { return assertValid(validateNoClinicalDataExposure(payload), 'certificate_sensitive_exposure') }
export function assertPilotCertificateMetadataOnly(payload: { metadata_only?: boolean }) { if (!payload.metadata_only) throw new Error('certificate_not_metadata_only'); return { valid: true, errors: [] } }
export function assertPilotCertificateNoRealPublicPortal(payload: unknown) { return assertValid(validateNoRealPublicPortalClaim(payload), 'certificate_real_public_portal') }
export function assertPilotCertificateNoRealQR(payload: unknown) { return assertValid(validateNoRealQRClaim(payload), 'certificate_real_qr') }
export function assertPilotCertificateNoLegalSignature(payload: unknown) { return assertValid(validateNoRealLegalSignature(payload), 'certificate_legal_signature') }
export function assertPilotCertificateNoICP(payload: unknown) { return assertValid(validateNoICPClaim(payload), 'certificate_icp') }
export function assertPilotCertificateNoGovBr(payload: unknown) { return assertValid(validateNoGovBrClaim(payload), 'certificate_gov_br') }
export function assertPilotCertificateNoBlockchain(payload: unknown) { return assertValid(validateNoBlockchainClaim(payload), 'certificate_blockchain') }
export function assertPilotCertificateNoDiagnosticTruthCertification(payload: unknown) { return assertValid(validateNoDiagnosticTruthClaim(payload), 'certificate_diagnostic_truth') }
export function linkPilotCertificateToEvidenceVault() { return 'SenseTrust Pilot Evidence Vault v2.6' }
export function linkPilotCertificateToAcceptanceLedger() { return 'SenseTrust Acceptance Ledger v2.6' }
export function linkPilotCertificateToInstitutionalPilot() { return 'SenseTrust Institutional Pilot Control Room v2.5' }
export function linkPilotCertificateToMOC() { return ['MOC_SenseTrust', 'MOC_VitalStrata_SenseTrust', 'MOC_NeuroStrata_Trust_Layer', 'MOC_DNDA_Trust_Object', 'MOC_BLC_Rastreabilidade'] }

function cloneArrayFields<T extends Record<string, unknown>>(item: T, keys: string[]): T { const copy = { ...item }; keys.forEach((key) => { const value = item[key]; if (Array.isArray(value)) copy[key as keyof T] = [...value] as T[keyof T] }); return copy }
function countCheck(actual: number, expected: number, label: string): SenseTrustPilotCertificateValidationResult { return { valid: actual >= expected, errors: actual >= expected ? [] : [`${label}_count_below_${expected}`] } }
function denylistCheck(payload: unknown, denylist: string[], flags: string[] = []): SenseTrustPilotCertificateValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); const errors = [...denylist.filter((term) => serialized.includes(term.toLowerCase())), ...flags.filter((flag) => serialized.includes(flag.toLowerCase()))]; return { valid: errors.length === 0, errors } }
function flagCheck(payload: unknown, flags: string[], error: string): SenseTrustPilotCertificateValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); return { valid: !flags.some((flag) => serialized.includes(flag.toLowerCase())), errors: flags.some((flag) => serialized.includes(flag.toLowerCase())) ? [error] : [] } }
function assertValid(result: SenseTrustPilotCertificateValidationResult, label: string) { if (!result.valid) throw new Error(`${label}: ${result.errors.join(', ')}`); return result }
