import * as fixtures from '@/fixtures/sensetrust/simulated-strategic-pilot-outcome-closeout-decision-room'
import type { PilotCloseoutDecision, PilotCloseoutStage, PilotCloseoutState, StrategicPilotOutcomeCloseoutDecisionRoom } from '@/types/sensetrust/strategic-pilot-outcome-closeout-decision-room'

function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T }
export const getStrategicPilotOutcomeCloseoutDecisionRooms = () => clone(fixtures.SIMULATED_STRATEGIC_PILOT_OUTCOME_CLOSEOUT_ROOMS)
export const createStrategicPilotOutcomeCloseoutDecisionRoom = () => getStrategicPilotOutcomeCloseoutDecisionRooms()[0]
export const getStrategicPilotOutcomeCloseoutDecisionRoomById = (roomId: string) => getStrategicPilotOutcomeCloseoutDecisionRooms().find((room) => room.roomId === roomId) ?? null
export function calculateOutcomeReadinessScore(room: StrategicPilotOutcomeCloseoutDecisionRoom = createStrategicPilotOutcomeCloseoutDecisionRoom()) { return Math.round((room.outcomeReadinessScore + room.evidenceSynthesisScore + room.riskResolutionScore + room.learningLoopScore + room.handoffReadinessScore) / 5) }
export const calculateEvidenceSynthesisScore = (room: StrategicPilotOutcomeCloseoutDecisionRoom = createStrategicPilotOutcomeCloseoutDecisionRoom()) => room.evidenceSynthesisScore
export const calculateRiskResolutionScore = (room: StrategicPilotOutcomeCloseoutDecisionRoom = createStrategicPilotOutcomeCloseoutDecisionRoom()) => room.riskResolutionScore
export const calculateLearningLoopScore = (room: StrategicPilotOutcomeCloseoutDecisionRoom = createStrategicPilotOutcomeCloseoutDecisionRoom()) => room.learningLoopScore
export const calculateHandoffReadinessScore = (room: StrategicPilotOutcomeCloseoutDecisionRoom = createStrategicPilotOutcomeCloseoutDecisionRoom()) => room.handoffReadinessScore
export function getPilotCloseoutStage(score = calculateOutcomeReadinessScore()): PilotCloseoutStage { if (score >= 82) return 'handoff_ready'; if (score >= 75) return 'refine_recommended'; if (score >= 62) return 'human_review_required'; return 'pause_recommended' }
export function getPilotCloseoutDecision(score = calculateOutcomeReadinessScore()): PilotCloseoutDecision { if (score >= 84) return 'handoff_ready'; if (score >= 78) return 'go'; if (score >= 70) return 'refine'; if (score >= 58) return 'pause'; return 'not_ready' }
export const getPilotOutcomeSummaries = () => clone(fixtures.SIMULATED_PILOT_OUTCOME_SUMMARIES)
export const getPilotOutcomeEvidenceSynthesis = () => clone(fixtures.SIMULATED_PILOT_OUTCOME_EVIDENCE_SYNTHESIS)
export const getPilotOutcomeCheckpointReviews = () => clone(fixtures.SIMULATED_PILOT_OUTCOME_CHECKPOINT_REVIEWS)
export const getPilotOutcomeRiskReviews = () => clone(fixtures.SIMULATED_PILOT_OUTCOME_RISK_REVIEWS)
export const getPilotOutcomeDeviationReviews = () => clone(fixtures.SIMULATED_PILOT_OUTCOME_DEVIATION_REVIEWS)
export const getPilotOutcomeLearningLoop = () => clone(fixtures.SIMULATED_PILOT_OUTCOME_LEARNING_LOOPS)
export const getPilotOutcomeDecisionBoard = () => clone(fixtures.SIMULATED_PILOT_OUTCOME_DECISION_BOARDS)
export const getPilotOutcomeReadinessScorecard = () => clone(fixtures.SIMULATED_PILOT_OUTCOME_READINESS_SCORECARDS)
export const getPilotOutcomeInstitutionalMaturityMatrix = () => clone(fixtures.SIMULATED_PILOT_OUTCOME_INSTITUTIONAL_MATURITY_MATRICES)
export const getPilotOutcomeHandoffReadinessBoard = () => clone(fixtures.SIMULATED_PILOT_OUTCOME_HANDOFF_READINESS_BOARDS)
export const getPilotOutcomeHumanReviewQueue = () => clone(fixtures.SIMULATED_PILOT_OUTCOME_HUMAN_REVIEW_QUEUES)
export const getPilotOutcomeBoundaryClaimsGuardrails = () => clone(fixtures.SIMULATED_PILOT_OUTCOME_BOUNDARY_CLAIMS_GUARDRAILS)
export const getPilotOutcomeAuditTrail = () => clone(fixtures.SIMULATED_PILOT_OUTCOME_AUDIT_TRAILS)
export const getStrategicPilotOutcomeExecutiveReport = () => clone(fixtures.SIMULATED_STRATEGIC_PILOT_OUTCOME_EXECUTIVE_REPORTS)
export function createStrategicPilotOutcomeCloseoutState(): PilotCloseoutState { return { version: 'v4.0', ...fixtures.STRATEGIC_PILOT_OUTCOME_GUARDRAILS, rooms: getStrategicPilotOutcomeCloseoutDecisionRooms(), scenarios: clone(fixtures.SIMULATED_STRATEGIC_PILOT_OUTCOME_SCENARIOS), outcomeSummaries: getPilotOutcomeSummaries(), evidenceSynthesis: getPilotOutcomeEvidenceSynthesis(), evidenceItems: clone(fixtures.SIMULATED_PILOT_OUTCOME_EVIDENCE_ITEMS), checkpointReviews: getPilotOutcomeCheckpointReviews(), riskReviews: getPilotOutcomeRiskReviews(), deviationReviews: getPilotOutcomeDeviationReviews(), learningLoops: getPilotOutcomeLearningLoop(), lessonsLearned: clone(fixtures.SIMULATED_PILOT_OUTCOME_LESSONS_LEARNED), decisionBoards: getPilotOutcomeDecisionBoard(), decisionItems: clone(fixtures.SIMULATED_PILOT_OUTCOME_DECISION_ITEMS), readinessScorecards: getPilotOutcomeReadinessScorecard(), institutionalMaturityMatrices: getPilotOutcomeInstitutionalMaturityMatrix(), handoffReadinessBoards: getPilotOutcomeHandoffReadinessBoard(), humanReviewQueues: getPilotOutcomeHumanReviewQueue(), boundaryClaimsGuardrails: getPilotOutcomeBoundaryClaimsGuardrails(), auditTrails: getPilotOutcomeAuditTrail(), executiveReports: getStrategicPilotOutcomeExecutiveReport(), v41InstitutionalHandoffPreparation: true } }
export function exportStrategicPilotOutcomeCloseoutPayload() { return { schema: 'sensetrust.strategic_pilot_outcome_closeout_decision_room.v1', exported_at: new Date(0).toISOString(), statement: fixtures.STRATEGIC_PILOT_OUTCOME_REQUIRED_STATEMENT, references: fixtures.STRATEGIC_PILOT_OUTCOME_REFERENCES, state: createStrategicPilotOutcomeCloseoutState(), simulated_only: true, metadata_only: true, human_review_required: true, handoff_preparation_only: true, v41InstitutionalHandoffPreparation: true } }
