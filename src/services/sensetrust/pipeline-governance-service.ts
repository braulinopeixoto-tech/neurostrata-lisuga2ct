import {
  PIPELINE_GOVERNANCE_REAL_CLAIM_DENYLIST,
  PIPELINE_GOVERNANCE_SENSITIVE_DENYLIST,
  SIMULATED_DECISION_AUDIT_TRAIL,
  SIMULATED_DECISION_BOARD,
  SIMULATED_GO_NO_GO_DECISIONS,
  SIMULATED_HUMAN_REVIEW_QUEUE,
  SIMULATED_NEXT_MOVES,
  SIMULATED_PIPELINE_DECISIONS,
  SIMULATED_PIPELINE_OPPORTUNITIES,
  SIMULATED_PIPELINE_REFERENCES,
  SIMULATED_PIPELINE_RISK_SCORES,
  SIMULATED_PIPELINE_RISK_SIGNALS,
  SIMULATED_PIPELINE_STAGES,
  SIMULATED_PRIORITY_SCORES,
  SIMULATED_READINESS_SCORES,
  SIMULATED_RELATIONSHIP_GOVERNANCE_BOARD,
  SIMULATED_STAGE_GATES,
} from '@/fixtures/sensetrust/simulated-pipeline-governance'
import type {
  SenseTrustGoNoGoDecisionType,
  SenseTrustOpportunityPriorityLevel,
  SenseTrustPipelineGovernanceExportPayload,
  SenseTrustPipelineGovernanceState,
  SenseTrustPipelineGovernanceValidationResult,
  SenseTrustPipelineRiskLevel,
} from '@/types/sensetrust/pipeline-governance'

