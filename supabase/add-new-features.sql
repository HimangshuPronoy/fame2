-- ==============================================
-- Fame. — New Features Migration
-- Run this AFTER the initial schema.sql
-- Adds: Reviews, Bookings, Notifications, etc.
-- ==============================================

-- ─── Reviews ──────────────────────────────────
create table if not exists public.reviews (
  id           uuid primary key default uuid_generate_v4(),
  listing_id   uuid references public.listings(id) on delete cascade not null,
  user_id      uuid references auth.users(id) on delete cascade not null,
  rating       integer not null check (rating >= 1 and rating <= 5),
  title        text,
  comment      text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique(user_id, listing_id)
);

alter table public.reviews enable row level security;

create policy "Reviews are viewable by everyone"
  on public.reviews for select using (true);

create policy "Authenticated users can create reviews"
  on public.reviews for insert with check (auth.uid() = user_id);

create policy "Users can update own reviews"
  on public.reviews for update using (auth.uid() = user_id);

create policy "Users can delete own reviews"
  on public.reviews for delete using (auth.uid() = user_id);

-- Auto-update review updated_at
drop trigger if exists on_review_updated on public.reviews;
create trigger on_review_updated
  before update on public.reviews
  for each row execute procedure public.handle_updated_at();

-- ─── Bookings ─────────────────────────────────
create table if not exists public.bookings (
  id           uuid primary key default uuid_generate_v4(),
  listing_id   uuid references public.listings(id) on delete cascade not null,
  user_id      uuid references auth.users(id) on delete cascade not null,
  booking_date date not null,
  booking_time time,
  guests       integer default 1,
  status       text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  special_requests text,
  total_price  numeric(10,2),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.bookings enable row level security;

create policy "Users can view own bookings"
  on public.bookings for select using (auth.uid() = user_id);

create policy "Authenticated users can create bookings"
  on public.bookings for insert with check (auth.uid() = user_id);

create policy "Users can update own bookings"
  on public.bookings for update using (auth.uid() = user_id);

create policy "Listing owners can view bookings for their listings"
  on public.bookings for select using (
    exists (
      select 1 from public.listings
      where listings.id = bookings.listing_id and listings.user_id = auth.uid()
    )
  );

-- Auto-update booking updated_at
drop trigger if exists on_booking_updated on public.bookings;
create trigger on_booking_updated
  before update on public.bookings
  for each row execute procedure public.handle_updated_at();

-- ─── Listing Images ───────────────────────────
create table if not exists public.listing_images (
  id           uuid primary key default uuid_generate_v4(),
  listing_id   uuid references public.listings(id) on delete cascade not null,
  image_url    text not null,
  caption      text,
  display_order integer default 0,
  created_at   timestamptz not null default now()
);

alter table public.listing_images enable row level security;

create policy "Listing images are viewable by everyone"
  on public.listing_images for select using (true);

create policy "Listing owners can manage images"
  on public.listing_images for all using (
    exists (
      select 1 from public.listings
      where listings.id = listing_images.listing_id and listings.user_id = auth.uid()
    )
  );

-- ─── Notifications ────────────────────────────
create table if not exists public.notifications (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid references auth.users(id) on delete cascade not null,
  title        text not null,
  message      text not null,
  type         text not null default 'info' check (type in ('info', 'success', 'warning', 'error')),
  link         text,
  is_read      boolean default false,
  created_at   timestamptz not null default now()
);

alter table public.notifications enable row level security;

create policy "Users can view own notifications"
  on public.notifications for select using (auth.uid() = user_id);

create policy "Users can update own notifications"
  on public.notifications for update using (auth.uid() = user_id);

-- ─── Partner Applications ─────────────────────
create table if not exists public.partner_applications (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid references auth.users(id) on delete cascade,
  business_name text not null,
  contact_name text not null,
  email        text not null,
  phone        text,
  website      text,
  category     text not null,
  description  text not null,
  status       text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  admin_notes  text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.partner_applications enable row level security;

create policy "Users can view own applications"
  on public.partner_applications for select using (auth.uid() = user_id);

create policy "Authenticated users can create applications"
  on public.partner_applications for insert with check (auth.uid() = user_id);

create policy "Admins can view all applications"
  on public.partner_applications for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update applications"
  on public.partner_applications for update using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Auto-update application updated_at
drop trigger if exists on_application_updated on public.partner_applications;
create trigger on_application_updated
  before update on public.partner_applications
  for each row execute procedure public.handle_updated_at();

-- ─── User Preferences ─────────────────────────
create table if not exists public.user_preferences (
  user_id              uuid references auth.users(id) on delete cascade primary key,
  favorite_categories  text[],
  price_range_min      text,
  price_range_max      text,
  notification_email   boolean default true,
  notification_push    boolean default true,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

alter table public.user_preferences enable row level security;

create policy "Users can view own preferences"
  on public.user_preferences for select using (auth.uid() = user_id);

create policy "Users can insert own preferences"
  on public.user_preferences for insert with check (auth.uid() = user_id);

create policy "Users can update own preferences"
  on public.user_preferences for update using (auth.uid() = user_id);

-- Auto-update preferences updated_at
drop trigger if exists on_preferences_updated on public.user_preferences;
create trigger on_preferences_updated
  before update on public.user_preferences
  for each row execute procedure public.handle_updated_at();

-- ─── Concierge Requests ───────────────────────
create table if not exists public.concierge_requests (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid references auth.users(id) on delete cascade not null,
  full_name        text not null,
  request_type     text not null,
  details          text not null,
  status           text not null default 'pending' check (status in ('pending', 'in_progress', 'completed', 'cancelled')),
  admin_response   text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

alter table public.concierge_requests enable row level security;

create policy "Users can view own requests"
  on public.concierge_requests for select using (auth.uid() = user_id);

create policy "Authenticated users can create requests"
  on public.concierge_requests for insert with check (auth.uid() = user_id);

create policy "Admins can view all requests"
  on public.concierge_requests for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admins can update requests"
  on public.concierge_requests for update using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Auto-update request updated_at
drop trigger if exists on_request_updated on public.concierge_requests;
create trigger on_request_updated
  before update on public.concierge_requests
  for each row execute procedure public.handle_updated_at();

-- ==============================================
-- Migration Complete!
-- ==============================================
-- You can now use:
-- - Reviews system
-- - Bookings management
-- - Partner applications
-- - Concierge requests
-- - User preferences
-- - Notifications
-- - Multiple listing images
-- ==============================================
