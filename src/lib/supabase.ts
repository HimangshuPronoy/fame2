import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Public client — respects RLS. Use everywhere (client + server).
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client — bypasses RLS. ONLY use in Server Actions / API routes.
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
export const supabaseAdmin = serviceKey
  ? createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false }
    })
  : null

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: 'user' | 'admin'
  created_at: string
}

export interface Listing {
  id: string
  user_id: string | null
  title: string
  subtitle: string | null
  description: string | null
  category: string
  location: string | null
  phone: string | null
  website: string | null
  price: string | null
  rating: number
  reviews: number
  image_url: string | null
  author_avatar: string | null
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  listing_id: string
  user_id: string
  rating: number
  title: string | null
  comment: string | null
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  listing_id: string
  user_id: string
  booking_date: string
  booking_time: string | null
  guests: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  special_requests: string | null
  total_price: number | null
  created_at: string
  updated_at: string
}

export interface ListingImage {
  id: string
  listing_id: string
  image_url: string
  caption: string | null
  display_order: number
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  link: string | null
  is_read: boolean
  created_at: string
}

export interface PartnerApplication {
  id: string
  user_id: string | null
  business_name: string
  contact_name: string
  email: string
  phone: string | null
  website: string | null
  category: string
  description: string
  status: 'pending' | 'approved' | 'rejected'
  admin_notes: string | null
  created_at: string
  updated_at: string
}

export interface UserPreferences {
  user_id: string
  favorite_categories: string[] | null
  price_range_min: string | null
  price_range_max: string | null
  notification_email: boolean
  notification_push: boolean
  created_at: string
  updated_at: string
}

export interface ConciergeRequest {
  id: string
  user_id: string
  full_name: string
  request_type: string
  details: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  admin_response: string | null
  created_at: string
  updated_at: string
}
