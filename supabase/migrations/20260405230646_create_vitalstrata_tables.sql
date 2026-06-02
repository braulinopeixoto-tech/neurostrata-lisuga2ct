-- Create VitalStrata tables for Intelligence Module
CREATE TABLE IF NOT EXISTS public.vitalscore_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id TEXT NOT NULL,
  vital_score NUMERIC NOT NULL,
  reserve_delta NUMERIC,
  reliability TEXT,
  version TEXT,
  hash TEXT,
  neuro NUMERIC,
  cognitive NUMERIC,
  emotional NUMERIC,
  metabolic NUMERIC,
  contextual NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.clinical_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id TEXT NOT NULL,
  description TEXT NOT NULL,
  impact TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.vitalscore_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_events ENABLE ROW LEVEL SECURITY;

-- Add RLS Policies for vitalscore_table
DROP POLICY IF EXISTS "authenticated_select_vitalscore" ON public.vitalscore_table;
CREATE POLICY "authenticated_select_vitalscore" ON public.vitalscore_table
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_insert_vitalscore" ON public.vitalscore_table;
CREATE POLICY "authenticated_insert_vitalscore" ON public.vitalscore_table
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_update_vitalscore" ON public.vitalscore_table;
CREATE POLICY "authenticated_update_vitalscore" ON public.vitalscore_table
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_delete_vitalscore" ON public.vitalscore_table;
CREATE POLICY "authenticated_delete_vitalscore" ON public.vitalscore_table
  FOR DELETE TO authenticated USING (true);

-- Add RLS Policies for clinical_events
DROP POLICY IF EXISTS "authenticated_select_clinical_events" ON public.clinical_events;
CREATE POLICY "authenticated_select_clinical_events" ON public.clinical_events
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_insert_clinical_events" ON public.clinical_events;
CREATE POLICY "authenticated_insert_clinical_events" ON public.clinical_events
  FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_update_clinical_events" ON public.clinical_events;
CREATE POLICY "authenticated_update_clinical_events" ON public.clinical_events
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_delete_clinical_events" ON public.clinical_events;
CREATE POLICY "authenticated_delete_clinical_events" ON public.clinical_events
  FOR DELETE TO authenticated USING (true);

-- Indexes for query performance based on patient_id
CREATE INDEX IF NOT EXISTS idx_vitalscore_patient_id ON public.vitalscore_table(patient_id);
CREATE INDEX IF NOT EXISTS idx_clinical_events_patient_id ON public.clinical_events(patient_id);

-- Seed mock data to visualize functionality immediately for standard mock patients (id '1' and '2')
DO $$
BEGIN
  -- Seeding for patient_id '1'
  IF NOT EXISTS (SELECT 1 FROM public.vitalscore_table WHERE patient_id = '1') THEN
    INSERT INTO public.vitalscore_table (patient_id, vital_score, reserve_delta, reliability, version, hash, neuro, cognitive, emotional, metabolic, contextual, created_at) VALUES
    ('1', 65, -1.0, 'Média', 'v2.1.0-rc', 'c3d4e5f6g7h8i9j0', 60, 65, 50, 55, 45, NOW() - INTERVAL '60 days'),
    ('1', 68, 0.5, 'Média', 'v2.1.0-rc', 'c3d4e5f6g7h8i9j1', 65, 68, 55, 58, 48, NOW() - INTERVAL '45 days'),
    ('1', 72, 1.2, 'Alta', 'v2.1.0-rc', 'c3d4e5f6g7h8i9j2', 70, 70, 60, 60, 50, NOW() - INTERVAL '30 days'),
    ('1', 75, 2.0, 'Alta', 'v2.1.0-rc', 'c3d4e5f6g7h8i9j3', 75, 72, 65, 65, 55, NOW() - INTERVAL '15 days'),
    ('1', 82, 3.5, 'Alta (High Density)', 'v2.1.0-rc', 'c3d4e5f6g7h8i9j4', 85, 80, 75, 70, 60, NOW());

    INSERT INTO public.clinical_events (patient_id, description, impact, created_at) VALUES
    ('1', 'Ajuste Medicamentoso (ISRS)', 'Estabilização Emocional (+12%)', NOW() - INTERVAL '40 days'),
    ('1', 'Protocolo Nutricional Anti-inflamatório', 'Melhora Metabólica (+8%)', NOW() - INTERVAL '20 days');
  END IF;

  -- Seeding for patient_id '2'
  IF NOT EXISTS (SELECT 1 FROM public.vitalscore_table WHERE patient_id = '2') THEN
    INSERT INTO public.vitalscore_table (patient_id, vital_score, reserve_delta, reliability, version, hash, neuro, cognitive, emotional, metabolic, contextual, created_at) VALUES
    ('2', 55, -2.5, 'Baixa', 'v2.1.0-rc', 'd4e5f6g7h8i9j0k1', 50, 55, 40, 45, 35, NOW() - INTERVAL '30 days'),
    ('2', 58, -0.5, 'Média', 'v2.1.0-rc', 'd4e5f6g7h8i9j0k2', 55, 58, 45, 48, 40, NOW());

    INSERT INTO public.clinical_events (patient_id, description, impact, created_at) VALUES
    ('2', 'Início de Terapia Cognitiva', 'Regulação de Humor (+5%)', NOW() - INTERVAL '15 days');
  END IF;
END $$;
