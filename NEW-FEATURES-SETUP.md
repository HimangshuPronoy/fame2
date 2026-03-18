# New Features Setup Guide

## 🚀 Quick Setup (3 Steps)

### Step 1: Run the Migration
Open your Supabase SQL Editor and run:
```sql
supabase/add-new-features.sql
```

This adds 7 new tables:
- ✅ reviews
- ✅ bookings  
- ✅ listing_images
- ✅ notifications
- ✅ partner_applications
- ✅ user_preferences
- ✅ concierge_requests

### Step 2: Verify Installation
Check that all tables were created:
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'reviews', 
  'bookings', 
  'listing_images', 
  'notifications', 
  'partner_applications', 
  'user_preferences', 
  'concierge_requests'
);
```

You should see all 7 tables listed.

### Step 3: Test the Features
1. Log in to your app
2. Visit `/dashboard/profile` - Update your profile
3. Visit `/dashboard/saved` - View saved listings
4. Visit `/dashboard/bookings` - See your bookings
5. Visit `/concierge` - Submit a test request
6. Visit `/partners` - Submit a test application
7. Visit any listing and write a review

## 📋 What's New

### User Features

#### 1. Profile Management (`/dashboard/profile`)
- Edit full name
- Select favorite categories
- Manage notification preferences
- View account information

#### 2. Saved Listings (`/dashboard/saved`)
- View all saved/favorited listings
- Remove items from saved collection
- Quick access to listing details

#### 3. Bookings (`/dashboard/bookings`)
- View all your bookings
- Track booking status
- See booking details (date, time, guests)
- Cancel pending bookings

#### 4. Reviews System
- Write reviews with star ratings (1-5)
- Add review title and comment
- One review per user per listing
- View all reviews on listing pages

#### 5. Functional Booking Widget
- Select date and time
- Specify number of guests
- Add special requests
- Instant booking confirmation

#### 6. Concierge Requests (`/concierge`)
- Submit personalized service requests
- Track request status
- Get responses from admin team

#### 7. Partner Applications (`/partners`)
- Apply for business partnership
- Provide business details
- Track application status

### Admin Features

#### Admin Requests Dashboard (`/dashboard/admin/requests`)
Two tabs for managing:

**Concierge Requests:**
- View all user requests
- Update status (pending → in_progress → completed)
- Track request details

**Partner Applications:**
- Review business applications
- Approve or reject applications
- View contact information

## 🗂️ New Database Tables

### reviews
```sql
- id (uuid)
- listing_id (uuid) → listings
- user_id (uuid) → auth.users
- rating (integer 1-5)
- title (text)
- comment (text)
- created_at, updated_at
```

### bookings
```sql
- id (uuid)
- listing_id (uuid) → listings
- user_id (uuid) → auth.users
- booking_date (date)
- booking_time (time)
- guests (integer)
- status (pending/confirmed/cancelled/completed)
- special_requests (text)
- total_price (numeric)
- created_at, updated_at
```

### partner_applications
```sql
- id (uuid)
- user_id (uuid) → auth.users
- business_name (text)
- contact_name (text)
- email (text)
- phone (text)
- website (text)
- category (text)
- description (text)
- status (pending/approved/rejected)
- admin_notes (text)
- created_at, updated_at
```

### concierge_requests
```sql
- id (uuid)
- user_id (uuid) → auth.users
- full_name (text)
- request_type (text)
- details (text)
- status (pending/in_progress/completed/cancelled)
- admin_response (text)
- created_at, updated_at
```

### user_preferences
```sql
- user_id (uuid) → auth.users [PRIMARY KEY]
- favorite_categories (text[])
- price_range_min (text)
- price_range_max (text)
- notification_email (boolean)
- notification_push (boolean)
- created_at, updated_at
```

### notifications
```sql
- id (uuid)
- user_id (uuid) → auth.users
- title (text)
- message (text)
- type (info/success/warning/error)
- link (text)
- is_read (boolean)
- created_at
```

### listing_images
```sql
- id (uuid)
- listing_id (uuid) → listings
- image_url (text)
- caption (text)
- display_order (integer)
- created_at
```

## 🔒 Security (RLS Policies)

All tables have Row Level Security enabled:

- **Users** can only view/edit their own data
- **Admins** can view/manage all requests and applications
- **Public** can view reviews and listing images
- **Listing owners** can view bookings for their listings

## 🎨 New Components

### Reviews Component
```tsx
import Reviews from "@/components/Reviews";

<Reviews listingId={listing.id} />
```

Add to any listing page to enable reviews.

### Enhanced BookingWidget
Already integrated in listing pages. Now creates real bookings in the database.

## 📱 Updated Navigation

Dashboard sidebar now includes:
- Overview
- Profile (new)
- Saved (new)
- Bookings (new)
- Admin Panel (admin only)

## 🧪 Testing Checklist

- [ ] Run migration successfully
- [ ] Create a test booking
- [ ] Write a test review
- [ ] Save a listing
- [ ] Update profile preferences
- [ ] Submit concierge request
- [ ] Submit partner application
- [ ] (Admin) Manage requests
- [ ] (Admin) Approve/reject applications

## 🐛 Troubleshooting

### Migration fails with "already exists" error
The migration uses `CREATE TABLE IF NOT EXISTS`, so it's safe to run multiple times. If you see errors about existing tables, they can be ignored.

### Can't see new dashboard pages
Make sure you're logged in and navigate to:
- `/dashboard/profile`
- `/dashboard/saved`
- `/dashboard/bookings`

### Reviews not showing
Check that:
1. The reviews table was created
2. You're on a listing detail page
3. The Reviews component is imported

### Admin features not visible
Ensure your user has admin role:
```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = 'your-user-id';
```

## 📚 File Structure

New files added:
```
src/
├── app/
│   └── dashboard/
│       ├── profile/
│       │   ├── page.tsx
│       │   └── profile.module.css
│       ├── saved/
│       │   ├── page.tsx
│       │   └── saved.module.css
│       ├── bookings/
│       │   ├── page.tsx
│       │   └── bookings.module.css
│       └── admin/
│           └── requests/
│               ├── page.tsx
│               └── requests.module.css
├── components/
│   ├── Reviews.tsx
│   └── Reviews.module.css
└── lib/
    └── supabase.ts (updated with new types)

supabase/
└── add-new-features.sql (NEW MIGRATION)
```

## 🎯 Next Steps

After setup, you can:
1. Customize the review rating display
2. Add email notifications for bookings
3. Implement payment processing
4. Add image upload for listings
5. Create analytics dashboard
6. Add real-time notifications

## 💡 Tips

- Test all features in development before production
- Back up your database before running migrations
- Review RLS policies for your security requirements
- Customize status workflows to match your business needs

## 🆘 Need Help?

Check these files for reference:
- `FEATURES-ADDED.md` - Complete feature list
- `supabase/add-new-features.sql` - Database schema
- `src/lib/supabase.ts` - TypeScript types

---

**Ready to go!** Run the migration and start using the new features. 🚀
