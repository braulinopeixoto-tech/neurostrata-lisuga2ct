-- Migration for BioStrata Fisio | Perícia Funcional
DO $BODY$
BEGIN

  -- 1. Create Tables
  CREATE TABLE IF NOT EXISTS public.fisio_pericia_avaliacoes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
      professional_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
      status TEXT NOT NULL DEFAULT 'draft',
      labor_demand TEXT,
      context_notes TEXT,
      occupational_conclusion TEXT,
      bfs_p_score NUMERIC,
      severity_level TEXT,
      evidence_reliability TEXT,
      longitudinal_profile TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.fisio_instrument_results (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      avaliacao_id UUID NOT NULL REFERENCES public.fisio_pericia_avaliacoes(id) ON DELETE CASCADE,
      instrument_name TEXT NOT NULL,
      instrument_type TEXT NOT NULL, -- 'prom' | 'observational'
      score NUMERIC,
      raw_data JSONB,
      created_at TIMESTAMPTZ DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.fisio_longitudinal_events (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
      event_date DATE NOT NULL,
      description TEXT NOT NULL,
      impact_score NUMERIC,
      created_at TIMESTAMPTZ DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.fisio_generated_alerts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      avaliacao_id UUID NOT NULL REFERENCES public.fisio_pericia_avaliacoes(id) ON DELETE CASCADE,
      alert_type TEXT NOT NULL, -- 'inconsistency'
      message TEXT NOT NULL,
      resolved BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.fisio_report_versions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      avaliacao_id UUID NOT NULL REFERENCES public.fisio_pericia_avaliacoes(id) ON DELETE CASCADE,
      version INTEGER NOT NULL,
      report_content TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- 2. Enable RLS
  ALTER TABLE public.fisio_pericia_avaliacoes ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.fisio_instrument_results ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.fisio_longitudinal_events ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.fisio_generated_alerts ENABLE ROW LEVEL SECURITY;
  ALTER TABLE public.fisio_report_versions ENABLE ROW LEVEL SECURITY;

  -- 3. Create Policies
  -- fisio_pericia_avaliacoes
  DROP POLICY IF EXISTS "auth_all_fisio_avaliacoes" ON public.fisio_pericia_avaliacoes;
  CREATE POLICY "auth_all_fisio_avaliacoes" ON public.fisio_pericia_avaliacoes FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- fisio_instrument_results
  DROP POLICY IF EXISTS "auth_all_fisio_results" ON public.fisio_instrument_results;
  CREATE POLICY "auth_all_fisio_results" ON public.fisio_instrument_results FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- fisio_longitudinal_events
  DROP POLICY IF EXISTS "auth_all_fisio_events" ON public.fisio_longitudinal_events;
  CREATE POLICY "auth_all_fisio_events" ON public.fisio_longitudinal_events FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- fisio_generated_alerts
  DROP POLICY IF EXISTS "auth_all_fisio_alerts" ON public.fisio_generated_alerts;
  CREATE POLICY "auth_all_fisio_alerts" ON public.fisio_generated_alerts FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- fisio_report_versions
  DROP POLICY IF EXISTS "auth_all_fisio_reports" ON public.fisio_report_versions;
  CREATE POLICY "auth_all_fisio_reports" ON public.fisio_report_versions FOR ALL TO authenticated USING (true) WITH CHECK (true);

  -- 4. Triggers for updated_at
  DROP TRIGGER IF EXISTS set_updated_at_fisio_avaliacoes ON public.fisio_pericia_avaliacoes;
  CREATE TRIGGER set_updated_at_fisio_avaliacoes
      BEFORE UPDATE ON public.fisio_pericia_avaliacoes
      FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

END $BODY$;
