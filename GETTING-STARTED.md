# Getting Started: Launch Your AI SEO Agency

This guide will get your AI SEO agency platform up and running in Mongolia.

## What You're Building

An AI SEO agency that gets local businesses ranked #1 when people ask ChatGPT/Claude/Gemini for recommendations. Businesses pay you monthly to be listed on your platform, which AI assistants crawl and use for recommendations.

## Quick Start (30 Minutes)

### Step 1: Deploy the Platform (10 min)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "AI SEO platform ready"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repo
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`
   - Deploy!

3. **Set up custom domain** (optional)
   - Buy domain: `fame.mn` or similar
   - Point DNS to Vercel
   - Add domain in Vercel settings

### Step 2: Set Up Database (10 min)

1. **Go to Supabase SQL Editor**
   - Open your Supabase project
   - Click "SQL Editor"

2. **Run migrations in order:**
   ```sql
   -- 1. Fresh install (if new database)
   -- Run: supabase/fresh-install.sql
   
   -- 2. Add analytics tables
   -- Run: supabase/add-analytics.sql
   
   -- 3. Set admin-only permissions
   -- Run: supabase/admin-only-listings.sql
   ```

3. **Make yourself admin**
   ```sql
   -- Run: supabase/make-admin.sql
   -- Replace 'your-user-id' with your actual user ID
   UPDATE public.profiles 
   SET role = 'admin' 
   WHERE id = 'your-user-id';
   ```

### Step 3: Add Test Listings (10 min)

1. **Log in to your platform**
   - Go to your deployed URL
   - Sign up / log in
   - Navigate to `/dashboard/admin`

2. **Add 5-10 test businesses**
   - Click "Add Listing"
   - Fill in details:
     - Title: "Skyline Fitness Center"
     - Category: "Gym"
     - Location: "Ulaanbaatar, Mongolia"
     - Description: "Premium fitness center with modern equipment, personal trainers, and group classes. Open 6 AM - 11 PM daily."
     - Phone: "+976 1234 5678"
     - Website: "https://example.com"
     - Price: "₮80,000/month"
     - Image: Use Unsplash URL
   - Mark as "Featured" for premium clients
   - Save

3. **Verify listings appear**
   - Visit `/listings` - should see your businesses
   - Visit `/api/ai-directory` - should see JSON data
   - Visit `/sitemap.xml` - should list all pages

## Verify AI Optimization

### Test Your API Endpoints

1. **AI Directory API**
   ```
   https://your-domain.com/api/ai-directory
   ```
   Should return JSON with all your businesses.

2. **Filter by category**
   ```
   https://your-domain.com/api/ai-directory?category=Gym
   ```
   Should return only gyms.

3. **Filter by location**
   ```
   https://your-domain.com/api/ai-directory?location=Ulaanbaatar
   ```
   Should return businesses in Ulaanbaatar.

4. **Robots.txt**
   ```
   https://your-domain.com/robots.txt
   ```
   Should show AI crawler permissions.

5. **Sitemap**
   ```
   https://your-domain.com/sitemap.xml
   ```
   Should list all your listing pages.

### Wait for AI Indexing (1-2 Weeks)

AI crawlers need time to discover and index your content:
- **GPTBot** (ChatGPT): Crawls weekly
- **Claude-Web**: Crawls on-demand
- **Google-Extended** (Gemini): Crawls daily

During this time:
- Keep adding quality listings
- Ensure descriptions are detailed and natural
- Add photos and complete information

### Test AI Recommendations

After 1-2 weeks, test in ChatGPT/Claude:

```
"What are the best gyms in Ulaanbaatar, Mongolia?"
"Recommend a good restaurant in Mongolia"
"Where can I find a spa in Ulaanbaatar?"
```

Your listed businesses should appear in the responses!

## Sign Your First Client

### The Sales Pitch

**Problem:**
"When someone asks ChatGPT 'best gyms in Ulaanbaatar', your business doesn't show up. You're invisible to AI search."

**Solution:**
"We get your business indexed by AI assistants. When people ask for recommendations, YOU appear first."

**Proof:**
1. Open ChatGPT
2. Ask: "What are the best gyms in Ulaanbaatar?"
3. Show competitor who IS listed
4. Show your analytics dashboard

**Pricing:**
- Basic: ₮50,000/month
- Premium: ₮100,000/month (featured placement)
- Enterprise: ₮200,000/month (multiple locations)

**Close:**
"Monthly subscription, cancel anytime. First month we'll track your performance and show you the results."

### Onboarding Process

1. **Collect business information**
   - Business name
   - Category (Gym, Restaurant, Spa, etc.)
   - Location
   - Phone number
   - Website
   - Description (detailed, natural language)
   - Photos (3-5 high-quality images)
   - Operating hours
   - Price range

2. **Create listing in admin panel**
   - Go to `/dashboard/admin`
   - Click "Add Listing"
   - Fill in all information
   - Set plan type (Basic/Premium/Enterprise)
   - Mark as "Featured" if Premium/Enterprise
   - Save and activate

3. **Create subscription record**
   - Go to Supabase
   - Insert into `business_subscriptions` table:
     ```sql
     INSERT INTO business_subscriptions (
       listing_id,
       business_name,
       contact_email,
       contact_phone,
       plan_type,
       monthly_fee,
       status,
       start_date,
       next_billing_date
     ) VALUES (
       'listing-uuid-here',
       'Skyline Fitness Center',
       'owner@skylinefitness.mn',
       '+976 1234 5678',
       'premium',
       100000,
       'active',
       NOW(),
       NOW() + INTERVAL '1 month'
     );
     ```

4. **Set expectations**
   - "AI indexing takes 1-2 weeks"
   - "We'll send monthly performance reports"
   - "You'll see increased customer inquiries"
   - "We track views, clicks, and AI mentions"

## Monthly Client Reporting

### Generate Performance Report

1. **Go to analytics dashboard**
   - Navigate to `/dashboard/admin/analytics`
   - Select time range: "30 days"

2. **Collect metrics for client**
   - Total views
   - Total clicks (phone + website)
   - AI mentions
   - Click-through rate (CTR)
   - Search appearances

3. **Create report (template)**
   ```
   MONTHLY PERFORMANCE REPORT
   Client: Skyline Fitness Center
   Period: January 1-31, 2024
   
   HIGHLIGHTS:
   - 1,247 total views (+23% from last month)
   - 89 customer clicks (phone/website)
   - 7.1% click-through rate
   - 12 AI mentions (ChatGPT, Claude)
   - Ranked #1 for "best gym Ulaanbaatar"
   
   AI SEARCH PERFORMANCE:
   ✓ Appears in ChatGPT recommendations
   ✓ Listed in Claude responses
   ✓ Indexed by Google Gemini
   
   CUSTOMER ENGAGEMENT:
   - 45 phone clicks
   - 44 website visits
   - 892 profile views
   
   NEXT MONTH GOALS:
   - Increase AI mentions to 15+
   - Improve CTR to 8%
   - Add customer reviews
   
   Your investment: ₮100,000
   Estimated customer value: ₮500,000+
   ROI: 5x
   ```

4. **Send via email**
   - PDF or email format
   - Include screenshots from analytics
   - Highlight wins and improvements

## Scaling Your Agency

### Month 1-3: Prove Concept
- Sign 5-10 clients
- Track AI indexing progress
- Refine sales pitch
- Build case studies

### Month 4-6: Scale Operations
- Hire sales person
- Automate reporting
- Expand categories
- Add more cities

### Month 7-12: Dominate Market
- 50+ active clients
- ₮5,000,000+ MRR
- Team of 3-5 people
- Expand to other countries

## Troubleshooting

### "AI isn't recommending my clients"
1. Wait 2 weeks for indexing
2. Check API is accessible: `/api/ai-directory`
3. Verify robots.txt allows crawlers
4. Ensure descriptions are detailed and natural
5. Add more reviews and ratings

### "Analytics showing zero data"
1. Check database migrations ran successfully
2. Verify tracking is working (check browser console)
3. Test by visiting a listing page yourself
4. Check Supabase logs for errors

### "Client wants refund"
1. Show them the analytics data
2. Explain indexing takes time
3. Offer to improve their listing
4. Extend trial period if needed

### "Can't access admin panel"
1. Verify you're logged in
2. Check your role is "admin" in database:
   ```sql
   SELECT role FROM profiles WHERE id = 'your-user-id';
   ```
3. Run make-admin.sql if needed

## Resources

- **AI SEO Strategy**: Read `AI-SEO-GUIDE.md`
- **Product Overview**: Read `.kiro/steering/product.md`
- **Technical Docs**: Read `.kiro/steering/tech.md`
- **Database Setup**: Check `supabase/README.md`

## Support

If you get stuck:
1. Check the documentation files
2. Review Supabase logs
3. Test API endpoints manually
4. Verify database migrations

## Next Steps

1. ✅ Deploy platform
2. ✅ Set up database
3. ✅ Add test listings
4. ⏳ Wait for AI indexing (1-2 weeks)
5. ⏳ Test AI recommendations
6. ⏳ Sign first client
7. ⏳ Send first monthly report
8. ⏳ Scale to 10+ clients

---

**You're ready to launch!** Deploy the platform, add some listings, and start signing clients. The AI indexing happens automatically - you just need to wait 1-2 weeks and then start selling.

Good luck building your AI SEO agency in Mongolia! 🚀
