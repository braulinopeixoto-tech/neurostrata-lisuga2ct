import * as fixtures from '@/fixtures/sensetrust/simulated-pilot-os-release-candidate'
import type { SenseTrustPilotOSReleaseCandidate } from '@/types/sensetrust/pilot-os-release-candidate'
function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T }
export const getSenseTrustPilotOSReleaseCandidates = () => clone(fixtures.SIMULATED_PILOT_OS_RELEASE_CANDIDATES)
export const createSenseTrustPilotOSReleaseCandidate = () => getSenseTrustPilotOSReleaseCandidates()[0]
export const getSenseTrustPilotOSReleaseCandidateById = (releaseCandidateId: string) => getSenseTrustPilotOSReleaseCandidates().find((x) => x.releaseCandidateId === releaseCandidateId) ?? null
export const getPilotOSReleaseCandidateVersionMap = () => clone(fixtures.SIMULATED_PILOT_OS_VERSION_MAPS)
export const getPilotOSReleaseCandidateAcceptanceCriteria = () => clone(fixtures.SIMULATED_PILOT_OS_ACCEPTANCE_CRITERIA)
export const getPilotOSReleaseCandidateReadinessGates = () => clone(fixtures.SIMULATED_PILOT_OS_READINESS_GATES)
export const getPilotOSReleaseCandidateDemoFlows = () => clone(fixtures.SIMULATED_PILOT_OS_DEMO_FLOWS)
export const getPilotOSReleaseCandidateNavigationMap = () => clone(fixtures.SIMULATED_PILOT_OS_NAVIGATION_MAPS)
export const getPilotOSReleaseCandidateProofChainSummary = () => clone(fixtures.SIMULATED_PILOT_OS_PROOF_CHAIN_SUMMARIES)
export const getPilotOSReleaseCandidateGuardrailMatrix = () => clone(fixtures.SIMULATED_PILOT_OS_GUARDRAIL_MATRICES)
export const getPilotOSReleaseCandidateRiskRegister = () => clone(fixtures.SIMULATED_PILOT_OS_RISK_REGISTERS)
export const getPilotOSReleaseCandidateKnownLimitations = () => clone(fixtures.SIMULATED_PILOT_OS_KNOWN_LIMITATIONS)
export const getPilotOSReleaseCandidateHumanReviewQueue = () => clone(fixtures.SIMULATED_PILOT_OS_HUMAN_REVIEW_QUEUES)
export const getPilotOSReleaseCandidateInstitutionalPackages = () => clone(fixtures.SIMULATED_PILOT_OS_INSTITUTIONAL_PACKAGES)
export const getPilotOSReleaseCandidateExecutiveChecklist = () => clone(fixtures.SIMULATED_PILOT_OS_EXECUTIVE_CHECKLISTS)
export const getPilotOSReleaseCandidateReleaseDecision = () => clone(fixtures.SIMULATED_PILOT_OS_RELEASE_DECISIONS)
export const getPilotOSReleaseCandidateAuditTrail = () => clone(fixtures.SIMULATED_PILOT_OS_AUDIT_TRAILS)
export const getPilotOSReleaseCandidateExecutiveReport = () => clone(fixtures.SIMULATED_PILOT_OS_EXECUTIVE_REPORTS)
export function calculatePilotOSReadinessScore(rc: SenseTrustPilotOSReleaseCandidate = createSenseTrustPilotOSReleaseCandidate()) { return Math.round((rc.pilotOSReadinessScore + rc.acceptanceCriteriaScore + rc.demoReadinessScore + rc.guardrailIntegrityScore + rc.institutionalPackageScore + rc.releaseCandidateScore) / 6) }
export const calculateAcceptanceCriteriaScore = (rc: SenseTrustPilotOSReleaseCandidate = createSenseTrustPilotOSReleaseCandidate()) => rc.acceptanceCriteriaScore
export const calculateDemoReadinessScore = (rc: SenseTrustPilotOSReleaseCandidate = createSenseTrustPilotOSReleaseCandidate()) => rc.demoReadinessScore
export const calculateGuardrailIntegrityScore = (rc: SenseTrustPilotOSReleaseCandidate = createSenseTrustPilotOSReleaseCandidate()) => rc.guardrailIntegrityScore
export const calculateInstitutionalPackageScore = (rc: SenseTrustPilotOSReleaseCandidate = createSenseTrustPilotOSReleaseCandidate()) => rc.institutionalPackageScore
export const calculateReleaseCandidateScore = (rc: SenseTrustPilotOSReleaseCandidate = createSenseTrustPilotOSReleaseCandidate()) => rc.releaseCandidateScore
export function exportPilotOSReleaseCandidatePayload() { return { schema: 'sensetrust.pilot_os_release_candidate.v1', exported_at: new Date(0).toISOString(), statement: fixtures.PILOT_OS_RC_REQUIRED_STATEMENT, references: fixtures.PILOT_OS_RC_REFERENCES, releaseCandidates: getSenseTrustPilotOSReleaseCandidates(), simulated_only: true, metadata_only: true, human_review_required: true, release_candidate_only: true, demo_preparation_only: true, command_center_linked: true } }
