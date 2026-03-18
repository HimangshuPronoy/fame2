# Testing Checklist for New Features

Use this checklist to verify all new features are working correctly.

## 🗄️ Database Setup

- [ ] Ran `supabase/add-new-features.sql` successfully
- [ ] Verified all 7 new tables exist
- [ ] No SQL errors in Supabase logs
- [ ] RLS policies are enabled on all tables

### Verification Query
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'reviews', 'bookings', 'listing_images', 
  'notifications', 'partner_applications', 
  'user_preferences', 'concierge_requests'
);
```
Expected: 7 rows returned

## 👤 User Features

### Profile Management (`/dashboard/profile`)
- [ ] Page loads without errors
- [ ] Can see current user information
- [ ] Can edit full name
- [ ] Can select favorite categories
- [ ] Can toggle email notifications
- [ ] Can toggle push notifications
- [ ] Save button works
- [ ] Success message appears after saving
- [ ] Changes persist after page refresh

### Saved Listings (`/dashboard/saved`)
- [ ] Page loads without errors
- [ ] Shows empty state when no saved listings
- [ ] Can navigate to saved page from dashboard
- [ ] Saved listings display correctly
- [ ] Can click on listing to view details
- [ ] Can remove listing from saved
- [ ] Listing disappears after removal
- [ ] Count updates correctly

### Bookings (`/dashboard/bookings`)
- [ ] Page loads without errors
- [ ] Shows empty state when no bookings
- [ ] Can navigate to bookings from dashboard
- [ ] Bookings display with correct information
- [ ] Status badges show correct colors
- [ ] Date and time display correctly
- [ ] Guest count shows correctly
- [ ] Special requests display if present

### Booking Widget (on listing pages)
- [ ] Widget displays on listing detail page
- [ ] "Request Booking" button visible
- [ ] Clicking button shows booking form
- [ ] Date picker works (min date is today)
- [ ] Time picker works (optional)
- [ ] Guest count selector works
- [ ] Special requests textarea works
- [ ] Can submit booking
- [ ] Success message appears
- [ ] Booking appears in `/dashboard/bookings`
- [ ] Form resets after successful submission

### Reviews System (on listing pages)
- [ ] Reviews section displays on listing page
- [ ] Shows average rating correctly
- [ ] Shows review count
- [ ] "Write a Review" button visible (when logged in)
- [ ] Clicking button shows review form
- [ ] Star rating selector works (1-5 stars)
- [ ] Can enter review title
- [ ] Can enter review comment
- [ ] Can submit review
- [ ] Review appears immediately after submission
- [ ] Can only submit one review per listing
- [ ] Other users' reviews display correctly
- [ ] Review dates display correctly

### Concierge Form (`/concierge`)
- [ ] Page loads without errors
- [ ] Form displays correctly
- [ ] Can enter full name
- [ ] Can select request type
- [ ] Can enter details
- [ ] Form validation works
- [ ] Can submit request
- [ ] Success message appears
- [ ] Form clears after submission
- [ ] Redirects to login if not authenticated

### Partner Application (`/partners`)
- [ ] Page loads without errors
- [ ] "Apply for Partnership" button visible
- [ ] Clicking button shows application form
- [ ] Can enter business name
- [ ] Can enter contact name
- [ ] Can enter email
- [ ] Can enter phone (optional)
- [ ] Can enter website (optional)
- [ ] Can select category
- [ ] Can enter description
- [ ] Form validation works
- [ ] Can submit application
- [ ] Success message appears
- [ ] Form closes after submission
- [ ] Redirects to login if not authenticated

## 👨‍💼 Admin Features

### Admin Requests Dashboard (`/dashboard/admin/requests`)
- [ ] Page loads without errors (admin only)
- [ ] Non-admins are redirected
- [ ] Two tabs visible (Concierge & Partners)
- [ ] Tab switching works

#### Concierge Requests Tab
- [ ] All concierge requests display
- [ ] Request details show correctly
- [ ] Status badges display correctly
- [ ] Can see request date/time
- [ ] "Start" button works (pending → in_progress)
- [ ] "Complete" button works (→ completed)
- [ ] Status updates immediately
- [ ] Request count in tab updates

#### Partner Applications Tab
- [ ] All partner applications display
- [ ] Business details show correctly
- [ ] Contact information displays
- [ ] Website link works (if present)
- [ ] Status badges display correctly
- [ ] "Approve" button works
- [ ] "Reject" button works
- [ ] Status updates immediately
- [ ] Application count in tab updates

## 🎨 UI/UX Testing

### Navigation
- [ ] Dashboard sidebar shows all new links
- [ ] Profile link works
- [ ] Saved link works
- [ ] Bookings link works
- [ ] Admin Panel link visible (admin only)
- [ ] Active page is highlighted
- [ ] Mobile navigation works

### Responsive Design
- [ ] All pages work on mobile (< 768px)
- [ ] All pages work on tablet (768px - 1024px)
- [ ] All pages work on desktop (> 1024px)
- [ ] Forms are usable on mobile
- [ ] Tables/cards stack properly on mobile
- [ ] Navigation adapts to screen size

### Loading States
- [ ] Loading indicators show while fetching data
- [ ] Skeleton screens or spinners display
- [ ] No flash of empty content

### Empty States
- [ ] Saved listings empty state displays
- [ ] Bookings empty state displays
- [ ] Reviews empty state displays
- [ ] Helpful messages and CTAs present

### Error Handling
- [ ] Form validation errors display
- [ ] Network errors show user-friendly messages
- [ ] Failed submissions show error messages
- [ ] Can retry after errors

## 🔒 Security Testing

### Authentication
- [ ] Unauthenticated users redirected to login
- [ ] Can't access dashboard without login
- [ ] Can't submit forms without login
- [ ] Session persists across page refreshes

### Authorization
- [ ] Users can only see their own data
- [ ] Users can't access admin routes
- [ ] Admins can access admin routes
- [ ] RLS policies prevent unauthorized access

### Data Validation
- [ ] Required fields are enforced
- [ ] Email validation works
- [ ] Date validation works (no past dates for bookings)
- [ ] Rating validation works (1-5 only)
- [ ] SQL injection is prevented (Supabase handles this)

## 🔍 Database Testing

### Data Integrity
- [ ] Foreign keys work correctly
- [ ] Cascade deletes work (delete user → deletes their data)
- [ ] Unique constraints work (one review per user per listing)
- [ ] Check constraints work (rating 1-5, valid statuses)

### Timestamps
- [ ] created_at sets automatically
- [ ] updated_at updates on changes
- [ ] Dates display in correct timezone

### Queries
```sql
-- Test review creation
SELECT * FROM public.reviews ORDER BY created_at DESC LIMIT 5;

