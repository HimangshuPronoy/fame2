-- ==============================================
-- Fame. — Supabase Database Schema
-- Run this in the Supabase SQL editor
-- ==============================================

-- ─── Extensions ───────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Profiles ─────────────────────────────────
-- Extends Supabase auth.users with app-specific fields
create table if not exists public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  full_name   text,
  avatar_url  text,
  role        text not null default 'user' check (role in ('user', 'admin')),
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;

-- Users can read any profile, only update their own
create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create profile when a user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Listings ─────────────────────────────────
create table if not exists public.listings (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid references auth.users(id) on delete cascade,
  title        text not null,
  subtitle     text,
  description  text,
  category     text not null,
  location     text,
  phone        text,
  website      text,
  price        text,
  rating       numeric(3,1) default 0,
  reviews      integer default 0,
  image_url    text,
  author_avatar text,
  is_featured  boolean default false,
  is_active    boolean default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.listings enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Active listings are viewable by everyone" on public.listings;
drop policy if exists "Authenticated users can create listings" on public.listings;
drop policy if exists "Users can update own listings or admins can update any" on public.listings;
drop policy if exists "Users can delete own listings or admins can delete any" on public.listings;
drop policy if exists "Admins can update listings" on public.listings;
drop policy if exists "Admins can delete listings" on public.listings;

-- Everyone can read active listings
create policy "Active listings are viewable by everyone"
  on public.listings for select using (is_active = true);

-- Authenticated users can create listings
create policy "Authenticated users can create listings"
  on public.listings for insert
  with check (auth.uid() is not null);

-- Users can update their own listings OR admins can update any
create policy "Users can update own listings or admins can update any"
  on public.listings for update
  using (
    auth.uid() = user_id OR
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Users can delete their own listings OR admins can delete any
create policy "Users can delete own listings or admins can delete any"
  on public.listings for delete
  using (
    auth.uid() = user_id OR
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Auto-update updated_at on modify
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_listing_updated on public.listings;
create trigger on_listing_updated
  before update on public.listings
  for each row execute procedure public.handle_updated_at();

-- ─── Saved Listings ───────────────────────────
create table if not exists public.saved_listings (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid references auth.users(id) on delete cascade not null,
  listing_id   uuid references public.listings(id) on delete cascade not null,
  created_at   timestamptz not null default now(),
  unique(user_id, listing_id)
);

alter table public.saved_listings enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can view own saved listings" on public.saved_listings;
drop policy if exists "Users can insert own saved listings" on public.saved_listings;
drop policy if exists "Users can delete own saved listings" on public.saved_listings;

-- Users can only see and manage their own saved listings
create policy "Users can view own saved listings"
  on public.saved_listings for select using (auth.uid() = user_id);

create policy "Users can insert own saved listings"
  on public.saved_listings for insert with check (auth.uid() = user_id);

create policy "Users can delete own saved listings"
  on public.saved_listings for delete using (auth.uid() = user_id);
