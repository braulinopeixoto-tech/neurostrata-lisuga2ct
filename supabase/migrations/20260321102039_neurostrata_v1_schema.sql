-- Migration: NeuroStrata V1 Schema
-- Description: Implementação da jornada clínica auditável, avaliação multidimensional versionada, 
-- Atlas Taxonômico Neurofuncional, saída integrada ao VitalScore™, Ledger Clínico e Trust Layer.

-- ==========================================
-- 1. UTILITY FUNCTIONS (UPDATED_AT & AUDIT)
-- ==========================================

-- Function for auto-updating timestamps
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Audit trigger function for critical tables
CREATE OR REPLACE FUNCTION public.neurostrata_audit_trigger()
RETURNS TRIGGER AS $$
DECLARE
  v_old_data JSONB;
  v_new_data JSONB;
  v_actor_id UUID;
  v_record_id UUID;
BEGIN
  v_actor_id := auth.uid();
  
  IF (TG_OP = 'UPDATE') THEN
    v_old_data := to_jsonb(OLD);
    v_new_data := to_jsonb(NEW);
    EXECUTE 'SELECT $1.id' USING NEW INTO v_record_id;
    INSERT INTO public.audit_log (actor_profile_id, table_name, record_id, action, old_data, new_data)
    VALUES (v_actor_id, TG_TABLE_NAME, v_record_id, TG_OP, v_old_data, v_new_data);
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    v_old_data := to_jsonb(OLD);
    EXECUTE 'SELECT $1.id' USING OLD INTO v_record_id;
    INSERT INTO public.audit_log (actor_profile_id, table_name, record_id, action, old_data)
    VALUES (v_actor_id, TG_TABLE_NAME, v_record_id, TG_OP, v_old_data);
    RETURN OLD;
  ELSIF (TG_OP = 'INSERT') THEN
    v_new_data := to_jsonb(NEW);
    EXECUTE 'SELECT $1.id' USING NEW INTO v_record_id;
    INSERT INTO public.audit_log (actor_profile_id, table_name, record_id, action, new_data)
    VALUES (v_actor_id, TG_TABLE_NAME, v_record_id, TG_OP, v_new_data);
    RETURN NEW;
  END IF;
  RETURN NULL;
EXCEPTION WHEN OTHERS THEN
  -- Fallback if table doesn't have an 'id' column
  IF (TG_OP = 'UPDATE' OR TG_OP = 'INSERT') THEN RETURN NEW; END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ==========================================
-- 2. TABLE CREATION
-- ==========================================

-- 2.1 Profiles (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2.2 Roles
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.3 Organizations
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    legal_name TEXT NOT NULL,
    trade_name TEXT,
    organization_type TEXT NOT NULL,
    document_number TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2.4 Profile Roles
CREATE TABLE IF NOT EXISTS public.profile_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
    organization_id UUID NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(profile_id, role_id, organization_id)
);

-- 2.5 Organization Units
CREATE TABLE IF NOT EXISTS public.organization_units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    unit_type TEXT NOT NULL,
    city TEXT,
    state TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(organization_id, name)
);

-- 2.6 Professionals
CREATE TABLE IF NOT EXISTS public.professionals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    occupation_code TEXT,
    license_type TEXT,
    license_number TEXT,
    license_state TEXT,
    signature_name TEXT,
    can_supervise BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2.7 Patients
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    external_code TEXT,
    full_name TEXT NOT NULL,
    birth_date DATE,
    sex_at_birth TEXT,
    gender_identity TEXT,
    document_number TEXT,
    phone TEXT,
    email TEXT,
    city TEXT,
    state TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    archived_at TIMESTAMPTZ NULL,
    UNIQUE(organization_id, external_code)
);

-- 2.8 Patient Guardians
CREATE TABLE IF NOT EXISTS public.patient_guardians (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    relationship_type TEXT NOT NULL,
    document_number TEXT,
    phone TEXT,
    email TEXT,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.9 Patient Cases
CREATE TABLE IF NOT EXISTS public.patient_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    organization_unit_id UUID NOT NULL REFERENCES public.organization_units(id) ON DELETE CASCADE,
    opened_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    primary_supervisor_id UUID NULL REFERENCES public.professionals(id) ON DELETE SET NULL,
    case_status TEXT DEFAULT 'open',
    care_line TEXT,
    initial_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    closed_at TIMESTAMPTZ NULL
);

-- 2.10 Case Team Assignments
CREATE TABLE IF NOT EXISTS public.case_team_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_case_id UUID NOT NULL REFERENCES public.patient_cases(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE CASCADE,
    assignment_role TEXT NOT NULL,
    starts_at TIMESTAMPTZ DEFAULT now(),
    ends_at TIMESTAMPTZ NULL
);

