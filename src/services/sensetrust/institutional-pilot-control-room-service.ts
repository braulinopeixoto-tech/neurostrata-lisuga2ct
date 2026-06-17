import {
  INSTITUTIONAL_PILOT_REAL_CLAIM_DENYLIST,
  INSTITUTIONAL_PILOT_SENSITIVE_DENYLIST,
  SIMULATED_INSTITUTIONAL_PILOT_CONTROL_ROOM_STATE,
  SIMULATED_INSTITUTIONAL_PILOT_EXPORT_PAYLOAD,
  SIMULATED_INSTITUTIONAL_PILOT_REFERENCES,
  SIMULATED_INSTITUTIONAL_PILOTS,
  SIMULATED_PILOT_ACCEPTANCE_CRITERIA,
  SIMULATED_PILOT_CHECKPOINTS,
  SIMULATED_PILOT_DECISION_LOGS,
  SIMULATED_PILOT_EVIDENCE_ITEMS,
  SIMULATED_PILOT_EXECUTION_RISKS,
  SIMULATED_PILOT_EXECUTIVE_REPORTS,
  SIMULATED_PILOT_GOVERNANCE_BOARDS,
  SIMULATED_PILOT_INTERRUPTION_RULES,
  SIMULATED_PILOT_RACI_ROLES,
  SIMULATED_PILOT_SCOPES,
  SIMULATED_PILOT_STATUS_BOARDS,
  SIMULATED_SUPERVISED_ACCEPTANCE_RECORDS,
} from '@/fixtures/sensetrust/simulated-institutional-pilot-control-room'
import type {
  SenseTrustInstitutionalPilotControlRoomState,
  SenseTrustInstitutionalPilotExportPayload,
  SenseTrustInstitutionalPilotValidationResult,
  SenseTrustPilotDecisionType,
  SenseTrustPilotRiskLevel,
  SenseTrustPilotStatus,
} from '@/types/sensetrust/institutional-pilot-control-room'

export function createInstitutionalPilotControlRoomState() { return createDefaultInstitutionalPilotControlRoomState() }
export function createInstitutionalPilot() { return { ...SIMULATED_INSTITUTIONAL_PILOTS[0] } }
export function createPilotScope() { return cloneArrayFields(SIMULATED_PILOT_SCOPES[0], ['in_scope', 'out_of_scope', 'allowed_materials', 'blocked_materials', 'allowed_data', 'prohibited_data']) }
export function createPilotRaciRole() { return cloneArrayFields(SIMULATED_PILOT_RACI_ROLES[0], ['consulted', 'informed']) }
export function createPilotGovernanceBoard() { return { ...SIMULATED_PILOT_GOVERNANCE_BOARDS[0] } }
export function createPilotCheckpoint() { return cloneArrayFields(SIMULATED_PILOT_CHECKPOINTS[0], ['criteria', 'blockers', 'evidence_required']) }
export function createPilotAcceptanceCriterion() { return { ...SIMULATED_PILOT_ACCEPTANCE_CRITERIA[0] } }
export function createSupervisedAcceptanceRecord() { return { ...SIMULATED_SUPERVISED_ACCEPTANCE_RECORDS[0] } }
export function createPilotExecutionRisk() { return { ...SIMULATED_PILOT_EXECUTION_RISKS[0] } }
export function createPilotEvidenceItem() { return { ...SIMULATED_PILOT_EVIDENCE_ITEMS[0] } }
export function createPilotInterruptionRule() { return { ...SIMULATED_PILOT_INTERRUPTION_RULES[0] } }
export function createPilotStatusBoard() { return { ...SIMULATED_PILOT_STATUS_BOARDS[0] } }
export function createPilotDecisionLog() { return { ...SIMULATED_PILOT_DECISION_LOGS[0] } }
export function createPilotExecutiveReport() { return cloneArrayFields(SIMULATED_PILOT_EXECUTIVE_REPORTS[0], ['pending_items']) }

