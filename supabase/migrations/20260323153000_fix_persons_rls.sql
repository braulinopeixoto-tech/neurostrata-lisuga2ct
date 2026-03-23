-- Fix Row-Level Security policy for public.persons table to allow authenticated users to insert
DO $$ 
BEGIN
  -- Drop the restrictive/missing policy if it exists
  DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON public.persons;
  
  -- Create the permissive policy for authenticated users
  CREATE POLICY "Enable insert access for authenticated users" 
    ON public.persons 
    FOR INSERT 
    TO authenticated 
    WITH CHECK (true);
END $$;
