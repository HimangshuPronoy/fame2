-- ==============================================
-- Fame. — Admin-Only Listing Management
-- Run this in Supabase SQL Editor to restrict listing creation to admins only
-- ==============================================

-- Step 1: Drop existing listing policies
DROP POLICY IF EXISTS "Admins can manage listings" ON public.listings;
DROP POLICY IF EXISTS "Authenticated users can create listings" ON public.listings;
DROP POLICY IF EXISTS "Users can create listings" ON public.listings;
DROP POLICY IF EXISTS "Admins can update listings" ON public.listings;
DROP POLICY IF EXISTS "Admins can delete listings" ON public.listings;
DROP POLICY IF EXISTS "Users can update own listings" ON public.listings;
DROP POLICY IF EXISTS "Users can delete own listings" ON public.listings;

-- Step 2: Create admin-only policies for listing management
CREATE POLICY "Only admins can create listings"
  ON public.listings FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can update listings"
  ON public.listings FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete listings"
  ON public.listings FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Step 3: Verify policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'listings'
ORDER BY policyname;

-- Expected output:
-- - "Only admins can create listings" (INSERT)
-- - "Only admins can update listings" (UPDATE)
-- - "Only admins can delete listings" (DELETE)
-- - "Anyone can view active listings" (SELECT) - should already exist
