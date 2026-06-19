import * as fixtures from '@/fixtures/sensetrust/simulated-command-center-integration'
import type { SenseTrustCommandCenter } from '@/types/sensetrust/command-center-integration'

function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T }
export const getSenseTrustCommandCenters = () => clone(fixtures.SIMULATED_COMMAND_CENTERS)
export const createSenseTrustCommandCenter = () => getSenseTrustCommandCenters()[0]
export const getSenseTrustCommandCenterById = (commandCenterId: string) => getSenseTrustCommandCenters().find((x) => x.commandCenterId === commandCenterId) ?? null
export const getCommandCenterVersionNodes = () => clone(fixtures.SIMULATED_COMMAND_CENTER_VERSION_NODES)
export const getCommandCenterTrailMap = () => clone(fixtures.SIMULATED_COMMAND_CENTER_TRAIL_MAPS)
export const getCommandCenterNavigationRoutes = () => clone(fixtures.SIMULATED_COMMAND_CENTER_NAVIGATION_ROUTES)
export const getCommandCenterProofChain = () => clone(fixtures.SIMULATED_COMMAND_CENTER_PROOF_CHAINS)
export const getCommandCenterReadinessSnapshot = () => clone(fixtures.SIMULATED_COMMAND_CENTER_READINESS_SNAPSHOTS)
export const getCommandCenterRiskSnapshot = () => clone(fixtures.SIMULATED_COMMAND_CENTER_RISK_SNAPSHOTS)
export const getCommandCenterGuardrailSnapshot = () => clone(fixtures.SIMULATED_COMMAND_CENTER_GUARDRAIL_SNAPSHOTS)
export const getCommandCenterDemoScenarios = () => clone(fixtures.SIMULATED_COMMAND_CENTER_DEMO_SCENARIOS)
export const getCommandCenterInstitutionalViews = () => clone(fixtures.SIMULATED_COMMAND_CENTER_INSTITUTIONAL_VIEWS)
export const getCommandCenterAudienceProfiles = () => clone(fixtures.SIMULATED_COMMAND_CENTER_AUDIENCE_PROFILES)
export const getCommandCenterHandoffLinks = () => clone(fixtures.SIMULATED_COMMAND_CENTER_HANDOFF_LINKS)
export const getCommandCenterReleaseCandidatePreparation = () => clone(fixtures.SIMULATED_COMMAND_CENTER_RELEASE_CANDIDATE_PREPARATION)
export const getCommandCenterAuditTrail = () => clone(fixtures.SIMULATED_COMMAND_CENTER_AUDIT_TRAILS)
export const getCommandCenterExecutiveReport = () => clone(fixtures.SIMULATED_COMMAND_CENTER_EXECUTIVE_REPORTS)
export function calculateCommandCenterReadinessScore(center: SenseTrustCommandCenter = createSenseTrustCommandCenter()) { return Math.round((center.commandCenterReadinessScore + center.trailCompletenessScore + center.demoReadinessScore + center.guardrailIntegrityScore + center.releaseCandidatePreparationScore) / 5) }
export const calculateTrailCompletenessScore = (center: SenseTrustCommandCenter = createSenseTrustCommandCenter()) => center.trailCompletenessScore
export const calculateDemoReadinessScore = (center: SenseTrustCommandCenter = createSenseTrustCommandCenter()) => center.demoReadinessScore
export const calculateGuardrailIntegrityScore = (center: SenseTrustCommandCenter = createSenseTrustCommandCenter()) => center.guardrailIntegrityScore
export const calculateReleaseCandidatePreparationScore = (center: SenseTrustCommandCenter = createSenseTrustCommandCenter()) => center.releaseCandidatePreparationScore
export function exportCommandCenterPayload() { return { schema: 'sensetrust.command_center_integration.v1', exported_at: new Date(0).toISOString(), statement: fixtures.COMMAND_CENTER_REQUIRED_STATEMENT, references: fixtures.COMMAND_CENTER_REFERENCES, commandCenters: getSenseTrustCommandCenters(), simulated_only: true, metadata_only: true, human_review_required: true, command_center_only: true, demo_preparation_only: true } }
