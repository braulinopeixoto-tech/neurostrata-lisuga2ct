CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.neurolab_protocols (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    rdoc_domain TEXT,
    neural_network_target TEXT,
    status TEXT DEFAULT 'draft',
    is_off_label BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.neurolab_protocol_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    protocol_id UUID REFERENCES public.neurolab_protocols(id) ON DELETE CASCADE,
    version_number INT NOT NULL,
    hypothesis_primary TEXT,
    hypothesis_secondary TEXT,
    coordinates_mni TEXT,
    biomarkers_expected JSONB DEFAULT '{}'::jsonb,
    success_criteria_clinical TEXT,
    success_criteria_statistical TEXT,
    risk_level TEXT,
    parameters JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.neurolab_trials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    protocol_version_id UUID REFERENCES public.neurolab_protocol_versions(id) ON DELETE RESTRICT,
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending_consent',
    current_stage TEXT,
    risk_level TEXT,
    tcle_signed BOOLEAN DEFAULT false,
    tcle_document_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.neurolab_longitudinal_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trial_id UUID REFERENCES public.neurolab_trials(id) ON DELETE CASCADE,
    collected_at TIMESTAMPTZ DEFAULT now(),
    data_type TEXT NOT NULL,
    qeeg_data JSONB DEFAULT '{}'::jsonb,
    hrv_data JSONB DEFAULT '{}'::jsonb,
    psychometrics_data JSONB DEFAULT '{}'::jsonb,
    interventions JSONB DEFAULT '{}'::jsonb,
    outcomes JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.neurolab_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    longitudinal_data_id UUID REFERENCES public.neurolab_longitudinal_data(id) ON DELETE CASCADE,
    trends JSONB DEFAULT '{}'::jsonb,
    variability JSONB DEFAULT '{}'::jsonb,
    response_rate NUMERIC,
    baseline_state TEXT,
    network_state TEXT,
    organization_state TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.neurolab_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trial_id UUID REFERENCES public.neurolab_trials(id) ON DELETE CASCADE,
    feature_id UUID REFERENCES public.neurolab_features(id) ON DELETE SET NULL,
    response_probability NUMERIC,
    expected_delta NUMERIC,
    risk_score NUMERIC,
    recommended_intervention JSONB DEFAULT '{}'::jsonb,
    hash_sha256 TEXT,
    model_version TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.neurolab_clusters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    cluster_profile JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.neurolab_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neurolab_protocol_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neurolab_trials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neurolab_longitudinal_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neurolab_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neurolab_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neurolab_clusters ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
    t TEXT;
    tables TEXT[] := ARRAY['neurolab_protocols', 'neurolab_protocol_versions', 'neurolab_trials', 'neurolab_longitudinal_data', 'neurolab_features', 'neurolab_predictions', 'neurolab_clusters'];
BEGIN
    FOREACH t IN ARRAY tables
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS "auth_all" ON public.%I;', t);
        EXECUTE format('CREATE POLICY "auth_all" ON public.%I FOR ALL TO authenticated USING (true) WITH CHECK (true);', t);
    END LOOP;
END $$;

CREATE OR REPLACE FUNCTION public.neurolab_hash_trigger()
RETURNS TRIGGER AS $$
DECLARE
  v_prev_hash TEXT;
BEGIN
  SELECT hash_sha256 INTO v_prev_hash FROM public.neurolab_predictions ORDER BY created_at DESC LIMIT 1;
  IF v_prev_hash IS NULL THEN v_prev_hash := 'genesis'; END IF;
  NEW.hash_sha256 := encode(digest(v_prev_hash || NEW.trial_id::text || NEW.response_probability::text || NOW()::text, 'sha256'), 'hex');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS hash_prediction ON public.neurolab_predictions;
CREATE TRIGGER hash_prediction BEFORE INSERT ON public.neurolab_predictions FOR EACH ROW EXECUTE FUNCTION public.neurolab_hash_trigger();

DO $$
DECLARE
    v_org_id UUID := '11111111-1111-1111-1111-111111111111'::uuid;
    v_patient_1 UUID := '22222222-2222-2222-2222-222222222222'::uuid;
    v_patient_2 UUID := '33333333-3333-3333-3333-333333333333'::uuid;
    v_proto_1 UUID := '44444444-4444-4444-4444-444444444444'::uuid;
    v_proto_2 UUID := '55555555-5555-5555-5555-555555555555'::uuid;
    v_ver_1 UUID := '66666666-6666-6666-6666-666666666666'::uuid;
    v_ver_2 UUID := '77777777-7777-7777-7777-777777777777'::uuid;
    v_trial_1 UUID := '88888888-8888-8888-8888-888888888888'::uuid;
    v_trial_2 UUID := '99999999-9999-9999-9999-999999999999'::uuid;
    v_long_1 UUID := 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid;
    v_feat_1 UUID := 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid;
    v_pred_1 UUID := 'cccccccc-cccc-cccc-cccc-cccccccccccc'::uuid;
BEGIN
    INSERT INTO public.organizations (id, legal_name, organization_type) 
    VALUES (v_org_id, 'NeuroStrata Master Clinic', 'clinic')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.patients (id, organization_id, full_name, status)
    VALUES 
        (v_patient_1, v_org_id, 'Carlos M. Silva', 'active'),
        (v_patient_2, v_org_id, 'Ana P. Souza', 'active')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.neurolab_protocols (id, code, title, rdoc_domain, neural_network_target, status, is_off_label)
    VALUES 
        (v_proto_1, 'NL-tDCS-DEP-01', 'Modulação DMN com tDCS em Depressão Refratária', 'Negative Valence Systems', 'DMN (F3/F4)', 'active', true),
        (v_proto_2, 'NL-REAC-ANX-01', 'Neuromodulação Assimétrica Otimizada para Ansiedade', 'Arousal and Regulatory', 'Salience Network', 'draft', false)
    ON CONFLICT (code) DO NOTHING;

    INSERT INTO public.neurolab_protocol_versions (id, protocol_id, version_number, risk_level)
    VALUES
        (v_ver_1, v_proto_1, 2, 'moderate'),
        (v_ver_2, v_proto_2, 1, 'low')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.neurolab_trials (id, protocol_version_id, patient_id, status, current_stage, risk_level, tcle_signed)
    VALUES
        (v_trial_1, v_ver_1, v_patient_1, 'intervention', 'Sessão 4/10', 'moderate', true),
        (v_trial_2, v_ver_2, v_patient_2, 'baseline', 'Coleta qEEG/sLORETA', 'low', true)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.neurolab_longitudinal_data (id, trial_id, data_type, qeeg_data, hrv_data, psychometrics_data)
    VALUES
        (v_long_1, v_trial_1, 'baseline', 
         '{"band_power": {"alpha": 12, "theta": 18}, "coherence": 0.4}',
         '{"RMSSD": 35, "LF_HF": 1.2}',
         '{"DASS21": {"dep": 18, "anx": 12, "str": 14}, "vital_score": 45}')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.neurolab_features (id, longitudinal_data_id, baseline_state, network_state, organization_state, response_rate)
    VALUES
        (v_feat_1, v_long_1, 'hypo', 'decoupled', 'diffuse', 0.65)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO public.neurolab_predictions (id, trial_id, feature_id, response_probability, expected_delta, risk_score, recommended_intervention, model_version)
    VALUES
        (v_pred_1, v_trial_1, v_feat_1, 0.82, 15.5, 4.2, '{"type": "tDCS", "montage": "F3-F4", "intensity": "2mA"}', 'v1.2.0')
    ON CONFLICT (id) DO NOTHING;
END $$;