export function createPipelineGovernanceState(): SenseTrustPipelineGovernanceState { return createDefaultPipelineGovernanceState() }
export function createPipelineOpportunity() { return { ...SIMULATED_PIPELINE_OPPORTUNITIES[0] } }
export function createPipelineStage() { return { ...SIMULATED_PIPELINE_STAGES[0], entry_criteria: [...SIMULATED_PIPELINE_STAGES[0].entry_criteria], exit_criteria: [...SIMULATED_PIPELINE_STAGES[0].exit_criteria], blockers: [...SIMULATED_PIPELINE_STAGES[0].blockers] } }
export function createPipelineDecisionBoard() { return createDefaultDecisionBoard() }
export function createPipelineDecision() { return { ...SIMULATED_PIPELINE_DECISIONS[0] } }
export function createGoNoGoDecision() { return { ...SIMULATED_GO_NO_GO_DECISIONS[0], required_review: [...SIMULATED_GO_NO_GO_DECISIONS[0].required_review], blocked_actions: [...SIMULATED_GO_NO_GO_DECISIONS[0].blocked_actions] } }
export function createOpportunityPriorityScore() { return { ...SIMULATED_PRIORITY_SCORES[0] } }
export function createInstitutionalReadinessScore() { return { ...SIMULATED_READINESS_SCORES[0] } }
export function createPipelineRiskScore() { return { ...SIMULATED_PIPELINE_RISK_SCORES[0] } }
export function createPipelineRiskSignal() { return { ...SIMULATED_PIPELINE_RISK_SIGNALS[0] } }
export function createHumanReviewQueueItem() { return { ...SIMULATED_HUMAN_REVIEW_QUEUE[0] } }
export function createNextMoveRecommendation() { return { ...SIMULATED_NEXT_MOVES[0] } }
export function createPipelineStageGate() { return { ...SIMULATED_STAGE_GATES[0], entry_criteria: [...SIMULATED_STAGE_GATES[0].entry_criteria], exit_criteria: [...SIMULATED_STAGE_GATES[0].exit_criteria], blockers: [...SIMULATED_STAGE_GATES[0].blockers] } }
export function createDecisionAuditTrailItem() { return { ...SIMULATED_DECISION_AUDIT_TRAIL[0] } }
export function createRelationshipGovernanceBoard() { return { ...SIMULATED_RELATIONSHIP_GOVERNANCE_BOARD, usage_limits: [...SIMULATED_RELATIONSHIP_GOVERNANCE_BOARD.usage_limits] } }
export function createDefaultPipelineOpportunities() { return SIMULATED_PIPELINE_OPPORTUNITIES.map((item) => ({ ...item })) }
export function createDefaultPipelineStages() { return SIMULATED_PIPELINE_STAGES.map((item) => ({ ...item, entry_criteria: [...item.entry_criteria], exit_criteria: [...item.exit_criteria], blockers: [...item.blockers] })) }
export function createDefaultDecisionBoard() { return { ...SIMULATED_DECISION_BOARD, opportunities: createDefaultPipelineOpportunities(), decisions: createDefaultGoNoGoDecisions(), human_review_queue: createDefaultHumanReviewQueue(), relationship_governance: createRelationshipGovernanceBoard() } }
export function createDefaultGoNoGoDecisions() { return SIMULATED_GO_NO_GO_DECISIONS.map((item) => ({ ...item, required_review: [...item.required_review], blocked_actions: [...item.blocked_actions] })) }
export function createDefaultOpportunityPriorityScores() { return SIMULATED_PRIORITY_SCORES.map((item) => ({ ...item })) }
export function createDefaultInstitutionalReadinessScores() { return SIMULATED_READINESS_SCORES.map((item) => ({ ...item })) }
export function createDefaultPipelineRiskScores() { return SIMULATED_PIPELINE_RISK_SCORES.map((item) => ({ ...item })) }
export function createDefaultHumanReviewQueue() { return SIMULATED_HUMAN_REVIEW_QUEUE.map((item) => ({ ...item })) }
export function createDefaultNextMoveRecommendations() { return SIMULATED_NEXT_MOVES.map((item) => ({ ...item })) }
export function createDefaultStageGates() { return SIMULATED_STAGE_GATES.map((item) => ({ ...item, entry_criteria: [...item.entry_criteria], exit_criteria: [...item.exit_criteria], blockers: [...item.blockers] })) }
export function createDefaultDecisionAuditTrail() { return SIMULATED_DECISION_AUDIT_TRAIL.map((item) => ({ ...item })) }
export function createDefaultRelationshipGovernanceBoard() { return createRelationshipGovernanceBoard() }

export function createDefaultPipelineGovernanceState(): SenseTrustPipelineGovernanceState {
  return {
    state_id: 'PIPELINE-GOVERNANCE-SIM-V24',
    version: 'v2.4',
    opportunities: createDefaultPipelineOpportunities(),
    stages: createDefaultPipelineStages(),
    decision_board: createDefaultDecisionBoard(),
    decisions: SIMULATED_PIPELINE_DECISIONS.map((item) => ({ ...item })),
    go_no_go_decisions: createDefaultGoNoGoDecisions(),
    priority_scores: createDefaultOpportunityPriorityScores(),
    readiness_scores: createDefaultInstitutionalReadinessScores(),
    risk_scores: createDefaultPipelineRiskScores(),
    risk_signals: SIMULATED_PIPELINE_RISK_SIGNALS.map((item) => ({ ...item })),
    human_review_queue: createDefaultHumanReviewQueue(),
    next_move_recommendations: createDefaultNextMoveRecommendations(),
    stage_gates: createDefaultStageGates(),
    decision_audit_trail: createDefaultDecisionAuditTrail(),
    relationship_governance_board: createRelationshipGovernanceBoard(),
    references: [...SIMULATED_PIPELINE_REFERENCES],
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
    real_client_claimed: false,
    simulated_only: true,
  }
}

