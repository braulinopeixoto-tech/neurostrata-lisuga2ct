import type {
  SenseTrustAccessDecision,
  SenseTrustCommercialOffer,
  SenseTrustOrganization,
  SenseTrustPermission,
  SenseTrustPilotReadinessStatus,
  SenseTrustPlan,
  SenseTrustPlanTier,
  SenseTrustTenantIsolationResult,
  SenseTrustUsageEvent,
  SenseTrustUsageLedger,
  SenseTrustUser,
  SenseTrustUserRole,
} from '@/types/sensetrust/saas-core'
import { SAAS_CORE_SENSITIVE_DENYLIST, SAAS_SIM_IDS, SAAS_SIM_PLANS } from '@/fixtures/sensetrust/simulated-saas-core'

const ROLE_PERMISSIONS: Record<SenseTrustUserRole, SenseTrustPermission[]> = {
  owner: [
    'manage_organization',
    'manage_users',
    'issue_certificate',
    'sign_emission',
    'revoke_document',
    'amend_document',
    'view_audit_trail',
    'view_public_verification',
    'manage_billing',
    'export_reports',
    'configure_integrations',
  ],
  admin: ['manage_organization', 'manage_users', 'view_audit_trail', 'view_public_verification', 'export_reports'],
  clinical_reviewer: ['view_audit_trail', 'export_reports'],
  issuer: ['issue_certificate', 'sign_emission', 'view_public_verification'],
  auditor: ['view_audit_trail', 'view_public_verification'],
  viewer: ['view_public_verification'],
  public_verifier: ['view_public_verification'],
  billing_manager: ['manage_billing'],
}

export function createSimulatedOrganization(params?: Partial<SenseTrustOrganization>): SenseTrustOrganization {
  return {
    organization_id: params?.organization_id ?? SAAS_SIM_IDS.organization_id,
    name: params?.name ?? 'NeuroStrata Simulated Clinic',
    status: params?.status ?? 'demo',
    plan_id: params?.plan_id ?? 'PLAN-SIM-PROFESSIONAL',
    owner_user_id: params?.owner_user_id ?? SAAS_SIM_IDS.owner_user_id,
    created_at: params?.created_at ?? SAAS_SIM_IDS.created_at,
    public_exposure: 'none',
    simulated_only: true,
  }
}

export function createSimulatedUser(params?: Partial<SenseTrustUser>): SenseTrustUser {
  return {
    user_id: params?.user_id ?? SAAS_SIM_IDS.owner_user_id,
    organization_id: params?.organization_id ?? SAAS_SIM_IDS.organization_id,
    display_name: params?.display_name ?? 'SenseTrust Simulated User',
    roles: params?.roles ?? ['owner'],
    status: params?.status ?? 'active',
    created_at: params?.created_at ?? SAAS_SIM_IDS.created_at,
    public_exposure: 'none',
    simulated_only: true,
  }
}

export function assignUserRole(user: SenseTrustUser, role: SenseTrustUserRole): SenseTrustUser {
  return {
    ...user,
    roles: Array.from(new Set([...user.roles, role])),
  }
}

export function checkUserPermission(user: SenseTrustUser, permission: SenseTrustPermission): SenseTrustAccessDecision {
  const permissions = new Set(user.roles.flatMap((role) => ROLE_PERMISSIONS[role]))
  const allowed = permissions.has(permission)
  return {
    allowed,
    user_id: user.user_id,
    organization_id: user.organization_id,
    permission,
    reason: allowed ? 'permission_allowed_by_simulated_role' : 'permission_blocked_by_simulated_role',
  }
}

export function createSenseTrustPlan(tier: SenseTrustPlanTier): SenseTrustPlan {
  const plan = SAAS_SIM_PLANS.find((item) => item.tier === tier)
  if (!plan) throw new Error(`unknown_plan_tier:${tier}`)
  return { ...plan, features: [...plan.features] }
}

export function createDefaultSenseTrustPlans(): SenseTrustPlan[] {
  return SAAS_SIM_PLANS.map((plan) => ({ ...plan, features: [...plan.features] }))
}

export function createUsageLedger(params?: Partial<SenseTrustUsageLedger>): SenseTrustUsageLedger {
  return {
    ledger_id: params?.ledger_id ?? SAAS_SIM_IDS.usage_ledger_id,
    organization_id: params?.organization_id ?? SAAS_SIM_IDS.organization_id,
    plan_id: params?.plan_id ?? 'PLAN-SIM-PROFESSIONAL',
    billing_month: params?.billing_month ?? SAAS_SIM_IDS.billing_month,
    events: params?.events ?? [],
    simulated_only: true,
  }
}

