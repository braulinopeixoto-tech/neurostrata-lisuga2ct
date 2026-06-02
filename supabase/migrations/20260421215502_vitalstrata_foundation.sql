-- Migration: 20260421215502_vitalstrata_foundation.sql

-- Set up the foundational tables for the VitalStrata Trust Layer and Event Sourcing architecture.
-- These tables enforce immutable records, versioning, and hash-chaining.

CREATE TABLE IF NOT EXISTS public.vs_ontology_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_code TEXT NOT NULL UNIQUE,
    description TEXT,
    released_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    current_hash TEXT,
    payload JSONB
);

CREATE TABLE IF NOT EXISTS public.vs_model_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_code TEXT NOT NULL,
    version_number INT NOT NULL DEFAULT 1,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    current_hash TEXT,
    payload JSONB,
    UNIQUE(model_code, version_number)
);

CREATE TABLE IF NOT EXISTS public.vs_subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    version_number INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'active',
    previous_version_id UUID REFERENCES public.vs_subjects(id),
    previous_hash TEXT,
    current_hash TEXT,
    payload JSONB
);

CREATE TABLE IF NOT EXISTS public.vs_encounters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.vs_subjects(id),
    encounter_type TEXT NOT NULL,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    version_number INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'in_progress',
    previous_version_id UUID REFERENCES public.vs_encounters(id),
    previous_hash TEXT,
    current_hash TEXT,
    payload JSONB
);

CREATE TABLE IF NOT EXISTS public.vs_clinical_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.vs_subjects(id),
    encounter_id UUID REFERENCES public.vs_encounters(id),
    event_type TEXT NOT NULL,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    previous_hash TEXT,
    current_hash TEXT,
    source_type TEXT NOT NULL,
    source_device TEXT,
    payload JSONB,
    quality_flag TEXT,
    quality_score NUMERIC
);

CREATE TABLE IF NOT EXISTS public.vs_raw_observations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.vs_subjects(id),
    encounter_id UUID REFERENCES public.vs_encounters(id),
    event_id UUID REFERENCES public.vs_clinical_events(id),
    observation_code TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    version_number INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'active',
    previous_version_id UUID REFERENCES public.vs_raw_observations(id),
    previous_hash TEXT,
    current_hash TEXT,
    source_type TEXT NOT NULL,
    source_device TEXT,
    payload JSONB,
    quality_flag TEXT,
    quality_score NUMERIC
);

CREATE TABLE IF NOT EXISTS public.vs_derived_observations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.vs_subjects(id),
    encounter_id UUID REFERENCES public.vs_encounters(id),
    metric_code TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    version_number INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'active',
    previous_version_id UUID REFERENCES public.vs_derived_observations(id),
    previous_hash TEXT,
    current_hash TEXT,
    source_type TEXT NOT NULL,
    payload JSONB,
    quality_flag TEXT,
    quality_score NUMERIC
);

CREATE TABLE IF NOT EXISTS public.vs_functional_states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.vs_subjects(id),
    state_code TEXT NOT NULL,
    assessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    version_number INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'active',
    previous_version_id UUID REFERENCES public.vs_functional_states(id),
    previous_hash TEXT,
    current_hash TEXT,
    payload JSONB
);

CREATE TABLE IF NOT EXISTS public.vs_neuro_evidence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.vs_subjects(id),
    evidence_type TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    version_number INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'active',
    previous_version_id UUID REFERENCES public.vs_neuro_evidence(id),
    previous_hash TEXT,
    current_hash TEXT,
    payload JSONB,
    weight NUMERIC DEFAULT 1.0,
    quality_score NUMERIC
);

CREATE TABLE IF NOT EXISTS public.vs_clinical_inferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.vs_subjects(id),
    inference_type TEXT NOT NULL,
    conclusion TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    version_number INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'active',
    previous_version_id UUID REFERENCES public.vs_clinical_inferences(id),
    previous_hash TEXT,
    current_hash TEXT,
    payload JSONB
);

CREATE TABLE IF NOT EXISTS public.vs_intervention_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.vs_subjects(id),
    plan_code TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    version_number INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'active',
    previous_version_id UUID REFERENCES public.vs_intervention_plans(id),
    previous_hash TEXT,
    current_hash TEXT,
    payload JSONB
);

CREATE TABLE IF NOT EXISTS public.vs_vitalscore_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.vs_subjects(id),
    encounter_id UUID REFERENCES public.vs_encounters(id),
    model_version_id UUID REFERENCES public.vs_model_versions(id),
    overall_score NUMERIC NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    version_number INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'active',
    previous_version_id UUID REFERENCES public.vs_vitalscore_assessments(id),
    previous_hash TEXT,
    current_hash TEXT,
    payload JSONB
);

CREATE TABLE IF NOT EXISTS public.vs_biograms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.vs_subjects(id),
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    version_number INT NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'active',
    previous_version_id UUID REFERENCES public.vs_biograms(id),
    previous_hash TEXT,
    current_hash TEXT,
    payload JSONB
);

CREATE TABLE IF NOT EXISTS public.vs_provenance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_entity_table TEXT NOT NULL,
    source_entity_id UUID NOT NULL,
    target_entity_table TEXT NOT NULL,
    target_entity_id UUID NOT NULL,
    transformation_type TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    current_hash TEXT,
    payload JSONB
);

CREATE TABLE IF NOT EXISTS public.vs_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_table TEXT NOT NULL,
    entity_id UUID NOT NULL,
    action TEXT NOT NULL,
    actor_id UUID REFERENCES auth.users(id),
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    previous_hash TEXT,
    current_hash TEXT,
    old_payload JSONB,
    new_payload JSONB
);

