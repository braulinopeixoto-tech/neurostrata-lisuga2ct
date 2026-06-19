import * as fixtures from '@/fixtures/sensetrust/simulated-strategic-partnership-pilot-proposal-room'
import type {
  SenseTrustPilotProposalConfidenceLevel,
  SenseTrustPilotProposalDecision,
  SenseTrustPilotProposalRiskLevel,
  SenseTrustPilotProposalStage,
  SenseTrustPilotProposalStatus,
  SenseTrustPilotReviewRoutingType,
  SenseTrustStrategicPartnershipPilotProposalExportPayload,
  SenseTrustStrategicPartnershipPilotProposalRoomState,
  SenseTrustStrategicPartnershipPilotProposalValidationResult,
} from '@/types/sensetrust/strategic-partnership-pilot-proposal-room'

export function createStrategicPartnershipPilotProposalRoomState() { return createDefaultStrategicPartnershipPilotProposalRoomState() }
export function createStrategicPartnershipPilotProposalRoom() { return cloneArrayFields(fixtures.SIMULATED_PILOT_PROPOSAL_ROOMS[0], ['blocked_actions', 'required_reviews']) }
export function createPilotProposalCandidate() { return cloneArrayFields(fixtures.SIMULATED_PILOT_PROPOSAL_CANDIDATES[0], ['required_reviews', 'blocked_actions']) }
export function createNonBindingPilotScopeMatrix() { return withItems(fixtures.SIMULATED_NON_BINDING_SCOPE_MATRICES[0]) }
export function createNonBindingPilotScopeMatrixItem() { return { ...fixtures.SIMULATED_NON_BINDING_SCOPE_ITEMS[0] } }
export function createPilotValueHypothesisCanvas() { return withItems(fixtures.SIMULATED_VALUE_HYPOTHESIS_CANVASES[0]) }
export function createPilotValueHypothesisItem() { return { ...fixtures.SIMULATED_VALUE_HYPOTHESIS_ITEMS[0] } }
export function createPilotEntryCriteriaBoard() { return withItems(fixtures.SIMULATED_ENTRY_CRITERIA_BOARDS[0]) }
export function createPilotEntryCriteriaItem() { return { ...fixtures.SIMULATED_ENTRY_CRITERIA_ITEMS[0] } }
export function createPilotExitCriteriaBoard() { return withItems(fixtures.SIMULATED_EXIT_CRITERIA_BOARDS[0]) }
export function createPilotExitCriteriaItem() { return { ...fixtures.SIMULATED_EXIT_CRITERIA_ITEMS[0] } }
export function createPilotResponsibilityMatrix() { return withItems(fixtures.SIMULATED_RESPONSIBILITY_MATRICES[0]) }
export function createPilotResponsibilityMatrixItem() { return { ...fixtures.SIMULATED_RESPONSIBILITY_ITEMS[0] } }
export function createPilotEvidenceRequirementMap() { return withItems(fixtures.SIMULATED_EVIDENCE_REQUIREMENT_MAPS[0]) }
export function createPilotEvidenceRequirementItem() { return { ...fixtures.SIMULATED_EVIDENCE_REQUIREMENT_ITEMS[0] } }
export function createPilotRiskInterruptionRegister() { return withItems(fixtures.SIMULATED_RISK_INTERRUPTION_REGISTERS[0]) }
export function createPilotRiskInterruptionItem() { return { ...fixtures.SIMULATED_RISK_INTERRUPTION_ITEMS[0] } }
export function createPilotLegalReviewQueue() { return withItems(fixtures.SIMULATED_LEGAL_REVIEW_QUEUES[0]) }
export function createPilotLegalReviewQueueItem() { return { ...fixtures.SIMULATED_LEGAL_REVIEW_ITEMS[0] } }
export function createPilotScientificReviewQueue() { return withItems(fixtures.SIMULATED_SCIENTIFIC_REVIEW_QUEUES[0]) }
export function createPilotScientificReviewQueueItem() { return { ...fixtures.SIMULATED_SCIENTIFIC_REVIEW_ITEMS[0] } }
export function createPilotRegulatoryReviewQueue() { return withItems(fixtures.SIMULATED_REGULATORY_REVIEW_QUEUES[0]) }
export function createPilotRegulatoryReviewQueueItem() { return { ...fixtures.SIMULATED_REGULATORY_REVIEW_ITEMS[0] } }
export function createPilotHumanReviewBoard() { return withItems(fixtures.SIMULATED_HUMAN_REVIEW_BOARDS[0]) }
export function createPilotHumanReviewBoardItem() { return { ...fixtures.SIMULATED_HUMAN_REVIEW_ITEMS[0] } }
export function createPilotBoundaryClaimsGuardrail() { return withItems(fixtures.SIMULATED_BOUNDARY_CLAIMS_GUARDRAILS[0]) }
export function createPilotBoundaryClaimsGuardrailItem() { return { ...fixtures.SIMULATED_BOUNDARY_CLAIMS_GUARDRAIL_ITEMS[0] } }
export function createPilotProposalAuditTrail() { return withItems(fixtures.SIMULATED_PROPOSAL_AUDIT_TRAILS[0]) }
export function createPilotProposalAuditTrailItem() { return { ...fixtures.SIMULATED_PROPOSAL_AUDIT_TRAIL_ITEMS[0] } }
export function createStrategicPartnershipPilotProposalExecutiveReport() { return { ...fixtures.SIMULATED_PILOT_PROPOSAL_EXECUTIVE_REPORTS[0] } }

