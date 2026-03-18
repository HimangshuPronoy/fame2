-- ==============================================
-- Fame. — Clear All Mock/Seed Data
-- Run this in Supabase SQL Editor to remove all existing listings
-- ==============================================

-- Delete all listings (this will cascade to saved_listings)
DELETE FROM public.listings;

-- Verify deletion
SELECT COUNT(*) as remaining_listings FROM public.listings;

-- If you see 0, all mock data has been removed successfully!
