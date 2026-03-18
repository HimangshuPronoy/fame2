# 🎯 Complete Setup Guide - Fame.

Follow these steps **in order** to get your app fully functional with no mock data.

---

## 📋 What You'll Accomplish

By the end of this guide:
- ✅ App running locally
- ✅ Database configured correctly
- ✅ All mock data removed
- ✅ Users can create listings
- ✅ You have admin access
- ✅ Everything tested and working

**Time Required:** 10 minutes

---

## Step 1: Install & Configure (2 min)

### 1.1 Install Dependencies
```bash
npm install
```

### 1.2 Set Up Environment Variables
```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local and add your Supabase credentials
```

Get your credentials from:
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click "Settings" → "API"
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

---

## Step 2: Update Database (3 min)

Go to your **Supabase SQL Editor** and run these files **in order**:

### 2.1 Update Policies (REQUIRED)
📄 File: `supabase/update-policies.sql`

**What it does:** Allows regular users to create listings

1. Open Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Copy/paste contents of `supabase/update-policies.sql`
4. Click "Run" (or Cmd/Ctrl + Enter)
5. ✅ Should see "Success" message

### 2.2 Clear Mock Data (REQUIRED)
📄 File: `supabase/clear-mock-data.sql`

**What it does:** Removes all demo/seed listings

1. New Query in SQL Editor
2. Copy/paste contents of `supabase/clear-mock-data.sql`
3. Click "Run"
4. ✅ Should see "0 remaining_listings"

### 2.3 Make Admin User (REQUIRED)
📄 File: `supabase/make-admin.sql`

**What it does:** Gives you admin permissions

1. First, create an account on your app (next step)
2. Then come back here

---

## Step 3: Start App & Create Account (2 min)

### 3.1 Start Development Server
```bash
npm run dev
```

### 3.2 Create Your Account
1. Visit `http://localhost:3000`
2. Click "Join" or "Log In"
3. Create a new account
4. Remember your email!

---

## Step 4: Make Yourself Admin (2 min)

Now go back to **Supabase SQL Editor**:

### 4.1 Find Your User ID
```sql
-- Run this query
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC;
```

Copy your user ID (the long UUID string)

### 4.2 Promote to Admin
```sql
-- Replace YOUR-USER-ID-HERE with your actual ID
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = 'YOUR-USER-ID-HERE';
```

### 4.3 Verify
```sql
-- Check you're now admin
SELECT p.id, u.email, p.role, p.full_name
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.role = 'admin';
```

✅ You should see your email with role = 'admin'

---

## Step 5: Test Everything (3 min)

### 5.1 Test User Flow
1. Log out and log back in (to refresh permissions)
2. Go to Dashboard (`/dashboard/user`)
3. Click "Create Listing" button
4. Fill out the form:
   - Title: "Test Gym"
   - Category: "Fitness"
   - Location: "New York, NY"
   - Price: "$50/mo"
   - (other fields optional)
5. Click "Create Listing"
6. ✅ Should see success message

### 5.2 Verify Listing Appears
1. Go to homepage (`/`)
2. ✅ Should see your "Test Gym" listing
3. Go to `/listings`
4. ✅ Should see your listing there too

### 5.3 Test Search
1. On `/listings` page
2. Type "gym" in search bar
3. ✅ Should show only your gym listing

### 5.4 Test Filters
1. Click "Filters" button
2. ✅ Panel should expand
3. Click different categories
4. ✅ Listings should filter

### 5.5 Test Admin Dashboard
1. Go to `/dashboard/admin`
2. ✅ Should see your listing in the table
3. Try clicking "Edit" on your listing
4. ✅ Form should appear
5. Try the red "Clear All" button (optional)

---

## ✅ Success Checklist

Your app is fully functional when:

- [x] App runs without errors
- [x] No mock data visible
- [x] You can create an account
- [x] You can create listings as regular user
- [x] Your listings appear on homepage
- [x] Search works correctly
- [x] Filters work correctly
- [x] You can access admin dashboard
- [x] You can edit/delete listings as admin

---

## 🎉 You're Done!

Your Fame. platform is now:
- ✅ Fully functional
- ✅ Free of mock data
- ✅ Ready for real users
- ✅ Optimized and smooth

### What's Next?

1. **Add Real Listings:** Start adding real venues
2. **Customize:** Update colors, fonts, copy
3. **Invite Users:** Share with friends to test
4. **Deploy:** Push to Vercel or your hosting platform

---

## 🆘 Troubleshooting

### "Permission denied" when creating listing
→ Make sure you ran `supabase/update-policies.sql`

### Mock data still showing
→ Run `supabase/clear-mock-data.sql` again

### Can't access admin dashboard
→ Make sure you ran the admin promotion query with YOUR user ID

### Images not loading
→ Use Unsplash URLs: `https://images.unsplash.com/photo-...`

### Still stuck?
→ Check `SETUP.md` for detailed troubleshooting

---

## 📚 Additional Resources

- `QUICK-START.md` - 5-minute quick start
- `SETUP.md` - Detailed setup guide
- `CHECKLIST.md` - Printable checklist
- `.kiro/steering/` - Project documentation

---

**Need help?** Check the browser console and Supabase logs for error messages.

**Ready to deploy?** See the deployment section in `SETUP.md`

Enjoy your new platform! 🚀
