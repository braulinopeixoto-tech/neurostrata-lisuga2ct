import {
  MEETING_INTELLIGENCE_REAL_CLAIM_DENYLIST,
  MEETING_INTELLIGENCE_SENSITIVE_DENYLIST,
  SIMULATED_FOLLOW_UP_GOVERNANCE,
  SIMULATED_INTEREST_SIGNALS,
  SIMULATED_MEETING_AUDIENCES,
  SIMULATED_MEETING_DECISIONS,
  SIMULATED_MEETING_FEEDBACK_ITEMS,
  SIMULATED_MEETING_INSIGHTS,
  SIMULATED_MEETING_INTELLIGENCE_REFERENCES,
  SIMULATED_MEETING_OBJECTIVES,
  SIMULATED_MEETING_OBJECTIONS,
  SIMULATED_MEETING_RECORDS,
  SIMULATED_NEXT_STEPS,
  SIMULATED_OPPORTUNITY_SCORES,
  SIMULATED_PARTICIPANT_PROFILES,
  SIMULATED_READINESS_SCORES,
  SIMULATED_RISK_SIGNALS,
} from '@/fixtures/sensetrust/simulated-meeting-intelligence'
import type {
  SenseTrustMeetingIntelligenceExportPayload,
  SenseTrustMeetingIntelligenceState,
  SenseTrustMeetingIntelligenceValidationResult,
  SenseTrustMeetingInterestLevel,
  SenseTrustMeetingRiskLevel,
} from '@/types/sensetrust/meeting-intelligence'

export function createMeetingIntelligenceState(): SenseTrustMeetingIntelligenceState { return createDefaultMeetingIntelligenceState() }
export function createMeetingRecord() { return cloneMeetingRecord(SIMULATED_MEETING_RECORDS[0]) }
export function createMeetingParticipantProfile() { return { ...SIMULATED_PARTICIPANT_PROFILES[0] } }
export function createMeetingAudience() { return { ...SIMULATED_MEETING_AUDIENCES[0] } }
export function createMeetingObjective() { return { ...SIMULATED_MEETING_OBJECTIVES[0] } }
export function createMeetingFeedbackItem() { return { ...SIMULATED_MEETING_FEEDBACK_ITEMS[0] } }
export function createMeetingObjection() { return { ...SIMULATED_MEETING_OBJECTIONS[0] } }
export function createMeetingInterestSignal() { return { ...SIMULATED_INTEREST_SIGNALS[0] } }
export function createMeetingRiskSignal() { return { ...SIMULATED_RISK_SIGNALS[0] } }
export function createMeetingNextStep() { return { ...SIMULATED_NEXT_STEPS[0], blockers: [...SIMULATED_NEXT_STEPS[0].blockers] } }
export function createMeetingFollowUpGovernance() { return { ...SIMULATED_FOLLOW_UP_GOVERNANCE[0], allowed_materials: [...SIMULATED_FOLLOW_UP_GOVERNANCE[0].allowed_materials], prohibited_materials: [...SIMULATED_FOLLOW_UP_GOVERNANCE[0].prohibited_materials] } }
export function createMeetingOpportunityScore() { return { ...SIMULATED_OPPORTUNITY_SCORES[0] } }
export function createMeetingReadinessScore() { return { ...SIMULATED_READINESS_SCORES[0] } }
export function createMeetingInsight() { return { ...SIMULATED_MEETING_INSIGHTS[0] } }
export function createMeetingDecision() { return { ...SIMULATED_MEETING_DECISIONS[0] } }
export function createDefaultMeetingRecords() { return SIMULATED_MEETING_RECORDS.map(cloneMeetingRecord) }
export function createDefaultFeedbackItems() { return SIMULATED_MEETING_FEEDBACK_ITEMS.map((item) => ({ ...item })) }
export function createDefaultMeetingObjections() { return SIMULATED_MEETING_OBJECTIONS.map((item) => ({ ...item })) }
export function createDefaultInterestSignals() { return SIMULATED_INTEREST_SIGNALS.map((item) => ({ ...item })) }
export function createDefaultRiskSignals() { return SIMULATED_RISK_SIGNALS.map((item) => ({ ...item })) }
export function createDefaultNextSteps() { return SIMULATED_NEXT_STEPS.map((item) => ({ ...item, blockers: [...item.blockers] })) }
export function createDefaultFollowUpGovernance() { return SIMULATED_FOLLOW_UP_GOVERNANCE.map((item) => ({ ...item, allowed_materials: [...item.allowed_materials], prohibited_materials: [...item.prohibited_materials] })) }

