import type {
  SenseTrustInstitutionalPilot,
  SenseTrustInstitutionalPilotAudienceType,
  SenseTrustInstitutionalPilotControlRoomState,
  SenseTrustInstitutionalPilotExportPayload,
  SenseTrustPilotAcceptanceCriterion,
  SenseTrustPilotCheckpoint,
  SenseTrustPilotDecisionLog,
  SenseTrustPilotEvidenceItem,
  SenseTrustPilotExecutionRisk,
  SenseTrustPilotExecutiveReport,
  SenseTrustPilotGovernanceBoard,
  SenseTrustPilotInterruptionRule,
  SenseTrustPilotRaciRole,
  SenseTrustPilotScope,
  SenseTrustPilotStatus,
  SenseTrustPilotStatusBoard,
  SenseTrustSupervisedAcceptanceRecord,
} from '@/types/sensetrust/institutional-pilot-control-room'

export const INSTITUTIONAL_PILOT_SENSITIVE_DENYLIST = ['patient_name', 'patient_cpf', 'clinical_payload', 'document_full_text', 'cpf real', 'cid real', 'qeeg real', 'eeg real', 'laudo real', 'paciente real']
export const INSTITUTIONAL_PILOT_REAL_CLAIM_DENYLIST = ['real revenue booked', 'billing real ativo', 'contrato real assinado', 'crm real ativo', 'analytics real ativo', 'email automation real', 'cliente real confirmado', 'parceria formalizada']
export const INSTITUTIONAL_PILOT_AUDIENCES: SenseTrustInstitutionalPilotAudienceType[] = ['clinics', 'public_sector', 'legal_partners', 'investors', 'institutions', 'regulators', 'internal_team']
export const INSTITUTIONAL_PILOT_STATUSES: SenseTrustPilotStatus[] = ['planned', 'scope_defined', 'governance_review', 'ready_for_supervised_demo', 'supervised_execution', 'acceptance_review', 'paused', 'completed_simulated']

export const SIMULATED_PILOT_SCOPES: SenseTrustPilotScope[] = Array.from({ length: 8 }, (_, index) => ({
  scope_id: `IP-SCOPE-${index + 1}`,
  pilot_id: `IP-PILOT-${index + 1}`,
  objective: 'Validar fluxo institucional supervisionado com materiais autorizados e evidencias metadata_only.',
  in_scope: ['demo supervisionada', 'registro de feedback', 'matriz de risco', 'criterios de aceite'],
  out_of_scope: ['atendimento real', 'dados clinicos reais', 'contrato vinculante', 'billing real'],
  allowed_materials: ['one-page autorizado', 'demo simulada', 'relatorio executivo metadata_only'],
  blocked_materials: ['laudo real', 'exame real', 'proposta vinculante', 'assinatura legal real'],
  allowed_data: ['metadados de reuniao', 'status simulado', 'riscos conceituais'],
  prohibited_data: ['CPF', 'CID', 'EEG real', 'qEEG real', 'dados de paciente'],
  simulated_duration: `${2 + index} semanas simuladas`,
  exit_decision: index > 5 ? 'pause' : 'continue',
  simulated_only: true,
}))

export const SIMULATED_PILOT_RACI_ROLES: SenseTrustPilotRaciRole[] = Array.from({ length: 24 }, (_, index) => ({
  role_id: `IP-RACI-${index + 1}`,
  pilot_id: `IP-PILOT-${(index % 8) + 1}`,
  role_name: ['responsavel institucional', 'revisor juridico', 'revisor tecnico'][index % 3],
  responsible: `Pessoa simulada ${index + 1}`,
  accountable: 'Comite SenseTrust simulado',
  consulted: ['juridico simulado', 'governanca institucional'],
  informed: ['time interno', 'decision board'],
  human_review_required: true,
  simulated_only: true,
}))

export const SIMULATED_PILOT_GOVERNANCE_BOARDS: SenseTrustPilotGovernanceBoard[] = Array.from({ length: 8 }, (_, index) => ({
  board_id: `IP-GOV-${index + 1}`,
  pilot_id: `IP-PILOT-${index + 1}`,
  title: `Governance board piloto simulado ${index + 1}`,
  human_review_policy: 'Nenhum avancar sem revisao humana registrada.',
  legal_review_policy: 'Acionar juridico em escopo, material, aceite ou parceria.',
  institutional_review_policy: 'Validar nome institucional, limites e autorizacoes.',
  technical_review_policy: 'Conferir que ambiente e material sao simulados.',
  ethical_review_policy: 'Bloquear dado sensivel e promessa diagnostica.',
  simulated_only: true,
}))

