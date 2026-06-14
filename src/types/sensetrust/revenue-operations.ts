export type SenseTrustBillingReadinessStatus =
  | 'not_ready'
  | 'draft_ready'
  | 'legal_review_pending'
  | 'fiscal_review_pending'
  | 'technical_ready_simulated'
  | 'ready_for_controlled_paid_pilot'
  | 'blocked'

export type SenseTrustSimulatedPaymentStatus =
  | 'not_applicable'
  | 'simulated_pending'
  | 'simulated_paid'
  | 'simulated_overdue'
  | 'simulated_cancelled'
  | 'simulated_refunded'
  | 'real_payment_not_implemented'

export type SenseTrustRevenueRiskLevel = 'low' | 'moderate' | 'high' | 'critical'

export type SenseTrustRevenueReadinessDecision =
  | 'keep_simulated'
  | 'prepare_paid_pilot_contract'
  | 'require_legal_review'
  | 'require_fiscal_review'
  | 'require_gateway_vendor_selection'
  | 'require_accounting_review'
  | 'block_monetization'
  | 'ready_for_controlled_paid_pilot'

export interface SenseTrustRevenueOperation {
  operation_id: string
  label: string
  status: SenseTrustBillingReadinessStatus
  owner: string
  simulated_only: true
}

export interface SenseTrustBillingReadinessChecklist {
  checklist_id: string
  contract_reviewable: boolean
  commercial_policy: boolean
  data_policy: boolean
  usage_plan: boolean
  future_billing_terms: boolean
  legal_review: boolean
  fiscal_review: boolean
  gateway_selected: boolean
  gateway_not_implemented: boolean
  invoice_real_not_implemented: boolean
  billing_real_not_implemented: boolean
}

export interface SenseTrustBillingProviderReadiness {
  provider_id: string
  provider_name: string
  status: 'future_candidate' | 'not_selected' | 'blocked'
  requirements: string[]
  blockers: string[]
}

export interface SenseTrustCommercialContractClause {
  clause_id: string
  title: string
  body: string
  review_status: SenseTrustBillingReadinessStatus
}

export interface SenseTrustCommercialContractTemplate {
  template_id: string
  template_name: string
  intended_plan: string
  clauses: SenseTrustCommercialContractClause[]
  legal_review_status: SenseTrustBillingReadinessStatus
  simulated_only: true
}

export interface SenseTrustSimulatedInvoice {
  invoice_id: string
  ledger_entry_id: string
  simulated_amount_brl: number
  simulated_status: SenseTrustSimulatedPaymentStatus
  invoice_real_issued: false
  fiscal_document_real_issued: false
  simulated_only: true
}

export interface SenseTrustSimulatedRevenueLedgerEntry {
  entry_id: string
  organization_id: string
  organization_name: string
  plan_id: string
  plan_name: string
  simulated_amount_brl: number
  simulated_period: string
  simulated_status: SenseTrustSimulatedPaymentStatus
  simulated_due_date: string
  simulated_paid_at: string | null
  billing_real_implemented: false
  invoice_real_issued: false
  fiscal_document_real_issued: false
  payment_gateway_real_used: false
  data_classification: 'simulated_revenue_metadata'
  public_exposure: 'metadata_only'
  simulated_only: true
}

export interface SenseTrustRevenueLedger {
  ledger_id: string
  entries: SenseTrustSimulatedRevenueLedgerEntry[]
  simulated_mrr_brl: number
  simulated_arr_brl: number
  simulated_only: true
}

export interface SenseTrustUpgradeDowngradePolicy {
  policy_id: string
  upgrade_simulated: string
  downgrade_simulated: string
  pause_simulated: string
  reactivation_simulated: string
  eligibility_criteria: string[]
  manual_review_required: true
}

export interface SenseTrustCancellationPolicy {
  policy_id: string
  cancellation_simulated: string
  refund_simulated: string
  risk_exit: string
  manual_review_required: true
}

export interface SenseTrustDunningPolicySimulated {
  policy_id: string
  reminder_steps: string[]
  real_collection_implemented: false
  simulated_only: true
}

export interface SenseTrustFiscalLegalReviewItem {
  item_id: string
  label: string
  status: SenseTrustBillingReadinessStatus
  owner: string
  blocker: boolean
}

export interface SenseTrustRevenueRisk {
  risk_id: string
  risk: string
  level: SenseTrustRevenueRiskLevel
  impact: string
  mitigation: string
  owner: string
  blocking_trigger: string
  status: SenseTrustBillingReadinessStatus
}

export interface SenseTrustRevenueGovernancePolicy {
  policy_id: string
  revenue_owner: string
  legal_owner: string
  fiscal_owner: string
  commercial_owner: string
  product_owner: string
  approval_rules: string[]
}

export interface SenseTrustRevenueOpsMetric {
  metric_id: string
  label: string
  value: number
}

export interface SenseTrustGatewayReadinessChecklist {
  checklist_id: string
  future_gateway: string
  requirements: string[]
  pending_items: string[]
  blockers: string[]
  vendor_selection_status: SenseTrustBillingReadinessStatus
  compliance_status: SenseTrustBillingReadinessStatus
  gateway_real_implemented: false
}

export interface SenseTrustRevenueOpsReport {
  report_id: string
  readiness_score: number
  simulated_mrr_brl: number
  simulated_arr_brl: number
  blockers: string[]
  recommended_decision: SenseTrustRevenueReadinessDecision
  public_exposure: 'metadata_only'
  simulated_only: true
}

export interface SenseTrustRevenueOpsState {
  state_id: string
  version: 'v1.6'
  billing_readiness_status: SenseTrustBillingReadinessStatus
  contract_readiness_status: SenseTrustBillingReadinessStatus
  fiscal_review_status: SenseTrustBillingReadinessStatus
  legal_review_status: SenseTrustBillingReadinessStatus
  gateway_readiness_status: SenseTrustBillingReadinessStatus
  simulated_ledger: SenseTrustRevenueLedger
  commercial_contract_templates: SenseTrustCommercialContractTemplate[]
  upgrade_downgrade_policy: SenseTrustUpgradeDowngradePolicy
  cancellation_policy: SenseTrustCancellationPolicy
  revenue_risks: SenseTrustRevenueRisk[]
  readiness_decision: SenseTrustRevenueReadinessDecision
  next_action: string
  billing_real_implemented: false
  payment_gateway_real_implemented: false
  invoice_real_implemented: false
  fiscal_document_real_implemented: false
  simulated_only: true
}

export interface SenseTrustRevenueOpsExportPayload {
  schema: 'sensetrust.revenue_operations_export.v1'
  exported_at: string
  state: SenseTrustRevenueOpsState
  report: SenseTrustRevenueOpsReport
  public_exposure: 'metadata_only'
  simulated_only: true
}