export function createDefaultMeetingIntelligenceState(): SenseTrustMeetingIntelligenceState {
  return {
    state_id: 'MEETING-INTELLIGENCE-SIM-V23',
    version: 'v2.3',
    meeting_records: createDefaultMeetingRecords(),
    audiences: SIMULATED_MEETING_AUDIENCES.map((item) => ({ ...item })),
    feedback_items: createDefaultFeedbackItems(),
    objections: createDefaultMeetingObjections(),
    interest_signals: createDefaultInterestSignals(),
    risk_signals: createDefaultRiskSignals(),
    next_steps: createDefaultNextSteps(),
    follow_up_governance: createDefaultFollowUpGovernance(),
    opportunity_scores: SIMULATED_OPPORTUNITY_SCORES.map((item) => ({ ...item })),
    readiness_scores: SIMULATED_READINESS_SCORES.map((item) => ({ ...item })),
    insights: SIMULATED_MEETING_INSIGHTS.map((item) => ({ ...item })),
    decisions: SIMULATED_MEETING_DECISIONS.map((item) => ({ ...item })),
    references: [...SIMULATED_MEETING_INTELLIGENCE_REFERENCES],
    public_exposure: 'metadata_only',
    clinical_data_used: false,
    real_revenue_claimed: false,
    real_billing_claimed: false,
    diagnostic_truth_certification_claimed: false,
    production_deploy_claimed: false,
    real_lead_collection: false,
    real_crm_enabled: false,
    real_analytics_enabled: false,
    real_email_automation_enabled: false,
    contract_binding_claimed: false,
    simulated_only: true,
  }
}

export function calculateMeetingOpportunityScore(level: SenseTrustMeetingInterestLevel = 'high') { return { low: 35, moderate: 55, high: 76, strategic: 88 }[level] }
export function calculateMeetingReadinessScore(risk: SenseTrustMeetingRiskLevel = 'medium') { return { low: 86, medium: 74, high: 62, critical: 40 }[risk] }
export function classifyMeetingInterest(score: number): SenseTrustMeetingInterestLevel { return score >= 85 ? 'strategic' : score >= 70 ? 'high' : score >= 45 ? 'moderate' : 'low' }
export function classifyMeetingRisk(score: number): SenseTrustMeetingRiskLevel { return score >= 80 ? 'critical' : score >= 60 ? 'high' : score >= 35 ? 'medium' : 'low' }
export function summarizeMeetingInsights(state = createDefaultMeetingIntelligenceState()) { return state.insights.map((item) => item.summary) }
export function recommendNextSteps(state = createDefaultMeetingIntelligenceState()) { return state.next_steps.filter((item) => !item.blockers.includes('block')).slice(0, 5) }

export function validateMeetingRecords(state = createDefaultMeetingIntelligenceState()): SenseTrustMeetingIntelligenceValidationResult { return passIf(state.meeting_records.length === 8, 'meeting_records_invalid') }
export function validateMeetingFeedback(state = createDefaultMeetingIntelligenceState()) { return passIf(state.feedback_items.length >= 24 && state.feedback_items.every((item) => !item.real_collection_enabled), 'meeting_feedback_invalid') }
export function validateMeetingObjections(state = createDefaultMeetingIntelligenceState()) { return passIf(state.objections.length >= 24, 'meeting_objections_invalid') }
export function validateFollowUpGovernance(state = createDefaultMeetingIntelligenceState()) { return passIf(state.follow_up_governance.every((item) => !item.real_automation_enabled), 'real_follow_up_automation_enabled') }
export function validateNoDiagnosticTruthClaim(payload: unknown) { return flagCheck(payload, 'diagnostic_truth_certification_claimed":true', 'diagnostic_truth_certification_claimed_true') }
export function validateNoRealLeadCollection(payload: unknown) { return flagCheck(payload, 'real_lead_collection":true', 'real_lead_collection_true') }
export function validateNoRealCRM(payload: unknown) { return flagCheck(payload, 'real_crm_enabled":true', 'real_crm_enabled_true') }
export function validateNoRealAnalytics(payload: unknown) { return flagCheck(payload, 'real_analytics_enabled":true', 'real_analytics_enabled_true') }
export function validateNoRealEmailAutomation(payload: unknown) { return flagCheck(payload, 'real_email_automation_enabled":true', 'real_email_automation_enabled_true') }
export function validateNoProductionDeployClaim(payload: unknown) { return flagCheck(payload, 'production_deploy_claimed":true', 'production_deploy_claimed_true') }
export function validateNoRealBillingClaim(payload: unknown) { return flagCheck(payload, 'real_billing_claimed":true', 'real_billing_claimed_true') }
export function validateNoContractBindingClaim(payload: unknown) { return flagCheck(payload, 'contract_binding_claimed":true', 'contract_binding_claimed_true') }

export function validateNoClinicalDataExposure(payload: unknown): SenseTrustMeetingIntelligenceValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = MEETING_INTELLIGENCE_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term))
  return { valid: errors.length === 0, errors }
}