-- 2.11 Consents
CREATE TABLE IF NOT EXISTS public.consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    guardian_id UUID NULL REFERENCES public.patient_guardians(id) ON DELETE SET NULL,
    consent_type TEXT NOT NULL,
    document_version TEXT NOT NULL,
    signed_at TIMESTAMPTZ NOT NULL,
    signed_by_name TEXT NOT NULL,
    signature_method TEXT,
    status TEXT DEFAULT 'active',
    file_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.12 Assessment Instruments
CREATE TABLE IF NOT EXISTS public.assessment_instruments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    instrument_type TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.13 Instrument Versions
CREATE TABLE IF NOT EXISTS public.instrument_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instrument_id UUID NOT NULL REFERENCES public.assessment_instruments(id) ON DELETE CASCADE,
    version_code TEXT NOT NULL,
    status TEXT DEFAULT 'draft',
    published_at TIMESTAMPTZ NULL,
    scoring_engine_version TEXT NOT NULL,
    criteria_version TEXT NOT NULL,
    atlas_version TEXT NULL,
    notes TEXT,
    created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(instrument_id, version_code)
);

-- 2.14 Instrument Sections
CREATE TABLE IF NOT EXISTS public.instrument_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instrument_version_id UUID NOT NULL REFERENCES public.instrument_versions(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    title TEXT NOT NULL,
    sort_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(instrument_version_id, code)
);

-- 2.15 Instrument Items
CREATE TABLE IF NOT EXISTS public.instrument_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instrument_version_id UUID NOT NULL REFERENCES public.instrument_versions(id) ON DELETE CASCADE,
    section_id UUID NULL REFERENCES public.instrument_sections(id) ON DELETE SET NULL,
    item_code TEXT NOT NULL,
    prompt_text TEXT NOT NULL,
    response_type TEXT NOT NULL,
    is_required BOOLEAN DEFAULT true,
    sort_order INTEGER NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(instrument_version_id, item_code)
);

-- 2.16 Assessment Sessions
CREATE TABLE IF NOT EXISTS public.assessment_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_case_id UUID NOT NULL REFERENCES public.patient_cases(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
    organization_unit_id UUID NOT NULL REFERENCES public.organization_units(id) ON DELETE CASCADE,
    instrument_version_id UUID NOT NULL REFERENCES public.instrument_versions(id) ON DELETE RESTRICT,
    applicator_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE RESTRICT,
    supervisor_id UUID NULL REFERENCES public.professionals(id) ON DELETE SET NULL,
    session_status TEXT DEFAULT 'in_progress',
    started_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ NULL,
    source_channel TEXT,
    raw_payload_checksum TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.17 Assessment Responses
CREATE TABLE IF NOT EXISTS public.assessment_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_session_id UUID NOT NULL REFERENCES public.assessment_sessions(id) ON DELETE CASCADE,
    instrument_item_id UUID NOT NULL REFERENCES public.instrument_items(id) ON DELETE RESTRICT,
    response_numeric NUMERIC NULL,
    response_text TEXT NULL,
    response_boolean BOOLEAN NULL,
    response_json JSONB NULL,
    answered_at TIMESTAMPTZ DEFAULT now(),
    answered_by UUID NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
    source TEXT,
    is_valid BOOLEAN DEFAULT true,
    UNIQUE(assessment_session_id, instrument_item_id)
);

-- 2.18 Taxonomy Domains
CREATE TABLE IF NOT EXISTS public.taxonomy_domains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    domain_type TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.19 Taxonomy Constructs
CREATE TABLE IF NOT EXISTS public.taxonomy_constructs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    taxonomy_domain_id UUID NOT NULL REFERENCES public.taxonomy_domains(id) ON DELETE CASCADE,
    parent_construct_id UUID NULL REFERENCES public.taxonomy_constructs(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    construct_type TEXT NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(taxonomy_domain_id, code)
);

-- 2.20 Instrument Item Construct Links
CREATE TABLE IF NOT EXISTS public.instrument_item_construct_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instrument_item_id UUID NOT NULL REFERENCES public.instrument_items(id) ON DELETE CASCADE,
    taxonomy_construct_id UUID NOT NULL REFERENCES public.taxonomy_constructs(id) ON DELETE CASCADE,
    weight NUMERIC DEFAULT 1,
    link_type TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(instrument_item_id, taxonomy_construct_id, link_type)
);

-- 2.21 Scoring Rule Sets
CREATE TABLE IF NOT EXISTS public.scoring_rule_sets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    instrument_version_id UUID NOT NULL REFERENCES public.instrument_versions(id) ON DELETE CASCADE,
    rule_set_code TEXT NOT NULL,
    version_code TEXT NOT NULL,
    status TEXT DEFAULT 'draft',
    logic_json JSONB NOT NULL,
    created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ DEFAULT now(),
    published_at TIMESTAMPTZ NULL,
    UNIQUE(instrument_version_id, rule_set_code, version_code)
);

