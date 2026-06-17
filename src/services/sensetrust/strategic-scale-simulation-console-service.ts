import {
  SIMULATED_AUDIT_TRAIL, SIMULATED_CAPACITY_ITEMS, SIMULATED_CAPACITY_SIMULATIONS, SIMULATED_DECISION_TRACES, SIMULATED_DECISION_TRACE_ITEMS, SIMULATED_EXECUTIVE_REPORTS, SIMULATED_GO_PAUSE_REFINE_SCALE_SIMULATORS, SIMULATED_HUMAN_REVIEW_ITEMS, SIMULATED_HUMAN_REVIEW_SIMULATIONS, SIMULATED_IMPACT_ITEMS, SIMULATED_IMPACT_SIMULATIONS, SIMULATED_OUTCOME_SUMMARIES, SIMULATED_READINESS_SCORE_ITEMS, SIMULATED_READINESS_SCORE_SIMULATIONS, SIMULATED_RESOURCE_LOAD_ITEMS, SIMULATED_RESOURCE_LOAD_SIMULATIONS, SIMULATED_SCALE_RISK_ITEMS, SIMULATED_SCALE_RISK_SIMULATIONS, SIMULATED_SCENARIOS, SIMULATED_SCENARIO_DECISION_ITEMS, SIMULATED_SCENARIO_DECISION_MATRICES, SIMULATED_SCENARIO_INPUTS, SIMULATED_SCENARIO_OUTPUTS, SIMULATED_SIMULATION_CONSOLES, SIMULATED_SIMULATION_MISUSE_BLOCKERS, SIMULATED_STRATEGIC_SCALE_SIMULATION_CONSOLE_STATE, SIMULATED_STRATEGIC_SCALE_SIMULATION_EXPORT_PAYLOAD, SIMULATION_CONSOLE_REAL_CLAIM_DENYLIST, SIMULATION_CONSOLE_REFERENCES, SIMULATION_CONSOLE_SENSITIVE_DENYLIST,
} from '@/fixtures/sensetrust/simulated-strategic-scale-simulation-console'
import type { SenseTrustScaleSimulationCapacityLevel, SenseTrustScaleSimulationDecisionType, SenseTrustScaleSimulationImpactLevel, SenseTrustScaleSimulationRiskLevel, SenseTrustScaleSimulationScenarioType, SenseTrustScaleSimulationStatusType, SenseTrustStrategicScaleSimulationConsoleState, SenseTrustStrategicScaleSimulationExportPayload, SenseTrustStrategicScaleSimulationValidationResult } from '@/types/sensetrust/strategic-scale-simulation-console'