export function calculateOpportunityPriorityScore(interest = 70, readiness = 70, risk = 30) { return Math.max(0, Math.min(100, Math.round((interest + readiness - risk) / 2))) }
export function calculateInstitutionalReadinessScore(institutional = 70, technical = 70, legal = 60, governance = 70) { return Math.round((institutional + technical + legal + governance) / 4) }
export function calculatePipelineRiskScore(risk = 45) { return Math.max(0, Math.min(100, risk)) }
export function classifyOpportunityPriority(score: number): SenseTrustOpportunityPriorityLevel { return score >= 82 ? 'strategic' : score >= 65 ? 'high' : score >= 45 ? 'moderate' : 'low' }
export function classifyPipelineRisk(score: number): SenseTrustPipelineRiskLevel { return score >= 80 ? 'critical' : score >= 60 ? 'high' : score >= 35 ? 'medium' : 'low' }
export function recommendGoNoGoDecision(priority: SenseTrustOpportunityPriorityLevel, risk: SenseTrustPipelineRiskLevel): SenseTrustGoNoGoDecisionType { return risk === 'critical' ? 'blocked' : risk === 'high' ? 'human_review_required' : priority === 'strategic' ? 'go' : 'defer' }
export function recommendNextMove(decision: SenseTrustGoNoGoDecisionType) { return decision === 'go' ? 'send_authorized_material' : decision === 'blocked' ? 'block_follow_up' : 'human_review' }
export function buildHumanReviewQueue() { return createDefaultHumanReviewQueue() }
export function buildDecisionAuditTrail() { return createDefaultDecisionAuditTrail() }

export function validatePipelineOpportunities(state = createDefaultPipelineGovernanceState()) { return passIf(state.opportunities.length >= 12, 'pipeline_opportunities_invalid') }
export function validateDecisionBoard(state = createDefaultPipelineGovernanceState()) { return passIf(state.decision_board.opportunities.length >= 12, 'decision_board_invalid') }
export function validateGoNoGoDecisions(state = createDefaultPipelineGovernanceState()) { return passIf(state.go_no_go_decisions.length >= 12, 'go_no_go_decisions_invalid') }
export function validateHumanReviewQueue(state = createDefaultPipelineGovernanceState()) { return passIf(state.human_review_queue.length >= 12, 'human_review_queue_invalid') }
export function validateRelationshipGovernanceBoard(state = createDefaultPipelineGovernanceState()) { return passIf(state.relationship_governance_board.human_review_required, 'relationship_governance_invalid') }
export function validateNoDiagnosticTruthClaim(payload: unknown) { return flagCheck(payload, 'diagnostic_truth_certification_claimed":true', 'diagnostic_truth_certification_claimed_true') }
export function validateNoRealLeadCollection(payload: unknown) { return flagCheck(payload, 'real_lead_collection":true', 'real_lead_collection_true') }
export function validateNoRealCRM(payload: unknown) { return flagCheck(payload, 'real_crm_enabled":true', 'real_crm_enabled_true') }
export function validateNoRealAnalytics(payload: unknown) { return flagCheck(payload, 'real_analytics_enabled":true', 'real_analytics_enabled_true') }
export function validateNoRealEmailAutomation(payload: unknown) { return flagCheck(payload, 'real_email_automation_enabled":true', 'real_email_automation_enabled_true') }
export function validateNoProductionDeployClaim(payload: unknown) { return flagCheck(payload, 'production_deploy_claimed":true', 'production_deploy_claimed_true') }
export function validateNoRealBillingClaim(payload: unknown) { return flagCheck(payload, 'real_billing_claimed":true', 'real_billing_claimed_true') }
export function validateNoContractBindingClaim(payload: unknown) { return flagCheck(payload, 'contract_binding_claimed":true', 'contract_binding_claimed_true') }
export function validateNoRealClientClaim(payload: unknown) { return flagCheck(payload, 'real_client_claimed":true', 'real_client_claimed_true') }
export function validateNoClinicalDataExposure(payload: unknown): SenseTrustPipelineGovernanceValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); const errors = PIPELINE_GOVERNANCE_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term)); return { valid: errors.length === 0, errors } }
export function validateNoRealRevenueClaim(payload: unknown): SenseTrustPipelineGovernanceValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); const errors = PIPELINE_GOVERNANCE_REAL_CLAIM_DENYLIST.filter((term) => serialized.includes(term)); if (serialized.includes('real_revenue_claimed":true')) errors.push('real_revenue_claimed_true'); return { valid: errors.length === 0, errors } }

