import type { CommandCenterAudienceType, CommandCenterGuardrails, CommandCenterVersionNode, SenseTrustCommandCenter } from '@/types/sensetrust/command-center-integration'

export const COMMAND_CENTER_REQUIRED_STATEMENT = 'A SenseTrust v4.2 não executa operação real, não formaliza parceria e não certifica resultado clínico, científico, regulatório ou comercial. Ela integra visualmente a trilha simulada da SenseTrust, organizando navegação, status, evidências, riscos, guardrails e handoff institucional para revisão humana e demonstração controlada.'
export const COMMAND_CENTER_REFERENCES = ['v4.1 Institutional Handoff Room', 'v4.0 Strategic Pilot Outcome Closeout Decision Room', 'v3.9 Strategic Pilot Monitoring Evidence Intake Room', 'v3.8 Strategic Pilot Execution Governance Room', 'v3.7 Strategic Partnership Pilot Proposal Room', 'SenseTrust Git Freeze Automation v1.2 Lean Mode', 'v4.3 release candidate preparation', 'DNDA = Diagnóstico Neurofuncional Dimensional Auditável']
export const COMMAND_CENTER_GUARDRAILS: CommandCenterGuardrails = { simulated_only: true, metadata_only: true, human_review_required: true, command_center_only: true, demo_preparation_only: true, contains_clinical_data: false, contains_patient_data: false, contains_personal_sensitive_data: false, real_operation_claim: false, real_pilot_claim: false, real_client_claim: false, real_contract_claim: false, real_partnership_claim: false, real_billing_claim: false, real_crm_claim: false, real_email_automation_claim: false, real_biological_sample_claim: false, real_eeg_claim: false, real_qeeg_claim: false, real_biomarker_claim: false, legal_signature_claim: false, diagnostic_truth_certification_claim: false, scientific_validation_claim: false, regulatory_validation_claim: false, external_certification_claim: false, treatment_claim: false, outcome_guarantee_claim: false, public_health_claim: false }
const versionNodes: CommandCenterVersionNode[] = [
  ['v3.7', 'Pilot Proposal', '/sensetrust/strategic-partnership-pilot-proposal-room', 82],
  ['v3.8', 'Execution Governance', '/sensetrust/strategic-pilot-execution-governance-room', 84],
  ['v3.9', 'Monitoring & Evidence Intake', '/sensetrust/strategic-pilot-monitoring-evidence-intake-room', 86],
  ['v4.0', 'Outcome & Closeout Decision', '/sensetrust/strategic-pilot-outcome-closeout-decision-room', 85],
  ['v4.1', 'Institutional Handoff', '/sensetrust/institutional-handoff-room', 83],
  ['v4.2', 'Command Center Integration', '/sensetrust/command-center', 88],
  ['v4.3', 'Pilot OS Release Candidate', '/sensetrust/pilot-os-release-candidate', 72],
].map(([version, label, route, score]) => ({ id: `${version}-node`, version: String(version), label: String(label), route: String(route), status: version === 'v4.3' ? 'planned' : version === 'v4.2' ? 'active' : 'frozen', readinessScore: Number(score), simulated_only: true, metadata_only: true }))
function view(id: string, title: string, audienceType: CommandCenterAudienceType) { return { id, title, audienceType, narrative: 'visão executiva simulada para demo controlada, sem operação real, cliente, contrato ou parceria', simulated_only: true, metadata_only: true, demo_preparation_only: true } as const }
export const SIMULATED_COMMAND_CENTERS: SenseTrustCommandCenter[] = [{
  ...COMMAND_CENTER_GUARDRAILS,
  commandCenterId: 'sensetrust-command-center-v42',
  title: 'SenseTrust Command Center Integration v4.2',
  linkedV41HandoffRoomId: 'v41-institutional-handoff-room',
  linkedV40CloseoutRoomId: 'v40-outcome-closeout-decision-room',
  linkedV39MonitoringRoomId: 'v39-monitoring-evidence-intake-room',
  linkedV38ExecutionGovernanceRoomId: 'v38-execution-governance-room',
  linkedV37ProposalRoomId: 'v37-pilot-proposal-room',
  linkedV12LeanFreezeReference: 'SenseTrust Git Freeze Automation v1.2 Lean Mode',
  stage: 'release_candidate_preparation',
  decision: 'prepare_release_candidate',
  commandCenterReadinessScore: 88,
  trailCompletenessScore: 90,
  demoReadinessScore: 86,
  guardrailIntegrityScore: 94,
  releaseCandidatePreparationScore: 82,
  versionNodes,
  trailMap: { id: 'trail-map-v42', nodes: versionNodes.map((x) => x.id), links: ['v3.7->v3.8', 'v3.8->v3.9', 'v3.9->v4.0', 'v4.0->v4.1', 'v4.1->v4.2', 'v4.2->v4.3'], simulated_only: true, metadata_only: true },
  navigationRoutes: versionNodes.slice(0, 6).map((x) => ({ id: `${x.version}-route`, label: x.label, route: x.route, version: x.version, simulated_only: true, metadata_only: true })),
  proofChain: { id: 'proof-chain-v42', steps: versionNodes.slice(0, 6).map((x) => ({ id: `${x.version}-proof`, version: x.version, proofLabel: `${x.label} simulated proof step`, guardrailStatus: 'compliant', simulated_only: true, metadata_only: true })), simulated_only: true, metadata_only: true, human_review_required: true },
  readinessSnapshot: { id: 'readiness-v42', commandCenterId: 'sensetrust-command-center-v42', scores: [88, 90, 86, 94, 82], summary: 'trilha simulada pronta para demo controlada e preparação de Release Candidate v4.3', simulated_only: true, metadata_only: true },
  riskSnapshot: { id: 'risk-v42', commandCenterId: 'sensetrust-command-center-v42', risks: ['confundir demo com operação real', 'inferir cliente, contrato ou parceria', 'inferir validação científica ou regulatória'], simulated_only: true, metadata_only: true, human_review_required: true },
  guardrailSnapshot: { id: 'guardrail-v42', commandCenterId: 'sensetrust-command-center-v42', status: 'compliant', guardrails: ['simulated_only', 'metadata_only', 'human_review_required', 'command_center_only', 'demo_preparation_only', 'no diagnostic truth certification'], simulated_only: true, metadata_only: true, human_review_required: true },
  demoScenarios: ['governança interna', 'BioStrata Agro simulado', 'investidor simulado', 'jurídico institucional simulado'].map((title, index) => ({ id: `demo-${index}`, title, audienceType: ['internal_governance', 'parceiro_agro_bio_simulado', 'investidor_simulado', 'juridico_simulado'][index] as CommandCenterAudienceType, no_real_submission: true, simulated_only: true, metadata_only: true })),
  institutionalViews: [view('view-internal', 'Visão governança interna', 'internal_governance'), view('view-agro', 'Visão parceiro BioStrata Agro simulado', 'parceiro_agro_bio_simulado'), view('view-investor', 'Visão investidor simulado', 'investidor_simulado'), view('view-legal', 'Visão jurídico/institucional simulado', 'juridico_simulado')],
  audienceProfiles: ['internal_governance', 'prefeitura_simulada', 'clinica_simulada', 'parceiro_agro_bio_simulado', 'investidor_simulado', 'juridico_simulado'].map((audienceType) => ({ id: `audience-${audienceType}`, audienceType: audienceType as CommandCenterAudienceType, reviewNeed: 'revisão humana antes de demo, envio, parceria ou handoff real', simulated_only: true, metadata_only: true, human_review_required: true })),
  handoffLinks: versionNodes.slice(0, 6).map((x) => ({ id: `${x.version}-handoff-link`, label: x.label, route: x.route, linkedVersion: x.version, simulated_only: true, metadata_only: true })),
  releaseCandidatePreparation: { id: 'rc-v43-prep', targetVersion: 'v4.3', readinessScore: 82, blockers: ['revisão humana final', 'sem operação real', 'sem certificação diagnóstica'], simulated_only: true, metadata_only: true, human_review_required: true },
  auditTrail: { id: 'audit-v42', events: ['v3.7 proposal frozen', 'v3.8 governance frozen', 'v3.9 monitoring frozen', 'v4.0 closeout frozen', 'v4.1 handoff frozen', 'v4.2 command center simulated'], append_only_simulated: true, simulated_only: true, metadata_only: true },
  executiveReport: { id: 'report-v42', summary: COMMAND_CENTER_REQUIRED_STATEMENT, decision: 'prepare_release_candidate', simulated_only: true, metadata_only: true, human_review_required: true, command_center_only: true, demo_preparation_only: true },
}]
export const SIMULATED_COMMAND_CENTER_VERSION_NODES = SIMULATED_COMMAND_CENTERS.flatMap((x) => x.versionNodes)
export const SIMULATED_COMMAND_CENTER_TRAIL_MAPS = SIMULATED_COMMAND_CENTERS.map((x) => x.trailMap)
export const SIMULATED_COMMAND_CENTER_NAVIGATION_ROUTES = SIMULATED_COMMAND_CENTERS.flatMap((x) => x.navigationRoutes)
export const SIMULATED_COMMAND_CENTER_PROOF_CHAINS = SIMULATED_COMMAND_CENTERS.map((x) => x.proofChain)
export const SIMULATED_COMMAND_CENTER_READINESS_SNAPSHOTS = SIMULATED_COMMAND_CENTERS.map((x) => x.readinessSnapshot)
export const SIMULATED_COMMAND_CENTER_RISK_SNAPSHOTS = SIMULATED_COMMAND_CENTERS.map((x) => x.riskSnapshot)
export const SIMULATED_COMMAND_CENTER_GUARDRAIL_SNAPSHOTS = SIMULATED_COMMAND_CENTERS.map((x) => x.guardrailSnapshot)
export const SIMULATED_COMMAND_CENTER_DEMO_SCENARIOS = SIMULATED_COMMAND_CENTERS.flatMap((x) => x.demoScenarios)
export const SIMULATED_COMMAND_CENTER_INSTITUTIONAL_VIEWS = SIMULATED_COMMAND_CENTERS.flatMap((x) => x.institutionalViews)
export const SIMULATED_COMMAND_CENTER_AUDIENCE_PROFILES = SIMULATED_COMMAND_CENTERS.flatMap((x) => x.audienceProfiles)
export const SIMULATED_COMMAND_CENTER_HANDOFF_LINKS = SIMULATED_COMMAND_CENTERS.flatMap((x) => x.handoffLinks)
export const SIMULATED_COMMAND_CENTER_RELEASE_CANDIDATE_PREPARATION = SIMULATED_COMMAND_CENTERS.map((x) => x.releaseCandidatePreparation)
export const SIMULATED_COMMAND_CENTER_AUDIT_TRAILS = SIMULATED_COMMAND_CENTERS.map((x) => x.auditTrail)
export const SIMULATED_COMMAND_CENTER_EXECUTIVE_REPORTS = SIMULATED_COMMAND_CENTERS.map((x) => x.executiveReport)
