import {
  PUBLIC_NARRATIVE_REAL_CLAIM_DENYLIST,
  PUBLIC_NARRATIVE_SENSITIVE_DENYLIST,
  SIMULATED_AUDIENCE_MESSAGES,
  SIMULATED_AUTHORITY_PILLARS,
  SIMULATED_INVESTOR_PUBLIC_MESSAGES,
  SIMULATED_MANIFESTO,
  SIMULATED_PARTNER_MESSAGES,
  SIMULATED_PERMITTED_CLAIMS,
  SIMULATED_PRESS_MESSAGES,
  SIMULATED_PROHIBITED_CLAIMS,
  SIMULATED_PUBLIC_FAQ,
  SIMULATED_PUBLIC_THESIS,
  SIMULATED_RISK_DISCLOSURES,
  SIMULATED_SAFE_LANGUAGE,
  SIMULATED_WEBSITE_COPY,
} from '@/fixtures/sensetrust/simulated-public-narrative'
import type {
  SenseTrustNarrativeExportPayload,
  SenseTrustPublicNarrativeState,
  SenseTrustPublicNarrativeValidationResult,
} from '@/types/sensetrust/public-narrative'

export function createPublicNarrativeState(): SenseTrustPublicNarrativeState {
  return {
    state_id: 'PUBLIC-NARRATIVE-SIM-001',
    version: 'v1.8',
    manifesto: createManifesto(),
    institutional_thesis: createInstitutionalThesis(),
    website_copy: createDefaultWebsiteCopy(),
    audience_messages: SIMULATED_AUDIENCE_MESSAGES.map((item) => ({ ...item })),
    permitted_claims: SIMULATED_PERMITTED_CLAIMS.map((item) => ({ ...item })),
    prohibited_claims: SIMULATED_PROHIBITED_CLAIMS.map((item) => ({ ...item })),
    safe_language: SIMULATED_SAFE_LANGUAGE.map((item) => ({ ...item })),
    public_faq: createPublicFAQ(),
    press_messages: SIMULATED_PRESS_MESSAGES.map((item) => ({ ...item, avoid: [...item.avoid] })),
    partner_messages: SIMULATED_PARTNER_MESSAGES.map((item) => ({ ...item, required_review: [...item.required_review] })),
    investor_public_messages: SIMULATED_INVESTOR_PUBLIC_MESSAGES.map((item) => ({ ...item })),
    risk_disclosures: SIMULATED_RISK_DISCLOSURES.map((item) => ({ ...item })),
    authority_pillars: SIMULATED_AUTHORITY_PILLARS.map((item) => ({ ...item })),
    public_exposure: 'metadata_only',
    clinical_data_used: false,
    real_revenue_claimed: false,
    real_billing_claimed: false,
    diagnostic_truth_certification_claimed: false,
    simulated_only: true,
  }
}

export function createManifesto() { return { ...SIMULATED_MANIFESTO, sections: [...SIMULATED_MANIFESTO.sections] } }
export function createWebsiteCopyBlock() { return { ...SIMULATED_WEBSITE_COPY[0], permitted_claims: [...SIMULATED_WEBSITE_COPY[0].permitted_claims], prohibited_claims: [...SIMULATED_WEBSITE_COPY[0].prohibited_claims] } }
export function createInstitutionalThesis() { return { ...SIMULATED_PUBLIC_THESIS, supporting_points: [...SIMULATED_PUBLIC_THESIS.supporting_points] } }
export function createAudienceMessage() { return { ...SIMULATED_AUDIENCE_MESSAGES[0] } }
export function createPermittedClaim() { return { ...SIMULATED_PERMITTED_CLAIMS[0] } }
export function createProhibitedClaim() { return { ...SIMULATED_PROHIBITED_CLAIMS[0] } }
export function createRegulatorySafeLanguage() { return { ...SIMULATED_SAFE_LANGUAGE[0] } }
export function createPublicFAQ() { return SIMULATED_PUBLIC_FAQ.map((item) => ({ ...item })) }
export function createPressMessage() { return { ...SIMULATED_PRESS_MESSAGES[0], avoid: [...SIMULATED_PRESS_MESSAGES[0].avoid] } }
export function createPartnerMessage() { return { ...SIMULATED_PARTNER_MESSAGES[0], required_review: [...SIMULATED_PARTNER_MESSAGES[0].required_review] } }
export function createInvestorPublicMessage() { return { ...SIMULATED_INVESTOR_PUBLIC_MESSAGES[0] } }
export function createPublicRiskDisclosure() { return { ...SIMULATED_RISK_DISCLOSURES[0] } }
export function createAuthorityPillar() { return { ...SIMULATED_AUTHORITY_PILLARS[0] } }
export function createDefaultWebsiteCopy() { return SIMULATED_WEBSITE_COPY.map((item) => ({ ...item, permitted_claims: [...item.permitted_claims], prohibited_claims: [...item.prohibited_claims] })) }
export function createDefaultPublicNarrative() { return createPublicNarrativeState() }

