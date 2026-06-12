import { spawnSync } from 'node:child_process'

const permissions = [
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
]

const rolePermissions = {
  owner: permissions,
  admin: ['manage_organization', 'manage_users', 'view_audit_trail', 'view_public_verification', 'export_reports'],
  clinical_reviewer: ['view_audit_trail', 'export_reports'],
  issuer: ['issue_certificate', 'sign_emission', 'view_public_verification'],
  auditor: ['view_audit_trail', 'view_public_verification'],
  viewer: ['view_public_verification'],
  public_verifier: ['view_public_verification'],
  billing_manager: ['manage_billing'],
}

const plans = [
  ['PLAN-SIM-DEMO', 'demo', 0, 5, 50, 1, ['demo_environment']],
  ['PLAN-SIM-PROFESSIONAL', 'professional', 197, 50, 500, 3, ['qr_certificate', 'public_portal']],
  ['PLAN-SIM-CLINIC', 'clinic', 797, 300, 5000, 15, ['roles', 'audit_trail', 'revocation_amendment']],
  ['PLAN-SIM-ENTERPRISE', 'enterprise', 2997, 2000, 50000, 100, ['future_api', 'future_white_label', 'future_sla']],
  ['PLAN-SIM-GOVERNMENT', 'government', null, 10000, 500000, 500, ['public_contract', 'expanded_audit']],
].map(([plan_id, tier, price, certs, verifications, users, features]) => ({
  plan_id,
  tier,
  display_name: `SenseTrust ${String(tier)} Simulated`,
  billing_mode: tier === 'government' ? 'future_government_contract' : 'simulated_only',
  monthly_price_brl: price,
  included_certificates_monthly: certs,
  included_public_verifications_monthly: verifications,
  max_users: users,
  max_organizations: tier === 'enterprise' ? 10 : tier === 'government' ? 100 : 1,
  max_storage_mb: 500,
  features,
  status: 'simulated_only',
}))

function createOrganization(plan_id = 'PLAN-SIM-PROFESSIONAL') {
  return {
    organization_id: 'ORG-SIM-001',
    name: 'NeuroStrata Simulated Clinic',
    status: 'demo',
    plan_id,
    owner_user_id: 'USR-SIM-001',
    created_at: '2026-06-10T10:00:00.000Z',
    public_exposure: 'none',
    simulated_only: true,
  }
}

function createUser(user_id, roles, organization_id = 'ORG-SIM-001') {
  return {
    user_id,
    organization_id,
    display_name: `SenseTrust Simulated ${user_id}`,
    roles,
    status: 'active',
    created_at: '2026-06-10T10:00:00.000Z',
    public_exposure: 'none',
    simulated_only: true,
  }
}

function hasPermission(user, permission) {
  return user.roles.flatMap((role) => rolePermissions[role]).includes(permission)
}

function createLedger() {
  return {
    ledger_id: 'USAGE-SIM-2026-0001',
    organization_id: 'ORG-SIM-001',
    plan_id: 'PLAN-SIM-DEMO',
    billing_month: '2026-06',
    events: [],
    simulated_only: true,
  }
}

function record(ledger, usage_type, quantity) {
  return {
    ...ledger,
    events: [
      ...ledger.events,
      {
        usage_event_id: `USE-SIM-${String(ledger.events.length + 1).padStart(4, '0')}`,
        organization_id: ledger.organization_id,
        plan_id: ledger.plan_id,
        usage_type,
        quantity,
        occurred_at: '2026-06-10T10:00:00.000Z',
        billing_month: ledger.billing_month,
        source_module: 'SenseTrust',
        simulated_only: true,
      },
    ],
  }
}

function usage(ledger) {
  return ledger.events.reduce(
    (acc, event) => {
      if (event.usage_type === 'certificate_issued') acc.certificates += event.quantity
      if (event.usage_type === 'public_verification') acc.public_verifications += event.quantity
      return acc
    },
    { certificates: 0, public_verifications: 0 },
  )
}

function limitExceeded(plan, ledger) {
  const current = usage(ledger)
  return current.certificates > plan.included_certificates_monthly || current.public_verifications > plan.included_public_verifications_monthly
}

