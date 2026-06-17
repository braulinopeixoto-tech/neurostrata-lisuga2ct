import type {
  SenseTrustAcceptanceLedger,
  SenseTrustAcceptanceLedgerEntry,
  SenseTrustAcceptanceState,
  SenseTrustAcceptanceEvidenceLink,
  SenseTrustEvidenceAuditTrailItem,
  SenseTrustEvidenceCompletenessScore,
  SenseTrustEvidenceMinimumMatrix,
  SenseTrustEvidenceMisuseBlocker,
  SenseTrustEvidenceRecordType,
  SenseTrustEvidenceRiskSignal,
  SenseTrustEvidenceStateType,
  SenseTrustEvidenceVaultExecutiveReport,
  SenseTrustPilotEvidenceHash,
  SenseTrustPilotEvidenceManifest,
  SenseTrustPilotEvidenceRecord,
  SenseTrustPilotEvidenceState,
  SenseTrustPilotEvidenceVault,
  SenseTrustPilotEvidenceVaultExportPayload,
  SenseTrustPilotEvidenceVaultState,
} from '@/types/sensetrust/pilot-evidence-vault'

export const PILOT_EVIDENCE_SENSITIVE_DENYLIST = ['patient_name', 'patient_cpf', 'clinical_payload', 'document_full_text', 'cpf real', 'cid real', 'qeeg real', 'eeg real', 'laudo real', 'paciente real']
export const PILOT_EVIDENCE_REAL_CLAIM_DENYLIST = ['storage imutavel real', 'assinatura legal real', 'blockchain real', 'contrato real', 'cliente real', 'parceria formalizada', 'billing real']
export const PILOT_EVIDENCE_RECORD_TYPES: SenseTrustEvidenceRecordType[] = ['scope_document', 'authorized_material', 'meeting_record', 'feedback_record', 'risk_record', 'decision_log', 'acceptance_criterion', 'interruption_rule', 'executive_report', 'metadata_manifest']
export const PILOT_EVIDENCE_STATES: SenseTrustEvidenceStateType[] = ['draft', 'registered', 'reviewed', 'accepted_simulated', 'rejected_simulated', 'superseded', 'blocked', 'revoked_simulated']
export const PILOT_EVIDENCE_REFERENCES = ['SenseTrust Institutional Pilot Control Room v2.5', 'SenseTrust Pipeline Governance v2.4', 'SenseTrust Meeting Intelligence v2.3']

export function simulatedLogicalHash(prefix: string, index: number) { return `${prefix}-logical-hash-${String(index + 1).padStart(3, '0')}` }

export const SIMULATED_PILOT_EVIDENCE_RECORDS: SenseTrustPilotEvidenceRecord[] = Array.from({ length: 40 }, (_, index) => ({
  evidence_id: `PEV-REC-${index + 1}`,
  pilot_id: `IP-PILOT-${(index % 8) + 1}`,
  evidence_type: PILOT_EVIDENCE_RECORD_TYPES[index % PILOT_EVIDENCE_RECORD_TYPES.length],
  evidence_title: `Evidencia metadata_only ${index + 1}`,
  evidence_description: 'Registro simulado sem conteudo clinico, paciente, assinatura legal, blockchain ou storage real.',
  linked_checkpoint_id: `IP-CHK-${(index % 32) + 1}`,
  linked_acceptance_criterion_id: `IP-ACC-${(index % 32) + 1}`,
  linked_decision_log_id: `IP-DEC-${(index % 16) + 1}`,
  evidence_state: PILOT_EVIDENCE_STATES[index % PILOT_EVIDENCE_STATES.length],
  evidence_hash: simulatedLogicalHash('evidence', index),
  parent_evidence_hash: index % 5 === 0 ? null : simulatedLogicalHash('evidence-parent', index - 1),
  metadata_only: true,
  contains_clinical_data: false,
  contains_patient_data: false,
  contains_personal_sensitive_data: false,
  storage_real_enabled: false,
  legal_signature_enabled: false,
  blockchain_enabled: false,
  simulated_only: true,
}))

