import fs from 'node:fs'
import path from 'node:path'
const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/pilot-os-release-candidate.ts',
  service: 'src/services/sensetrust/pilot-os-release-candidate-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-pilot-os-release-candidate.ts',
  dashboard: 'src/components/sensetrust/SenseTrustPilotOSReleaseCandidateDashboard.tsx',
  releaseCandidatePanel: 'src/components/sensetrust/SenseTrustPilotOSReleaseCandidatePanel.tsx',
  versionMapPanel: 'src/components/sensetrust/PilotOSReleaseCandidateVersionMapPanel.tsx',
  acceptanceCriteriaPanel: 'src/components/sensetrust/PilotOSReleaseCandidateAcceptanceCriteriaPanel.tsx',
  readinessGatePanel: 'src/components/sensetrust/PilotOSReleaseCandidateReadinessGatePanel.tsx',
  demoFlowPanel: 'src/components/sensetrust/PilotOSReleaseCandidateDemoFlowPanel.tsx',
  navigationMapPanel: 'src/components/sensetrust/PilotOSReleaseCandidateNavigationMapPanel.tsx',
  proofChainSummaryPanel: 'src/components/sensetrust/PilotOSReleaseCandidateProofChainSummaryPanel.tsx',
  guardrailMatrixPanel: 'src/components/sensetrust/PilotOSReleaseCandidateGuardrailMatrixPanel.tsx',
  riskRegisterPanel: 'src/components/sensetrust/PilotOSReleaseCandidateRiskRegisterPanel.tsx',
  knownLimitationsPanel: 'src/components/sensetrust/PilotOSReleaseCandidateKnownLimitationsPanel.tsx',
  humanReviewQueuePanel: 'src/components/sensetrust/PilotOSReleaseCandidateHumanReviewQueuePanel.tsx',
  institutionalPackagePanel: 'src/components/sensetrust/PilotOSReleaseCandidateInstitutionalPackagePanel.tsx',
  executiveChecklistPanel: 'src/components/sensetrust/PilotOSReleaseCandidateExecutiveChecklistPanel.tsx',
  auditTrailPanel: 'src/components/sensetrust/PilotOSReleaseCandidateAuditTrailPanel.tsx',
  executiveReportPanel: 'src/components/sensetrust/PilotOSReleaseCandidateExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustPilotOSReleaseCandidate.tsx',
}
const docs = ['docs/sensetrust-pilot-os-release-candidate-v43.md','docs/sensetrust-pilot-os-version-map-v43.md','docs/sensetrust-pilot-os-acceptance-criteria-v43.md','docs/sensetrust-pilot-os-readiness-gates-v43.md','docs/sensetrust-pilot-os-demo-flow-v43.md','docs/sensetrust-pilot-os-navigation-map-v43.md','docs/sensetrust-pilot-os-proof-chain-summary-v43.md','docs/sensetrust-pilot-os-guardrail-matrix-v43.md','docs/sensetrust-pilot-os-institutional-package-v43.md','docs/sensetrust-pilot-os-executive-report-v43.md']
function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }
Object.entries(files).forEach(([k, f]) => assert(exists(f), `${k} exists`))
docs.forEach((f) => assert(exists(f), `${f} exists`))
const all = `${Object.values(files).map(read).join('\n')}\n${docs.map(read).join('\n')}\n${read('src/App.tsx')}`
const fixtures = read(files.fixtures)
assert(all.includes('/sensetrust/pilot-os-release-candidate'), 'route registered')
for (const [needle, label] of [['SIMULATED_PILOT_OS_RELEASE_CANDIDATES','release candidates created'],['SIMULATED_PILOT_OS_VERSION_MAPS','version map created'],['SIMULATED_PILOT_OS_ACCEPTANCE_CRITERIA','acceptance criteria created'],['SIMULATED_PILOT_OS_READINESS_GATES','readiness gates created'],['SIMULATED_PILOT_OS_DEMO_FLOWS','demo flows created'],['SIMULATED_PILOT_OS_NAVIGATION_MAPS','navigation map created'],['SIMULATED_PILOT_OS_PROOF_CHAIN_SUMMARIES','proof chain summary created'],['SIMULATED_PILOT_OS_GUARDRAIL_MATRICES','guardrail matrix created'],['SIMULATED_PILOT_OS_RISK_REGISTERS','risk register created'],['SIMULATED_PILOT_OS_KNOWN_LIMITATIONS','known limitations created'],['SIMULATED_PILOT_OS_HUMAN_REVIEW_QUEUES','human review queue created'],['SIMULATED_PILOT_OS_INSTITUTIONAL_PACKAGES','institutional packages created'],['SIMULATED_PILOT_OS_EXECUTIVE_CHECKLISTS','executive checklist created'],['SIMULATED_PILOT_OS_RELEASE_DECISIONS','release decision created'],['SIMULATED_PILOT_OS_AUDIT_TRAILS','audit trail created'],['SIMULATED_PILOT_OS_EXECUTIVE_REPORTS','executive report created']]) assert(fixtures.includes(needle), label)
assert(all.includes('v4.2') || all.includes('Command Center'), 'v4.2 reference present')
assert(all.includes('v4.1') || all.includes('Handoff'), 'v4.1 reference present')
assert(all.includes('v4.0') || all.includes('Closeout'), 'v4.0 reference present')
assert(all.includes('v3.9') || all.includes('Monitoring'), 'v3.9 reference present')
assert(all.includes('v3.8') || all.includes('Governance'), 'v3.8 reference present')
assert(all.includes('v3.7') || all.includes('Proposal'), 'v3.7 reference present')
assert(all.includes('SenseTrust Git Freeze Automation v1.2 Lean Mode'), 'v1.2 Lean reference present')
assert(all.includes('v4.4') || all.includes('Demo Distribution'), 'v4.4 preparation present')
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
assert(!/diagnostic_truth_certification_claim(?:ed)?:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/scientific_validation_claim(?:ed)?:\s*true|real_scientific_validation_claim:\s*true/i.test(all), 'no scientific validation claimed')
assert(!/regulatory_(validation|authorization)_claim(?:ed)?:\s*true/i.test(all), 'no regulatory validation claimed')
assert(!/outcome_guarantee_claim:\s*true/i.test(all), 'no outcome guarantee claimed')
assert(all.includes('simulated_only'), 'simulated_only present')
assert(all.includes('metadata_only'), 'metadata_only present')
assert(all.includes('human_review_required'), 'human_review_required present')
assert(all.includes('release_candidate_only'), 'release_candidate_only present')
assert(all.includes('demo_preparation_only'), 'demo_preparation_only present')
assert(all.includes('command_center_linked'), 'command_center_linked present')
assert(all.includes('Diagnóstico Neurofuncional Dimensional Auditável'), 'DNDA defined exactly as Diagnóstico Neurofuncional Dimensional Auditável')
assert(!/neurodesenvolvimental/i.test(all), 'project terminology rule respected')
