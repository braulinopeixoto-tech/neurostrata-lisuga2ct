import type { SenseTrustPricingPlan, SenseTrustRevenueScenario } from '@/types/sensetrust/pricing-strategy'

const base = {
  simulated_only: true as const,
  billing_real_implemented: false as const,
  legal_signature_real_implemented: false as const,
  data_classification: 'simulated_commercial_metadata' as const,
}

export const PRICING_SENSITIVE_DENYLIST = [
  'patient',
  'paciente',
  'cpf',
  'cid',
  'diagnostico',
  'diagnóstico',
  'clinical_report',
  'laudo',
  'anamnese',
  'eeg',
  'qeeg',
  'medicacao',
  'medicação',
]

export const REAL_PAYMENT_INTEGRATION_DENYLIST = [
  'stripe_secret',
  'mercadopago_access_token',
  'asaas_api_key',
  'iugu_api_token',
  'pagarme_api_key',
  'pix_key_real',
  'card_token',
  'boleto_gateway',
]

export const SIMULATED_PRICING_PLANS: SenseTrustPricingPlan[] = [
  {
    plan_id: 'PLAN-SIM-DEMO-CONTROLADO',
    plan_name: 'Demo Controlado',
    tier: 'demo_controlado',
    model: 'free_demo',
    monthly_price_brl_simulated: 0,
    annual_price_brl_simulated: 0,
    per_certificate_price_brl_simulated: 0,
    included_certificates: 10,
    included_users: 2,
    included_organizations: 1,
    features: features(['verificacao simulada', 'metadata_only', 'sem producao real']),
    usage_limits: limits(10, 2, 1),
    intended_segment: 'avaliacao inicial',
    value_proposition: 'Demonstrar valor sem producao real.',
    restrictions: ['no_real_billing', 'no_real_clinical_data', 'no_production_use'],
    ...base,
  },
  {
    plan_id: 'PLAN-SIM-PROFESSIONAL-PILOT',
    plan_name: 'Professional Pilot',
    tier: 'professional',
    model: 'paid_pilot',
    monthly_price_brl_simulated: 997,
    annual_price_brl_simulated: 9970,
    per_certificate_price_brl_simulated: 29,
    included_certificates: 30,
    included_users: 1,
    included_organizations: 1,
    features: features(['piloto supervisionado', 'certificados simulados', 'relatorio executivo']),
    usage_limits: limits(30, 1, 1),
    intended_segment: 'profissional independente',
    value_proposition: 'Testar disposicao a pagar em baixo volume.',
    restrictions: ['no_real_billing', 'supervised_only', 'metadata_only'],
    ...base,
  },
  {
    plan_id: 'PLAN-SIM-CLINIC-PILOT',
    plan_name: 'Clinic Pilot',
    tier: 'clinic',
    model: 'monthly_subscription',
    monthly_price_brl_simulated: 2997,
    annual_price_brl_simulated: 29970,
    per_certificate_price_brl_simulated: 19,
    included_certificates: 150,
    included_users: 10,
    included_organizations: 1,
    features: features(['audit trail', 'governanca documental', 'pipeline de pilotos']),
    usage_limits: limits(150, 10, 1),
    intended_segment: 'clinicas especializadas',
    value_proposition: 'Validar valor recorrente em times clinicos simulados.',
    restrictions: ['no_real_billing', 'no_patient_data', 'human_review_required'],
    ...base,
  },
  {
    plan_id: 'PLAN-SIM-INSTITUTIONAL-PILOT',
    plan_name: 'Institutional Pilot',
    tier: 'institutional',
    model: 'annual_contract',
    monthly_price_brl_simulated: 15000,
    annual_price_brl_simulated: 150000,
    per_certificate_price_brl_simulated: 0,
    included_certificates: 'custom',
    included_users: 'custom',
    included_organizations: 'custom',
    features: features(['escopo fechado', 'multiplas equipes', 'governanca ampliada']),
    usage_limits: limits('custom', 'custom', 'custom'),
    intended_segment: 'instituicoes privadas',
    value_proposition: 'Testar contrato de governanca ampliada.',
    restrictions: ['legal_review_required', 'custom_scope', 'no_real_billing'],
    ...base,
  },
  {
    plan_id: 'PLAN-SIM-GOV-ENTERPRISE',
    plan_name: 'Government / Enterprise',
    tier: 'enterprise',
    model: 'custom_contract',
    monthly_price_brl_simulated: 0,
    annual_price_brl_simulated: 0,
    per_certificate_price_brl_simulated: 0,
    included_certificates: 'custom',
    included_users: 'custom',
    included_organizations: 'custom',
    features: features(['SLA futuro', 'API futura', 'white label futuro']),
    usage_limits: limits('custom', 'custom', 'custom'),
    intended_segment: 'governo e enterprise',
    value_proposition: 'Mapear contrato customizado sem integracao real.',
    restrictions: ['mandatory_legal_review', 'future_api_only', 'no_govbr_real', 'no_icp_brasil_real'],
    ...base,
  },
]

export const SIMULATED_REVENUE_SCENARIOS: SenseTrustRevenueScenario[] = [
  scenario('conservative', 3, 0.33, 997, 997, 11964, 'baixa conversao inicial', 'um piloto converte', 'offer_extended_demo'),
  scenario('base', 5, 0.4, 1497, 2994, 35928, 'objecoes de preco', 'dois pilotos convertem', 'validate_paid_pilot'),
  scenario('accelerated', 10, 0.4, 2997, 11988, 143856, 'capacidade operacional', 'quatro clinicas convertem', 'test_clinic_plan'),
  scenario('institutional', 2, 1, 10000, 20000, 240000, 'risco juridico institucional', 'dois contratos simulados', 'test_institutional_contract'),
]

function features(labels: string[]) {
  return labels.map((label, index) => ({ feature_id: `FEAT-SIM-${index + 1}`, label, included: true }))
}

function limits(certificates: number | 'custom', users: number | 'custom', organizations: number | 'custom') {
  return [
    { limit_id: 'certificates', label: 'certificados simulados', value: certificates, period: 'month' as const },
    { limit_id: 'users', label: 'usuarios simulados', value: users, period: 'month' as const },
    { limit_id: 'organizations', label: 'organizacoes simuladas', value: organizations, period: 'contract' as const },
  ]
}

function scenario(
  scenario: SenseTrustRevenueScenario['scenario'],
  pilot_count: number,
  simulated_conversion_rate: number,
  simulated_average_ticket_brl: number,
  simulated_monthly_revenue_brl: number,
  simulated_annual_revenue_brl: number,
  main_risk: string,
  main_assumption: string,
  recommended_decision: SenseTrustRevenueScenario['recommended_decision'],
): SenseTrustRevenueScenario {
  return {
    scenario,
    pilot_count,
    simulated_conversion_rate,
    simulated_average_ticket_brl,
    simulated_monthly_revenue_brl,
    simulated_annual_revenue_brl,
    main_risk,
    main_assumption,
    recommended_decision,
    simulated_only: true,
  }
}
