-- ==============================================
-- Fame. — Fresh Database Setup
-- Run this ONLY for a brand new database
-- ==============================================

-- ─── Extensions ───────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Profiles ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name   text,
  avatar_url  text,
  role        text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create policies
CREATE POLICY "Profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ─── Listings ─────────────────────────────────
CREATE TABLE IF NOT EXISTS public.listings (
  id           uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title        text NOT NULL,
  subtitle     text,
  description  text,
  category     text NOT NULL,
  location     text,
  phone        text,
  website      text,
  price        text,
  rating       numeric(3,1) DEFAULT 0,
  reviews      integer DEFAULT 0,
  image_url    text,
  author_avatar text,
  is_featured  boolean DEFAULT false,
  is_active    boolean DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first
DROP POLICY IF EXISTS "Active listings are viewable by everyone" ON public.listings;
DROP POLICY IF EXISTS "Authenticated users can create listings" ON public.listings;
DROP POLICY IF EXISTS "Users can update own listings or admins can update any" ON public.listings;
DROP POLICY IF EXISTS "Users can delete own listings or admins can delete any" ON public.listings;
DROP POLICY IF EXISTS "Admins can update listings" ON public.listings;
DROP POLICY IF EXISTS "Admins can delete listings" ON public.listings;

-- Create policies
CREATE POLICY "Active listings are viewable by everyone"
  ON public.listings FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can create listings"
  ON public.listings FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

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

-- Auto-update updated_at function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_listing_updated ON public.listings;
CREATE TRIGGER on_listing_updated
  BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- ─── Saved Listings ───────────────────────────
CREATE TABLE IF NOT EXISTS public.saved_listings (
  id           uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  listing_id   uuid REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, listing_id)
);

ALTER TABLE public.saved_listings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first
DROP POLICY IF EXISTS "Users can view own saved listings" ON public.saved_listings;
DROP POLICY IF EXISTS "Users can insert own saved listings" ON public.saved_listings;
DROP POLICY IF EXISTS "Users can delete own saved listings" ON public.saved_listings;

-- Create policies
CREATE POLICY "Users can view own saved listings"
  ON public.saved_listings FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved listings"
  ON public.saved_listings FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved listings"
  ON public.saved_listings FOR DELETE USING (auth.uid() = user_id);

-- ─── Success Message ──────────────────────────
DO $$
BEGIN
  RAISE NOTICE '✅ Database setup complete!';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Create your user account';
  RAISE NOTICE '2. Run make-admin.sql to promote yourself to admin';
END $$;
