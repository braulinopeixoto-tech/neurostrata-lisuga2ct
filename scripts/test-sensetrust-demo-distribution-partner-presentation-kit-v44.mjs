import fs from 'node:fs'
import path from 'node:path'
const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/demo-distribution-partner-presentation-kit.ts',
  service: 'src/services/sensetrust/demo-distribution-partner-presentation-kit-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-demo-distribution-partner-presentation-kit.ts',
  dashboard: 'src/components/sensetrust/SenseTrustDemoDistributionPartnerPresentationKitDashboard.tsx',
  kitPanel: 'src/components/sensetrust/SenseTrustDemoDistributionPartnerPresentationKitPanel.tsx',
  scenarioPanel: 'src/components/sensetrust/DemoDistributionScenarioPanel.tsx',
  audienceProfilePanel: 'src/components/sensetrust/PartnerPresentationAudienceProfilePanel.tsx',
  narrativeTrackPanel: 'src/components/sensetrust/PartnerPresentationNarrativeTrackPanel.tsx',
  packagePanel: 'src/components/sensetrust/PartnerPresentationPackagePanel.tsx',
  materialPanel: 'src/components/sensetrust/PartnerPresentationMaterialPanel.tsx',
  onePagerPanel: 'src/components/sensetrust/PartnerPresentationOnePagerPanel.tsx',
  deckOutlinePanel: 'src/components/sensetrust/PartnerPresentationDeckOutlinePanel.tsx',
  demoScriptPanel: 'src/components/sensetrust/PartnerPresentationDemoScriptPanel.tsx',
  routeMapPanel: 'src/components/sensetrust/PartnerPresentationRouteMapPanel.tsx',
  claimsMatrixPanel: 'src/components/sensetrust/PartnerPresentationClaimsMatrixPanel.tsx',
  checklistPanel: 'src/components/sensetrust/PartnerPresentationChecklistPanel.tsx',
  distributionLogPanel: 'src/components/sensetrust/PartnerPresentationDistributionLogPanel.tsx',
  riskRegisterPanel: 'src/components/sensetrust/PartnerPresentationRiskRegisterPanel.tsx',
  humanReviewQueuePanel: 'src/components/sensetrust/PartnerPresentationHumanReviewQueuePanel.tsx',
  auditTrailPanel: 'src/components/sensetrust/PartnerPresentationAuditTrailPanel.tsx',
  executiveReportPanel: 'src/components/sensetrust/PartnerPresentationExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustDemoDistributionPartnerPresentationKit.tsx',
}
const docs = ['docs/sensetrust-demo-distribution-partner-presentation-kit-v44.md','docs/sensetrust-demo-distribution-audience-profiles-v44.md','docs/sensetrust-demo-distribution-narrative-tracks-v44.md','docs/sensetrust-partner-presentation-package-v44.md','docs/sensetrust-partner-presentation-one-pager-v44.md','docs/sensetrust-partner-presentation-deck-outline-v44.md','docs/sensetrust-partner-presentation-demo-script-v44.md','docs/sensetrust-partner-presentation-claims-matrix-v44.md','docs/sensetrust-partner-presentation-distribution-governance-v44.md','docs/sensetrust-partner-presentation-executive-report-v44.md']
function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }
Object.entries(files).forEach(([k, f]) => assert(exists(f), `${k} exists`))
docs.forEach((f) => assert(exists(f), `${f} exists`))
const all = `${Object.values(files).map(read).join('\n')}\n${docs.map(read).join('\n')}\n${read('src/App.tsx')}`
const fixtures = read(files.fixtures)
assert(all.includes('/sensetrust/demo-distribution-partner-presentation-kit'), 'route registered')
for (const [needle, label] of [['SIMULATED_DEMO_DISTRIBUTION_PARTNER_PRESENTATION_KITS','demo distribution kits created'],['SIMULATED_DEMO_DISTRIBUTION_SCENARIOS','scenarios created'],['SIMULATED_PARTNER_PRESENTATION_AUDIENCE_PROFILES','audience profiles created'],['SIMULATED_PARTNER_PRESENTATION_NARRATIVE_TRACKS','narrative tracks created'],['SIMULATED_PARTNER_PRESENTATION_PACKAGES','presentation packages created'],['SIMULATED_PARTNER_PRESENTATION_MATERIALS','materials created'],['SIMULATED_PARTNER_PRESENTATION_ONE_PAGERS','one pagers created'],['SIMULATED_PARTNER_PRESENTATION_DECK_OUTLINES','deck outlines created'],['SIMULATED_PARTNER_PRESENTATION_DEMO_SCRIPTS','demo scripts created'],['SIMULATED_PARTNER_PRESENTATION_ROUTE_MAPS','route maps created'],['SIMULATED_PARTNER_PRESENTATION_AUTHORIZED_CLAIMS','authorized claims created'],['SIMULATED_PARTNER_PRESENTATION_PROHIBITED_CLAIMS','prohibited claims created'],['SIMULATED_PARTNER_PRESENTATION_PRE_MEETING_CHECKLISTS','pre meeting checklists created'],['SIMULATED_PARTNER_PRESENTATION_POST_MEETING_CHECKLISTS','post meeting checklists created'],['SIMULATED_PARTNER_PRESENTATION_DISTRIBUTION_LOGS','distribution logs created'],['SIMULATED_PARTNER_PRESENTATION_RISK_REGISTERS','risk register created'],['SIMULATED_PARTNER_PRESENTATION_HUMAN_REVIEW_QUEUES','human review queue created'],['SIMULATED_PARTNER_PRESENTATION_AUDIT_TRAILS','audit trail created'],['SIMULATED_PARTNER_PRESENTATION_EXECUTIVE_REPORTS','executive report created']]) assert(fixtures.includes(needle), label)
assert(all.includes('v4.3') || all.includes('Release Candidate'), 'v4.3 reference present')
assert(all.includes('v4.2') || all.includes('Command Center'), 'v4.2 reference present')
assert(all.includes('v4.1') || all.includes('Handoff'), 'v4.1 reference present')
assert(all.includes('v4.0') || all.includes('Closeout'), 'v4.0 reference present')
assert(all.includes('v3.9') || all.includes('Monitoring'), 'v3.9 reference present')
assert(all.includes('v3.8') || all.includes('Governance'), 'v3.8 reference present')
assert(all.includes('v3.7') || all.includes('Proposal'), 'v3.7 reference present')
assert(all.includes('SenseTrust Git Freeze Automation v1.2 Lean Mode'), 'v1.2 Lean reference present')
assert(all.includes('v4.5') || all.includes('Meeting Intelligence'), 'v4.5 preparation present')
assert(!/contains_clinical_data:\s*true|clinical_data_used:\s*true/i.test(all), 'no clinical data exposed')
assert(!/contains_patient_data:\s*true|patient_data_used:\s*true/i.test(all), 'no patient data used')
assert(!/real_biological_sample_claim:\s*true|biological_sample_used:\s*true/i.test(all), 'no biological sample used')
assert(!/real_eeg_claim:\s*true|real EEG used|real_qeeg_claim:\s*true|real qEEG used/i.test(all), 'no real EEG/qEEG used')
assert(!/real_client_claim(?:ed)?:\s*true|client_claim:\s*true/i.test(all), 'no real client claimed')
assert(!/real_contract_claim(?:ed)?:\s*true|contract_binding_claim:\s*true/i.test(all), 'no real contract claimed')
assert(!/real_partnership_claim(?:ed)?:\s*true|partnership_claim:\s*true/i.test(all), 'no real partnership claimed')
assert(!/real_billing_claim(?:ed)?:\s*true/i.test(all), 'no real billing claimed')
assert(!/real_crm_claim(?:ed)?:\s*true/i.test(all), 'no real CRM claimed')
assert(!/real_email_automation_claim(?:ed)?:\s*true/i.test(all), 'no real email automation claimed')
assert(!/real_lead_collection_claim(?:ed)?:\s*true/i.test(all), 'no real lead collection claimed')
assert(!/real_analytics_claim(?:ed)?:\s*true/i.test(all), 'no real analytics claimed')
assert(!/diagnostic_truth_certification_claim(?:ed)?:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/scientific_validation_claim(?:ed)?:\s*true|real_scientific_validation_claim:\s*true/i.test(all), 'no scientific validation claimed')
assert(!/regulatory_(validation|authorization)_claim(?:ed)?:\s*true/i.test(all), 'no regulatory validation claimed')
assert(!/outcome_guarantee_claim:\s*true/i.test(all), 'no outcome guarantee claimed')
assert(!/binding_proposal_claim:\s*true/i.test(all), 'no binding proposal claimed')
assert(!/commercial_commitment_claim:\s*true/i.test(all), 'no commercial commitment claimed')
assert(!/legal_commitment_claim:\s*true/i.test(all), 'no legal commitment claimed')
assert(all.includes('simulated_only'), 'simulated_only present')
assert(all.includes('metadata_only'), 'metadata_only present')
assert(all.includes('human_review_required'), 'human_review_required present')
assert(all.includes('demo_distribution_only'), 'demo_distribution_only present')
assert(all.includes('partner_presentation_only'), 'partner_presentation_only present')
assert(all.includes('release_candidate_linked'), 'release_candidate_linked present')
assert(all.includes('Diagnóstico Neurofuncional Dimensional Auditável'), 'DNDA defined exactly as Diagnóstico Neurofuncional Dimensional Auditável')
assert(!/neurodesenvolvimental/i.test(all), 'project terminology rule respected')
