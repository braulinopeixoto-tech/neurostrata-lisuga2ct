CREATE TABLE IF NOT EXISTS public.pharmacotherapy_interventions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  prescriber_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  axis_id TEXT NOT NULL,
  axis_name TEXT NOT NULL,
  formula_name TEXT NOT NULL,
  substances TEXT NOT NULL,
  mechanism TEXT,
  rationale TEXT,
  expected_qeeg TEXT,
  observed_qeeg TEXT,
  status TEXT DEFAULT 'proposed',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.pharmacotherapy_interventions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "pharmacotherapy_read_all" ON public.pharmacotherapy_interventions;
CREATE POLICY "pharmacotherapy_read_all" ON public.pharmacotherapy_interventions FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "pharmacotherapy_insert_all" ON public.pharmacotherapy_interventions;
CREATE POLICY "pharmacotherapy_insert_all" ON public.pharmacotherapy_interventions FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "pharmacotherapy_update_all" ON public.pharmacotherapy_interventions;
CREATE POLICY "pharmacotherapy_update_all" ON public.pharmacotherapy_interventions FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "pharmacotherapy_delete_all" ON public.pharmacotherapy_interventions;
CREATE POLICY "pharmacotherapy_delete_all" ON public.pharmacotherapy_interventions FOR DELETE TO authenticated USING (true);
