import {
  PARTNER_DEMO_KIT_REAL_CLAIM_DENYLIST,
  PARTNER_DEMO_KIT_SENSITIVE_DENYLIST,
  SIMULATED_AUDIENCE_BRIEFINGS,
  SIMULATED_AUTHORIZED_MATERIALS,
  SIMULATED_DEMO_ONE_PAGER,
  SIMULATED_FEEDBACK_MOCK,
  SIMULATED_FOLLOW_UP_SEQUENCES,
  SIMULATED_HANDOFF_GOVERNANCE,
  SIMULATED_MEETING_AGENDAS,
  SIMULATED_MEETING_SCRIPTS,
  SIMULATED_PARTNER_DEMO_KIT,
  SIMULATED_PARTNER_DEMO_READINESS_SCORE,
  SIMULATED_PARTNER_DEMO_REFERENCES,
  SIMULATED_PARTNER_DEMO_RISKS,
  SIMULATED_POST_DEMO_CHECKLIST,
  SIMULATED_PRE_MEETING_CHECKLIST,
  SIMULATED_PROHIBITED_MATERIALS,
} from '@/fixtures/sensetrust/simulated-partner-demo-kit'
import type {
  SenseTrustPartnerDemoKitExportPayload,
  SenseTrustPartnerDemoKitState,
  SenseTrustPartnerDemoKitValidationResult,
} from '@/types/sensetrust/partner-demo-kit'

export function createPartnerDemoKitState(): SenseTrustPartnerDemoKitState { return createDefaultPartnerDemoKit() }
export function createPartnerDemoKit() { return { ...SIMULATED_PARTNER_DEMO_KIT, one_pager: createDemoOnePager(), audience_briefings: createDefaultAudienceBriefings(), meeting_scripts: createDefaultMeetingScripts(), meeting_agendas: SIMULATED_MEETING_AGENDAS.map((item) => ({ ...item, items: [...item.items] })) } }
export function createDemoOnePager() { return { ...SIMULATED_DEMO_ONE_PAGER, certifies: [...SIMULATED_DEMO_ONE_PAGER.certifies], does_not_certify: [...SIMULATED_DEMO_ONE_PAGER.does_not_certify], proof_points: [...SIMULATED_DEMO_ONE_PAGER.proof_points] } }
export function createDemoAudienceBriefing() { return { ...SIMULATED_AUDIENCE_BRIEFINGS[0], recommended_materials: [...SIMULATED_AUDIENCE_BRIEFINGS[0].recommended_materials], required_disclosures: [...SIMULATED_AUDIENCE_BRIEFINGS[0].required_disclosures] } }
export function createMeetingScript() { return { ...SIMULATED_MEETING_SCRIPTS[0] } }
export function createMeetingAgenda() { return { ...SIMULATED_MEETING_AGENDAS[0], items: [...SIMULATED_MEETING_AGENDAS[0].items] } }
export function createPreMeetingChecklist() { return { ...SIMULATED_PRE_MEETING_CHECKLIST, items: [...SIMULATED_PRE_MEETING_CHECKLIST.items] } }
export function createPostDemoChecklist() { return { ...SIMULATED_POST_DEMO_CHECKLIST, items: [...SIMULATED_POST_DEMO_CHECKLIST.items] } }
export function createAuthorizedMaterial() { return { ...SIMULATED_AUTHORIZED_MATERIALS[0] } }
export function createProhibitedMaterial() { return { ...SIMULATED_PROHIBITED_MATERIALS[0] } }
export function createDemoFeedbackMock() { return { ...SIMULATED_FEEDBACK_MOCK[0] } }
export function createFollowUpSequence() { return { ...SIMULATED_FOLLOW_UP_SEQUENCES[0], allowed_materials: [...SIMULATED_FOLLOW_UP_SEQUENCES[0].allowed_materials], blockers: [...SIMULATED_FOLLOW_UP_SEQUENCES[0].blockers] } }
export function createPartnerDemoRisk() { return { ...SIMULATED_PARTNER_DEMO_RISKS[0] } }
export function createDemoHandoffGovernance() { return { ...SIMULATED_HANDOFF_GOVERNANCE[0] } }
export function createPartnerDemoReadinessScore() { return { ...SIMULATED_PARTNER_DEMO_READINESS_SCORE } }
export function createDefaultAudienceBriefings() { return SIMULATED_AUDIENCE_BRIEFINGS.map((item) => ({ ...item, recommended_materials: [...item.recommended_materials], required_disclosures: [...item.required_disclosures] })) }
export function createDefaultMeetingScripts() { return SIMULATED_MEETING_SCRIPTS.map((item) => ({ ...item })) }
export function createDefaultAuthorizedMaterials() { return SIMULATED_AUTHORIZED_MATERIALS.map((item) => ({ ...item })) }
export function createDefaultProhibitedMaterials() { return SIMULATED_PROHIBITED_MATERIALS.map((item) => ({ ...item })) }
export function createDefaultFeedbackMock() { return SIMULATED_FEEDBACK_MOCK.map((item) => ({ ...item })) }
export function createDefaultFollowUpSequence() { return SIMULATED_FOLLOW_UP_SEQUENCES.map((item) => ({ ...item, allowed_materials: [...item.allowed_materials], blockers: [...item.blockers] })) }
export function createDefaultPartnerDemoRisks() { return SIMULATED_PARTNER_DEMO_RISKS.map((item) => ({ ...item })) }
export function createDefaultDemoHandoffGovernance() { return SIMULATED_HANDOFF_GOVERNANCE.map((item) => ({ ...item })) }

