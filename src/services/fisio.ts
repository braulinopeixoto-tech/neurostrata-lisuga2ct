import { supabase } from '@/lib/supabase/client'

export type FisioAvaliacao = {
  id?: string
  patient_id: string
  professional_id: string
  status?: string
  labor_demand?: string
  context_notes?: string
  occupational_conclusion?: string
  bfs_p_score?: number
  severity_level?: string
  evidence_reliability?: string
  longitudinal_profile?: string
  created_at?: string
  updated_at?: string
}

export type FisioInstrumentResult = {
  id?: string
  avaliacao_id: string
  instrument_name: string
  instrument_type: string
  score?: number
  raw_data?: any
  created_at?: string
}

export type FisioLongitudinalEvent = {
  id?: string
  patient_id: string
  event_date: string
  description: string
  impact_score?: number
  created_at?: string
}

export const fisioService = {
  /**
   * Cria uma nova avaliação pericial de fisioterapia
   */
  async createAvaliacao(data: FisioAvaliacao) {
    const { data: result, error } = await supabase
      .from('fisio_pericia_avaliacoes' as any)
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return result
  },

  /**
   * Atualiza uma avaliação existente
   */
  async updateAvaliacao(id: string, data: Partial<FisioAvaliacao>) {
    const { data: result, error } = await supabase
      .from('fisio_pericia_avaliacoes' as any)
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return result
  },

  /**
   * Busca todas as avaliações de um paciente
   */
  async getAvaliacoes(patientId: string) {
    const { data, error } = await supabase
      .from('fisio_pericia_avaliacoes' as any)
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  /**
   * Adiciona um resultado de instrumento (PROM ou Observacional)
   */
  async addInstrumentResult(data: FisioInstrumentResult) {
    const { data: result, error } = await supabase
      .from('fisio_instrument_results' as any)
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return result
  },

  /**
   * Busca os eventos longitudinais do paciente para o Biograma
   */
  async getLongitudinalEvents(patientId: string) {
    const { data, error } = await supabase
      .from('fisio_longitudinal_events' as any)
      .select('*')
      .eq('patient_id', patientId)
      .order('event_date', { ascending: true })

    if (error) throw error
    return data
  },

  /**
   * Registra um alerta de inconsistência detectado pelo motor
   */
  async createAlert(data: { avaliacao_id: string; alert_type: string; message: string }) {
    const { data: result, error } = await supabase
      .from('fisio_generated_alerts' as any)
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return result
  },

  /**
   * Salva uma versão snapshot do relatório automatizado gerado
   */
  async saveReportVersion(data: { avaliacao_id: string; version: number; report_content: string }) {
    const { data: result, error } = await supabase
      .from('fisio_report_versions' as any)
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return result
  },
}