export const createDefaultStrategicPartnershipPilotProposalRooms = () => fixtures.SIMULATED_PILOT_PROPOSAL_ROOMS.map((x) => cloneArrayFields(x, ['blocked_actions', 'required_reviews']))
export const createDefaultPilotProposalCandidates = () => fixtures.SIMULATED_PILOT_PROPOSAL_CANDIDATES.map((x) => cloneArrayFields(x, ['required_reviews', 'blocked_actions']))
export const createDefaultNonBindingPilotScopeMatrices = () => fixtures.SIMULATED_NON_BINDING_SCOPE_MATRICES.map(withItems)
export const createDefaultPilotValueHypothesisCanvases = () => fixtures.SIMULATED_VALUE_HYPOTHESIS_CANVASES.map(withItems)
export const createDefaultPilotEntryCriteriaBoards = () => fixtures.SIMULATED_ENTRY_CRITERIA_BOARDS.map(withItems)
export const createDefaultPilotExitCriteriaBoards = () => fixtures.SIMULATED_EXIT_CRITERIA_BOARDS.map(withItems)
export const createDefaultPilotResponsibilityMatrices = () => fixtures.SIMULATED_RESPONSIBILITY_MATRICES.map(withItems)
export const createDefaultPilotEvidenceRequirementMaps = () => fixtures.SIMULATED_EVIDENCE_REQUIREMENT_MAPS.map(withItems)
export const createDefaultPilotRiskInterruptionRegisters = () => fixtures.SIMULATED_RISK_INTERRUPTION_REGISTERS.map(withItems)
export const createDefaultPilotLegalReviewQueues = () => fixtures.SIMULATED_LEGAL_REVIEW_QUEUES.map(withItems)
export const createDefaultPilotScientificReviewQueues = () => fixtures.SIMULATED_SCIENTIFIC_REVIEW_QUEUES.map(withItems)
export const createDefaultPilotRegulatoryReviewQueues = () => fixtures.SIMULATED_REGULATORY_REVIEW_QUEUES.map(withItems)
export const createDefaultPilotHumanReviewBoards = () => fixtures.SIMULATED_HUMAN_REVIEW_BOARDS.map(withItems)
export const createDefaultPilotBoundaryClaimsGuardrails = () => fixtures.SIMULATED_BOUNDARY_CLAIMS_GUARDRAILS.map(withItems)
export const createDefaultPilotProposalAuditTrails = () => fixtures.SIMULATED_PROPOSAL_AUDIT_TRAILS.map(withItems)
export const createDefaultStrategicPartnershipPilotProposalExecutiveReports = () => fixtures.SIMULATED_PILOT_PROPOSAL_EXECUTIVE_REPORTS.map((x) => ({ ...x }))