-- 2.22 Risk Strata Definitions
CREATE TABLE IF NOT EXISTS public.risk_strata_definitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_set_id UUID NOT NULL REFERENCES public.scoring_rule_sets(id) ON DELETE CASCADE,
    strata_code TEXT NOT NULL,
    name TEXT NOT NULL,
    severity_level INTEGER NOT NULL,
    criteria_json JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(rule_set_id, strata_code)
);

-- 2.23 Assessment Results
CREATE TABLE IF NOT EXISTS public.assessment_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_session_id UUID NOT NULL UNIQUE REFERENCES public.assessment_sessions(id) ON DELETE CASCADE,
    rule_set_id UUID NOT NULL REFERENCES public.scoring_rule_sets(id) ON DELETE RESTRICT,
    generated_at TIMESTAMPTZ DEFAULT now(),
    generated_by UUID NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
    severity_label TEXT,
    summary_text TEXT,
    result_json JSONB NOT NULL,
    result_checksum TEXT NOT NULL,
    is_final BOOLEAN DEFAULT false
);

-- 2.24 Assessment Result Construct Scores
CREATE TABLE IF NOT EXISTS public.assessment_result_construct_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_result_id UUID NOT NULL REFERENCES public.assessment_results(id) ON DELETE CASCADE,
    taxonomy_construct_id UUID NOT NULL REFERENCES public.taxonomy_constructs(id) ON DELETE CASCADE,
    raw_score NUMERIC,
    normalized_score NUMERIC,
    percentile NUMERIC,
    risk_band TEXT,
    interpretation TEXT,
    UNIQUE(assessment_result_id, taxonomy_construct_id)
);

