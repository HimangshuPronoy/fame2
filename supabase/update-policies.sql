-- ==============================================
-- Fame. — Update Database Policies (Comprehensive)
-- Run this in Supabase SQL Editor to enable user data visibility and ownership
-- ==============================================

-- Step 1: Listings Ownership & Admin Control
DROP POLICY IF EXISTS "Admins can manage listings" ON public.listings;
DROP POLICY IF EXISTS "Authenticated users can create listings" ON public.listings;
DROP POLICY IF EXISTS "Admins can update listings" ON public.listings;
DROP POLICY IF EXISTS "Admins can delete listings" ON public.listings;
DROP POLICY IF EXISTS "Owners can update their own listings" ON public.listings;
DROP POLICY IF EXISTS "Owners can delete their own listings" ON public.listings;

CREATE POLICY "Authenticated users can create listings"
  ON public.listings FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Owners can update their own listings"
  ON public.listings FOR UPDATE
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Owners can delete their own listings"
  ON public.listings FOR DELETE
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Step 2: Bookings Visibility
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;
CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Step 3: Reviews Visibility
DROP POLICY IF EXISTS "Users can view their own reviews" ON public.reviews;
CREATE POLICY "Users can view their own reviews"
  ON public.reviews FOR SELECT
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Step 4: Saved Listings Visibility
DROP POLICY IF EXISTS "Users can view their own saved listings" ON public.saved_listings;
CREATE POLICY "Users can view their own saved listings"
  ON public.saved_listings FOR SELECT
  USING (auth.uid() = user_id);

-- Step 5: Verification
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename IN ('listings', 'bookings', 'reviews', 'saved_listings')
ORDER BY tablename, policyname;
