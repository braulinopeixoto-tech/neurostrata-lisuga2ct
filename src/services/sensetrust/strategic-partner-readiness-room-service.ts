import { PARTNER_READINESS_REAL_CLAIM_DENYLIST, PARTNER_READINESS_REFERENCES, PARTNER_READINESS_SENSITIVE_DENYLIST, SIMULATED_DILIGENCE_CHECKLISTS, SIMULATED_DILIGENCE_ITEMS, SIMULATED_PARTNER_DECISION_ITEMS, SIMULATED_PARTNER_DECISION_PATHWAYS, SIMULATED_PARTNER_EVIDENCE_BRIEF_ITEMS, SIMULATED_PARTNER_EVIDENCE_BRIEFS, SIMULATED_PARTNER_EXECUTIVE_REPORTS, SIMULATED_PARTNER_FIT_ITEMS, SIMULATED_PARTNER_FIT_MATRICES, SIMULATED_PARTNER_FOLLOW_UP_GOVERNANCE, SIMULATED_PARTNER_FOLLOW_UP_ITEMS, SIMULATED_PARTNER_HUMAN_REVIEW_ITEMS, SIMULATED_PARTNER_HUMAN_REVIEW_QUEUES, SIMULATED_PARTNER_MEETING_ITEMS, SIMULATED_PARTNER_MEETING_KITS, SIMULATED_PARTNER_MISUSE_BLOCKERS, SIMULATED_PARTNER_OBJECTION_ITEMS, SIMULATED_PARTNER_OBJECTION_MAPS, SIMULATED_PARTNER_PROFILES, SIMULATED_PARTNER_READINESS_ROOMS, SIMULATED_PARTNER_RISK_BOARDS, SIMULATED_PARTNER_RISK_ITEMS, SIMULATED_PARTNER_SCORECARDS, SIMULATED_PARTNER_SCORE_ITEMS, SIMULATED_STRATEGIC_PARTNER_READINESS_EXPORT_PAYLOAD, SIMULATED_STRATEGIC_PARTNER_READINESS_ROOM_STATE } from '@/fixtures/sensetrust/simulated-strategic-partner-readiness-room'
import type { SenseTrustPartnerConfidenceLevel, SenseTrustPartnerDecisionType, SenseTrustPartnerFitLevel, SenseTrustPartnerReadinessStatus, SenseTrustPartnerRiskLevel, SenseTrustStrategicPartnerReadinessExportPayload, SenseTrustStrategicPartnerReadinessRoomState, SenseTrustStrategicPartnerReadinessValidationResult } from '@/types/sensetrust/strategic-partner-readiness-room'

