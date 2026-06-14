import fs from 'node:fs'
import path from 'node:path'

const docs = {
  onboarding: 'docs/sensetrust-pilot-onboarding-v12.md',
  terms: 'docs/sensetrust-pilot-terms-of-use-v12.md',
  consent: 'docs/sensetrust-pilot-informed-consent-v12.md',
  agreement: 'docs/sensetrust-closed-pilot-agreement-v12.md',
  raci: 'docs/sensetrust-pilot-raci-v12.md',
  questionnaire: 'docs/sensetrust-pilot-onboarding-questionnaire-v12.md',
  checklist: 'docs/sensetrust-pilot-implementation-checklist-v12.md',
  acceptance: 'docs/sensetrust-pilot-supervised-acceptance-v12.md',
  dataPolicy: 'docs/sensetrust-pilot-data-policy-v12.md',
  riskMap: 'docs/sensetrust-pilot-legal-ethical-risk-map-v12.md',
  legalQueue: 'docs/sensetrust-legal-review-queue-v12.md',
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

const content = Object.fromEntries(Object.entries(docs).map(([key, file]) => [key, read(file)]))
const all = Object.values(content).join('\n')
const lower = all.toLowerCase()

pass('pilot onboarding doc exists')
pass('pilot terms of use exists')
pass('informed consent exists')
pass('closed pilot agreement exists')
pass('RACI exists')
pass('onboarding questionnaire exists')
pass('implementation checklist exists')
pass('supervised acceptance exists')
pass('data policy exists')
pass('legal ethical risk map exists')
pass('legal review queue exists')

for (const term of ['NeuroStrata', 'VitalStrata', 'DNDA', 'BLC', 'Trust Layer', 'LGPD', 'Neurodireitos']) {
  assert(all.includes(term), `missing:${term}`)
  pass(`documents mention ${term}`)
}

assert(lower.includes('nao inserir dado clinico real') || lower.includes('nao deve inserir dado clinico real') || lower.includes('não deve inserir dado clínico real'), 'missing no clinical data')
pass('documents state no real clinical data')

assert(lower.includes('nao certifica verdade diagnostica absoluta') || lower.includes('não certifica verdade diagnóstica absoluta'), 'missing diagnostic truth disclaimer')
pass('documents state no diagnostic truth certification')

assert(lower.includes('billing real') && (lower.includes('nao') || lower.includes('sem')), 'missing billing disclaimer')
pass('documents state no real billing')

assert(lower.includes('assinatura legal real') && (lower.includes('nao') || lower.includes('sem')), 'missing legal signature disclaimer')
pass('documents state no legal signature')

assert(lower.includes('revisao juridica obrigatoria') || lower.includes('revisão jurídica obrigatória'), 'missing legal review required')
pass('documents state legal review required')

assert(content.onboarding.includes('1. Convite ao piloto') && content.onboarding.includes('12. Decisao go/no-go'), 'onboarding flow missing')
pass('onboarding flow defined')

assert(content.agreement.toLowerCase().includes('responsabilidades do proponente') && content.agreement.toLowerCase().includes('responsabilidades do participante'), 'responsibilities missing')
pass('responsibilities defined')

assert(content.dataPolicy.toLowerCase().includes('dados proibidos') && content.dataPolicy.toLowerCase().includes('paciente real'), 'data policy prohibited data missing')
pass('data policy defines prohibited data')

assert(content.riskMap.toLowerCase().includes('gatilho de interrupcao') && content.riskMap.toLowerCase().includes('qualquer dado identificavel'), 'interruption trigger missing')
pass('risk map defines interruption triggers')

for (const forbidden of ['patient_name', 'patient_cpf', 'clinical_report:', 'document_full_text']) {
  assert(!lower.includes(forbidden), `forbidden:${forbidden}`)
}
pass('simulated only')

assert(lower.includes('v1.1'), 'missing v1.1 reference')
pass('v1.1 reference present')

assert(lower.includes('v1.0.1'), 'missing v1.0.1 reference')
pass('v1.0.1 reference present')
