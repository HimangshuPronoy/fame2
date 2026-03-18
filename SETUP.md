# Fame. Setup Guide

Complete this checklist to make your app fully functional with no mock data.

## ✅ Prerequisites

- [ ] Supabase project created
- [ ] Environment variables set in `.env.local`
- [ ] Dependencies installed (`npm install`)

## 🚀 Setup Steps

### Step 1: Update Database Policies (REQUIRED)

This allows regular users to create listings.

1. Go to your Supabase Dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy and paste the contents of `supabase/update-policies.sql`
5. Click "Run" or press `Cmd/Ctrl + Enter`
6. You should see a success message

**What this does:**
- Removes the old admin-only policy
- Allows any authenticated user to create listings
- Keeps admin-only permissions for editing/deleting

---

### Step 2: Remove Mock Data (REQUIRED)

This clears all the seed/demo listings from your database.

**Option A: Use Admin Dashboard (Recommended)**
1. Start your app: `npm run dev`
2. Log in to your account
3. Go to `/dashboard/admin`
4. Click the red "Clear All" button
5. Confirm the deletion

**Option B: Use SQL Editor**
1. Go to Supabase SQL Editor
2. Copy and paste the contents of `supabase/clear-mock-data.sql`
3. Click "Run"
4. Verify it shows "0 remaining_listings"

---

### Step 3: Make Your First Admin (REQUIRED)

You need at least one admin user to manage the platform.

1. Create an account on your app at `/login`
2. Go to Supabase SQL Editor
3. Copy and paste the contents of `supabase/make-admin.sql`
4. Follow the instructions in the file:
   - First query shows all users
   - Copy your user ID
   - Replace `YOUR-USER-ID-HERE` in the second query
   - Run the second query
5. Verify you're now an admin with the third query

---

### Step 4: Test Everything

**Test as Regular User:**
1. Create a new account (or use a non-admin account)
2. Go to `/dashboard/user`
3. Click "Create Listing"
4. Fill out the form and submit
5. Verify the listing appears on `/listings`
6. Search for your listing
7. Try saving it to favorites

**Test as Admin:**
1. Log in with your admin account
2. Go to `/dashboard/admin`
3. Verify you can see all listings
4. Try editing a listing
5. Try deleting a listing
6. Try creating a new listing

**Test Search & Filters:**
1. Go to `/listings`
2. Search for "gym" - should show only Gym/Fitness listings
3. Click the "Filters" button - panel should expand
4. Try different category filters
5. Try different sort options

---

## 🎨 Optional Customizations

### Add More Categories

Edit `src/app/dashboard/admin/page.tsx` and `src/app/listings/page.tsx`:

```typescript
const CATEGORIES = ["Fitness", "Gym", "Restaurants", "Nightlife", "Spa", "Beauty", "Wellness", "Hotels", "YourNewCategory"];
```

### Change Default Ratings

Edit `src/app/dashboard/create-listing/page.tsx`:

```typescript
rating: 5.0,  // Change from 0 to 5.0
reviews: 1,   // Change from 0 to 1
```

### Customize Colors

Edit `src/app/globals.css`:

```css
:root {
  --accent: #3b82f6;  /* Change to your brand color */
}
```

---

## 🐛 Troubleshooting

### "Permission denied" when creating listing
- Make sure you ran `supabase/update-policies.sql`
- Verify you're logged in
- Check browser console for errors

### Mock data still showing
- Run `supabase/clear-mock-data.sql`
- Or use the "Clear All" button in admin dashboard
- Refresh your browser

### Can't access admin dashboard
- Run `supabase/make-admin.sql` with your user ID
- Log out and log back in
- Check that `role = 'admin'` in profiles table

### Images not loading
- Make sure image URLs are valid
- Use Unsplash URLs for testing: `https://images.unsplash.com/photo-...`
- Check Next.js image configuration in `next.config.mjs`

---

## 📝 Environment Variables

Your `.env.local` should look like this:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Get these from:
1. Supabase Dashboard
2. Settings → API
3. Copy the values

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] All SQL scripts run successfully
- [ ] Mock data removed
- [ ] At least one admin user created
- [ ] Environment variables set in hosting platform
- [ ] Test user registration flow
- [ ] Test listing creation flow
- [ ] Test admin dashboard
- [ ] Test search and filters
- [ ] Images loading correctly
- [ ] Mobile responsive design tested

---

## 📚 Next Steps

After setup is complete:

1. **Add Real Listings**: Start adding real venues to your platform
2. **Customize Branding**: Update colors, fonts, and copy
3. **Set Up Email**: Configure Supabase email templates
4. **Add Analytics**: Integrate Google Analytics or similar
5. **SEO Optimization**: Add meta tags and sitemap
6. **Performance**: Optimize images and enable caching

---

## 🆘 Need Help?

If you encounter issues:

1. Check the browser console for errors
2. Check Supabase logs in Dashboard → Logs
3. Verify all SQL scripts ran successfully
4. Make sure environment variables are correct
5. Try clearing browser cache and cookies

---

## ✨ You're Done!

Once all steps are complete, your Fame. platform is fully functional and ready for real users!

Start the app:
```bash
npm run dev
```

Visit: `http://localhost:3000`

Enjoy! 🎉
