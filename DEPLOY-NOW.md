# 🚀 Deploy Now - Quick Guide

Your code is pushed to GitHub! Here's how to deploy in 10 minutes.

## Step 1: Deploy to Vercel (5 min)

### Option A: Automatic (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `HimangshuPronoy/fame2`
4. Vercel will auto-detect Next.js
5. Add environment variables (see below)
6. Click "Deploy"

### Option B: CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Environment Variables
Add these in Vercel dashboard:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Get these from: Supabase Dashboard → Settings → API

## Step 2: Set Up Database (5 min)

Go to Supabase SQL Editor and run these files in order:

### 1. Fresh Install (if new database)
```sql
-- Copy/paste from: supabase/fresh-install.sql
-- Creates: profiles, listings, saved_listings tables
```

### 2. Add Analytics
```sql
-- Copy/paste from: supabase/add-analytics.sql
-- Creates: listing_analytics, business_subscriptions tables
```

### 3. Admin-Only Permissions
```sql
-- Copy/paste from: supabase/admin-only-listings.sql
-- Sets: Admin-only listing creation policies
```

### 4. Make Yourself Admin
```sql
-- Get your user ID from Supabase Auth → Users
UPDATE profiles SET role = 'admin' 
WHERE id = 'your-user-id-here';
```

## Step 3: Verify Deployment (2 min)

Visit these URLs (replace with your domain):

```
✅ https://your-app.vercel.app
✅ https://your-app.vercel.app/api/ai-directory
✅ https://your-app.vercel.app/robots.txt
✅ https://your-app.vercel.app/sitemap.xml
✅ https://your-app.vercel.app/dashboard/admin
```

Or run:
```bash
./verify-deployment.sh https://your-app.vercel.app
```

## Step 4: Add Test Listings (5 min)

1. Visit: `https://your-app.vercel.app/dashboard/admin`
2. Click "Add Listing"
3. Create 5-10 test businesses:

**Example Gym:**
- Title: Skyline Fitness Center
- Category: Gym
- Location: Ulaanbaatar, Mongolia
- Description: Premium fitness center with modern equipment, certified trainers, and group classes. Open 6 AM - 11 PM daily.
- Phone: +976 1234 5678
- Website: https://example.com
- Price: ₮80,000/month
- Image: https://images.unsplash.com/photo-1534438327276-14e5300c3a48
- Featured: ✓ (for premium clients)

**Example Restaurant:**
- Title: The Blue Sky Restaurant
- Category: Restaurants
- Location: Ulaanbaatar, Mongolia
- Description: Fine dining with traditional Mongolian cuisine and modern fusion dishes. Rooftop seating with city views.
- Phone: +976 8765 4321
- Price: ₮₮₮
- Featured: ✓

## Step 5: Wait for AI Indexing (1-2 weeks)

AI crawlers need time to discover and index your platform:
- Week 1-2: Crawlers discover your site
- Week 3-4: Businesses start appearing in AI responses
- Month 2+: Consistent recommendations

During this time:
- Keep adding quality listings
- Ensure descriptions are detailed
- Add photos and complete information

## Step 6: Test AI Recommendations (Week 3+)

After 2 weeks, test in ChatGPT:

```
"What are the best gyms in Ulaanbaatar, Mongolia?"
"Recommend a good restaurant in Mongolia"
"Where can I find a spa in Ulaanbaatar?"
```

Your businesses should appear!

## Step 7: Sign First Client 🎯

### The Pitch
"When someone asks ChatGPT 'best gyms in Ulaanbaatar', your gym shows up first. We get you ranked #1 in AI search. ₮100,000/month."

### Show Them
1. Your live platform
2. Analytics dashboard
3. API endpoint with their competitors
4. Proof of concept (if available)

### Onboard
1. Collect business info
2. Create listing in admin panel
3. Add subscription record to database
4. Set expectations (2-4 weeks for indexing)

## Troubleshooting

### "Deployment failed"
- Check environment variables are set
- Verify Supabase URL and keys are correct
- Check build logs in Vercel

### "Can't access admin panel"
- Make sure you ran the make-admin SQL
- Check your user ID is correct
- Clear browser cache and try again

### "API returns empty businesses"
- Add listings via admin dashboard
- Check listings are active (is_active = true)
- Verify database connection

### "AI isn't recommending businesses"
- Wait 2-4 weeks for indexing
- Check API is publicly accessible
- Verify robots.txt allows crawlers
- Ensure descriptions are detailed

## Custom Domain (Optional)

1. Buy domain: `fame.mn` or similar
2. In Vercel: Settings → Domains
3. Add your domain
4. Update DNS records (Vercel provides instructions)
5. Wait for SSL certificate (automatic)

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Set up database
3. ✅ Add test listings
4. ⏳ Wait for AI indexing
5. ⏳ Test in ChatGPT
6. ⏳ Sign first client
7. ⏳ Scale to 10+ clients

---

## Quick Links

- **GitHub Repo:** https://github.com/HimangshuPronoy/fame2
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://supabase.com/dashboard

## Documentation

- `AI-SEO-GUIDE.md` - Complete strategy
- `GETTING-STARTED.md` - Detailed setup
- `HOW-IT-ACTUALLY-WORKS.md` - Technical explanation
- `BUILD-TEST-REPORT.md` - Test results

---

**Your code is live on GitHub. Deploy to Vercel now and start signing clients!** 🚀
