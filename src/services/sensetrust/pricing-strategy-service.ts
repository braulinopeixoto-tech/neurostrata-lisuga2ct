import { PRICING_SENSITIVE_DENYLIST, REAL_PAYMENT_INTEGRATION_DENYLIST, SIMULATED_PRICING_PLANS, SIMULATED_REVENUE_SCENARIOS } from '@/fixtures/sensetrust/simulated-pricing-strategy'
import type {
  SenseTrustCommercialDecision,
  SenseTrustCommercialOffer,
  SenseTrustCommercialSegment,
  SenseTrustPaidPilotOffer,
  SenseTrustPriceObjection,
  SenseTrustPricingExportPayload,
  SenseTrustPricingPlan,
  SenseTrustPricingRecommendation,
  SenseTrustRevenueReadinessScore,
  SenseTrustRevenueSignal,
  SenseTrustRevenueValidationScenario,
} from '@/types/sensetrust/pricing-strategy'

export function createPricingPlan(): SenseTrustPricingPlan {
  return SIMULATED_PRICING_PLANS[0]
}

export function createDefaultPricingPlans(): SenseTrustPricingPlan[] {
  return SIMULATED_PRICING_PLANS.map((plan) => ({ ...plan, features: [...plan.features], usage_limits: [...plan.usage_limits] }))
}

export function createPaidPilotOffer(plan = SIMULATED_PRICING_PLANS[1]): SenseTrustPaidPilotOffer {
  return {
    offer_id: `OFFER-${plan.plan_id}`,
    plan_id: plan.plan_id,
    scope: 'Piloto fechado, supervisionado, metadata_only e sem producao real.',
    duration_days: plan.tier === 'institutional' ? '60 a 90 dias' : '30 a 60 dias',
    usage_limit: `${plan.included_certificates} certificados simulados`,
    deliverables: ['painel executivo', 'relatorio de readiness', 'matriz de objecoes', 'revisao go/no-go comercial'],
    simulated_price_range_brl: priceRangeFor(plan.plan_id),
    conditions: ['revisao humana obrigatoria', 'sem dado clinico real', 'sem billing real'],
    out_of_scope: ['cobranca real', 'gateway de pagamento', 'nota fiscal', 'assinatura legal real', 'uso clinico real'],
    billing_real_implemented: false,
    simulated_only: true,
  }
}

export function createCommercialOffer(plan = SIMULATED_PRICING_PLANS[2]): SenseTrustCommercialOffer {
  return {
    offer_id: `COMMERCIAL-${plan.plan_id}`,
    offer_name: `${plan.plan_name} Offer`,
    target_segment: plan.intended_segment,
    recommended_plan_id: plan.plan_id,
    commercial_message: 'Certificar integridade, proveniencia, rastreabilidade, estado documental e verificabilidade publica segura.',
    restrictions: plan.restrictions,
    simulated_only: true,
  }
}

export function createPricingStrategyState() {
  const plans = createDefaultPricingPlans()
  const commercial_segments = rankCommercialSegments()
  const revenue_scenarios = SIMULATED_REVENUE_SCENARIOS.map((scenario) => ({ ...scenario }))
  const readiness_score = calculateRevenueReadinessScore()
  return {
    plans,
    paid_pilot_offers: plans.filter((plan) => plan.model !== 'free_demo' && plan.tier !== 'enterprise').map(createPaidPilotOffer),
    revenue_scenarios,
    commercial_segments,
    objections: summarizePricingObjections(),
    revenue_signals: summarizeRevenueSignals(),
    readiness_score,
    recommendation: recommendPricingStrategy(),
    public_exposure: 'metadata_only' as const,
    simulated_only: true as const,
  }
}

export function calculatePlanFitScore(plan: SenseTrustPricingPlan, segment: string) {
  const segmentMatch = plan.intended_segment.includes(segment) || segment.includes(plan.tier)
  const base = segmentMatch ? 85 : 65
  const riskPenalty = plan.restrictions.includes('mandatory_legal_review') ? 10 : 0
  return Math.max(0, Math.min(100, base - riskPenalty + valueBonus(plan)))
}

export function calculateRevenueReadinessScore(): SenseTrustRevenueReadinessScore {
  return {
    score_id: 'REV-READY-SIM-001',
    score: 78,
    value_clarity: 84,
    purchase_intent: 76,
    commercial_risk: 68,
    legal_risk: 64,
    operational_maturity: 82,
  }
}

export function calculateWillingnessToPayScore(segment = 'clinic') {
  const scores: Record<string, number> = { clinic: 86, professional: 72, institutional: 78, government: 48, enterprise: 62 }
  return scores[segment] ?? 65
}

export function calculateSegmentRevenuePotential(segment: string) {
  return calculateWillingnessToPayScore(segment) * 100
}

export function calculateUsageBasedRevenueSimulation(certificates: number, pricePerCertificate: number) {
  return certificates * pricePerCertificate
}