export function validateNoRealRevenueClaim(payload: unknown): SenseTrustMeetingIntelligenceValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = MEETING_INTELLIGENCE_REAL_CLAIM_DENYLIST.filter((term) => serialized.includes(term))
  if (serialized.includes('real_revenue_claimed":true')) errors.push('real_revenue_claimed_true')
  return { valid: errors.length === 0, errors }
}

export function buildMeetingIntelligenceExportPayload(): SenseTrustMeetingIntelligenceExportPayload {
  return { schema: 'sensetrust.meeting_intelligence_export.v1', exported_at: '2026-06-15T16:00:00.000Z', state: createDefaultMeetingIntelligenceState(), public_exposure: 'metadata_only', simulated_only: true }
}

export function validateMeetingIntelligenceExportPayload(payload = buildMeetingIntelligenceExportPayload()) {
  const checks = [validateMeetingRecords(payload.state), validateMeetingFeedback(payload.state), validateMeetingObjections(payload.state), validateFollowUpGovernance(payload.state), validateNoDiagnosticTruthClaim(payload.state), validateNoRealLeadCollection(payload.state), validateNoRealCRM(payload.state), validateNoRealAnalytics(payload.state), validateNoRealEmailAutomation(payload.state), validateNoProductionDeployClaim(payload.state), validateNoClinicalDataExposure(payload.state), validateNoRealRevenueClaim(payload.state), validateNoRealBillingClaim(payload.state), validateNoContractBindingClaim(payload.state)]
  const errors = checks.flatMap((check) => check.errors)
  return { valid: errors.length === 0, errors }
}

export function assertMeetingIntelligenceNoSensitiveExposure(payload: unknown) { return assertValid(validateNoClinicalDataExposure(payload), 'meeting_sensitive_exposure') }
export function assertMeetingIntelligenceNoRealLeadCollection(payload: unknown) { return assertValid(validateNoRealLeadCollection(payload), 'meeting_real_lead_collection') }
export function assertMeetingIntelligenceNoRealCRM(payload: unknown) { return assertValid(validateNoRealCRM(payload), 'meeting_real_crm') }
export function assertMeetingIntelligenceNoRealAnalytics(payload: unknown) { return assertValid(validateNoRealAnalytics(payload), 'meeting_real_analytics') }
export function assertMeetingIntelligenceNoRealEmailAutomation(payload: unknown) { return assertValid(validateNoRealEmailAutomation(payload), 'meeting_real_email_automation') }
export function assertMeetingIntelligenceNoProductionDeploy(payload: unknown) { return assertValid(validateNoProductionDeployClaim(payload), 'meeting_production_deploy') }
export function assertMeetingIntelligenceNoDiagnosticTruthCertification(payload: unknown) { return assertValid(validateNoDiagnosticTruthClaim(payload), 'meeting_diagnostic_truth') }
export function linkMeetingIntelligenceToPartnerDemoKit() { return { link: 'SenseTrust Partner Demo Kit v2.2', public_exposure: 'metadata_only' as const } }
export function linkMeetingIntelligenceToDemoReadiness() { return { link: 'SenseTrust Demo Readiness v2.1', public_exposure: 'metadata_only' as const } }
export function linkMeetingIntelligenceToPrototypeUX() { return { link: 'SenseTrust Prototype UX v2.0', public_exposure: 'metadata_only' as const } }
export function linkMeetingIntelligenceToMOC() { return { link: 'MOC_SenseTrust', public_exposure: 'metadata_only' as const } }

function passIf(condition: boolean, error: string): SenseTrustMeetingIntelligenceValidationResult { return { valid: condition, errors: condition ? [] : [error] } }
function flagCheck(payload: unknown, flag: string, error: string): SenseTrustMeetingIntelligenceValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); return { valid: !serialized.includes(flag), errors: serialized.includes(flag) ? [error] : [] } }
function assertValid(result: SenseTrustMeetingIntelligenceValidationResult, prefix: string) { if (!result.valid) throw new Error(`${prefix}:${result.errors.join(',')}`); return true }
function cloneMeetingRecord(record: (typeof SIMULATED_MEETING_RECORDS)[number]) {
  return { ...record, demo_materials_used: [...record.demo_materials_used], feedback_items: record.feedback_items.map((item) => ({ ...item })), objections: record.objections.map((item) => ({ ...item })), interest_signals: record.interest_signals.map((item) => ({ ...item })), risk_signals: record.risk_signals.map((item) => ({ ...item })), next_steps: record.next_steps.map((item) => ({ ...item, blockers: [...item.blockers] })), opportunity_score: { ...record.opportunity_score }, follow_up_governance: { ...record.follow_up_governance, allowed_materials: [...record.follow_up_governance.allowed_materials], prohibited_materials: [...record.follow_up_governance.prohibited_materials] } }
}