export const SIMULATED_PILOT_EVIDENCE_HASHES: SenseTrustPilotEvidenceHash[] = SIMULATED_PILOT_EVIDENCE_RECORDS.map((record, index) => ({ hash_id: `PEV-HASH-${index + 1}`, logical_hash: record.evidence_hash, hash_basis: `${record.evidence_id}:${record.evidence_type}:metadata_only`, simulated_only: true }))
export const SIMULATED_PILOT_EVIDENCE_STATES: SenseTrustPilotEvidenceState[] = SIMULATED_PILOT_EVIDENCE_RECORDS.slice(0, 32).map((record, index) => ({ state_id: `PEV-STATE-${index + 1}`, evidence_id: record.evidence_id, state_type: record.evidence_state, reason: 'Estado simulado de governanca de evidencia.', simulated_only: true }))

export const SIMULATED_PILOT_EVIDENCE_MANIFESTS: SenseTrustPilotEvidenceManifest[] = Array.from({ length: 8 }, (_, index) => ({
  manifest_id: `PEV-MANIFEST-${index + 1}`,
  pilot_id: `IP-PILOT-${index + 1}`,
  version: 'v2.6',
  evidence_ids: SIMULATED_PILOT_EVIDENCE_RECORDS.filter((item) => item.pilot_id === `IP-PILOT-${index + 1}`).map((item) => item.evidence_id),
  manifest_logical_hash: simulatedLogicalHash('manifest', index),
  manifest_state: 'registered',
  checkpoint_reference: `IP-CHK-${index + 1}`,
  acceptance_reference: `IP-ACC-${index + 1}`,
  metadata_only: true,
  simulated_only: true,
}))

export const SIMULATED_PILOT_EVIDENCE_VAULTS: SenseTrustPilotEvidenceVault[] = Array.from({ length: 8 }, (_, index) => ({
  vault_id: `PEV-VAULT-${index + 1}`,
  pilot_id: `IP-PILOT-${index + 1}`,
  vault_title: `Pilot Evidence Vault simulado ${index + 1}`,
  manifest_id: `PEV-MANIFEST-${index + 1}`,
  record_count: SIMULATED_PILOT_EVIDENCE_RECORDS.filter((item) => item.pilot_id === `IP-PILOT-${index + 1}`).length,
  completeness_score: 55 + index * 5,
  acceptance_progress: 20 + index * 8,
  metadata_only: true,
  simulated_only: true,
}))

export const SIMULATED_ACCEPTANCE_LEDGER_ENTRIES: SenseTrustAcceptanceLedgerEntry[] = Array.from({ length: 32 }, (_, index) => ({
  ledger_entry_id: `PEV-LEDGER-ENTRY-${index + 1}`,
  pilot_id: `IP-PILOT-${(index % 8) + 1}`,
  acceptance_criterion_id: `IP-ACC-${(index % 32) + 1}`,
  evidence_id: `PEV-REC-${(index % 40) + 1}`,
  acceptance_state: index % 7 === 0 ? 'requires_legal_review' : index % 5 === 0 ? 'blocked' : index % 3 === 0 ? 'partially_accepted' : 'pending',
  decision_type: index % 7 === 0 ? 'require_review' : index % 5 === 0 ? 'block' : 'register',
  decision_reason: 'Entrada simulada de aceite supervisionado, sem aceite juridico vinculante.',
  required_review: index % 7 === 0 ? ['human', 'legal'] : ['human'],
  blocked_actions: ['contrato', 'laudo', 'assinatura legal', 'cliente real', 'parceria formalizada'],
  evidence_hash: simulatedLogicalHash('evidence', index % 40),
  previous_entry_hash: index === 0 ? null : simulatedLogicalHash('ledger-entry', index - 1),
  entry_hash: simulatedLogicalHash('ledger-entry', index),
  timestamp_simulated: `2026-06-${String(10 + (index % 18)).padStart(2, '0')}`,
  metadata_only: true,
  legal_acceptance_claim: false,
  contract_binding_claim: false,
  simulated_only: true,
}))

