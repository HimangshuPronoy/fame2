-- ==============================================
-- Fame. — Add User Ownership to Listings
-- Run this to allow users to edit their own listings
-- ==============================================

-- Step 1: Add user_id column if it doesn't exist
ALTER TABLE public.listings 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Step 2: Drop old policies
DROP POLICY IF EXISTS "Admins can update listings" ON public.listings;
DROP POLICY IF EXISTS "Admins can delete listings" ON public.listings;
DROP POLICY IF EXISTS "Users can update own listings or admins can update any" ON public.listings;
DROP POLICY IF EXISTS "Users can delete own listings or admins can delete any" ON public.listings;

-- Step 3: Create new policies that allow users to manage their own listings
CREATE POLICY "Users can update own listings or admins can update any"
  ON public.listings FOR UPDATE
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can delete own listings or admins can delete any"
  ON public.listings FOR DELETE
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Step 4: Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'listings'
ORDER BY policyname;
