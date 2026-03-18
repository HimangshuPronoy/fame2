# Fame. Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Homepage   │  │   Listings   │  │   Listing    │      │
│  │              │  │    Browse    │  │    Detail    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Concierge   │  │   Partners   │  │   Journal    │      │
│  │              │  │              │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              User Dashboard                          │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐│    │
│  │  │ Overview │ │ Profile  │ │  Saved   │ │Bookings││    │
│  │  └──────────┘ └──────────┘ └──────────┘ └────────┘│    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Admin Dashboard                         │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │  ┌──────────────┐ ┌──────────────┐                 │    │
│  │  │   Listings   │ │   Requests   │                 │    │
│  │  │  Management  │ │  Management  │                 │    │
│  │  └──────────────┘ └──────────────┘                 │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Supabase Client
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Supabase)                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Authentication (auth.users)              │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                  │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Database (PostgreSQL)                   │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │                                                       │    │
│  │  Core Tables:                                        │    │
│  │  ├─ profiles                                         │    │
│  │  ├─ listings                                         │    │
│  │  └─ saved_listings                                   │    │
│  │                                                       │    │
│  │  Feature Tables (v2.0):                              │    │
│  │  ├─ reviews                                          │    │
│  │  ├─ bookings                                         │    │
│  │  ├─ partner_applications                             │    │
│  │  ├─ concierge_requests                               │    │
│  │  ├─ user_preferences                                 │    │
│  │  ├─ notifications                                    │    │
│  │  └─ listing_images                                   │    │
│  │                                                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Row Level Security (RLS) Policies             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### User Actions

```
User Action → Frontend Component → Supabase Client → Database
                                         ↓
                                    RLS Check
                                         ↓
                                  Allow/Deny
                                         ↓
                                    Response
                                         ↓
                                   UI Update
```

### Example: Creating a Booking

```
1. User fills booking form
   └─ BookingWidget.tsx

2. Form submission
   └─ handleBooking()

3. Supabase insert
   └─ supabase.from('bookings').insert()

4. RLS policy check
   └─ "Authenticated users can create bookings"

5. Database insert
   └─ bookings table

6. Success response
   └─ UI shows confirmation

7. Navigate to bookings
   └─ /dashboard/bookings
```

## Component Hierarchy

```
App Layout (layout.tsx)
├─ AuthProvider
│  └─ Authentication Context
│
├─ Header
│  ├─ Navigation
│  └─ User Menu
│
├─ Page Content
│  │
│  ├─ Public Pages
│  │  ├─ Homepage
│  │  ├─ Listings
│  │  ├─ Listing Detail
│  │  │  ├─ BookingWidget
│  │  │  ├─ Reviews
│  │  │  └─ SaveButton
│  │  ├─ Concierge
│  │  ├─ Partners
│  │  └─ Journal
│  │
│  └─ Protected Pages (require auth)
│     │
│     ├─ Dashboard Layout
│     │  ├─ Sidebar Navigation
│     │  └─ Dashboard Content
│     │     │
│     │     ├─ User Pages
│     │     │  ├─ Overview
│     │     │  ├─ Profile
│     │     │  ├─ Saved Listings
│     │     │  └─ Bookings
│     │     │
│     │     └─ Admin Pages (admin only)
│     │        ├─ Listings Management
│     │        └─ Requests Management
│     │
│     └─ Login
│
└─ Footer
```

## Database Relationships

```
auth.users (Supabase Auth)
    │
    ├─── profiles (1:1)
    │       │
    │       └─── user_preferences (1:1)
    │
    ├─── listings (1:many)
    │       │
    │       ├─── reviews (many:1)
    │       ├─── bookings (many:1)
    │       ├─── listing_images (many:1)
    │       └─── saved_listings (many:1)
    │
    ├─── saved_listings (many:1)
    ├─── reviews (many:1)
    ├─── bookings (many:1)
    ├─── notifications (many:1)
    ├─── partner_applications (many:1)
    └─── concierge_requests (many:1)
```

## Authentication Flow

```
┌─────────────┐
│   Sign Up   │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  Supabase Auth      │
│  Creates User       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Trigger Fires      │
│  handle_new_user()  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Profile Created    │
│  (role: 'user')     │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  User Logged In     │
│  Session Created    │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  AuthProvider       │
│  Sets Context       │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  App Accessible     │
└─────────────────────┘
```

## Request Flow Examples

### 1. Viewing Saved Listings

```
User → /dashboard/saved
  ↓
Page loads (page.tsx)
  ↓
useEffect fetches data
  ↓
supabase.from('saved_listings')
  .select('listing_id')
  .eq('user_id', user.id)
  ↓
RLS: "Users can view own saved listings"
  ↓
Returns listing IDs
  ↓
Fetch full listing details
  ↓
supabase.from('listings')
  .select('*')
  .in('id', listingIds)
  ↓
RLS: "Active listings are viewable by everyone"
  ↓
Returns listings
  ↓
Display in grid
```