export const SIMULATED_ACCEPTANCE_LEDGERS: SenseTrustAcceptanceLedger[] = Array.from({ length: 8 }, (_, index) => ({ ledger_id: `PEV-LEDGER-${index + 1}`, pilot_id: `IP-PILOT-${index + 1}`, entries: SIMULATED_ACCEPTANCE_LEDGER_ENTRIES.filter((item) => item.pilot_id === `IP-PILOT-${index + 1}`), ledger_state: 'partially_accepted', metadata_only: true, simulated_only: true }))
export const SIMULATED_ACCEPTANCE_STATES: SenseTrustAcceptanceState[] = SIMULATED_ACCEPTANCE_LEDGER_ENTRIES.map((entry, index) => ({ state_id: `PEV-ACC-STATE-${index + 1}`, ledger_entry_id: entry.ledger_entry_id, state_type: entry.acceptance_state, reason: 'Estado interno de governanca, sem aceite juridico final.', simulated_only: true }))
export const SIMULATED_ACCEPTANCE_EVIDENCE_LINKS: SenseTrustAcceptanceEvidenceLink[] = SIMULATED_ACCEPTANCE_LEDGER_ENTRIES.map((entry, index) => ({ link_id: `PEV-LINK-${index + 1}`, evidence_id: entry.evidence_id, ledger_entry_id: entry.ledger_entry_id, link_reason: 'Vinculo metadata_only entre evidencia e aceite supervisionado.', metadata_only: true }))

export const SIMULATED_EVIDENCE_MINIMUM_MATRICES: SenseTrustEvidenceMinimumMatrix[] = Array.from({ length: 8 }, (_, index) => ({ matrix_id: `PEV-MATRIX-${index + 1}`, pilot_id: `IP-PILOT-${index + 1}`, required_evidence: 'Escopo, material autorizado, feedback, risco, decisao e aceite.', acceptance_criterion_id: `IP-ACC-${index + 1}`, checkpoint_id: `IP-CHK-${index + 1}`, mandatory: true, status: 'registered', blocking_if_absent: true, human_review_required: true, legal_review_required: index % 2 === 0, simulated_only: true }))
export const SIMULATED_EVIDENCE_COMPLETENESS_SCORES: SenseTrustEvidenceCompletenessScore[] = Array.from({ length: 8 }, (_, index) => ({ score_id: `PEV-SCORE-${index + 1}`, pilot_id: `IP-PILOT-${index + 1}`, score: 54 + index * 5, evidence_present: 3 + index, evidence_missing: Math.max(0, 5 - index), acceptance_risk: index > 5 ? 'low' : index > 3 ? 'medium' : 'high', recommendation: 'Prosseguir apenas com revisao humana e evidencia metadata_only.', simulated_only: true }))
export const SIMULATED_EVIDENCE_RISK_SIGNALS: SenseTrustEvidenceRiskSignal[] = Array.from({ length: 24 }, (_, index) => ({ risk_id: `PEV-RISK-${index + 1}`, pilot_id: `IP-PILOT-${(index % 8) + 1}`, risk_level: index % 8 === 0 ? 'critical' : index % 5 === 0 ? 'high' : index % 3 === 0 ? 'medium' : 'low', trigger: ['hash como assinatura', 'ledger como contrato', 'dado clinico real', 'parceria formalizada'][index % 4], impact: 'Pode gerar interpretacao indevida de validade clinica, legal ou comercial.', mitigation: 'Aplicar disclaimer, bloquear acao e exigir revisao humana.', associated_blocker_id: `PEV-BLOCK-${(index % 16) + 1}`, simulated_only: true }))
export const SIMULATED_EVIDENCE_MISUSE_BLOCKERS: SenseTrustEvidenceMisuseBlocker[] = Array.from({ length: 16 }, (_, index) => ({ blocker_id: `PEV-BLOCK-${index + 1}`, blocked_misuse: ['uso como laudo', 'uso como contrato', 'uso como assinatura legal', 'uso como parceria formalizada'][index % 4], reason: 'Evitar confusao entre evidencia metadata_only e validade clinica, legal ou comercial.', blocked_action: 'Bloquear declaracao externa indevida.', risk_avoided: 'Promessa, contrato, cliente, diagnostico ou parceria sem base real.', recommended_language: 'Registro simulado metadata_only para governanca interna.', simulated_only: true }))
export const SIMULATED_EVIDENCE_AUDIT_TRAIL: SenseTrustEvidenceAuditTrailItem[] = Array.from({ length: 24 }, (_, index) => ({ audit_id: `PEV-AUDIT-${index + 1}`, pilot_id: `IP-PILOT-${(index % 8) + 1}`, evidence_id: `PEV-REC-${(index % 40) + 1}`, action: index % 6 === 0 ? 'require_review' : 'register', previous_state: 'draft', new_state: index % 6 === 0 ? 'reviewed' : 'registered', logical_hash: simulatedLogicalHash('audit', index), timestamp_simulated: `2026-06-${String(11 + (index % 17)).padStart(2, '0')}`, simulated_actor: 'actor simulado SenseTrust', metadata_only: true }))
export const SIMULATED_EVIDENCE_VAULT_EXECUTIVE_REPORTS: SenseTrustEvidenceVaultExecutiveReport[] = Array.from({ length: 8 }, (_, index) => ({ report_id: `PEV-REPORT-${index + 1}`, pilot_id: `IP-PILOT-${index + 1}`, executive_summary: 'Cofre de evidencias simulado e Acceptance Ledger metadata_only criados.', completeness_summary: 'Completude parcial conforme matriz minima.', acceptance_summary: 'Aceite supervisionado interno sem efeito juridico vinculante.', risk_summary: 'Riscos de uso como laudo, contrato, assinatura, storage real ou blockchain.', blocker_summary: 'Misuse blockers ativos para linguagem e uso indevido.', pending_items: ['revisao humana', 'revisao juridica quando aplicavel', 'evidencia metadata_only pendente'], recommendation: index > 5 ? 'manter em revisao' : 'registrar proximas evidencias metadata_only', simulated_only: true }))

