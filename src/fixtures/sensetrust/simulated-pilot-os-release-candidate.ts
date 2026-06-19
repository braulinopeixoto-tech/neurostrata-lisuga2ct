import type { PilotOSReleaseCandidateAudienceType, PilotOSReleaseCandidateGuardrails, SenseTrustPilotOSReleaseCandidate } from '@/types/sensetrust/pilot-os-release-candidate'
export const PILOT_OS_RC_REQUIRED_STATEMENT = 'A SenseTrust v4.3 não executa operação real, não formaliza parceria e não certifica resultado clínico, científico, regulatório ou comercial. Ela consolida um Release Candidate simulado, auditável e supervisionado do SenseTrust Pilot OS, reunindo navegação, critérios de aceite, trilha probatória, guardrails, prontidão de demonstração e preparação institucional para revisão humana.'
export const PILOT_OS_RC_REFERENCES = ['v4.2 Command Center Integration', 'v4.1 Institutional Handoff Room', 'v4.0 Outcome Closeout Decision Room', 'v3.9 Monitoring Evidence Intake Room', 'v3.8 Execution Governance Room', 'v3.7 Pilot Proposal Room', 'SenseTrust Git Freeze Automation v1.2 Lean Mode', 'v4.4 Demo Distribution / Partner Presentation Kit preparation', 'DNDA = Diagnóstico Neurofuncional Dimensional Auditável']
export const PILOT_OS_RC_GUARDRAILS: PilotOSReleaseCandidateGuardrails = { simulated_only: true, metadata_only: true, human_review_required: true, release_candidate_only: true, demo_preparation_only: true, command_center_linked: true, contains_clinical_data: false, contains_patient_data: false, contains_personal_sensitive_data: false, real_operation_claim: false, real_pilot_claim: false, real_client_claim: false, real_contract_claim: false, real_partnership_claim: false, real_billing_claim: false, real_crm_claim: false, real_email_automation_claim: false, real_biological_sample_claim: false, real_eeg_claim: false, real_qeeg_claim: false, real_biomarker_claim: false, legal_signature_claim: false, diagnostic_truth_certification_claim: false, scientific_validation_claim: false, regulatory_validation_claim: false, external_certification_claim: false, treatment_claim: false, outcome_guarantee_claim: false, public_health_claim: false }
const routes = ['/sensetrust/strategic-partnership-pilot-proposal-room','/sensetrust/strategic-pilot-execution-governance-room','/sensetrust/strategic-pilot-monitoring-evidence-intake-room','/sensetrust/strategic-pilot-outcome-closeout-decision-room','/sensetrust/institutional-handoff-room','/sensetrust/command-center','/sensetrust/pilot-os-release-candidate']
const packages = [
  ['Internal Governance RC Package', 'internal_governance', 91],
  ['BioStrata Agro Partner RC Package', 'parceiro_agro_bio_simulado', 87],
  ['Investor Readiness RC Package', 'investidor_simulado', 85],
  ['Legal / Institutional Review RC Package', 'juridico_simulado', 86],
].map(([title, audienceType, packageScore], index) => ({ id: `rc-package-${index}`, title: String(title), audienceType: audienceType as PilotOSReleaseCandidateAudienceType, packageScore: Number(packageScore), simulated_only: true, metadata_only: true, demo_preparation_only: true }))
export const SIMULATED_PILOT_OS_RELEASE_CANDIDATES: SenseTrustPilotOSReleaseCandidate[] = [{
  ...PILOT_OS_RC_GUARDRAILS,
  releaseCandidateId: 'sensetrust-pilot-os-rc-v43',
  title: 'SenseTrust Pilot OS Release Candidate v4.3',
  linkedV42CommandCenterId: 'sensetrust-command-center-v42',
  linkedV41HandoffRoomId: 'v41-institutional-handoff-room',
  linkedV40CloseoutRoomId: 'v40-outcome-closeout-decision-room',
  linkedV39MonitoringRoomId: 'v39-monitoring-evidence-intake-room',
  linkedV38ExecutionGovernanceRoomId: 'v38-execution-governance-room',
  linkedV37ProposalRoomId: 'v37-pilot-proposal-room',
  linkedV12LeanFreezeReference: 'SenseTrust Git Freeze Automation v1.2 Lean Mode',
  stage: 'release_candidate_ready',
  decision: 'release_candidate_ready',
  pilotOSReadinessScore: 89,
  acceptanceCriteriaScore: 90,
  demoReadinessScore: 88,
  guardrailIntegrityScore: 94,
  institutionalPackageScore: 87,
  releaseCandidateScore: 90,
  versionMap: { id: 'version-map-v43', versions: ['v3.7','v3.8','v3.9','v4.0','v4.1','v4.2','v4.3'], commandCenterRoute: '/sensetrust/command-center', simulated_only: true, metadata_only: true },
  acceptanceCriteria: ['rotas congeladas mapeadas','guardrails visíveis','demo flow sem operação real','pacotes institucionais simulados'].map((criterion, index) => ({ id: `criterion-${index}`, criterion, status: 'pass', simulated_only: true, metadata_only: true })),
  readinessGates: ['build pass','teste principal pass','sem dado clínico real','sem cliente/contrato/parceria'].map((gate, index) => ({ id: `gate-${index}`, gate, status: 'pass', level: index < 2 ? 'release_candidate_ready' : 'high', simulated_only: true, metadata_only: true, human_review_required: true })),
  demoFlows: packages.map((pkg, index) => ({ id: `demo-flow-${index}`, title: pkg.title, audienceType: pkg.audienceType, no_real_submission: true, simulated_only: true, metadata_only: true })),
  navigationMap: { id: 'navigation-map-v43', routes, simulated_only: true, metadata_only: true, command_center_linked: true },
  proofChainSummary: { id: 'proof-summary-v43', summary: 'Trilha probatória simulada v3.7 a v4.3 conectada ao Command Center v4.2.', steps: ['proposal','governance','monitoring','closeout','handoff','command center','release candidate'], simulated_only: true, metadata_only: true },
  guardrailMatrix: { id: 'guardrail-matrix-v43', guardrails: ['simulated_only','metadata_only','human_review_required','release_candidate_only','demo_preparation_only','command_center_linked','no diagnostic truth certification'], status: 'pass', simulated_only: true, metadata_only: true, human_review_required: true },
  riskRegister: { id: 'risk-register-v43', risks: ['confundir RC com operação real','inferir cliente, contrato ou parceria','inferir validação científica ou regulatória'], simulated_only: true, metadata_only: true, human_review_required: true },
  knownLimitations: [{ id: 'limitation-v43-1', limitation: 'Release Candidate ainda é simulado e metadata_only.', mitigation: 'revisão humana e Lean Freeze antes de qualquer distribuição', simulated_only: true, metadata_only: true }],
  humanReviewQueue: { id: 'human-review-v43', items: ['aprovar narrativa de demo','validar guardrails','bloquear uso comercial real'], simulated_only: true, metadata_only: true, human_review_required: true },
  institutionalPackages: packages,
  executiveChecklist: { id: 'checklist-v43', items: ['acceptance criteria pass','demo readiness pass','guardrail matrix pass','v4.4 preparation only'], simulated_only: true, metadata_only: true, human_review_required: true },
  releaseDecision: { id: 'decision-v43', decision: 'release_candidate_ready', rationale: 'RC simulado pronto para demonstração controlada, sem operação real ou certificação diagnóstica.', simulated_only: true, metadata_only: true, human_review_required: true },
  auditTrail: { id: 'audit-v43', events: ['v4.2 command center linked','acceptance criteria reviewed','demo flow prepared','v4.4 preparation marked simulated'], append_only_simulated: true, simulated_only: true, metadata_only: true },
  executiveReport: { id: 'report-v43', summary: PILOT_OS_RC_REQUIRED_STATEMENT, decision: 'release_candidate_ready', simulated_only: true, metadata_only: true, human_review_required: true, release_candidate_only: true, command_center_linked: true },
}]
export const SIMULATED_PILOT_OS_VERSION_MAPS = SIMULATED_PILOT_OS_RELEASE_CANDIDATES.map((x) => x.versionMap)
export const SIMULATED_PILOT_OS_ACCEPTANCE_CRITERIA = SIMULATED_PILOT_OS_RELEASE_CANDIDATES.flatMap((x) => x.acceptanceCriteria)
export const SIMULATED_PILOT_OS_READINESS_GATES = SIMULATED_PILOT_OS_RELEASE_CANDIDATES.flatMap((x) => x.readinessGates)
export const SIMULATED_PILOT_OS_DEMO_FLOWS = SIMULATED_PILOT_OS_RELEASE_CANDIDATES.flatMap((x) => x.demoFlows)
export const SIMULATED_PILOT_OS_NAVIGATION_MAPS = SIMULATED_PILOT_OS_RELEASE_CANDIDATES.map((x) => x.navigationMap)
export const SIMULATED_PILOT_OS_PROOF_CHAIN_SUMMARIES = SIMULATED_PILOT_OS_RELEASE_CANDIDATES.map((x) => x.proofChainSummary)
export const SIMULATED_PILOT_OS_GUARDRAIL_MATRICES = SIMULATED_PILOT_OS_RELEASE_CANDIDATES.map((x) => x.guardrailMatrix)
export const SIMULATED_PILOT_OS_RISK_REGISTERS = SIMULATED_PILOT_OS_RELEASE_CANDIDATES.map((x) => x.riskRegister)
export const SIMULATED_PILOT_OS_KNOWN_LIMITATIONS = SIMULATED_PILOT_OS_RELEASE_CANDIDATES.flatMap((x) => x.knownLimitations)
export const SIMULATED_PILOT_OS_HUMAN_REVIEW_QUEUES = SIMULATED_PILOT_OS_RELEASE_CANDIDATES.map((x) => x.humanReviewQueue)
export const SIMULATED_PILOT_OS_INSTITUTIONAL_PACKAGES = SIMULATED_PILOT_OS_RELEASE_CANDIDATES.flatMap((x) => x.institutionalPackages)
export const SIMULATED_PILOT_OS_EXECUTIVE_CHECKLISTS = SIMULATED_PILOT_OS_RELEASE_CANDIDATES.map((x) => x.executiveChecklist)
export const SIMULATED_PILOT_OS_RELEASE_DECISIONS = SIMULATED_PILOT_OS_RELEASE_CANDIDATES.map((x) => x.releaseDecision)
export const SIMULATED_PILOT_OS_AUDIT_TRAILS = SIMULATED_PILOT_OS_RELEASE_CANDIDATES.map((x) => x.auditTrail)
export const SIMULATED_PILOT_OS_EXECUTIVE_REPORTS = SIMULATED_PILOT_OS_RELEASE_CANDIDATES.map((x) => x.executiveReport)
