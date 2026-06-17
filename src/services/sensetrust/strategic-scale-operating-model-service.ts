import {
  OPERATING_MODEL_REAL_CLAIM_DENYLIST,
  OPERATING_MODEL_REFERENCES,
  OPERATING_MODEL_SENSITIVE_DENYLIST,
  SIMULATED_CADENCE_ITEMS,
  SIMULATED_CONTROL_BOARDS,
  SIMULATED_DECISION_LOGS,
  SIMULATED_DECISION_LOG_ITEMS,
  SIMULATED_ENTRY_CRITERIA,
  SIMULATED_ENTRY_EXIT_MATRICES,
  SIMULATED_EXECUTION_ITEMS,
  SIMULATED_EXECUTION_PLANS,
  SIMULATED_EXIT_CRITERIA,
  SIMULATED_EXECUTIVE_REPORTS,
  SIMULATED_GOVERNANCE_CALENDARS,
  SIMULATED_GOVERNANCE_CALENDAR_ITEMS,
  SIMULATED_HUMAN_REVIEW_ITEMS,
  SIMULATED_HUMAN_REVIEW_PATHS,
  SIMULATED_MISUSE_BLOCKERS,
  SIMULATED_OPERATING_CADENCES,
  SIMULATED_OPERATING_MODELS,
  SIMULATED_RACI_MATRICES,
  SIMULATED_RACI_ROLES,
  SIMULATED_READINESS_SCORECARDS,
  SIMULATED_RISK_ITEMS,
  SIMULATED_RISK_REGISTERS,
  SIMULATED_STRATEGIC_SCALE_OPERATING_EXPORT_PAYLOAD,
  SIMULATED_STRATEGIC_SCALE_OPERATING_MODEL_STATE,
} from '@/fixtures/sensetrust/simulated-strategic-scale-operating-model'
import type { SenseTrustOperatingCadenceType, SenseTrustOperatingModelStatusType, SenseTrustScaleOperatingDecisionType, SenseTrustScaleOperatingRiskLevel, SenseTrustStrategicScaleOperatingExportPayload, SenseTrustStrategicScaleOperatingModelState, SenseTrustStrategicScaleOperatingValidationResult } from '@/types/sensetrust/strategic-scale-operating-model'

