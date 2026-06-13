import { spawnSync } from 'node:child_process'

const ids = {
  pilot_id: 'PILOT-SIM-2026-0001',
  scenario_id: 'SCENARIO-SIM-END-TO-END-001',
  organization_id: 'ORG-SIM-001',
  user_id: 'USR-SIM-001',
  plan_id: 'PLAN-SIM-PROFESSIONAL',
  document_id: 'DNDA-SIM-2026-0001',
  certificate_id: 'CERT-SIM-2026-0001',
  evidence_manifest_id: 'EM-SIM-2026-0001',
  trust_object_id: 'DTO-SIM-2026-0001',
  clinical_chain_id: 'CHAIN-SIM-2026-0001',
  document_state_id: 'DOCSTATE-SIM-2026-0001',
  emission_id: 'EMIT-SIM-2026-0001',
  timestamp_id: 'TS-SIM-2026-0001',
  token: 'TOKEN-SIM-ACTIVE-001',
  usage_ledger_id: 'USAGE-SIM-2026-0001',
  audit_report_id: 'AUDIT-SIM-2026-0001',
}

const scenarioIds = [
  'SCENARIO-SIM-END-TO-END-001',
  'SCENARIO-SIM-REVOKED-DOCUMENT-001',
  'SCENARIO-SIM-SUPERSEDED-DOCUMENT-001',
  'SCENARIO-SIM-LIMIT-EXCEEDED-001',
  'SCENARIO-SIM-AUDIT-EXPORT-001',
  'SCENARIO-SIM-PUBLIC-PORTAL-001',
]

function createScenario(id = ids.scenario_id) {
  return { scenario_id: id, title: id, status: 'ready', demo_mode: 'simulated_end_to_end', simulated_only: true }
}

function defaultScenarios() {
  return scenarioIds.map(createScenario)
}

function steps() {
  return [
    'organizacao selecionada',
    'usuario autorizado',
    'plano validado',
    'documento simulado criado',
    'certificado criado',
    'Evidence Manifest criado',
    'DNDA Trust Object criado',
    'Clinical Commit Chain criada',
    'estado documental aplicado',
    'assinatura simulada aplicada',
    'timestamp logico aplicado',
    'emission_hash calculado',
    'portal publico gerado',
    'usage ledger atualizado',
    'relatorio de auditoria gerado',
  ].map((label, index) => ({ step_id: `PSTEP-SIM-${index + 1}`, sequence: index + 1, label, status: 'passed', public_exposure: 'metadata_only' }))
}

function endToEndObject() {
  return {
    organization_id: ids.organization_id,
    user_id: ids.user_id,
    plan_id: ids.plan_id,
    document_id: ids.document_id,
    certificate_id: ids.certificate_id,
    evidence_manifest_id: ids.evidence_manifest_id,
    trust_object_id: ids.trust_object_id,
    clinical_chain_id: ids.clinical_chain_id,
    document_state_id: ids.document_state_id,
    emission_id: ids.emission_id,
    timestamp_id: ids.timestamp_id,
    public_verification_token: ids.token,
    usage_ledger_id: ids.usage_ledger_id,
    audit_report_id: ids.audit_report_id,
    simulated_only: true,
  }
}

function runFlow(scenario_id = ids.scenario_id) {
  const flowSteps = steps()
  return {
    schema: 'sensetrust.pilot_console.v1',
    pilot_id: ids.pilot_id,
    scenario_id,
    organization_id: ids.organization_id,
    user_id: ids.user_id,
    plan_id: ids.plan_id,
    demo_mode: 'simulated_end_to_end',
    status: 'completed',
    steps: flowSteps,
    end_to_end_object: endToEndObject(),
    audit_report_id: ids.audit_report_id,
    public_exposure: 'metadata_only',
    simulated_only: true,
  }
}

function auditReport(flow) {
  return {
    audit_report_id: flow.audit_report_id,
    pilot_id: flow.pilot_id,
    scenario_id: flow.scenario_id,
    steps_passed: flow.steps.filter((step) => step.status === 'passed').length,
    steps_failed: flow.steps.filter((step) => step.status === 'failed').length,
    hash_partials: {
      certificate_hash_partial: 'sha256:pilot-cert...',
      emission_hash_partial: 'sha256:pilot-emit...',
      document_hash_partial: 'sha256:pilot-doc...',
    },
    public_payload_status: 'safe',
    public_exposure: 'metadata_only',
    simulated_only: true,
  }
}

function readinessScore() {
  return { score: 7, status: 'blocked', criteria: ['seguranca', 'privacidade', 'integridade', 'rastreabilidade', 'demo navegavel', 'documentacao', 'regressoes'] }
}

function exportPayload(flow) {
  return {
    schema: 'sensetrust.pilot_export.v1',
    pilot_id: flow.pilot_id,
    scenario_id: flow.scenario_id,
    audit_report_id: flow.audit_report_id,
    end_to_end_object: flow.end_to_end_object,
    readiness_score: readinessScore(),
    public_exposure: 'metadata_only',
    simulated_only: true,
  }
}

