import { PILOT_FEEDBACK_SENSITIVE_DENYLIST, SIMULATED_PILOT_FEEDBACK_ITEMS } from '@/fixtures/sensetrust/simulated-pilot-feedback-intelligence'
import type {
  SenseTrustPilotFeedbackExportPayload,
  SenseTrustPilotFeedbackItem,
  SenseTrustPilotFeedbackReport,
  SenseTrustPilotFeedbackScore,
  SenseTrustPilotGTMRecommendation,
  SenseTrustPilotMarketSignal,
  SenseTrustPilotObjection,
  SenseTrustPilotProductSignal,
  SenseTrustPilotRiskPattern,
  SenseTrustPilotSegmentSignal,
} from '@/types/sensetrust/pilot-feedback-intelligence'

export function createPilotFeedbackItem(): SenseTrustPilotFeedbackItem {
  return SIMULATED_PILOT_FEEDBACK_ITEMS[0]
}

export function createDefaultPilotFeedbackItems(): SenseTrustPilotFeedbackItem[] {
  return SIMULATED_PILOT_FEEDBACK_ITEMS.map((item) => ({ ...item }))
}

export function createPilotFeedbackIntelligenceState() {
  const feedback_items = createDefaultPilotFeedbackItems()
  const report = buildPilotFeedbackReport(feedback_items)
  return {
    feedback_items,
    acceptance_metrics: summarizeFeedbackByOrganization(feedback_items).map((entry) => ({
      metric_id: `ACC-${entry.organization_id}`,
      label: entry.organization_name,
      score: entry.acceptance_score,
      demo_completed: entry.acceptance_score >= 60,
      terms_understood: entry.acceptance_score >= 65,
      metadata_only_understood: entry.acceptance_score >= 60,
      legal_limits_understood: entry.acceptance_score >= 60,
      go_no_go_trend: recommendPilotNextAction(entry),
    })),
    value_metrics: summarizeFeedbackByOrganization(feedback_items).map((entry) => ({
      metric_id: `VAL-${entry.organization_id}`,
      label: entry.organization_name,
      perceived_value_score: entry.perceived_value_score,
      document_confidence_score: calculateTrustClarityScore(feedback_items, entry.organization_id),
      clarity_score: calculateTrustClarityScore(feedback_items, entry.organization_id),
      perceived_safety_score: calculatePrivacyConfidenceScore(feedback_items, entry.organization_id),
      usage_intent_score: entry.acceptance_score,
      purchase_intent: entry.purchase_intent,
    })),
    objections: summarizeObjections(feedback_items),
    risk_patterns: calculateRiskPatternFrequency(feedback_items),
    segment_signals: rankPilotSegments(feedback_items),
    market_signals: summarizeMarketSignals(feedback_items),
    product_signals: summarizeProductSignals(feedback_items),
    gtm_recommendation: recommendGTMPath(feedback_items),
    report,
    public_exposure: 'metadata_only' as const,
    simulated_only: true as const,
  }
}

export function calculateAcceptanceScore(items = createDefaultPilotFeedbackItems(), organization_id?: string) {
  return average(filterItems(items, organization_id).map((item) => item.acceptance_score))
}

export function calculatePerceivedValueScore(items = createDefaultPilotFeedbackItems(), organization_id?: string) {
  return average(filterItems(items, organization_id).map((item) => item.perceived_value_score))
}

export function calculateTrustClarityScore(items = createDefaultPilotFeedbackItems(), organization_id?: string) {
  const relevant = filterItems(items, organization_id).filter((item) => ['trust', 'clarity', 'legal'].includes(item.category))
  return average((relevant.length ? relevant : filterItems(items, organization_id)).map((item) => item.score))
}

export function calculatePrivacyConfidenceScore(items = createDefaultPilotFeedbackItems(), organization_id?: string) {
  const relevant = filterItems(items, organization_id).filter((item) => item.category === 'privacy')
  return average((relevant.length ? relevant : filterItems(items, organization_id)).map((item) => item.score))
}

export function calculateCommercialIntentScore(items = createDefaultPilotFeedbackItems(), organization_id?: string) {
  const intentWeight = { high: 95, moderate: 70, low: 40, none: 5, unknown: 30 }
  return average(filterItems(items, organization_id).map((item) => intentWeight[item.purchase_intent]))
}

export function calculateObjectionFrequency(items = createDefaultPilotFeedbackItems()) {
  return summarizeObjections(items)
}

export function calculateRiskPatternFrequency(items = createDefaultPilotFeedbackItems()): SenseTrustPilotRiskPattern[] {
  return countBy(items, (item) => item.risk_level).map(([risk_level, count]) => ({
    risk_level: risk_level as SenseTrustPilotRiskPattern['risk_level'],
    count,
    pattern: `${risk_level}_operational_pattern`,
    mitigation: risk_level === 'high' || risk_level === 'critical' ? 'Require legal and operational review before advancement.' : 'Monitor in weekly pilot review.',
  }))
}

