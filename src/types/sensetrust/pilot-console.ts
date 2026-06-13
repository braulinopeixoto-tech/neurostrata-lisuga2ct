export type SenseTrustPilotScenarioStatus = 'draft' | 'ready' | 'running' | 'completed' | 'failed' | 'blocked' | 'simulated_only'
export type SenseTrustPilotStepStatus = 'pending' | 'running' | 'passed' | 'failed' | 'skipped' | 'blocked'
export type SenseTrustPilotDemoMode =
  | 'simulated_end_to_end'
  | 'simulated_public_verification'
  | 'simulated_saas_usage'
  | 'simulated_audit_export'
  | 'future_live_pilot'

export interface SenseTrustPilotActor {
  user_id: string
  organization_id: string
  role: 'owner' | 'issuer' | 'auditor' | 'public_verifier'
  simulated_only: true
}

export interface SenseTrustPilotScenario {
  scenario_id: string
  title: string
  status: SenseTrustPilotScenarioStatus
  demo_mode: SenseTrustPilotDemoMode
  simulated_only: true
}

export interface SenseTrustPilotStep {
  step_id: string
  sequence: number
  label: string
  status: SenseTrustPilotStepStatus
  linked_module: string
  public_exposure: 'metadata_only'
}

export interface SenseTrustEndToEndObject {
  organization_id: string
  user_id: string
  plan_id: string
  document_id: string
  certificate_id: string
  evidence_manifest_id: string
  trust_object_id: string
  clinical_chain_id: string
  document_state_id: string
  emission_id: string
  timestamp_id: string
  public_verification_token: string
  usage_ledger_id: string
  audit_report_id: string
  simulated_only: true
}

export interface SenseTrustPilotAuditReport {
  audit_report_id: string
  pilot_id: string
  scenario_id: string
  steps_passed: number
  steps_failed: number
  hash_partials: {
    certificate_hash_partial: string
    emission_hash_partial: string
    document_hash_partial: string
  }
  public_payload_status: 'safe' | 'blocked'
  public_exposure: 'metadata_only'
  simulated_only: true
}

export interface SenseTrustPilotReadinessScore {
  score: number
  criteria: Array<{ criterion: string; passed: boolean }>
  status: 'ready_for_demo' | 'blocked'
}

export interface SenseTrustPilotFlow {
  schema: 'sensetrust.pilot_console.v1'
  pilot_id: 'PILOT-SIM-2026-0001'
  scenario_id: string
  organization_id: 'ORG-SIM-001'
  user_id: 'USR-SIM-001'
  plan_id: 'PLAN-SIM-PROFESSIONAL'
  demo_mode: SenseTrustPilotDemoMode
  status: SenseTrustPilotScenarioStatus
  steps: SenseTrustPilotStep[]
  end_to_end_object: SenseTrustEndToEndObject
  audit_report_id: 'AUDIT-SIM-2026-0001'
  created_at: string
  completed_at: string
  public_exposure: 'metadata_only'
  simulated_only: true
}

export interface SenseTrustPilotFlowResult {
  ok: boolean
  flow: SenseTrustPilotFlow
  audit_report: SenseTrustPilotAuditReport
  readiness_score: SenseTrustPilotReadinessScore
}

export interface SenseTrustPilotConsoleState {
  selected_scenario_id: string
  scenarios: SenseTrustPilotScenario[]
  current_flow: SenseTrustPilotFlow | null
  readiness_score: SenseTrustPilotReadinessScore
  safety: SenseTrustPilotSafetyResult
}

export interface SenseTrustPilotSafetyResult {
  valid: boolean
  blocked_terms: string[]
  public_exposure: 'metadata_only'
}

export interface SenseTrustPilotExportPayload {
  schema: 'sensetrust.pilot_export.v1'
  pilot_id: string
  scenario_id: string
  audit_report_id: string
  end_to_end_object: SenseTrustEndToEndObject
  readiness_score: SenseTrustPilotReadinessScore
  public_exposure: 'metadata_only'
  simulated_only: true
}