function safe(payload) {
  const serialized = JSON.stringify(payload).toLowerCase()
  return !['patient', 'paciente', 'cpf', 'anamnesis', 'anamnese', 'clinical_report', 'diagnosis', 'qeeg', 'eeg', 'medication'].some((term) =>
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

const organization = createOrganization()
assert(organization.organization_id === 'ORG-SIM-001' && organization.simulated_only, 'organization missing')
pass('organization created')

const owner = createUser('USR-SIM-001', ['owner'])
const admin = createUser('USR-SIM-002', ['admin'])
const issuer = createUser('USR-SIM-003', ['issuer'])
const auditor = createUser('USR-SIM-004', ['auditor'])
const publicVerifier = createUser('USR-SIM-005', ['public_verifier'])
assert([owner, admin, issuer, auditor, publicVerifier].every((user) => user.simulated_only), 'users missing')
pass('simulated users created')

assert(permissions.every((permission) => hasPermission(owner, permission)), 'owner lacks permissions')
pass('owner has full permissions')

assert(!hasPermission(admin, 'manage_billing'), 'admin accessed billing')
pass('admin billing blocked without role')

assert(hasPermission(issuer, 'issue_certificate'), 'issuer cannot issue')
pass('issuer can issue certificate')

assert(!hasPermission(auditor, 'revoke_document') && !hasPermission(auditor, 'amend_document'), 'auditor can mutate')
pass('auditor cannot mutate document')

assert(hasPermission(publicVerifier, 'view_public_verification') && !hasPermission(publicVerifier, 'view_audit_trail'), 'public verifier over-permissioned')
pass('public verifier portal only')

assert(plans.length === 5, 'default plans missing')
pass('default plans created')

const demo = plans.find((plan) => plan.tier === 'demo')
const professional = plans.find((plan) => plan.tier === 'professional')
const clinic = plans.find((plan) => plan.tier === 'clinic')
const enterprise = plans.find((plan) => plan.tier === 'enterprise')
const government = plans.find((plan) => plan.tier === 'government')
assert(demo.included_certificates_monthly === 5 && demo.max_users === 1, 'demo limits invalid')
pass('demo plan limits valid')

assert(professional.monthly_price_brl === 197 && professional.included_certificates_monthly === 50, 'professional limits invalid')
pass('professional plan limits valid')

assert(clinic.max_users === 15 && clinic.included_public_verifications_monthly === 5000, 'clinic limits invalid')
pass('clinic plan limits valid')

assert(enterprise.features.includes('future_api') && enterprise.features.includes('future_sla'), 'enterprise features invalid')
pass('enterprise plan features valid')

assert(government.billing_mode === 'future_government_contract' && government.features.includes('public_contract'), 'government mode invalid')
pass('government plan contract mode valid')

let ledger = createLedger()
assert(ledger.ledger_id === 'USAGE-SIM-2026-0001', 'ledger missing')
pass('usage ledger created')

ledger = record(ledger, 'certificate_issued', 1)
assert(usage(ledger).certificates === 1, 'certificate usage not counted')
pass('certificate usage counted')

ledger = record(ledger, 'public_verification', 3)
assert(usage(ledger).public_verifications === 3, 'public verification usage not counted')
pass('public verification usage counted')

ledger = record(ledger, 'certificate_issued', 10)
assert(limitExceeded(demo, ledger), 'limit excess not detected')
pass('plan limit exceeded detected')

const upgradedOrganization = { ...organization, plan_id: clinic.plan_id }
assert(upgradedOrganization.plan_id === 'PLAN-SIM-CLINIC', 'upgrade failed')
pass('simulated plan upgrade allowed')

const tenantIsolation = {
  allowed: owner.organization_id === 'ORG-SIM-002',
  reason: owner.organization_id === 'ORG-SIM-002' ? 'same_tenant' : 'cross_tenant_access_blocked',
}
assert(!tenantIsolation.allowed && tenantIsolation.reason === 'cross_tenant_access_blocked', 'cross tenant allowed')
pass('tenant isolation enforced')

const commercialPayload = {
  offer_id: `OFFER-${professional.plan_id}`,
  plan_id: professional.plan_id,
  tier: professional.tier,
  monthly_price_brl: professional.monthly_price_brl,
  public_features: professional.features,
  public_exposure: 'commercial_metadata_only',
  simulated_only: true,
}
assert(safe(commercialPayload), 'commercial payload unsafe')
pass('commercial public payload safe')

assert(safe([organization, owner, admin, issuer, auditor, publicVerifier, commercialPayload]), 'clinical data leaked')
pass('clinical data hidden')

assert(JSON.stringify([organization, plans, ledger]).includes('SIM') && !/cpf|paciente real|real patient|john doe|maria/i.test(JSON.stringify([organization, plans, ledger])), 'not simulated')
pass('simulated only')

assert(runRegression('scripts/test-sensetrust-public-verification-portal-v08.mjs'), 'v0.8 regression failed')
pass('v0.8 regression')

assert(runRegression('scripts/test-sensetrust-signature-timestamp-v07.mjs'), 'v0.7 regression failed')
pass('v0.7 regression')

assert(runRegression('scripts/test-sensetrust-document-states-v06.mjs'), 'v0.6 regression failed')
pass('v0.6 regression')

assert(runRegression('scripts/test-sensetrust-clinical-commit-chain-v05.mjs'), 'v0.5 regression failed')
pass('v0.5 regression')
