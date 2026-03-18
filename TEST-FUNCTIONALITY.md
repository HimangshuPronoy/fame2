# Functionality Test Guide

## ✅ Build Status: PASSING

The application builds successfully with all TypeScript errors fixed.

## Test Checklist

### 1. Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

### 2. Test Public Pages

- [ ] **Homepage** (`/`)
  - Should load with hero carousel
  - Search bar should be visible
  - Categories should display
  - Listing grid should show (if listings exist)

- [ ] **Listings Page** (`/listings`)
  - Should show all active listings
  - Search should work
  - Category filters should work
  - Click on listing should navigate to detail page

- [ ] **Listing Detail** (`/listing/[id]`)
  - Should show business details
  - Contact info should be visible
  - Reviews section should load
  - Booking widget should appear
  - **Analytics tracking should fire** (check browser console)

### 3. Test Authentication

- [ ] **Login Page** (`/login`)
  - Sign up form should work
  - Login form should work
  - Should redirect to dashboard after login

- [ ] **Dashboard Access**
  - Regular users: `/dashboard/user`
  - Admins: `/dashboard/admin`

### 4. Test Admin Features (Admin Only)

- [ ] **Admin Dashboard** (`/dashboard/admin`)
  - Should show "Manage Listings" interface
  - "Add Listing" button should work
  - Inline form should appear
  - Can create new listing
  - Can edit existing listing
  - Can delete/archive listing
  - "Clear All" button should work (with confirmation)

- [ ] **Analytics Dashboard** (`/dashboard/admin/analytics`)
  - Should show 4 metric cards:
    - Monthly Revenue (₮)
    - Active Clients
    - Total Views
    - AI Mentions
  - Performance table should display
  - Time range filters should work (7d, 30d, all time)
  - Subscriptions section should show

- [ ] **Create Listing** (`/dashboard/create-listing`)
  - Form should load
  - All fields should be editable
  - "Create Listing" button should work
  - Should redirect to admin dashboard after save
  - **Admin-only**: Regular users should see "Access Denied"

- [ ] **Edit Listing** (`/dashboard/edit-listing/[id]`)
  - Should load existing listing data
  - Can modify all fields
  - "Save Changes" button should work
  - Should redirect to admin dashboard after save
  - **Admin-only**: Regular users should see "Access Denied"

