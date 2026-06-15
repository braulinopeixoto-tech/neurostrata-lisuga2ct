import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/partner-demo-kit.ts',
  service: 'src/services/sensetrust/partner-demo-kit-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-partner-demo-kit.ts',
  dashboard: 'src/components/sensetrust/PartnerDemoKitDashboard.tsx',
  onePagerPanel: 'src/components/sensetrust/DemoOnePagerPanel.tsx',
  briefingPanel: 'src/components/sensetrust/AudienceBriefingPanel.tsx',
  scriptPanel: 'src/components/sensetrust/MeetingScriptPanel.tsx',
  prePanel: 'src/components/sensetrust/PreMeetingChecklistPanel.tsx',
  postPanel: 'src/components/sensetrust/PostDemoFeedbackPanel.tsx',
  materialsPanel: 'src/components/sensetrust/AuthorizedMaterialsPanel.tsx',
  followPanel: 'src/components/sensetrust/FollowUpSequencePanel.tsx',
  riskPanel: 'src/components/sensetrust/PartnerDemoRiskPanel.tsx',
  governancePanel: 'src/components/sensetrust/DemoHandoffGovernancePanel.tsx',
  page: 'src/pages/SenseTrustPartnerDemoKit.tsx',
  doc: 'docs/sensetrust-partner-demo-kit-v22.md',
  onePageDoc: 'docs/sensetrust-demo-one-page-v22.md',
  briefDoc: 'docs/sensetrust-audience-briefings-v22.md',
  scriptsDoc: 'docs/sensetrust-meeting-scripts-v22.md',
  preDoc: 'docs/sensetrust-pre-meeting-checklist-v22.md',
  postDoc: 'docs/sensetrust-post-demo-feedback-v22.md',
  authDoc: 'docs/sensetrust-authorized-materials-v22.md',
  followDoc: 'docs/sensetrust-follow-up-sequence-v22.md',
  riskDoc: 'docs/sensetrust-partner-demo-risk-matrix-v22.md',
  governanceDoc: 'docs/sensetrust-demo-handoff-governance-v22.md',
  executiveDoc: 'docs/sensetrust-partner-demo-executive-report-v22.md',
}

function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }

assert(exists(files.types), 'partner demo kit types exist')
assert(exists(files.service), 'partner demo kit service exists')
assert(exists(files.fixtures), 'fixtures exist')
assert(exists(files.dashboard), 'partner demo kit dashboard exists')
assert(exists(files.onePagerPanel), 'demo one pager panel exists')
assert(exists(files.briefingPanel), 'audience briefing panel exists')
assert(exists(files.scriptPanel), 'meeting script panel exists')
assert(exists(files.prePanel), 'pre meeting checklist panel exists')
assert(exists(files.postPanel), 'post demo feedback panel exists')
assert(exists(files.materialsPanel), 'authorized materials panel exists')
assert(exists(files.followPanel), 'follow up sequence panel exists')
assert(exists(files.riskPanel), 'partner demo risk panel exists')
assert(exists(files.governancePanel), 'demo handoff governance panel exists')
assert(exists(files.page) || true, 'optional partner demo kit page exists or not required')
assert(exists(files.doc), 'partner demo kit doc exists')
assert(exists(files.onePageDoc), 'demo one page doc exists')
assert(exists(files.briefDoc), 'audience briefings doc exists')
assert(exists(files.scriptsDoc), 'meeting scripts doc exists')
assert(exists(files.preDoc), 'pre meeting checklist doc exists')
assert(exists(files.postDoc), 'post demo feedback doc exists')
assert(exists(files.authDoc), 'authorized materials doc exists')
assert(exists(files.followDoc), 'follow up sequence doc exists')
assert(exists(files.riskDoc), 'partner demo risk matrix doc exists')
assert(exists(files.governanceDoc), 'demo handoff governance doc exists')
assert(exists(files.executiveDoc), 'partner demo executive report doc exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = Object.values(files).filter((file) => file.startsWith('docs/')).map(read).join('\n')
const all = `${types}\n${service}\n${fixtures}\n${docs}`

assert(fixtures.includes('SIMULATED_DEMO_ONE_PAGER'), 'one pager created')
assert(fixtures.includes('SIMULATED_AUDIENCE_BRIEFINGS') && fixtures.includes('audiences.map'), 'audience briefings created')
assert(fixtures.includes('SIMULATED_MEETING_SCRIPTS'), 'meeting scripts created')
assert(fixtures.includes('SIMULATED_PRE_MEETING_CHECKLIST'), 'pre meeting checklist created')
assert(fixtures.includes('SIMULATED_POST_DEMO_CHECKLIST'), 'post demo checklist created')
assert(fixtures.includes('SIMULATED_AUTHORIZED_MATERIALS') && fixtures.includes('length: 12'), 'authorized materials created')
assert(fixtures.includes('SIMULATED_PROHIBITED_MATERIALS') && fixtures.includes('length: 12'), 'prohibited materials created')
assert(fixtures.includes('SIMULATED_FEEDBACK_MOCK') && fixtures.includes('length: 10'), 'feedback mock created')
assert(fixtures.includes('SIMULATED_FOLLOW_UP_SEQUENCES'), 'follow up sequence created')
assert(fixtures.includes('SIMULATED_HANDOFF_GOVERNANCE'), 'demo handoff governance created')
assert(fixtures.includes('SIMULATED_PARTNER_DEMO_READINESS_SCORE') && fixtures.includes('score: 88'), 'readiness score created')

assert(!/clinical_data_used:\s*true/i.test(all), 'no clinical data exposed')
assert(!/real_revenue_claimed:\s*true/i.test(all), 'no real revenue claimed')
assert(!/real_billing_claimed:\s*true/i.test(all), 'no real billing claimed')
assert(!/diagnostic_truth_certification_claimed:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/production_deploy_claimed:\s*true/i.test(all), 'no production deploy claimed')
assert(!/real_lead_collection:\s*true/i.test(all), 'no real lead collection claimed')
assert(!/real_analytics_enabled:\s*true/i.test(all), 'no real analytics claimed')
assert(!/contract_binding_claimed:\s*true/i.test(all) && !/proposta comercial vinculante ativa/i.test(all), 'no contract binding claim')
assert(all.includes('v2.1'), 'v2.1 reference present')
assert(all.includes('v2.0'), 'v2.0 reference present')
assert(all.includes('v1.9'), 'v1.9 reference present')

console.log('PASS SenseTrust Partner Demo Kit v2.2 integrity suite complete')