export function createDefaultStrategicPartnershipPilotProposalRoomState(): SenseTrustStrategicPartnershipPilotProposalRoomState {
  return {
    ...fixtures.SIMULATED_STRATEGIC_PARTNERSHIP_PILOT_PROPOSAL_ROOM_STATE,
    rooms: createDefaultStrategicPartnershipPilotProposalRooms(),
    candidates: createDefaultPilotProposalCandidates(),
    scope_matrices: createDefaultNonBindingPilotScopeMatrices(),
    scope_matrix_items: fixtures.SIMULATED_NON_BINDING_SCOPE_ITEMS.map((x) => ({ ...x })),
    value_canvases: createDefaultPilotValueHypothesisCanvases(),
    value_items: fixtures.SIMULATED_VALUE_HYPOTHESIS_ITEMS.map((x) => ({ ...x })),
    entry_boards: createDefaultPilotEntryCriteriaBoards(),
    entry_items: fixtures.SIMULATED_ENTRY_CRITERIA_ITEMS.map((x) => ({ ...x })),
    exit_boards: createDefaultPilotExitCriteriaBoards(),
    exit_items: fixtures.SIMULATED_EXIT_CRITERIA_ITEMS.map((x) => ({ ...x })),
    responsibility_matrices: createDefaultPilotResponsibilityMatrices(),
    responsibility_items: fixtures.SIMULATED_RESPONSIBILITY_ITEMS.map((x) => ({ ...x })),
    evidence_maps: createDefaultPilotEvidenceRequirementMaps(),
    evidence_items: fixtures.SIMULATED_EVIDENCE_REQUIREMENT_ITEMS.map((x) => ({ ...x })),
    risk_registers: createDefaultPilotRiskInterruptionRegisters(),
    risk_items: fixtures.SIMULATED_RISK_INTERRUPTION_ITEMS.map((x) => ({ ...x })),
    legal_review_queues: createDefaultPilotLegalReviewQueues(),
    legal_review_items: fixtures.SIMULATED_LEGAL_REVIEW_ITEMS.map((x) => ({ ...x })),
    scientific_review_queues: createDefaultPilotScientificReviewQueues(),
    scientific_review_items: fixtures.SIMULATED_SCIENTIFIC_REVIEW_ITEMS.map((x) => ({ ...x })),
    regulatory_review_queues: createDefaultPilotRegulatoryReviewQueues(),
    regulatory_review_items: fixtures.SIMULATED_REGULATORY_REVIEW_ITEMS.map((x) => ({ ...x })),
    human_review_boards: createDefaultPilotHumanReviewBoards(),
    human_review_items: fixtures.SIMULATED_HUMAN_REVIEW_ITEMS.map((x) => ({ ...x })),
    boundary_claims_guardrails: createDefaultPilotBoundaryClaimsGuardrails(),
    boundary_claims_guardrail_items: fixtures.SIMULATED_BOUNDARY_CLAIMS_GUARDRAIL_ITEMS.map((x) => ({ ...x })),
    audit_trails: createDefaultPilotProposalAuditTrails(),
    audit_trail_items: fixtures.SIMULATED_PROPOSAL_AUDIT_TRAIL_ITEMS.map((x) => ({ ...x })),
    executive_reports: createDefaultStrategicPartnershipPilotProposalExecutiveReports(),
    references: [...fixtures.PILOT_PROPOSAL_REFERENCES],
  }
}

