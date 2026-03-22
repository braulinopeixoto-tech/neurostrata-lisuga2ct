-- Fix RLS policies for persons and related tables to allow full access (including update/anon)
-- This resolves the RLS violation when inserting/upserting without explicit authentication or missing UPDATE policies

-- Persons
DROP POLICY IF EXISTS "auth_insert_persons" ON public.persons;
CREATE POLICY "auth_insert_persons" ON public.persons FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_persons" ON public.persons;
CREATE POLICY "auth_read_persons" ON public.persons FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "auth_update_persons" ON public.persons;
CREATE POLICY "auth_update_persons" ON public.persons FOR UPDATE TO public USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_persons" ON public.persons;
CREATE POLICY "auth_delete_persons" ON public.persons FOR DELETE TO public USING (true);

-- Assessments
DROP POLICY IF EXISTS "auth_insert_assessments" ON public.assessments;
CREATE POLICY "auth_insert_assessments" ON public.assessments FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_assessments" ON public.assessments;
CREATE POLICY "auth_read_assessments" ON public.assessments FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "auth_update_assessments" ON public.assessments;
CREATE POLICY "auth_update_assessments" ON public.assessments FOR UPDATE TO public USING (true) WITH CHECK (true);

-- Computed Profiles
DROP POLICY IF EXISTS "auth_insert_computed_profiles" ON public.computed_profiles;
CREATE POLICY "auth_insert_computed_profiles" ON public.computed_profiles FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_computed_profiles" ON public.computed_profiles;
CREATE POLICY "auth_read_computed_profiles" ON public.computed_profiles FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "auth_update_computed_profiles" ON public.computed_profiles;
CREATE POLICY "auth_update_computed_profiles" ON public.computed_profiles FOR UPDATE TO public USING (true) WITH CHECK (true);

-- Biogram Events
DROP POLICY IF EXISTS "auth_insert_biogram_events" ON public.biogram_events;
CREATE POLICY "auth_insert_biogram_events" ON public.biogram_events FOR INSERT TO public WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_biogram_events" ON public.biogram_events;
CREATE POLICY "auth_read_biogram_events" ON public.biogram_events FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "auth_update_biogram_events" ON public.biogram_events;
CREATE POLICY "auth_update_biogram_events" ON public.biogram_events FOR UPDATE TO public USING (true) WITH CHECK (true);

-- Model Definitions & Dimensions
DROP POLICY IF EXISTS "auth_read_model_definitions" ON public.model_definitions;
CREATE POLICY "auth_read_model_definitions" ON public.model_definitions FOR SELECT TO public USING (true);

DROP POLICY IF EXISTS "auth_read_model_dimensions" ON public.model_dimensions;
CREATE POLICY "auth_read_model_dimensions" ON public.model_dimensions FOR SELECT TO public USING (true);