### 2. Writing a Review

```
User → Listing Detail Page
  ↓
Clicks "Write a Review"
  ↓
Review form appears
  ↓
User fills form (rating, title, comment)
  ↓
Submits form
  ↓
supabase.from('reviews').insert({
  listing_id,
  user_id,
  rating,
  title,
  comment
})
  ↓
RLS: "Authenticated users can create reviews"
  ↓
Check: One review per user per listing (unique constraint)
  ↓
Insert successful
  ↓
Trigger: handle_updated_at()
  ↓
Review appears in list
  ↓
Average rating recalculated
```

### 3. Admin Managing Requests

```
Admin → /dashboard/admin/requests
  ↓
Page loads (admin only)
  ↓
Fetch concierge requests
  ↓
supabase.from('concierge_requests')
  .select('*')
  .order('created_at', desc)
  ↓
RLS: "Admins can view all requests"
  ↓
Check: user.role === 'admin'
  ↓
Returns all requests
  ↓
Display in tabs
  ↓
Admin clicks "Complete"
  ↓
supabase.from('concierge_requests')
  .update({ status: 'completed' })
  .eq('id', requestId)
  ↓
RLS: "Admins can update requests"
  ↓
Update successful
  ↓
UI updates status badge
```

## Security Layers

```
┌─────────────────────────────────────┐
│     1. Frontend Auth Check          │
│     (useAuth hook)                  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     2. Supabase Client Auth         │
│     (JWT token validation)          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     3. Row Level Security           │
│     (Database policies)             │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     4. Database Constraints         │
│     (Foreign keys, checks)          │
└─────────────────────────────────────┘
```

## State Management

```
┌─────────────────────────────────────┐
│         Global State                │
│         (AuthContext)               │
│  ┌───────────────────────────────┐  │
│  │ - user                        │  │
│  │ - profile                     │  │
│  │ - session                     │  │
│  │ - isAdmin                     │  │
│  │ - loading                     │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
               │
               ├─── Used by all components
               │
               └─── Persists across navigation
```

```
┌─────────────────────────────────────┐
│         Component State             │
│         (useState)                  │
│  ┌───────────────────────────────┐  │
│  │ - Form data                   │  │
│  │ - Loading states              │  │
│  │ - Error messages              │  │
│  │ - UI toggles                  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
               │
               └─── Local to each component
```

## File Organization

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout + AuthProvider
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   │
│   ├── login/             # Auth pages
│   ├── listings/          # Browse pages
│   ├── listing/[id]/      # Detail pages
│   ├── concierge/         # Service pages
│   ├── partners/          # Partner pages
│   ├── journal/           # Content pages
│   │
│   └── dashboard/         # Protected area
│       ├── layout.tsx     # Dashboard layout
│       ├── page.tsx       # Redirect to /user
│       │
│       ├── user/          # User dashboard
│       ├── profile/       # Profile management
│       ├── saved/         # Saved listings
│       ├── bookings/      # Booking management
│       ├── my-listings/   # User's listings
│       ├── create-listing/# Create new listing
│       ├── edit-listing/  # Edit listing
│       │
│       └── admin/         # Admin area
│           ├── page.tsx   # Listings management
│           └── requests/  # Requests management
│
├── components/            # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ListingGrid.tsx
│   ├── SearchBar.tsx
│   ├── BookingWidget.tsx
│   ├── SaveButton.tsx
│   ├── Reviews.tsx        # New
│   └── *.module.css
│
└── lib/                   # Utilities
    ├── supabase.ts        # DB client + types
    ├── auth-context.tsx   # Auth provider
    └── validation.ts      # Form validation
```

## Technology Stack

```
┌─────────────────────────────────────┐
│           Frontend                  │
├─────────────────────────────────────┤
│ Next.js 15.1.11 (App Router)       │
│ React 19                            │
│ TypeScript                          │
│ CSS Modules                         │
│ Framer Motion                       │
│ Lucide React (icons)               │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│           Backend                   │
├─────────────────────────────────────┤
│ Supabase                            │
│ PostgreSQL                          │
│ Row Level Security                  │
│ Triggers & Functions                │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│           Deployment                │
├─────────────────────────────────────┤
│ Vercel (recommended)                │
│ Node.js runtime                     │
│ Edge functions                      │
└─────────────────────────────────────┘
```

---

This architecture provides:
- ✅ Scalability
- ✅ Security
- ✅ Maintainability
- ✅ Type safety
- ✅ Performance
- ✅ User experience