export function generateLogicalPilotProposalHash(seed = 'partnership-pilot-proposal') { return `logical-${seed}-${seed.length * 89}` }
export const buildStrategicPartnershipPilotProposalRoom = createStrategicPartnershipPilotProposalRoom
export const buildPilotProposalCandidate = createPilotProposalCandidate
export const buildNonBindingPilotScopeMatrix = createNonBindingPilotScopeMatrix
export const buildPilotValueHypothesisCanvas = createPilotValueHypothesisCanvas
export const buildPilotEntryCriteriaBoard = createPilotEntryCriteriaBoard
export const buildPilotExitCriteriaBoard = createPilotExitCriteriaBoard
export const buildPilotResponsibilityMatrix = createPilotResponsibilityMatrix
export const buildPilotEvidenceRequirementMap = createPilotEvidenceRequirementMap
export const buildPilotRiskInterruptionRegister = createPilotRiskInterruptionRegister
export const buildPilotLegalReviewQueue = createPilotLegalReviewQueue
export const buildPilotScientificReviewQueue = createPilotScientificReviewQueue
export const buildPilotRegulatoryReviewQueue = createPilotRegulatoryReviewQueue
export const buildPilotHumanReviewBoard = createPilotHumanReviewBoard
export const buildPilotBoundaryClaimsGuardrail = createPilotBoundaryClaimsGuardrail
export const buildPilotProposalAuditTrail = createPilotProposalAuditTrail
export function classifyPilotProposalStage(score = 50): SenseTrustPilotProposalStage { if (score >= 85) return 'proposal_ready_for_review'; if (score >= 65) return 'evidence_requirements_mapped'; if (score >= 45) return 'human_review_required'; return 'paused' }
export function classifyPilotProposalStatus(score = 50): SenseTrustPilotProposalStatus { if (score >= 85) return 'non_binding_scope_ready'; if (score >= 65) return 'ready_for_review'; if (score >= 45) return 'refine_required'; return 'paused' }
export function classifyPilotProposalDecision(score = 50): SenseTrustPilotProposalDecision { if (score >= 85) return 'prepare_non_binding_proposal'; if (score >= 65) return 'require_human_review'; if (score >= 45) return 'refine'; return 'pause' }
export function classifyPilotProposalRiskLevel(score = 50): SenseTrustPilotProposalRiskLevel { if (score >= 85) return 'critical'; if (score >= 65) return 'high'; if (score >= 35) return 'medium'; return 'low' }
export function classifyPilotProposalConfidenceLevel(level: SenseTrustPilotProposalConfidenceLevel = 'simulated_only') { return level }
export function classifyPilotReviewRoutingType(type: SenseTrustPilotReviewRoutingType = 'human_review') { return type }
export const calculateNonBindingPilotScopeScore = (score = 55) => clamp(score)
export const calculatePilotValueHypothesisScore = (score = 55) => clamp(score)
export const calculatePilotEntryCriteriaScore = (score = 55) => clamp(score)
export const calculatePilotExitCriteriaScore = (score = 55) => clamp(score)
export const calculatePilotEvidenceRequirementScore = (score = 55) => clamp(score)
export const calculatePilotRiskScore = (score = 45) => clamp(score)
export const calculatePilotLegalReviewNeedScore = (score = 55) => clamp(score)
export const calculatePilotScientificReviewNeedScore = (score = 55) => clamp(score)
export const calculatePilotRegulatoryReviewNeedScore = (score = 55) => clamp(score)

