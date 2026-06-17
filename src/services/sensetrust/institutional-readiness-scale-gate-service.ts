import {
  SCALE_GATE_REAL_CLAIM_DENYLIST,
  SCALE_GATE_REFERENCES,
  SCALE_GATE_SENSITIVE_DENYLIST,
  SIMULATED_GOVERNANCE_TO_SCALE_AUDIT_TRAIL,
  SIMULATED_INSTITUTIONAL_READINESS_REPORTS,
  SIMULATED_INSTITUTIONAL_READINESS_SCALE_GATE_STATE,
  SIMULATED_INSTITUTIONAL_SCALE_GATE_EXPORT_PAYLOAD,
  SIMULATED_MARKET_PRIORITIZATION_MATRICES,
  SIMULATED_MARKET_PRIORITY_ITEMS,
  SIMULATED_PARTNER_FIT_MATRICES,
  SIMULATED_READINESS_GATES,
  SIMULATED_REGULATORY_READINESS_ITEMS,
  SIMULATED_REGULATORY_READINESS_MAPS,
  SIMULATED_RISK_GOVERNANCE_MAPS,
  SIMULATED_ROADMAP_ITEMS,
  SIMULATED_SCALE_CANDIDATE_SCORES,
  SIMULATED_SCALE_DECISION_BOARDS,
  SIMULATED_SCALE_DECISIONS,
  SIMULATED_STRATEGIC_SCALE_GATES,
  SIMULATED_STRATEGIC_SCALE_MISUSE_BLOCKERS,
  SIMULATED_V3_ROADMAPS,
} from '@/fixtures/sensetrust/simulated-institutional-readiness-scale-gate'
import type {
  SenseTrustInstitutionalReadinessScaleGateState,
  SenseTrustInstitutionalScaleGateExportPayload,
  SenseTrustInstitutionalScaleGateValidationResult,
  SenseTrustReadinessLevel,
  SenseTrustScaleDecisionType,
  SenseTrustScaleGateStatusType,
  SenseTrustStrategicRiskLevel,
} from '@/types/sensetrust/institutional-readiness-scale-gate'

