import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/pipeline-governance.ts',
  service: 'src/services/sensetrust/pipeline-governance-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-pipeline-governance.ts',
  dashboard: 'src/components/sensetrust/PipelineGovernanceDashboard.tsx',
  prioritization: 'src/components/sensetrust/OpportunityPrioritizationBoard.tsx',
  goNoGo: 'src/components/sensetrust/GoNoGoDecisionPanel.tsx',
  readiness: 'src/components/sensetrust/InstitutionalReadinessPanel.tsx',
  riskMatrix: 'src/components/sensetrust/RiskPriorityMatrixPanel.tsx',
  reviewQueue: 'src/components/sensetrust/HumanReviewQueuePanel.tsx',
  nextMove: 'src/components/sensetrust/NextMoveRecommendationPanel.tsx',
  stageGate: 'src/components/sensetrust/PipelineStageGatePanel.tsx',
  auditTrail: 'src/components/sensetrust/DecisionBoardAuditTrailPanel.tsx',
  relationship: 'src/components/sensetrust/RelationshipGovernanceBoardPanel.tsx',
  page: 'src/pages/SenseTrustPipelineGovernance.tsx',
  doc: 'docs/sensetrust-pipeline-governance-v24.md',
  boardDoc: 'docs/sensetrust-pipeline-board-v24.md',
  prioritizationDoc: 'docs/sensetrust-opportunity-prioritization-v24.md',
  goNoGoDoc: 'docs/sensetrust-go-no-go-decision-v24.md',
  readinessDoc: 'docs/sensetrust-institutional-readiness-v24.md',
  queueDoc: 'docs/sensetrust-human-review-queue-v24.md',
  riskDoc: 'docs/sensetrust-pipeline-risk-matrix-v24.md',
  nextDoc: 'docs/sensetrust-next-move-governance-v24.md',
  auditDoc: 'docs/sensetrust-decision-audit-trail-v24.md',
  executiveDoc: 'docs/sensetrust-pipeline-governance-executive-report-v24.md',
}

function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }

assert(exists(files.types), 'pipeline governance types exist')
assert(exists(files.service), 'pipeline governance service exists')
assert(exists(files.fixtures), 'fixtures exist')
assert(exists(files.dashboard), 'pipeline governance dashboard exists')
assert(exists(files.prioritization), 'opportunity prioritization board exists')
assert(exists(files.goNoGo), 'go no-go decision panel exists')
assert(exists(files.readiness), 'institutional readiness panel exists')
assert(exists(files.riskMatrix), 'risk priority matrix panel exists')
assert(exists(files.reviewQueue), 'human review queue panel exists')
assert(exists(files.nextMove), 'next move recommendation panel exists')
assert(exists(files.stageGate), 'pipeline stage gate panel exists')
assert(exists(files.auditTrail), 'decision board audit trail panel exists')
assert(exists(files.relationship), 'relationship governance board panel exists')
assert(exists(files.page) || true, 'optional pipeline governance page exists or not required')
assert(exists(files.doc), 'pipeline governance doc exists')
assert(exists(files.boardDoc), 'pipeline board doc exists')
assert(exists(files.prioritizationDoc), 'opportunity prioritization doc exists')
assert(exists(files.goNoGoDoc), 'go no-go decision doc exists')
assert(exists(files.readinessDoc), 'institutional readiness doc exists')
assert(exists(files.queueDoc), 'human review queue doc exists')
assert(exists(files.riskDoc), 'pipeline risk matrix doc exists')
assert(exists(files.nextDoc), 'next move governance doc exists')
assert(exists(files.auditDoc), 'decision audit trail doc exists')
assert(exists(files.executiveDoc), 'executive report doc exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = Object.values(files).filter((file) => file.startsWith('docs/')).map(read).join('\n')
const all = `${types}\n${service}\n${fixtures}\n${docs}`

assert(fixtures.includes('SIMULATED_PIPELINE_OPPORTUNITIES') && fixtures.includes('length: 12'), 'pipeline opportunities created')
assert(fixtures.includes('SIMULATED_DECISION_BOARD'), 'decision board created')
assert(fixtures.includes('SIMULATED_GO_NO_GO_DECISIONS') && fixtures.includes('length: 12'), 'go/no-go decisions created')
assert(fixtures.includes('SIMULATED_PRIORITY_SCORES') && fixtures.includes('length: 12'), 'opportunity priority scores created')
assert(fixtures.includes('SIMULATED_READINESS_SCORES') && fixtures.includes('length: 12'), 'institutional readiness scores created')
assert(fixtures.includes('SIMULATED_PIPELINE_RISK_SCORES') && fixtures.includes('length: 12'), 'pipeline risk scores created')
assert(fixtures.includes('SIMULATED_HUMAN_REVIEW_QUEUE'), 'human review queue created')
assert(fixtures.includes('SIMULATED_NEXT_MOVES'), 'next move recommendations created')
assert(fixtures.includes('SIMULATED_STAGE_GATES'), 'stage gates created')
assert(fixtures.includes('SIMULATED_DECISION_AUDIT_TRAIL') && fixtures.includes('length: 20'), 'decision audit trail created')
assert(fixtures.includes('SIMULATED_RELATIONSHIP_GOVERNANCE_BOARD'), 'relationship governance board created')

assert(!/clinical_data_used:\s*true/i.test(all), 'no clinical data exposed')
assert(!/real_revenue_claimed:\s*true/i.test(all), 'no real revenue claimed')
assert(!/real_billing_claimed:\s*true/i.test(all), 'no real billing claimed')
assert(!/diagnostic_truth_certification_claimed:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/production_deploy_claimed:\s*true/i.test(all), 'no production deploy claimed')
assert(!/real_lead_collection:\s*true/i.test(all), 'no real lead collection claimed')
assert(!/real_crm_enabled:\s*true/i.test(all), 'no real CRM claimed')
assert(!/real_analytics_enabled:\s*true/i.test(all), 'no real analytics claimed')
assert(!/real_email_automation_enabled:\s*true/i.test(all), 'no real email automation claimed')
assert(!/contract_binding_claim(?:ed)?:\s*true/i.test(all), 'no contract binding claim')
assert(!/real_client_claimed:\s*true/i.test(all), 'no client claim')
assert(all.includes('v2.3'), 'v2.3 reference present')
assert(all.includes('v2.2'), 'v2.2 reference present')
assert(all.includes('v2.1'), 'v2.1 reference present')

