import type {
  SenseTrustPilotCRMActivity,
  SenseTrustPilotCRMActivityType,
  SenseTrustPilotCRMExportPayload,
  SenseTrustPilotCRMFilter,
  SenseTrustPilotCRMRecord,
  SenseTrustPilotCRMReadiness,
  SenseTrustPilotCRMState,
  SenseTrustPilotDocumentStatus,
  SenseTrustPilotFeedback,
  SenseTrustPilotGoNoGoDecision,
  SenseTrustPilotPipelineStage,
  SenseTrustPilotRiskLevel,
} from '@/types/sensetrust/pilot-crm'
import { PILOT_CRM_SENSITIVE_DENYLIST, SIMULATED_PILOT_CRM_RECORDS } from '@/fixtures/sensetrust/simulated-pilot-crm'

export function createPilotCRMLead() {
  return { lead_id: 'LEAD-PILOT-SIM-001', organization_name: 'Clinica Neurofuncional Alfa', source: 'simulated_outbound' as const, simulated_only: true as const }
}

export function createDefaultPilotCRMRecords(): SenseTrustPilotCRMRecord[] {
  return SIMULATED_PILOT_CRM_RECORDS.map((record) => ({ ...record, activities: createPilotCRMActivityTimeline(record), feedback: [...record.feedback] }))
}

export function createPilotCRMState(): SenseTrustPilotCRMState {
  const records = createDefaultPilotCRMRecords()
  return { records, metrics: calculatePilotPipelineMetrics(records), simulated_only: true }
}

export function updatePilotPipelineStage(record: SenseTrustPilotCRMRecord, pipeline_stage: SenseTrustPilotPipelineStage) {
  return { ...record, pipeline_stage, updated_at: '2026-06-14T11:00:00.000Z' }
}

export function updatePilotDocumentStatus(record: SenseTrustPilotCRMRecord, field: keyof Pick<SenseTrustPilotCRMRecord, 'terms_status' | 'consent_status' | 'agreement_status' | 'data_policy_status' | 'raci_status'>, status: SenseTrustPilotDocumentStatus) {
  return { ...record, [field]: status, updated_at: '2026-06-14T11:00:00.000Z' }
}

export function updatePilotRiskLevel(record: SenseTrustPilotCRMRecord, risk_level: SenseTrustPilotRiskLevel, risk_notes: string) {
  return { ...record, risk_level, risk_notes, updated_at: '2026-06-14T11:00:00.000Z' }
}

export function addPilotCRMActivity(record: SenseTrustPilotCRMRecord, activity_type: SenseTrustPilotCRMActivityType, summary: string) {
  const activity: SenseTrustPilotCRMActivity = {
    activity_id: `ACT-PILOT-SIM-${String(record.activities.length + 1).padStart(3, '0')}`,
    record_id: record.record_id,
    activity_type,
    summary,
    occurred_at: '2026-06-14T11:00:00.000Z',
    simulated_only: true,
  }
  return { ...record, activities: [...record.activities, activity] }
}

export function addPilotFeedback(record: SenseTrustPilotCRMRecord, summary: string): SenseTrustPilotCRMRecord {
  const feedback: SenseTrustPilotFeedback = {
    feedback_id: `FDB-SIM-${String(record.feedback.length + 1).padStart(3, '0')}`,
    record_id: record.record_id,
    summary,
    sentiment: 'neutral',
    simulated_only: true,
  }
  return { ...record, feedback: [...record.feedback, feedback], feedback_status: 'viewed' }
}

export function calculatePilotCRMReadiness(record: SenseTrustPilotCRMRecord): SenseTrustPilotCRMReadiness {
  const checks = {
    onboarding: record.onboarding_status === 'accepted',
    terms: record.terms_status === 'accepted',
    consent: record.consent_status === 'accepted',
    agreement: record.agreement_status === 'accepted',
    data_policy: record.data_policy_status === 'accepted',
    raci: record.raci_status === 'accepted',
    demo: record.demo_status === 'accepted',
    feedback: ['viewed', 'accepted'].includes(record.feedback_status),
    risk: !['high', 'critical'].includes(record.risk_level),
    decision: ['go', 'go_with_restrictions'].includes(record.go_no_go_decision),
  }
  const passed = Object.entries(checks).filter(([, ok]) => ok).map(([key]) => key)
  const pending = Object.entries(checks).filter(([, ok]) => !ok).map(([key]) => key)
  return { record_id: record.record_id, score: passed.length, passed, pending }
}

