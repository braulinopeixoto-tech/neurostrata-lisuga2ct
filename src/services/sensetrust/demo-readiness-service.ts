import {
  DEMO_READINESS_REAL_CLAIM_DENYLIST,
  DEMO_READINESS_SENSITIVE_DENYLIST,
  SIMULATED_DEMO_AUDIENCES,
  SIMULATED_DEMO_GOVERNANCE,
  SIMULATED_DEMO_OBJECTIONS,
  SIMULATED_DEMO_READINESS_REFERENCES,
  SIMULATED_DEMO_READINESS_SCORE,
  SIMULATED_DEMO_RISKS,
  SIMULATED_DEMO_SCENARIOS,
  SIMULATED_DEMO_SCRIPT,
  SIMULATED_DEMO_STEPS,
  SIMULATED_PRESENTATION_CHECKLIST,
  SIMULATED_TALK_TRACKS,
  SIMULATED_VISUAL_ISSUES,
  SIMULATED_VISUAL_QA_CHECKS,
} from '@/fixtures/sensetrust/simulated-demo-readiness'
import type {
  SenseTrustDemoReadinessExportPayload,
  SenseTrustDemoReadinessState,
  SenseTrustDemoReadinessValidationResult,
} from '@/types/sensetrust/demo-readiness'

export function createDemoReadinessState(): SenseTrustDemoReadinessState {
  return createDefaultDemoReadinessState()
}

export function createVisualQACheck() { return { ...SIMULATED_VISUAL_QA_CHECKS[0] } }
export function createDemoScript() { return createDefaultDemoScript() }
export function createDemoStep() { return { ...SIMULATED_DEMO_STEPS[0], prohibited_claims: [...SIMULATED_DEMO_STEPS[0].prohibited_claims] } }
export function createDemoAudience() { return { ...SIMULATED_DEMO_AUDIENCES[0] } }
export function createDemoReadinessScore() { return { ...SIMULATED_DEMO_READINESS_SCORE } }
export function createPresentationChecklist() { return SIMULATED_PRESENTATION_CHECKLIST.map((item) => ({ ...item })) }
export function createVisualIssue() { return { ...SIMULATED_VISUAL_ISSUES[0] } }
export function createDemoRisk() { return { ...SIMULATED_DEMO_RISKS[0] } }
export function createDemoTalkTrack() { return { ...SIMULATED_TALK_TRACKS[0] } }
export function createDemoObjection() { return { ...SIMULATED_DEMO_OBJECTIONS[0] } }
export function createDemoScenario() { return { ...SIMULATED_DEMO_SCENARIOS[0], steps: [...SIMULATED_DEMO_SCENARIOS[0].steps] } }
export function createDemoGovernanceItem() { return { ...SIMULATED_DEMO_GOVERNANCE[0] } }
export function createDefaultVisualQAChecklist() { return SIMULATED_VISUAL_QA_CHECKS.map((item) => ({ ...item })) }
export function createDefaultDemoScript() { return { ...SIMULATED_DEMO_SCRIPT, steps: SIMULATED_DEMO_SCRIPT.steps.map((step) => ({ ...step, prohibited_claims: [...step.prohibited_claims] })) } }
export function createDefaultAudienceTalkTracks() { return SIMULATED_TALK_TRACKS.map((item) => ({ ...item })) }

export function createDefaultDemoReadinessState(): SenseTrustDemoReadinessState {
  const visual_qa_checks = createDefaultVisualQAChecklist()
  return {
    state_id: 'DEMO-READINESS-SIM-V21',
    version: 'v2.1',
    status: 'ready_for_internal_demo',
    visual_qa_checks,
    demo_script: createDefaultDemoScript(),
    audiences: SIMULATED_DEMO_AUDIENCES.map((item) => ({ ...item })),
    readiness_score: calculateDemoReadinessScore(visual_qa_checks),
    presentation_checklist: createPresentationChecklist(),
    visual_issues: SIMULATED_VISUAL_ISSUES.map((item) => ({ ...item })),
    demo_risks: SIMULATED_DEMO_RISKS.map((item) => ({ ...item })),
    talk_tracks: createDefaultAudienceTalkTracks(),
    objections: SIMULATED_DEMO_OBJECTIONS.map((item) => ({ ...item })),
    demo_scenarios: SIMULATED_DEMO_SCENARIOS.map((item) => ({ ...item, steps: [...item.steps] })),
    governance_items: SIMULATED_DEMO_GOVERNANCE.map((item) => ({ ...item })),
    references: [...SIMULATED_DEMO_READINESS_REFERENCES],
    public_exposure: 'metadata_only',
    clinical_data_used: false,
    real_revenue_claimed: false,
    real_billing_claimed: false,
    diagnostic_truth_certification_claimed: false,
    production_deploy_claimed: false,
    real_lead_collection: false,
    real_analytics_enabled: false,
    simulated_only: true,
  }
}

export function calculateDemoReadinessScore(checks = createDefaultVisualQAChecklist()) {
  const blockers = checks.filter((check) => check.blocks_demo || check.status === 'blocked').length
  const warnings = checks.filter((check) => check.status === 'warning').length
  const score = Math.max(0, 100 - blockers * 30 - warnings * 3)
  return { ...SIMULATED_DEMO_READINESS_SCORE, score, blockers, warnings, status: blockers > 0 ? 'blocked' as const : 'ready_for_internal_demo' as const }
}

export function validateVisualQAChecklist(state = createDefaultDemoReadinessState()): SenseTrustDemoReadinessValidationResult {
  const errors: string[] = []
  if (state.visual_qa_checks.length < 40) errors.push('visual_qa_checks_minimum_not_met')
  if (state.visual_qa_checks.some((check) => !check.finding || !check.recommendation)) errors.push('visual_qa_check_incomplete')
  return { valid: errors.length === 0, errors }
}

