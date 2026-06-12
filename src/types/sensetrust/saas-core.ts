export type SenseTrustOrganizationStatus = 'demo' | 'active' | 'suspended' | 'trial' | 'archived'

export type SenseTrustUserRole =
  | 'owner'
  | 'admin'
  | 'clinical_reviewer'
  | 'issuer'
  | 'auditor'
  | 'viewer'
  | 'public_verifier'
  | 'billing_manager'

export type SenseTrustPermission =
  | 'manage_organization'
  | 'manage_users'
  | 'issue_certificate'
  | 'sign_emission'
  | 'revoke_document'
  | 'amend_document'
  | 'view_audit_trail'
  | 'view_public_verification'
  | 'manage_billing'
  | 'export_reports'
  | 'configure_integrations'

export type SenseTrustPlanTier = 'demo' | 'professional' | 'clinic' | 'enterprise' | 'government'

export type SenseTrustBillingMode =
  | 'simulated_only'
  | 'future_monthly_subscription'
  | 'future_per_certificate'
  | 'future_enterprise_contract'
  | 'future_government_contract'

export type SenseTrustSubscriptionStatus = 'simulated_only' | 'trialing' | 'active' | 'suspended' | 'cancelled'

export interface SenseTrustPlanLimit {
  included_certificates_monthly: number
  included_public_verifications_monthly: number
  max_users: number
  max_organizations: number
  max_storage_mb: number
}

export interface SenseTrustPlan extends SenseTrustPlanLimit {
  plan_id: string
  tier: SenseTrustPlanTier
  display_name: string
  billing_mode: SenseTrustBillingMode
  monthly_price_brl: number | null
  features: string[]
  status: 'simulated_only'
}

export interface SenseTrustOrganization {
  organization_id: string
  name: string
  status: SenseTrustOrganizationStatus
  plan_id: string
  owner_user_id: string
  created_at: string
  public_exposure: 'none'
  simulated_only: true
}

export interface SenseTrustUser {
  user_id: string
  organization_id: string
  display_name: string
  roles: SenseTrustUserRole[]
  status: 'active' | 'invited' | 'suspended'
  created_at: string
  public_exposure: 'none'
  simulated_only: true
}

export interface SenseTrustUsageEvent {
  usage_event_id: string
  organization_id: string
  plan_id: string
  usage_type: 'certificate_issued' | 'public_verification' | 'user_seat' | 'storage_mb'
  quantity: number
  occurred_at: string
  billing_month: string
  source_module: 'SenseTrust'
  simulated_only: true
}

export interface SenseTrustUsageLedger {
  ledger_id: string
  organization_id: string
  plan_id: string
  billing_month: string
  events: SenseTrustUsageEvent[]
  simulated_only: true
}

export interface SenseTrustAccessDecision {
  allowed: boolean
  user_id: string
  organization_id: string
  permission: SenseTrustPermission
  reason: string
}

export interface SenseTrustTenantIsolationResult {
  allowed: boolean
  actor_organization_id: string
  resource_organization_id: string
  reason: string
}

export interface SenseTrustCommercialOffer {
  offer_id: string
  plan_id: string
  tier: SenseTrustPlanTier
  display_name: string
  monthly_price_brl: number | null
  billing_mode: SenseTrustBillingMode
  summary: string
  public_features: string[]
  public_exposure: 'commercial_metadata_only'
  simulated_only: true
}

export interface SenseTrustPilotReadinessStatus {
  ready_for_closed_pilot: boolean
  blockers: string[]
  validated_capabilities: string[]
  not_implemented: string[]
  simulated_only: true
}
