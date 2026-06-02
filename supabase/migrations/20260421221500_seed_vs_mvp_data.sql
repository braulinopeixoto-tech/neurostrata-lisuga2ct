DO $$
DECLARE
  v_user_id uuid;
  v_subject_1 uuid := '11111111-1111-1111-1111-111111111111'::uuid;
  v_subject_2 uuid := '44444444-4444-4444-4444-444444444444'::uuid;
  v_enc_1 uuid := '22222222-2222-2222-2222-222222222222'::uuid;
  v_vs_1 uuid := '33333333-3333-3333-3333-333333333333'::uuid;
  v_inf_1 uuid := '55555555-5555-5555-5555-555555555555'::uuid;
BEGIN
  -- We use a known auth user if available, or ignore
  SELECT id INTO v_user_id FROM auth.users WHERE email = 'braulinopeixoto@gmail.com' LIMIT 1;

  -- Seed Subject 1
  IF NOT EXISTS (SELECT 1 FROM public.vs_subjects WHERE id = v_subject_1) THEN
    INSERT INTO public.vs_subjects (id, external_id, created_by, status, payload)
    VALUES (v_subject_1, 'PAC-001', v_user_id, 'active', '{"name": "João Silva", "age": 45, "gender": "M", "clinical_status": "Em acompanhamento"}');

    -- Seed Encounter
    INSERT INTO public.vs_encounters (id, subject_id, encounter_type, created_by, status, payload)
    VALUES (v_enc_1, v_subject_1, 'baseline_evaluation', v_user_id, 'completed', '{"notes": "Avaliação inicial"}');

    -- Seed VS Assessment
    INSERT INTO public.vs_vitalscore_assessments (id, subject_id, encounter_id, overall_score, created_by, status, payload)
    VALUES (v_vs_1, v_subject_1, v_enc_1, 65, v_user_id, 'active', 
    '{"version": "MVP-1.0.0", "risk_classification": "Vulnerabilidade Compensada", "subscores": {"autoregulation": 60, "neurofunction": 70, "perceived_function": 50, "temporal_trend": 80}, "state": {"brain_energy": "instável", "network_integration": "parcialmente acoplado", "functional_org": "coerente"}, "uncertainty": false}');

    -- Seed Clinical Inference
    INSERT INTO public.vs_clinical_inferences (id, subject_id, inference_type, conclusion, created_by, status, payload)
    VALUES (v_inf_1, v_subject_1, 'neurofunctional_state', 'Vulnerabilidade Compensada', v_user_id, 'active', '{"state": {"brain_energy": "instável", "network_integration": "parcialmente acoplado", "functional_org": "coerente"}}');
    
    -- Seed Clinical Event
    INSERT INTO public.vs_clinical_events (subject_id, encounter_id, event_type, source_type, created_by, payload)
    VALUES (v_subject_1, v_enc_1, 'vitalscore_computed', 'system', v_user_id, '{"assessment_id": "33333333-3333-3333-3333-333333333333", "score": 65}');
  END IF;

  -- Seed Subject 2
  IF NOT EXISTS (SELECT 1 FROM public.vs_subjects WHERE id = v_subject_2) THEN
    INSERT INTO public.vs_subjects (id, external_id, created_by, status, payload)
    VALUES (v_subject_2, 'PAC-002', v_user_id, 'active', '{"name": "Maria Oliveira", "age": 38, "gender": "F", "clinical_status": "Estável"}');
  END IF;

END $$;