export function createDefaultInstitutionalPilots() { return SIMULATED_INSTITUTIONAL_PILOTS.map((item) => ({ ...item })) }
export function createDefaultPilotScopes() { return SIMULATED_PILOT_SCOPES.map((item) => cloneArrayFields(item, ['in_scope', 'out_of_scope', 'allowed_materials', 'blocked_materials', 'allowed_data', 'prohibited_data'])) }
export function createDefaultPilotRaciRoles() { return SIMULATED_PILOT_RACI_ROLES.map((item) => cloneArrayFields(item, ['consulted', 'informed'])) }
export function createDefaultPilotGovernanceBoards() { return SIMULATED_PILOT_GOVERNANCE_BOARDS.map((item) => ({ ...item })) }
export function createDefaultPilotCheckpoints() { return SIMULATED_PILOT_CHECKPOINTS.map((item) => cloneArrayFields(item, ['criteria', 'blockers', 'evidence_required'])) }
export function createDefaultPilotAcceptanceCriteria() { return SIMULATED_PILOT_ACCEPTANCE_CRITERIA.map((item) => ({ ...item })) }
export function createDefaultSupervisedAcceptanceRecords() { return SIMULATED_SUPERVISED_ACCEPTANCE_RECORDS.map((item) => ({ ...item })) }
export function createDefaultPilotExecutionRisks() { return SIMULATED_PILOT_EXECUTION_RISKS.map((item) => ({ ...item })) }
export function createDefaultPilotEvidenceItems() { return SIMULATED_PILOT_EVIDENCE_ITEMS.map((item) => ({ ...item })) }
export function createDefaultPilotInterruptionRules() { return SIMULATED_PILOT_INTERRUPTION_RULES.map((item) => ({ ...item })) }
export function createDefaultPilotStatusBoards() { return SIMULATED_PILOT_STATUS_BOARDS.map((item) => ({ ...item })) }
export function createDefaultPilotDecisionLogs() { return SIMULATED_PILOT_DECISION_LOGS.map((item) => ({ ...item })) }
export function createDefaultPilotExecutiveReports() { return SIMULATED_PILOT_EXECUTIVE_REPORTS.map((item) => cloneArrayFields(item, ['pending_items'])) }

export function createDefaultInstitutionalPilotControlRoomState(): SenseTrustInstitutionalPilotControlRoomState {
  return {
    ...SIMULATED_INSTITUTIONAL_PILOT_CONTROL_ROOM_STATE,
    pilots: createDefaultInstitutionalPilots(),
    scopes: createDefaultPilotScopes(),
    raci_roles: createDefaultPilotRaciRoles(),
    governance_boards: createDefaultPilotGovernanceBoards(),
    checkpoints: createDefaultPilotCheckpoints(),
    acceptance_criteria: createDefaultPilotAcceptanceCriteria(),
    supervised_acceptance_records: createDefaultSupervisedAcceptanceRecords(),
    execution_risks: createDefaultPilotExecutionRisks(),
    evidence_items: createDefaultPilotEvidenceItems(),
    interruption_rules: createDefaultPilotInterruptionRules(),
    status_boards: createDefaultPilotStatusBoards(),
    decision_logs: createDefaultPilotDecisionLogs(),
    executive_reports: createDefaultPilotExecutiveReports(),
    references: [...SIMULATED_INSTITUTIONAL_PILOT_REFERENCES],
  }
}

export function calculatePilotReadinessScore(readiness = 60, governance = 70, evidence = 50) { return Math.round((readiness + governance + evidence) / 3) }
export function calculateAcceptanceProgress(total = 4, passed = 1) { return total === 0 ? 0 : Math.round((passed / total) * 100) }
export function calculateExecutionRiskScore(level: SenseTrustPilotRiskLevel = 'medium') { return ({ low: 20, medium: 45, high: 70, critical: 95 })[level] }
export function classifyPilotStatus(readiness = 50, risk = 50): SenseTrustPilotStatus { if (risk >= 90) return 'blocked'; if (risk >= 70) return 'paused'; if (readiness >= 80) return 'ready_for_supervised_demo'; if (readiness >= 60) return 'governance_review'; return 'scope_defined' }
export function classifyPilotRisk(score = 45): SenseTrustPilotRiskLevel { if (score >= 85) return 'critical'; if (score >= 65) return 'high'; if (score >= 35) return 'medium'; return 'low' }
export function recommendPilotDecision(status: SenseTrustPilotStatus = 'governance_review', risk: SenseTrustPilotRiskLevel = 'medium'): SenseTrustPilotDecisionType { if (risk === 'critical' || status === 'blocked') return 'block'; if (risk === 'high') return 'require_human_review'; if (status === 'acceptance_review') return 'complete_simulated'; return 'continue' }
export function buildPilotStatusBoard() { return createPilotStatusBoard() }
export function buildSupervisedAcceptanceSummary() { return { records: createDefaultSupervisedAcceptanceRecords(), summary: 'Aceite supervisionado metadata_only, sem contrato ou operacao real.' } }
export function buildPilotDecisionLog() { return createDefaultPilotDecisionLogs() }

