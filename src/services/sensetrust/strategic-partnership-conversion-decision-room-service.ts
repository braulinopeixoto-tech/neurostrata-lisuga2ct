import { PARTNERSHIP_CONVERSION_REFERENCES, PARTNERSHIP_CONVERSION_SENSITIVE_DENYLIST, SIMULATED_CONVERSION_AUDIT_TRAILS, SIMULATED_CONVERSION_AUDIT_TRAIL_ITEMS, SIMULATED_CONVERSION_BOUNDARY_CLAIMS_GUARDRAILS, SIMULATED_CONVERSION_BOUNDARY_CLAIMS_GUARDRAIL_ITEMS, SIMULATED_CONVERSION_DECISION_BOARDS, SIMULATED_CONVERSION_DECISION_ITEMS, SIMULATED_CONVERSION_QUALIFICATION_MATRICES, SIMULATED_CONVERSION_QUALIFICATION_MATRIX_ITEMS, SIMULATED_CONVERSION_READINESS_SCORECARDS, SIMULATED_CONVERSION_READINESS_SCORE_ITEMS, SIMULATED_CONVERSION_RISK_ITEMS, SIMULATED_CONVERSION_RISK_REGISTERS, SIMULATED_DUE_DILIGENCE_READINESS_BOARDS, SIMULATED_DUE_DILIGENCE_READINESS_ITEMS, SIMULATED_HUMAN_REVIEW_CONVERSION_QUEUES, SIMULATED_HUMAN_REVIEW_CONVERSION_QUEUE_ITEMS, SIMULATED_LEGAL_REVIEW_ROUTING_BOARDS, SIMULATED_LEGAL_REVIEW_ROUTING_ITEMS, SIMULATED_NON_BINDING_INTENT_ITEMS, SIMULATED_NON_BINDING_INTENT_REGISTERS, SIMULATED_PARTNERSHIP_CONVERSION_CANDIDATES, SIMULATED_PARTNERSHIP_CONVERSION_EXECUTIVE_REPORTS, SIMULATED_PARTNERSHIP_CONVERSION_ROOMS, SIMULATED_REGULATORY_REVIEW_ROUTING_BOARDS, SIMULATED_REGULATORY_REVIEW_ROUTING_ITEMS, SIMULATED_SCIENTIFIC_REVIEW_ROUTING_BOARDS, SIMULATED_SCIENTIFIC_REVIEW_ROUTING_ITEMS, SIMULATED_STRATEGIC_PARTNERSHIP_CONVERSION_DECISION_ROOM_STATE, SIMULATED_STRATEGIC_PARTNERSHIP_CONVERSION_EXPORT_PAYLOAD } from '@/fixtures/sensetrust/simulated-strategic-partnership-conversion-decision-room'
import type { SenseTrustConversionConfidenceLevel, SenseTrustConversionDecision, SenseTrustConversionRiskLevel, SenseTrustPartnershipConversionStage, SenseTrustPartnershipConversionStatus, SenseTrustReviewRoutingType, SenseTrustStrategicPartnershipConversionDecisionRoomState, SenseTrustStrategicPartnershipConversionExportPayload, SenseTrustStrategicPartnershipConversionValidationResult } from '@/types/sensetrust/strategic-partnership-conversion-decision-room'