export function createDefaultPartnerDemoKit(): SenseTrustPartnerDemoKitState {
  return {
    state_id: 'PARTNER-DEMO-KIT-SIM-V22',
    version: 'v2.2',
    partner_demo_kit: createPartnerDemoKit(),
    pre_meeting_checklist: createPreMeetingChecklist(),
    post_demo_checklist: createPostDemoChecklist(),
    authorized_materials: createDefaultAuthorizedMaterials(),
    prohibited_materials: createDefaultProhibitedMaterials(),
    feedback_mock: createDefaultFeedbackMock(),
    follow_up_sequences: createDefaultFollowUpSequence(),
    risks: createDefaultPartnerDemoRisks(),
    handoff_governance: createDefaultDemoHandoffGovernance(),
    readiness_score: calculatePartnerDemoReadinessScore(),
    references: [...SIMULATED_PARTNER_DEMO_REFERENCES],
    public_exposure: 'metadata_only',
    clinical_data_used: false,
    real_revenue_claimed: false,
    real_billing_claimed: false,
    diagnostic_truth_certification_claimed: false,
    production_deploy_claimed: false,
    real_lead_collection: false,
    real_analytics_enabled: false,
    contract_binding_claimed: false,
    simulated_only: true,
  }
}

export function calculatePartnerDemoReadinessScore() {
  const blockers = SIMULATED_PARTNER_DEMO_RISKS.filter((risk) => risk.blocks_meeting).length
  const warnings = SIMULATED_AUTHORIZED_MATERIALS.filter((material) => material.requires_human_review).length
  return { ...SIMULATED_PARTNER_DEMO_READINESS_SCORE, blockers, warnings, score: Math.max(0, 100 - blockers * 2 - warnings) }
}

export function validatePartnerDemoKit(state = createDefaultPartnerDemoKit()): SenseTrustPartnerDemoKitValidationResult {
  const errors: string[] = []
  if (state.partner_demo_kit.audience_briefings.length !== 8) errors.push('audience_briefings_invalid')
  if (state.partner_demo_kit.meeting_scripts.length !== 8) errors.push('meeting_scripts_invalid')
  if (!state.partner_demo_kit.one_pager.required_disclosure) errors.push('one_pager_missing_disclosure')
  return { valid: errors.length === 0, errors }
}
export function validateAuthorizedMaterials(state = createDefaultPartnerDemoKit()) { return { valid: state.authorized_materials.length >= 12, errors: state.authorized_materials.length >= 12 ? [] : ['authorized_materials_missing'] } }
export function validateMeetingScripts(state = createDefaultPartnerDemoKit()) { return { valid: state.partner_demo_kit.meeting_scripts.length === 8, errors: state.partner_demo_kit.meeting_scripts.length === 8 ? [] : ['meeting_scripts_invalid'] } }
export function validateFeedbackMock(state = createDefaultPartnerDemoKit()) { return { valid: state.feedback_mock.every((item) => !item.real_collection_enabled), errors: state.feedback_mock.every((item) => !item.real_collection_enabled) ? [] : ['feedback_real_collection_enabled'] } }
export function validateFollowUpSequence(state = createDefaultPartnerDemoKit()) { return { valid: state.follow_up_sequences.every((item) => !item.automation_enabled), errors: state.follow_up_sequences.every((item) => !item.automation_enabled) ? [] : ['follow_up_automation_enabled'] } }

