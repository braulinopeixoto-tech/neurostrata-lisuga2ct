import { EVIDENCE_SIMULATOR_REAL_CLAIM_DENYLIST, EVIDENCE_SIMULATOR_REFERENCES, EVIDENCE_SIMULATOR_SENSITIVE_DENYLIST, SIMULATED_EVIDENCE_EXECUTIVE_REPORTS, SIMULATED_EVIDENCE_GAP_ANALYSES, SIMULATED_EVIDENCE_GAP_ITEMS, SIMULATED_EVIDENCE_MISUSE_BLOCKERS, SIMULATED_EVIDENCE_SIMULATORS, SIMULATED_EVIDENCE_TO_DECISION_TRACES, SIMULATED_EVIDENCE_TO_DECISION_TRACE_ITEMS, SIMULATED_HUMAN_REVIEW_QUEUES, SIMULATED_HUMAN_REVIEW_QUEUE_ITEMS, SIMULATED_INSTITUTIONAL_EVIDENCE_BRIEFS, SIMULATED_MATURITY_SCORES, SIMULATED_MATURITY_SCORE_ITEMS, SIMULATED_MINIMUM_EVIDENCE_MATRICES, SIMULATED_MINIMUM_EVIDENCE_REQUIREMENTS, SIMULATED_PROOF_RISK_ITEMS, SIMULATED_PROOF_RISK_REGISTERS, SIMULATED_READINESS_BOARDS, SIMULATED_READINESS_BOARD_ITEMS, SIMULATED_SCENARIO_EVIDENCE_ITEMS, SIMULATED_SCENARIO_EVIDENCE_PACKAGES, SIMULATED_STRENGTHENING_PLANS, SIMULATED_STRENGTHENING_PLAN_ITEMS, SIMULATED_STRATEGIC_SCALE_EVIDENCE_EXPORT_PAYLOAD, SIMULATED_STRATEGIC_SCALE_EVIDENCE_SIMULATOR_STATE } from '@/fixtures/sensetrust/simulated-strategic-scale-evidence-simulator'
import type { SenseTrustEvidenceConfidenceLevel, SenseTrustEvidenceReadinessDecisionType, SenseTrustEvidenceSimulatorStatusType, SenseTrustEvidenceStrengthLevel, SenseTrustEvidenceType, SenseTrustProofRiskLevel, SenseTrustStrategicScaleEvidenceExportPayload, SenseTrustStrategicScaleEvidenceSimulatorState, SenseTrustStrategicScaleEvidenceValidationResult } from '@/types/sensetrust/strategic-scale-evidence-simulator'

