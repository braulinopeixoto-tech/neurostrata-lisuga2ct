import type {
  SenseTrustBillingReadinessStatus,
  SenseTrustCommercialContractTemplate,
  SenseTrustRevenueRisk,
  SenseTrustSimulatedRevenueLedgerEntry,
} from '@/types/sensetrust/revenue-operations'

const base = {
  billing_real_implemented: false as const,
  invoice_real_issued: false as const,
  fiscal_document_real_issued: false as const,
  payment_gateway_real_used: false as const,
  data_classification: 'simulated_revenue_metadata' as const,
  public_exposure: 'metadata_only' as const,
  simulated_only: true as const,
}

export const REVENUE_OPS_SENSITIVE_DENYLIST = ['patient', 'paciente', 'cpf', 'cid', 'diagnostico', 'diagnóstico', 'clinical_report', 'laudo', 'anamnese', 'eeg', 'qeeg', 'medicacao', 'medicação']
export const REVENUE_OPS_REAL_PAYMENT_DENYLIST = ['stripe_secret', 'mercadopago_access_token', 'asaas_api_key', 'iugu_api_token', 'pagarme_api_key', 'pix_key_real', 'card_token', 'boleto_gateway']

export const SIMULATED_REVENUE_LEDGER_ENTRIES: SenseTrustSimulatedRevenueLedgerEntry[] = [
  ledger('REV-LEDGER-SIM-001', 'ORG-PILOT-SIM-001', 'Clinica Neurofuncional Alfa', 'PLAN-SIM-CLINIC-PILOT', 'Clinic Pilot', 2997, '2026-06', 'simulated_paid', '2026-06-30', '2026-06-20'),
  ledger('REV-LEDGER-SIM-002', 'ORG-PILOT-SIM-002', 'Grupo Juridico Beta', 'PLAN-SIM-INSTITUTIONAL-PILOT', 'Institutional Pilot', 5000, '2026-06', 'simulated_pending', '2026-06-30', null),
  ledger('REV-LEDGER-SIM-003', 'ORG-PILOT-SIM-003', 'Secretaria Municipal Gama', 'PLAN-SIM-GOV-ENTERPRISE', 'Government / Enterprise', 0, '2026-06', 'not_applicable', '2026-06-30', null),
  ledger('REV-LEDGER-SIM-004', 'ORG-PILOT-SIM-004', 'Equipe Multiprofissional Delta', 'PLAN-SIM-PROFESSIONAL-PILOT', 'Professional Pilot', 997, '2026-06', 'simulated_overdue', '2026-06-15', null),
  ledger('REV-LEDGER-SIM-005', 'ORG-PILOT-SIM-005', 'Projeto VitalStrata Piloto Epsilon', 'PLAN-SIM-CLINIC-PILOT', 'Clinic Pilot', 2997, '2026-06', 'simulated_pending', '2026-06-30', null),
]

export const SIMULATED_COMMERCIAL_CONTRACT_TEMPLATES: SenseTrustCommercialContractTemplate[] = [
  template('CONTRACT-SIM-PROFESSIONAL', 'Professional Pilot Contract Template', 'Professional Pilot', 'legal_review_pending'),
  template('CONTRACT-SIM-CLINIC', 'Clinic Pilot Contract Template', 'Clinic Pilot', 'legal_review_pending'),
  template('CONTRACT-SIM-INSTITUTIONAL', 'Institutional Pilot Contract Template', 'Institutional Pilot', 'legal_review_pending'),
  template('CONTRACT-SIM-GOV-ENTERPRISE', 'Government/Enterprise Review Template', 'Government / Enterprise', 'blocked'),
]

export const SIMULATED_BILLING_READINESS_SCENARIOS: SenseTrustBillingReadinessStatus[] = ['not_ready', 'legal_review_pending', 'fiscal_review_pending', 'ready_for_controlled_paid_pilot']

export const SIMULATED_REVENUE_RISKS: SenseTrustRevenueRisk[] = [
  risk('RISK-REV-SIM-001', 'cobranca antes de revisao juridica', 'critical', 'bloqueia monetizacao', 'exigir legal review', 'Legal Owner', 'contrato sem revisao'),
  risk('RISK-REV-SIM-002', 'cobranca sem revisao fiscal', 'critical', 'risco fiscal', 'exigir fiscal review', 'Fiscal Owner', 'politica fiscal ausente'),
  risk('RISK-REV-SIM-003', 'confusao entre invoice simulada e invoice real', 'high', 'risco operacional', 'marcar todas as invoices como simuladas', 'Revenue Owner', 'invoice real solicitada'),
  risk('RISK-REV-SIM-004', 'expectativa de assinatura legal real', 'high', 'risco juridico', 'explicar template revisavel', 'Legal Owner', 'assinatura real solicitada'),
  risk('RISK-REV-SIM-005', 'expectativa de gateway integrado', 'moderate', 'risco comercial', 'usar checklist de gateway futuro', 'Product Owner', 'gateway real solicitado'),
  risk('RISK-REV-SIM-006', 'uso clinico real antes de contrato final', 'critical', 'bloqueia piloto', 'bloquear producao clinica', 'Clinical Governance Owner', 'dado clinico real solicitado'),
]

function ledger(entry_id: string, organization_id: string, organization_name: string, plan_id: string, plan_name: string, simulated_amount_brl: number, simulated_period: string, simulated_status: SenseTrustSimulatedRevenueLedgerEntry['simulated_status'], simulated_due_date: string, simulated_paid_at: string | null): SenseTrustSimulatedRevenueLedgerEntry {
  return { entry_id, organization_id, organization_name, plan_id, plan_name, simulated_amount_brl, simulated_period, simulated_status, simulated_due_date, simulated_paid_at, ...base }
}

function template(template_id: string, template_name: string, intended_plan: string, legal_review_status: SenseTrustBillingReadinessStatus): SenseTrustCommercialContractTemplate {
  return {
    template_id,
    template_name,
    intended_plan,
    clauses: [
      { clause_id: `${template_id}-OBJ`, title: 'objeto', body: 'Piloto comercial simulado e revisavel.', review_status: 'draft_ready' },
      { clause_id: `${template_id}-LIMIT`, title: 'limites', body: 'Sem billing real, sem dado clinico real e sem certificacao diagnostica absoluta.', review_status: 'legal_review_pending' },
      { clause_id: `${template_id}-CANCEL`, title: 'cancelamento', body: 'Cancelamento simulado sujeito a revisao manual.', review_status: 'draft_ready' },
    ],
    legal_review_status,
    simulated_only: true,
  }
}

function risk(risk_id: string, risk: string, level: SenseTrustRevenueRisk['level'], impact: string, mitigation: string, owner: string, blocking_trigger: string): SenseTrustRevenueRisk {
  return { risk_id, risk, level, impact, mitigation, owner, blocking_trigger, status: level === 'critical' ? 'blocked' : 'legal_review_pending' }
}