export function validateNoDiagnosticTruthClaim(payload: unknown): SenseTrustPartnerDemoKitValidationResult { return flagCheck(payload, 'diagnostic_truth_certification_claimed":true', 'diagnostic_truth_certification_claimed_true') }
export function validateNoRealLeadCollection(payload: unknown): SenseTrustPartnerDemoKitValidationResult { return flagCheck(payload, 'real_lead_collection":true', 'real_lead_collection_true') }
export function validateNoRealAnalytics(payload: unknown): SenseTrustPartnerDemoKitValidationResult { return flagCheck(payload, 'real_analytics_enabled":true', 'real_analytics_enabled_true') }
export function validateNoProductionDeployClaim(payload: unknown): SenseTrustPartnerDemoKitValidationResult { return flagCheck(payload, 'production_deploy_claimed":true', 'production_deploy_claimed_true') }
export function validateNoRealBillingClaim(payload: unknown): SenseTrustPartnerDemoKitValidationResult { return flagCheck(payload, 'real_billing_claimed":true', 'real_billing_claimed_true') }
export function validateNoContractBindingClaim(payload: unknown): SenseTrustPartnerDemoKitValidationResult { return flagCheck(payload, 'contract_binding_claimed":true', 'contract_binding_claimed_true') }

export function validateNoClinicalDataExposure(payload: unknown): SenseTrustPartnerDemoKitValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = PARTNER_DEMO_KIT_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term))
  return { valid: errors.length === 0, errors }
}

export function validateNoRealRevenueClaim(payload: unknown): SenseTrustPartnerDemoKitValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = PARTNER_DEMO_KIT_REAL_CLAIM_DENYLIST.filter((term) => serialized.includes(term))
  if (serialized.includes('real_revenue_claimed":true')) errors.push('real_revenue_claimed_true')
  return { valid: errors.length === 0, errors }
}

export function buildPartnerDemoKitExportPayload(): SenseTrustPartnerDemoKitExportPayload {
  return { schema: 'sensetrust.partner_demo_kit_export.v1', exported_at: '2026-06-15T15:00:00.000Z', state: createDefaultPartnerDemoKit(), public_exposure: 'metadata_only', simulated_only: true }
}

export function validatePartnerDemoKitExportPayload(payload = buildPartnerDemoKitExportPayload()) {
  const checks = [validatePartnerDemoKit(payload.state), validateAuthorizedMaterials(payload.state), validateMeetingScripts(payload.state), validateFeedbackMock(payload.state), validateFollowUpSequence(payload.state), validateNoDiagnosticTruthClaim(payload.state), validateNoRealLeadCollection(payload.state), validateNoRealAnalytics(payload.state), validateNoProductionDeployClaim(payload.state), validateNoClinicalDataExposure(payload.state), validateNoRealRevenueClaim(payload.state), validateNoRealBillingClaim(payload.state), validateNoContractBindingClaim(payload.state)]
  const errors = checks.flatMap((check) => check.errors)
  return { valid: errors.length === 0, errors }
}

export function assertPartnerDemoKitNoSensitiveExposure(payload: unknown) { return assertValid(validateNoClinicalDataExposure(payload), 'partner_demo_sensitive_exposure') }
export function assertPartnerDemoKitNoRealLeadCollection(payload: unknown) { return assertValid(validateNoRealLeadCollection(payload), 'partner_demo_real_lead_collection') }
export function assertPartnerDemoKitNoRealAnalytics(payload: unknown) { return assertValid(validateNoRealAnalytics(payload), 'partner_demo_real_analytics') }
export function assertPartnerDemoKitNoProductionDeploy(payload: unknown) { return assertValid(validateNoProductionDeployClaim(payload), 'partner_demo_production_deploy') }
export function assertPartnerDemoKitNoDiagnosticTruthCertification(payload: unknown) { return assertValid(validateNoDiagnosticTruthClaim(payload), 'partner_demo_diagnostic_truth') }

export function linkPartnerDemoKitToDemoReadiness() { return { link: 'SenseTrust Demo Readiness v2.1', public_exposure: 'metadata_only' as const } }
export function linkPartnerDemoKitToPrototypeUX() { return { link: 'SenseTrust Prototype UX v2.0', public_exposure: 'metadata_only' as const } }
export function linkPartnerDemoKitToWebsiteBlueprint() { return { link: 'SenseTrust Website Blueprint v1.9', public_exposure: 'metadata_only' as const } }
export function linkPartnerDemoKitToMOC() { return { link: 'MOC_SenseTrust', public_exposure: 'metadata_only' as const } }

function flagCheck(payload: unknown, flag: string, error: string): SenseTrustPartnerDemoKitValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = serialized.includes(flag) ? [error] : []
  return { valid: errors.length === 0, errors }
}

function assertValid(result: SenseTrustPartnerDemoKitValidationResult, prefix: string) {
  if (!result.valid) throw new Error(`${prefix}:${result.errors.join(',')}`)
  return true
}
