import * as fixtures from '@/fixtures/sensetrust/simulated-institutional-handoff-room'
import type { InstitutionalHandoffDecision, InstitutionalHandoffStage, InstitutionalHandoffState, SenseTrustInstitutionalHandoffRoom } from '@/types/sensetrust/institutional-handoff-room'

function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T }
export const getSenseTrustInstitutionalHandoffRooms = () => clone(fixtures.SIMULATED_INSTITUTIONAL_HANDOFF_ROOMS)
export const createSenseTrustInstitutionalHandoffRoom = () => getSenseTrustInstitutionalHandoffRooms()[0]
export const getSenseTrustInstitutionalHandoffRoomById = (roomId: string) => getSenseTrustInstitutionalHandoffRooms().find((room) => room.roomId === roomId) ?? null
export function calculateHandoffReadinessScore(room: SenseTrustInstitutionalHandoffRoom = createSenseTrustInstitutionalHandoffRoom()) { return Math.round((room.handoffReadinessScore + room.packageCompletenessScore + room.evidenceBundleScore + room.riskClearanceScore + room.humanReviewCompletenessScore) / 5) }
export const calculatePackageCompletenessScore = (room: SenseTrustInstitutionalHandoffRoom = createSenseTrustInstitutionalHandoffRoom()) => room.packageCompletenessScore
export const calculateEvidenceBundleScore = (room: SenseTrustInstitutionalHandoffRoom = createSenseTrustInstitutionalHandoffRoom()) => room.evidenceBundleScore
export const calculateRiskClearanceScore = (room: SenseTrustInstitutionalHandoffRoom = createSenseTrustInstitutionalHandoffRoom()) => room.riskClearanceScore
export const calculateHumanReviewCompletenessScore = (room: SenseTrustInstitutionalHandoffRoom = createSenseTrustInstitutionalHandoffRoom()) => room.humanReviewCompletenessScore
export function getInstitutionalHandoffStage(score = calculateHandoffReadinessScore()): InstitutionalHandoffStage { if (score >= 84) return 'handoff_ready'; if (score >= 76) return 'human_review_required'; if (score >= 64) return 'stakeholder_review'; return 'handoff_blocked' }
export function getInstitutionalHandoffDecision(score = calculateHandoffReadinessScore()): InstitutionalHandoffDecision { if (score >= 84) return 'handoff_ready'; if (score >= 76) return 'refine'; if (score >= 64) return 'escalate_human_review'; return 'not_ready' }
export const getInstitutionalHandoffPackages = () => clone(fixtures.SIMULATED_INSTITUTIONAL_HANDOFF_PACKAGES)
export const getInstitutionalHandoffRecipientProfiles = () => clone(fixtures.SIMULATED_INSTITUTIONAL_HANDOFF_RECIPIENT_PROFILES)
export const getInstitutionalHandoffMaterials = () => clone(fixtures.SIMULATED_INSTITUTIONAL_HANDOFF_MATERIALS)
export const getInstitutionalHandoffEvidenceBundles = () => clone(fixtures.SIMULATED_INSTITUTIONAL_HANDOFF_EVIDENCE_BUNDLES)
export const getInstitutionalHandoffResponsibilityMatrix = () => clone(fixtures.SIMULATED_INSTITUTIONAL_HANDOFF_RESPONSIBILITY_MATRICES)
export const getInstitutionalHandoffDecisionRecords = () => clone(fixtures.SIMULATED_INSTITUTIONAL_HANDOFF_DECISION_RECORDS)
export const getInstitutionalHandoffReviewQueue = () => clone(fixtures.SIMULATED_INSTITUTIONAL_HANDOFF_REVIEW_QUEUES)
export const getInstitutionalHandoffRiskRegister = () => clone(fixtures.SIMULATED_INSTITUTIONAL_HANDOFF_RISK_REGISTERS)
export const getInstitutionalHandoffBoundaryClaimsGuardrails = () => clone(fixtures.SIMULATED_INSTITUTIONAL_HANDOFF_BOUNDARY_CLAIMS_GUARDRAILS)
export const getInstitutionalHandoffAuditTrail = () => clone(fixtures.SIMULATED_INSTITUTIONAL_HANDOFF_AUDIT_TRAILS)
export const getInstitutionalHandoffExecutiveReport = () => clone(fixtures.SIMULATED_INSTITUTIONAL_HANDOFF_EXECUTIVE_REPORTS)
export function createInstitutionalHandoffState(): InstitutionalHandoffState { return { version: 'v4.1', ...fixtures.INSTITUTIONAL_HANDOFF_GUARDRAILS, rooms: getSenseTrustInstitutionalHandoffRooms(), scenarios: clone(fixtures.SIMULATED_INSTITUTIONAL_HANDOFF_SCENARIOS), packages: getInstitutionalHandoffPackages(), recipientProfiles: getInstitutionalHandoffRecipientProfiles(), materials: getInstitutionalHandoffMaterials(), evidenceBundles: getInstitutionalHandoffEvidenceBundles(), responsibilityMatrices: getInstitutionalHandoffResponsibilityMatrix(), decisionRecords: getInstitutionalHandoffDecisionRecords(), reviewQueues: getInstitutionalHandoffReviewQueue(), riskRegisters: getInstitutionalHandoffRiskRegister(), boundaryClaimsGuardrails: getInstitutionalHandoffBoundaryClaimsGuardrails(), auditTrails: getInstitutionalHandoffAuditTrail(), executiveReports: getInstitutionalHandoffExecutiveReport() } }
export function exportInstitutionalHandoffPayload() { return { schema: 'sensetrust.institutional_handoff_room.v1', exported_at: new Date(0).toISOString(), statement: fixtures.INSTITUTIONAL_HANDOFF_REQUIRED_STATEMENT, references: fixtures.INSTITUTIONAL_HANDOFF_REFERENCES, state: createInstitutionalHandoffState(), simulated_only: true, metadata_only: true, human_review_required: true, handoff_preparation_only: true } }