export function validateInstitutionalPilots(state = createDefaultInstitutionalPilotControlRoomState()) { return countCheck(state.pilots.length, 8, 'institutional_pilots') }
export function validatePilotScopes(state = createDefaultInstitutionalPilotControlRoomState()) { return countCheck(state.scopes.length, 8, 'pilot_scopes') }
export function validatePilotRaciRoles(state = createDefaultInstitutionalPilotControlRoomState()) { return countCheck(state.raci_roles.length, 24, 'raci_roles') }
export function validatePilotCheckpoints(state = createDefaultInstitutionalPilotControlRoomState()) { return countCheck(state.checkpoints.length, 32, 'checkpoints') }
export function validateAcceptanceCriteria(state = createDefaultInstitutionalPilotControlRoomState()) { return countCheck(state.acceptance_criteria.length, 32, 'acceptance_criteria') }
export function validateSupervisedAcceptanceRecords(state = createDefaultInstitutionalPilotControlRoomState()) { return countCheck(state.supervised_acceptance_records.length, 16, 'supervised_acceptance_records') }
export function validateExecutionRisks(state = createDefaultInstitutionalPilotControlRoomState()) { return countCheck(state.execution_risks.length, 24, 'execution_risks') }
export function validateEvidenceItems(state = createDefaultInstitutionalPilotControlRoomState()) { return countCheck(state.evidence_items.length, 24, 'evidence_items') }
export function validateInterruptionRules(state = createDefaultInstitutionalPilotControlRoomState()) { return countCheck(state.interruption_rules.length, 16, 'interruption_rules') }
export function validateNoDiagnosticTruthClaim(payload: unknown) { return flagCheck(payload, ['diagnostic_truth_certification_claim":true', 'diagnostic_truth_certification_claimed":true'], 'diagnostic_truth_certification_true') }
export function validateNoRealPatientData(payload: unknown) { return flagCheck(payload, ['real_patient_data_used":true'], 'real_patient_data_used_true') }
export function validateNoRealClinicalOperation(payload: unknown) { return flagCheck(payload, ['real_clinical_operation_enabled":true'], 'real_clinical_operation_true') }
export function validateNoRealLeadCollection(payload: unknown) { return flagCheck(payload, ['real_lead_collection":true'], 'real_lead_collection_true') }
export function validateNoRealCRM(payload: unknown) { return flagCheck(payload, ['real_crm_enabled":true'], 'real_crm_true') }
export function validateNoRealAnalytics(payload: unknown) { return flagCheck(payload, ['real_analytics_enabled":true'], 'real_analytics_true') }
export function validateNoRealEmailAutomation(payload: unknown) { return flagCheck(payload, ['real_email_automation_enabled":true'], 'real_email_automation_true') }
export function validateNoProductionDeployClaim(payload: unknown) { return flagCheck(payload, ['production_deploy_claimed":true'], 'production_deploy_claimed_true') }
export function validateNoRealRevenueClaim(payload: unknown) { return denylistCheck(payload, INSTITUTIONAL_PILOT_REAL_CLAIM_DENYLIST, ['real_revenue_claimed":true']) }
export function validateNoRealBillingClaim(payload: unknown) { return flagCheck(payload, ['real_billing_claimed":true', 'real_billing_enabled":true'], 'real_billing_true') }
export function validateNoContractBindingClaim(payload: unknown) { return flagCheck(payload, ['contract_binding_claimed":true', 'real_contract_enabled":true'], 'contract_binding_true') }
export function validateNoClientClaim(payload: unknown) { return flagCheck(payload, ['client_claim":true'], 'client_claim_true') }
export function validateNoPartnershipClaim(payload: unknown) { return flagCheck(payload, ['partnership_claim":true'], 'partnership_claim_true') }
export function validateNoClinicalDataExposure(payload: unknown) { return denylistCheck(payload, INSTITUTIONAL_PILOT_SENSITIVE_DENYLIST) }

export function buildInstitutionalPilotExportPayload(): SenseTrustInstitutionalPilotExportPayload {
  return { ...SIMULATED_INSTITUTIONAL_PILOT_EXPORT_PAYLOAD, state: createDefaultInstitutionalPilotControlRoomState() }
}

