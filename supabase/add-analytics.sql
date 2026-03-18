-- ==============================================
-- Analytics & Business Metrics
-- Track listing performance for client reporting
-- ==============================================

-- Create analytics events table
CREATE TABLE IF NOT EXISTS public.listing_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'view', 'click', 'search_appearance', 'ai_mention'
  source TEXT, -- 'web', 'chatgpt', 'claude', 'gemini', 'search'
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_listing_analytics_listing_id ON public.listing_analytics(listing_id);
CREATE INDEX IF NOT EXISTS idx_listing_analytics_event_type ON public.listing_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_listing_analytics_created_at ON public.listing_analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_listing_analytics_source ON public.listing_analytics(source);

-- Enable RLS
ALTER TABLE public.listing_analytics ENABLE ROW LEVEL SECURITY;

-- Anyone can insert analytics (for tracking)
CREATE POLICY "Anyone can insert analytics"
  ON public.listing_analytics FOR INSERT
  WITH CHECK (true);

-- Only admins can view analytics
CREATE POLICY "Admins can view all analytics"
  ON public.listing_analytics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create business subscriptions table
CREATE TABLE IF NOT EXISTS public.business_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  plan_type TEXT NOT NULL DEFAULT 'basic', -- 'basic', 'premium', 'enterprise'
  monthly_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'paused', 'cancelled'
  start_date TIMESTAMPTZ DEFAULT NOW(),
  next_billing_date TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_business_subscriptions_listing_id ON public.business_subscriptions(listing_id);
CREATE INDEX IF NOT EXISTS idx_business_subscriptions_status ON public.business_subscriptions(status);

-- Enable RLS
ALTER TABLE public.business_subscriptions ENABLE ROW LEVEL SECURITY;

-- Only admins can manage subscriptions
CREATE POLICY "Admins can manage subscriptions"
  ON public.business_subscriptions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create materialized view for quick analytics
CREATE MATERIALIZED VIEW IF NOT EXISTS public.listing_performance AS
SELECT 
  l.id as listing_id,
  l.title,
  l.category,
  l.is_featured,
  COUNT(CASE WHEN la.event_type = 'view' THEN 1 END) as total_views,
  COUNT(CASE WHEN la.event_type = 'click' THEN 1 END) as total_clicks,
  COUNT(CASE WHEN la.event_type = 'search_appearance' THEN 1 END) as search_appearances,
  COUNT(CASE WHEN la.event_type = 'ai_mention' THEN 1 END) as ai_mentions,
  COUNT(CASE WHEN la.event_type = 'view' AND la.created_at > NOW() - INTERVAL '7 days' THEN 1 END) as views_7d,
  COUNT(CASE WHEN la.event_type = 'view' AND la.created_at > NOW() - INTERVAL '30 days' THEN 1 END) as views_30d,
  MAX(la.created_at) as last_activity
FROM public.listings l
LEFT JOIN public.listing_analytics la ON l.id = la.listing_id
GROUP BY l.id, l.title, l.category, l.is_featured;

-- Create index on materialized view
CREATE UNIQUE INDEX IF NOT EXISTS idx_listing_performance_listing_id ON public.listing_performance(listing_id);

-- Function to refresh analytics
CREATE OR REPLACE FUNCTION refresh_listing_performance()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY public.listing_performance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant access to authenticated users
GRANT SELECT ON public.listing_performance TO authenticated;

-- Verification
SELECT 'Analytics tables created successfully!' as status;
