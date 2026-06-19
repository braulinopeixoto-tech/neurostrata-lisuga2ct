import * as fixtures from '@/fixtures/sensetrust/simulated-strategic-pilot-monitoring-evidence-intake-room'
import type { PilotMonitoringDecisionSignal, PilotMonitoringStage, PilotMonitoringState, StrategicPilotMonitoringEvidenceIntakeRoom } from '@/types/sensetrust/strategic-pilot-monitoring-evidence-intake-room'

function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T }
export const getStrategicPilotMonitoringEvidenceIntakeRooms = () => clone(fixtures.SIMULATED_STRATEGIC_PILOT_MONITORING_ROOMS)
export const createStrategicPilotMonitoringEvidenceIntakeRoom = () => getStrategicPilotMonitoringEvidenceIntakeRooms()[0]
export const getStrategicPilotMonitoringEvidenceIntakeRoomById = (roomId: string) => getStrategicPilotMonitoringEvidenceIntakeRooms().find((room) => room.roomId === roomId) ?? null
export function calculateMonitoringReadinessScore(room: StrategicPilotMonitoringEvidenceIntakeRoom = createStrategicPilotMonitoringEvidenceIntakeRoom()) { return Math.round((room.monitoringReadinessScore + room.evidenceIntakeCompletenessScore + room.evidenceIntegrityScore + room.checkpointComplianceScore - room.deviationBurdenScore / 2 - room.riskSignalScore / 3) / 4) }
export const calculateEvidenceIntakeCompletenessScore = (room: StrategicPilotMonitoringEvidenceIntakeRoom = createStrategicPilotMonitoringEvidenceIntakeRoom()) => room.evidenceIntakeCompletenessScore
export const calculateEvidenceIntegrityScore = (room: StrategicPilotMonitoringEvidenceIntakeRoom = createStrategicPilotMonitoringEvidenceIntakeRoom()) => room.evidenceIntegrityScore
export const calculateCheckpointComplianceScore = (room: StrategicPilotMonitoringEvidenceIntakeRoom = createStrategicPilotMonitoringEvidenceIntakeRoom()) => room.checkpointComplianceScore
export const calculateDeviationBurdenScore = (room: StrategicPilotMonitoringEvidenceIntakeRoom = createStrategicPilotMonitoringEvidenceIntakeRoom()) => room.deviationBurdenScore
export const calculateRiskSignalScore = (room: StrategicPilotMonitoringEvidenceIntakeRoom = createStrategicPilotMonitoringEvidenceIntakeRoom()) => room.riskSignalScore
export function getPilotMonitoringStage(score = calculateMonitoringReadinessScore()): PilotMonitoringStage { if (score >= 75) return 'closeout_ready'; if (score >= 62) return 'checkpoint_monitoring'; if (score >= 48) return 'human_review_required'; return 'pause_recommended' }
export function getPilotMonitoringDecisionSignal(score = calculateMonitoringReadinessScore()): PilotMonitoringDecisionSignal { if (score >= 75) return 'prepare_closeout'; if (score >= 62) return 'continue_monitoring'; if (score >= 48) return 'escalate_human_review'; return 'recommend_pause' }
export const getPilotMonitoringEvents = () => clone(fixtures.SIMULATED_PILOT_MONITORING_EVENTS)
export const getPilotEvidenceIntakeQueue = () => clone(fixtures.SIMULATED_PILOT_EVIDENCE_INTAKE_QUEUES)
export const getPilotEvidenceIntakeRecords = () => clone(fixtures.SIMULATED_PILOT_EVIDENCE_INTAKE_RECORDS)
export const getPilotCheckpointMonitoringRecords = () => clone(fixtures.SIMULATED_PILOT_CHECKPOINT_MONITORING_RECORDS)
export const getPilotMonitoringTimeline = () => clone(fixtures.SIMULATED_PILOT_MONITORING_TIMELINES)
export const getPilotDeviationSignals = () => clone(fixtures.SIMULATED_PILOT_DEVIATION_SIGNALS)
export const getPilotDeviationEscalations = () => clone(fixtures.SIMULATED_PILOT_DEVIATION_ESCALATIONS)
export const getPilotRiskSignalUpdates = () => clone(fixtures.SIMULATED_PILOT_RISK_SIGNAL_UPDATES)
export const getPilotMonitoringRiskRegister = () => clone(fixtures.SIMULATED_PILOT_MONITORING_RISK_REGISTERS)
export const getPilotDecisionTriggers = () => clone(fixtures.SIMULATED_PILOT_DECISION_TRIGGERS)
export const getPilotHumanReviewTriggers = () => clone(fixtures.SIMULATED_PILOT_HUMAN_REVIEW_TRIGGERS)
export const getPilotEvidenceIntegrityChecks = () => clone(fixtures.SIMULATED_PILOT_EVIDENCE_INTEGRITY_CHECKS)
export const getPilotEvidenceChainOfCustody = () => clone(fixtures.SIMULATED_PILOT_EVIDENCE_CHAIN_OF_CUSTODY)
export const getPilotMonitoringAuditTrail = () => clone(fixtures.SIMULATED_PILOT_MONITORING_AUDIT_TRAILS)
export const getPilotMonitoringDashboardMetrics = () => clone(fixtures.SIMULATED_PILOT_MONITORING_DASHBOARD_METRICS)
export const getPilotMonitoringExecutiveReport = () => clone(fixtures.SIMULATED_STRATEGIC_PILOT_MONITORING_EXECUTIVE_REPORTS)
export function createStrategicPilotMonitoringEvidenceIntakeState(): PilotMonitoringState { return { version: 'v3.9', ...fixtures.STRATEGIC_PILOT_MONITORING_GUARDRAILS, rooms: getStrategicPilotMonitoringEvidenceIntakeRooms(), scenarios: clone(fixtures.SIMULATED_STRATEGIC_PILOT_MONITORING_SCENARIOS), monitoringEvents: getPilotMonitoringEvents(), evidenceIntakeQueues: getPilotEvidenceIntakeQueue(), evidenceIntakeRecords: getPilotEvidenceIntakeRecords(), checkpointMonitoringRecords: getPilotCheckpointMonitoringRecords(), monitoringTimelines: getPilotMonitoringTimeline(), deviationSignals: getPilotDeviationSignals(), deviationEscalations: getPilotDeviationEscalations(), riskSignalUpdates: getPilotRiskSignalUpdates(), monitoringRiskRegisters: getPilotMonitoringRiskRegister(), riskItems: clone(fixtures.SIMULATED_PILOT_MONITORING_RISK_ITEMS), decisionTriggers: getPilotDecisionTriggers(), humanReviewTriggers: getPilotHumanReviewTriggers(), evidenceIntegrityChecks: getPilotEvidenceIntegrityChecks(), evidenceChainOfCustody: getPilotEvidenceChainOfCustody(), monitoringAuditTrails: getPilotMonitoringAuditTrail(), dashboardMetrics: getPilotMonitoringDashboardMetrics(), executiveReports: getPilotMonitoringExecutiveReport(), v40CloseoutPreparation: true } }
export function exportStrategicPilotMonitoringEvidenceIntakePayload() { return { schema: 'sensetrust.strategic_pilot_monitoring_evidence_intake_room.v1', exported_at: new Date(0).toISOString(), statement: fixtures.STRATEGIC_PILOT_MONITORING_REQUIRED_STATEMENT, references: fixtures.STRATEGIC_PILOT_MONITORING_REFERENCES, state: createStrategicPilotMonitoringEvidenceIntakeState(), simulated_only: true, metadata_only: true, human_review_required: true, v40CloseoutPreparation: true } }