export function createStrategicScaleSimulationConsoleState() { return createDefaultStrategicScaleSimulationConsoleState() }
export function createStrategicScaleSimulationConsole() { return cloneArrayFields(SIMULATED_SIMULATION_CONSOLES[0], ['blocked_actions', 'required_reviews']) }
export function createScaleSimulationScenario() { return cloneArrayFields({ ...SIMULATED_SCENARIOS[0], scenario_inputs: SIMULATED_SCENARIOS[0].scenario_inputs.map((x) => ({ ...x })), scenario_outputs: SIMULATED_SCENARIOS[0].scenario_outputs.map((x) => ({ ...x })) }, ['required_reviews', 'blocked_actions']) }
export function createScaleSimulationScenarioInput() { return { ...SIMULATED_SCENARIO_INPUTS[0] } }
export function createScaleSimulationScenarioOutput() { return { ...SIMULATED_SCENARIO_OUTPUTS[0] } }
export function createScenarioDecisionMatrix() { return { ...SIMULATED_SCENARIO_DECISION_MATRICES[0], decision_items: SIMULATED_SCENARIO_DECISION_MATRICES[0].decision_items.map((x) => cloneArrayFields(x, ['required_reviews', 'blocked_actions'])) } }
export function createScenarioDecisionItem() { return cloneArrayFields(SIMULATED_SCENARIO_DECISION_ITEMS[0], ['required_reviews', 'blocked_actions']) }
export function createInstitutionalImpactSimulation() { return { ...SIMULATED_IMPACT_SIMULATIONS[0], items: SIMULATED_IMPACT_SIMULATIONS[0].items.map((x) => ({ ...x })) } }
export function createInstitutionalImpactItem() { return { ...SIMULATED_IMPACT_ITEMS[0] } }
export function createOperationalCapacitySimulation() { return { ...SIMULATED_CAPACITY_SIMULATIONS[0], items: SIMULATED_CAPACITY_SIMULATIONS[0].items.map((x) => ({ ...x })) } }
export function createOperationalCapacityItem() { return { ...SIMULATED_CAPACITY_ITEMS[0] } }
export function createResourceLoadSimulation() { return { ...SIMULATED_RESOURCE_LOAD_SIMULATIONS[0], items: SIMULATED_RESOURCE_LOAD_SIMULATIONS[0].items.map((x) => ({ ...x })) } }
export function createResourceLoadItem() { return { ...SIMULATED_RESOURCE_LOAD_ITEMS[0] } }
export function createScaleRiskSimulation() { return { ...SIMULATED_SCALE_RISK_SIMULATIONS[0], items: SIMULATED_SCALE_RISK_SIMULATIONS[0].items.map((x) => ({ ...x })) } }
export function createScaleRiskSimulationItem() { return { ...SIMULATED_SCALE_RISK_ITEMS[0] } }
export function createReadinessScoreSimulation() { return { ...SIMULATED_READINESS_SCORE_SIMULATIONS[0], items: SIMULATED_READINESS_SCORE_SIMULATIONS[0].items.map((x) => ({ ...x })) } }
export function createReadinessScoreItem() { return { ...SIMULATED_READINESS_SCORE_ITEMS[0] } }
export function createGoPauseRefineScaleSimulator() { return { ...SIMULATED_GO_PAUSE_REFINE_SCALE_SIMULATORS[0] } }
export function createHumanReviewSimulation() { return { ...SIMULATED_HUMAN_REVIEW_SIMULATIONS[0], items: SIMULATED_HUMAN_REVIEW_SIMULATIONS[0].items.map((x) => ({ ...x })) } }
export function createHumanReviewSimulationItem() { return { ...SIMULATED_HUMAN_REVIEW_ITEMS[0] } }
export function createScenarioOutcomeSummary() { return { ...SIMULATED_OUTCOME_SUMMARIES[0] } }
export function createSimulationDecisionTrace() { return { ...SIMULATED_DECISION_TRACES[0], trace_items: SIMULATED_DECISION_TRACES[0].trace_items.map((x) => ({ ...x })) } }
export function createSimulationDecisionTraceItem() { return { ...SIMULATED_DECISION_TRACE_ITEMS[0] } }
export function createSimulationAuditTrailItem() { return { ...SIMULATED_AUDIT_TRAIL[0] } }
export function createSimulationMisuseBlocker() { return { ...SIMULATED_SIMULATION_MISUSE_BLOCKERS[0] } }
export function createStrategicScaleSimulationExecutiveReport() { return { ...SIMULATED_EXECUTIVE_REPORTS[0] } }
export function createDefaultStrategicScaleSimulationConsoles() { return SIMULATED_SIMULATION_CONSOLES.map((x) => cloneArrayFields(x, ['blocked_actions', 'required_reviews'])) }
export function createDefaultScaleSimulationScenarios() { return SIMULATED_SCENARIOS.map((x) => cloneArrayFields({ ...x, scenario_inputs: x.scenario_inputs.map((i) => ({ ...i })), scenario_outputs: x.scenario_outputs.map((o) => ({ ...o })) }, ['required_reviews', 'blocked_actions'])) }
export function createDefaultScenarioDecisionMatrices() { return SIMULATED_SCENARIO_DECISION_MATRICES.map((x) => ({ ...x, decision_items: x.decision_items.map((i) => cloneArrayFields(i, ['required_reviews', 'blocked_actions'])) })) }
export function createDefaultInstitutionalImpactSimulations() { return SIMULATED_IMPACT_SIMULATIONS.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultOperationalCapacitySimulations() { return SIMULATED_CAPACITY_SIMULATIONS.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultResourceLoadSimulations() { return SIMULATED_RESOURCE_LOAD_SIMULATIONS.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultScaleRiskSimulations() { return SIMULATED_SCALE_RISK_SIMULATIONS.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultReadinessScoreSimulations() { return SIMULATED_READINESS_SCORE_SIMULATIONS.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultGoPauseRefineScaleSimulators() { return SIMULATED_GO_PAUSE_REFINE_SCALE_SIMULATORS.map((x) => ({ ...x })) }
export function createDefaultHumanReviewSimulations() { return SIMULATED_HUMAN_REVIEW_SIMULATIONS.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultScenarioOutcomeSummaries() { return SIMULATED_OUTCOME_SUMMARIES.map((x) => ({ ...x })) }
export function createDefaultSimulationDecisionTraces() { return SIMULATED_DECISION_TRACES.map((x) => ({ ...x, trace_items: x.trace_items.map((i) => ({ ...i })) })) }
export function createDefaultSimulationAuditTrail() { return SIMULATED_AUDIT_TRAIL.map((x) => ({ ...x })) }
export function createDefaultSimulationMisuseBlockers() { return SIMULATED_SIMULATION_MISUSE_BLOCKERS.map((x) => ({ ...x })) }
export function createDefaultStrategicScaleSimulationExecutiveReports() { return SIMULATED_EXECUTIVE_REPORTS.map((x) => ({ ...x })) }
export function createDefaultStrategicScaleSimulationConsoleState(): SenseTrustStrategicScaleSimulationConsoleState { return { ...SIMULATED_STRATEGIC_SCALE_SIMULATION_CONSOLE_STATE, simulation_consoles: createDefaultStrategicScaleSimulationConsoles(), scenarios: createDefaultScaleSimulationScenarios(), scenario_inputs: SIMULATED_SCENARIO_INPUTS.map((x) => ({ ...x })), scenario_outputs: SIMULATED_SCENARIO_OUTPUTS.map((x) => ({ ...x })), scenario_decision_matrices: createDefaultScenarioDecisionMatrices(), scenario_decision_items: SIMULATED_SCENARIO_DECISION_ITEMS.map((x) => cloneArrayFields(x, ['required_reviews', 'blocked_actions'])), institutional_impact_simulations: createDefaultInstitutionalImpactSimulations(), institutional_impact_items: SIMULATED_IMPACT_ITEMS.map((x) => ({ ...x })), operational_capacity_simulations: createDefaultOperationalCapacitySimulations(), operational_capacity_items: SIMULATED_CAPACITY_ITEMS.map((x) => ({ ...x })), resource_load_simulations: createDefaultResourceLoadSimulations(), resource_load_items: SIMULATED_RESOURCE_LOAD_ITEMS.map((x) => ({ ...x })), scale_risk_simulations: createDefaultScaleRiskSimulations(), scale_risk_items: SIMULATED_SCALE_RISK_ITEMS.map((x) => ({ ...x })), readiness_score_simulations: createDefaultReadinessScoreSimulations(), readiness_score_items: SIMULATED_READINESS_SCORE_ITEMS.map((x) => ({ ...x })), simulators: createDefaultGoPauseRefineScaleSimulators(), human_review_simulations: createDefaultHumanReviewSimulations(), human_review_items: SIMULATED_HUMAN_REVIEW_ITEMS.map((x) => ({ ...x })), outcome_summaries: createDefaultScenarioOutcomeSummaries(), decision_traces: createDefaultSimulationDecisionTraces(), decision_trace_items: SIMULATED_DECISION_TRACE_ITEMS.map((x) => ({ ...x })), audit_trail: createDefaultSimulationAuditTrail(), misuse_blockers: createDefaultSimulationMisuseBlockers(), executive_reports: createDefaultStrategicScaleSimulationExecutiveReports(), references: [...SIMULATION_CONSOLE_REFERENCES] } }
export function generateLogicalSimulationConsoleHash(seed = 'simulation-console') { return `logical-${seed}-${seed.length * 59}` }
export function generateLogicalSimulationDecisionHash(seed = 'simulation-decision') { return `logical-${seed}-${seed.length * 61}` }
export function buildStrategicScaleSimulationConsole() { return createStrategicScaleSimulationConsole() }
export function buildScaleSimulationScenario() { return createScaleSimulationScenario() }
export function buildScenarioDecisionMatrix() { return createScenarioDecisionMatrix() }
export function buildInstitutionalImpactSimulation() { return createInstitutionalImpactSimulation() }
export function buildOperationalCapacitySimulation() { return createOperationalCapacitySimulation() }
export function buildResourceLoadSimulation() { return createResourceLoadSimulation() }
export function buildScaleRiskSimulation() { return createScaleRiskSimulation() }
export function buildReadinessScoreSimulation() { return createReadinessScoreSimulation() }
export function buildGoPauseRefineScaleSimulator() { return createGoPauseRefineScaleSimulator() }
export function buildHumanReviewSimulation() { return createHumanReviewSimulation() }
export function buildScenarioOutcomeSummary() { return createScenarioOutcomeSummary() }
export function buildSimulationDecisionTrace() { return createSimulationDecisionTrace() }
export function classifySimulationStatus(score = 60): SenseTrustScaleSimulationStatusType { if (score >= 85) return 'scenario_ready'; if (score >= 70) return 'simulation_reviewed'; if (score >= 50) return 'refine_required'; return 'paused' }
export function classifySimulationScenarioType(type: SenseTrustScaleSimulationScenarioType = 'controlled_scale') { return type }
export function classifyScaleSimulationDecision(score = 60): SenseTrustScaleSimulationDecisionType { if (score >= 88) return 'scale_simulated'; if (score >= 72) return 'go'; if (score >= 45) return 'refine'; return 'pause' }
export function classifyScaleSimulationRiskLevel(score = 50): SenseTrustScaleSimulationRiskLevel { if (score >= 85) return 'critical'; if (score >= 65) return 'high'; if (score >= 35) return 'medium'; return 'low' }
export function classifyScaleSimulationImpactLevel(score = 50): SenseTrustScaleSimulationImpactLevel { if (score >= 85) return 'high'; if (score >= 65) return 'significant'; if (score >= 35) return 'moderate'; return 'minimal' }
export function classifyScaleSimulationCapacityLevel(score = 50): SenseTrustScaleSimulationCapacityLevel { if (score >= 90) return 'excessive_risk'; if (score >= 75) return 'strong'; if (score >= 45) return 'adequate'; return 'limited' }
export function calculateScenarioReadinessScore(a = 60, b = 55) { return Math.round((a + b) / 2) }
export function calculateScenarioRiskScore(score = 45) { return Math.max(0, Math.min(100, score)) }
export function calculateInstitutionalImpactScore(score = 55) { return Math.max(0, Math.min(100, score)) }
export function calculateOperationalCapacityScore(score = 55) { return Math.max(0, Math.min(100, score)) }
export function calculateResourceLoadScore(score = 55) { return Math.max(0, Math.min(100, score)) }
export function calculateSimulationDecisionScore(readiness = 60, risk = 45) { return Math.round((readiness + (100 - risk)) / 2) }
export function calculateHumanReviewNeedScore(score = 70) { return Math.max(0, Math.min(100, score)) }
export function validateStrategicScaleSimulationConsoles(s = createDefaultStrategicScaleSimulationConsoleState()) { return countCheck(s.simulation_consoles.length, 8, 'simulation_consoles') }
export function validateScaleSimulationScenarios(s = createDefaultStrategicScaleSimulationConsoleState()) { return countCheck(s.scenarios.length, 24, 'scenarios') }
export function validateScenarioDecisionMatrices(s = createDefaultStrategicScaleSimulationConsoleState()) { return countCheck(s.scenario_decision_matrices.length, 8, 'scenario_decision_matrices') }
export function validateInstitutionalImpactSimulations(s = createDefaultStrategicScaleSimulationConsoleState()) { return countCheck(s.institutional_impact_simulations.length, 8, 'institutional_impact_simulations') }
export function validateOperationalCapacitySimulations(s = createDefaultStrategicScaleSimulationConsoleState()) { return countCheck(s.operational_capacity_simulations.length, 8, 'operational_capacity_simulations') }
export function validateResourceLoadSimulations(s = createDefaultStrategicScaleSimulationConsoleState()) { return countCheck(s.resource_load_simulations.length, 8, 'resource_load_simulations') }
export function validateScaleRiskSimulations(s = createDefaultStrategicScaleSimulationConsoleState()) { return countCheck(s.scale_risk_simulations.length, 8, 'scale_risk_simulations') }
export function validateReadinessScoreSimulations(s = createDefaultStrategicScaleSimulationConsoleState()) { return countCheck(s.readiness_score_simulations.length, 8, 'readiness_score_simulations') }
export function validateGoPauseRefineScaleSimulators(s = createDefaultStrategicScaleSimulationConsoleState()) { return countCheck(s.simulators.length, 8, 'simulators') }
export function validateHumanReviewSimulations(s = createDefaultStrategicScaleSimulationConsoleState()) { return countCheck(s.human_review_simulations.length, 8, 'human_review_simulations') }
export function validateScenarioOutcomeSummaries(s = createDefaultStrategicScaleSimulationConsoleState()) { return countCheck(s.outcome_summaries.length, 8, 'outcome_summaries') }
export function validateSimulationDecisionTraces(s = createDefaultStrategicScaleSimulationConsoleState()) { return countCheck(s.decision_traces.length, 8, 'decision_traces') }
export function validateSimulationAuditTrail(s = createDefaultStrategicScaleSimulationConsoleState()) { return countCheck(s.audit_trail.length, 24, 'audit_trail') }
export function validateSimulationMisuseBlockers(s = createDefaultStrategicScaleSimulationConsoleState()) { return countCheck(s.misuse_blockers.length, 16, 'misuse_blockers') }
export function validateNoClinicalDataExposure(p: unknown) { return denylistCheck(p, SIMULATION_CONSOLE_SENSITIVE_DENYLIST, ['clinical_data_used":true', 'contains_clinical_data":true']) }
export function validateNoPatientData(p: unknown) { return flagCheck(p, ['patient_data_used":true', 'contains_patient_data":true'], 'patient_data_true') }
export function validateNoPersonalSensitiveData(p: unknown) { return flagCheck(p, ['personal_sensitive_data_used":true', 'contains_personal_sensitive_data":true'], 'personal_sensitive_data_true') }
export function validateNoRealClinicalOperationClaim(p: unknown) { return flagCheck(p, ['real_clinical_operation_claimed":true', 'real_clinical_operation_claim":true', 'real_execution_claim":true'], 'real_clinical_operation_true') }
export function validateNoContractBindingClaim(p: unknown) { return flagCheck(p, ['contract_binding_claimed":true', 'contract_binding_claim":true', 'contractual_commitment_claim":true'], 'contract_binding_true') }
export function validateNoClientClaim(p: unknown) { return flagCheck(p, ['client_claim":true'], 'client_claim_true') }
export function validateNoPartnershipClaim(p: unknown) { return flagCheck(p, ['partnership_claim":true'], 'partnership_claim_true') }
export function validateNoRegulatoryValidationClaim(p: unknown) { return flagCheck(p, ['regulatory_validation_claim":true', 'regulatory_authorization_claim":true'], 'regulatory_validation_true') }
export function validateNoDiagnosticTruthClaim(p: unknown) { return flagCheck(p, ['diagnostic_truth_certification_claimed":true', 'diagnostic_truth_certification_claim":true'], 'diagnostic_truth_true') }
export function validateNoRealRevenueClaim(p: unknown) { return denylistCheck(p, SIMULATION_CONSOLE_REAL_CLAIM_DENYLIST, ['real_revenue_claimed":true', 'real_revenue_claim":true']) }
export function validateNoRealBillingClaim(p: unknown) { return flagCheck(p, ['real_billing_claimed":true', 'real_billing_claim":true'], 'real_billing_true') }
export function validateNoRealImpactClaim(p: unknown) { return flagCheck(p, ['real_impact_claimed":true', 'real_impact_claim":true', 'real_outcome_claim":true'], 'real_impact_true') }
export function validateNoRealCapacityClaim(p: unknown) { return flagCheck(p, ['real_capacity_claimed":true', 'real_capacity_claim":true'], 'real_capacity_true') }
export function validateNoLegalDecisionClaim(p: unknown) { return flagCheck(p, ['legal_decision_claimed":true', 'legal_decision_claim":true'], 'legal_decision_true') }
export function validateNoCommercialCommitmentClaim(p: unknown) { return flagCheck(p, ['commercial_commitment_claimed":true', 'commercial_commitment_claim":true'], 'commercial_commitment_true') }
export function buildStrategicScaleSimulationExportPayload(): SenseTrustStrategicScaleSimulationExportPayload { return { ...SIMULATED_STRATEGIC_SCALE_SIMULATION_EXPORT_PAYLOAD, state: createDefaultStrategicScaleSimulationConsoleState() } }
export function validateStrategicScaleSimulationExportPayload(payload = buildStrategicScaleSimulationExportPayload()) { const checks = [validateStrategicScaleSimulationConsoles(payload.state), validateScaleSimulationScenarios(payload.state), validateScenarioDecisionMatrices(payload.state), validateInstitutionalImpactSimulations(payload.state), validateOperationalCapacitySimulations(payload.state), validateResourceLoadSimulations(payload.state), validateScaleRiskSimulations(payload.state), validateReadinessScoreSimulations(payload.state), validateGoPauseRefineScaleSimulators(payload.state), validateHumanReviewSimulations(payload.state), validateScenarioOutcomeSummaries(payload.state), validateSimulationDecisionTraces(payload.state), validateSimulationAuditTrail(payload.state), validateSimulationMisuseBlockers(payload.state), validateNoClinicalDataExposure(payload.state), validateNoPatientData(payload.state), validateNoPersonalSensitiveData(payload.state), validateNoRealClinicalOperationClaim(payload.state), validateNoContractBindingClaim(payload.state), validateNoClientClaim(payload.state), validateNoPartnershipClaim(payload.state), validateNoRegulatoryValidationClaim(payload.state), validateNoDiagnosticTruthClaim(payload.state), validateNoRealRevenueClaim(payload.state), validateNoRealBillingClaim(payload.state), validateNoRealImpactClaim(payload.state), validateNoRealCapacityClaim(payload.state), validateNoLegalDecisionClaim(payload.state), validateNoCommercialCommitmentClaim(payload.state)]; const errors = checks.flatMap((x) => x.errors); return { valid: errors.length === 0, errors } }
export function assertSimulationConsoleMetadataOnly(p: { metadata_only?: boolean }) { if (!p.metadata_only) throw new Error('simulation_console_not_metadata_only'); return { valid: true, errors: [] } }
export function assertSimulationConsoleNoSensitiveExposure(p: unknown) { return assertValid(validateNoClinicalDataExposure(p), 'simulation_sensitive_exposure') }
export function assertSimulationConsoleNoLegalBinding(p: unknown) { return assertValid(validateNoContractBindingClaim(p), 'simulation_legal_binding') }
export function assertSimulationConsoleNoRegulatoryAuthorization(p: unknown) { return assertValid(validateNoRegulatoryValidationClaim(p), 'simulation_regulatory_authorization') }
export function assertSimulationConsoleNoCommercialCommitment(p: unknown) { return assertValid(validateNoCommercialCommitmentClaim(p), 'simulation_commercial_commitment') }
export function assertSimulationConsoleNoClinicalOperation(p: unknown) { return assertValid(validateNoRealClinicalOperationClaim(p), 'simulation_clinical_operation') }
export function assertSimulationConsoleNoDiagnosticTruthCertification(p: unknown) { return assertValid(validateNoDiagnosticTruthClaim(p), 'simulation_diagnostic_truth') }
export function assertSimulationConsoleNoRealImpact(p: unknown) { return assertValid(validateNoRealImpactClaim(p), 'simulation_real_impact') }
export function assertSimulationConsoleNoRealCapacity(p: unknown) { return assertValid(validateNoRealCapacityClaim(p), 'simulation_real_capacity') }
export function linkSimulationConsoleToOperatingModel() { return 'SenseTrust Strategic Scale Operating Model v3.1' }
export function linkSimulationConsoleToStrategicScaleGate() { return 'SenseTrust Strategic Scale Gate v3.0' }
export function linkSimulationConsoleToInstitutionalReadinessGate() { return 'SenseTrust Institutional Readiness Gate v3.0' }
export function linkSimulationConsoleToV3Roadmap() { return 'SenseTrust v3 Strategic Roadmap v3.0' }
export function linkSimulationConsoleToMOC() { return ['MOC_SenseTrust', 'MOC_VitalStrata_SenseTrust', 'MOC_NeuroStrata_Trust_Layer', 'MOC_DNDA_Trust_Object', 'MOC_BLC_Rastreabilidade'] }
function cloneArrayFields<T extends Record<string, unknown>>(item: T, keys: string[]): T { const copy = { ...item }; keys.forEach((key) => { const value = item[key]; if (Array.isArray(value)) copy[key as keyof T] = [...value] as T[keyof T] }); return copy }
function countCheck(actual: number, expected: number, label: string): SenseTrustStrategicScaleSimulationValidationResult { return { valid: actual >= expected, errors: actual >= expected ? [] : [`${label}_count_below_${expected}`] } }
function denylistCheck(payload: unknown, denylist: string[], flags: string[] = []): SenseTrustStrategicScaleSimulationValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); const errors = [...denylist.filter((term) => serialized.includes(term.toLowerCase())), ...flags.filter((flag) => serialized.includes(flag.toLowerCase()))]; return { valid: errors.length === 0, errors } }
function flagCheck(payload: unknown, flags: string[], error: string): SenseTrustStrategicScaleSimulationValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); return { valid: !flags.some((flag) => serialized.includes(flag.toLowerCase())), errors: flags.some((flag) => serialized.includes(flag.toLowerCase())) ? [error] : [] } }
function assertValid(result: SenseTrustStrategicScaleSimulationValidationResult, label: string) { if (!result.valid) throw new Error(`${label}: ${result.errors.join(', ')}`); return result }