export function calculateSegmentFitScore(items = createDefaultPilotFeedbackItems(), organization_type: string) {
  const segmentItems = items.filter((item) => item.organization_type === organization_type)
  return Math.round((calculateAcceptanceScore(segmentItems) + calculatePerceivedValueScore(segmentItems) + calculateCommercialIntentScore(segmentItems)) / 3)
}

export function calculateGoToMarketReadiness(items = createDefaultPilotFeedbackItems()) {
  return Math.round((calculateAcceptanceScore(items) + calculatePerceivedValueScore(items) + calculateCommercialIntentScore(items)) / 3)
}

export function rankPilotSegments(items = createDefaultPilotFeedbackItems()): SenseTrustPilotSegmentSignal[] {
  const segments = [...new Set(items.map((item) => item.organization_type))]
  return segments
    .map((segment) => {
      const segmentItems = items.filter((item) => item.organization_type === segment)
      const perceived_value_score = calculatePerceivedValueScore(segmentItems)
      const fit_score = calculateSegmentFitScore(items, segment)
      const purchase_intent = strongestIntent(segmentItems)
      const risk_level = strongestRisk(segmentItems)
      return { segment, fit_score, perceived_value_score, purchase_intent, risk_level, recommendation: decisionFor(fit_score, risk_level) }
    })
    .sort((a, b) => b.fit_score - a.fit_score)
}

export function summarizeFeedbackByOrganization(items = createDefaultPilotFeedbackItems()) {
  return [...new Set(items.map((item) => item.organization_id))].map((organization_id) => {
    const orgItems = items.filter((item) => item.organization_id === organization_id)
    const first = orgItems[0]
    return {
      organization_id,
      organization_name: first.organization_name,
      organization_type: first.organization_type,
      acceptance_score: calculateAcceptanceScore(orgItems),
      perceived_value_score: calculatePerceivedValueScore(orgItems),
      purchase_intent: strongestIntent(orgItems),
      risk_level: strongestRisk(orgItems),
      next_action: first.next_action,
    }
  })
}

export function summarizeFeedbackBySegment(items = createDefaultPilotFeedbackItems()) {
  return rankPilotSegments(items)
}

export function summarizeObjections(items = createDefaultPilotFeedbackItems()): SenseTrustPilotObjection[] {
  return countBy(items.filter((item) => item.objection_type !== 'none'), (item) => item.objection_type).map(([objection_type, count]) => ({
    objection_type,
    count,
    impact: count > 2 ? 'high' : count > 1 ? 'moderate' : 'low',
    mitigation: mitigationForObjection(objection_type),
  }))
}

export function summarizeMarketSignals(items = createDefaultPilotFeedbackItems()): SenseTrustPilotMarketSignal[] {
  return rankPilotSegments(items).map((segment, index) => ({
    signal_id: `MKT-SIM-${String(index + 1).padStart(3, '0')}`,
    segment: segment.segment,
    signal: segment.fit_score >= 80 ? 'strong_initial_fit' : segment.risk_level === 'high' ? 'requires_later_entry' : 'moderate_fit',
    strength: segment.fit_score >= 80 ? 'high' : segment.fit_score >= 65 ? 'moderate' : 'low',
  }))
}

export function summarizeProductSignals(items = createDefaultPilotFeedbackItems()): SenseTrustPilotProductSignal[] {
  return countBy(items, (item) => item.category).map(([category, count], index) => ({
    signal_id: `PRD-SIM-${String(index + 1).padStart(3, '0')}`,
    category: category as SenseTrustPilotProductSignal['category'],
    signal: `${category}_feedback_frequency_${count}`,
    priority: count >= 3 ? 'high' : count === 2 ? 'medium' : 'low',
  }))
}

export function recommendPilotNextAction(entry: { acceptance_score: number; risk_level?: string; purchase_intent?: string }) {
  if (entry.risk_level === 'high' || entry.risk_level === 'critical') return 'hold_for_risk_review'
  if (entry.acceptance_score >= 85 && entry.purchase_intent === 'high') return 'proceed_to_paid_pilot'
  if (entry.acceptance_score >= 65) return 'proceed_to_extended_demo'
  return 'collect_more_feedback'
}

export function recommendGTMPath(items = createDefaultPilotFeedbackItems()): SenseTrustPilotGTMRecommendation {
  const ranked = rankPilotSegments(items)
  const priority = ranked[0]
  return {
    route: priority.fit_score >= 80 ? 'closed_paid_pilot_with_supervision' : 'extended_demo_before_paid_pilot',
    priority_segment: priority.segment,
    entry_offer: 'metadata_only trust verification pilot',
    recommended_messages: [
      'Certificar integridade, proveniencia, rastreabilidade, estado documental e verificabilidade publica segura.',
      'Nao certificar verdade diagnostica absoluta.',
      'Preservar LGPD, neurodireitos, minimizacao e supervisao humana.',
    ],
    restrictions: ['no_real_clinical_data', 'no_real_billing', 'human_review_required', 'metadata_only'],
    readiness_score: calculateGoToMarketReadiness(items),
    decision: priority.recommendation,
  }
}