export function createStrategicScaleEvidenceSimulatorState() { return createDefaultStrategicScaleEvidenceSimulatorState() }
export function createStrategicScaleEvidenceSimulator() { return cloneArrayFields(SIMULATED_EVIDENCE_SIMULATORS[0], ['blocked_actions', 'required_reviews']) }
export function createScenarioEvidencePackage() { return cloneArrayFields({ ...SIMULATED_SCENARIO_EVIDENCE_PACKAGES[0], evidence_items: SIMULATED_SCENARIO_EVIDENCE_PACKAGES[0].evidence_items.map((x) => ({ ...x })) }, ['missing_evidence', 'required_reviews', 'blocked_actions']) }
export function createScenarioEvidenceItem() { return { ...SIMULATED_SCENARIO_EVIDENCE_ITEMS[0] } }
export function createMinimumEvidenceMatrix() { return { ...SIMULATED_MINIMUM_EVIDENCE_MATRICES[0], requirements: SIMULATED_MINIMUM_EVIDENCE_MATRICES[0].requirements.map((x) => ({ ...x })) } }
export function createMinimumEvidenceRequirement() { return { ...SIMULATED_MINIMUM_EVIDENCE_REQUIREMENTS[0] } }
export function createEvidenceGapAnalysis() { return { ...SIMULATED_EVIDENCE_GAP_ANALYSES[0], gap_items: SIMULATED_EVIDENCE_GAP_ANALYSES[0].gap_items.map((x) => ({ ...x })) } }
export function createEvidenceGapItem() { return { ...SIMULATED_EVIDENCE_GAP_ITEMS[0] } }
export function createProofRiskRegister() { return { ...SIMULATED_PROOF_RISK_REGISTERS[0], proof_risk_items: SIMULATED_PROOF_RISK_REGISTERS[0].proof_risk_items.map((x) => ({ ...x })) } }
export function createProofRiskItem() { return { ...SIMULATED_PROOF_RISK_ITEMS[0] } }
export function createEvidenceMaturityScore() { return { ...SIMULATED_MATURITY_SCORES[0], items: SIMULATED_MATURITY_SCORES[0].items.map((x) => ({ ...x })) } }
export function createEvidenceMaturityScoreItem() { return { ...SIMULATED_MATURITY_SCORE_ITEMS[0] } }
export function createEvidenceReadinessBoard() { return { ...SIMULATED_READINESS_BOARDS[0], items: SIMULATED_READINESS_BOARDS[0].items.map((x) => ({ ...x })) } }
export function createEvidenceReadinessBoardItem() { return { ...SIMULATED_READINESS_BOARD_ITEMS[0] } }
export function createEvidenceToDecisionTrace() { return { ...SIMULATED_EVIDENCE_TO_DECISION_TRACES[0], trace_items: SIMULATED_EVIDENCE_TO_DECISION_TRACES[0].trace_items.map((x) => ({ ...x })) } }
export function createEvidenceToDecisionTraceItem() { return { ...SIMULATED_EVIDENCE_TO_DECISION_TRACE_ITEMS[0] } }
export function createInstitutionalEvidenceBrief() { return { ...SIMULATED_INSTITUTIONAL_EVIDENCE_BRIEFS[0] } }
export function createEvidenceStrengtheningPlan() { return { ...SIMULATED_STRENGTHENING_PLANS[0], items: SIMULATED_STRENGTHENING_PLANS[0].items.map((x) => ({ ...x })) } }
export function createEvidenceStrengtheningPlanItem() { return { ...SIMULATED_STRENGTHENING_PLAN_ITEMS[0] } }
export function createHumanReviewEvidenceQueue() { return { ...SIMULATED_HUMAN_REVIEW_QUEUES[0], items: SIMULATED_HUMAN_REVIEW_QUEUES[0].items.map((x) => ({ ...x })) } }
export function createHumanReviewEvidenceQueueItem() { return { ...SIMULATED_HUMAN_REVIEW_QUEUE_ITEMS[0] } }
export function createEvidenceMisuseBlocker() { return { ...SIMULATED_EVIDENCE_MISUSE_BLOCKERS[0] } }
export function createStrategicScaleEvidenceExecutiveReport() { return { ...SIMULATED_EVIDENCE_EXECUTIVE_REPORTS[0] } }
export function createDefaultStrategicScaleEvidenceSimulators() { return SIMULATED_EVIDENCE_SIMULATORS.map((x) => cloneArrayFields(x, ['blocked_actions', 'required_reviews'])) }
export function createDefaultScenarioEvidencePackages() { return SIMULATED_SCENARIO_EVIDENCE_PACKAGES.map((x) => cloneArrayFields({ ...x, evidence_items: x.evidence_items.map((i) => ({ ...i })) }, ['missing_evidence', 'required_reviews', 'blocked_actions'])) }
export function createDefaultMinimumEvidenceMatrices() { return SIMULATED_MINIMUM_EVIDENCE_MATRICES.map((x) => ({ ...x, requirements: x.requirements.map((i) => ({ ...i })) })) }
export function createDefaultEvidenceGapAnalyses() { return SIMULATED_EVIDENCE_GAP_ANALYSES.map((x) => ({ ...x, gap_items: x.gap_items.map((i) => ({ ...i })) })) }
export function createDefaultProofRiskRegisters() { return SIMULATED_PROOF_RISK_REGISTERS.map((x) => ({ ...x, proof_risk_items: x.proof_risk_items.map((i) => ({ ...i })) })) }
export function createDefaultEvidenceMaturityScores() { return SIMULATED_MATURITY_SCORES.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultEvidenceReadinessBoards() { return SIMULATED_READINESS_BOARDS.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultEvidenceToDecisionTraces() { return SIMULATED_EVIDENCE_TO_DECISION_TRACES.map((x) => ({ ...x, trace_items: x.trace_items.map((i) => ({ ...i })) })) }
export function createDefaultInstitutionalEvidenceBriefs() { return SIMULATED_INSTITUTIONAL_EVIDENCE_BRIEFS.map((x) => ({ ...x })) }
export function createDefaultEvidenceStrengtheningPlans() { return SIMULATED_STRENGTHENING_PLANS.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultHumanReviewEvidenceQueues() { return SIMULATED_HUMAN_REVIEW_QUEUES.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultEvidenceMisuseBlockers() { return SIMULATED_EVIDENCE_MISUSE_BLOCKERS.map((x) => ({ ...x })) }
export function createDefaultStrategicScaleEvidenceExecutiveReports() { return SIMULATED_EVIDENCE_EXECUTIVE_REPORTS.map((x) => ({ ...x })) }
export function createDefaultStrategicScaleEvidenceSimulatorState(): SenseTrustStrategicScaleEvidenceSimulatorState { return { ...SIMULATED_STRATEGIC_SCALE_EVIDENCE_SIMULATOR_STATE, evidence_simulators: createDefaultStrategicScaleEvidenceSimulators(), evidence_packages: createDefaultScenarioEvidencePackages(), evidence_items: SIMULATED_SCENARIO_EVIDENCE_ITEMS.map((x) => ({ ...x })), minimum_evidence_matrices: createDefaultMinimumEvidenceMatrices(), minimum_evidence_requirements: SIMULATED_MINIMUM_EVIDENCE_REQUIREMENTS.map((x) => ({ ...x })), gap_analyses: createDefaultEvidenceGapAnalyses(), gap_items: SIMULATED_EVIDENCE_GAP_ITEMS.map((x) => ({ ...x })), proof_risk_registers: createDefaultProofRiskRegisters(), proof_risk_items: SIMULATED_PROOF_RISK_ITEMS.map((x) => ({ ...x })), maturity_scores: createDefaultEvidenceMaturityScores(), maturity_score_items: SIMULATED_MATURITY_SCORE_ITEMS.map((x) => ({ ...x })), readiness_boards: createDefaultEvidenceReadinessBoards(), readiness_board_items: SIMULATED_READINESS_BOARD_ITEMS.map((x) => ({ ...x })), evidence_to_decision_traces: createDefaultEvidenceToDecisionTraces(), evidence_to_decision_trace_items: SIMULATED_EVIDENCE_TO_DECISION_TRACE_ITEMS.map((x) => ({ ...x })), institutional_evidence_briefs: createDefaultInstitutionalEvidenceBriefs(), strengthening_plans: createDefaultEvidenceStrengtheningPlans(), strengthening_plan_items: SIMULATED_STRENGTHENING_PLAN_ITEMS.map((x) => ({ ...x })), human_review_queues: createDefaultHumanReviewEvidenceQueues(), human_review_queue_items: SIMULATED_HUMAN_REVIEW_QUEUE_ITEMS.map((x) => ({ ...x })), misuse_blockers: createDefaultEvidenceMisuseBlockers(), executive_reports: createDefaultStrategicScaleEvidenceExecutiveReports(), references: [...EVIDENCE_SIMULATOR_REFERENCES] } }
export function generateLogicalEvidenceSimulatorHash(seed = 'evidence-simulator') { return `logical-${seed}-${seed.length * 67}` }
export function generateLogicalEvidenceItemHash(seed = 'evidence-item') { return `logical-${seed}-${seed.length * 71}` }
export function buildStrategicScaleEvidenceSimulator() { return createStrategicScaleEvidenceSimulator() }
export function buildScenarioEvidencePackage() { return createScenarioEvidencePackage() }
export function buildMinimumEvidenceMatrix() { return createMinimumEvidenceMatrix() }
export function buildEvidenceGapAnalysis() { return createEvidenceGapAnalysis() }
export function buildProofRiskRegister() { return createProofRiskRegister() }
export function buildEvidenceMaturityScore() { return createEvidenceMaturityScore() }
export function buildEvidenceReadinessBoard() { return createEvidenceReadinessBoard() }
export function buildEvidenceToDecisionTrace() { return createEvidenceToDecisionTrace() }
export function buildInstitutionalEvidenceBrief() { return createInstitutionalEvidenceBrief() }
export function buildEvidenceStrengtheningPlan() { return createEvidenceStrengtheningPlan() }
export function buildHumanReviewEvidenceQueue() { return createHumanReviewEvidenceQueue() }
export function classifyEvidenceSimulatorStatus(score = 60): SenseTrustEvidenceSimulatorStatusType { if (score >= 85) return 'evidence_package_ready'; if (score >= 70) return 'evidence_reviewed'; if (score >= 50) return 'refine_required'; return 'paused' }
export function classifyEvidenceType(type: SenseTrustEvidenceType = 'simulation_output') { return type }
export function classifyEvidenceStrengthLevel(score = 60): SenseTrustEvidenceStrengthLevel { if (score >= 85) return 'strong_simulated'; if (score >= 65) return 'adequate_simulated'; if (score >= 45) return 'partial'; return 'weak' }
export function classifyProofRiskLevel(score = 50): SenseTrustProofRiskLevel { if (score >= 85) return 'critical'; if (score >= 65) return 'high'; if (score >= 35) return 'medium'; return 'low' }
export function classifyEvidenceReadinessDecision(score = 50): SenseTrustEvidenceReadinessDecisionType { if (score >= 85) return 'go'; if (score >= 65) return 'strengthen_evidence'; if (score >= 45) return 'require_human_review'; return 'block' }
export function classifyEvidenceConfidenceLevel(level: SenseTrustEvidenceConfidenceLevel = 'simulated_only') { return level }
export function calculateEvidenceCompletenessScore(score = 55) { return clamp(score) }
export function calculateEvidenceStrengthScore(score = 55) { return clamp(score) }
export function calculateProofRiskScore(score = 45) { return clamp(score) }
export function calculateEvidenceGapSeverityScore(score = 65) { return clamp(score) }
export function calculateEvidenceMaturityScore(score = 55) { return clamp(score) }
export function calculateEvidenceReadinessScore(score = 55) { return clamp(score) }
export function calculateEvidencePresentationReadinessScore(score = 55) { return clamp(score) }
export function validateStrategicScaleEvidenceSimulators(s = createDefaultStrategicScaleEvidenceSimulatorState()) { return countCheck(s.evidence_simulators.length, 8, 'evidence_simulators') }
export function validateScenarioEvidencePackages(s = createDefaultStrategicScaleEvidenceSimulatorState()) { return countCheck(s.evidence_packages.length, 24, 'evidence_packages') }
export function validateMinimumEvidenceMatrices(s = createDefaultStrategicScaleEvidenceSimulatorState()) { return countCheck(s.minimum_evidence_matrices.length, 8, 'minimum_evidence_matrices') }
export function validateEvidenceGapAnalyses(s = createDefaultStrategicScaleEvidenceSimulatorState()) { return countCheck(s.gap_analyses.length, 8, 'gap_analyses') }
export function validateProofRiskRegisters(s = createDefaultStrategicScaleEvidenceSimulatorState()) { return countCheck(s.proof_risk_registers.length, 8, 'proof_risk_registers') }
export function validateEvidenceMaturityScores(s = createDefaultStrategicScaleEvidenceSimulatorState()) { return countCheck(s.maturity_scores.length, 8, 'maturity_scores') }
export function validateEvidenceReadinessBoards(s = createDefaultStrategicScaleEvidenceSimulatorState()) { return countCheck(s.readiness_boards.length, 8, 'readiness_boards') }
export function validateEvidenceToDecisionTraces(s = createDefaultStrategicScaleEvidenceSimulatorState()) { return countCheck(s.evidence_to_decision_traces.length, 8, 'evidence_to_decision_traces') }
export function validateInstitutionalEvidenceBriefs(s = createDefaultStrategicScaleEvidenceSimulatorState()) { return countCheck(s.institutional_evidence_briefs.length, 8, 'institutional_evidence_briefs') }
export function validateEvidenceStrengtheningPlans(s = createDefaultStrategicScaleEvidenceSimulatorState()) { return countCheck(s.strengthening_plans.length, 8, 'strengthening_plans') }
export function validateHumanReviewEvidenceQueues(s = createDefaultStrategicScaleEvidenceSimulatorState()) { return countCheck(s.human_review_queues.length, 8, 'human_review_queues') }
export function validateEvidenceMisuseBlockers(s = createDefaultStrategicScaleEvidenceSimulatorState()) { return countCheck(s.misuse_blockers.length, 16, 'misuse_blockers') }
export function validateNoClinicalDataExposure(p: unknown) { return denylistCheck(p, EVIDENCE_SIMULATOR_SENSITIVE_DENYLIST, ['clinical_data_used":true', 'contains_clinical_data":true']) }
export function validateNoPatientData(p: unknown) { return flagCheck(p, ['patient_data_used":true', 'contains_patient_data":true'], 'patient_data_true') }
export function validateNoPersonalSensitiveData(p: unknown) { return flagCheck(p, ['personal_sensitive_data_used":true', 'contains_personal_sensitive_data":true'], 'personal_sensitive_data_true') }
export function validateNoRealClinicalOperationClaim(p: unknown) { return flagCheck(p, ['real_clinical_operation_claimed":true', 'real_clinical_operation_claim":true'], 'real_clinical_operation_true') }
export function validateNoContractBindingClaim(p: unknown) { return flagCheck(p, ['contract_binding_claimed":true', 'contract_binding_claim":true', 'contractual_commitment_claim":true'], 'contract_binding_true') }
export function validateNoClientClaim(p: unknown) { return flagCheck(p, ['client_claim":true'], 'client_claim_true') }
export function validateNoPartnershipClaim(p: unknown) { return flagCheck(p, ['partnership_claim":true'], 'partnership_claim_true') }
export function validateNoRegulatoryValidationClaim(p: unknown) { return flagCheck(p, ['regulatory_validation_claim":true', 'regulatory_authorization_claim":true', 'regulatory_approval_claim":true'], 'regulatory_validation_true') }
export function validateNoDiagnosticTruthClaim(p: unknown) { return flagCheck(p, ['diagnostic_truth_certification_claimed":true', 'diagnostic_truth_certification_claim":true'], 'diagnostic_truth_true') }
export function validateNoRealRevenueClaim(p: unknown) { return flagCheck(p, ['real_revenue_claimed":true', 'real_revenue_claim":true'], 'real_revenue_true') }
export function validateNoRealBillingClaim(p: unknown) { return flagCheck(p, ['real_billing_claimed":true', 'real_billing_claim":true'], 'real_billing_true') }
export function validateNoRealImpactClaim(p: unknown) { return flagCheck(p, ['real_impact_claimed":true', 'real_impact_claim":true'], 'real_impact_true') }
export function validateNoRealCapacityClaim(p: unknown) { return flagCheck(p, ['real_capacity_claimed":true', 'real_capacity_claim":true'], 'real_capacity_true') }
export function validateNoRealScientificValidationClaim(p: unknown) { return denylistCheck(p, EVIDENCE_SIMULATOR_REAL_CLAIM_DENYLIST, ['real_scientific_validation_claimed":true', 'real_scientific_validation_claim":true', 'clinical_validation_claim":true', 'real_evidence_claim":true', 'real_world_evidence_claim":true']) }
export function validateNoExternalCertificationClaim(p: unknown) { return flagCheck(p, ['external_certification_claimed":true', 'external_certification_claim":true'], 'external_certification_true') }
export function buildStrategicScaleEvidenceExportPayload(): SenseTrustStrategicScaleEvidenceExportPayload { return { ...SIMULATED_STRATEGIC_SCALE_EVIDENCE_EXPORT_PAYLOAD, state: createDefaultStrategicScaleEvidenceSimulatorState() } }
export function validateStrategicScaleEvidenceExportPayload(payload = buildStrategicScaleEvidenceExportPayload()) { const checks = [validateStrategicScaleEvidenceSimulators(payload.state), validateScenarioEvidencePackages(payload.state), validateMinimumEvidenceMatrices(payload.state), validateEvidenceGapAnalyses(payload.state), validateProofRiskRegisters(payload.state), validateEvidenceMaturityScores(payload.state), validateEvidenceReadinessBoards(payload.state), validateEvidenceToDecisionTraces(payload.state), validateInstitutionalEvidenceBriefs(payload.state), validateEvidenceStrengtheningPlans(payload.state), validateHumanReviewEvidenceQueues(payload.state), validateEvidenceMisuseBlockers(payload.state), validateNoClinicalDataExposure(payload.state), validateNoPatientData(payload.state), validateNoPersonalSensitiveData(payload.state), validateNoRealClinicalOperationClaim(payload.state), validateNoContractBindingClaim(payload.state), validateNoClientClaim(payload.state), validateNoPartnershipClaim(payload.state), validateNoRegulatoryValidationClaim(payload.state), validateNoDiagnosticTruthClaim(payload.state), validateNoRealRevenueClaim(payload.state), validateNoRealBillingClaim(payload.state), validateNoRealImpactClaim(payload.state), validateNoRealCapacityClaim(payload.state), validateNoRealScientificValidationClaim(payload.state), validateNoExternalCertificationClaim(payload.state)]; const errors = checks.flatMap((x) => x.errors); return { valid: errors.length === 0, errors } }
export function assertEvidenceSimulatorMetadataOnly(p: { metadata_only?: boolean }) { if (!p.metadata_only) throw new Error('evidence_simulator_not_metadata_only'); return { valid: true, errors: [] } }
export function assertEvidenceSimulatorNoSensitiveExposure(p: unknown) { return assertValid(validateNoClinicalDataExposure(p), 'evidence_sensitive_exposure') }
export function assertEvidenceSimulatorNoLegalBinding(p: unknown) { return assertValid(validateNoContractBindingClaim(p), 'evidence_legal_binding') }
export function assertEvidenceSimulatorNoRegulatoryAuthorization(p: unknown) { return assertValid(validateNoRegulatoryValidationClaim(p), 'evidence_regulatory_authorization') }
export function assertEvidenceSimulatorNoCommercialCommitment(p: unknown) { return assertValid(validateNoClientClaim(p), 'evidence_commercial_commitment') }
export function assertEvidenceSimulatorNoClinicalOperation(p: unknown) { return assertValid(validateNoRealClinicalOperationClaim(p), 'evidence_clinical_operation') }
export function assertEvidenceSimulatorNoDiagnosticTruthCertification(p: unknown) { return assertValid(validateNoDiagnosticTruthClaim(p), 'evidence_diagnostic_truth') }
export function assertEvidenceSimulatorNoRealImpact(p: unknown) { return assertValid(validateNoRealImpactClaim(p), 'evidence_real_impact') }
export function assertEvidenceSimulatorNoRealCapacity(p: unknown) { return assertValid(validateNoRealCapacityClaim(p), 'evidence_real_capacity') }
export function assertEvidenceSimulatorNoScientificValidation(p: unknown) { return assertValid(validateNoRealScientificValidationClaim(p), 'evidence_scientific_validation') }
export function assertEvidenceSimulatorNoExternalCertification(p: unknown) { return assertValid(validateNoExternalCertificationClaim(p), 'evidence_external_certification') }
export function linkEvidenceSimulatorToSimulationConsole() { return 'SenseTrust Strategic Scale Simulation Console v3.2' }
export function linkEvidenceSimulatorToOperatingModel() { return 'SenseTrust Strategic Scale Operating Model v3.1' }
export function linkEvidenceSimulatorToStrategicScaleGate() { return 'SenseTrust Strategic Scale Gate v3.0' }
export function linkEvidenceSimulatorToInstitutionalReadinessGate() { return 'SenseTrust Institutional Readiness Gate v3.0' }
export function linkEvidenceSimulatorToMOC() { return ['MOC_SenseTrust', 'MOC_VitalStrata_SenseTrust', 'MOC_NeuroStrata_Trust_Layer', 'MOC_DNDA_Trust_Object', 'MOC_BLC_Rastreabilidade'] }
function cloneArrayFields<T extends Record<string, unknown>>(item: T, keys: string[]): T { const copy = { ...item }; keys.forEach((key) => { const value = item[key]; if (Array.isArray(value)) copy[key as keyof T] = [...value] as T[keyof T] }); return copy }
function clamp(score: number) { return Math.max(0, Math.min(100, score)) }
function countCheck(actual: number, expected: number, label: string): SenseTrustStrategicScaleEvidenceValidationResult { return { valid: actual >= expected, errors: actual >= expected ? [] : [`${label}_count_below_${expected}`] } }
function denylistCheck(payload: unknown, denylist: string[], flags: string[] = []): SenseTrustStrategicScaleEvidenceValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); const errors = [...denylist.filter((term) => serialized.includes(term.toLowerCase())), ...flags.filter((flag) => serialized.includes(flag.toLowerCase()))]; return { valid: errors.length === 0, errors } }
function flagCheck(payload: unknown, flags: string[], error: string): SenseTrustStrategicScaleEvidenceValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); return { valid: !flags.some((flag) => serialized.includes(flag.toLowerCase())), errors: flags.some((flag) => serialized.includes(flag.toLowerCase())) ? [error] : [] } }
function assertValid(result: SenseTrustStrategicScaleEvidenceValidationResult, label: string) { if (!result.valid) throw new Error(`${label}: ${result.errors.join(', ')}`); return result }
