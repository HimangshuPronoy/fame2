-- Demo: Add a test gym listing to show how it appears in AI results
-- Run this in Supabase SQL Editor after setting up the database

INSERT INTO public.listings (
  title,
  subtitle,
  description,
  category,
  location,
  phone,
  website,
  price,
  image_url,
  rating,
  reviews,
  is_featured,
  is_active
) VALUES (
  'Skyline Fitness Center',
  'Premium Gym with Modern Equipment',
  'Skyline Fitness Center is Ulaanbaatar''s premier fitness facility featuring state-of-the-art equipment, certified personal trainers, group fitness classes, and a luxurious spa. Open 6 AM to 11 PM daily. Perfect for serious athletes and fitness enthusiasts.',
  'Gym',
  'Ulaanbaatar, Mongolia',
  '+976 1234 5678',
  'https://skylinefitness.mn',
  '₮80,000/month',
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2070',
  4.8,
  127,
  true,
  true
);

-- Verify it was added
SELECT id, title, category, location, is_active FROM public.listings WHERE title = 'Skyline Fitness Center';
