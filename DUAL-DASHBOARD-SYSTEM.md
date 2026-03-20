# Dual Dashboard System

## Overview

You now have **TWO separate dashboards**:

1. **Admin Dashboard** (`/dashboard/admin`) - For YOU (website owner)
2. **Business Owner Dashboard** (`/dashboard/business`) - For your CLIENTS (gym/spa owners)

## 🎯 User Roles

### 1. Admin (You)
- **Role:** `admin`
- **Access:** Full control over everything
- **Dashboard:** `/dashboard/admin`
- **Capabilities:**
  - Manage all listings
  - Create/edit/delete any listing
  - Create monthly reports for business owners
  - Respond to business owner requests
  - Create custom progress charts
  - View analytics for all businesses

### 2. Business Owner (Your Clients)
- **Role:** `business_owner`
- **Access:** View their own data only
- **Dashboard:** `/dashboard/business`
- **Capabilities:**
  - View their listings
  - See monthly work reports (created by you)
  - Contact you with requests
  - View progress charts (created by you)
  - Monitor their performance metrics

### 3. Regular User
- **Role:** `user`
- **Access:** Browse, save, review listings
- **Dashboard:** `/dashboard/user`
- **Capabilities:**
  - Browse listings
  - Save favorites
  - Leave reviews
  - Make bookings

## 📊 Business Owner Dashboard Features

### 1. Stats Overview
- **Your Listings** - Number of listings they own
- **Monthly Reports** - Number of reports received
- **Pending Requests** - Unresolved contact requests
- **Progress Charts** - Number of performance charts

### 2. Monthly Work Reports
Shows what work you did for them each month:
- Month (e.g., "January 2026")
- Work completed description
- AI Mentions count
- Views count
- Clicks count
- Ranking improvement notes
- Additional notes

**Example Report:**
```
Month: January 2026
Work Completed: "Optimized your listing for AI search, added 5 new photos, 
                 updated business hours, responded to 3 customer reviews"
AI Mentions: 45
Views: 1,234
Clicks: 89
Ranking: "Moved from #8 to #3 in ChatGPT results for 'best gym Ulaanbaatar'"
Notes: "Great progress this month! Keep encouraging customers to leave reviews."
```

### 3. Contact/Request System
Business owners can:
- Send requests to you
- Ask questions
- Request changes
- Report issues

You can:
- View all requests
- Respond to requests
- Mark as resolved

### 4. Progress Charts
You create custom charts showing:
- Views over time
- Clicks trend
- AI mentions growth
- Ranking improvements
- Custom metrics

## 🛠️ Admin Tools (For You)

### Create Monthly Report
```typescript
// In admin panel, create report for a business owner
{
  business_owner_id: "uuid-of-gym-owner",
  listing_id: "uuid-of-their-gym",
  month: "2026-01-01", // First day of month
  work_completed: "What you did this month",
  ai_mentions: 45,
  views: 1234,
  clicks: 89,
  ranking_improvement: "Moved from #8 to #3",
  notes: "Additional notes"
}
```

### Respond to Request
```typescript
// When business owner contacts you
{
  id: "request-uuid",
  status: "resolved",
  admin_response: "Your response here",
  responded_by: "your-admin-uuid"
}
```

### Create Progress Chart
```typescript
{
  business_owner_id: "uuid-of-gym-owner",
  listing_id: "uuid-of-their-gym",
  chart_type: "views", // or clicks, ai_mentions, ranking, custom
  title: "Monthly Views Growth",
  data: [
    { date: "2026-01-01", value: 1000 },
    { date: "2026-02-01", value: 1500 },
    { date: "2026-03-01", value: 2100 }
  ],
  description: "Your views are growing steadily!"
}
```

## 🗄️ Database Schema

### New Tables

#### 1. `monthly_reports`
```sql
- id (uuid)
- business_owner_id (uuid) → links to user
- listing_id (uuid) → links to listing
- month (date) → first day of month
- work_completed (text) → what you did
- ai_mentions (integer)
- views (integer)
- clicks (integer)
- ranking_improvement (text)
- notes (text)
- created_by (uuid) → your admin id
```

#### 2. `contact_requests`
```sql
- id (uuid)
- business_owner_id (uuid) → who sent it
- listing_id (uuid) → related listing (optional)
- subject (text)
- message (text)
- status (pending | in_progress | resolved)
- admin_response (text) → your response
- responded_by (uuid) → your admin id
```

#### 3. `progress_charts`
```sql
- id (uuid)
- business_owner_id (uuid)
- listing_id (uuid)
- chart_type (views | clicks | ai_mentions | ranking | custom)
- title (text)
- data (jsonb) → array of {date, value}
- description (text)
- created_by (uuid) → your admin id
```

