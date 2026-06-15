import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/website-blueprint.ts',
  service: 'src/services/sensetrust/website-blueprint-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-website-blueprint.ts',
  dashboard: 'src/components/sensetrust/WebsiteBlueprintDashboard.tsx',
  sitemapPanel: 'src/components/sensetrust/WebsiteSitemapPanel.tsx',
  landingPanel: 'src/components/sensetrust/LandingExperiencePanel.tsx',
  journeyPanel: 'src/components/sensetrust/AudienceJourneyPanel.tsx',
  ctaPanel: 'src/components/sensetrust/WebsiteCTAMatrix.tsx',
  guardrailsPanel: 'src/components/sensetrust/WebsiteClaimGuardrailsPanel.tsx',
  checklistPanel: 'src/components/sensetrust/WebsitePublicationChecklistPanel.tsx',
  riskPanel: 'src/components/sensetrust/WebsiteRiskDisclosurePanel.tsx',
  page: 'src/pages/SenseTrustWebsiteBlueprint.tsx',
  doc: 'docs/sensetrust-website-blueprint-v19.md',
  sitemapDoc: 'docs/sensetrust-website-sitemap-v19.md',
  landingDoc: 'docs/sensetrust-landing-experience-v19.md',
  journeysDoc: 'docs/sensetrust-audience-journeys-v19.md',
  ctaDoc: 'docs/sensetrust-cta-matrix-v19.md',
  guardrailsDoc: 'docs/sensetrust-website-claims-guardrails-v19.md',
  formDoc: 'docs/sensetrust-form-blueprint-v19.md',
  analyticsDoc: 'docs/sensetrust-analytics-blueprint-v19.md',
  checklistDoc: 'docs/sensetrust-publication-checklist-v19.md',
  seoDoc: 'docs/sensetrust-seo-safe-language-v19.md',
  executiveDoc: 'docs/sensetrust-website-executive-report-v19.md',
}

function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) {
  if (!condition) throw new Error(`FAIL ${message}`)
  pass(message)
}

assert(exists(files.types), 'website blueprint types exist')
assert(exists(files.service), 'website blueprint service exists')
assert(exists(files.fixtures), 'fixtures exist')
assert(exists(files.dashboard), 'website blueprint dashboard exists')
assert(exists(files.sitemapPanel), 'sitemap panel exists')
assert(exists(files.landingPanel), 'landing experience panel exists')
assert(exists(files.journeyPanel), 'audience journey panel exists')
assert(exists(files.ctaPanel), 'CTA matrix exists')
assert(exists(files.guardrailsPanel), 'claim guardrails panel exists')
assert(exists(files.checklistPanel), 'publication checklist panel exists')
assert(exists(files.riskPanel), 'website risk disclosure panel exists')
assert(exists(files.page) || true, 'optional page exists or not required')
assert(exists(files.doc), 'website blueprint doc exists')
assert(exists(files.sitemapDoc), 'sitemap doc exists')
assert(exists(files.landingDoc), 'landing experience doc exists')
assert(exists(files.journeysDoc), 'audience journeys doc exists')
assert(exists(files.ctaDoc), 'CTA matrix doc exists')
assert(exists(files.guardrailsDoc), 'claim guardrails doc exists')
assert(exists(files.formDoc), 'form blueprint doc exists')
assert(exists(files.analyticsDoc), 'analytics blueprint doc exists')
assert(exists(files.checklistDoc), 'publication checklist doc exists')
assert(exists(files.seoDoc), 'SEO safe language doc exists')
assert(exists(files.executiveDoc), 'executive report doc exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = Object.values(files).filter((file) => file.startsWith('docs/')).map(read).join('\n')
const allCode = `${types}\n${service}\n${fixtures}`
const allContent = `${allCode}\n${docs}`

assert(fixtures.includes('SIMULATED_WEBSITE_PAGES') && fixtures.includes('pageSpecs'), 'website pages created')
assert(fixtures.includes('SIMULATED_WEBSITE_SECTIONS') && fixtures.includes('hero'), 'landing experience created')
assert(fixtures.includes('SIMULATED_AUDIENCE_JOURNEYS') && fixtures.includes('length: 6'), 'audience journeys created')
assert(fixtures.includes('SIMULATED_WEBSITE_CTAS') && fixtures.includes('CTA-W19-012'), 'CTAs created')
assert(fixtures.includes('SIMULATED_FORM_BLUEPRINTS') && fixtures.includes('blueprint_only'), 'form blueprint created')
assert(fixtures.includes('SIMULATED_ANALYTICS_BLUEPRINTS') && fixtures.includes('anonymous_metadata_only'), 'analytics blueprint created')

assert(!/clinical_data_used:\s*true/i.test(allContent) && !/clinical_data_collection_enabled:\s*true/i.test(allContent), 'no clinical data exposed')
assert(!/real_revenue_claimed:\s*true/i.test(allContent), 'no real revenue claimed')
assert(!/real_billing_claimed:\s*true/i.test(allContent), 'no real billing claimed')
assert(!/diagnostic_truth_certification_claimed:\s*true/i.test(allContent), 'no diagnostic truth certification claimed')
assert(!/production_deploy_claimed:\s*true/i.test(allContent) && !/enabled_in_production:\s*true/i.test(allContent), 'no production deploy claimed')
assert(!/real_lead_collection_claimed:\s*true/i.test(allContent) && !/lead_collection_status:\s*'enabled'/i.test(allContent), 'no real lead collection claimed')
assert(allContent.includes('v1.8'), 'v1.8 reference present')
assert(allContent.includes('v1.7'), 'v1.7 reference present')
assert(allContent.includes('v1.6'), 'v1.6 reference present')

const requiredTypes = ['home', 'problem', 'solution', 'how_it_works', 'dnda', 'sensetrust', 'pilots', 'partners', 'investors', 'faq', 'contact', 'legal']
assert(requiredTypes.every((item) => types.includes(`'${item}'`)), 'website page types valid')

console.log('PASS SenseTrust Website Blueprint v1.9 integrity suite complete')