export function createStrategicScaleOperatingModelState() { return createDefaultStrategicScaleOperatingModelState() }
export function createStrategicScaleOperatingModel() { return cloneArrayFields(SIMULATED_OPERATING_MODELS[0], ['blocked_actions', 'required_reviews']) }
export function createScaleOperatingCadence() { return { ...SIMULATED_OPERATING_CADENCES[0], cadence_items: SIMULATED_OPERATING_CADENCES[0].cadence_items.map((item) => cloneArrayFields(item, ['required_reviews'])) } }
export function createScaleOperatingCadenceItem() { return cloneArrayFields(SIMULATED_CADENCE_ITEMS[0], ['required_reviews']) }
export function createScaleRaciMatrix() { return cloneArrayFields({ ...SIMULATED_RACI_MATRICES[0], roles: SIMULATED_RACI_MATRICES[0].roles.map((item) => ({ ...item })) }, ['unresolved_responsibilities']) }
export function createScaleRaciRole() { return { ...SIMULATED_RACI_ROLES[0] } }
export function createScaleEntryExitCriteriaMatrix() { return { ...SIMULATED_ENTRY_EXIT_MATRICES[0], entry_criteria: SIMULATED_ENTRY_EXIT_MATRICES[0].entry_criteria.map((item) => ({ ...item })), exit_criteria: SIMULATED_ENTRY_EXIT_MATRICES[0].exit_criteria.map((item) => ({ ...item })) } }
export function createScaleEntryCriterion() { return { ...SIMULATED_ENTRY_CRITERIA[0] } }
export function createScaleExitCriterion() { return { ...SIMULATED_EXIT_CRITERIA[0] } }
export function createInstitutionalExecutionPlan() { return cloneArrayFields({ ...SIMULATED_EXECUTION_PLANS[0], execution_items: SIMULATED_EXECUTION_PLANS[0].execution_items.map((item) => ({ ...item })) }, ['blocked_items', 'required_reviews']) }
export function createInstitutionalExecutionPlanItem() { return { ...SIMULATED_EXECUTION_ITEMS[0] } }
export function createScaleGovernanceCalendar() { return { ...SIMULATED_GOVERNANCE_CALENDARS[0], calendar_items: SIMULATED_GOVERNANCE_CALENDARS[0].calendar_items.map((item) => ({ ...item })) } }
export function createScaleGovernanceCalendarItem() { return { ...SIMULATED_GOVERNANCE_CALENDAR_ITEMS[0] } }
export function createScaleRiskRegister() { return { ...SIMULATED_RISK_REGISTERS[0], risk_items: SIMULATED_RISK_REGISTERS[0].risk_items.map((item) => ({ ...item })) } }
export function createScaleRiskItem() { return { ...SIMULATED_RISK_ITEMS[0] } }
export function createScaleDecisionLog() { return { ...SIMULATED_DECISION_LOGS[0], decision_items: SIMULATED_DECISION_LOGS[0].decision_items.map((item) => cloneArrayFields(item, ['required_reviews', 'blocked_actions'])) } }
export function createScaleDecisionLogItem() { return cloneArrayFields(SIMULATED_DECISION_LOG_ITEMS[0], ['required_reviews', 'blocked_actions']) }
export function createOperationalControlBoard() { return cloneArrayFields(SIMULATED_CONTROL_BOARDS[0], ['active_controls', 'blocked_actions']) }
export function createHumanReviewEscalationPath() { return { ...SIMULATED_HUMAN_REVIEW_PATHS[0], escalation_items: SIMULATED_HUMAN_REVIEW_PATHS[0].escalation_items.map((item) => ({ ...item })) } }
export function createHumanReviewEscalationItem() { return { ...SIMULATED_HUMAN_REVIEW_ITEMS[0] } }
export function createScaleReadinessScorecard() { return { ...SIMULATED_READINESS_SCORECARDS[0] } }
export function createOperatingModelMisuseBlocker() { return { ...SIMULATED_MISUSE_BLOCKERS[0] } }
export function createStrategicScaleOperatingExecutiveReport() { return { ...SIMULATED_EXECUTIVE_REPORTS[0] } }
export function createDefaultStrategicScaleOperatingModels() { return SIMULATED_OPERATING_MODELS.map((item) => cloneArrayFields(item, ['blocked_actions', 'required_reviews'])) }
export function createDefaultScaleOperatingCadences() { return SIMULATED_OPERATING_CADENCES.map((item) => ({ ...item, cadence_items: item.cadence_items.map((child) => cloneArrayFields(child, ['required_reviews'])) })) }
export function createDefaultScaleRaciMatrices() { return SIMULATED_RACI_MATRICES.map((item) => cloneArrayFields({ ...item, roles: item.roles.map((role) => ({ ...role })) }, ['unresolved_responsibilities'])) }
export function createDefaultEntryExitCriteriaMatrices() { return SIMULATED_ENTRY_EXIT_MATRICES.map((item) => ({ ...item, entry_criteria: item.entry_criteria.map((child) => ({ ...child })), exit_criteria: item.exit_criteria.map((child) => ({ ...child })) })) }
export function createDefaultInstitutionalExecutionPlans() { return SIMULATED_EXECUTION_PLANS.map((item) => cloneArrayFields({ ...item, execution_items: item.execution_items.map((child) => ({ ...child })) }, ['blocked_items', 'required_reviews'])) }
export function createDefaultScaleGovernanceCalendars() { return SIMULATED_GOVERNANCE_CALENDARS.map((item) => ({ ...item, calendar_items: item.calendar_items.map((child) => ({ ...child })) })) }
export function createDefaultScaleRiskRegisters() { return SIMULATED_RISK_REGISTERS.map((item) => ({ ...item, risk_items: item.risk_items.map((child) => ({ ...child })) })) }
export function createDefaultScaleDecisionLogs() { return SIMULATED_DECISION_LOGS.map((item) => ({ ...item, decision_items: item.decision_items.map((child) => cloneArrayFields(child, ['required_reviews', 'blocked_actions'])) })) }
export function createDefaultOperationalControlBoards() { return SIMULATED_CONTROL_BOARDS.map((item) => cloneArrayFields(item, ['active_controls', 'blocked_actions'])) }
export function createDefaultHumanReviewEscalationPaths() { return SIMULATED_HUMAN_REVIEW_PATHS.map((item) => ({ ...item, escalation_items: item.escalation_items.map((child) => ({ ...child })) })) }
export function createDefaultScaleReadinessScorecards() { return SIMULATED_READINESS_SCORECARDS.map((item) => ({ ...item })) }
export function createDefaultOperatingModelMisuseBlockers() { return SIMULATED_MISUSE_BLOCKERS.map((item) => ({ ...item })) }
export function createDefaultStrategicScaleOperatingExecutiveReports() { return SIMULATED_EXECUTIVE_REPORTS.map((item) => ({ ...item })) }
export function createDefaultStrategicScaleOperatingModelState(): SenseTrustStrategicScaleOperatingModelState {
  return { ...SIMULATED_STRATEGIC_SCALE_OPERATING_MODEL_STATE, operating_models: createDefaultStrategicScaleOperatingModels(), operating_cadences: createDefaultScaleOperatingCadences(), cadence_items: SIMULATED_CADENCE_ITEMS.map((item) => cloneArrayFields(item, ['required_reviews'])), raci_matrices: createDefaultScaleRaciMatrices(), raci_roles: SIMULATED_RACI_ROLES.map((item) => ({ ...item })), entry_exit_criteria_matrices: createDefaultEntryExitCriteriaMatrices(), entry_criteria: SIMULATED_ENTRY_CRITERIA.map((item) => ({ ...item })), exit_criteria: SIMULATED_EXIT_CRITERIA.map((item) => ({ ...item })), execution_plans: createDefaultInstitutionalExecutionPlans(), execution_plan_items: SIMULATED_EXECUTION_ITEMS.map((item) => ({ ...item })), governance_calendars: createDefaultScaleGovernanceCalendars(), governance_calendar_items: SIMULATED_GOVERNANCE_CALENDAR_ITEMS.map((item) => ({ ...item })), risk_registers: createDefaultScaleRiskRegisters(), risk_items: SIMULATED_RISK_ITEMS.map((item) => ({ ...item })), decision_logs: createDefaultScaleDecisionLogs(), decision_log_items: SIMULATED_DECISION_LOG_ITEMS.map((item) => cloneArrayFields(item, ['required_reviews', 'blocked_actions'])), operational_control_boards: createDefaultOperationalControlBoards(), human_review_escalation_paths: createDefaultHumanReviewEscalationPaths(), human_review_escalation_items: SIMULATED_HUMAN_REVIEW_ITEMS.map((item) => ({ ...item })), readiness_scorecards: createDefaultScaleReadinessScorecards(), misuse_blockers: createDefaultOperatingModelMisuseBlockers(), executive_reports: createDefaultStrategicScaleOperatingExecutiveReports(), references: [...OPERATING_MODEL_REFERENCES] }
}
export function generateLogicalOperatingModelHash(seed = 'operating-model') { return `logical-${seed}-${seed.length * 47}` }
export function generateLogicalOperatingDecisionHash(seed = 'operating-decision') { return `logical-${seed}-${seed.length * 53}` }
export function buildStrategicScaleOperatingModel() { return createStrategicScaleOperatingModel() }
export function buildScaleOperatingCadence() { return createScaleOperatingCadence() }
export function buildScaleRaciMatrix() { return createScaleRaciMatrix() }
export function buildScaleEntryExitCriteriaMatrix() { return createScaleEntryExitCriteriaMatrix() }
export function buildInstitutionalExecutionPlan() { return createInstitutionalExecutionPlan() }
export function buildScaleGovernanceCalendar() { return createScaleGovernanceCalendar() }
export function buildScaleRiskRegister() { return createScaleRiskRegister() }
export function buildScaleDecisionLog() { return createScaleDecisionLog() }
export function buildOperationalControlBoard() { return createOperationalControlBoard() }
export function buildHumanReviewEscalationPath() { return createHumanReviewEscalationPath() }
export function buildScaleReadinessScorecard() { return createScaleReadinessScorecard() }
export function classifyOperatingModelStatus(score = 60): SenseTrustOperatingModelStatusType { if (score >= 85) return 'scale_simulation_ready'; if (score >= 70) return 'operating_model_reviewed'; if (score >= 50) return 'refine_required'; return 'paused' }
export function classifyOperatingCadenceType(type: SenseTrustOperatingCadenceType = 'weekly_governance') { return type }
export function classifyScaleOperatingDecision(score = 60): SenseTrustScaleOperatingDecisionType { if (score >= 88) return 'scale_simulated'; if (score >= 72) return 'go'; if (score >= 45) return 'refine'; return 'pause' }
export function classifyScaleOperatingRiskLevel(score = 50): SenseTrustScaleOperatingRiskLevel { if (score >= 85) return 'critical'; if (score >= 65) return 'high'; if (score >= 35) return 'medium'; return 'low' }
export function calculateOperatingReadinessScore(a = 60, b = 55) { return Math.round((a + b) / 2) }
export function calculateCadenceCoverageScore(score = 60) { return Math.max(0, Math.min(100, score)) }
export function calculateRaciCompletenessScore(score = 60) { return Math.max(0, Math.min(100, score)) }
export function calculateEntryExitCriteriaScore(entry = 55, exit = 50) { return Math.round((entry + exit) / 2) }
export function calculateExecutionPlanScore(score = 60) { return Math.max(0, Math.min(100, score)) }
export function calculateGovernanceCalendarScore(score = 60) { return Math.max(0, Math.min(100, score)) }
export function calculateScaleRiskScore(score = 45) { return Math.max(0, Math.min(100, score)) }
export function calculateHumanReviewCoverageScore(score = 70) { return Math.max(0, Math.min(100, score)) }
export function validateStrategicScaleOperatingModels(state = createDefaultStrategicScaleOperatingModelState()) { return countCheck(state.operating_models.length, 8, 'operating_models') }
export function validateScaleOperatingCadences(state = createDefaultStrategicScaleOperatingModelState()) { return countCheck(state.operating_cadences.length, 8, 'operating_cadences') }
export function validateScaleRaciMatrices(state = createDefaultStrategicScaleOperatingModelState()) { return countCheck(state.raci_matrices.length, 8, 'raci_matrices') }
export function validateEntryExitCriteriaMatrices(state = createDefaultStrategicScaleOperatingModelState()) { return countCheck(state.entry_exit_criteria_matrices.length, 8, 'entry_exit_criteria_matrices') }
export function validateInstitutionalExecutionPlans(state = createDefaultStrategicScaleOperatingModelState()) { return countCheck(state.execution_plans.length, 8, 'execution_plans') }
export function validateScaleGovernanceCalendars(state = createDefaultStrategicScaleOperatingModelState()) { return countCheck(state.governance_calendars.length, 8, 'governance_calendars') }
export function validateScaleRiskRegisters(state = createDefaultStrategicScaleOperatingModelState()) { return countCheck(state.risk_registers.length, 8, 'risk_registers') }
export function validateScaleDecisionLogs(state = createDefaultStrategicScaleOperatingModelState()) { return countCheck(state.decision_logs.length, 8, 'decision_logs') }
export function validateOperationalControlBoards(state = createDefaultStrategicScaleOperatingModelState()) { return countCheck(state.operational_control_boards.length, 8, 'operational_control_boards') }
export function validateHumanReviewEscalationPaths(state = createDefaultStrategicScaleOperatingModelState()) { return countCheck(state.human_review_escalation_paths.length, 8, 'human_review_escalation_paths') }
export function validateScaleReadinessScorecards(state = createDefaultStrategicScaleOperatingModelState()) { return countCheck(state.readiness_scorecards.length, 8, 'readiness_scorecards') }
export function validateOperatingModelMisuseBlockers(state = createDefaultStrategicScaleOperatingModelState()) { return countCheck(state.misuse_blockers.length, 16, 'misuse_blockers') }
export function validateNoClinicalDataExposure(payload: unknown) { return denylistCheck(payload, OPERATING_MODEL_SENSITIVE_DENYLIST, ['clinical_data_used":true', 'contains_clinical_data":true']) }
export function validateNoPatientData(payload: unknown) { return flagCheck(payload, ['patient_data_used":true', 'contains_patient_data":true'], 'patient_data_true') }
export function validateNoPersonalSensitiveData(payload: unknown) { return flagCheck(payload, ['personal_sensitive_data_used":true', 'contains_personal_sensitive_data":true'], 'personal_sensitive_data_true') }
export function validateNoRealClinicalOperationClaim(payload: unknown) { return flagCheck(payload, ['real_clinical_operation_claimed":true', 'real_clinical_operation_claim":true', 'real_operation_claim":true'], 'real_clinical_operation_true') }
export function validateNoContractBindingClaim(payload: unknown) { return flagCheck(payload, ['contract_binding_claimed":true', 'contract_binding_claim":true', 'contractual_commitment_claim":true', 'contractual_clause_claim":true'], 'contract_binding_true') }
export function validateNoClientClaim(payload: unknown) { return flagCheck(payload, ['client_claim":true'], 'client_claim_true') }
export function validateNoPartnershipClaim(payload: unknown) { return flagCheck(payload, ['partnership_claim":true'], 'partnership_claim_true') }
export function validateNoRegulatoryValidationClaim(payload: unknown) { return flagCheck(payload, ['regulatory_validation_claim":true', 'regulatory_authorization_claim":true'], 'regulatory_validation_true') }
export function validateNoDiagnosticTruthClaim(payload: unknown) { return flagCheck(payload, ['diagnostic_truth_certification_claimed":true', 'diagnostic_truth_certification_claim":true'], 'diagnostic_truth_true') }
export function validateNoRealRevenueClaim(payload: unknown) { return denylistCheck(payload, OPERATING_MODEL_REAL_CLAIM_DENYLIST, ['real_revenue_claimed":true', 'real_revenue_claim":true']) }
export function validateNoRealBillingClaim(payload: unknown) { return flagCheck(payload, ['real_billing_claimed":true', 'real_billing_claim":true'], 'real_billing_true') }
export function validateNoLegalObligationClaim(payload: unknown) { return flagCheck(payload, ['legal_obligation_claimed":true', 'legal_obligation_claim":true', 'legal_responsibility_claim":true'], 'legal_obligation_true') }
export function validateNoCommercialCommitmentClaim(payload: unknown) { return flagCheck(payload, ['commercial_commitment_claimed":true', 'commercial_commitment_claim":true'], 'commercial_commitment_true') }
export function buildStrategicScaleOperatingExportPayload(): SenseTrustStrategicScaleOperatingExportPayload { return { ...SIMULATED_STRATEGIC_SCALE_OPERATING_EXPORT_PAYLOAD, state: createDefaultStrategicScaleOperatingModelState() } }
export function validateStrategicScaleOperatingExportPayload(payload = buildStrategicScaleOperatingExportPayload()) { const checks = [validateStrategicScaleOperatingModels(payload.state), validateScaleOperatingCadences(payload.state), validateScaleRaciMatrices(payload.state), validateEntryExitCriteriaMatrices(payload.state), validateInstitutionalExecutionPlans(payload.state), validateScaleGovernanceCalendars(payload.state), validateScaleRiskRegisters(payload.state), validateScaleDecisionLogs(payload.state), validateOperationalControlBoards(payload.state), validateHumanReviewEscalationPaths(payload.state), validateScaleReadinessScorecards(payload.state), validateOperatingModelMisuseBlockers(payload.state), validateNoClinicalDataExposure(payload.state), validateNoPatientData(payload.state), validateNoPersonalSensitiveData(payload.state), validateNoRealClinicalOperationClaim(payload.state), validateNoContractBindingClaim(payload.state), validateNoClientClaim(payload.state), validateNoPartnershipClaim(payload.state), validateNoRegulatoryValidationClaim(payload.state), validateNoDiagnosticTruthClaim(payload.state), validateNoRealRevenueClaim(payload.state), validateNoRealBillingClaim(payload.state), validateNoLegalObligationClaim(payload.state), validateNoCommercialCommitmentClaim(payload.state)]; const errors = checks.flatMap((check) => check.errors); return { valid: errors.length === 0, errors } }
export function assertOperatingModelMetadataOnly(payload: { metadata_only?: boolean }) { if (!payload.metadata_only) throw new Error('operating_model_not_metadata_only'); return { valid: true, errors: [] } }
export function assertOperatingModelNoSensitiveExposure(payload: unknown) { return assertValid(validateNoClinicalDataExposure(payload), 'operating_model_sensitive_exposure') }
export function assertOperatingModelNoLegalBinding(payload: unknown) { return assertValid(validateNoContractBindingClaim(payload), 'operating_model_legal_binding') }
export function assertOperatingModelNoRegulatoryAuthorization(payload: unknown) { return assertValid(validateNoRegulatoryValidationClaim(payload), 'operating_model_regulatory_authorization') }
export function assertOperatingModelNoCommercialCommitment(payload: unknown) { return assertValid(validateNoCommercialCommitmentClaim(payload), 'operating_model_commercial_commitment') }
export function assertOperatingModelNoClinicalOperation(payload: unknown) { return assertValid(validateNoRealClinicalOperationClaim(payload), 'operating_model_clinical_operation') }
export function assertOperatingModelNoDiagnosticTruthCertification(payload: unknown) { return assertValid(validateNoDiagnosticTruthClaim(payload), 'operating_model_diagnostic_truth') }
export function linkOperatingModelToStrategicScaleGate() { return 'SenseTrust Strategic Scale Gate v3.0' }
export function linkOperatingModelToInstitutionalReadinessGate() { return 'SenseTrust Institutional Readiness Gate v3.0' }
export function linkOperatingModelToV3Roadmap() { return 'SenseTrust v3 Strategic Roadmap v3.0' }
export function linkOperatingModelToMOC() { return ['MOC_SenseTrust', 'MOC_VitalStrata_SenseTrust', 'MOC_NeuroStrata_Trust_Layer', 'MOC_DNDA_Trust_Object', 'MOC_BLC_Rastreabilidade'] }