export function validatePublicNarrativeClaims(state = createPublicNarrativeState()): SenseTrustPublicNarrativeValidationResult {
  const errors = [
    ...validateNoDiagnosticTruthClaim(state).errors,
    ...validateNoRealRevenueClaim(state).errors,
    ...validateNoRealBillingClaim(state).errors,
    ...validateNoClinicalDataExposure(state).errors,
    ...validateRoadmapDisclosures(state).errors,
  ]
  return { valid: errors.length === 0, errors }
}

export function validateNoDiagnosticTruthClaim(payload: unknown): SenseTrustPublicNarrativeValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const forbidden = ['certifica que o diagnostico esta correto', 'certificação diagnóstica absoluta declarada', 'diagnostic truth certification claimed']
  const errors = forbidden.filter((term) => serialized.includes(term))
  return { valid: errors.length === 0, errors }
}

export function validateNoRealRevenueClaim(payload: unknown): SenseTrustPublicNarrativeValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = PUBLIC_NARRATIVE_REAL_CLAIM_DENYLIST.filter((term) => serialized.includes(term))
  if (serialized.includes('real_revenue_claimed":true')) errors.push('real_revenue_claimed_true')
  return { valid: errors.length === 0, errors }
}

export function validateNoRealBillingClaim(payload: unknown): SenseTrustPublicNarrativeValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = serialized.includes('real_billing_claimed":true') ? ['real_billing_claimed_true'] : []
  return { valid: errors.length === 0, errors }
}

export function validateNoClinicalDataExposure(payload: unknown): SenseTrustPublicNarrativeValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = PUBLIC_NARRATIVE_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term))
  return { valid: errors.length === 0, errors }
}

export function validateRoadmapDisclosures(state = createPublicNarrativeState()): SenseTrustPublicNarrativeValidationResult {
  const required = ['not_implemented', 'pending_review', 'planned']
  const present = state.risk_disclosures.map((item) => item.category)
  const errors = required.filter((item) => !present.includes(item as never))
  return { valid: errors.length === 0, errors }
}

export function buildPublicNarrativeExportPayload(): SenseTrustNarrativeExportPayload {
  return { schema: 'sensetrust.public_narrative_export.v1', exported_at: '2026-06-15T10:00:00.000Z', state: createPublicNarrativeState(), public_exposure: 'metadata_only', simulated_only: true }
}

export function validatePublicNarrativeExportPayload(payload = buildPublicNarrativeExportPayload()) {
  return validatePublicNarrativeClaims(payload.state)
}

export function assertPublicNarrativeNoSensitiveExposure(payload: unknown) {
  const result = validateNoClinicalDataExposure(payload)
  if (!result.valid) throw new Error(`public_narrative_sensitive_exposure:${result.errors.join(',')}`)
  return true
}

export function assertPublicNarrativeNoRealRevenueClaims(payload: unknown) {
  const result = validateNoRealRevenueClaim(payload)
  if (!result.valid) throw new Error(`public_narrative_real_revenue_claim:${result.errors.join(',')}`)
  return true
}

export function assertPublicNarrativeNoRealBillingClaims(payload: unknown) {
  const result = validateNoRealBillingClaim(payload)
  if (!result.valid) throw new Error(`public_narrative_real_billing_claim:${result.errors.join(',')}`)
  return true
}

export function assertPublicNarrativeNoDiagnosticTruthCertification(payload: unknown) {
  const result = validateNoDiagnosticTruthClaim(payload)
  if (!result.valid) throw new Error(`public_narrative_diagnostic_truth_claim:${result.errors.join(',')}`)
  return true
}

export function linkPublicNarrativeToInvestorRoom() { return { link: 'SenseTrust Investor Room v1.7', public_exposure: 'metadata_only' as const } }
export function linkPublicNarrativeToRevenueOps() { return { link: 'SenseTrust Revenue Operations v1.6', public_exposure: 'metadata_only' as const } }
export function linkPublicNarrativeToPricing() { return { link: 'SenseTrust Pricing Strategy v1.5', public_exposure: 'metadata_only' as const } }
export function linkPublicNarrativeToFeedbackIntelligence() { return { link: 'SenseTrust Feedback Intelligence v1.4', public_exposure: 'metadata_only' as const } }
export function linkPublicNarrativeToMOC() { return { link: 'MOC_SenseTrust', public_exposure: 'metadata_only' as const } }