-- Essential Indexes for performance
CREATE INDEX IF NOT EXISTS idx_vs_subjects_ext ON public.vs_subjects(external_id);
CREATE INDEX IF NOT EXISTS idx_vs_encounters_subj ON public.vs_encounters(subject_id);
CREATE INDEX IF NOT EXISTS idx_vs_clin_events_subj ON public.vs_clinical_events(subject_id);
CREATE INDEX IF NOT EXISTS idx_vs_raw_obs_enc ON public.vs_raw_observations(encounter_id);
CREATE INDEX IF NOT EXISTS idx_vs_derived_obs_enc ON public.vs_derived_observations(encounter_id);
CREATE INDEX IF NOT EXISTS idx_vs_prov_target ON public.vs_provenance_logs(target_entity_id);
CREATE INDEX IF NOT EXISTS idx_vs_audit_entity ON public.vs_audit_logs(entity_table, entity_id);

-- Deterministic Hash Function for Trust Layer
CREATE OR REPLACE FUNCTION public.vs_hash_trigger_func()
RETURNS trigger AS $func$
BEGIN
  -- We compute a simple deterministic hash using md5.
  NEW.current_hash := md5(
    COALESCE(NEW.id::text, '') ||
    COALESCE(NEW.created_at::text, '') ||
    COALESCE(NEW.payload::text, '{}') ||
    COALESCE(NEW.previous_hash, 'genesis')
  );
  RETURN NEW;
END;
$func$ LANGUAGE plpgsql;

-- Apply Hash Trigger to all versionable vs_ tables
DO $do$
DECLARE
    t text;
BEGIN
    FOR t IN 
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name LIKE 'vs_%' 
          AND table_name NOT IN ('vs_audit_logs', 'vs_provenance_logs')
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS trg_vs_hash_%I ON public.%I;', t, t);
        EXECUTE format('CREATE TRIGGER trg_vs_hash_%I BEFORE INSERT OR UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.vs_hash_trigger_func();', t, t);
    END LOOP;
END;
$do$;

-- RLS setup
DO $do$
DECLARE
    t text;
BEGIN
    FOR t IN 
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name LIKE 'vs_%'
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
        EXECUTE format('DROP POLICY IF EXISTS "auth_all_%I" ON public.%I;', t, t);
        EXECUTE format('CREATE POLICY "auth_all_%I" ON public.%I FOR ALL TO authenticated USING (true) WITH CHECK (true);', t, t);
    END LOOP;
END;
$do$;

-- Seed Data to demonstrate the Trust Layer functionality
DO $do$
DECLARE
    v_subject_id UUID := gen_random_uuid();
    v_encounter_id UUID := gen_random_uuid();
    v_event_id UUID := gen_random_uuid();
    v_raw_id UUID := gen_random_uuid();
    v_derived_id UUID := gen_random_uuid();
    v_admin_id UUID;
BEGIN
    SELECT id INTO v_admin_id FROM auth.users WHERE email = 'braulinopeixoto@gmail.com' LIMIT 1;
    
    IF v_admin_id IS NULL THEN
        RETURN; -- skip seed if no admin
    END IF;

    -- Seed Subject
    INSERT INTO public.vs_subjects (id, external_id, created_by, payload, current_hash)
    VALUES (v_subject_id, 'SUBJ-001', v_admin_id, '{"name": "Paciente Genesis"}', 'seedhash')
    ON CONFLICT DO NOTHING;

    -- Seed Encounter
    INSERT INTO public.vs_encounters (id, subject_id, encounter_type, created_by, payload, current_hash)
    VALUES (v_encounter_id, v_subject_id, 'initial_assessment', v_admin_id, '{"notes": "Sessão fundacional"}', 'seedhash')
    ON CONFLICT DO NOTHING;

    -- Seed Event
    INSERT INTO public.vs_clinical_events (id, subject_id, encounter_id, event_type, source_type, created_by, payload, current_hash)
    VALUES (v_event_id, v_subject_id, v_encounter_id, 'observation_recorded', 'manual', v_admin_id, '{"action": "Coleta Inicial"}', 'seedhash')
    ON CONFLICT DO NOTHING;

    -- Seed Raw Observation
    INSERT INTO public.vs_raw_observations (id, subject_id, encounter_id, event_id, observation_code, source_type, created_by, payload, current_hash)
    VALUES (v_raw_id, v_subject_id, v_encounter_id, v_event_id, 'MOTOR-TEST-01', 'sensor_data', v_admin_id, '{"value": 15.4, "unit": "kg"}', 'seedhash')
    ON CONFLICT DO NOTHING;

    -- Seed Derived Observation
    INSERT INTO public.vs_derived_observations (id, subject_id, encounter_id, metric_code, source_type, created_by, payload, current_hash)
    VALUES (v_derived_id, v_subject_id, v_encounter_id, 'MOTOR-STRENGTH-INDEX', 'system_calc', v_admin_id, '{"score": 88}', 'seedhash')
    ON CONFLICT DO NOTHING;

    -- Seed Provenance Log
    INSERT INTO public.vs_provenance_logs (source_entity_table, source_entity_id, target_entity_table, target_entity_id, transformation_type, created_by, current_hash)
    VALUES ('vs_raw_observations', v_raw_id, 'vs_derived_observations', v_derived_id, 'calculation', v_admin_id, 'seedhash')
    ON CONFLICT DO NOTHING;

END;
$do$;