export function createStrategicPartnerReadinessRoomState() { return createDefaultStrategicPartnerReadinessRoomState() }
export function createStrategicPartnerReadinessRoom() { return cloneArrayFields(SIMULATED_PARTNER_READINESS_ROOMS[0], ['blocked_actions', 'required_reviews']) }
export function createPartnerReadinessProfile() { return cloneArrayFields(SIMULATED_PARTNER_PROFILES[0], ['required_reviews', 'blocked_actions']) }
export function createPartnerFitMatrix() { return { ...SIMULATED_PARTNER_FIT_MATRICES[0], items: SIMULATED_PARTNER_FIT_MATRICES[0].items.map((x) => ({ ...x })) } }
export function createPartnerFitMatrixItem() { return { ...SIMULATED_PARTNER_FIT_ITEMS[0] } }
export function createStrategicDiligenceChecklist() { return { ...SIMULATED_DILIGENCE_CHECKLISTS[0], items: SIMULATED_DILIGENCE_CHECKLISTS[0].items.map((x) => ({ ...x })) } }
export function createStrategicDiligenceChecklistItem() { return { ...SIMULATED_DILIGENCE_ITEMS[0] } }
export function createPartnerEvidenceBrief() { return cloneArrayFields({ ...SIMULATED_PARTNER_EVIDENCE_BRIEFS[0], evidence_items: SIMULATED_PARTNER_EVIDENCE_BRIEFS[0].evidence_items.map((x) => ({ ...x })) }, ['evidence_gaps', 'proof_risks', 'prohibited_claims', 'required_disclaimers']) }
export function createPartnerEvidenceBriefItem() { return { ...SIMULATED_PARTNER_EVIDENCE_BRIEF_ITEMS[0] } }
export function createPartnerObjectionMap() { return { ...SIMULATED_PARTNER_OBJECTION_MAPS[0], items: SIMULATED_PARTNER_OBJECTION_MAPS[0].items.map((x) => ({ ...x })) } }
export function createPartnerObjectionItem() { return { ...SIMULATED_PARTNER_OBJECTION_ITEMS[0] } }
export function createPartnerRiskReviewBoard() { return { ...SIMULATED_PARTNER_RISK_BOARDS[0], items: SIMULATED_PARTNER_RISK_BOARDS[0].items.map((x) => ({ ...x })) } }
export function createPartnerRiskReviewItem() { return { ...SIMULATED_PARTNER_RISK_ITEMS[0] } }
export function createPartnerReadinessScorecard() { return { ...SIMULATED_PARTNER_SCORECARDS[0], items: SIMULATED_PARTNER_SCORECARDS[0].items.map((x) => ({ ...x })) } }
export function createPartnerReadinessScoreItem() { return { ...SIMULATED_PARTNER_SCORE_ITEMS[0] } }
export function createPartnerDecisionPathway() { return { ...SIMULATED_PARTNER_DECISION_PATHWAYS[0], items: SIMULATED_PARTNER_DECISION_PATHWAYS[0].items.map((x) => ({ ...x })) } }
export function createPartnerDecisionPathwayItem() { return { ...SIMULATED_PARTNER_DECISION_ITEMS[0] } }
export function createPartnerHumanReviewQueue() { return { ...SIMULATED_PARTNER_HUMAN_REVIEW_QUEUES[0], items: SIMULATED_PARTNER_HUMAN_REVIEW_QUEUES[0].items.map((x) => ({ ...x })) } }
export function createPartnerHumanReviewQueueItem() { return { ...SIMULATED_PARTNER_HUMAN_REVIEW_ITEMS[0] } }
export function createPartnerMeetingPreparationKit() { return { ...SIMULATED_PARTNER_MEETING_KITS[0], items: SIMULATED_PARTNER_MEETING_KITS[0].items.map((x) => ({ ...x })) } }
export function createPartnerMeetingPreparationItem() { return { ...SIMULATED_PARTNER_MEETING_ITEMS[0] } }
export function createPartnerFollowUpGovernance() { return { ...SIMULATED_PARTNER_FOLLOW_UP_GOVERNANCE[0], items: SIMULATED_PARTNER_FOLLOW_UP_GOVERNANCE[0].items.map((x) => ({ ...x })) } }
export function createPartnerFollowUpGovernanceItem() { return { ...SIMULATED_PARTNER_FOLLOW_UP_ITEMS[0] } }
export function createPartnerMisuseBlocker() { return { ...SIMULATED_PARTNER_MISUSE_BLOCKERS[0] } }
export function createStrategicPartnerReadinessExecutiveReport() { return { ...SIMULATED_PARTNER_EXECUTIVE_REPORTS[0] } }
export function createDefaultPartnerReadinessRooms() { return SIMULATED_PARTNER_READINESS_ROOMS.map((x) => cloneArrayFields(x, ['blocked_actions', 'required_reviews'])) }
export function createDefaultPartnerReadinessProfiles() { return SIMULATED_PARTNER_PROFILES.map((x) => cloneArrayFields(x, ['required_reviews', 'blocked_actions'])) }
export function createDefaultPartnerFitMatrices() { return SIMULATED_PARTNER_FIT_MATRICES.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultStrategicDiligenceChecklists() { return SIMULATED_DILIGENCE_CHECKLISTS.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultPartnerEvidenceBriefs() { return SIMULATED_PARTNER_EVIDENCE_BRIEFS.map((x) => cloneArrayFields({ ...x, evidence_items: x.evidence_items.map((i) => ({ ...i })) }, ['evidence_gaps', 'proof_risks', 'prohibited_claims', 'required_disclaimers'])) }
export function createDefaultPartnerObjectionMaps() { return SIMULATED_PARTNER_OBJECTION_MAPS.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultPartnerRiskReviewBoards() { return SIMULATED_PARTNER_RISK_BOARDS.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultPartnerReadinessScorecards() { return SIMULATED_PARTNER_SCORECARDS.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultPartnerDecisionPathways() { return SIMULATED_PARTNER_DECISION_PATHWAYS.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultPartnerHumanReviewQueues() { return SIMULATED_PARTNER_HUMAN_REVIEW_QUEUES.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultPartnerMeetingPreparationKits() { return SIMULATED_PARTNER_MEETING_KITS.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultPartnerFollowUpGovernance() { return SIMULATED_PARTNER_FOLLOW_UP_GOVERNANCE.map((x) => ({ ...x, items: x.items.map((i) => ({ ...i })) })) }
export function createDefaultPartnerMisuseBlockers() { return SIMULATED_PARTNER_MISUSE_BLOCKERS.map((x) => ({ ...x })) }
export function createDefaultStrategicPartnerReadinessExecutiveReports() { return SIMULATED_PARTNER_EXECUTIVE_REPORTS.map((x) => ({ ...x })) }
export function createDefaultStrategicPartnerReadinessRoomState(): SenseTrustStrategicPartnerReadinessRoomState { return { ...SIMULATED_STRATEGIC_PARTNER_READINESS_ROOM_STATE, rooms: createDefaultPartnerReadinessRooms(), profiles: createDefaultPartnerReadinessProfiles(), fit_matrices: createDefaultPartnerFitMatrices(), fit_matrix_items: SIMULATED_PARTNER_FIT_ITEMS.map((x) => ({ ...x })), diligence_checklists: createDefaultStrategicDiligenceChecklists(), diligence_items: SIMULATED_DILIGENCE_ITEMS.map((x) => ({ ...x })), evidence_briefs: createDefaultPartnerEvidenceBriefs(), evidence_brief_items: SIMULATED_PARTNER_EVIDENCE_BRIEF_ITEMS.map((x) => ({ ...x })), objection_maps: createDefaultPartnerObjectionMaps(), objection_items: SIMULATED_PARTNER_OBJECTION_ITEMS.map((x) => ({ ...x })), risk_review_boards: createDefaultPartnerRiskReviewBoards(), risk_review_items: SIMULATED_PARTNER_RISK_ITEMS.map((x) => ({ ...x })), scorecards: createDefaultPartnerReadinessScorecards(), score_items: SIMULATED_PARTNER_SCORE_ITEMS.map((x) => ({ ...x })), decision_pathways: createDefaultPartnerDecisionPathways(), decision_pathway_items: SIMULATED_PARTNER_DECISION_ITEMS.map((x) => ({ ...x })), human_review_queues: createDefaultPartnerHumanReviewQueues(), human_review_queue_items: SIMULATED_PARTNER_HUMAN_REVIEW_ITEMS.map((x) => ({ ...x })), meeting_preparation_kits: createDefaultPartnerMeetingPreparationKits(), meeting_preparation_items: SIMULATED_PARTNER_MEETING_ITEMS.map((x) => ({ ...x })), follow_up_governance: createDefaultPartnerFollowUpGovernance(), follow_up_governance_items: SIMULATED_PARTNER_FOLLOW_UP_ITEMS.map((x) => ({ ...x })), misuse_blockers: createDefaultPartnerMisuseBlockers(), executive_reports: createDefaultStrategicPartnerReadinessExecutiveReports(), references: [...PARTNER_READINESS_REFERENCES] } }
export function generateLogicalPartnerReadinessHash(seed = 'partner-readiness') { return `logical-${seed}-${seed.length * 73}` }
export function buildStrategicPartnerReadinessRoom() { return createStrategicPartnerReadinessRoom() }
export function buildPartnerReadinessProfile() { return createPartnerReadinessProfile() }
export function buildPartnerFitMatrix() { return createPartnerFitMatrix() }
export function buildStrategicDiligenceChecklist() { return createStrategicDiligenceChecklist() }
export function buildPartnerEvidenceBrief() { return createPartnerEvidenceBrief() }
export function buildPartnerObjectionMap() { return createPartnerObjectionMap() }
export function buildPartnerRiskReviewBoard() { return createPartnerRiskReviewBoard() }
export function buildPartnerReadinessScorecard() { return createPartnerReadinessScorecard() }
export function buildPartnerDecisionPathway() { return createPartnerDecisionPathway() }
export function buildPartnerHumanReviewQueue() { return createPartnerHumanReviewQueue() }
export function buildPartnerMeetingPreparationKit() { return createPartnerMeetingPreparationKit() }
export function buildPartnerFollowUpGovernance() { return createPartnerFollowUpGovernance() }
export function classifyPartnerReadinessStatus(score = 50): SenseTrustPartnerReadinessStatus { if (score >= 85) return 'diligence_ready'; if (score >= 70) return 'evidence_brief_ready'; if (score >= 50) return 'ready_for_review'; return 'refine_required' }
export function classifyPartnerFitLevel(score = 50): SenseTrustPartnerFitLevel { if (score >= 85) return 'strategic'; if (score >= 65) return 'strong'; if (score >= 40) return 'moderate'; return 'uncertain' }
export function classifyPartnerRiskLevel(score = 50): SenseTrustPartnerRiskLevel { if (score >= 85) return 'critical'; if (score >= 65) return 'high'; if (score >= 35) return 'medium'; return 'low' }
export function classifyPartnerDecision(score = 50): SenseTrustPartnerDecisionType { if (score >= 85) return 'prepare_brief'; if (score >= 65) return 'require_human_review'; if (score >= 45) return 'refine'; return 'pause' }
export function classifyPartnerConfidence(level: SenseTrustPartnerConfidenceLevel = 'simulated_only') { return level }
export function calculatePartnerFitScore(score = 55) { return clamp(score) }
export function calculatePartnerEvidenceScore(score = 55) { return clamp(score) }
export function calculatePartnerRiskScore(score = 45) { return clamp(score) }
export function calculatePartnerDiligenceScore(score = 55) { return clamp(score) }
export function calculatePartnerReadinessScore(score = 55) { return clamp(score) }
export function validatePartnerReadinessRooms(s = createDefaultStrategicPartnerReadinessRoomState()) { return countCheck(s.rooms.length, 8, 'rooms') }
export function validatePartnerReadinessProfiles(s = createDefaultStrategicPartnerReadinessRoomState()) { return countCheck(s.profiles.length, 24, 'profiles') }
export function validatePartnerFitMatrices(s = createDefaultStrategicPartnerReadinessRoomState()) { return countCheck(s.fit_matrices.length, 8, 'fit_matrices') }
export function validateStrategicDiligenceChecklists(s = createDefaultStrategicPartnerReadinessRoomState()) { return countCheck(s.diligence_checklists.length, 8, 'diligence_checklists') }
export function validatePartnerEvidenceBriefs(s = createDefaultStrategicPartnerReadinessRoomState()) { return countCheck(s.evidence_briefs.length, 8, 'evidence_briefs') }
export function validatePartnerObjectionMaps(s = createDefaultStrategicPartnerReadinessRoomState()) { return countCheck(s.objection_maps.length, 8, 'objection_maps') }
export function validatePartnerRiskReviewBoards(s = createDefaultStrategicPartnerReadinessRoomState()) { return countCheck(s.risk_review_boards.length, 8, 'risk_review_boards') }
export function validatePartnerReadinessScorecards(s = createDefaultStrategicPartnerReadinessRoomState()) { return countCheck(s.scorecards.length, 8, 'scorecards') }
export function validatePartnerDecisionPathways(s = createDefaultStrategicPartnerReadinessRoomState()) { return countCheck(s.decision_pathways.length, 8, 'decision_pathways') }
export function validatePartnerHumanReviewQueues(s = createDefaultStrategicPartnerReadinessRoomState()) { return countCheck(s.human_review_queues.length, 8, 'human_review_queues') }
export function validatePartnerMeetingPreparationKits(s = createDefaultStrategicPartnerReadinessRoomState()) { return countCheck(s.meeting_preparation_kits.length, 8, 'meeting_preparation_kits') }
export function validatePartnerFollowUpGovernance(s = createDefaultStrategicPartnerReadinessRoomState()) { return countCheck(s.follow_up_governance.length, 8, 'follow_up_governance') }
export function validatePartnerMisuseBlockers(s = createDefaultStrategicPartnerReadinessRoomState()) { return countCheck(s.misuse_blockers.length, 16, 'misuse_blockers') }
export function validateNoClinicalDataExposure(p: unknown) { return denylistCheck(p, PARTNER_READINESS_SENSITIVE_DENYLIST, ['clinical_data_used":true', 'contains_clinical_data":true']) }
export function validateNoPatientData(p: unknown) { return flagCheck(p, ['patient_data_used":true', 'contains_patient_data":true'], 'patient_data_true') }
export function validateNoPersonalSensitiveData(p: unknown) { return flagCheck(p, ['personal_sensitive_data_used":true', 'contains_personal_sensitive_data":true'], 'personal_sensitive_data_true') }
export function validateNoRealClinicalOperationClaim(p: unknown) { return flagCheck(p, ['real_clinical_operation_claimed":true', 'real_clinical_operation_claim":true'], 'real_clinical_operation_true') }
export function validateNoContractBindingClaim(p: unknown) { return flagCheck(p, ['contract_binding_claimed":true', 'contract_binding_claim":true', 'commercial_commitment_claim":true'], 'contract_binding_true') }
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
export function buildStrategicPartnerReadinessExportPayload(): SenseTrustStrategicPartnerReadinessExportPayload { return { ...SIMULATED_STRATEGIC_PARTNER_READINESS_EXPORT_PAYLOAD, state: createDefaultStrategicPartnerReadinessRoomState() } }
export function validateStrategicPartnerReadinessExportPayload(payload = buildStrategicPartnerReadinessExportPayload()) { const checks = [validatePartnerReadinessRooms(payload.state), validatePartnerReadinessProfiles(payload.state), validatePartnerFitMatrices(payload.state), validateStrategicDiligenceChecklists(payload.state), validatePartnerEvidenceBriefs(payload.state), validatePartnerObjectionMaps(payload.state), validatePartnerRiskReviewBoards(payload.state), validatePartnerReadinessScorecards(payload.state), validatePartnerDecisionPathways(payload.state), validatePartnerHumanReviewQueues(payload.state), validatePartnerMeetingPreparationKits(payload.state), validatePartnerFollowUpGovernance(payload.state), validatePartnerMisuseBlockers(payload.state), validateNoClinicalDataExposure(payload.state), validateNoPatientData(payload.state), validateNoPersonalSensitiveData(payload.state), validateNoRealClinicalOperationClaim(payload.state), validateNoContractBindingClaim(payload.state), validateNoClientClaim(payload.state), validateNoPartnershipClaim(payload.state), validateNoRegulatoryValidationClaim(payload.state), validateNoDiagnosticTruthClaim(payload.state), validateNoRealRevenueClaim(payload.state), validateNoRealBillingClaim(payload.state), validateNoRealImpactClaim(payload.state), validateNoRealCapacityClaim(payload.state), validateNoRealScientificValidationClaim(payload.state), validateNoExternalCertificationClaim(payload.state)]; const errors = checks.flatMap((x) => x.errors); return { valid: errors.length === 0, errors } }
export function assertPartnerReadinessMetadataOnly(p: { metadata_only?: boolean }) { if (!p.metadata_only) throw new Error('partner_readiness_not_metadata_only'); return { valid: true, errors: [] } }
export function assertPartnerReadinessNoSensitiveExposure(p: unknown) { return assertValid(validateNoClinicalDataExposure(p), 'partner_sensitive_exposure') }
export function assertPartnerReadinessNoLegalBinding(p: unknown) { return assertValid(validateNoContractBindingClaim(p), 'partner_legal_binding') }
export function assertPartnerReadinessNoRegulatoryAuthorization(p: unknown) { return assertValid(validateNoRegulatoryValidationClaim(p), 'partner_regulatory_authorization') }
export function assertPartnerReadinessNoCommercialCommitment(p: unknown) { return assertValid(validateNoClientClaim(p), 'partner_commercial_commitment') }
export function assertPartnerReadinessNoClinicalOperation(p: unknown) { return assertValid(validateNoRealClinicalOperationClaim(p), 'partner_clinical_operation') }
export function assertPartnerReadinessNoDiagnosticTruthCertification(p: unknown) { return assertValid(validateNoDiagnosticTruthClaim(p), 'partner_diagnostic_truth') }
export function assertPartnerReadinessNoRealImpact(p: unknown) { return assertValid(validateNoRealImpactClaim(p), 'partner_real_impact') }
export function assertPartnerReadinessNoRealCapacity(p: unknown) { return assertValid(validateNoRealCapacityClaim(p), 'partner_real_capacity') }
export function assertPartnerReadinessNoScientificValidation(p: unknown) { return assertValid(validateNoRealScientificValidationClaim(p), 'partner_scientific_validation') }
export function assertPartnerReadinessNoExternalCertification(p: unknown) { return assertValid(validateNoExternalCertificationClaim(p), 'partner_external_certification') }
export function linkPartnerReadinessToEvidenceSimulator() { return 'SenseTrust Strategic Scale Evidence Simulator v3.3' }
export function linkPartnerReadinessToSimulationConsole() { return 'SenseTrust Strategic Scale Simulation Console v3.2' }
export function linkPartnerReadinessToOperatingModel() { return 'SenseTrust Strategic Scale Operating Model v3.1' }
export function linkPartnerReadinessToGitFreezeMemory() { return 'SenseTrust Git Freeze Automation Memory' }
export function linkPartnerReadinessToMOC() { return ['MOC_SenseTrust', 'MOC_VitalStrata_SenseTrust', 'MOC_NeuroStrata_Trust_Layer', 'MOC_DNDA_Trust_Object', 'MOC_BLC_Rastreabilidade'] }
function cloneArrayFields<T extends Record<string, unknown>>(item: T, keys: string[]): T { const copy = { ...item }; keys.forEach((key) => { const value = item[key]; if (Array.isArray(value)) copy[key as keyof T] = [...value] as T[keyof T] }); return copy }
function clamp(score: number) { return Math.max(0, Math.min(100, score)) }
function countCheck(actual: number, expected: number, label: string): SenseTrustStrategicPartnerReadinessValidationResult { return { valid: actual >= expected, errors: actual >= expected ? [] : [`${label}_count_below_${expected}`] } }
function denylistCheck(payload: unknown, denylist: string[], flags: string[] = []): SenseTrustStrategicPartnerReadinessValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); const errors = [...denylist.filter((term) => serialized.includes(term.toLowerCase())), ...flags.filter((flag) => serialized.includes(flag.toLowerCase()))]; return { valid: errors.length === 0, errors } }
function flagCheck(payload: unknown, flags: string[], error: string): SenseTrustStrategicPartnerReadinessValidationResult { const serialized = JSON.stringify(payload).toLowerCase(); return { valid: !flags.some((flag) => serialized.includes(flag.toLowerCase())), errors: flags.some((flag) => serialized.includes(flag.toLowerCase())) ? [error] : [] } }
function assertValid(result: SenseTrustStrategicPartnerReadinessValidationResult, label: string) { if (!result.valid) throw new Error(`${label}: ${result.errors.join(', ')}`); return result }
