-- ==============================================
-- Business Owner Dashboard System
-- Separate dashboards for Admin vs Business Owners
-- ==============================================

-- Add business_owner role to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user' 
CHECK (role IN ('user', 'admin', 'business_owner'));

-- Update existing check constraint
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('user', 'admin', 'business_owner'));

-- ─── Monthly Work Reports (Admin creates for business owners) ───
CREATE TABLE IF NOT EXISTS public.monthly_reports (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  listing_id uuid REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  month date NOT NULL, -- First day of the month
  work_completed text NOT NULL,
  ai_mentions integer DEFAULT 0,
  views integer DEFAULT 0,
  clicks integer DEFAULT 0,
  ranking_improvement text,
  notes text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(listing_id, month)
);

ALTER TABLE public.monthly_reports ENABLE ROW LEVEL SECURITY;

-- Business owners can view their own reports
CREATE POLICY "Business owners can view own reports"
  ON public.monthly_reports FOR SELECT
  USING (auth.uid() = business_owner_id);

-- Admins can manage all reports
CREATE POLICY "Admins can manage all reports"
  ON public.monthly_reports FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ─── Contact Requests (Business owners contact admin) ───
CREATE TABLE IF NOT EXISTS public.contact_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  listing_id uuid REFERENCES public.listings(id) ON DELETE CASCADE,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved')),
  admin_response text,
  responded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Business owners can view and create their own requests
CREATE POLICY "Business owners can view own requests"
  ON public.contact_requests FOR SELECT
  USING (auth.uid() = business_owner_id);

CREATE POLICY "Business owners can create requests"
  ON public.contact_requests FOR INSERT
  WITH CHECK (auth.uid() = business_owner_id);

-- Admins can view and respond to all requests
CREATE POLICY "Admins can view all requests"
  ON public.contact_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update requests"
  ON public.contact_requests FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ─── Progress Charts (Admin creates custom charts for business owners) ───
CREATE TABLE IF NOT EXISTS public.progress_charts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  listing_id uuid REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  chart_type text NOT NULL CHECK (chart_type IN ('views', 'clicks', 'ai_mentions', 'ranking', 'custom')),
  title text NOT NULL,
  data jsonb NOT NULL, -- Array of {date, value} objects
  description text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.progress_charts ENABLE ROW LEVEL SECURITY;

-- Business owners can view their own charts
CREATE POLICY "Business owners can view own charts"
  ON public.progress_charts FOR SELECT
  USING (auth.uid() = business_owner_id);

-- Admins can manage all charts
CREATE POLICY "Admins can manage all charts"
  ON public.progress_charts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ─── Link business owners to their listings ───
ALTER TABLE public.listings
ADD COLUMN IF NOT EXISTS business_owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_listings_business_owner ON public.listings(business_owner_id);
CREATE INDEX IF NOT EXISTS idx_monthly_reports_owner ON public.monthly_reports(business_owner_id);
CREATE INDEX IF NOT EXISTS idx_contact_requests_owner ON public.contact_requests(business_owner_id);
CREATE INDEX IF NOT EXISTS idx_progress_charts_owner ON public.progress_charts(business_owner_id);

-- ─── Auto-update timestamps ───
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_monthly_report_updated ON public.monthly_reports;
CREATE TRIGGER on_monthly_report_updated
  BEFORE UPDATE ON public.monthly_reports
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_contact_request_updated ON public.contact_requests;
CREATE TRIGGER on_contact_request_updated
  BEFORE UPDATE ON public.contact_requests
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS on_progress_chart_updated ON public.progress_charts;
CREATE TRIGGER on_progress_chart_updated
  BEFORE UPDATE ON public.progress_charts
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- ==============================================
-- Migration Complete!
-- ==============================================
-- Now you have:
-- 1. Business owner role in profiles
-- 2. Monthly reports system
-- 3. Contact/request system
-- 4. Progress charts system
-- 5. Proper RLS policies for both roles
-- ==============================================