export const validateStrategicPartnershipPilotProposalRooms = (s = createDefaultStrategicPartnershipPilotProposalRoomState()) => countCheck(s.rooms.length, 8, 'rooms')
export const validatePilotProposalCandidates = (s = createDefaultStrategicPartnershipPilotProposalRoomState()) => countCheck(s.candidates.length, 24, 'candidates')
export const validateNonBindingPilotScopeMatrices = (s = createDefaultStrategicPartnershipPilotProposalRoomState()) => countCheck(s.scope_matrices.length, 8, 'scope_matrices')
export const validatePilotValueHypothesisCanvases = (s = createDefaultStrategicPartnershipPilotProposalRoomState()) => countCheck(s.value_canvases.length, 8, 'value_canvases')
export const validatePilotEntryCriteriaBoards = (s = createDefaultStrategicPartnershipPilotProposalRoomState()) => countCheck(s.entry_boards.length, 8, 'entry_boards')
export const validatePilotExitCriteriaBoards = (s = createDefaultStrategicPartnershipPilotProposalRoomState()) => countCheck(s.exit_boards.length, 8, 'exit_boards')
export const validatePilotResponsibilityMatrices = (s = createDefaultStrategicPartnershipPilotProposalRoomState()) => countCheck(s.responsibility_matrices.length, 8, 'responsibility_matrices')
export const validatePilotEvidenceRequirementMaps = (s = createDefaultStrategicPartnershipPilotProposalRoomState()) => countCheck(s.evidence_maps.length, 8, 'evidence_maps')
export const validatePilotRiskInterruptionRegisters = (s = createDefaultStrategicPartnershipPilotProposalRoomState()) => countCheck(s.risk_registers.length, 8, 'risk_registers')
export const validatePilotLegalReviewQueues = (s = createDefaultStrategicPartnershipPilotProposalRoomState()) => countCheck(s.legal_review_queues.length, 8, 'legal_review_queues')
export const validatePilotScientificReviewQueues = (s = createDefaultStrategicPartnershipPilotProposalRoomState()) => countCheck(s.scientific_review_queues.length, 8, 'scientific_review_queues')
export const validatePilotRegulatoryReviewQueues = (s = createDefaultStrategicPartnershipPilotProposalRoomState()) => countCheck(s.regulatory_review_queues.length, 8, 'regulatory_review_queues')
export const validatePilotHumanReviewBoards = (s = createDefaultStrategicPartnershipPilotProposalRoomState()) => countCheck(s.human_review_boards.length, 8, 'human_review_boards')
export const validatePilotBoundaryClaimsGuardrails = (s = createDefaultStrategicPartnershipPilotProposalRoomState()) => countCheck(s.boundary_claims_guardrails.length, 8, 'boundary_claims_guardrails')
export const validatePilotProposalAuditTrails = (s = createDefaultStrategicPartnershipPilotProposalRoomState()) => countCheck(s.audit_trails.length, 8, 'audit_trails')
export function validateNoClinicalDataExposure(p: unknown) { return denylistCheck(p, fixtures.PILOT_PROPOSAL_SENSITIVE_DENYLIST, ['clinical_data_used":true', 'contains_clinical_data":true']) }
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
export function validateNoRealLoiClaim(p: unknown) { return flagCheck(p, ['real_loi_claimed":true', 'real_loi_claim":true'], 'real_loi_true') }
export function validateNoRealMouClaim(p: unknown) { return flagCheck(p, ['real_mou_claimed":true', 'real_mou_claim":true'], 'real_mou_true') }

export function buildStrategicPartnershipPilotProposalExportPayload(): SenseTrustStrategicPartnershipPilotProposalExportPayload {
  return { ...fixtures.SIMULATED_STRATEGIC_PARTNERSHIP_PILOT_PROPOSAL_EXPORT_PAYLOAD, state: createDefaultStrategicPartnershipPilotProposalRoomState() }
}

export function validateStrategicPartnershipPilotProposalExportPayload(payload = buildStrategicPartnershipPilotProposalExportPayload()) {
  const checks = [validateStrategicPartnershipPilotProposalRooms(payload.state), validatePilotProposalCandidates(payload.state), validateNonBindingPilotScopeMatrices(payload.state), validatePilotValueHypothesisCanvases(payload.state), validatePilotEntryCriteriaBoards(payload.state), validatePilotExitCriteriaBoards(payload.state), validatePilotResponsibilityMatrices(payload.state), validatePilotEvidenceRequirementMaps(payload.state), validatePilotRiskInterruptionRegisters(payload.state), validatePilotLegalReviewQueues(payload.state), validatePilotScientificReviewQueues(payload.state), validatePilotRegulatoryReviewQueues(payload.state), validatePilotHumanReviewBoards(payload.state), validatePilotBoundaryClaimsGuardrails(payload.state), validatePilotProposalAuditTrails(payload.state), validateNoClinicalDataExposure(payload.state), validateNoPatientData(payload.state), validateNoPersonalSensitiveData(payload.state), validateNoRealClinicalOperationClaim(payload.state), validateNoContractBindingClaim(payload.state), validateNoClientClaim(payload.state), validateNoPartnershipClaim(payload.state), validateNoRegulatoryValidationClaim(payload.state), validateNoDiagnosticTruthClaim(payload.state), validateNoRealRevenueClaim(payload.state), validateNoRealBillingClaim(payload.state), validateNoRealImpactClaim(payload.state), validateNoRealCapacityClaim(payload.state), validateNoRealScientificValidationClaim(payload.state), validateNoExternalCertificationClaim(payload.state), validateNoRealCrmClaim(payload.state), validateNoRealEmailAutomationClaim(payload.state), validateNoBindingProposalClaim(payload.state), validateNoCommercialCommitmentClaim(payload.state), validateNoLegalCommitmentClaim(payload.state), validateNoRealLoiClaim(payload.state), validateNoRealMouClaim(payload.state)]
  const errors = checks.flatMap((x) => x.errors)
  return { valid: errors.length === 0, errors }
}

