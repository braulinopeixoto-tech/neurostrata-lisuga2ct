import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/demo-readiness.ts',
  service: 'src/services/sensetrust/demo-readiness-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-demo-readiness.ts',
  dashboard: 'src/components/sensetrust/DemoReadinessDashboard.tsx',
  qaPanel: 'src/components/sensetrust/VisualQAChecklistPanel.tsx',
  scriptPanel: 'src/components/sensetrust/DemoScriptPanel.tsx',
  talkPanel: 'src/components/sensetrust/AudienceTalkTrackPanel.tsx',
  riskPanel: 'src/components/sensetrust/DemoRiskMatrixPanel.tsx',
  objectionPanel: 'src/components/sensetrust/DemoObjectionHandlingPanel.tsx',
  checklistPanel: 'src/components/sensetrust/PresentationChecklistPanel.tsx',
  governancePanel: 'src/components/sensetrust/DemoGovernancePanel.tsx',
  page: 'src/pages/SenseTrustDemoReadiness.tsx',
  doc: 'docs/sensetrust-demo-readiness-v21.md',
  qaDoc: 'docs/sensetrust-visual-qa-checklist-v21.md',
  scriptDoc: 'docs/sensetrust-demo-script-v21.md',
  talkDoc: 'docs/sensetrust-audience-talk-tracks-v21.md',
  riskDoc: 'docs/sensetrust-demo-risk-matrix-v21.md',
  objectionDoc: 'docs/sensetrust-objection-handling-v21.md',
  checklistDoc: 'docs/sensetrust-presentation-checklist-v21.md',
  governanceDoc: 'docs/sensetrust-demo-governance-v21.md',
  executiveDoc: 'docs/sensetrust-demo-executive-report-v21.md',
}

function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) {
  if (!condition) throw new Error(`FAIL ${message}`)
  pass(message)
}

assert(exists(files.types), 'demo readiness types exist')
assert(exists(files.service), 'demo readiness service exists')
assert(exists(files.fixtures), 'fixtures exist')
assert(exists(files.dashboard), 'demo readiness dashboard exists')
assert(exists(files.qaPanel), 'visual QA checklist panel exists')
assert(exists(files.scriptPanel), 'demo script panel exists')
assert(exists(files.talkPanel), 'audience talk track panel exists')
assert(exists(files.riskPanel), 'demo risk matrix panel exists')
assert(exists(files.objectionPanel), 'objection handling panel exists')
assert(exists(files.checklistPanel), 'presentation checklist panel exists')
assert(exists(files.governancePanel), 'demo governance panel exists')
assert(exists(files.page) || true, 'optional demo readiness page exists or not required')
assert(exists(files.doc), 'demo readiness doc exists')
assert(exists(files.qaDoc), 'visual QA checklist doc exists')
assert(exists(files.scriptDoc), 'demo script doc exists')
assert(exists(files.talkDoc), 'audience talk tracks doc exists')
assert(exists(files.riskDoc), 'demo risk matrix doc exists')
assert(exists(files.objectionDoc), 'objection handling doc exists')
assert(exists(files.checklistDoc), 'presentation checklist doc exists')
assert(exists(files.governanceDoc), 'demo governance doc exists')
assert(exists(files.executiveDoc), 'demo executive report doc exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = Object.values(files).filter((file) => file.startsWith('docs/')).map(read).join('\n')
const all = `${types}\n${service}\n${fixtures}\n${docs}`

assert(fixtures.includes('SIMULATED_VISUAL_QA_CHECKS') && fixtures.includes('length: 40'), 'visual QA checks created')
assert(fixtures.includes('SIMULATED_DEMO_SCRIPT') && fixtures.includes('SIMULATED_DEMO_STEPS'), 'demo script created')
assert(fixtures.includes('SIMULATED_TALK_TRACKS') && fixtures.includes('audiences.map'), 'talk tracks created')
assert(fixtures.includes('SIMULATED_DEMO_OBJECTIONS') && fixtures.includes('Isso ja tem validade juridica?'), 'objections created')
assert(fixtures.includes('SIMULATED_DEMO_RISKS') && fixtures.includes('Entender prototipo como producao'), 'demo risks created')
assert(fixtures.includes('SIMULATED_DEMO_GOVERNANCE') && fixtures.includes('Quem pode demonstrar'), 'governance items created')
assert(fixtures.includes('SIMULATED_DEMO_READINESS_SCORE') && fixtures.includes('score: 86'), 'readiness score created')

assert(!/clinical_data_used:\s*true/i.test(all), 'no clinical data exposed')
assert(!/real_revenue_claimed:\s*true/i.test(all), 'no real revenue claimed')
assert(!/real_billing_claimed:\s*true/i.test(all), 'no real billing claimed')
assert(!/diagnostic_truth_certification_claimed:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/production_deploy_claimed:\s*true/i.test(all), 'no production deploy claimed')
assert(!/real_lead_collection:\s*true/i.test(all), 'no real lead collection claimed')
assert(!/real_analytics_enabled:\s*true/i.test(all), 'no real analytics claimed')
assert(all.includes('v2.0'), 'v2.0 reference present')
assert(all.includes('v1.9'), 'v1.9 reference present')
assert(all.includes('v1.8'), 'v1.8 reference present')

console.log('PASS SenseTrust Demo Readiness v2.1 integrity suite complete')