export function calculateSubscriptionRevenueSimulation(subscribers: number, monthlyPrice: number) {
  return subscribers * monthlyPrice
}

export function calculateHybridRevenueSimulation(subscribers: number, monthlyPrice: number, extraCertificates: number, pricePerCertificate: number) {
  return calculateSubscriptionRevenueSimulation(subscribers, monthlyPrice) + calculateUsageBasedRevenueSimulation(extraCertificates, pricePerCertificate)
}

export function rankPricingPlans(plans = createDefaultPricingPlans()) {
  return [...plans].sort((a, b) => valueBonus(b) - valueBonus(a))
}

export function rankCommercialSegments(): SenseTrustCommercialSegment[] {
  return [
    segment('clinic', 88, 86, 84, 2997, 'low', 'PLAN-SIM-CLINIC-PILOT'),
    segment('professional', 74, 78, 70, 997, 'low', 'PLAN-SIM-PROFESSIONAL-PILOT'),
    segment('institutional', 79, 82, 76, 15000, 'moderate', 'PLAN-SIM-INSTITUTIONAL-PILOT'),
    segment('vitalstrata_project', 84, 88, 82, 2997, 'moderate', 'PLAN-SIM-CLINIC-PILOT'),
    segment('government', 52, 64, 42, 10000, 'high', 'PLAN-SIM-GOV-ENTERPRISE'),
  ].sort((a, b) => b.commercial_fit_score - a.commercial_fit_score)
}

export function summarizePricingObjections(): SenseTrustPriceObjection[] {
  return [
    objection('Por que pagar se e piloto?', 'Porque valida valor com escopo supervisionado.', 'Piloto pago testa disposicao a pagar sem producao real.', 'Nao ha cobranca automatica.', 'Oferecer faixa simulada e criterios de saida.', 'Professional Pilot', 'moderate'),
    objection('Isso e so QR Code?', 'Nao.', 'O valor e trilha, hash, estado, versao e verificacao segura.', 'QR e apenas uma interface de verificacao.', 'Mostrar cadeia SenseTrust.', 'Clinic Pilot', 'high'),
    objection('Isso ja existe em assinatura digital?', 'Nao e substituto de assinatura.', 'SenseTrust complementa integridade documental e auditabilidade.', 'Assinatura legal real fica fora de escopo.', 'Explicar fronteira v0.7.', 'Clinic Pilot', 'moderate'),
    objection('Isso tem validade juridica?', 'Exige revisao juridica.', 'A sprint nao cria contrato final.', 'Revisao humana obrigatoria.', 'Enviar politica comercial simulada.', 'Institutional Pilot', 'high'),
    objection('Quanto custa por laudo?', 'Nao usamos laudo real.', 'Preco por certificado simulado pode ser testado sem dado clinico.', 'Evitar linguagem clinica.', 'Usar per_certificate simulado.', 'Professional Pilot', 'moderate'),
    objection('Tem integracao com Gov.br?', 'Nao nesta fase.', 'Gov.br real exige sprint e revisao propria.', 'Sem Gov.br real.', 'Registrar roadmap.', 'Government / Enterprise', 'high'),
  ]
}

export function summarizeRevenueSignals(): SenseTrustRevenueSignal[] {
  return rankCommercialSegments().map((segment, index) => ({
    signal_id: `REV-SIM-${String(index + 1).padStart(3, '0')}`,
    segment: segment.segment,
    signal: segment.commercial_fit_score >= 80 ? 'strong_simulated_revenue_signal' : segment.risk_level === 'high' ? 'delayed_revenue_signal' : 'moderate_revenue_signal',
    strength: segment.commercial_fit_score >= 80 ? 'high' : segment.commercial_fit_score >= 65 ? 'moderate' : 'low',
  }))
}

export function recommendPricingStrategy(): SenseTrustPricingRecommendation {
  return {
    recommended_plan_id: 'PLAN-SIM-CLINIC-PILOT',
    priority_segment: 'clinic',
    recommended_decision: 'validate_paid_pilot',
    rationale: 'Maior combinacao simulada de valor percebido, intencao de compra e risco controlado.',
    restrictions: ['no_real_billing', 'no_payment_gateway', 'no_clinical_data', 'human_review_required'],
    simulated_only: true,
  }
}

export function recommendPaidPilotPath(segment = 'clinic') {
  if (segment === 'government') return 'delay_monetization'
  if (segment === 'professional') return 'test_professional_plan'
  if (segment === 'institutional') return 'test_institutional_contract'
  return 'validate_paid_pilot'
}

export function recommendPlanBySegment(segment = 'clinic') {
  return rankCommercialSegments().find((item) => item.segment === segment)?.recommended_plan_id ?? 'PLAN-SIM-CLINIC-PILOT'
}