export function validateInstitutionalPilotExportPayload(payload = buildInstitutionalPilotExportPayload()): SenseTrustInstitutionalPilotValidationResult {
  const checks = [
    validateInstitutionalPilots(payload.state),
    validatePilotScopes(payload.state),
    validatePilotRaciRoles(payload.state),
    validatePilotCheckpoints(payload.state),
    validateAcceptanceCriteria(payload.state),
    validateSupervisedAcceptanceRecords(payload.state),
    validateExecutionRisks(payload.state),
    validateEvidenceItems(payload.state),
    validateInterruptionRules(payload.state),
    validateNoDiagnosticTruthClaim(payload.state),
    validateNoRealPatientData(payload.state),
    validateNoRealClinicalOperation(payload.state),
    validateNoRealLeadCollection(payload.state),
    validateNoRealCRM(payload.state),
    validateNoRealAnalytics(payload.state),
    validateNoRealEmailAutomation(payload.state),
    validateNoProductionDeployClaim(payload.state),
    validateNoClinicalDataExposure(payload.state),
    validateNoRealRevenueClaim(payload.state),
    validateNoRealBillingClaim(payload.state),
    validateNoContractBindingClaim(payload.state),
    validateNoClientClaim(payload.state),
    validateNoPartnershipClaim(payload.state),
  ]
  const errors = checks.flatMap((check) => check.errors)
  return { valid: errors.length === 0, errors }
}

export function assertInstitutionalPilotNoSensitiveExposure(payload: unknown) { return assertValid(validateNoClinicalDataExposure(payload), 'institutional_pilot_sensitive_exposure') }
export function assertInstitutionalPilotNoRealClinicalOperation(payload: unknown) { return assertValid(validateNoRealClinicalOperation(payload), 'institutional_pilot_real_operation') }
export function assertInstitutionalPilotNoRealCRM(payload: unknown) { return assertValid(validateNoRealCRM(payload), 'institutional_pilot_real_crm') }
export function assertInstitutionalPilotNoRealAnalytics(payload: unknown) { return assertValid(validateNoRealAnalytics(payload), 'institutional_pilot_real_analytics') }
export function assertInstitutionalPilotNoRealEmailAutomation(payload: unknown) { return assertValid(validateNoRealEmailAutomation(payload), 'institutional_pilot_real_email') }
export function assertInstitutionalPilotNoProductionDeploy(payload: unknown) { return assertValid(validateNoProductionDeployClaim(payload), 'institutional_pilot_production_deploy') }
export function assertInstitutionalPilotNoDiagnosticTruthCertification(payload: unknown) { return assertValid(validateNoDiagnosticTruthClaim(payload), 'institutional_pilot_diagnostic_truth') }
export function linkInstitutionalPilotToPipelineGovernance() { return 'SenseTrust Pipeline Governance v2.4' }
export function linkInstitutionalPilotToMeetingIntelligence() { return 'SenseTrust Meeting Intelligence v2.3' }
export function linkInstitutionalPilotToPartnerDemoKit() { return 'SenseTrust Partner Demo Kit v2.2' }
export function linkInstitutionalPilotToMOC() { return ['MOC_SenseTrust', 'MOC_VitalStrata_SenseTrust', 'MOC_NeuroStrata_Trust_Layer', 'MOC_DNDA_Trust_Object', 'MOC_BLC_Rastreabilidade'] }

function cloneArrayFields<T extends Record<string, unknown>>(item: T, keys: string[]): T {
  const copy = { ...item }
  keys.forEach((key) => {
    const value = item[key]
    if (Array.isArray(value)) copy[key as keyof T] = [...value] as T[keyof T]
  })
  return copy
}

function countCheck(actual: number, expected: number, label: string): SenseTrustInstitutionalPilotValidationResult {
  return { valid: actual >= expected, errors: actual >= expected ? [] : [`${label}_count_below_${expected}`] }
}

function denylistCheck(payload: unknown, denylist: string[], flags: string[] = []): SenseTrustInstitutionalPilotValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = [...denylist.filter((term) => serialized.includes(term.toLowerCase())), ...flags.filter((flag) => serialized.includes(flag.toLowerCase()))]
  return { valid: errors.length === 0, errors }
}

function flagCheck(payload: unknown, flags: string[], error: string): SenseTrustInstitutionalPilotValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  return { valid: !flags.some((flag) => serialized.includes(flag.toLowerCase())), errors: flags.some((flag) => serialized.includes(flag.toLowerCase())) ? [error] : [] }
}

function assertValid(result: SenseTrustInstitutionalPilotValidationResult, label: string) {
  if (!result.valid) throw new Error(`${label}: ${result.errors.join(', ')}`)
  return result
}