-- Test booking creation
SELECT * FROM public.bookings ORDER BY created_at DESC LIMIT 5;

-- Test concierge requests
SELECT * FROM public.concierge_requests ORDER BY created_at DESC LIMIT 5;

-- Test partner applications
SELECT * FROM public.partner_applications ORDER BY created_at DESC LIMIT 5;

-- Test user preferences
SELECT * FROM public.user_preferences LIMIT 5;
```

## 🚀 Performance Testing

- [ ] Pages load in < 2 seconds
- [ ] Forms submit quickly
- [ ] No console errors
- [ ] No console warnings (or acceptable ones)
- [ ] Images load properly
- [ ] Animations are smooth

## 📱 Browser Testing

- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Works on iOS Safari
- [ ] Works on Android Chrome

## 🎯 Integration Testing

### Complete User Flow
1. [ ] Sign up / Log in
2. [ ] Browse listings
3. [ ] Save a listing
4. [ ] View saved listings
5. [ ] Make a booking
6. [ ] View bookings
7. [ ] Write a review
8. [ ] Update profile
9. [ ] Submit concierge request
10. [ ] Submit partner application

### Complete Admin Flow
1. [ ] Log in as admin
2. [ ] View concierge requests
3. [ ] Update request status
4. [ ] View partner applications
5. [ ] Approve/reject application
6. [ ] Manage listings (existing feature)

## 📊 Final Checks

- [ ] No TypeScript errors (`npm run build`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] All new files committed to git
- [ ] Documentation is up to date
- [ ] Environment variables are set
- [ ] Database backup created

## 🐛 Known Issues

Document any issues found:

| Issue | Severity | Status | Notes |
|-------|----------|--------|-------|
| | | | |

## ✅ Sign Off

- [ ] All critical features tested
- [ ] All blockers resolved
- [ ] Ready for production

**Tested by:** _______________  
**Date:** _______________  
**Version:** _______________

---

## 🆘 If Tests Fail

1. Check browser console for errors
2. Check Supabase logs for database errors
3. Verify migration ran successfully
4. Check user has correct permissions
5. Clear browser cache and try again
6. Check environment variables are set
7. Restart development server

## 📝 Notes

Add any additional notes or observations:

---

**Happy Testing!** 🎉
