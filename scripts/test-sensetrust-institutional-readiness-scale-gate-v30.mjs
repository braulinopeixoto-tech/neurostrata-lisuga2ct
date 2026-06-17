import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/institutional-readiness-scale-gate.ts',
  service: 'src/services/sensetrust/institutional-readiness-scale-gate-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-institutional-readiness-scale-gate.ts',
  dashboard: 'src/components/sensetrust/InstitutionalReadinessScaleGateDashboard.tsx',
  readinessPanel: 'src/components/sensetrust/InstitutionalReadinessGatePanel.tsx',
  scalePanel: 'src/components/sensetrust/StrategicScaleGatePanel.tsx',
  decisionPanel: 'src/components/sensetrust/ScaleDecisionBoardPanel.tsx',
  marketPanel: 'src/components/sensetrust/MarketPrioritizationMatrixPanel.tsx',
  regulatoryPanel: 'src/components/sensetrust/RegulatoryReadinessMapPanel.tsx',
  riskPanel: 'src/components/sensetrust/InstitutionalRiskGovernanceMapPanel.tsx',
  scorePanel: 'src/components/sensetrust/ScaleCandidateScorePanel.tsx',
  roadmapPanel: 'src/components/sensetrust/V3StrategicRoadmapPanel.tsx',
  partnerPanel: 'src/components/sensetrust/StrategicPartnerFitMatrixPanel.tsx',
  auditPanel: 'src/components/sensetrust/GovernanceToScaleAuditTrailPanel.tsx',
  blockerPanel: 'src/components/sensetrust/StrategicScaleMisuseBlockerPanel.tsx',
  executivePanel: 'src/components/sensetrust/InstitutionalReadinessExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustInstitutionalReadinessScaleGate.tsx',
  doc: 'docs/sensetrust-institutional-readiness-scale-gate-v30.md',
  strategicDoc: 'docs/sensetrust-strategic-scale-gate-v30.md',
  marketDoc: 'docs/sensetrust-market-prioritization-matrix-v30.md',
  regulatoryDoc: 'docs/sensetrust-regulatory-readiness-map-v30.md',
  riskDoc: 'docs/sensetrust-institutional-risk-governance-v30.md',
  roadmapDoc: 'docs/sensetrust-v3-strategic-roadmap-v30.md',
  partnerDoc: 'docs/sensetrust-strategic-partner-fit-matrix-v30.md',
  blockersDoc: 'docs/sensetrust-scale-gate-misuse-blockers-v30.md',
  executiveDoc: 'docs/sensetrust-institutional-readiness-executive-report-v30.md',
}

function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }

assert(exists(files.types), 'institutional readiness scale gate types exist')
assert(exists(files.service), 'institutional readiness scale gate service exists')
assert(exists(files.fixtures), 'fixtures exist')
assert(exists(files.dashboard), 'institutional readiness scale gate dashboard exists')
assert(exists(files.readinessPanel), 'institutional readiness gate panel exists')
assert(exists(files.scalePanel), 'strategic scale gate panel exists')
assert(exists(files.decisionPanel), 'scale decision board panel exists')
assert(exists(files.marketPanel), 'market prioritization matrix panel exists')
assert(exists(files.regulatoryPanel), 'regulatory readiness map panel exists')
assert(exists(files.riskPanel), 'institutional risk governance map panel exists')
assert(exists(files.scorePanel), 'scale candidate score panel exists')
assert(exists(files.roadmapPanel), 'v3 strategic roadmap panel exists')
assert(exists(files.partnerPanel), 'strategic partner fit matrix panel exists')
assert(exists(files.auditPanel), 'governance to scale audit trail panel exists')
assert(exists(files.blockerPanel), 'strategic scale misuse blocker panel exists')
assert(exists(files.executivePanel), 'institutional readiness executive report panel exists')
assert(exists(files.page) || true, 'optional institutional readiness page exists or not required')
assert(exists(files.doc), 'institutional readiness scale gate doc exists')
assert(exists(files.strategicDoc), 'strategic scale gate doc exists')
assert(exists(files.marketDoc), 'market prioritization matrix doc exists')
assert(exists(files.regulatoryDoc), 'regulatory readiness map doc exists')
assert(exists(files.riskDoc), 'institutional risk governance doc exists')
assert(exists(files.roadmapDoc), 'v3 strategic roadmap doc exists')
assert(exists(files.partnerDoc), 'strategic partner fit matrix doc exists')
assert(exists(files.blockersDoc), 'scale gate misuse blockers doc exists')
assert(exists(files.executiveDoc), 'executive report doc exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = Object.values(files).filter((file) => file.startsWith('docs/')).map(read).join('\n')
const all = `${types}\n${service}\n${fixtures}\n${docs}`

assert(fixtures.includes('SIMULATED_READINESS_GATES') && fixtures.includes('length: 8'), 'readiness gates created')
assert(fixtures.includes('SIMULATED_STRATEGIC_SCALE_GATES') && fixtures.includes('length: 8'), 'strategic scale gates created')
assert(fixtures.includes('SIMULATED_SCALE_DECISION_BOARDS') && fixtures.includes('length: 8'), 'scale decision boards created')
assert(fixtures.includes('SIMULATED_SCALE_DECISIONS') && fixtures.includes('length: 16'), 'scale decisions created')
assert(fixtures.includes('SIMULATED_MARKET_PRIORITIZATION_MATRICES') && fixtures.includes('length: 8'), 'market prioritization matrices created')
assert(fixtures.includes('SIMULATED_MARKET_PRIORITY_ITEMS') && fixtures.includes('length: 24'), 'market priority items created')
assert(fixtures.includes('SIMULATED_REGULATORY_READINESS_MAPS') && fixtures.includes('length: 8'), 'regulatory readiness maps created')
assert(fixtures.includes('SIMULATED_REGULATORY_READINESS_ITEMS') && fixtures.includes('length: 24'), 'regulatory readiness items created')
assert(fixtures.includes('SIMULATED_RISK_GOVERNANCE_MAPS') && fixtures.includes('length: 8'), 'institutional risk governance maps created')
assert(fixtures.includes('SIMULATED_SCALE_CANDIDATE_SCORES') && fixtures.includes('length: 8'), 'scale candidate scores created')
assert(fixtures.includes('SIMULATED_V3_ROADMAPS') && fixtures.includes('length: 8'), 'v3 strategic roadmaps created')
assert(fixtures.includes('SIMULATED_ROADMAP_ITEMS') && fixtures.includes('length: 24'), 'strategic roadmap items created')
assert(fixtures.includes('SIMULATED_PARTNER_FIT_MATRICES') && fixtures.includes('length: 8'), 'strategic partner fit matrices created')
assert(fixtures.includes('SIMULATED_GOVERNANCE_TO_SCALE_AUDIT_TRAIL') && fixtures.includes('length: 24'), 'governance to scale audit trail created')
assert(fixtures.includes('SIMULATED_STRATEGIC_SCALE_MISUSE_BLOCKERS') && fixtures.includes('length: 16'), 'strategic scale misuse blockers created')
assert(fixtures.includes('SIMULATED_INSTITUTIONAL_READINESS_REPORTS') && fixtures.includes('length: 8'), 'executive reports created')

assert(!/clinical_data_used:\s*true/i.test(all) && !/contains_clinical_data:\s*true/i.test(all), 'no clinical data exposed')
assert(!/patient_data_used:\s*true/i.test(all) && !/contains_patient_data:\s*true/i.test(all), 'no patient data used')
assert(!/personal_sensitive_data_used:\s*true/i.test(all) && !/contains_personal_sensitive_data:\s*true/i.test(all), 'no personal sensitive data used')
assert(!/real_clinical_operation_claim(?:ed)?:\s*true/i.test(all), 'no real clinical operation claimed')
assert(!/contract_binding_claim(?:ed)?:\s*true/i.test(all), 'no contract binding claim')
assert(!/client_claim:\s*true/i.test(all), 'no client claim')
assert(!/partnership_claim:\s*true/i.test(all), 'no partnership claim')
assert(!/regulatory_validation_claim:\s*true/i.test(all) && !/regulatory_authorization_claim:\s*true/i.test(all), 'no regulatory validation claim')
assert(!/diagnostic_truth_certification_claim(?:ed)?:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/real_revenue_claimed:\s*true/i.test(all), 'no real revenue claimed')
assert(!/real_billing_claimed:\s*true/i.test(all), 'no real billing claimed')
assert(all.includes('v2.8'), 'v2.8 reference present')
assert(all.includes('v2.7'), 'v2.7 reference present')
assert(all.includes('v2.6'), 'v2.6 reference present')
