import * as fixtures from '@/fixtures/sensetrust/simulated-strategic-pilot-execution-governance-room'
import type { PilotExecutionDecision, PilotExecutionGovernanceState, PilotExecutionStage, StrategicPilotExecutionGovernanceRoom } from '@/types/sensetrust/strategic-pilot-execution-governance-room'

function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T }
export function getStrategicPilotExecutionGovernanceRooms() { return clone(fixtures.SIMULATED_STRATEGIC_PILOT_EXECUTION_ROOMS) }
export function createStrategicPilotExecutionGovernanceRoom() { return getStrategicPilotExecutionGovernanceRooms()[0] }
export function getStrategicPilotExecutionGovernanceRoomById(roomId: string) { return getStrategicPilotExecutionGovernanceRooms().find((room) => room.roomId === roomId) ?? null }
export function calculatePilotExecutionReadinessScore(room: StrategicPilotExecutionGovernanceRoom = createStrategicPilotExecutionGovernanceRoom()) { return Math.round((room.executionReadinessScore + room.governanceCompletenessScore + room.evidenceSufficiencyScore - room.riskBurdenScore / 2) / 3) }
export function calculateEvidenceSufficiencyScore(room: StrategicPilotExecutionGovernanceRoom = createStrategicPilotExecutionGovernanceRoom()) { return room.evidenceSufficiencyScore }
export function calculateRiskBurdenScore(room: StrategicPilotExecutionGovernanceRoom = createStrategicPilotExecutionGovernanceRoom()) { return room.riskBurdenScore }
export function calculateGovernanceCompletenessScore(room: StrategicPilotExecutionGovernanceRoom = createStrategicPilotExecutionGovernanceRoom()) { return room.governanceCompletenessScore }
export function getPilotExecutionStage(score = calculatePilotExecutionReadinessScore()): PilotExecutionStage { if (score >= 78) return 'simulated_activation_ready'; if (score >= 62) return 'pre_activation_review'; if (score >= 45) return 'refine_required'; return 'pause_required' }
export function getPilotExecutionDecision(score = calculatePilotExecutionReadinessScore()): PilotExecutionDecision { if (score >= 78) return 'go_simulated'; if (score >= 62) return 'pending_review'; if (score >= 45) return 'refine'; return 'pause' }
export const getPilotExecutionActivationGates = () => clone(fixtures.SIMULATED_PILOT_EXECUTION_ACTIVATION_GATES)
export const getPilotExecutionCheckpoints = () => clone(fixtures.SIMULATED_PILOT_EXECUTION_CHECKPOINTS)
export const getPilotExecutionMilestones = () => clone(fixtures.SIMULATED_PILOT_EXECUTION_MILESTONES)
export const getPilotExecutionCadence = () => clone(fixtures.SIMULATED_PILOT_EXECUTION_CADENCES)
export const getPilotExecutionResponsibilityMatrix = () => clone(fixtures.SIMULATED_PILOT_EXECUTION_RESPONSIBILITY_MATRICES)
export const getPilotExecutionEvidenceLedger = () => clone(fixtures.SIMULATED_PILOT_EXECUTION_EVIDENCE_LEDGERS)
export const getPilotExecutionDeviationRegister = () => clone(fixtures.SIMULATED_PILOT_EXECUTION_DEVIATION_REGISTERS)
export const getPilotExecutionRiskRegister = () => clone(fixtures.SIMULATED_PILOT_EXECUTION_RISK_REGISTERS)
export const getPilotExecutionInterruptionRules = () => clone(fixtures.SIMULATED_PILOT_EXECUTION_INTERRUPTION_RULES)
export const getPilotExecutionDecisionBoard = () => clone(fixtures.SIMULATED_PILOT_EXECUTION_DECISION_BOARDS)
export const getPilotExecutionHumanReviewQueue = () => clone(fixtures.SIMULATED_PILOT_EXECUTION_HUMAN_REVIEW_QUEUES)
export const getPilotExecutionStakeholderReviewBoard = () => clone(fixtures.SIMULATED_PILOT_EXECUTION_STAKEHOLDER_REVIEW_BOARDS)
export const getPilotExecutionBoundaryClaimsGuardrails = () => clone(fixtures.SIMULATED_PILOT_EXECUTION_BOUNDARY_CLAIMS_GUARDRAILS)
export const getPilotExecutionAuditTrail = () => clone(fixtures.SIMULATED_PILOT_EXECUTION_AUDIT_TRAILS)
export const getStrategicPilotExecutionExecutiveReport = () => clone(fixtures.SIMULATED_STRATEGIC_PILOT_EXECUTION_EXECUTIVE_REPORTS)

export function createStrategicPilotExecutionGovernanceState(): PilotExecutionGovernanceState {
  return {
    version: 'v3.8',
    ...fixtures.STRATEGIC_PILOT_EXECUTION_GUARDRAILS,
    rooms: getStrategicPilotExecutionGovernanceRooms(),
    scenarios: clone(fixtures.SIMULATED_STRATEGIC_PILOT_EXECUTION_SCENARIOS),
    activationGates: getPilotExecutionActivationGates(),
    checkpoints: getPilotExecutionCheckpoints(),
    milestones: getPilotExecutionMilestones(),
    cadences: getPilotExecutionCadence(),
    responsibilityMatrices: getPilotExecutionResponsibilityMatrix(),
    evidenceLedgers: getPilotExecutionEvidenceLedger(),
    evidenceRecords: clone(fixtures.SIMULATED_PILOT_EXECUTION_EVIDENCE_RECORDS),
    deviationRegisters: getPilotExecutionDeviationRegister(),
    deviationItems: clone(fixtures.SIMULATED_PILOT_EXECUTION_DEVIATION_ITEMS),
    riskRegisters: getPilotExecutionRiskRegister(),
    riskItems: clone(fixtures.SIMULATED_PILOT_EXECUTION_RISK_ITEMS),
    interruptionRules: getPilotExecutionInterruptionRules(),
    decisionBoards: getPilotExecutionDecisionBoard(),
    decisionItems: clone(fixtures.SIMULATED_PILOT_EXECUTION_DECISION_ITEMS),
    humanReviewQueues: getPilotExecutionHumanReviewQueue(),
    humanReviewItems: clone(fixtures.SIMULATED_PILOT_EXECUTION_HUMAN_REVIEW_ITEMS),
    stakeholderReviewBoards: getPilotExecutionStakeholderReviewBoard(),
    boundaryClaimsGuardrails: getPilotExecutionBoundaryClaimsGuardrails(),
    auditTrails: getPilotExecutionAuditTrail(),
    executiveReports: getStrategicPilotExecutionExecutiveReport(),
  }
}

export function exportStrategicPilotExecutionGovernancePayload() {
  return {
    schema: 'sensetrust.strategic_pilot_execution_governance_room.v1',
    exported_at: new Date(0).toISOString(),
    statement: fixtures.STRATEGIC_PILOT_EXECUTION_REQUIRED_STATEMENT,
    references: fixtures.STRATEGIC_PILOT_EXECUTION_REFERENCES,
    state: createStrategicPilotExecutionGovernanceState(),
    simulated_only: true,
    metadata_only: true,
    human_review_required: true,
  }
}