function cloneArrayFields<T extends Record<string, unknown>>(item: T, keys: string[]): T { const copy = { ...item }; keys.forEach((key) => { const value = item[key]; if (Array.isArray(value)) copy[key as keyof T] = [...value] as T[keyof T] }); return copy }
function countCheck(actual: number, expected: number, label: string): SenseTrustStrategicScaleOperatingValidationResult { return { valid: actual >= expected, errors: actual >= expected ? [] : [`${label}_count_below_${expected}`] } }
function denylistCheck(payload: unknown, denylist: string[], flags: string[] = []): SenseTrustStrategicScaleOperatingValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); const errors = [...denylist.filter((term) => serialized.includes(term.toLowerCase())), ...flags.filter((flag) => serialized.includes(flag.toLowerCase()))]; return { valid: errors.length === 0, errors } }
function flagCheck(payload: unknown, flags: string[], error: string): SenseTrustStrategicScaleOperatingValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); return { valid: !flags.some((flag) => serialized.includes(flag.toLowerCase())), errors: flags.some((flag) => serialized.includes(flag.toLowerCase())) ? [error] : [] } }
function assertValid(result: SenseTrustStrategicScaleOperatingValidationResult, label: string) { if (!result.valid) throw new Error(`${label}: ${result.errors.join(', ')}`); return result }