export function buildPipelineGovernanceExportPayload(): SenseTrustPipelineGovernanceExportPayload { return { schema: 'sensetrust.pipeline_governance_export.v1', exported_at: '2026-06-17T12:00:00.000Z', state: createDefaultPipelineGovernanceState(), public_exposure: 'metadata_only', simulated_only: true } }
export function validatePipelineGovernanceExportPayload(payload = buildPipelineGovernanceExportPayload()) { const checks = [validatePipelineOpportunities(payload.state), validateDecisionBoard(payload.state), validateGoNoGoDecisions(payload.state), validateHumanReviewQueue(payload.state), validateRelationshipGovernanceBoard(payload.state), validateNoDiagnosticTruthClaim(payload.state), validateNoRealLeadCollection(payload.state), validateNoRealCRM(payload.state), validateNoRealAnalytics(payload.state), validateNoRealEmailAutomation(payload.state), validateNoProductionDeployClaim(payload.state), validateNoClinicalDataExposure(payload.state), validateNoRealRevenueClaim(payload.state), validateNoRealBillingClaim(payload.state), validateNoContractBindingClaim(payload.state), validateNoRealClientClaim(payload.state)]; const errors = checks.flatMap((check) => check.errors); return { valid: errors.length === 0, errors } }
export function assertPipelineGovernanceNoSensitiveExposure(payload: unknown) { return assertValid(validateNoClinicalDataExposure(payload), 'pipeline_sensitive_exposure') }
export function assertPipelineGovernanceNoRealCRM(payload: unknown) { return assertValid(validateNoRealCRM(payload), 'pipeline_real_crm') }
export function assertPipelineGovernanceNoRealAnalytics(payload: unknown) { return assertValid(validateNoRealAnalytics(payload), 'pipeline_real_analytics') }
export function assertPipelineGovernanceNoRealEmailAutomation(payload: unknown) { return assertValid(validateNoRealEmailAutomation(payload), 'pipeline_real_email_automation') }
export function assertPipelineGovernanceNoProductionDeploy(payload: unknown) { return assertValid(validateNoProductionDeployClaim(payload), 'pipeline_production_deploy') }
export function assertPipelineGovernanceNoDiagnosticTruthCertification(payload: unknown) { return assertValid(validateNoDiagnosticTruthClaim(payload), 'pipeline_diagnostic_truth') }
export function linkPipelineGovernanceToMeetingIntelligence() { return { link: 'SenseTrust Meeting Intelligence v2.3', public_exposure: 'metadata_only' as const } }
export function linkPipelineGovernanceToPartnerDemoKit() { return { link: 'SenseTrust Partner Demo Kit v2.2', public_exposure: 'metadata_only' as const } }
export function linkPipelineGovernanceToDemoReadiness() { return { link: 'SenseTrust Demo Readiness v2.1', public_exposure: 'metadata_only' as const } }
export function linkPipelineGovernanceToMOC() { return { link: 'MOC_SenseTrust', public_exposure: 'metadata_only' as const } }

function passIf(condition: boolean, error: string): SenseTrustPipelineGovernanceValidationResult { return { valid: condition, errors: condition ? [] : [error] } }
function flagCheck(payload: unknown, flag: string, error: string): SenseTrustPipelineGovernanceValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); return { valid: !serialized.includes(flag), errors: serialized.includes(flag) ? [error] : [] } }
function assertValid(result: SenseTrustPipelineGovernanceValidationResult, prefix: string) { if (!result.valid) throw new Error(`${prefix}:${result.errors.join(',')}`); return true }