export function calculatePilotPipelineMetrics(records: SenseTrustPilotCRMRecord[]) {
  return [
    { metric_id: 'total', label: 'total_pilots', value: records.length },
    { metric_id: 'active', label: 'active', value: records.filter((record) => record.status === 'active').length },
    { metric_id: 'blocked', label: 'blocked', value: records.filter((record) => record.status === 'blocked').length },
    { metric_id: 'approved', label: 'approved_for_next_phase', value: records.filter((record) => record.pipeline_stage === 'approved_for_next_phase').length },
    { metric_id: 'high_risk', label: 'high_or_critical_risk', value: records.filter((record) => ['high', 'critical'].includes(record.risk_level)).length },
  ]
}

export function filterPilotCRMRecords(records: SenseTrustPilotCRMRecord[], filter: SenseTrustPilotCRMFilter) {
  return records.filter((record) =>
    (!filter.stage || record.pipeline_stage === filter.stage) &&
    (!filter.status || record.status === filter.status) &&
    (!filter.risk_level || record.risk_level === filter.risk_level) &&
    (!filter.priority || record.priority === filter.priority),
  )
}

export function buildPilotCRMExportPayload(records = createDefaultPilotCRMRecords()): SenseTrustPilotCRMExportPayload {
  return { schema: 'sensetrust.pilot_crm_export.v1', exported_at: '2026-06-14T11:00:00.000Z', records, public_exposure: 'metadata_only', simulated_only: true }
}

export function validatePilotCRMExportPayload(payload: SenseTrustPilotCRMExportPayload) {
  return validateNoSensitive(payload)
}

export function assertPilotCRMNoSensitiveExposure(payload: unknown) {
  const result = validateNoSensitive(payload)
  if (!result.valid) throw new Error(`pilot_crm_sensitive_exposure:${result.exposed.join(',')}`)
  return true
}

export function assertPilotCRMSimulatedOnly(records: SenseTrustPilotCRMRecord[]) {
  if (!records.every((record) => record.simulated_only && record.organization_id.includes('SIM'))) throw new Error('pilot_crm_non_simulated_record')
  return true
}

export function recommendNextPilotAction(record: SenseTrustPilotCRMRecord) {
  if (record.risk_level === 'high' || record.risk_level === 'critical') return 'Mitigar risco antes de avancar.'
  if (record.agreement_status !== 'accepted') return 'Concluir contrato-piloto.'
  if (record.demo_status !== 'accepted') return 'Agendar ou concluir demo.'
  return record.next_action
}

export function evaluateGoNoGoDecision(record: SenseTrustPilotCRMRecord): SenseTrustPilotGoNoGoDecision {
  if (record.risk_level === 'critical') return 'no_go'
  if (record.risk_level === 'high') return 'hold'
  return record.go_no_go_decision
}

export function summarizePilotPipeline(records = createDefaultPilotCRMRecords()) {
  return { metrics: calculatePilotPipelineMetrics(records), summary: 'Pipeline CRM simulado metadata_only para pilotos fechados SenseTrust.' }
}

export function createPilotCRMActivityTimeline(record: SenseTrustPilotCRMRecord): SenseTrustPilotCRMActivity[] {
  return [
    ['invite_sent', 'Convite enviado'],
    ['terms_sent', 'Termo enviado'],
    ['consent_pending', 'Consentimento pendente'],
    ['demo_scheduled', 'Demo agendada'],
    ['feedback_collected', 'Feedback coletado'],
    ['go_no_go_recorded', 'Go/no-go registrado'],
  ].map(([activity_type, summary], index) => ({
    activity_id: `ACT-${record.record_id}-${String(index + 1).padStart(3, '0')}`,
    record_id: record.record_id,
    activity_type: activity_type as SenseTrustPilotCRMActivityType,
    summary,
    occurred_at: '2026-06-14T11:00:00.000Z',
    simulated_only: true,
  }))
}

export function linkPilotCRMToOnboarding(record: SenseTrustPilotCRMRecord) { return { record_id: record.record_id, onboarding_status: record.onboarding_status, link: 'SenseTrust Pilot Onboarding v1.2' } }
export function linkPilotCRMToPilotPackage(record: SenseTrustPilotCRMRecord) { return { record_id: record.record_id, link: 'SenseTrust Pilot Package v1.1' } }
export function linkPilotCRMToPilotConsole(record: SenseTrustPilotCRMRecord) { return { record_id: record.record_id, link: 'SenseTrust Pilot Console v1.0' } }
export function linkPilotCRMToMOC(record: SenseTrustPilotCRMRecord) { return { record_id: record.record_id, link: 'MOC_SenseTrust' } }

function validateNoSensitive(payload: unknown) {
  const serialized = JSON.stringify(payload).toLowerCase()
  const exposed = PILOT_CRM_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term))
  const valid = exposed.length === 0 && serialized.includes('metadata_only')
  return { valid, exposed }
}