export const SIMULATED_PILOT_CHECKPOINTS: SenseTrustPilotCheckpoint[] = Array.from({ length: 32 }, (_, index) => ({
  checkpoint_id: `IP-CHK-${index + 1}`,
  pilot_id: `IP-PILOT-${(index % 8) + 1}`,
  checkpoint_title: ['escopo', 'material', 'demo', 'aceite'][index % 4],
  checkpoint_status: index % 7 === 0 ? 'in_review' : index % 5 === 0 ? 'blocked' : 'pending',
  criteria: ['metadata_only', 'sem dado real', 'responsavel simulado definido'],
  blockers: ['paciente real', 'contrato real', 'cliente real', 'parceria formalizada'],
  evidence_required: ['registro de escopo', 'material autorizado', 'decisao simulada'],
  simulated_only: true,
}))

export const SIMULATED_PILOT_ACCEPTANCE_CRITERIA: SenseTrustPilotAcceptanceCriterion[] = Array.from({ length: 32 }, (_, index) => ({
  criterion_id: `IP-ACC-${index + 1}`,
  criterion_title: `Criterio de aceite supervisionado ${index + 1}`,
  criterion_description: 'Aceite interno e supervisionado, sem validade contratual final.',
  checkpoint_reference: `IP-CHK-${(index % 32) + 1}`,
  evidence_required: 'Evidencia metadata_only e revisao humana.',
  acceptance_status: index % 6 === 0 ? 'in_review' : 'pending',
  human_review_required: true,
  legal_review_required: index % 4 === 0,
  blocking_if_failed: true,
  simulated_only: true,
}))

export const SIMULATED_SUPERVISED_ACCEPTANCE_RECORDS: SenseTrustSupervisedAcceptanceRecord[] = Array.from({ length: 16 }, (_, index) => ({
  record_id: `IP-SAR-${index + 1}`,
  pilot_id: `IP-PILOT-${(index % 8) + 1}`,
  criterion_id: `IP-ACC-${(index % 32) + 1}`,
  acceptance_summary: 'Aceite supervisionado parcial, pendente de revisao conforme risco.',
  reviewed_by: 'revisor humano simulado',
  simulated_date_label: `2026-06-${String(10 + (index % 18)).padStart(2, '0')}`,
  decision: index % 5 === 0 ? 'require_legal_review' : 'continue',
  simulated_only: true,
}))

export const SIMULATED_PILOT_EXECUTION_RISKS: SenseTrustPilotExecutionRisk[] = Array.from({ length: 24 }, (_, index) => ({
  risk_id: `IP-RISK-${index + 1}`,
  pilot_id: `IP-PILOT-${(index % 8) + 1}`,
  risk_title: ['operacao real indevida', 'dado clinico real', 'parceria presumida', 'contrato presumido'][index % 4],
  risk_level: index % 8 === 0 ? 'critical' : index % 5 === 0 ? 'high' : index % 3 === 0 ? 'medium' : 'low',
  impact: 'Pode converter simulacao em interpretacao operacional, juridica ou clinica indevida.',
  mitigation: 'Pausar, revisar escopo, registrar decisao e acionar revisao humana ou juridica.',
  interruption_rule_reference: `IP-INT-${(index % 16) + 1}`,
  simulated_only: true,
}))

export const SIMULATED_PILOT_EVIDENCE_ITEMS: SenseTrustPilotEvidenceItem[] = Array.from({ length: 24 }, (_, index) => ({
  evidence_id: `IP-EVID-${index + 1}`,
  pilot_id: `IP-PILOT-${(index % 8) + 1}`,
  evidence_title: ['escopo aprovado', 'material autorizado', 'feedback registrado', 'decisao simulada'][index % 4],
  evidence_status: index % 6 === 0 ? 'in_review' : 'pending',
  data_classification: 'metadata_only',
  blocks_real_clinical_data: true,
  simulated_only: true,
}))