export function validateDemoScript(state = createDefaultDemoReadinessState()): SenseTrustDemoReadinessValidationResult {
  const errors: string[] = []
  if (state.demo_script.steps.length !== 12) errors.push('demo_script_steps_invalid')
  if (state.demo_script.steps.some((step) => step.prohibited_claims.length === 0)) errors.push('demo_step_missing_prohibited_claims')
  return { valid: errors.length === 0, errors }
}

export function validateDemoDisclosures(state = createDefaultDemoReadinessState()): SenseTrustDemoReadinessValidationResult {
  const serialized = JSON.stringify(state).toLowerCase()
  const required = ['metadata_only', 'nao certifica diagnostico', 'sem coleta real', 'sem deploy']
  const errors = required.filter((term) => !serialized.includes(term))
  return { valid: errors.length === 0, errors }
}

export function validateNoDiagnosticTruthClaim(payload: unknown): SenseTrustDemoReadinessValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = serialized.includes('diagnostic_truth_certification_claimed":true') ? ['diagnostic_truth_certification_claimed_true'] : []
  return { valid: errors.length === 0, errors }
}

export function validateNoRealLeadCollection(payload: unknown): SenseTrustDemoReadinessValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = serialized.includes('real_lead_collection":true') ? ['real_lead_collection_true'] : []
  return { valid: errors.length === 0, errors }
}

export function validateNoRealAnalytics(payload: unknown): SenseTrustDemoReadinessValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = serialized.includes('real_analytics_enabled":true') ? ['real_analytics_enabled_true'] : []
  return { valid: errors.length === 0, errors }
}

export function validateNoProductionDeployClaim(payload: unknown): SenseTrustDemoReadinessValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = serialized.includes('production_deploy_claimed":true') ? ['production_deploy_claimed_true'] : []
  return { valid: errors.length === 0, errors }
}

export function validateNoClinicalDataExposure(payload: unknown): SenseTrustDemoReadinessValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = DEMO_READINESS_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term))
  return { valid: errors.length === 0, errors }
}

export function validateNoRealRevenueClaim(payload: unknown): SenseTrustDemoReadinessValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = DEMO_READINESS_REAL_CLAIM_DENYLIST.filter((term) => serialized.includes(term))
  if (serialized.includes('real_revenue_claimed":true')) errors.push('real_revenue_claimed_true')
  return { valid: errors.length === 0, errors }
}

export function validateNoRealBillingClaim(payload: unknown): SenseTrustDemoReadinessValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = serialized.includes('real_billing_claimed":true') ? ['real_billing_claimed_true'] : []
  return { valid: errors.length === 0, errors }
}

export function buildDemoReadinessExportPayload(): SenseTrustDemoReadinessExportPayload {
  return { schema: 'sensetrust.demo_readiness_export.v1', exported_at: '2026-06-15T14:00:00.000Z', state: createDefaultDemoReadinessState(), public_exposure: 'metadata_only', simulated_only: true }
}

export function validateDemoReadinessExportPayload(payload = buildDemoReadinessExportPayload()) {
  const checks = [
    validateVisualQAChecklist(payload.state),
    validateDemoScript(payload.state),
    validateDemoDisclosures(payload.state),
    validateNoDiagnosticTruthClaim(payload.state),
    validateNoRealLeadCollection(payload.state),
    validateNoRealAnalytics(payload.state),
    validateNoProductionDeployClaim(payload.state),
    validateNoClinicalDataExposure(payload.state),
    validateNoRealRevenueClaim(payload.state),
    validateNoRealBillingClaim(payload.state),
  ]
  const errors = checks.flatMap((check) => check.errors)
  return { valid: errors.length === 0, errors }
}

export function assertDemoReadinessNoSensitiveExposure(payload: unknown) {
  const result = validateNoClinicalDataExposure(payload)
  if (!result.valid) throw new Error(`demo_readiness_sensitive_exposure:${result.errors.join(',')}`)
  return true
}

export function assertDemoReadinessNoRealLeadCollection(payload: unknown) {
  const result = validateNoRealLeadCollection(payload)
  if (!result.valid) throw new Error(`demo_readiness_real_lead_collection:${result.errors.join(',')}`)
  return true
}

export function assertDemoReadinessNoRealAnalytics(payload: unknown) {
  const result = validateNoRealAnalytics(payload)
  if (!result.valid) throw new Error(`demo_readiness_real_analytics:${result.errors.join(',')}`)
  return true
}

export function assertDemoReadinessNoProductionDeploy(payload: unknown) {
  const result = validateNoProductionDeployClaim(payload)
  if (!result.valid) throw new Error(`demo_readiness_production_deploy:${result.errors.join(',')}`)
  return true
}

export function assertDemoReadinessNoDiagnosticTruthCertification(payload: unknown) {
  const result = validateNoDiagnosticTruthClaim(payload)
  if (!result.valid) throw new Error(`demo_readiness_diagnostic_truth:${result.errors.join(',')}`)
  return true
}

export function linkDemoReadinessToPrototypeUX() { return { link: 'SenseTrust Prototype UX v2.0', public_exposure: 'metadata_only' as const } }
export function linkDemoReadinessToWebsiteBlueprint() { return { link: 'SenseTrust Website Blueprint v1.9', public_exposure: 'metadata_only' as const } }
export function linkDemoReadinessToPublicNarrative() { return { link: 'SenseTrust Public Narrative v1.8', public_exposure: 'metadata_only' as const } }
export function linkDemoReadinessToMOC() { return { link: 'MOC_SenseTrust', public_exposure: 'metadata_only' as const } }