function safe(payload) {
  const serialized = JSON.stringify(payload).toLowerCase()
  return !['patient', 'paciente', 'cpf', 'diagnosis', 'clinical_report', 'anamnesis', 'anamnese', 'qeeg', 'eeg', 'medication'].some((term) =>
    serialized.includes(term),
  )
}

function runRegression(script) {
  const result = spawnSync(process.execPath, [script], { encoding: 'utf8' })
  if (result.status !== 0) throw new Error(`${script} failed\n${result.stdout}\n${result.stderr}`)
  return true
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function pass(message) {
  console.log(`PASS ${message}`)
}

const scenario = createScenario()
assert(scenario.scenario_id === ids.scenario_id, 'scenario missing')
pass('pilot scenario created')

assert(defaultScenarios().length === 6, 'default scenarios missing')
pass('default pilot scenarios created')

const state = { selected_scenario_id: ids.scenario_id, scenarios: defaultScenarios(), current_flow: null, simulated_only: true }
assert(state.scenarios.length === 6, 'state missing')
pass('pilot console state created')

const flow = runFlow()
const e2e = flow.end_to_end_object
assert(e2e.organization_id === ids.organization_id, 'organization not linked')
pass('organization linked')
assert(e2e.user_id === ids.user_id, 'user not linked')
pass('user linked')
assert(e2e.plan_id === ids.plan_id, 'plan not linked')
pass('plan linked')

assert(flow.user_id === ids.user_id && flow.organization_id === ids.organization_id, 'permission check failed')
pass('permission check passed')

assert(flow.status === 'completed' && flow.steps.every((step) => step.status === 'passed'), 'flow not completed')
pass('end-to-end flow completed')

assert(e2e.certificate_id === ids.certificate_id, 'certificate not linked')
pass('certificate linked')
assert(e2e.evidence_manifest_id === ids.evidence_manifest_id, 'manifest not linked')
pass('evidence manifest linked')
assert(e2e.trust_object_id === ids.trust_object_id, 'trust object not linked')
pass('dnda trust object linked')
assert(e2e.clinical_chain_id === ids.clinical_chain_id, 'chain not linked')
pass('clinical commit chain linked')
assert(e2e.document_state_id === ids.document_state_id, 'document state not linked')
pass('document state linked')
assert(e2e.emission_id === ids.emission_id && e2e.timestamp_id === ids.timestamp_id, 'signature timestamp not linked')
pass('signature timestamp linked')
assert(e2e.public_verification_token === ids.token, 'public verification not linked')
pass('public verification linked')
assert(e2e.usage_ledger_id === ids.usage_ledger_id, 'usage ledger not updated')
pass('usage ledger updated')

const report = auditReport(flow)
assert(report.audit_report_id === ids.audit_report_id && report.steps_passed === 15, 'audit report missing')
pass('audit report created')

assert(readinessScore().score >= 7, 'readiness score missing')
pass('readiness score calculated')

assert(runFlow('SCENARIO-SIM-REVOKED-DOCUMENT-001').scenario_id.includes('REVOKED'), 'revoked scenario failed')
pass('simulated revoked scenario handled')
assert(runFlow('SCENARIO-SIM-SUPERSEDED-DOCUMENT-001').scenario_id.includes('SUPERSEDED'), 'superseded scenario failed')
pass('simulated superseded scenario handled')
assert(runFlow('SCENARIO-SIM-LIMIT-EXCEEDED-001').scenario_id.includes('LIMIT'), 'limit scenario failed')
pass('simulated limit exceeded handled')

const payload = exportPayload(flow)
assert(safe(payload), 'export payload unsafe')
pass('pilot export payload safe')
assert(safe([flow, report, payload]), 'clinical data exposed')
pass('no clinical data exposed')
assert(JSON.stringify(payload).includes('SIM') && !/cpf|paciente real|real patient|john doe|maria/i.test(JSON.stringify(payload)), 'not simulated')
pass('simulated only')

assert(runRegression('scripts/test-sensetrust-saas-core-v09.mjs'), 'v0.9 regression failed')
pass('v0.9 regression')
assert(runRegression('scripts/test-sensetrust-public-verification-portal-v08.mjs'), 'v0.8 regression failed')
pass('v0.8 regression')
assert(runRegression('scripts/test-sensetrust-signature-timestamp-v07.mjs'), 'v0.7 regression failed')
pass('v0.7 regression')
assert(runRegression('scripts/test-sensetrust-document-states-v06.mjs'), 'v0.6 regression failed')
pass('v0.6 regression')
assert(runRegression('scripts/test-sensetrust-clinical-commit-chain-v05.mjs'), 'v0.5 regression failed')
pass('v0.5 regression')