export function recordUsageEvent(
  ledger: SenseTrustUsageLedger,
  event: Omit<SenseTrustUsageEvent, 'usage_event_id' | 'organization_id' | 'plan_id' | 'billing_month' | 'source_module' | 'simulated_only'>,
): SenseTrustUsageLedger {
  const usageEvent: SenseTrustUsageEvent = {
    usage_event_id: `USE-SIM-${String(ledger.events.length + 1).padStart(4, '0')}`,
    organization_id: ledger.organization_id,
    plan_id: ledger.plan_id,
    billing_month: ledger.billing_month,
    source_module: 'SenseTrust',
    simulated_only: true,
    ...event,
  }
  return { ...ledger, events: [...ledger.events, usageEvent] }
}

export function calculateMonthlyUsage(ledger: SenseTrustUsageLedger) {
  return ledger.events.reduce(
    (acc, event) => {
      if (event.usage_type === 'certificate_issued') acc.certificates += event.quantity
      if (event.usage_type === 'public_verification') acc.public_verifications += event.quantity
      if (event.usage_type === 'user_seat') acc.user_seats += event.quantity
      if (event.usage_type === 'storage_mb') acc.storage_mb += event.quantity
      return acc
    },
    { certificates: 0, public_verifications: 0, user_seats: 0, storage_mb: 0 },
  )
}

export function checkPlanLimit(plan: SenseTrustPlan, ledger: SenseTrustUsageLedger) {
  const usage = calculateMonthlyUsage(ledger)
  return {
    within_certificate_limit: usage.certificates <= plan.included_certificates_monthly,
    within_public_verification_limit: usage.public_verifications <= plan.included_public_verifications_monthly,
    within_user_limit: usage.user_seats <= plan.max_users,
    within_storage_limit: usage.storage_mb <= plan.max_storage_mb,
    usage,
  }
}

export function enforcePlanLimit(plan: SenseTrustPlan, ledger: SenseTrustUsageLedger) {
  const limit = checkPlanLimit(plan, ledger)
  const allowed =
    limit.within_certificate_limit &&
    limit.within_public_verification_limit &&
    limit.within_user_limit &&
    limit.within_storage_limit
  return {
    allowed,
    reason: allowed ? 'within_simulated_plan_limits' : 'simulated_plan_limit_exceeded',
    limit,
  }
}

export function simulatePlanUpgrade(
  organization: SenseTrustOrganization,
  targetPlan: SenseTrustPlan,
): SenseTrustOrganization {
  return {
    ...organization,
    status: organization.status === 'suspended' ? 'active' : organization.status,
    plan_id: targetPlan.plan_id,
  }
}

export function createCommercialOffer(plan: SenseTrustPlan): SenseTrustCommercialOffer {
  return {
    offer_id: `OFFER-${plan.plan_id}`,
    plan_id: plan.plan_id,
    tier: plan.tier,
    display_name: plan.display_name,
    monthly_price_brl: plan.monthly_price_brl,
    billing_mode: plan.billing_mode,
    summary: `${plan.display_name}: simulated commercial plan for SenseTrust metadata workflows.`,
    public_features: plan.features,
    public_exposure: 'commercial_metadata_only',
    simulated_only: true,
  }
}

export function validateTenantIsolation(params: {
  actor_organization_id: string
  resource_organization_id: string
}): SenseTrustTenantIsolationResult {
  const allowed = params.actor_organization_id === params.resource_organization_id
  return {
    allowed,
    actor_organization_id: params.actor_organization_id,
    resource_organization_id: params.resource_organization_id,
    reason: allowed ? 'same_simulated_tenant' : 'cross_tenant_access_blocked',
  }
}

export function validateSaaSCoreNoSensitiveExposure(payload: unknown) {
  const serialized = JSON.stringify(payload).toLowerCase()
  const exposed = SAAS_CORE_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term))
  return {
    valid: exposed.length === 0,
    exposed_terms: exposed,
  }
}

export function buildPilotReadinessReport(): SenseTrustPilotReadinessStatus {
  return {
    ready_for_closed_pilot: false,
    blockers: ['real_billing_not_implemented', 'advanced_auth_not_implemented', 'production_rls_reconciliation_required'],
    validated_capabilities: [
      'simulated_organizations',
      'simulated_roles_permissions',
      'simulated_plans',
      'simulated_usage_ledger',
      'tenant_isolation_contract',
      'public_portal_metadata_only',
    ],
    not_implemented: ['real_billing', 'payment_gateway', 'advanced_authentication', 'production_subscription_state'],
    simulated_only: true,
  }
}

export function buildPublicCommercialPlanSummary(plan: SenseTrustPlan) {
  const offer = createCommercialOffer(plan)
  const safety = validateSaaSCoreNoSensitiveExposure(offer)
  if (!safety.valid) throw new Error(`sensitive_commercial_payload:${safety.exposed_terms.join(',')}`)
  return offer
}