export function buildRevenueValidationScenario(kind: SenseTrustRevenueValidationScenario = 'base') {
  return SIMULATED_REVENUE_SCENARIOS.find((scenario) => scenario.scenario === kind) ?? SIMULATED_REVENUE_SCENARIOS[1]
}

export function buildPricingExecutiveReport() {
  const state = createPricingStrategyState()
  return {
    report_id: 'PRICING-REPORT-SIM-001',
    summary: 'Hipotese comercial simulada para SenseTrust v1.5.',
    recommended_plan: state.recommendation.recommended_plan_id,
    priority_segment: state.recommendation.priority_segment,
    scenarios: state.revenue_scenarios,
    decision: state.recommendation.recommended_decision,
    public_exposure: 'metadata_only' as const,
    simulated_only: true as const,
  }
}

export function buildPricingExportPayload(): SenseTrustPricingExportPayload {
  return {
    schema: 'sensetrust.pricing_strategy_export.v1',
    exported_at: '2026-06-14T15:00:00.000Z',
    state: createPricingStrategyState(),
    public_exposure: 'metadata_only',
    simulated_only: true,
    billing_real_implemented: false,
  }
}

export function validatePricingExportPayload(payload = buildPricingExportPayload()) {
  const noBilling = assertPricingNoRealBilling(payload)
  const noSensitive = validateNoSensitive(payload).valid
  const noPayment = validateNoPaymentIntegration(payload).valid
  return { valid: noBilling && noSensitive && noPayment, noBilling, noSensitive, noPayment }
}

export function assertPricingNoRealBilling(payload: unknown) {
  const serialized = JSON.stringify(payload).toLowerCase()
  if (serialized.includes('billing_real_implemented":true') || serialized.includes('legal_signature_real_implemented":true')) throw new Error('pricing_real_billing_or_signature_detected')
  return true
}

export function assertPricingNoSensitiveExposure(payload: unknown) {
  const result = validateNoSensitive(payload)
  if (!result.valid) throw new Error(`pricing_sensitive_exposure:${result.exposed.join(',')}`)
  return true
}

export function assertPricingSimulatedOnly(plans: SenseTrustPricingPlan[]) {
  if (!plans.every((plan) => plan.simulated_only && plan.billing_real_implemented === false && plan.legal_signature_real_implemented === false)) throw new Error('pricing_non_simulated_plan')
  return true
}

export function linkPricingToFeedbackIntelligence() { return { link: 'SenseTrust Feedback Intelligence v1.4', public_exposure: 'metadata_only' as const } }
export function linkPricingToPilotCRM() { return { link: 'SenseTrust Pilot CRM v1.3', public_exposure: 'metadata_only' as const } }
export function linkPricingToPilotOnboarding() { return { link: 'SenseTrust Pilot Onboarding v1.2', public_exposure: 'metadata_only' as const } }
export function linkPricingToSaaSCore() { return { link: 'SenseTrust SaaS Core v0.9', public_exposure: 'metadata_only' as const } }
export function linkPricingToMOC() { return { link: 'MOC_SenseTrust', public_exposure: 'metadata_only' as const } }

function segment(segment: string, commercial_fit_score: number, perceived_value_score: number, purchase_intent_score: number, potential_ticket_brl: number, risk_level: SenseTrustCommercialSegment['risk_level'], recommended_plan_id: string): SenseTrustCommercialSegment {
  return { segment, commercial_fit_score, perceived_value_score, purchase_intent_score, potential_ticket_brl, risk_level, recommended_plan_id }
}

function objection(objection: string, short_answer: string, commercial_answer: string, technical_answer: string, mitigation: string, recommended_plan: string, impact: SenseTrustPriceObjection['impact']): SenseTrustPriceObjection {
  return { objection, short_answer, commercial_answer, technical_answer, mitigation, recommended_plan, impact }
}

function valueBonus(plan: SenseTrustPricingPlan) {
  if (plan.tier === 'clinic') return 20
  if (plan.tier === 'institutional') return 18
  if (plan.tier === 'professional') return 14
  return 8
}

function priceRangeFor(planId: string) {
  if (planId.includes('PROFESSIONAL')) return 'R$ 497 a R$ 997/mes simulado'
  if (planId.includes('CLINIC')) return 'R$ 1.497 a R$ 2.997/mes simulado'
  if (planId.includes('INSTITUTIONAL')) return 'R$ 5.000 a R$ 15.000/mes simulado'
  return 'customizado simulado'
}

function validateNoSensitive(payload: unknown) {
  const serialized = JSON.stringify(payload).toLowerCase()
  const exposed = PRICING_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term))
  return { valid: exposed.length === 0 && serialized.includes('metadata_only'), exposed }
}

function validateNoPaymentIntegration(payload: unknown) {
  const serialized = JSON.stringify(payload).toLowerCase()
  const exposed = REAL_PAYMENT_INTEGRATION_DENYLIST.filter((term) => serialized.includes(term))
  return { valid: exposed.length === 0, exposed }
}
