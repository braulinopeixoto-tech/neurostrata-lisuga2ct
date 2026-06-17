import {
  CLOSEOUT_REAL_CLAIM_DENYLIST, CLOSEOUT_REFERENCES, CLOSEOUT_SENSITIVE_DENYLIST, SIMULATED_CLOSEOUT_AUDIT_TRAIL, SIMULATED_CLOSEOUT_DECISION_BOARDS, SIMULATED_CLOSEOUT_DECISIONS, SIMULATED_CLOSEOUT_MISUSE_BLOCKERS, SIMULATED_EVIDENCE_TO_LEARNING_MAPS, SIMULATED_INSTITUTIONAL_CLOSEOUT_EXPORT_PAYLOAD, SIMULATED_INSTITUTIONAL_CLOSEOUT_EXECUTIVE_REPORTS, SIMULATED_INSTITUTIONAL_MATURITY_MATRICES, SIMULATED_INSTITUTIONAL_PILOT_CLOSEOUT_REPORTS, SIMULATED_INSTITUTIONAL_PILOT_CLOSEOUT_STATE, SIMULATED_LEARNING_LOOP_ITEMS, SIMULATED_LEARNING_LOOP_REGISTERS, SIMULATED_LESSONS_LEARNED_MATRICES, SIMULATED_PILOT_OUTCOME_SUMMARIES, SIMULATED_REGULATORY_PENDING_ITEMS, SIMULATED_V3_READINESS_MATRICES, closeoutHash,
} from '@/fixtures/sensetrust/simulated-institutional-pilot-closeout'
import type { SenseTrustCloseoutDecisionType, SenseTrustCloseoutStatusType, SenseTrustInstitutionalCloseoutExportPayload, SenseTrustInstitutionalCloseoutValidationResult, SenseTrustInstitutionalMaturityLevel, SenseTrustInstitutionalPilotCloseoutState, SenseTrustLearningCategoryType } from '@/types/sensetrust/institutional-pilot-closeout'

