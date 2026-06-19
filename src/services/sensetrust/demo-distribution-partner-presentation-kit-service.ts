import * as fixtures from '@/fixtures/sensetrust/simulated-demo-distribution-partner-presentation-kit'
import type { SenseTrustDemoDistributionPartnerPresentationKit } from '@/types/sensetrust/demo-distribution-partner-presentation-kit'
function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T }
export const getSenseTrustDemoDistributionPartnerPresentationKits = () => clone(fixtures.SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS)
export const createSenseTrustDemoDistributionPartnerPresentationKit = () => getSenseTrustDemoDistributionPartnerPresentationKits()[0]
export const getSenseTrustDemoDistributionPartnerPresentationKitById = (kitId: string) => getSenseTrustDemoDistributionPartnerPresentationKits().find((x) => x.kitId === kitId) ?? null
export const getDemoDistributionScenarios = () => clone(fixtures.SIMULATED_DEMO_DISTRIBUTION_SCENARIOS)
export const getPartnerPresentationAudienceProfiles = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_AUDIENCE_PROFILES)
export const getPartnerPresentationNarrativeTracks = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_NARRATIVE_TRACKS)
export const getPartnerPresentationPackages = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_PACKAGES)
export const getPartnerPresentationMaterials = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_MATERIALS)
export const getPartnerPresentationOnePagers = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_ONE_PAGERS)
export const getPartnerPresentationDeckOutlines = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_DECK_OUTLINES)
export const getPartnerPresentationDemoScripts = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_DEMO_SCRIPTS)
export const getPartnerPresentationRouteMaps = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_ROUTE_MAPS)
export const getPartnerPresentationAuthorizedClaims = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_AUTHORIZED_CLAIMS)
export const getPartnerPresentationProhibitedClaims = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_PROHIBITED_CLAIMS)
export const getPartnerPresentationPreMeetingChecklists = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_PRE_MEETING_CHECKLISTS)
export const getPartnerPresentationPostMeetingChecklists = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_POST_MEETING_CHECKLISTS)
export const getPartnerPresentationDistributionLogs = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_DISTRIBUTION_LOGS)
export const getPartnerPresentationRiskRegister = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_RISK_REGISTERS)
export const getPartnerPresentationHumanReviewQueue = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_HUMAN_REVIEW_QUEUES)
export const getPartnerPresentationAuditTrail = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_AUDIT_TRAILS)
export const getPartnerPresentationExecutiveReport = () => clone(fixtures.SIMULATED_PARTNER_PRESENTATION_EXECUTIVE_REPORTS)
export const calculateDemoDistributionReadinessScore = (kit: SenseTrustDemoDistributionPartnerPresentationKit = createSenseTrustDemoDistributionPartnerPresentationKit()) => kit.demoDistributionReadinessScore
export const calculatePartnerPresentationReadinessScore = (kit: SenseTrustDemoDistributionPartnerPresentationKit = createSenseTrustDemoDistributionPartnerPresentationKit()) => kit.partnerPresentationReadinessScore
export const calculateClaimsSafetyScore = (kit: SenseTrustDemoDistributionPartnerPresentationKit = createSenseTrustDemoDistributionPartnerPresentationKit()) => kit.claimsSafetyScore
export const calculateMaterialCompletenessScore = (kit: SenseTrustDemoDistributionPartnerPresentationKit = createSenseTrustDemoDistributionPartnerPresentationKit()) => kit.materialCompletenessScore
export const calculateHumanReviewCompletenessScore = (kit: SenseTrustDemoDistributionPartnerPresentationKit = createSenseTrustDemoDistributionPartnerPresentationKit()) => kit.humanReviewCompletenessScore
export function exportDemoDistributionPartnerPresentationPayload() { return { schema: 'sensetrust.demo_distribution_partner_presentation_kit.v1', exported_at: new Date(0).toISOString(), statement: fixtures.DEMO_DISTRIBUTION_REQUIRED_STATEMENT, references: fixtures.DEMO_DISTRIBUTION_REFERENCES, kits: getSenseTrustDemoDistributionPartnerPresentationKits(), simulated_only: true, metadata_only: true, human_review_required: true, demo_distribution_only: true, partner_presentation_only: true, release_candidate_linked: true } }