export const SIMULATED_PILOT_INTERRUPTION_RULES: SenseTrustPilotInterruptionRule[] = Array.from({ length: 16 }, (_, index) => ({
  rule_id: `IP-INT-${index + 1}`,
  pilot_id: `IP-PILOT-${(index % 8) + 1}`,
  trigger: ['dado clinico real solicitado', 'nome institucional sem autorizacao', 'contrato presumido', 'promessa diagnostica'][index % 4],
  pause_condition: 'Qualquer ambiguidade sobre escopo, dado, contrato ou parceria.',
  block_condition: 'Uso real de paciente, dado sensivel, contrato, billing ou operacao clinica.',
  human_review_required: true,
  legal_review_required: index % 2 === 0,
  recommended_decision: index % 4 === 0 ? 'block' : 'pause',
  simulated_only: true,
}))

export const SIMULATED_PILOT_STATUS_BOARDS: SenseTrustPilotStatusBoard[] = Array.from({ length: 8 }, (_, index) => ({
  status_board_id: `IP-STATUS-${index + 1}`,
  pilot_id: `IP-PILOT-${index + 1}`,
  pilot_status: INSTITUTIONAL_PILOT_STATUSES[index % INSTITUTIONAL_PILOT_STATUSES.length],
  readiness_score: 52 + index * 5,
  acceptance_progress: 20 + index * 7,
  risk_score: 25 + index * 8,
  open_checkpoints: 4 - (index % 3),
  human_review_items: 2 + (index % 4),
  simulated_only: true,
}))

export const SIMULATED_PILOT_DECISION_LOGS: SenseTrustPilotDecisionLog[] = Array.from({ length: 16 }, (_, index) => ({
  decision_log_id: `IP-DEC-${index + 1}`,
  pilot_id: `IP-PILOT-${(index % 8) + 1}`,
  decision_type: index % 6 === 0 ? 'require_legal_review' : index % 5 === 0 ? 'pause' : 'continue',
  decision_reason: 'Decisao metadata_only baseada em checkpoint, risco e aceite supervisionado.',
  checkpoint_reference: `IP-CHK-${(index % 32) + 1}`,
  simulated_responsible: 'responsavel simulado',
  human_review_required: true,
  metadata_only: true,
  simulated_date_label: `2026-06-${String(11 + (index % 17)).padStart(2, '0')}`,
}))

export const SIMULATED_PILOT_EXECUTIVE_REPORTS: SenseTrustPilotExecutiveReport[] = Array.from({ length: 8 }, (_, index) => ({
  report_id: `IP-REPORT-${index + 1}`,
  pilot_id: `IP-PILOT-${index + 1}`,
  executive_summary: 'Piloto institucional simulado com governanca, escopo e aceite supervisionado.',
  progress_summary: 'Checkpoints e evidencias em andamento, sem operacao real.',
  risk_summary: 'Riscos principais: contrato, cliente, dado real, parceria e promessa diagnostica.',
  acceptance_summary: 'Aceite supervisionado parcial e interno.',
  pending_items: ['revisao humana', 'evidencia metadata_only', 'decisao de interrupcao se necessario'],
  recommendation: index > 5 ? 'pause' : 'continue',
  simulated_only: true,
}))

