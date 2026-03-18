# Fame. Quick Reference

## 🗄️ Database Files

| File | Purpose | When to Use |
|------|---------|-------------|
| `schema.sql` | Original database schema | Initial setup only |
| `fresh-install.sql` | Clean database setup | Starting from scratch |
| `add-new-features.sql` | **New features migration** | **Run this now!** |
| `update-policies.sql` | Enable user listing creation | If users can't create listings |
| `clear-mock-data.sql` | Remove demo data | Before production |
| `make-admin.sql` | Promote user to admin | Create admin users |

## 🚀 Setup Order

1. **Initial Setup** (if not done):
   ```sql
   -- Run in Supabase SQL Editor
   schema.sql OR fresh-install.sql
   update-policies.sql
   make-admin.sql (with your user ID)
   ```

2. **Add New Features** (do this now):
   ```sql
   -- Run in Supabase SQL Editor
   add-new-features.sql
   ```

3. **Clean Up** (optional):
   ```sql
   clear-mock-data.sql
   ```

## 📍 New Routes

### User Routes
- `/dashboard/profile` - Edit profile & preferences
- `/dashboard/saved` - View saved listings
- `/dashboard/bookings` - Manage bookings
- `/concierge` - Submit concierge requests
- `/partners` - Apply for partnership

### Admin Routes
- `/dashboard/admin` - Manage listings (existing)
- `/dashboard/admin/requests` - Manage requests & applications (new)

## 🎨 New Components

```tsx
// Add reviews to any listing page
import Reviews from "@/components/Reviews";
<Reviews listingId={listing.id} />

// BookingWidget (already in listing pages)
import BookingWidget from "@/components/BookingWidget";
<BookingWidget listingId={listing.id} price={listing.price} />
```

## 📊 Database Tables

### Original Tables
- `profiles` - User accounts
- `listings` - Business listings
- `saved_listings` - User favorites

### New Tables (from add-new-features.sql)
- `reviews` - User reviews & ratings
- `bookings` - Reservation management
- `partner_applications` - Partnership requests
- `concierge_requests` - Concierge services
- `user_preferences` - User settings
- `notifications` - User notifications
- `listing_images` - Multiple images per listing

## 🔑 TypeScript Types

All types are in `src/lib/supabase.ts`:

```typescript
// Original
Profile, Listing

// New
Review, Booking, PartnerApplication, 
ConciergeRequest, UserPreferences, 
Notification, ListingImage
```

## 🛠️ Common Tasks

### Make a User Admin
```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = 'user-uuid-here';
```

### Check Migration Status
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

### View All Bookings
```sql
SELECT * FROM public.bookings 
ORDER BY created_at DESC;
```

### View All Reviews
```sql
SELECT r.*, p.full_name, l.title as listing_title
FROM public.reviews r
JOIN public.profiles p ON r.user_id = p.id
JOIN public.listings l ON r.listing_id = l.id
ORDER BY r.created_at DESC;
```

## 🎯 Feature Status

| Feature | Status | Location |
|---------|--------|----------|
| User Authentication | ✅ Working | `/login` |
| Browse Listings | ✅ Working | `/listings` |
| Create Listings | ✅ Working | `/dashboard/admin` |
| Save Listings | ✅ Working | Everywhere |
| View Saved | ✅ **NEW** | `/dashboard/saved` |
| Make Bookings | ✅ **NEW** | Listing pages |
| View Bookings | ✅ **NEW** | `/dashboard/bookings` |
| Write Reviews | ✅ **NEW** | Listing pages |
| User Profile | ✅ **NEW** | `/dashboard/profile` |
| Concierge Form | ✅ **NEW** | `/concierge` |
| Partner Form | ✅ **NEW** | `/partners` |
| Admin Requests | ✅ **NEW** | `/dashboard/admin/requests` |

## 🔒 Security Notes

- All tables use Row Level Security (RLS)
- Users can only access their own data
- Admins have elevated permissions
- Public can view listings and reviews
- Authentication required for bookings/requests

## 📱 Responsive Design

All new pages are mobile-friendly:
- Responsive grid layouts
- Touch-friendly buttons
- Mobile navigation
- Optimized forms

## 🎨 Design System

Colors:
- Gold accent: `#d4af37`
- Success: `#34c759`
- Error: `#ff3b30`
- Warning: `#ff9f0a`
- Info: `#64d2ff`

Styling:
- CSS Modules for all components
- Consistent spacing and typography
- Smooth transitions and hover states

## 📚 Documentation

- `README.md` - Project overview
- `FEATURES-ADDED.md` - Complete feature list
- `NEW-FEATURES-SETUP.md` - Detailed setup guide
- `QUICK-REFERENCE.md` - This file

## 🐛 Debug Commands

```bash
# Check for TypeScript errors
npm run build

# Run linter
npm run lint

# Start dev server
npm run dev
```

## 💡 Pro Tips

1. **Always backup** before running migrations
2. **Test in development** before production
3. **Run migrations once** - they're idempotent
4. **Check RLS policies** match your security needs
5. **Customize status workflows** for your business

## 🆘 Quick Fixes

**Can't create listings?**
```sql
-- Run update-policies.sql
```

**Not an admin?**
```sql
-- Run make-admin.sql with your user ID
```

**New features not working?**
```sql
-- Run add-new-features.sql
```

**Need to start fresh?**
```sql
-- Run fresh-install.sql (WARNING: Deletes all data)
```

---

**Quick Start:** Run `supabase/add-new-features.sql` and you're ready! 🚀