export const SIMULATED_PILOT_EVIDENCE_VAULT_STATE: SenseTrustPilotEvidenceVaultState = {
  state_id: 'PILOT-EVIDENCE-VAULT-SIM-V26',
  version: 'v2.6',
  vaults: SIMULATED_PILOT_EVIDENCE_VAULTS,
  evidence_records: SIMULATED_PILOT_EVIDENCE_RECORDS,
  evidence_manifests: SIMULATED_PILOT_EVIDENCE_MANIFESTS,
  evidence_hashes: SIMULATED_PILOT_EVIDENCE_HASHES,
  evidence_states: SIMULATED_PILOT_EVIDENCE_STATES,
  acceptance_ledgers: SIMULATED_ACCEPTANCE_LEDGERS,
  acceptance_ledger_entries: SIMULATED_ACCEPTANCE_LEDGER_ENTRIES,
  acceptance_states: SIMULATED_ACCEPTANCE_STATES,
  acceptance_evidence_links: SIMULATED_ACCEPTANCE_EVIDENCE_LINKS,
  evidence_minimum_matrices: SIMULATED_EVIDENCE_MINIMUM_MATRICES,
  completeness_scores: SIMULATED_EVIDENCE_COMPLETENESS_SCORES,
  risk_signals: SIMULATED_EVIDENCE_RISK_SIGNALS,
  misuse_blockers: SIMULATED_EVIDENCE_MISUSE_BLOCKERS,
  audit_trail: SIMULATED_EVIDENCE_AUDIT_TRAIL,
  executive_reports: SIMULATED_EVIDENCE_VAULT_EXECUTIVE_REPORTS,
  references: PILOT_EVIDENCE_REFERENCES,
  metadata_only: true,
  clinical_data_used: false,
  patient_data_used: false,
  personal_sensitive_data_used: false,
  real_storage_claimed: false,
  legal_signature_claimed: false,
  blockchain_claimed: false,
  diagnostic_truth_certification_claimed: false,
  real_clinical_operation_claimed: false,
  real_revenue_claimed: false,
  real_billing_claimed: false,
  contract_binding_claimed: false,
  client_claim: false,
  partnership_claim: false,
  simulated_only: true,
}

export const SIMULATED_PILOT_EVIDENCE_VAULT_EXPORT_PAYLOAD: SenseTrustPilotEvidenceVaultExportPayload = { schema: 'sensetrust.pilot_evidence_vault_export.v1', exported_at: '2026-06-17T13:00:00.000Z', state: SIMULATED_PILOT_EVIDENCE_VAULT_STATE, public_exposure: 'metadata_only', simulated_only: true }