#### 4. `listings` (updated)
```sql
- business_owner_id (uuid) → NEW FIELD
  Links listing to business owner
```

#### 5. `profiles` (updated)
```sql
- role (user | admin | business_owner) → UPDATED
  Now supports business_owner role
```

## 🚀 Setup Instructions

### Step 1: Run Database Migration
```sql
-- In Supabase SQL Editor, run:
supabase/business-owner-system.sql
```

This creates:
- New tables (monthly_reports, contact_requests, progress_charts)
- RLS policies for data security
- Indexes for performance
- Triggers for auto-timestamps

### Step 2: Create Business Owner Accounts

**Option A: Manually in Supabase**
1. Go to Supabase → Authentication → Users
2. Create new user
3. Go to Table Editor → profiles
4. Find the user's profile
5. Set `role` = `business_owner`

**Option B: Via Admin Panel (TODO)**
Create an admin interface to:
- Invite business owners
- Assign them to listings
- Manage their accounts

### Step 3: Link Listings to Business Owners
```sql
-- Update existing listing
UPDATE listings 
SET business_owner_id = 'uuid-of-gym-owner'
WHERE id = 'uuid-of-gym-listing';
```

### Step 4: Create First Monthly Report
```sql
INSERT INTO monthly_reports (
  business_owner_id,
  listing_id,
  month,
  work_completed,
  ai_mentions,
  views,
  clicks,
  ranking_improvement,
  notes,
  created_by
) VALUES (
  'uuid-of-gym-owner',
  'uuid-of-gym-listing',
  '2026-01-01',
  'Optimized listing for AI search, added photos, updated hours',
  45,
  1234,
  89,
  'Moved from #8 to #3 in ChatGPT results',
  'Great progress this month!',
  'your-admin-uuid'
);
```

## 📱 User Experience

### For Business Owners:
1. Login to their account
2. Automatically redirected to `/dashboard/business`
3. See their stats overview
4. View monthly reports you created
5. Contact you with questions
6. View progress charts

### For You (Admin):
1. Login to your admin account
2. Go to `/dashboard/admin`
3. Manage all listings
4. Create monthly reports for clients
5. Respond to client requests
6. Create progress charts
7. View analytics

## 🔒 Security (RLS Policies)

### Business Owners Can:
- ✅ View their own reports
- ✅ View their own requests
- ✅ Create new requests
- ✅ View their own charts
- ❌ View other business owners' data
- ❌ Create reports
- ❌ Create charts

### Admins Can:
- ✅ View all reports
- ✅ Create reports for any business owner
- ✅ View all requests
- ✅ Respond to any request
- ✅ Create charts for any business owner
- ✅ Manage all listings

## 💡 Workflow Example

### Month 1: January 2026

**You (Admin) do:**
1. Optimize gym listing for AI search
2. Add 5 new photos
3. Update business hours
4. Respond to 3 customer reviews
5. Track metrics: 45 AI mentions, 1,234 views, 89 clicks

**End of month:**
1. Create monthly report in admin panel
2. Business owner logs in
3. Sees report on their dashboard
4. Understands what you did
5. Sees their progress

**Business owner:**
1. Logs in to `/dashboard/business`
2. Sees January report
3. Happy with results
4. Sends you a request: "Can we add a video tour?"
5. You respond: "Yes! I'll add it this week."

### Month 2: February 2026

**You do:**
1. Add video tour
2. Create progress chart showing views growth
3. Business owner sees chart on dashboard
4. Continues paying monthly subscription

## 🎨 Customization Ideas

### For Business Owner Dashboard:
- [ ] Add real-time notifications
- [ ] Add file upload for documents
- [ ] Add invoice/payment history
- [ ] Add booking calendar integration
- [ ] Add customer review management

### For Admin Dashboard:
- [ ] Bulk report creation
- [ ] Report templates
- [ ] Automated monthly reports
- [ ] Email notifications to business owners
- [ ] Revenue tracking per client

## 📊 Next Steps

1. **Run the migration** - `supabase/business-owner-system.sql`
2. **Create test business owner** - Set role to `business_owner`
3. **Link a listing** - Set `business_owner_id` on a listing
4. **Create test report** - Add a monthly report
5. **Test the dashboard** - Login as business owner
6. **Create admin tools** - Build UI for creating reports/charts

## 🎯 Business Model

### What You Sell:
"Monthly AI SEO service with transparent reporting"

### What Business Owners Get:
- Monthly work reports
- Performance metrics
- Direct communication with you
- Progress tracking
- Peace of mind

### What You Deliver:
- AI optimization work
- Monthly reports showing results
- Responsive support
- Custom progress charts
- Measurable ROI

**This system makes your service transparent and professional!** 🚀
