/**
 * Motor de Cálculo VitalScore MVP
 *
 * Este engine opera na camada conceitual definida para o VitalStrata:
 * Processa dados brutos normalizados (0-1) e calcula a síntese neurofuncional.
 */

export interface VitalScoreInputs {
  hrv_metric: number // 0-1
  qeeg_metric: number // 0-1
  prom_score: number // 0-1
  sleep_quality: number // 0-1
  adherence: number // 0-1
  previous_score?: number // 0-100 (último score, se houver)
}

export interface VitalScoreWeights {
  autoregulation: number
  neurofunction: number
  perceived_function: number
  temporal_trend: number
}

// Pesos padronizados parametrizáveis para ajuste futuro
export const DEFAULT_WEIGHTS: VitalScoreWeights = {
  autoregulation: 0.3,
  neurofunction: 0.3,
  perceived_function: 0.2,
  temporal_trend: 0.2,
}

export function calculateVitalScoreMVP(inputs: VitalScoreInputs, weights = DEFAULT_WEIGHTS) {
  // 1. Consolidar Eixos Clínicos (0-1)
  const autoregulation = inputs.hrv_metric * 0.6 + inputs.sleep_quality * 0.4
  const neurofunction = inputs.qeeg_metric
  const perceived_function = inputs.prom_score

  let temporal_trend = inputs.adherence
  if (inputs.previous_score !== undefined) {
    const prev_normalized = inputs.previous_score / 100
    // Simplificação: histórico positivo e adesão somam para melhorar a tendência
    temporal_trend = inputs.adherence * 0.7 + prev_normalized * 0.3
  }

  // 2. Score global
  const raw_score =
    100 *
    (weights.autoregulation * autoregulation +
      weights.neurofunction * neurofunction +
      weights.perceived_function * perceived_function +
      weights.temporal_trend * temporal_trend)

  const final_score = Math.max(0, Math.min(100, Math.round(raw_score)))

  // 3. Classificação Funcional Sugerida
  let risk_classification = ''
  if (final_score < 40) risk_classification = 'Disfunção Regulatória Importante'
  else if (final_score < 60) risk_classification = 'Disfunção Moderada'
  else if (final_score < 80) risk_classification = 'Vulnerabilidade Compensada'
  else risk_classification = 'Reserva Funcional Alta'

  // 4. Classificação Clínica Obrigatória (Estado Neurofuncional)
  let brain_energy = 'regulado'
  if (autoregulation < 0.4) brain_energy = 'hipoativo'
  else if (inputs.hrv_metric < 0.3 && inputs.sleep_quality > 0.8) brain_energy = 'instável'
  else if (inputs.qeeg_metric > 0.8 && inputs.hrv_metric < 0.4) brain_energy = 'hiperativo'

  let network_integration = 'acoplado'
  if (neurofunction < 0.4) network_integration = 'desacoplado'
  else if (neurofunction < 0.7) network_integration = 'parcialmente acoplado'

  let functional_org = 'coerente'
  if (perceived_function < 0.4) functional_org = 'difusa'
  else if (autoregulation < 0.5 && neurofunction > 0.7) functional_org = 'rígida'
  else if (temporal_trend < 0.4) functional_org = 'instável'

  // Registrar incerteza se faltarem dados críticos essenciais
  const uncertainty_flag = inputs.hrv_metric === 0 && inputs.qeeg_metric === 0

  return {
    score: final_score,
    subscores: {
      autoregulation: Math.round(autoregulation * 100),
      neurofunction: Math.round(neurofunction * 100),
      perceived_function: Math.round(perceived_function * 100),
      temporal_trend: Math.round(temporal_trend * 100),
    },
    risk_classification,
    state: {
      brain_energy,
      network_integration,
      functional_org,
    },
    uncertainty_flag,
    version: 'MVP-1.0.0',
    calculated_at: new Date().toISOString(),
  }
}
