-- ==============================================
-- Fame. — Enhanced Listings Migration
-- Adds: Bio, Hours, Amenities, Social Links, etc.
-- ==============================================

-- Add new columns to listings table
ALTER TABLE public.listings 
ADD COLUMN IF NOT EXISTS bio text,
ADD COLUMN IF NOT EXISTS hours jsonb,
ADD COLUMN IF NOT EXISTS amenities text[],
ADD COLUMN IF NOT EXISTS tags text[],
ADD COLUMN IF NOT EXISTS social_links jsonb,
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS country text DEFAULT 'Mongolia',
ADD COLUMN IF NOT EXISTS latitude numeric(10, 8),
ADD COLUMN IF NOT EXISTS longitude numeric(11, 8),
ADD COLUMN IF NOT EXISTS video_url text,
ADD COLUMN IF NOT EXISTS booking_url text,
ADD COLUMN IF NOT EXISTS menu_url text;

-- Example hours format:
-- {
--   "monday": {"open": "09:00", "close": "18:00", "closed": false},
--   "tuesday": {"open": "09:00", "close": "18:00", "closed": false},
--   ...
-- }

-- Example social_links format:
-- {
--   "facebook": "https://facebook.com/...",
--   "instagram": "https://instagram.com/...",
--   "twitter": "https://twitter.com/..."
-- }

-- ==============================================
-- Migration Complete!
-- ==============================================