export const SIMULATED_INSTITUTIONAL_PILOTS: SenseTrustInstitutionalPilot[] = Array.from({ length: 8 }, (_, index) => {
  const pilotId = `IP-PILOT-${index + 1}`
  return {
    pilot_id: pilotId,
    pilot_title: `Piloto institucional simulado ${INSTITUTIONAL_PILOT_AUDIENCES[index % INSTITUTIONAL_PILOT_AUDIENCES.length]} ${index + 1}`,
    audience_type: INSTITUTIONAL_PILOT_AUDIENCES[index % INSTITUTIONAL_PILOT_AUDIENCES.length],
    pilot_status: INSTITUTIONAL_PILOT_STATUSES[index],
    source_pipeline_opportunity_id: `PG-OPP-${index + 1}`,
    decision_board_reference: 'SenseTrust Pipeline Governance v2.4',
    meeting_intelligence_reference: 'SenseTrust Meeting Intelligence v2.3',
    partner_demo_kit_reference: 'SenseTrust Partner Demo Kit v2.2',
    scope: SIMULATED_PILOT_SCOPES[index],
    raci_roles: SIMULATED_PILOT_RACI_ROLES.filter((item) => item.pilot_id === pilotId),
    governance_board: SIMULATED_PILOT_GOVERNANCE_BOARDS[index],
    checkpoints: SIMULATED_PILOT_CHECKPOINTS.filter((item) => item.pilot_id === pilotId),
    acceptance_criteria: SIMULATED_PILOT_ACCEPTANCE_CRITERIA.filter((item) => item.checkpoint_reference.endsWith(String(index + 1)) || item.pilot_id === undefined).slice(0, 4),
    supervised_acceptance_records: SIMULATED_SUPERVISED_ACCEPTANCE_RECORDS.filter((item) => item.pilot_id === pilotId),
    execution_risks: SIMULATED_PILOT_EXECUTION_RISKS.filter((item) => item.pilot_id === pilotId),
    evidence_items: SIMULATED_PILOT_EVIDENCE_ITEMS.filter((item) => item.pilot_id === pilotId),
    interruption_rules: SIMULATED_PILOT_INTERRUPTION_RULES.filter((item) => item.pilot_id === pilotId),
    status_board: SIMULATED_PILOT_STATUS_BOARDS[index],
    decision_log: SIMULATED_PILOT_DECISION_LOGS.filter((item) => item.pilot_id === pilotId),
    executive_report: SIMULATED_PILOT_EXECUTIVE_REPORTS[index],
    data_classification: 'metadata_only',
    clinical_data_used: false,
    real_patient_data_used: false,
    real_clinical_operation_enabled: false,
    real_contract_enabled: false,
    real_billing_enabled: false,
    real_crm_enabled: false,
    real_analytics_enabled: false,
    real_email_automation_enabled: false,
    diagnostic_truth_certification_claim: false,
    client_claim: false,
    partnership_claim: false,
    simulated_only: true,
  }
})

export const SIMULATED_INSTITUTIONAL_PILOT_REFERENCES = ['SenseTrust Pipeline Governance v2.4', 'SenseTrust Meeting Intelligence v2.3', 'SenseTrust Partner Demo Kit v2.2']

export const SIMULATED_INSTITUTIONAL_PILOT_CONTROL_ROOM_STATE: SenseTrustInstitutionalPilotControlRoomState = {
  state_id: 'INSTITUTIONAL-PILOT-CONTROL-ROOM-SIM-V25',
  version: 'v2.5',
  pilots: SIMULATED_INSTITUTIONAL_PILOTS,
  scopes: SIMULATED_PILOT_SCOPES,
  raci_roles: SIMULATED_PILOT_RACI_ROLES,
  governance_boards: SIMULATED_PILOT_GOVERNANCE_BOARDS,
  checkpoints: SIMULATED_PILOT_CHECKPOINTS,
  acceptance_criteria: SIMULATED_PILOT_ACCEPTANCE_CRITERIA,
  supervised_acceptance_records: SIMULATED_SUPERVISED_ACCEPTANCE_RECORDS,
  execution_risks: SIMULATED_PILOT_EXECUTION_RISKS,
  evidence_items: SIMULATED_PILOT_EVIDENCE_ITEMS,
  interruption_rules: SIMULATED_PILOT_INTERRUPTION_RULES,
  status_boards: SIMULATED_PILOT_STATUS_BOARDS,
  decision_logs: SIMULATED_PILOT_DECISION_LOGS,
  executive_reports: SIMULATED_PILOT_EXECUTIVE_REPORTS,
  references: SIMULATED_INSTITUTIONAL_PILOT_REFERENCES,
  data_classification: 'metadata_only',
  clinical_data_used: false,
  real_patient_data_used: false,
  real_clinical_operation_enabled: false,
  real_revenue_claimed: false,
  real_billing_claimed: false,
  diagnostic_truth_certification_claimed: false,
  production_deploy_claimed: false,
  real_lead_collection: false,
  real_contract_enabled: false,
  real_crm_enabled: false,
  real_analytics_enabled: false,
  real_email_automation_enabled: false,
  contract_binding_claimed: false,
  client_claim: false,
  partnership_claim: false,
  simulated_only: true,
}

export const SIMULATED_INSTITUTIONAL_PILOT_EXPORT_PAYLOAD: SenseTrustInstitutionalPilotExportPayload = {
  schema: 'sensetrust.institutional_pilot_control_room_export.v1',
  exported_at: '2026-06-17T12:30:00.000Z',
  state: SIMULATED_INSTITUTIONAL_PILOT_CONTROL_ROOM_STATE,
  public_exposure: 'metadata_only',
  simulated_only: true,
}
