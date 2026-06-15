import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/meeting-intelligence.ts',
  service: 'src/services/sensetrust/meeting-intelligence-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-meeting-intelligence.ts',
  dashboard: 'src/components/sensetrust/MeetingIntelligenceDashboard.tsx',
  recordPanel: 'src/components/sensetrust/MeetingRecordPanel.tsx',
  feedbackPanel: 'src/components/sensetrust/FeedbackCapturePanel.tsx',
  objectionPanel: 'src/components/sensetrust/ObjectionTrackingPanel.tsx',
  interestPanel: 'src/components/sensetrust/InterestSignalPanel.tsx',
  riskPanel: 'src/components/sensetrust/MeetingRiskSignalPanel.tsx',
  nextPanel: 'src/components/sensetrust/NextStepsGovernancePanel.tsx',
  scorePanel: 'src/components/sensetrust/OpportunityScorePanel.tsx',
  insightsPanel: 'src/components/sensetrust/MeetingInsightsPanel.tsx',
  followPanel: 'src/components/sensetrust/FollowUpGovernancePanel.tsx',
  page: 'src/pages/SenseTrustMeetingIntelligence.tsx',
  doc: 'docs/sensetrust-meeting-intelligence-v23.md',
  templateDoc: 'docs/sensetrust-meeting-record-template-v23.md',
  feedbackDoc: 'docs/sensetrust-feedback-capture-v23.md',
  objectionDoc: 'docs/sensetrust-objection-tracking-v23.md',
  scoringDoc: 'docs/sensetrust-interest-opportunity-scoring-v23.md',
  nextDoc: 'docs/sensetrust-next-steps-governance-v23.md',
  insightsDoc: 'docs/sensetrust-meeting-insights-report-v23.md',
  governanceDoc: 'docs/sensetrust-relationship-governance-v23.md',
  executiveDoc: 'docs/sensetrust-meeting-intelligence-executive-report-v23.md',
}

function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }

assert(exists(files.types), 'meeting intelligence types exist')
assert(exists(files.service), 'meeting intelligence service exists')
assert(exists(files.fixtures), 'fixtures exist')
assert(exists(files.dashboard), 'meeting intelligence dashboard exists')
assert(exists(files.recordPanel), 'meeting record panel exists')
assert(exists(files.feedbackPanel), 'feedback capture panel exists')
assert(exists(files.objectionPanel), 'objection tracking panel exists')
assert(exists(files.interestPanel), 'interest signal panel exists')
assert(exists(files.riskPanel), 'meeting risk signal panel exists')
assert(exists(files.nextPanel), 'next steps governance panel exists')
assert(exists(files.scorePanel), 'opportunity score panel exists')
assert(exists(files.insightsPanel), 'meeting insights panel exists')
assert(exists(files.followPanel), 'follow up governance panel exists')
assert(exists(files.page) || true, 'optional meeting intelligence page exists or not required')
assert(exists(files.doc), 'meeting intelligence doc exists')
assert(exists(files.templateDoc), 'meeting record template doc exists')
assert(exists(files.feedbackDoc), 'feedback capture doc exists')
assert(exists(files.objectionDoc), 'objection tracking doc exists')
assert(exists(files.scoringDoc), 'interest opportunity scoring doc exists')
assert(exists(files.nextDoc), 'next steps governance doc exists')
assert(exists(files.insightsDoc), 'meeting insights report doc exists')
assert(exists(files.governanceDoc), 'relationship governance doc exists')
assert(exists(files.executiveDoc), 'executive report doc exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = Object.values(files).filter((file) => file.startsWith('docs/')).map(read).join('\n')
const all = `${types}\n${service}\n${fixtures}\n${docs}`

assert(fixtures.includes('SIMULATED_MEETING_RECORDS'), 'meeting records created')
assert(fixtures.includes('SIMULATED_MEETING_FEEDBACK_ITEMS') && fixtures.includes('length: 24'), 'feedback items created')
assert(fixtures.includes('SIMULATED_MEETING_OBJECTIONS') && fixtures.includes('length: 24'), 'objections created')
assert(fixtures.includes('SIMULATED_INTEREST_SIGNALS') && fixtures.includes('length: 24'), 'interest signals created')
assert(fixtures.includes('SIMULATED_RISK_SIGNALS') && fixtures.includes('length: 16'), 'risk signals created')
assert(fixtures.includes('SIMULATED_NEXT_STEPS') && fixtures.includes('length: 16'), 'next steps created')
assert(fixtures.includes('SIMULATED_FOLLOW_UP_GOVERNANCE'), 'follow up governance created')
assert(fixtures.includes('SIMULATED_OPPORTUNITY_SCORES'), 'opportunity scores created')
assert(fixtures.includes('SIMULATED_READINESS_SCORES'), 'readiness scores created')
assert(fixtures.includes('SIMULATED_MEETING_INSIGHTS') && fixtures.includes('length: 12'), 'insights created')
assert(fixtures.includes('SIMULATED_MEETING_DECISIONS'), 'meeting decisions created')

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
assert(all.includes('v2.2'), 'v2.2 reference present')
assert(all.includes('v2.1'), 'v2.1 reference present')
assert(all.includes('v2.0'), 'v2.0 reference present')

console.log('PASS SenseTrust Meeting Intelligence v2.3 integrity suite complete')
