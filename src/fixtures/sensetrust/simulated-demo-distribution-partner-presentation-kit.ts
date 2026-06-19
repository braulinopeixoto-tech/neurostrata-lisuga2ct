import type { DemoDistributionGuardrails, PartnerPresentationAudienceType, SenseTrustDemoDistributionPartnerPresentationKit } from '@/types/sensetrust/demo-distribution-partner-presentation-kit'
export const DEMO_DISTRIBUTION_REQUIRED_STATEMENT = 'A SenseTrust v4.4 não executa operação real, não envia comunicação real, não formaliza parceria e não certifica resultado clínico, científico, regulatório ou comercial. Ela organiza um Demo Distribution / Partner Presentation Kit simulado, auditável e supervisionado, reunindo narrativa institucional, materiais autorizados, roteiro de demonstração, audience packs, guardrails, matriz de claims e preparação para revisão humana.'
export const DEMO_DISTRIBUTION_REFERENCES = ['v4.3 Pilot OS Release Candidate', 'v4.2 Command Center Integration', 'v4.1 Institutional Handoff Room', 'v4.0 Outcome Closeout Decision Room', 'v3.9 Monitoring Evidence Intake Room', 'v3.8 Execution Governance Room', 'v3.7 Pilot Proposal Room', 'SenseTrust Git Freeze Automation v1.2 Lean Mode', 'v4.5 Partner Feedback / Meeting Intelligence preparation', 'DNDA = Diagnóstico Neurofuncional Dimensional Auditável']
export const DEMO_DISTRIBUTION_GUARDRAILS: DemoDistributionGuardrails = { simulated_only: true, metadata_only: true, human_review_required: true, demo_distribution_only: true, partner_presentation_only: true, release_candidate_linked: true, contains_clinical_data: false, contains_patient_data: false, contains_personal_sensitive_data: false, real_operation_claim: false, real_pilot_claim: false, real_client_claim: false, real_contract_claim: false, real_partnership_claim: false, real_billing_claim: false, real_crm_claim: false, real_email_automation_claim: false, real_lead_collection_claim: false, real_analytics_claim: false, real_biological_sample_claim: false, real_eeg_claim: false, real_qeeg_claim: false, real_biomarker_claim: false, legal_signature_claim: false, diagnostic_truth_certification_claim: false, scientific_validation_claim: false, regulatory_validation_claim: false, external_certification_claim: false, treatment_claim: false, outcome_guarantee_claim: false, public_health_claim: false, binding_proposal_claim: false, commercial_commitment_claim: false, legal_commitment_claim: false }
const audiences: [string, PartnerPresentationAudienceType, number][] = [['Internal Governance Demo Kit','internal_governance',91],['BioStrata Agro Partner Demo Kit','parceiro_agro_bio_simulado',88],['Investor Presentation Kit','investidor_simulado',86],['Legal / Institutional Review Kit','juridico_simulado',87],['Prefeitura / Public Sector Briefing Kit','prefeitura_simulada',84]]
export const SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS: SenseTrustDemoDistributionPartnerPresentationKit[] = [{
  ...DEMO_DISTRIBUTION_GUARDRAILS,
  kitId: 'sensetrust-demo-distribution-kit-v44',
  title: 'SenseTrust Demo Distribution / Partner Presentation Kit v4.4',
  linkedV43PilotOSReleaseCandidateId: 'sensetrust-pilot-os-rc-v43',
  linkedV42CommandCenterId: 'sensetrust-command-center-v42',
  linkedV41HandoffRoomId: 'v41-institutional-handoff-room',
  linkedV40CloseoutRoomId: 'v40-outcome-closeout-decision-room',
  linkedV39MonitoringRoomId: 'v39-monitoring-evidence-intake-room',
  linkedV38ExecutionGovernanceRoomId: 'v38-execution-governance-room',
  linkedV37ProposalRoomId: 'v37-pilot-proposal-room',
  linkedV12LeanFreezeReference: 'SenseTrust Git Freeze Automation v1.2 Lean Mode',
  stage: 'distribution_ready',
  decision: 'distribution_ready',
  demoDistributionReadinessScore: 89,
  partnerPresentationReadinessScore: 88,
  claimsSafetyScore: 94,
  materialCompletenessScore: 90,
  humanReviewCompletenessScore: 87,
  demoDistributionScenarios: audiences.map(([title, audienceType], index) => ({ id: `scenario-${index}`, title, audienceType, no_real_distribution: true, simulated_only: true, metadata_only: true })),
  audienceProfiles: audiences.map(([label, audienceType], index) => ({ id: `audience-${index}`, audienceType, label, simulated_only: true, metadata_only: true, human_review_required: true })),
  narrativeTracks: audiences.map(([title], index) => ({ id: `narrative-${index}`, title, narrative: 'narrativa institucional simulada para demonstração controlada, sem operação real ou compromisso comercial', simulated_only: true, metadata_only: true })),
  presentationPackages: audiences.map(([title, audienceType, packageScore], index) => ({ id: `package-${index}`, title, audienceType, packageScore, simulated_only: true, metadata_only: true, partner_presentation_only: true })),
  materials: ['executive_one_pager','demo_script','deck_outline','route_map','claims_matrix','risk_disclosure','follow_up_template_simulado','institutional_brief'].map((materialType, index) => ({ id: `material-${index}`, title: `${materialType} simulado`, materialType: materialType as any, no_real_submission: true, simulated_only: true, metadata_only: true })),
  onePagers: [{ id: 'one-pager-v44', title: 'One-pager executivo simulado', bullets: ['SenseTrust Pilot OS RC', 'sem operação real', 'revisão humana obrigatória'], simulated_only: true, metadata_only: true }],
  deckOutlines: [{ id: 'deck-v44', title: 'Deck outline simulado', sections: ['problema', 'trilha SenseTrust', 'guardrails', 'demo controlada', 'próximos passos v4.5'], simulated_only: true, metadata_only: true }],
  demoScripts: [{ id: 'script-v44', title: 'Roteiro de demonstração simulado', steps: ['abrir Command Center', 'mostrar RC v4.3', 'explicar claims permitidos', 'encerrar sem call to action real'], simulated_only: true, metadata_only: true, human_review_required: true }],
  routeMaps: [{ id: 'route-map-v44', routes: ['/sensetrust/pilot-os-release-candidate','/sensetrust/command-center','/sensetrust/institutional-handoff-room'], releaseCandidateRoute: '/sensetrust/pilot-os-release-candidate', simulated_only: true, metadata_only: true, release_candidate_linked: true }],
  authorizedClaims: [{ id: 'claim-ok-1', claim: 'plataforma simulada de rastreabilidade e demonstração institucional', status: 'approved', simulated_only: true, metadata_only: true }],
  prohibitedClaims: [{ id: 'claim-no-1', claim: 'certificação diagnóstica, validação científica ou parceria formalizada', status: 'prohibited', simulated_only: true, metadata_only: true }],
  preMeetingChecklists: [{ id: 'pre-v44', items: ['revisar guardrails', 'confirmar sem CRM/email real', 'aprovar roteiro por humano'], simulated_only: true, metadata_only: true, human_review_required: true }],
  postMeetingChecklists: [{ id: 'post-v44', items: ['registrar feedback simulado', 'não criar lead real', 'preparar v4.5 apenas como simulação'], simulated_only: true, metadata_only: true, human_review_required: true }],
  distributionLogs: [{ id: 'distribution-log-v44', events: ['kit preparado', 'materiais simulados revisados', 'nenhuma comunicação real enviada'], no_real_email: true, no_real_crm: true, no_real_lead_collection: true, simulated_only: true, metadata_only: true }],
  riskRegister: { id: 'risk-v44', risks: ['confundir kit com proposta vinculante', 'acionar CRM ou email real', 'inferir cliente, contrato, parceria ou validação'], simulated_only: true, metadata_only: true, human_review_required: true },
  humanReviewQueue: { id: 'human-v44', items: ['validar claims', 'aprovar roteiro', 'bloquear compromisso comercial ou jurídico'], simulated_only: true, metadata_only: true, human_review_required: true },
  auditTrail: { id: 'audit-v44', events: ['v4.3 release candidate linked', 'partner kit prepared', 'v4.5 feedback preparation marked simulated'], append_only_simulated: true, simulated_only: true, metadata_only: true },
  executiveReport: { id: 'report-v44', summary: DEMO_DISTRIBUTION_REQUIRED_STATEMENT, decision: 'distribution_ready', simulated_only: true, metadata_only: true, human_review_required: true, demo_distribution_only: true, partner_presentation_only: true, release_candidate_linked: true },
}]
export const SIMULATED_DEMO_DISTRIBUTION_SCENARIOS = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.flatMap((x) => x.demoDistributionScenarios)
export const SIMULATED_PARTNER_PRESENTATION_AUDIENCE_PROFILES = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.flatMap((x) => x.audienceProfiles)
export const SIMULATED_PARTNER_PRESENTATION_NARRATIVE_TRACKS = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.flatMap((x) => x.narrativeTracks)
export const SIMULATED_PARTNER_PRESENTATION_PACKAGES = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.flatMap((x) => x.presentationPackages)
export const SIMULATED_PARTNER_PRESENTATION_MATERIALS = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.flatMap((x) => x.materials)
export const SIMULATED_PARTNER_PRESENTATION_ONE_PAGERS = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.flatMap((x) => x.onePagers)
export const SIMULATED_PARTNER_PRESENTATION_DECK_OUTLINES = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.flatMap((x) => x.deckOutlines)
export const SIMULATED_PARTNER_PRESENTATION_DEMO_SCRIPTS = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.flatMap((x) => x.demoScripts)
export const SIMULATED_PARTNER_PRESENTATION_ROUTE_MAPS = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.flatMap((x) => x.routeMaps)
export const SIMULATED_PARTNER_PRESENTATION_AUTHORIZED_CLAIMS = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.flatMap((x) => x.authorizedClaims)
export const SIMULATED_PARTNER_PRESENTATION_PROHIBITED_CLAIMS = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.flatMap((x) => x.prohibitedClaims)
export const SIMULATED_PARTNER_PRESENTATION_PRE_MEETING_CHECKLISTS = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.flatMap((x) => x.preMeetingChecklists)
export const SIMULATED_PARTNER_PRESENTATION_POST_MEETING_CHECKLISTS = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.flatMap((x) => x.postMeetingChecklists)
export const SIMULATED_PARTNER_PRESENTATION_DISTRIBUTION_LOGS = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.flatMap((x) => x.distributionLogs)
export const SIMULATED_PARTNER_PRESENTATION_RISK_REGISTERS = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.map((x) => x.riskRegister)
export const SIMULATED_PARTNER_PRESENTATION_HUMAN_REVIEW_QUEUES = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.map((x) => x.humanReviewQueue)
export const SIMULATED_PARTNER_PRESENTATION_AUDIT_TRAILS = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.map((x) => x.auditTrail)
export const SIMULATED_PARTNER_PRESENTATION_EXECUTIVE_REPORTS = SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS.map((x) => x.executiveReport)