export function assertPilotProposalMetadataOnly(p: { metadata_only?: boolean }) { if (!p.metadata_only) throw new Error('pilot_proposal_not_metadata_only'); return { valid: true, errors: [] } }
export const assertPilotProposalNoSensitiveExposure = (p: unknown) => assertValid(validateNoClinicalDataExposure(p), 'pilot_proposal_sensitive_exposure')
export const assertPilotProposalNoLegalBinding = (p: unknown) => assertValid(validateNoContractBindingClaim(p), 'pilot_proposal_legal_binding')
export const assertPilotProposalNoRegulatoryAuthorization = (p: unknown) => assertValid(validateNoRegulatoryValidationClaim(p), 'pilot_proposal_regulatory_authorization')
export const assertPilotProposalNoCommercialCommitment = (p: unknown) => assertValid(validateNoCommercialCommitmentClaim(p), 'pilot_proposal_commercial_commitment')
export const assertPilotProposalNoClinicalOperation = (p: unknown) => assertValid(validateNoRealClinicalOperationClaim(p), 'pilot_proposal_clinical_operation')
export const assertPilotProposalNoDiagnosticTruthCertification = (p: unknown) => assertValid(validateNoDiagnosticTruthClaim(p), 'pilot_proposal_diagnostic_truth')
export const assertPilotProposalNoRealImpact = (p: unknown) => assertValid(validateNoRealImpactClaim(p), 'pilot_proposal_real_impact')
export const assertPilotProposalNoScientificValidation = (p: unknown) => assertValid(validateNoRealScientificValidationClaim(p), 'pilot_proposal_scientific_validation')
export const assertPilotProposalNoBindingProposal = (p: unknown) => assertValid(validateNoBindingProposalClaim(p), 'pilot_proposal_binding_proposal')
export const assertPilotProposalNoRealLoi = (p: unknown) => assertValid(validateNoRealLoiClaim(p), 'pilot_proposal_real_loi')
export const assertPilotProposalNoRealMou = (p: unknown) => assertValid(validateNoRealMouClaim(p), 'pilot_proposal_real_mou')
export const linkPilotProposalToConversionDecisionRoom = () => 'SenseTrust Strategic Partnership Conversion Decision Room v3.6'
export const linkPilotProposalToPartnerEngagement = () => 'SenseTrust Strategic Partner Engagement Control Room v3.5'
export const linkPilotProposalToPartnerReadiness = () => 'SenseTrust Strategic Partner Readiness Room v3.4'
export const linkPilotProposalToGitFreezeAutomation = () => 'SenseTrust Git Freeze Automation Memory v1.1 FETCH_HEAD ACL Recovery'

function withItems<T extends { items: unknown[] }>(x: T): T { return { ...x, items: x.items.map((i) => ({ ...(i as Record<string, unknown>) })) } }
function cloneArrayFields<T extends Record<string, unknown>>(item: T, keys: string[]): T { const copy = { ...item }; keys.forEach((key) => { const value = item[key]; if (Array.isArray(value)) copy[key as keyof T] = [...value] as T[keyof T] }); return copy }
function clamp(score: number) { return Math.max(0, Math.min(100, score)) }
function countCheck(actual: number, expected: number, label: string): SenseTrustStrategicPartnershipPilotProposalValidationResult { return { valid: actual >= expected, errors: actual >= expected ? [] : [`${label}_count_below_${expected}`] } }
function denylistCheck(payload: unknown, denylist: string[], flags: string[] = []): SenseTrustStrategicPartnershipPilotProposalValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); const errors = flags.filter((flag) => serialized.includes(flag.toLowerCase())); return { valid: errors.length === 0, errors } }
function flagCheck(payload: unknown, flags: string[], error: string): SenseTrustStrategicPartnershipPilotProposalValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); return { valid: !flags.some((flag) => serialized.includes(flag.toLowerCase())), errors: flags.some((flag) => serialized.includes(flag.toLowerCase())) ? [error] : [] } }
function assertValid(result: SenseTrustStrategicPartnershipPilotProposalValidationResult, label: string) { if (!result.valid) throw new Error(`${label}: ${result.errors.join(', ')}`); return result }