export function createInstitutionalReadinessScaleGateState() { return createDefaultInstitutionalReadinessScaleGateState() }
export function createInstitutionalReadinessGate() { return cloneArrayFields(SIMULATED_READINESS_GATES[0], ['required_reviews', 'blocked_actions']) }
export function createStrategicScaleGate() { return cloneArrayFields(SIMULATED_STRATEGIC_SCALE_GATES[0], ['scale_blockers']) }
export function createScaleDecisionBoard() { return { ...SIMULATED_SCALE_DECISION_BOARDS[0], decisions: SIMULATED_SCALE_DECISION_BOARDS[0].decisions.map((item) => cloneArrayFields(item, ['required_reviews', 'blocked_actions'])) } }
export function createScaleDecision() { return cloneArrayFields(SIMULATED_SCALE_DECISIONS[0], ['required_reviews', 'blocked_actions']) }
export function createMarketPrioritizationMatrix() { return { ...SIMULATED_MARKET_PRIORITIZATION_MATRICES[0], items: SIMULATED_MARKET_PRIORITIZATION_MATRICES[0].items.map((item) => ({ ...item })) } }
export function createMarketPriorityItem() { return { ...SIMULATED_MARKET_PRIORITY_ITEMS[0] } }
export function createRegulatoryReadinessMap() { return { ...SIMULATED_REGULATORY_READINESS_MAPS[0], items: SIMULATED_REGULATORY_READINESS_MAPS[0].items.map((item) => ({ ...item })) } }
export function createRegulatoryReadinessItem() { return { ...SIMULATED_REGULATORY_READINESS_ITEMS[0] } }
export function createInstitutionalRiskGovernanceMap() { return cloneArrayFields(SIMULATED_RISK_GOVERNANCE_MAPS[0], ['mitigations']) }
export function createScaleCandidateScore() { return { ...SIMULATED_SCALE_CANDIDATE_SCORES[0] } }
export function createV3StrategicRoadmap() { return { ...SIMULATED_V3_ROADMAPS[0], items: SIMULATED_V3_ROADMAPS[0].items.map((item) => ({ ...item })) } }
export function createStrategicRoadmapItem() { return { ...SIMULATED_ROADMAP_ITEMS[0] } }
export function createStrategicPartnerFitMatrix() { return { ...SIMULATED_PARTNER_FIT_MATRICES[0] } }
export function createGovernanceToScaleAuditTrailItem() { return { ...SIMULATED_GOVERNANCE_TO_SCALE_AUDIT_TRAIL[0] } }
export function createStrategicScaleMisuseBlocker() { return { ...SIMULATED_STRATEGIC_SCALE_MISUSE_BLOCKERS[0] } }
export function createInstitutionalReadinessExecutiveReport() { return { ...SIMULATED_INSTITUTIONAL_READINESS_REPORTS[0] } }
export function createDefaultInstitutionalReadinessGates() { return SIMULATED_READINESS_GATES.map((item) => cloneArrayFields(item, ['required_reviews', 'blocked_actions'])) }
export function createDefaultStrategicScaleGates() { return SIMULATED_STRATEGIC_SCALE_GATES.map((item) => cloneArrayFields(item, ['scale_blockers'])) }
export function createDefaultScaleDecisionBoards() { return SIMULATED_SCALE_DECISION_BOARDS.map((item) => ({ ...item, decisions: item.decisions.map((decision) => cloneArrayFields(decision, ['required_reviews', 'blocked_actions'])) })) }
export function createDefaultScaleDecisions() { return SIMULATED_SCALE_DECISIONS.map((item) => cloneArrayFields(item, ['required_reviews', 'blocked_actions'])) }
export function createDefaultMarketPrioritizationMatrices() { return SIMULATED_MARKET_PRIORITIZATION_MATRICES.map((item) => ({ ...item, items: item.items.map((child) => ({ ...child })) })) }
export function createDefaultMarketPriorityItems() { return SIMULATED_MARKET_PRIORITY_ITEMS.map((item) => ({ ...item })) }
export function createDefaultRegulatoryReadinessMaps() { return SIMULATED_REGULATORY_READINESS_MAPS.map((item) => ({ ...item, items: item.items.map((child) => ({ ...child })) })) }
export function createDefaultRegulatoryReadinessItems() { return SIMULATED_REGULATORY_READINESS_ITEMS.map((item) => ({ ...item })) }
export function createDefaultInstitutionalRiskGovernanceMaps() { return SIMULATED_RISK_GOVERNANCE_MAPS.map((item) => cloneArrayFields(item, ['mitigations'])) }
export function createDefaultScaleCandidateScores() { return SIMULATED_SCALE_CANDIDATE_SCORES.map((item) => ({ ...item })) }
export function createDefaultV3StrategicRoadmaps() { return SIMULATED_V3_ROADMAPS.map((item) => ({ ...item, items: item.items.map((child) => ({ ...child })) })) }
export function createDefaultStrategicRoadmapItems() { return SIMULATED_ROADMAP_ITEMS.map((item) => ({ ...item })) }
export function createDefaultStrategicPartnerFitMatrices() { return SIMULATED_PARTNER_FIT_MATRICES.map((item) => ({ ...item })) }
export function createDefaultGovernanceToScaleAuditTrail() { return SIMULATED_GOVERNANCE_TO_SCALE_AUDIT_TRAIL.map((item) => ({ ...item })) }
export function createDefaultStrategicScaleMisuseBlockers() { return SIMULATED_STRATEGIC_SCALE_MISUSE_BLOCKERS.map((item) => ({ ...item })) }
export function createDefaultInstitutionalReadinessExecutiveReports() { return SIMULATED_INSTITUTIONAL_READINESS_REPORTS.map((item) => ({ ...item })) }
export function createDefaultInstitutionalReadinessScaleGateState(): SenseTrustInstitutionalReadinessScaleGateState {
  return { ...SIMULATED_INSTITUTIONAL_READINESS_SCALE_GATE_STATE, readiness_gates: createDefaultInstitutionalReadinessGates(), strategic_scale_gates: createDefaultStrategicScaleGates(), scale_decision_boards: createDefaultScaleDecisionBoards(), scale_decisions: createDefaultScaleDecisions(), market_prioritization_matrices: createDefaultMarketPrioritizationMatrices(), market_priority_items: createDefaultMarketPriorityItems(), regulatory_readiness_maps: createDefaultRegulatoryReadinessMaps(), regulatory_readiness_items: createDefaultRegulatoryReadinessItems(), institutional_risk_governance_maps: createDefaultInstitutionalRiskGovernanceMaps(), scale_candidate_scores: createDefaultScaleCandidateScores(), v3_strategic_roadmaps: createDefaultV3StrategicRoadmaps(), strategic_roadmap_items: createDefaultStrategicRoadmapItems(), strategic_partner_fit_matrices: createDefaultStrategicPartnerFitMatrices(), governance_to_scale_audit_trail: createDefaultGovernanceToScaleAuditTrail(), strategic_scale_misuse_blockers: createDefaultStrategicScaleMisuseBlockers(), executive_reports: createDefaultInstitutionalReadinessExecutiveReports(), references: [...SCALE_GATE_REFERENCES] }
}
export function generateLogicalScaleGateHash(seed = 'scale-gate') { return `logical-${seed}-${seed.length * 41}` }
export function generateLogicalScaleDecisionHash(seed = 'scale-decision') { return `logical-${seed}-${seed.length * 43}` }
export function buildInstitutionalReadinessGate() { return createInstitutionalReadinessGate() }
export function buildStrategicScaleGate() { return createStrategicScaleGate() }
export function buildScaleDecisionBoard() { return createScaleDecisionBoard() }
export function buildMarketPrioritizationMatrix() { return createMarketPrioritizationMatrix() }
export function buildRegulatoryReadinessMap() { return createRegulatoryReadinessMap() }
export function buildInstitutionalRiskGovernanceMap() { return createInstitutionalRiskGovernanceMap() }
export function buildScaleCandidateScore() { return createScaleCandidateScore() }
export function buildV3StrategicRoadmap() { return createV3StrategicRoadmap() }
export function buildStrategicPartnerFitMatrix() { return createStrategicPartnerFitMatrix() }
export function buildGovernanceToScaleAuditTrail() { return createDefaultGovernanceToScaleAuditTrail() }
export function classifyScaleGateStatus(score = 60): SenseTrustScaleGateStatusType { if (score >= 85) return 'scale_candidate'; if (score >= 70) return 'readiness_reviewed'; if (score >= 50) return 'refine_required'; return 'paused' }
export function classifyScaleDecision(score = 60): SenseTrustScaleDecisionType { if (score >= 88) return 'scale'; if (score >= 72) return 'go'; if (score >= 45) return 'refine'; return 'pause' }
export function classifyReadinessLevel(score = 60): SenseTrustReadinessLevel { if (score >= 90) return 'scale_ready_simulated'; if (score >= 80) return 'scale_candidate'; if (score >= 65) return 'governed'; if (score >= 45) return 'structured'; return 'emerging' }
export function classifyStrategicRiskLevel(score = 50): SenseTrustStrategicRiskLevel { if (score >= 85) return 'critical'; if (score >= 65) return 'high'; if (score >= 35) return 'medium'; return 'low' }
export function calculateInstitutionalReadinessScore(maturity = 60, regulatory = 50, market = 55, risk = 45) { return Math.round((maturity + regulatory + market + (100 - risk)) / 4) }
export function calculateScaleCandidateScore(readiness = 60, market = 55, regulatory = 50) { return Math.round((readiness + market + regulatory) / 3) }
export function calculateMarketPriorityScore(score = 50) { return Math.max(0, Math.min(100, score)) }
export function calculateRegulatoryReadinessScore(score = 50) { return Math.max(0, Math.min(100, score)) }
export function calculateInstitutionalRiskScore(score = 45) { return Math.max(0, Math.min(100, score)) }
export function calculateStrategicScaleScore(readiness = 60, candidate = 55, risk = 40) { return Math.round((readiness + candidate + (100 - risk)) / 3) }
export function validateInstitutionalReadinessGates(state = createDefaultInstitutionalReadinessScaleGateState()) { return countCheck(state.readiness_gates.length, 8, 'readiness_gates') }
export function validateStrategicScaleGates(state = createDefaultInstitutionalReadinessScaleGateState()) { return countCheck(state.strategic_scale_gates.length, 8, 'strategic_scale_gates') }
export function validateScaleDecisionBoards(state = createDefaultInstitutionalReadinessScaleGateState()) { return countCheck(state.scale_decision_boards.length, 8, 'scale_decision_boards') }
export function validateScaleDecisions(state = createDefaultInstitutionalReadinessScaleGateState()) { return countCheck(state.scale_decisions.length, 16, 'scale_decisions') }
export function validateMarketPrioritizationMatrices(state = createDefaultInstitutionalReadinessScaleGateState()) { return countCheck(state.market_prioritization_matrices.length, 8, 'market_prioritization_matrices') }
export function validateRegulatoryReadinessMaps(state = createDefaultInstitutionalReadinessScaleGateState()) { return countCheck(state.regulatory_readiness_maps.length, 8, 'regulatory_readiness_maps') }
export function validateInstitutionalRiskGovernanceMaps(state = createDefaultInstitutionalReadinessScaleGateState()) { return countCheck(state.institutional_risk_governance_maps.length, 8, 'institutional_risk_governance_maps') }
export function validateScaleCandidateScores(state = createDefaultInstitutionalReadinessScaleGateState()) { return countCheck(state.scale_candidate_scores.length, 8, 'scale_candidate_scores') }
export function validateV3StrategicRoadmaps(state = createDefaultInstitutionalReadinessScaleGateState()) { return countCheck(state.v3_strategic_roadmaps.length, 8, 'v3_strategic_roadmaps') }
export function validateStrategicPartnerFitMatrices(state = createDefaultInstitutionalReadinessScaleGateState()) { return countCheck(state.strategic_partner_fit_matrices.length, 8, 'strategic_partner_fit_matrices') }
export function validateGovernanceToScaleAuditTrail(state = createDefaultInstitutionalReadinessScaleGateState()) { return countCheck(state.governance_to_scale_audit_trail.length, 24, 'governance_to_scale_audit_trail') }
export function validateStrategicScaleMisuseBlockers(state = createDefaultInstitutionalReadinessScaleGateState()) { return countCheck(state.strategic_scale_misuse_blockers.length, 16, 'strategic_scale_misuse_blockers') }
export function validateNoClinicalDataExposure(payload: unknown) { return denylistCheck(payload, SCALE_GATE_SENSITIVE_DENYLIST, ['clinical_data_used":true', 'contains_clinical_data":true']) }
export function validateNoPatientData(payload: unknown) { return flagCheck(payload, ['patient_data_used":true', 'contains_patient_data":true'], 'patient_data_true') }
export function validateNoPersonalSensitiveData(payload: unknown) { return flagCheck(payload, ['personal_sensitive_data_used":true', 'contains_personal_sensitive_data":true'], 'personal_sensitive_data_true') }
export function validateNoRealClinicalOperationClaim(payload: unknown) { return flagCheck(payload, ['real_clinical_operation_claimed":true', 'real_clinical_operation_claim":true'], 'real_clinical_operation_true') }
export function validateNoContractBindingClaim(payload: unknown) { return flagCheck(payload, ['contract_binding_claimed":true', 'contract_binding_claim":true'], 'contract_binding_true') }
export function validateNoClientClaim(payload: unknown) { return flagCheck(payload, ['client_claim":true'], 'client_claim_true') }
export function validateNoPartnershipClaim(payload: unknown) { return flagCheck(payload, ['partnership_claim":true'], 'partnership_claim_true') }
export function validateNoRegulatoryValidationClaim(payload: unknown) { return flagCheck(payload, ['regulatory_validation_claim":true', 'regulatory_authorization_claim":true'], 'regulatory_validation_true') }
export function validateNoDiagnosticTruthClaim(payload: unknown) { return flagCheck(payload, ['diagnostic_truth_certification_claimed":true', 'diagnostic_truth_certification_claim":true'], 'diagnostic_truth_true') }
export function validateNoRealRevenueClaim(payload: unknown) { return denylistCheck(payload, SCALE_GATE_REAL_CLAIM_DENYLIST, ['real_revenue_claimed":true']) }
export function validateNoRealBillingClaim(payload: unknown) { return flagCheck(payload, ['real_billing_claimed":true'], 'real_billing_true') }
export function buildInstitutionalScaleGateExportPayload(): SenseTrustInstitutionalScaleGateExportPayload { return { ...SIMULATED_INSTITUTIONAL_SCALE_GATE_EXPORT_PAYLOAD, state: createDefaultInstitutionalReadinessScaleGateState() } }
export function validateInstitutionalScaleGateExportPayload(payload = buildInstitutionalScaleGateExportPayload()) { const checks = [validateInstitutionalReadinessGates(payload.state), validateStrategicScaleGates(payload.state), validateScaleDecisionBoards(payload.state), validateScaleDecisions(payload.state), validateMarketPrioritizationMatrices(payload.state), validateRegulatoryReadinessMaps(payload.state), validateInstitutionalRiskGovernanceMaps(payload.state), validateScaleCandidateScores(payload.state), validateV3StrategicRoadmaps(payload.state), validateStrategicPartnerFitMatrices(payload.state), validateGovernanceToScaleAuditTrail(payload.state), validateStrategicScaleMisuseBlockers(payload.state), validateNoClinicalDataExposure(payload.state), validateNoPatientData(payload.state), validateNoPersonalSensitiveData(payload.state), validateNoRealClinicalOperationClaim(payload.state), validateNoContractBindingClaim(payload.state), validateNoClientClaim(payload.state), validateNoPartnershipClaim(payload.state), validateNoRegulatoryValidationClaim(payload.state), validateNoDiagnosticTruthClaim(payload.state), validateNoRealRevenueClaim(payload.state), validateNoRealBillingClaim(payload.state)]; const errors = checks.flatMap((check) => check.errors); return { valid: errors.length === 0, errors } }
export function assertScaleGateMetadataOnly(payload: { metadata_only?: boolean }) { if (!payload.metadata_only) throw new Error('scale_gate_not_metadata_only'); return { valid: true, errors: [] } }
export function assertScaleGateNoSensitiveExposure(payload: unknown) { return assertValid(validateNoClinicalDataExposure(payload), 'scale_gate_sensitive_exposure') }
export function assertScaleGateNoLegalBinding(payload: unknown) { return assertValid(validateNoContractBindingClaim(payload), 'scale_gate_legal_binding') }
export function assertScaleGateNoRegulatoryAuthorization(payload: unknown) { return assertValid(validateNoRegulatoryValidationClaim(payload), 'scale_gate_regulatory_authorization') }
export function assertScaleGateNoCommercialCommitment(payload: unknown) { return assertValid(validateNoClientClaim(payload), 'scale_gate_commercial_commitment') }
export function assertScaleGateNoClinicalOperation(payload: unknown) { return assertValid(validateNoRealClinicalOperationClaim(payload), 'scale_gate_clinical_operation') }
export function assertScaleGateNoDiagnosticTruthCertification(payload: unknown) { return assertValid(validateNoDiagnosticTruthClaim(payload), 'scale_gate_diagnostic_truth') }
export function linkScaleGateToPilotCloseout() { return 'SenseTrust Institutional Pilot Closeout v2.8' }
export function linkScaleGateToLearningLoop() { return 'SenseTrust Learning Loop v2.8' }
export function linkScaleGateToV3ReadinessMatrix() { return 'SenseTrust V3 Readiness Matrix v2.8' }
export function linkScaleGateToPilotCertificate() { return 'SenseTrust Pilot Certificate Verification Preview v2.7' }
export function linkScaleGateToMOC() { return ['MOC_SenseTrust', 'MOC_VitalStrata_SenseTrust', 'MOC_NeuroStrata_Trust_Layer', 'MOC_DNDA_Trust_Object', 'MOC_BLC_Rastreabilidade'] }