- [ ] **My Listings** (`/dashboard/my-listings`)
  - Should show all listings (not just user's)
  - Title: "All Listings (Admin Only)"
  - Can view, edit, delete any listing
  - **Admin-only**: Regular users should see "Access Denied"

### 5. Test AI SEO Endpoints

- [ ] **AI Directory API** (`/api/ai-directory`)
  ```bash
  curl http://localhost:3000/api/ai-directory
  ```
  Should return JSON with:
  - `platform` field
  - `description` field
  - `businesses` array
  - `usage_instructions` object

- [ ] **Filter by Category**
  ```bash
  curl http://localhost:3000/api/ai-directory?category=Gym
  ```
  Should return only gyms

- [ ] **Filter by Location**
  ```bash
  curl http://localhost:3000/api/ai-directory?location=Ulaanbaatar
  ```
  Should return only businesses in Ulaanbaatar

- [ ] **Search Query**
  ```bash
  curl http://localhost:3000/api/ai-directory?q=fitness
  ```
  Should return businesses matching "fitness"

- [ ] **Robots.txt** (`/robots.txt`)
  ```bash
  curl http://localhost:3000/robots.txt
  ```
  Should show:
  - AI crawler permissions (GPTBot, Claude-Web, etc.)
  - Sitemap location
  - API directory endpoint

- [ ] **Sitemap** (`/sitemap.xml`)
  ```bash
  curl http://localhost:3000/sitemap.xml
  ```
  Should return XML with:
  - Homepage URL
  - Listings page URL
  - AI directory API URL
  - Individual listing URLs

- [ ] **AI Discovery File** (`/.well-known/ai.json`)
  ```bash
  curl http://localhost:3000/.well-known/ai.json
  ```
  Should return JSON with platform info and API documentation

### 6. Test Analytics Tracking

Open browser console and visit a listing page:

- [ ] **View Tracking**
  - Visit `/listing/[id]`
  - Check console for: "Analytics tracking" or similar
  - Check Supabase `listing_analytics` table for new row with `event_type = 'view'`

- [ ] **Click Tracking**
  - Click phone number on listing page
  - Check Supabase for `event_type = 'click'` with `metadata.click_type = 'phone'`
  - Click website link
  - Check Supabase for `event_type = 'click'` with `metadata.click_type = 'website'`

### 7. Test Database

Run in Supabase SQL Editor:

```sql
-- Check listings exist
SELECT COUNT(*) FROM listings WHERE is_active = true;

-- Check analytics tracking works
SELECT * FROM listing_analytics ORDER BY created_at DESC LIMIT 10;

-- Check performance view
SELECT * FROM listing_performance ORDER BY total_views DESC;

-- Check subscriptions
SELECT * FROM business_subscriptions WHERE status = 'active';
```

### 8. Test Admin-Only Restrictions

**As Regular User (non-admin):**

- [ ] Visit `/dashboard/create-listing` → Should see "Access Denied"
- [ ] Visit `/dashboard/edit-listing/[id]` → Should see "Access Denied"
- [ ] Visit `/dashboard/my-listings` → Should see "Access Denied"
- [ ] Visit `/dashboard/admin/analytics` → Should see "Access Denied"
- [ ] Try to create listing via API → Should fail (RLS policy)

**As Admin:**

- [ ] All above pages should work
- [ ] Can create/edit/delete any listing
- [ ] Can view all analytics

## Common Issues & Fixes

### Issue: "Access Denied" even as admin

**Fix:**
```sql
-- Make yourself admin
UPDATE profiles SET role = 'admin' WHERE id = 'your-user-id';
```

### Issue: Analytics showing zero data

**Fix:**
1. Check if `listing_analytics` table exists
2. Run `supabase/add-analytics.sql`
3. Refresh materialized view:
   ```sql
   REFRESH MATERIALIZED VIEW listing_performance;
   ```

### Issue: API returns empty businesses array

**Fix:**
1. Check if listings exist: `SELECT * FROM listings WHERE is_active = true;`
2. Add test listings via admin dashboard
3. Verify RLS policies allow SELECT

### Issue: Can't create listings

**Fix:**
1. Check you're logged in as admin
2. Run `supabase/admin-only-listings.sql`
3. Verify admin role: `SELECT role FROM profiles WHERE id = auth.uid();`

### Issue: Robots.txt or sitemap not loading

**Fix:**
1. Restart dev server: `npm run dev`
2. Clear Next.js cache: `rm -rf .next`
3. Rebuild: `npm run build`

## Production Deployment Test

After deploying to Vercel:

- [ ] All public pages load
- [ ] Authentication works
- [ ] Admin dashboard accessible
- [ ] API endpoints return data
- [ ] Analytics tracking works
- [ ] Custom domain configured (if applicable)

### Test AI Crawler Access

```bash
# Test as GPTBot
curl -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.0; +https://openai.com/gptbot" https://your-domain.com/api/ai-directory

# Test as Claude
curl -A "Claude-Web" https://your-domain.com/api/ai-directory

# Should return full business data
```

## Performance Benchmarks

Expected response times:

- Homepage: < 1s
- Listings page: < 1.5s
- Listing detail: < 1s
- API endpoint: < 500ms
- Analytics dashboard: < 2s

## Security Checklist

- [ ] Environment variables not exposed in client
- [ ] RLS policies prevent unauthorized access
- [ ] Admin-only routes protected
- [ ] API rate limiting (consider adding)
- [ ] CORS configured properly

## Final Verification

Before going live:

1. ✅ Build passes: `npm run build`
2. ✅ No TypeScript errors
3. ✅ No console errors in browser
4. ✅ All admin features work
5. ✅ Analytics tracking works
6. ✅ API endpoints return data
7. ✅ AI crawler access configured
8. ✅ Database migrations run
9. ✅ Admin account created
10. ✅ Test listings added

---

**Status: READY FOR TESTING**

Run `npm run dev` and go through this checklist. Everything should work!
