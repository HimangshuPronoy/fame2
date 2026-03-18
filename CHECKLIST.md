# 🎯 Fame. Setup Checklist

Print this out or keep it open while setting up!

## Phase 1: Initial Setup
- [ ] Clone/download the repository
- [ ] Run `npm install`
- [ ] Create `.env.local` from `.env.local.example`
- [ ] Add your Supabase credentials to `.env.local`

## Phase 2: Database Setup (Supabase SQL Editor)
- [ ] Run `supabase/schema.sql` (if fresh install)
- [ ] Run `supabase/update-policies.sql` ✅ REQUIRED
- [ ] Run `supabase/clear-mock-data.sql` ✅ REQUIRED
- [ ] Run `supabase/make-admin.sql` ✅ REQUIRED

## Phase 3: Verification
- [ ] Start app with `npm run dev`
- [ ] Visit `http://localhost:3000`
- [ ] Create a test account
- [ ] Verify you can access dashboard
- [ ] Verify you can create a listing
- [ ] Verify listing appears on homepage
- [ ] Verify search works (try "gym")
- [ ] Verify filters work (click Filters button)

## Phase 4: Admin Testing
- [ ] Log in with admin account
- [ ] Access `/dashboard/admin`
- [ ] Verify you can see all listings
- [ ] Test editing a listing
- [ ] Test deleting a listing
- [ ] Test "Clear All" button (optional)

## Phase 5: Final Checks
- [ ] No mock data visible on site
- [ ] All pages load without errors
- [ ] Mobile responsive (test on phone)
- [ ] Images loading correctly
- [ ] Search returns correct results
- [ ] Categories filter properly

## 🎉 Success Criteria

Your app is ready when:
✅ Users can sign up and create listings
✅ Admins can manage all listings
✅ No mock/demo data visible
✅ Search and filters work correctly
✅ All animations smooth and responsive

---

**Estimated Time:** 5-10 minutes

**Stuck?** See `SETUP.md` for detailed instructions
