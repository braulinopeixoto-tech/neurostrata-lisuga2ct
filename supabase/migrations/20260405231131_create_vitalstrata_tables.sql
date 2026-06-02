CREATE TABLE IF NOT EXISTS public.vitalscore_table (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id TEXT NOT NULL,
    vital_score NUMERIC NOT NULL,
    reserve_delta NUMERIC NOT NULL,
    reliability TEXT,
    version TEXT,
    hash TEXT,
    neuro NUMERIC,
    cognitive NUMERIC,
    emotional NUMERIC,
    metabolic NUMERIC,
    contextual NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.clinical_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id TEXT NOT NULL,
    description TEXT NOT NULL,
    impact TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.vitalscore_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_events ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "authenticated_select_vitalscore" ON public.vitalscore_table;
CREATE POLICY "authenticated_select_vitalscore" ON public.vitalscore_table
    FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_insert_vitalscore" ON public.vitalscore_table;
CREATE POLICY "authenticated_insert_vitalscore" ON public.vitalscore_table
    FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_select_events" ON public.clinical_events;
CREATE POLICY "authenticated_select_events" ON public.clinical_events
    FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_insert_events" ON public.clinical_events;
CREATE POLICY "authenticated_insert_events" ON public.clinical_events
    FOR INSERT TO authenticated WITH CHECK (true);

-- Seed initial data for common default patient IDs just in case
DO $$
DECLARE
    pid TEXT;
    pids TEXT[] := ARRAY['1', '2', '3', '4', 'p1', 'p2'];
BEGIN
    FOREACH pid IN ARRAY pids
    LOOP
        IF NOT EXISTS (SELECT 1 FROM public.vitalscore_table WHERE patient_id = pid) THEN
            INSERT INTO public.vitalscore_table (patient_id, vital_score, reserve_delta, reliability, version, hash, neuro, cognitive, emotional, metabolic, contextual, created_at) VALUES
            (pid, 65, -5.0, 'Média', 'v2.0.0', 'hash1', 65, 60, 50, 55, 40, NOW() - INTERVAL '60 days'),
            (pid, 68, -2.0, 'Média', 'v2.0.0', 'hash2', 68, 62, 52, 55, 42, NOW() - INTERVAL '45 days'),
            (pid, 72, 1.5, 'Alta', 'v2.1.0', 'hash3', 72, 65, 55, 58, 45, NOW() - INTERVAL '30 days'),
            (pid, 75, 2.5, 'Alta (High Density)', 'v2.1.0-rc', 'hash4', 75, 68, 55, 55, 45, NOW() - INTERVAL '15 days'),
            (pid, 78, -2.5, 'Alta (High Density)', 'v2.1.0-rc', 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8', 78, 70, 55, 55, 45, NOW());

            INSERT INTO public.clinical_events (patient_id, description, impact, created_at) VALUES
            (pid, 'Ajuste Medicamentoso (ISRS)', 'Estabilização Emocional (+12%)', NOW() - INTERVAL '40 days'),
            (pid, 'Protocolo Nutricional Anti-inflamatório', 'Melhora Metabólica (+8%)', NOW() - INTERVAL '20 days');
        END IF;
    END LOOP;
END $$;
