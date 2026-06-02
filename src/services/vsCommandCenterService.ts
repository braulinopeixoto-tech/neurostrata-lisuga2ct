import { supabase } from '@/lib/supabase/client'
import { calculateVitalScoreMVP, VitalScoreInputs } from '@/lib/vitalscore-mvp-engine'

export async function fetchVsSubjects() {
  const { data, error } = await supabase
    .from('vs_subjects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) console.error('Error fetching subjects:', error)
  return data || []
}

export async function fetchSubjectTimeline(subjectId: string) {
  // Busca paralela no banco estrutural desenhado no Bloco 1
  const [scoresRes, inferencesRes, eventsRes, observationsRes] = await Promise.all([
    supabase
      .from('vs_vitalscore_assessments')
      .select('*')
      .eq('subject_id', subjectId)
      .order('created_at', { ascending: false }),
    supabase
      .from('vs_clinical_inferences')
      .select('*')
      .eq('subject_id', subjectId)
      .order('created_at', { ascending: false }),
    supabase
      .from('vs_clinical_events')
      .select('*')
      .eq('subject_id', subjectId)
      .order('occurred_at', { ascending: false }),
    supabase
      .from('vs_raw_observations')
      .select('*')
      .eq('subject_id', subjectId)
      .order('created_at', { ascending: false })
      .limit(20),
  ])

  return {
    scores: scoresRes.data || [],
    inferences: inferencesRes.data || [],
    events: eventsRes.data || [],
    observations: observationsRes.data || [],
  }
}

export async function processNewAssessment(subjectId: string, inputs: VitalScoreInputs) {
  const { data: user } = await supabase.auth.getUser()
  const userId = user?.user?.id

  // Calcula localmente o MVP do score com base nos inputs inseridos
  const result = calculateVitalScoreMVP(inputs)

  // 1. Encounter: Cria o invólucro do atendimento
  const { data: enc, error: encError } = await supabase
    .from('vs_encounters')
    .insert({
      subject_id: subjectId,
      encounter_type: 'vitalscore_evaluation',
      status: 'completed',
      created_by: userId,
      payload: { source: 'Command Center MVP' },
    })
    .select('id')
    .single()

  if (encError) {
    console.error('Encounter error:', encError)
    throw new Error('Failed to create encounter')
  }

  const encounterId = enc?.id

  // 2. Observações Brutas: Mantém separação de dados primários coletados
  const obs = [
    { observation_code: 'hrv_metric', payload: { value: inputs.hrv_metric } },
    { observation_code: 'qeeg_metric', payload: { value: inputs.qeeg_metric } },
    { observation_code: 'prom_score', payload: { value: inputs.prom_score } },
    { observation_code: 'sleep_quality', payload: { value: inputs.sleep_quality } },
    { observation_code: 'adherence', payload: { value: inputs.adherence } },
  ].map((o) => ({
    subject_id: subjectId,
    encounter_id: encounterId,
    observation_code: o.observation_code,
    source_type: 'manual_input',
    payload: o.payload,
    created_by: userId,
    status: 'active',
  }))
  await supabase.from('vs_raw_observations').insert(obs)

  // 3. Inferência Clínica: Separação obrigatória entre dado bruto e conclusão técnica
  await supabase.from('vs_clinical_inferences').insert({
    subject_id: subjectId,
    inference_type: 'neurofunctional_state',
    conclusion: result.risk_classification,
    payload: { state: result.state, uncertainty: result.uncertainty_flag },
    status: 'active',
    created_by: userId,
  })

  // 4. Assessment (VitalScore Final)
  const { data: vsAssessment, error: vsError } = await supabase
    .from('vs_vitalscore_assessments')
    .insert({
      subject_id: subjectId,
      encounter_id: encounterId,
      overall_score: result.score,
      status: 'active',
      created_by: userId,
      payload: {
        subscores: result.subscores,
        risk_classification: result.risk_classification,
        state: result.state,
        inputs: inputs,
        version: result.version,
        uncertainty: result.uncertainty_flag,
      },
    })
    .select('id')
    .single()

  if (vsError) console.error('Assessment error:', vsError)

  // 5. Trilha Auditável (Event Sourcing Clínico)
  await supabase.from('vs_clinical_events').insert({
    subject_id: subjectId,
    encounter_id: encounterId,
    event_type: 'vitalscore_computed',
    source_type: 'system',
    payload: { assessment_id: vsAssessment?.id, score: result.score, source: 'Command Center MVP' },
    created_by: userId,
  })

  return result
}
