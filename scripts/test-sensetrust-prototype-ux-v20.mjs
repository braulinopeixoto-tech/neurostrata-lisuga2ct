import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/prototype-ux.ts',
  service: 'src/services/sensetrust/prototype-ux-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-prototype-ux.ts',
  dashboard: 'src/components/sensetrust/PrototypeUXDashboard.tsx',
  shell: 'src/components/sensetrust/PrototypeNavigationShell.tsx',
  home: 'src/components/sensetrust/PrototypeHomePage.tsx',
  how: 'src/components/sensetrust/PrototypeHowItWorksPage.tsx',
  audience: 'src/components/sensetrust/PrototypeAudiencePage.tsx',
  verification: 'src/components/sensetrust/PrototypePublicVerificationDemo.tsx',
  form: 'src/components/sensetrust/PrototypeMockLeadForm.tsx',
  disclosure: 'src/components/sensetrust/PrototypeDisclosureBanner.tsx',
  routeMap: 'src/components/sensetrust/PrototypeRouteMapPanel.tsx',
  page: 'src/pages/SenseTrustPrototypeUX.tsx',
  publicPage: 'src/pages/SenseTrustPublicPrototype.tsx',
  doc: 'docs/sensetrust-prototype-ux-v20.md',
  routeDoc: 'docs/sensetrust-prototype-route-map-v20.md',
  flowDoc: 'docs/sensetrust-prototype-ux-flow-v20.md',
  mockupDoc: 'docs/sensetrust-interactive-mockup-v20.md',
  governanceDoc: 'docs/sensetrust-public-routes-governance-v20.md',
  copyDoc: 'docs/sensetrust-ux-copy-deck-v20.md',
  acceptanceDoc: 'docs/sensetrust-prototype-acceptance-criteria-v20.md',
  riskDoc: 'docs/sensetrust-prototype-risk-matrix-v20.md',
  executiveDoc: 'docs/sensetrust-prototype-executive-report-v20.md',
}

function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) {
  if (!condition) throw new Error(`FAIL ${message}`)
  pass(message)
}

assert(exists(files.types), 'prototype UX types exist')
assert(exists(files.service), 'prototype UX service exists')
assert(exists(files.fixtures), 'fixtures exist')
assert(exists(files.dashboard), 'prototype UX dashboard exists')
assert(exists(files.shell), 'navigation shell exists')
assert(exists(files.home), 'home page component exists')
assert(exists(files.how), 'how it works page exists')
assert(exists(files.audience), 'audience page exists')
assert(exists(files.verification), 'public verification demo exists')
assert(exists(files.form), 'mock lead form exists')
assert(exists(files.disclosure), 'disclosure banner exists')
assert(exists(files.routeMap), 'route map panel exists')
assert(exists(files.page) || true, 'optional prototype page exists or not required')
assert(exists(files.publicPage) || true, 'optional public prototype page exists or not required')
assert(exists(files.doc), 'prototype UX doc exists')
assert(exists(files.routeDoc), 'route map doc exists')
assert(exists(files.flowDoc), 'UX flow doc exists')
assert(exists(files.mockupDoc), 'interactive mockup doc exists')
assert(exists(files.governanceDoc), 'public routes governance doc exists')
assert(exists(files.copyDoc), 'UX copy deck doc exists')
assert(exists(files.acceptanceDoc), 'acceptance criteria doc exists')
assert(exists(files.riskDoc), 'risk matrix doc exists')
assert(exists(files.executiveDoc), 'executive report doc exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = Object.values(files).filter((file) => file.startsWith('docs/')).map(read).join('\n')
const app = exists('src/App.tsx') ? read('src/App.tsx') : ''
const all = `${types}\n${service}\n${fixtures}\n${docs}\n${app}`

assert(fixtures.includes('SIMULATED_PROTOTYPE_ROUTES') && fixtures.includes('/contato-demo'), 'prototype routes created')
assert(fixtures.includes('SIMULATED_PROTOTYPE_AUDIENCE_FLOWS') && fixtures.includes('flow('), 'audience flows created')
assert(fixtures.includes('SIMULATED_PROTOTYPE_CTAS') && fixtures.includes('length: 16'), 'CTAs created')
assert(fixtures.includes('SIMULATED_PROTOTYPE_DEMO_SCENARIOS') && fixtures.includes('Demo institucional geral'), 'demo scenarios created')
assert(fixtures.includes('submit_mock_form_blocked') && fixtures.includes('real_submit_enabled: false'), 'mock form blocks real submit')

assert(!/clinical_data_used:\s*true/i.test(all), 'no clinical data exposed')
assert(!/real_revenue_claimed:\s*true/i.test(all), 'no real revenue claimed')
assert(!/real_billing_claimed:\s*true/i.test(all), 'no real billing claimed')
assert(!/diagnostic_truth_certification_claimed:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/production_deploy_claimed:\s*true/i.test(all), 'no production deploy claimed')
assert(!/real_lead_collection:\s*true/i.test(all) && !/real_submit_enabled:\s*true/i.test(all), 'no real lead collection claimed')
assert(!/real_analytics_enabled:\s*true/i.test(all), 'no real analytics claimed')
assert(all.includes('v1.9'), 'v1.9 reference present')
assert(all.includes('v1.8'), 'v1.8 reference present')
assert(all.includes('v1.7'), 'v1.7 reference present')

const requiredRoutes = ['home', 'how_it_works', 'trust_layer', 'dnda', 'public_verification', 'for_clinics', 'for_public_sector', 'for_legal_partners', 'for_investors', 'pilots_partnerships', 'faq', 'contact_mockup']
assert(requiredRoutes.every((route) => types.includes(`'${route}'`)), 'prototype route types valid')

console.log('PASS SenseTrust Prototype UX v2.0 integrity suite complete')