-- 2.25 Vital Scores
CREATE TABLE IF NOT EXISTS public.vital_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_case_id UUID NOT NULL REFERENCES public.patient_cases(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    assessment_result_id UUID NULL REFERENCES public.assessment_results(id) ON DELETE SET NULL,
    score_date DATE NOT NULL,
    vital_score NUMERIC NOT NULL,
    score_band TEXT NOT NULL,
    score_version TEXT NOT NULL,
    score_components_json JSONB NOT NULL,
    is_current BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.26 Clinical Reports
CREATE TABLE IF NOT EXISTS public.clinical_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_case_id UUID NOT NULL REFERENCES public.patient_cases(id) ON DELETE CASCADE,
    assessment_result_id UUID NULL REFERENCES public.assessment_results(id) ON DELETE SET NULL,
    report_type TEXT NOT NULL,
    title TEXT NOT NULL,
    body_markdown TEXT NOT NULL,
    criteria_version TEXT NOT NULL,
    protocol_version TEXT NOT NULL,
    atlas_version TEXT NULL,
    author_professional_id UUID NOT NULL REFERENCES public.professionals(id) ON DELETE RESTRICT,
    supervisor_professional_id UUID NULL REFERENCES public.professionals(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'draft',
    signed_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2.27 Clinical Report Artifacts
CREATE TABLE IF NOT EXISTS public.clinical_report_artifacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinical_report_id UUID NOT NULL REFERENCES public.clinical_reports(id) ON DELETE CASCADE,
    artifact_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_checksum TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.28 Clinical Events
CREATE TABLE IF NOT EXISTS public.clinical_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_case_id UUID NOT NULL REFERENCES public.patient_cases(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    event_at TIMESTAMPTZ DEFAULT now(),
    performed_by UUID NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
    source_table TEXT,
    source_record_id UUID,
    payload JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2.29 Audit Log (Trust Layer)
CREATE TABLE IF NOT EXISTS public.audit_log (
    id BIGSERIAL PRIMARY KEY,
    occurred_at TIMESTAMPTZ DEFAULT now(),
    actor_profile_id UUID NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
    table_name TEXT NOT NULL,
    record_id UUID NULL,
    action TEXT NOT NULL,
    old_data JSONB NULL,
    new_data JSONB NULL,
    reason TEXT NULL,
    request_id TEXT NULL,
    ip_address INET NULL
);

-- 2.30 Versioned Snapshots (Biograma Ledger)
CREATE TABLE IF NOT EXISTS public.versioned_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    version_number INTEGER NOT NULL,
    snapshot_json JSONB NOT NULL,
    checksum TEXT NOT NULL,
    created_by UUID NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(entity_type, entity_id, version_number)
);


-- ==========================================
-- 3. INDEXES
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_patients_org ON public.patients(organization_id);
CREATE INDEX IF NOT EXISTS idx_patients_status ON public.patients(status);
CREATE INDEX IF NOT EXISTS idx_patient_cases_patient ON public.patient_cases(patient_id);
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_patient ON public.assessment_sessions(patient_id);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_session ON public.assessment_responses(assessment_session_id);
CREATE INDEX IF NOT EXISTS idx_assessment_results_session ON public.assessment_results(assessment_session_id);
CREATE INDEX IF NOT EXISTS idx_vital_scores_patient ON public.vital_scores(patient_id);
CREATE INDEX IF NOT EXISTS idx_clinical_reports_patient_case ON public.clinical_reports(patient_case_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_table_record ON public.audit_log(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_versioned_snapshots_entity ON public.versioned_snapshots(entity_type, entity_id);


-- ==========================================
-- 4. TRIGGERS (UPDATED_AT & AUDIT)
-- ==========================================

DO $$
DECLARE
    t text;
    critical_tables text[] := ARRAY[
        'patients', 'patient_cases', 'assessment_sessions', 'assessment_results', 
        'vital_scores', 'clinical_reports', 'instrument_versions', 'scoring_rule_sets'
    ];
BEGIN
    -- Apply updated_at triggers to all tables that have the updated_at column
    FOR t IN 
        SELECT table_name FROM information_schema.columns 
        WHERE column_name = 'updated_at' AND table_schema = 'public'
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS set_updated_at_trigger ON public.%I', t);
        EXECUTE format('CREATE TRIGGER set_updated_at_trigger BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()', t);
    END LOOP;

    -- Apply audit_log triggers to critical clinical and configuration tables
    FOREACH t IN ARRAY critical_tables
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS neurostrata_audit_trigger ON public.%I', t);
        EXECUTE format('CREATE TRIGGER neurostrata_audit_trigger AFTER INSERT OR UPDATE OR DELETE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.neurostrata_audit_trigger()', t);
    END LOOP;
END;
$$;


-- ==========================================
-- 5. ROW LEVEL SECURITY (RLS) & POLICIES
-- ==========================================

-- Helper function to check user roles easily in RLS
CREATE OR REPLACE FUNCTION public.has_role(role_code text)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profile_roles pr
    JOIN public.roles r ON r.id = pr.role_id
    WHERE pr.profile_id = auth.uid()
    AND r.code = role_code
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on all public tables and apply base policies
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN 
        SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    LOOP
        -- Enable RLS
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
        
        -- Drop old policies to be idempotent
        EXECUTE format('DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.%I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON public.%I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Enable update access for authenticated users" ON public.%I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON public.%I', t);
        
        -- Create base initial policies for V1 (grants access to authenticated users)
        EXECUTE format('CREATE POLICY "Enable read access for authenticated users" ON public.%I FOR SELECT TO authenticated USING (true)', t);
        EXECUTE format('CREATE POLICY "Enable insert access for authenticated users" ON public.%I FOR INSERT TO authenticated WITH CHECK (true)', t);
        EXECUTE format('CREATE POLICY "Enable update access for authenticated users" ON public.%I FOR UPDATE TO authenticated USING (true)', t);
        EXECUTE format('CREATE POLICY "Enable delete access for authenticated users" ON public.%I FOR DELETE TO authenticated USING (true)', t);
    END LOOP;
END;
$$;


-- ==========================================
-- 6. SEED DATA
-- ==========================================

-- Seed Initial Roles
INSERT INTO public.roles (code, name, description) VALUES
('admin', 'Administrador', 'Acesso total ao sistema e configurações operacionais e metodológicas'),
('supervisor', 'Supervisor Clínico', 'Pode validar laudos e assinar check-ups multidimensionais e modelos'),
('practitioner', 'Profissional de Saúde', 'Pode realizar avaliações, alimentar o BIM e visualizar pacientes'),
('auditor', 'Auditor/Defensor', 'Acesso de leitura restrito para processos de validação da Trust Layer')
ON CONFLICT (code) DO UPDATE SET 
  name = EXCLUDED.name, 
  description = EXCLUDED.description;

-- Seed Base Auth User for login testing
DO $seed$
DECLARE
  new_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'braulinopeixoto@gmail.com') THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'braulinopeixoto@gmail.com',
      crypt('securepassword123', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Braulino Peixoto"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '',
      NULL, '', '', ''
    );

    -- Create profile for this user
    INSERT INTO public.profiles (id, full_name, email, is_active)
    VALUES (new_user_id, 'Braulino Peixoto', 'braulinopeixoto@gmail.com', true)
    ON CONFLICT (id) DO NOTHING;
    
    -- Assign Admin role to the seed user
    INSERT INTO public.profile_roles (profile_id, role_id)
    SELECT new_user_id, id FROM public.roles WHERE code = 'admin'
    ON CONFLICT DO NOTHING;
  END IF;
END $seed$;