export function createStrategicPartnershipConversionDecisionRoomState() { return createDefaultStrategicPartnershipConversionDecisionRoomState() }
export function createStrategicPartnershipConversionDecisionRoom() { return cloneArrayFields(SIMULATED_PARTNERSHIP_CONVERSION_ROOMS[0], ['blocked_actions', 'required_reviews']) }
export function createPartnershipConversionCandidate() { return cloneArrayFields(SIMULATED_PARTNERSHIP_CONVERSION_CANDIDATES[0], ['required_reviews', 'blocked_actions']) }
export function createConversionQualificationMatrix() { return withItems(SIMULATED_CONVERSION_QUALIFICATION_MATRICES[0]) }
export function createConversionQualificationMatrixItem() { return { ...SIMULATED_CONVERSION_QUALIFICATION_MATRIX_ITEMS[0] } }
export function createNonBindingIntentRegister() { return withItems(SIMULATED_NON_BINDING_INTENT_REGISTERS[0]) }
export function createNonBindingIntentItem() { return { ...SIMULATED_NON_BINDING_INTENT_ITEMS[0] } }
export function createPartnershipDueDiligenceReadinessBoard() { return withItems(SIMULATED_DUE_DILIGENCE_READINESS_BOARDS[0]) }
export function createPartnershipDueDiligenceReadinessItem() { return { ...SIMULATED_DUE_DILIGENCE_READINESS_ITEMS[0] } }
export function createLegalReviewRoutingBoard() { return withItems(SIMULATED_LEGAL_REVIEW_ROUTING_BOARDS[0]) }
export function createLegalReviewRoutingItem() { return { ...SIMULATED_LEGAL_REVIEW_ROUTING_ITEMS[0] } }
export function createScientificReviewRoutingBoard() { return withItems(SIMULATED_SCIENTIFIC_REVIEW_ROUTING_BOARDS[0]) }
export function createScientificReviewRoutingItem() { return { ...SIMULATED_SCIENTIFIC_REVIEW_ROUTING_ITEMS[0] } }
export function createRegulatoryReviewRoutingBoard() { return withItems(SIMULATED_REGULATORY_REVIEW_ROUTING_BOARDS[0]) }
export function createRegulatoryReviewRoutingItem() { return { ...SIMULATED_REGULATORY_REVIEW_ROUTING_ITEMS[0] } }
export function createConversionRiskRegister() { return withItems(SIMULATED_CONVERSION_RISK_REGISTERS[0]) }
export function createConversionRiskItem() { return { ...SIMULATED_CONVERSION_RISK_ITEMS[0] } }
export function createConversionDecisionBoard() { return withItems(SIMULATED_CONVERSION_DECISION_BOARDS[0]) }
export function createConversionDecisionItem() { return { ...SIMULATED_CONVERSION_DECISION_ITEMS[0] } }
export function createConversionReadinessScorecard() { return withItems(SIMULATED_CONVERSION_READINESS_SCORECARDS[0]) }
export function createConversionReadinessScoreItem() { return { ...SIMULATED_CONVERSION_READINESS_SCORE_ITEMS[0] } }
export function createHumanReviewConversionQueue() { return withItems(SIMULATED_HUMAN_REVIEW_CONVERSION_QUEUES[0]) }
export function createHumanReviewConversionQueueItem() { return { ...SIMULATED_HUMAN_REVIEW_CONVERSION_QUEUE_ITEMS[0] } }
export function createConversionBoundaryClaimsGuardrail() { return withItems(SIMULATED_CONVERSION_BOUNDARY_CLAIMS_GUARDRAILS[0]) }
export function createConversionBoundaryClaimsGuardrailItem() { return { ...SIMULATED_CONVERSION_BOUNDARY_CLAIMS_GUARDRAIL_ITEMS[0] } }
export function createConversionAuditTrail() { return withItems(SIMULATED_CONVERSION_AUDIT_TRAILS[0]) }
export function createConversionAuditTrailItem() { return { ...SIMULATED_CONVERSION_AUDIT_TRAIL_ITEMS[0] } }
export function createStrategicPartnershipConversionExecutiveReport() { return { ...SIMULATED_PARTNERSHIP_CONVERSION_EXECUTIVE_REPORTS[0] } }
export function createDefaultStrategicPartnershipConversionDecisionRooms() { return SIMULATED_PARTNERSHIP_CONVERSION_ROOMS.map((x) => cloneArrayFields(x, ['blocked_actions', 'required_reviews'])) }
export function createDefaultPartnershipConversionCandidates() { return SIMULATED_PARTNERSHIP_CONVERSION_CANDIDATES.map((x) => cloneArrayFields(x, ['required_reviews', 'blocked_actions'])) }
export function createDefaultConversionQualificationMatrices() { return SIMULATED_CONVERSION_QUALIFICATION_MATRICES.map(withItems) }
export function createDefaultNonBindingIntentRegisters() { return SIMULATED_NON_BINDING_INTENT_REGISTERS.map(withItems) }
export function createDefaultPartnershipDueDiligenceReadinessBoards() { return SIMULATED_DUE_DILIGENCE_READINESS_BOARDS.map(withItems) }
export function createDefaultLegalReviewRoutingBoards() { return SIMULATED_LEGAL_REVIEW_ROUTING_BOARDS.map(withItems) }
export function createDefaultScientificReviewRoutingBoards() { return SIMULATED_SCIENTIFIC_REVIEW_ROUTING_BOARDS.map(withItems) }
export function createDefaultRegulatoryReviewRoutingBoards() { return SIMULATED_REGULATORY_REVIEW_ROUTING_BOARDS.map(withItems) }
export function createDefaultConversionRiskRegisters() { return SIMULATED_CONVERSION_RISK_REGISTERS.map(withItems) }
export function createDefaultConversionDecisionBoards() { return SIMULATED_CONVERSION_DECISION_BOARDS.map(withItems) }
export function createDefaultConversionReadinessScorecards() { return SIMULATED_CONVERSION_READINESS_SCORECARDS.map(withItems) }
export function createDefaultHumanReviewConversionQueues() { return SIMULATED_HUMAN_REVIEW_CONVERSION_QUEUES.map(withItems) }
export function createDefaultConversionBoundaryClaimsGuardrails() { return SIMULATED_CONVERSION_BOUNDARY_CLAIMS_GUARDRAILS.map(withItems) }
export function createDefaultConversionAuditTrails() { return SIMULATED_CONVERSION_AUDIT_TRAILS.map(withItems) }
export function createDefaultStrategicPartnershipConversionExecutiveReports() { return SIMULATED_PARTNERSHIP_CONVERSION_EXECUTIVE_REPORTS.map((x) => ({ ...x })) }
export function createDefaultStrategicPartnershipConversionDecisionRoomState(): SenseTrustStrategicPartnershipConversionDecisionRoomState { return { ...SIMULATED_STRATEGIC_PARTNERSHIP_CONVERSION_DECISION_ROOM_STATE, rooms: createDefaultStrategicPartnershipConversionDecisionRooms(), candidates: createDefaultPartnershipConversionCandidates(), qualification_matrices: createDefaultConversionQualificationMatrices(), qualification_matrix_items: SIMULATED_CONVERSION_QUALIFICATION_MATRIX_ITEMS.map((x) => ({ ...x })), intent_registers: createDefaultNonBindingIntentRegisters(), intent_items: SIMULATED_NON_BINDING_INTENT_ITEMS.map((x) => ({ ...x })), due_diligence_boards: createDefaultPartnershipDueDiligenceReadinessBoards(), due_diligence_items: SIMULATED_DUE_DILIGENCE_READINESS_ITEMS.map((x) => ({ ...x })), legal_review_boards: createDefaultLegalReviewRoutingBoards(), legal_review_items: SIMULATED_LEGAL_REVIEW_ROUTING_ITEMS.map((x) => ({ ...x })), scientific_review_boards: createDefaultScientificReviewRoutingBoards(), scientific_review_items: SIMULATED_SCIENTIFIC_REVIEW_ROUTING_ITEMS.map((x) => ({ ...x })), regulatory_review_boards: createDefaultRegulatoryReviewRoutingBoards(), regulatory_review_items: SIMULATED_REGULATORY_REVIEW_ROUTING_ITEMS.map((x) => ({ ...x })), risk_registers: createDefaultConversionRiskRegisters(), risk_items: SIMULATED_CONVERSION_RISK_ITEMS.map((x) => ({ ...x })), decision_boards: createDefaultConversionDecisionBoards(), decision_items: SIMULATED_CONVERSION_DECISION_ITEMS.map((x) => ({ ...x })), readiness_scorecards: createDefaultConversionReadinessScorecards(), readiness_score_items: SIMULATED_CONVERSION_READINESS_SCORE_ITEMS.map((x) => ({ ...x })), human_review_queues: createDefaultHumanReviewConversionQueues(), human_review_queue_items: SIMULATED_HUMAN_REVIEW_CONVERSION_QUEUE_ITEMS.map((x) => ({ ...x })), boundary_claims_guardrails: createDefaultConversionBoundaryClaimsGuardrails(), boundary_claims_guardrail_items: SIMULATED_CONVERSION_BOUNDARY_CLAIMS_GUARDRAIL_ITEMS.map((x) => ({ ...x })), audit_trails: createDefaultConversionAuditTrails(), audit_trail_items: SIMULATED_CONVERSION_AUDIT_TRAIL_ITEMS.map((x) => ({ ...x })), executive_reports: createDefaultStrategicPartnershipConversionExecutiveReports(), references: [...PARTNERSHIP_CONVERSION_REFERENCES] } }
export function generateLogicalPartnershipConversionHash(seed = 'partnership-conversion') { return `logical-${seed}-${seed.length * 83}` }
export function buildStrategicPartnershipConversionDecisionRoom() { return createStrategicPartnershipConversionDecisionRoom() }
export function buildPartnershipConversionCandidate() { return createPartnershipConversionCandidate() }
export function buildConversionQualificationMatrix() { return createConversionQualificationMatrix() }
export function buildNonBindingIntentRegister() { return createNonBindingIntentRegister() }
export function buildPartnershipDueDiligenceReadinessBoard() { return createPartnershipDueDiligenceReadinessBoard() }
export function buildLegalReviewRoutingBoard() { return createLegalReviewRoutingBoard() }
export function buildScientificReviewRoutingBoard() { return createScientificReviewRoutingBoard() }
export function buildRegulatoryReviewRoutingBoard() { return createRegulatoryReviewRoutingBoard() }
export function buildConversionRiskRegister() { return createConversionRiskRegister() }
export function buildConversionDecisionBoard() { return createConversionDecisionBoard() }
export function buildConversionReadinessScorecard() { return createConversionReadinessScorecard() }
export function buildHumanReviewConversionQueue() { return createHumanReviewConversionQueue() }
export function buildConversionBoundaryClaimsGuardrail() { return createConversionBoundaryClaimsGuardrail() }
export function buildConversionAuditTrail() { return createConversionAuditTrail() }
export function classifyPartnershipConversionStage(score = 50): SenseTrustPartnershipConversionStage { if (score >= 85) return 'decision_ready'; if (score >= 65) return 'due_diligence_ready'; if (score >= 45) return 'qualification_review'; return 'human_review_required' }
export function classifyPartnershipConversionStatus(score = 50): SenseTrustPartnershipConversionStatus { if (score >= 85) return 'due_diligence_ready'; if (score >= 65) return 'conversion_candidate'; if (score >= 45) return 'ready_for_review'; return 'refine_required' }
export function classifyConversionDecision(score = 50): SenseTrustConversionDecision { if (score >= 85) return 'prepare_non_binding_brief'; if (score >= 65) return 'require_human_review'; if (score >= 45) return 'refine'; return 'pause' }
export function classifyConversionRiskLevel(score = 50): SenseTrustConversionRiskLevel { if (score >= 85) return 'critical'; if (score >= 65) return 'high'; if (score >= 35) return 'medium'; return 'low' }
export function classifyConversionConfidenceLevel(level: SenseTrustConversionConfidenceLevel = 'simulated_only') { return level }
export function classifyReviewRoutingType(type: SenseTrustReviewRoutingType = 'human_review') { return type }
export function calculateConversionQualificationScore(score = 55) { return clamp(score) }
export function calculateDueDiligenceReadinessScore(score = 55) { return clamp(score) }
export function calculateLegalReviewNeedScore(score = 55) { return clamp(score) }
export function calculateScientificReviewNeedScore(score = 55) { return clamp(score) }
export function calculateRegulatoryReviewNeedScore(score = 55) { return clamp(score) }
export function calculateConversionRiskScore(score = 45) { return clamp(score) }
export function calculateConversionReadinessScore(score = 55) { return clamp(score) }
export function calculateHumanReviewConversionNeedScore(score = 55) { return clamp(score) }
export const validateStrategicPartnershipConversionDecisionRooms = (s = createDefaultStrategicPartnershipConversionDecisionRoomState()) => countCheck(s.rooms.length, 8, 'rooms')
export const validatePartnershipConversionCandidates = (s = createDefaultStrategicPartnershipConversionDecisionRoomState()) => countCheck(s.candidates.length, 24, 'candidates')
export const validateConversionQualificationMatrices = (s = createDefaultStrategicPartnershipConversionDecisionRoomState()) => countCheck(s.qualification_matrices.length, 8, 'qualification_matrices')
export const validateNonBindingIntentRegisters = (s = createDefaultStrategicPartnershipConversionDecisionRoomState()) => countCheck(s.intent_registers.length, 8, 'intent_registers')
export const validatePartnershipDueDiligenceReadinessBoards = (s = createDefaultStrategicPartnershipConversionDecisionRoomState()) => countCheck(s.due_diligence_boards.length, 8, 'due_diligence_boards')
export const validateLegalReviewRoutingBoards = (s = createDefaultStrategicPartnershipConversionDecisionRoomState()) => countCheck(s.legal_review_boards.length, 8, 'legal_review_boards')
export const validateScientificReviewRoutingBoards = (s = createDefaultStrategicPartnershipConversionDecisionRoomState()) => countCheck(s.scientific_review_boards.length, 8, 'scientific_review_boards')
export const validateRegulatoryReviewRoutingBoards = (s = createDefaultStrategicPartnershipConversionDecisionRoomState()) => countCheck(s.regulatory_review_boards.length, 8, 'regulatory_review_boards')
export const validateConversionRiskRegisters = (s = createDefaultStrategicPartnershipConversionDecisionRoomState()) => countCheck(s.risk_registers.length, 8, 'risk_registers')
export const validateConversionDecisionBoards = (s = createDefaultStrategicPartnershipConversionDecisionRoomState()) => countCheck(s.decision_boards.length, 8, 'decision_boards')
export const validateConversionReadinessScorecards = (s = createDefaultStrategicPartnershipConversionDecisionRoomState()) => countCheck(s.readiness_scorecards.length, 8, 'readiness_scorecards')
export const validateHumanReviewConversionQueues = (s = createDefaultStrategicPartnershipConversionDecisionRoomState()) => countCheck(s.human_review_queues.length, 8, 'human_review_queues')
export const validateConversionBoundaryClaimsGuardrails = (s = createDefaultStrategicPartnershipConversionDecisionRoomState()) => countCheck(s.boundary_claims_guardrails.length, 8, 'boundary_claims_guardrails')
export const validateConversionAuditTrails = (s = createDefaultStrategicPartnershipConversionDecisionRoomState()) => countCheck(s.audit_trails.length, 8, 'audit_trails')
export function validateNoClinicalDataExposure(p: unknown) { return denylistCheck(p, PARTNERSHIP_CONVERSION_SENSITIVE_DENYLIST, ['clinical_data_used":true', 'contains_clinical_data":true']) }
export function validateNoPatientData(p: unknown) { return flagCheck(p, ['patient_data_used":true', 'contains_patient_data":true'], 'patient_data_true') }
export function validateNoPersonalSensitiveData(p: unknown) { return flagCheck(p, ['personal_sensitive_data_used":true', 'contains_personal_sensitive_data":true'], 'personal_sensitive_data_true') }
export function validateNoRealClinicalOperationClaim(p: unknown) { return flagCheck(p, ['real_clinical_operation_claimed":true', 'real_clinical_operation_claim":true'], 'real_clinical_operation_true') }
export function validateNoContractBindingClaim(p: unknown) { return flagCheck(p, ['contract_binding_claimed":true', 'contract_binding_claim":true'], 'contract_binding_true') }
export function validateNoClientClaim(p: unknown) { return flagCheck(p, ['client_claim":true'], 'client_claim_true') }
export function validateNoPartnershipClaim(p: unknown) { return flagCheck(p, ['partnership_claim":true', 'real_partner_claim":true'], 'partnership_claim_true') }
export function validateNoRegulatoryValidationClaim(p: unknown) { return flagCheck(p, ['regulatory_validation_claim":true', 'regulatory_authorization_claim":true'], 'regulatory_validation_true') }
export function validateNoDiagnosticTruthClaim(p: unknown) { return flagCheck(p, ['diagnostic_truth_certification_claimed":true', 'diagnostic_truth_certification_claim":true'], 'diagnostic_truth_true') }
export function validateNoRealRevenueClaim(p: unknown) { return flagCheck(p, ['real_revenue_claimed":true', 'real_revenue_claim":true'], 'real_revenue_true') }
export function validateNoRealBillingClaim(p: unknown) { return flagCheck(p, ['real_billing_claimed":true', 'real_billing_claim":true'], 'real_billing_true') }
export function validateNoRealImpactClaim(p: unknown) { return flagCheck(p, ['real_impact_claimed":true', 'real_impact_claim":true'], 'real_impact_true') }
export function validateNoRealCapacityClaim(p: unknown) { return flagCheck(p, ['real_capacity_claimed":true', 'real_capacity_claim":true'], 'real_capacity_true') }
export function validateNoRealScientificValidationClaim(p: unknown) { return flagCheck(p, ['real_scientific_validation_claimed":true', 'real_scientific_validation_claim":true', 'scientific_validation_claim":true'], 'scientific_validation_true') }
export function validateNoExternalCertificationClaim(p: unknown) { return flagCheck(p, ['external_certification_claimed":true', 'external_certification_claim":true'], 'external_certification_true') }
export function validateNoRealCrmClaim(p: unknown) { return flagCheck(p, ['real_crm_claimed":true', 'real_crm_claim":true'], 'real_crm_true') }
export function validateNoRealEmailAutomationClaim(p: unknown) { return flagCheck(p, ['real_email_automation_claimed":true', 'real_email_automation_claim":true'], 'real_email_automation_true') }
export function validateNoBindingProposalClaim(p: unknown) { return flagCheck(p, ['binding_proposal_claimed":true', 'binding_proposal_claim":true'], 'binding_proposal_true') }
export function validateNoCommercialCommitmentClaim(p: unknown) { return flagCheck(p, ['commercial_commitment_claimed":true', 'commercial_commitment_claim":true'], 'commercial_commitment_true') }
export function validateNoLegalCommitmentClaim(p: unknown) { return flagCheck(p, ['legal_commitment_claimed":true', 'legal_commitment_claim":true'], 'legal_commitment_true') }
export function buildStrategicPartnershipConversionExportPayload(): SenseTrustStrategicPartnershipConversionExportPayload { return { ...SIMULATED_STRATEGIC_PARTNERSHIP_CONVERSION_EXPORT_PAYLOAD, state: createDefaultStrategicPartnershipConversionDecisionRoomState() } }
export function validateStrategicPartnershipConversionExportPayload(payload = buildStrategicPartnershipConversionExportPayload()) { const checks = [validateStrategicPartnershipConversionDecisionRooms(payload.state), validatePartnershipConversionCandidates(payload.state), validateConversionQualificationMatrices(payload.state), validateNonBindingIntentRegisters(payload.state), validatePartnershipDueDiligenceReadinessBoards(payload.state), validateLegalReviewRoutingBoards(payload.state), validateScientificReviewRoutingBoards(payload.state), validateRegulatoryReviewRoutingBoards(payload.state), validateConversionRiskRegisters(payload.state), validateConversionDecisionBoards(payload.state), validateConversionReadinessScorecards(payload.state), validateHumanReviewConversionQueues(payload.state), validateConversionBoundaryClaimsGuardrails(payload.state), validateConversionAuditTrails(payload.state), validateNoClinicalDataExposure(payload.state), validateNoPatientData(payload.state), validateNoPersonalSensitiveData(payload.state), validateNoRealClinicalOperationClaim(payload.state), validateNoContractBindingClaim(payload.state), validateNoClientClaim(payload.state), validateNoPartnershipClaim(payload.state), validateNoRegulatoryValidationClaim(payload.state), validateNoDiagnosticTruthClaim(payload.state), validateNoRealRevenueClaim(payload.state), validateNoRealBillingClaim(payload.state), validateNoRealImpactClaim(payload.state), validateNoRealCapacityClaim(payload.state), validateNoRealScientificValidationClaim(payload.state), validateNoExternalCertificationClaim(payload.state), validateNoRealCrmClaim(payload.state), validateNoRealEmailAutomationClaim(payload.state), validateNoBindingProposalClaim(payload.state), validateNoCommercialCommitmentClaim(payload.state), validateNoLegalCommitmentClaim(payload.state)]; const errors = checks.flatMap((x) => x.errors); return { valid: errors.length === 0, errors } }
export function assertPartnershipConversionMetadataOnly(p: { metadata_only?: boolean }) { if (!p.metadata_only) throw new Error('partnership_conversion_not_metadata_only'); return { valid: true, errors: [] } }
export const assertPartnershipConversionNoSensitiveExposure = (p: unknown) => assertValid(validateNoClinicalDataExposure(p), 'conversion_sensitive_exposure')
export const assertPartnershipConversionNoLegalBinding = (p: unknown) => assertValid(validateNoContractBindingClaim(p), 'conversion_legal_binding')
export const assertPartnershipConversionNoRegulatoryAuthorization = (p: unknown) => assertValid(validateNoRegulatoryValidationClaim(p), 'conversion_regulatory_authorization')
export const assertPartnershipConversionNoCommercialCommitment = (p: unknown) => assertValid(validateNoCommercialCommitmentClaim(p), 'conversion_commercial_commitment')
export const assertPartnershipConversionNoClinicalOperation = (p: unknown) => assertValid(validateNoRealClinicalOperationClaim(p), 'conversion_clinical_operation')
export const assertPartnershipConversionNoDiagnosticTruthCertification = (p: unknown) => assertValid(validateNoDiagnosticTruthClaim(p), 'conversion_diagnostic_truth')
export const assertPartnershipConversionNoRealImpact = (p: unknown) => assertValid(validateNoRealImpactClaim(p), 'conversion_real_impact')
export const assertPartnershipConversionNoRealCapacity = (p: unknown) => assertValid(validateNoRealCapacityClaim(p), 'conversion_real_capacity')
export const assertPartnershipConversionNoScientificValidation = (p: unknown) => assertValid(validateNoRealScientificValidationClaim(p), 'conversion_scientific_validation')
export const assertPartnershipConversionNoExternalCertification = (p: unknown) => assertValid(validateNoExternalCertificationClaim(p), 'conversion_external_certification')
export const assertPartnershipConversionNoRealCrm = (p: unknown) => assertValid(validateNoRealCrmClaim(p), 'conversion_real_crm')
export const assertPartnershipConversionNoRealEmailAutomation = (p: unknown) => assertValid(validateNoRealEmailAutomationClaim(p), 'conversion_real_email')
export const assertPartnershipConversionNoBindingProposal = (p: unknown) => assertValid(validateNoBindingProposalClaim(p), 'conversion_binding_proposal')
export const linkPartnershipConversionToPartnerEngagement = () => 'SenseTrust Strategic Partner Engagement Control Room v3.5'
export const linkPartnershipConversionToPartnerReadiness = () => 'SenseTrust Strategic Partner Readiness Room v3.4'
export const linkPartnershipConversionToEvidenceSimulator = () => 'SenseTrust Strategic Scale Evidence Simulator v3.3'
export const linkPartnershipConversionToSimulationConsole = () => 'SenseTrust Strategic Scale Simulation Console v3.2'
export const linkPartnershipConversionToOperatingModel = () => 'SenseTrust Strategic Scale Operating Model v3.1'
export const linkPartnershipConversionToGitFreezeAutomation = () => 'SenseTrust Git Freeze Automation Memory v1.1 FETCH_HEAD ACL Recovery'
export const linkPartnershipConversionToMOC = () => ['MOC_SenseTrust', 'MOC_VitalStrata_SenseTrust', 'MOC_NeuroStrata_Trust_Layer', 'MOC_DNDA_Trust_Object', 'MOC_BLC_Rastreabilidade']
function withItems<T extends { items: unknown[] }>(x: T): T { return { ...x, items: x.items.map((i) => ({ ...(i as Record<string, unknown>) })) } }
function cloneArrayFields<T extends Record<string, unknown>>(item: T, keys: string[]): T { const copy = { ...item }; keys.forEach((key) => { const value = item[key]; if (Array.isArray(value)) copy[key as keyof T] = [...value] as T[keyof T] }); return copy }
function clamp(score: number) { return Math.max(0, Math.min(100, score)) }
function countCheck(actual: number, expected: number, label: string): SenseTrustStrategicPartnershipConversionValidationResult { return { valid: actual >= expected, errors: actual >= expected ? [] : [`${label}_count_below_${expected}`] } }
function denylistCheck(payload: unknown, denylist: string[], flags: string[] = []): SenseTrustStrategicPartnershipConversionValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); const errors = [...denylist.filter((term) => serialized.includes(term.toLowerCase())), ...flags.filter((flag) => serialized.includes(flag.toLowerCase()))]; return { valid: errors.length === 0, errors } }
function flagCheck(payload: unknown, flags: string[], error: string): SenseTrustStrategicPartnershipConversionValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); return { valid: !flags.some((flag) => serialized.includes(flag.toLowerCase())), errors: flags.some((flag) => serialized.includes(flag.toLowerCase())) ? [error] : [] } }
function assertValid(result: SenseTrustStrategicPartnershipConversionValidationResult, label: string) { if (!result.valid) throw new Error(`${label}: ${result.errors.join(', ')}`); return result }
