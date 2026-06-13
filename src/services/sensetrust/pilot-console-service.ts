import type {
  SenseTrustEndToEndObject,
  SenseTrustPilotAuditReport,
  SenseTrustPilotConsoleState,
  SenseTrustPilotExportPayload,
  SenseTrustPilotFlow,
  SenseTrustPilotFlowResult,
  SenseTrustPilotReadinessScore,
  SenseTrustPilotSafetyResult,
  SenseTrustPilotScenario,
  SenseTrustPilotStep,
} from '@/types/sensetrust/pilot-console'
import {
  PILOT_CONSOLE_IDS,
  PILOT_CONSOLE_SCENARIOS,
  PILOT_CONSOLE_SENSITIVE_DENYLIST,
  PILOT_CONSOLE_STEPS,
} from '@/fixtures/sensetrust/simulated-pilot-console'

export function createPilotScenario(scenarioId = 'SCENARIO-SIM-END-TO-END-001'): SenseTrustPilotScenario {
  return PILOT_CONSOLE_SCENARIOS.find((scenario) => scenario.scenario_id === scenarioId) ?? PILOT_CONSOLE_SCENARIOS[0]
}

export function createDefaultPilotScenarios(): SenseTrustPilotScenario[] {
  return PILOT_CONSOLE_SCENARIOS.map((scenario) => ({ ...scenario }))
}

export function createPilotConsoleState(): SenseTrustPilotConsoleState {
  return {
    selected_scenario_id: 'SCENARIO-SIM-END-TO-END-001',
    scenarios: createDefaultPilotScenarios(),
    current_flow: null,
    readiness_score: calculatePilotReadinessScore(),
    safety: validatePilotSafety(PILOT_CONSOLE_IDS),
  }
}

export function runPilotEndToEndFlow(scenarioId = 'SCENARIO-SIM-END-TO-END-001'): SenseTrustPilotFlowResult {
  const scenario = createPilotScenario(scenarioId)
  const flow: SenseTrustPilotFlow = {
    schema: 'sensetrust.pilot_console.v1',
    pilot_id: 'PILOT-SIM-2026-0001',
    scenario_id: scenario.scenario_id,
    organization_id: 'ORG-SIM-001',
    user_id: 'USR-SIM-001',
    plan_id: 'PLAN-SIM-PROFESSIONAL',
    demo_mode: scenario.demo_mode,
    status: 'completed',
    steps: PILOT_CONSOLE_STEPS.map(runPilotStep),
    end_to_end_object: buildEndToEndObject(),
    audit_report_id: 'AUDIT-SIM-2026-0001',
    created_at: PILOT_CONSOLE_IDS.created_at,
    completed_at: PILOT_CONSOLE_IDS.completed_at,
    public_exposure: 'metadata_only',
    simulated_only: true,
  }
  const auditReport = buildPilotAuditReport(flow)
  return { ok: validateEndToEndObject(flow.end_to_end_object).valid, flow, audit_report: auditReport, readiness_score: calculatePilotReadinessScore() }
}

export function runPilotStep(step: SenseTrustPilotStep): SenseTrustPilotStep {
  return { ...step, status: 'passed' }
}

export function buildEndToEndObject(): SenseTrustEndToEndObject {
  return { ...PILOT_CONSOLE_IDS, simulated_only: true }
}

export function validateEndToEndObject(object: SenseTrustEndToEndObject) {
  const required = [
    'organization_id',
    'user_id',
    'plan_id',
    'document_id',
    'certificate_id',
    'evidence_manifest_id',
    'trust_object_id',
    'clinical_chain_id',
    'document_state_id',
    'emission_id',
    'timestamp_id',
    'public_verification_token',
    'usage_ledger_id',
    'audit_report_id',
  ]
  const missing = required.filter((key) => !object[key as keyof SenseTrustEndToEndObject])
  return { valid: missing.length === 0, missing }
}

export function buildPilotAuditReport(flow: SenseTrustPilotFlow): SenseTrustPilotAuditReport {
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

export function calculatePilotReadinessScore(): SenseTrustPilotReadinessScore {
  const criteria = [
    'seguranca',
    'privacidade',
    'integridade',
    'rastreabilidade',
    'demo navegavel',
    'documentacao',
    'regressoes',
    'build',
    'Obsidian',
    'Git',
  ].map((criterion) => ({ criterion, passed: !['build', 'Obsidian', 'Git'].includes(criterion) }))
  return {
    score: criteria.filter((item) => item.passed).length,
    criteria,
    status: criteria.every((item) => item.passed) ? 'ready_for_demo' : 'blocked',
  }
}

export function validatePilotSafety(payload: unknown): SenseTrustPilotSafetyResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const blocked = PILOT_CONSOLE_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term))
  return { valid: blocked.length === 0, blocked_terms: blocked, public_exposure: 'metadata_only' }
}

export function assertPilotNoSensitiveExposure(payload: unknown) {
  const safety = validatePilotSafety(payload)
  if (!safety.valid) throw new Error(`pilot_sensitive_exposure:${safety.blocked_terms.join(',')}`)
  return true
}

export function buildPilotExportPayload(flow: SenseTrustPilotFlow): SenseTrustPilotExportPayload {
  return {
    schema: 'sensetrust.pilot_export.v1',
    pilot_id: flow.pilot_id,
    scenario_id: flow.scenario_id,
    audit_report_id: flow.audit_report_id,
    end_to_end_object: flow.end_to_end_object,
    readiness_score: calculatePilotReadinessScore(),
    public_exposure: 'metadata_only',
    simulated_only: true,
  }
}

export function validatePilotExportPayload(payload: SenseTrustPilotExportPayload) {
  return validatePilotSafety(payload)
}

export function simulatePilotFailure(flow: SenseTrustPilotFlow): SenseTrustPilotFlow {
  return { ...flow, status: 'failed', steps: flow.steps.map((step, index) => (index === 0 ? { ...step, status: 'failed' } : step)) }
}

export function simulatePilotReset(): SenseTrustPilotConsoleState {
  return createPilotConsoleState()
}

export function linkPilotToSaaSUsage() { return { organization_id: PILOT_CONSOLE_IDS.organization_id, usage_ledger_id: PILOT_CONSOLE_IDS.usage_ledger_id } }
export function linkPilotToPublicVerification() { return { token: PILOT_CONSOLE_IDS.public_verification_token } }
export function linkPilotToClinicalCommitChain() { return { clinical_chain_id: PILOT_CONSOLE_IDS.clinical_chain_id } }
export function linkPilotToSignatureTimestamp() { return { emission_id: PILOT_CONSOLE_IDS.emission_id, timestamp_id: PILOT_CONSOLE_IDS.timestamp_id } }
export function linkPilotToDocumentState() { return { document_state_id: PILOT_CONSOLE_IDS.document_state_id } }
export function linkPilotToTrustObject() { return { trust_object_id: PILOT_CONSOLE_IDS.trust_object_id } }
export function linkPilotToEvidenceManifest() { return { evidence_manifest_id: PILOT_CONSOLE_IDS.evidence_manifest_id } }