export function buildPilotFeedbackReport(items = createDefaultPilotFeedbackItems()): SenseTrustPilotFeedbackReport {
  const score: SenseTrustPilotFeedbackScore = {
    score_id: 'SCORE-FEEDBACK-SIM-001',
    acceptance_score: calculateAcceptanceScore(items),
    perceived_value_score: calculatePerceivedValueScore(items),
    trust_clarity_score: calculateTrustClarityScore(items),
    privacy_confidence_score: calculatePrivacyConfidenceScore(items),
    commercial_intent_score: calculateCommercialIntentScore(items),
    go_to_market_readiness: calculateGoToMarketReadiness(items),
  }
  return {
    report_id: 'REPORT-FEEDBACK-SIM-001',
    period: '2026-06 simulated closed pilot window',
    pilots_evaluated: new Set(items.map((item) => item.organization_id)).size,
    score,
    objections: summarizeObjections(items),
    risks: calculateRiskPatternFrequency(items),
    market_signals: summarizeMarketSignals(items),
    product_signals: summarizeProductSignals(items),
    gtm_recommendation: recommendGTMPath(items),
    public_exposure: 'metadata_only',
    simulated_only: true,
  }
}

export function buildPilotFeedbackExportPayload(items = createDefaultPilotFeedbackItems()): SenseTrustPilotFeedbackExportPayload {
  return {
    schema: 'sensetrust.pilot_feedback_intelligence_export.v1',
    exported_at: '2026-06-14T14:00:00.000Z',
    report: buildPilotFeedbackReport(items),
    feedback_items: items,
    public_exposure: 'metadata_only',
    simulated_only: true,
  }
}

export function validatePilotFeedbackExportPayload(payload: SenseTrustPilotFeedbackExportPayload) {
  return validateNoSensitive(payload)
}

export function assertPilotFeedbackNoSensitiveExposure(payload: unknown) {
  const result = validateNoSensitive(payload)
  if (!result.valid) throw new Error(`pilot_feedback_sensitive_exposure:${result.exposed.join(',')}`)
  return true
}

export function assertPilotFeedbackSimulatedOnly(items: SenseTrustPilotFeedbackItem[]) {
  if (!items.every((item) => item.simulated_only && item.organization_id.includes('SIM') && item.public_exposure === 'metadata_only')) throw new Error('pilot_feedback_non_simulated_record')
  return true
}

export function linkFeedbackToPilotCRM() { return { link: 'SenseTrust Pilot CRM v1.3', public_exposure: 'metadata_only' as const } }
export function linkFeedbackToPilotOnboarding() { return { link: 'SenseTrust Pilot Onboarding v1.2', public_exposure: 'metadata_only' as const } }
export function linkFeedbackToPilotPackage() { return { link: 'SenseTrust Pilot Package v1.1', public_exposure: 'metadata_only' as const } }
export function linkFeedbackToPilotConsole() { return { link: 'SenseTrust Pilot Console v1.0', public_exposure: 'metadata_only' as const } }
export function linkFeedbackToMOC() { return { link: 'MOC_SenseTrust', public_exposure: 'metadata_only' as const } }

function filterItems(items: SenseTrustPilotFeedbackItem[], organization_id?: string) {
  return organization_id ? items.filter((item) => item.organization_id === organization_id) : items
}

function average(values: number[]) {
  if (!values.length) return 0
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)
}

function countBy<T>(items: T[], keyFn: (item: T) => string) {
  const counts = new Map<string, number>()
  items.forEach((item) => counts.set(keyFn(item), (counts.get(keyFn(item)) ?? 0) + 1))
  return [...counts.entries()]
}

function strongestIntent(items: SenseTrustPilotFeedbackItem[]) {
  const rank = { high: 5, moderate: 4, low: 3, unknown: 2, none: 1 }
  return [...items].sort((a, b) => rank[b.purchase_intent] - rank[a.purchase_intent])[0]?.purchase_intent ?? 'unknown'
}

function strongestRisk(items: SenseTrustPilotFeedbackItem[]) {
  const rank = { critical: 4, high: 3, moderate: 2, low: 1 }
  return [...items].sort((a, b) => rank[b.risk_level] - rank[a.risk_level])[0]?.risk_level ?? 'low'
}

function decisionFor(score: number, risk: string) {
  if (risk === 'critical') return 'reject_segment' as const
  if (risk === 'high') return 'pause_segment' as const
  if (score >= 85) return 'proceed_to_paid_pilot' as const
  if (score >= 70) return 'proceed_to_extended_demo' as const
  return 'collect_more_feedback' as const
}

function mitigationForObjection(objection: string) {
  if (objection.includes('legal')) return 'Provide legal boundary memo and require human legal review.'
  if (objection.includes('data') || objection.includes('exposure')) return 'Show metadata_only public verification and sensitive data separation.'
  if (objection.includes('pricing')) return 'Use pilot-only commercial range without activating billing real.'
  return 'Add targeted explanation to pilot FAQ and weekly review.'
}

function validateNoSensitive(payload: unknown) {
  const serialized = JSON.stringify(payload).toLowerCase()
  const exposed = PILOT_FEEDBACK_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term))
  const valid = exposed.length === 0 && serialized.includes('metadata_only')
  return { valid, exposed }
}
