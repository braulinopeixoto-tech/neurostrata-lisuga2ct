import fs from 'node:fs'
import path from 'node:path'

const docs = {
  pilotPackage: 'docs/sensetrust-pilot-package-v11.md',
  onePage: 'docs/sensetrust-one-page-executive-v11.md',
  presentation: 'docs/sensetrust-commercial-technical-presentation-v11.md',
  liveDemo: 'docs/sensetrust-live-demo-script-v11.md',
  acceptance: 'docs/sensetrust-pilot-acceptance-criteria-v11.md',
  boundaries: 'docs/sensetrust-pilot-legal-ethical-boundaries-v11.md',
  proposal: 'docs/sensetrust-closed-pilot-proposal-v11.md',
  risk: 'docs/sensetrust-pilot-risk-matrix-v11.md',
  narrative: 'docs/sensetrust-ecosystem-narrative-v11.md',
}

function read(file) {
  const target = path.resolve(file)
  if (!fs.existsSync(target)) throw new Error(`missing:${file}`)
  return fs.readFileSync(target, 'utf8')
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function pass(message) {
  console.log(`PASS ${message}`)
}

const contents = Object.fromEntries(Object.entries(docs).map(([key, file]) => [key, read(file)]))
const all = Object.values(contents).join('\n')
const lower = all.toLowerCase()

pass('pilot package doc exists')
pass('one page executive exists')
pass('commercial technical presentation exists')
pass('live demo script exists')
pass('acceptance criteria exists')
pass('legal ethical boundaries exists')
pass('closed pilot proposal exists')
pass('pilot risk matrix exists')
pass('ecosystem narrative exists')

for (const term of ['NeuroStrata', 'VitalStrata', 'DNDA', 'BLC', 'Trust Layer', 'Neurodireitos']) {
  assert(all.includes(term), `missing:${term}`)
  pass(`documents mention ${term}`)
}

assert(lower.includes('metadata_only'), 'missing metadata_only')
pass('documents mention metadata_only')

assert(lower.includes('nao certifica verdade diagnostica absoluta') || lower.includes('não certifica verdade diagnóstica absoluta'), 'missing diagnostic truth disclaimer')
pass('documents state no diagnostic truth certification')

assert(lower.includes('sem dado clinico real') || lower.includes('sem dados identificaveis reais') || lower.includes('dados simulados'), 'missing real clinical data boundary')
pass('documents state no real clinical data')

assert(lower.includes('sem billing real') || lower.includes('billing real nao') || lower.includes('não billing real'), 'missing billing boundary')
pass('documents state no real billing')

assert(lower.includes('sem assinatura legal real') || lower.includes('assinatura legal real nesta fase'), 'missing legal signature boundary')
pass('documents state no legal signature')

assert(lower.includes('30 a 60 dias') && lower.includes('3 a 5'), 'missing pilot scope')
pass('documents define pilot scope')

assert(contents.acceptance.toLowerCase().includes('go/no-go') && contents.acceptance.toLowerCase().includes('audit report'), 'missing acceptance criteria')
pass('documents define acceptance criteria')

assert(contents.risk.toLowerCase().includes('mitigacao') && contents.risk.toLowerCase().includes('owner'), 'missing risk mitigation')
pass('documents define risk mitigations')

for (const forbidden of ['patient_name', 'patient_cpf', 'cpf: ', 'clinical_report:', 'document_full_text']) {
  assert(!lower.includes(forbidden), `forbidden:${forbidden}`)
}
pass('simulated only')

assert(lower.includes('v1.0.1'), 'missing v1.0.1 reference')
pass('v1.0.1 reference present')

assert(lower.includes('v1.0'), 'missing v1.0 reference')
pass('v1.0 reference present')