function cloneArrayFields<T extends Record<string, unknown>>(item: T, keys: string[]): T { const copy = { ...item }; keys.forEach((key) => { const value = item[key]; if (Array.isArray(value)) copy[key as keyof T] = [...value] as T[keyof T] }); return copy }
function countCheck(actual: number, expected: number, label: string): SenseTrustInstitutionalScaleGateValidationResult { return { valid: actual >= expected, errors: actual >= expected ? [] : [`${label}_count_below_${expected}`] } }
function denylistCheck(payload: unknown, denylist: string[], flags: string[] = []): SenseTrustInstitutionalScaleGateValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); const errors = [...denylist.filter((term) => serialized.includes(term.toLowerCase())), ...flags.filter((flag) => serialized.includes(flag.toLowerCase()))]; return { valid: errors.length === 0, errors } }
function flagCheck(payload: unknown, flags: string[], error: string): SenseTrustInstitutionalScaleGateValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); return { valid: !flags.some((flag) => serialized.includes(flag.toLowerCase())), errors: flags.some((flag) => serialized.includes(flag.toLowerCase())) ? [error] : [] } }
function assertValid(result: SenseTrustInstitutionalScaleGateValidationResult, label: string) { if (!result.valid) throw new Error(`${label}: ${result.errors.join(', ')}`); return result }