export function createInstitutionalPilotCloseoutState() { return createDefaultInstitutionalPilotCloseoutState() }
export function createInstitutionalPilotCloseoutReport() { return { ...SIMULATED_INSTITUTIONAL_PILOT_CLOSEOUT_REPORTS[0] } }
export function createLearningLoopRegister() { return { ...SIMULATED_LEARNING_LOOP_REGISTERS[0], items: SIMULATED_LEARNING_LOOP_REGISTERS[0].items.map((item) => ({ ...item })) } }
export function createLearningLoopItem() { return { ...SIMULATED_LEARNING_LOOP_ITEMS[0] } }
export function createLessonsLearnedMatrix() { return cloneArrayFields(SIMULATED_LESSONS_LEARNED_MATRICES[0], ['lessons']) }
export function createInstitutionalMaturityMatrix() { return cloneArrayFields(SIMULATED_INSTITUTIONAL_MATURITY_MATRICES[0], ['gaps']) }
export function createCloseoutDecisionBoard() { return { ...SIMULATED_CLOSEOUT_DECISION_BOARDS[0], decisions: SIMULATED_CLOSEOUT_DECISION_BOARDS[0].decisions.map((item) => cloneArrayFields(item, ['required_reviews', 'blocked_actions'])) } }
export function createCloseoutDecision() { return cloneArrayFields(SIMULATED_CLOSEOUT_DECISIONS[0], ['required_reviews', 'blocked_actions']) }
export function createRegulatoryPendingItem() { return cloneArrayFields(SIMULATED_REGULATORY_PENDING_ITEMS[0], ['blockers']) }
export function createPilotOutcomeSummary() { return { ...SIMULATED_PILOT_OUTCOME_SUMMARIES[0] } }
export function createEvidenceToLearningMap() { return { ...SIMULATED_EVIDENCE_TO_LEARNING_MAPS[0] } }
export function createV3ReadinessMatrix() { return { ...SIMULATED_V3_READINESS_MATRICES[0] } }
export function createCloseoutAuditTrailItem() { return { ...SIMULATED_CLOSEOUT_AUDIT_TRAIL[0] } }
export function createCloseoutMisuseBlocker() { return { ...SIMULATED_CLOSEOUT_MISUSE_BLOCKERS[0] } }
export function createInstitutionalCloseoutExecutiveReport() { return { ...SIMULATED_INSTITUTIONAL_CLOSEOUT_EXECUTIVE_REPORTS[0] } }
export function createDefaultInstitutionalPilotCloseoutReports() { return SIMULATED_INSTITUTIONAL_PILOT_CLOSEOUT_REPORTS.map((item) => ({ ...item })) }
export function createDefaultLearningLoopRegisters() { return SIMULATED_LEARNING_LOOP_REGISTERS.map((item) => ({ ...item, items: item.items.map((child) => ({ ...child })) })) }
export function createDefaultLearningLoopItems() { return SIMULATED_LEARNING_LOOP_ITEMS.map((item) => ({ ...item })) }
export function createDefaultLessonsLearnedMatrices() { return SIMULATED_LESSONS_LEARNED_MATRICES.map((item) => cloneArrayFields(item, ['lessons'])) }
export function createDefaultInstitutionalMaturityMatrices() { return SIMULATED_INSTITUTIONAL_MATURITY_MATRICES.map((item) => cloneArrayFields(item, ['gaps'])) }
export function createDefaultCloseoutDecisionBoards() { return SIMULATED_CLOSEOUT_DECISION_BOARDS.map((item) => ({ ...item, decisions: item.decisions.map((decision) => cloneArrayFields(decision, ['required_reviews', 'blocked_actions'])) })) }
export function createDefaultCloseoutDecisions() { return SIMULATED_CLOSEOUT_DECISIONS.map((item) => cloneArrayFields(item, ['required_reviews', 'blocked_actions'])) }
export function createDefaultRegulatoryPendingItems() { return SIMULATED_REGULATORY_PENDING_ITEMS.map((item) => cloneArrayFields(item, ['blockers'])) }
export function createDefaultPilotOutcomeSummaries() { return SIMULATED_PILOT_OUTCOME_SUMMARIES.map((item) => ({ ...item })) }
export function createDefaultEvidenceToLearningMaps() { return SIMULATED_EVIDENCE_TO_LEARNING_MAPS.map((item) => ({ ...item })) }
export function createDefaultV3ReadinessMatrices() { return SIMULATED_V3_READINESS_MATRICES.map((item) => ({ ...item })) }
export function createDefaultCloseoutAuditTrail() { return SIMULATED_CLOSEOUT_AUDIT_TRAIL.map((item) => ({ ...item })) }
export function createDefaultCloseoutMisuseBlockers() { return SIMULATED_CLOSEOUT_MISUSE_BLOCKERS.map((item) => ({ ...item })) }
export function createDefaultInstitutionalCloseoutExecutiveReports() { return SIMULATED_INSTITUTIONAL_CLOSEOUT_EXECUTIVE_REPORTS.map((item) => ({ ...item })) }
export function createDefaultInstitutionalPilotCloseoutState(): SenseTrustInstitutionalPilotCloseoutState { return { ...SIMULATED_INSTITUTIONAL_PILOT_CLOSEOUT_STATE, closeout_reports: createDefaultInstitutionalPilotCloseoutReports(), learning_loop_registers: createDefaultLearningLoopRegisters(), learning_loop_items: createDefaultLearningLoopItems(), lessons_learned_matrices: createDefaultLessonsLearnedMatrices(), institutional_maturity_matrices: createDefaultInstitutionalMaturityMatrices(), closeout_decision_boards: createDefaultCloseoutDecisionBoards(), closeout_decisions: createDefaultCloseoutDecisions(), regulatory_pending_items: createDefaultRegulatoryPendingItems(), pilot_outcome_summaries: createDefaultPilotOutcomeSummaries(), evidence_to_learning_maps: createDefaultEvidenceToLearningMaps(), v3_readiness_matrices: createDefaultV3ReadinessMatrices(), closeout_audit_trail: createDefaultCloseoutAuditTrail(), closeout_misuse_blockers: createDefaultCloseoutMisuseBlockers(), executive_reports: createDefaultInstitutionalCloseoutExecutiveReports(), references: [...CLOSEOUT_REFERENCES] } }
export function generateLogicalCloseoutHash(seed = 'closeout') { return `logical-${seed}-${seed.length * 31}` }
export function generateLogicalCloseoutDecisionHash(seed = 'decision') { return `logical-${seed}-${seed.length * 37}` }
export function buildPilotOutcomeSummary() { return createPilotOutcomeSummary() }
export function buildLessonsLearnedMatrix() { return createLessonsLearnedMatrix() }
export function buildInstitutionalMaturityMatrix() { return createInstitutionalMaturityMatrix() }
export function buildCloseoutDecisionBoard() { return createCloseoutDecisionBoard() }
export function buildEvidenceToLearningMap() { return createEvidenceToLearningMap() }
export function buildV3ReadinessMatrix() { return createV3ReadinessMatrix() }
export function buildCloseoutAuditTrail() { return createDefaultCloseoutAuditTrail() }
export function classifyCloseoutStatus(score = 70): SenseTrustCloseoutStatusType { if (score >= 85) return 'v3_candidate'; if (score >= 60) return 'learning_loop_open'; return 'paused' }
export function classifyLearningCategory(category: SenseTrustLearningCategoryType = 'governance') { return category }
export function classifyMaturityLevel(score = 60): SenseTrustInstitutionalMaturityLevel { if (score >= 85) return 'scale_candidate'; if (score >= 70) return 'pilot_ready'; if (score >= 55) return 'governed'; return 'structured' }
export function classifyCloseoutDecision(score = 60): SenseTrustCloseoutDecisionType { if (score >= 80) return 'go'; if (score >= 50) return 'refine'; return 'pause' }
export function calculateCloseoutReadinessScore(evidence = 70, learning = 60) { return Math.round((evidence + learning) / 2) }
export function calculateInstitutionalMaturityScore(score = 65) { return score }
export function calculateV3ReadinessScore(score = 62) { return score }
export function calculateRegulatoryPendingRiskScore(pending = 3) { return Math.min(100, pending * 18) }
export function validateInstitutionalPilotCloseoutReports(state = createDefaultInstitutionalPilotCloseoutState()) { return countCheck(state.closeout_reports.length, 8, 'closeout_reports') }
export function validateLearningLoopItems(state = createDefaultInstitutionalPilotCloseoutState()) { return countCheck(state.learning_loop_items.length, 40, 'learning_loop_items') }
export function validateLessonsLearnedMatrices(state = createDefaultInstitutionalPilotCloseoutState()) { return countCheck(state.lessons_learned_matrices.length, 8, 'lessons_learned_matrices') }
export function validateInstitutionalMaturityMatrices(state = createDefaultInstitutionalPilotCloseoutState()) { return countCheck(state.institutional_maturity_matrices.length, 8, 'institutional_maturity_matrices') }
export function validateCloseoutDecisionBoards(state = createDefaultInstitutionalPilotCloseoutState()) { return countCheck(state.closeout_decision_boards.length, 8, 'closeout_decision_boards') }
export function validateCloseoutDecisions(state = createDefaultInstitutionalPilotCloseoutState()) { return countCheck(state.closeout_decisions.length, 16, 'closeout_decisions') }
export function validateRegulatoryPendingItems(state = createDefaultInstitutionalPilotCloseoutState()) { return countCheck(state.regulatory_pending_items.length, 24, 'regulatory_pending_items') }
export function validateEvidenceToLearningMaps(state = createDefaultInstitutionalPilotCloseoutState()) { return countCheck(state.evidence_to_learning_maps.length, 8, 'evidence_to_learning_maps') }
export function validateV3ReadinessMatrices(state = createDefaultInstitutionalPilotCloseoutState()) { return countCheck(state.v3_readiness_matrices.length, 8, 'v3_readiness_matrices') }
export function validateCloseoutAuditTrail(state = createDefaultInstitutionalPilotCloseoutState()) { return countCheck(state.closeout_audit_trail.length, 24, 'closeout_audit_trail') }
export function validateCloseoutMisuseBlockers(state = createDefaultInstitutionalPilotCloseoutState()) { return countCheck(state.closeout_misuse_blockers.length, 16, 'closeout_misuse_blockers') }
export function validateNoClinicalDataExposure(payload: unknown) { return denylistCheck(payload, CLOSEOUT_SENSITIVE_DENYLIST, ['clinical_data_used":true', 'contains_clinical_data":true']) }
export function validateNoPatientData(payload: unknown) { return flagCheck(payload, ['patient_data_used":true', 'contains_patient_data":true'], 'patient_data_true') }
export function validateNoPersonalSensitiveData(payload: unknown) { return flagCheck(payload, ['personal_sensitive_data_used":true', 'contains_personal_sensitive_data":true'], 'personal_sensitive_data_true') }
export function validateNoRealClinicalOperationClaim(payload: unknown) { return flagCheck(payload, ['real_clinical_operation_claimed":true', 'real_clinical_operation_claim":true'], 'real_clinical_operation_true') }
export function validateNoLegalCloseoutClaim(payload: unknown) { return flagCheck(payload, ['legal_closeout_claimed":true', 'legal_closeout_claim":true', 'legal_decision_claim":true'], 'legal_closeout_true') }
export function validateNoContractBindingClaim(payload: unknown) { return flagCheck(payload, ['contract_binding_claimed":true', 'contract_binding_claim":true'], 'contract_binding_true') }
export function validateNoClientClaim(payload: unknown) { return flagCheck(payload, ['client_claim":true'], 'client_claim_true') }
export function validateNoPartnershipClaim(payload: unknown) { return flagCheck(payload, ['partnership_claim":true'], 'partnership_claim_true') }
export function validateNoRegulatoryValidationClaim(payload: unknown) { return flagCheck(payload, ['regulatory_validation_claim":true', 'regulatory_authorization_claim":true'], 'regulatory_validation_true') }
export function validateNoDiagnosticTruthClaim(payload: unknown) { return flagCheck(payload, ['diagnostic_truth_certification_claimed":true', 'diagnostic_truth_certification_claim":true'], 'diagnostic_truth_true') }
export function validateNoRealRevenueClaim(payload: unknown) { return denylistCheck(payload, CLOSEOUT_REAL_CLAIM_DENYLIST, ['real_revenue_claimed":true']) }
export function validateNoRealBillingClaim(payload: unknown) { return flagCheck(payload, ['real_billing_claimed":true'], 'real_billing_true') }
export function buildInstitutionalCloseoutExportPayload(): SenseTrustInstitutionalCloseoutExportPayload { return { ...SIMULATED_INSTITUTIONAL_CLOSEOUT_EXPORT_PAYLOAD, state: createDefaultInstitutionalPilotCloseoutState() } }
export function validateInstitutionalCloseoutExportPayload(payload = buildInstitutionalCloseoutExportPayload()) { const checks = [validateInstitutionalPilotCloseoutReports(payload.state), validateLearningLoopItems(payload.state), validateLessonsLearnedMatrices(payload.state), validateInstitutionalMaturityMatrices(payload.state), validateCloseoutDecisionBoards(payload.state), validateCloseoutDecisions(payload.state), validateRegulatoryPendingItems(payload.state), validateEvidenceToLearningMaps(payload.state), validateV3ReadinessMatrices(payload.state), validateCloseoutAuditTrail(payload.state), validateCloseoutMisuseBlockers(payload.state), validateNoClinicalDataExposure(payload.state), validateNoPatientData(payload.state), validateNoPersonalSensitiveData(payload.state), validateNoRealClinicalOperationClaim(payload.state), validateNoLegalCloseoutClaim(payload.state), validateNoContractBindingClaim(payload.state), validateNoClientClaim(payload.state), validateNoPartnershipClaim(payload.state), validateNoRegulatoryValidationClaim(payload.state), validateNoDiagnosticTruthClaim(payload.state), validateNoRealRevenueClaim(payload.state), validateNoRealBillingClaim(payload.state)]; const errors = checks.flatMap((check) => check.errors); return { valid: errors.length === 0, errors } }
export function assertCloseoutMetadataOnly(payload: { metadata_only?: boolean }) { if (!payload.metadata_only) throw new Error('closeout_not_metadata_only'); return { valid: true, errors: [] } }
export function assertCloseoutNoSensitiveExposure(payload: unknown) { return assertValid(validateNoClinicalDataExposure(payload), 'closeout_sensitive_exposure') }
export function assertCloseoutNoLegalBinding(payload: unknown) { return assertValid(validateNoLegalCloseoutClaim(payload), 'closeout_legal_binding') }
export function assertCloseoutNoRegulatoryAuthorization(payload: unknown) { return assertValid(validateNoRegulatoryValidationClaim(payload), 'closeout_regulatory_authorization') }
export function assertCloseoutNoClinicalOutcomeClaim(payload: unknown) { return assertValid(validateNoRealClinicalOperationClaim(payload), 'closeout_clinical_outcome') }
export function assertCloseoutNoDiagnosticTruthCertification(payload: unknown) { return assertValid(validateNoDiagnosticTruthClaim(payload), 'closeout_diagnostic_truth') }
export function linkCloseoutToPilotCertificate() { return 'SenseTrust Pilot Certificate Verification Preview v2.7' }
export function linkCloseoutToEvidenceVault() { return 'SenseTrust Pilot Evidence Vault v2.6' }
export function linkCloseoutToAcceptanceLedger() { return 'SenseTrust Acceptance Ledger v2.6' }
export function linkCloseoutToInstitutionalPilot() { return 'SenseTrust Institutional Pilot Control Room v2.5' }
export function linkCloseoutToMOC() { return ['MOC_SenseTrust', 'MOC_VitalStrata_SenseTrust', 'MOC_NeuroStrata_Trust_Layer', 'MOC_DNDA_Trust_Object', 'MOC_BLC_Rastreabilidade'] }
function cloneArrayFields<T extends Record<string, unknown>>(item: T, keys: string[]): T { const copy = { ...item }; keys.forEach((key) => { const value = item[key]; if (Array.isArray(value)) copy[key as keyof T] = [...value] as T[keyof T] }); return copy }
function countCheck(actual: number, expected: number, label: string): SenseTrustInstitutionalCloseoutValidationResult { return { valid: actual >= expected, errors: actual >= expected ? [] : [`${label}_count_below_${expected}`] } }
function denylistCheck(payload: unknown, denylist: string[], flags: string[] = []): SenseTrustInstitutionalCloseoutValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); const errors = [...denylist.filter((term) => serialized.includes(term.toLowerCase())), ...flags.filter((flag) => serialized.includes(flag.toLowerCase()))]; return { valid: errors.length === 0, errors } }
function flagCheck(payload: unknown, flags: string[], error: string): SenseTrustInstitutionalCloseoutValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); return { valid: !flags.some((flag) => serialized.includes(flag.toLowerCase())), errors: flags.some((flag) => serialized.includes(flag.toLowerCase())) ? [error] : [] } }
function assertValid(result: SenseTrustInstitutionalCloseoutValidationResult, label: string) { if (!result.valid) throw new Error(`${label}: ${result.errors.join(', ')}`); return result }
