---
inclusion: auto
---

# AI SEO Agency Platform Context

## Critical Understanding

This is NOT a regular business directory. This is an **AI SEO agency platform** for Mongolia.

### The Business Model

**What we sell:** "Get your business ranked #1 when people ask ChatGPT for recommendations"

**How it works:**
1. Business owner pays monthly subscription (₮50k-200k)
2. We list their business on our platform
3. AI crawlers (GPTBot, Claude-Web, Google-Extended) index our platform
4. When users ask AI "best gym in Ulaanbaatar", our clients appear
5. We track performance and send monthly reports

**Target market:** Mongolia (Ulaanbaatar) - low competition, early mover advantage

### Key Technical Components

1. **AI-Optimized API** (`/api/ai-directory`)
   - Serves structured business data to AI crawlers
   - Filterable by category, location, search query
   - Cached for performance

2. **AI Crawler Permissions** (`/robots.txt`)
   - Explicitly allows GPTBot, Claude-Web, Google-Extended
   - Points crawlers to directory endpoint

3. **Rich SEO Metadata**
   - Every listing optimized for AI understanding
   - Keywords: "best gym Ulaanbaatar", "gym near me"
   - Structured data with ratings, reviews, location

4. **Analytics Tracking**
   - Views, clicks, AI mentions, search appearances
   - Used for client reporting and ROI proof

### User Roles

- **Admin (You)**: Full control, add/edit listings, view analytics, manage subscriptions
- **Public Users**: Browse businesses, search, save favorites
- **Business Owners (Clients)**: Pay monthly, no platform access, receive reports

### Revenue Model

- Basic: ₮50,000/month - Standard listing
- Premium: ₮100,000/month - Featured placement (ranks higher)
- Enterprise: ₮200,000/month - Multiple locations + priority

### Admin-Only Listing Management

**CRITICAL:** Only admins can create/edit/delete listings. This is intentional:
- Quality control (you curate which businesses appear)
- Business model (clients pay YOU to list them)
- No user-generated content (prevents spam)

### Analytics Dashboard

Location: `/dashboard/admin/analytics`

Shows:
- Monthly revenue (₮)
- Active client count
- Per-listing metrics: views, clicks, AI mentions, CTR
- Time range filters (7d, 30d, all time)
- Active subscriptions

### Client Onboarding Flow

1. Sales pitch: "Get ranked #1 in AI search"
2. Collect business info (name, category, location, description, photos)
3. Admin creates listing in dashboard
4. Add subscription record to database
5. Wait 1-2 weeks for AI indexing
6. Track performance in analytics
7. Send monthly report to client

### Success Metrics

**For you (agency owner):**
- Monthly Recurring Revenue (MRR)
- Number of active clients
- Client retention rate

**For clients (businesses):**
- AI mentions (how often AI recommends them)
- Total views (traffic)
- Click-through rate (CTR)
- Customer inquiries (phone/website clicks)

### Key Files

- `AI-SEO-GUIDE.md` - Complete strategy guide
- `GETTING-STARTED.md` - Launch checklist
- `.kiro/steering/product.md` - Detailed product overview
- `src/app/api/ai-directory/route.ts` - Main AI endpoint
- `src/app/dashboard/admin/analytics/page.tsx` - Analytics dashboard
- `supabase/add-analytics.sql` - Analytics database schema

### Common Pitfalls to Avoid

1. **Don't allow users to create listings** - Admin-only by design
2. **Don't skip analytics tracking** - This is how you prove ROI to clients
3. **Don't forget AI indexing takes time** - Set client expectations (1-2 weeks)
4. **Don't neglect listing quality** - Detailed descriptions = better AI recommendations
5. **Don't ignore the API endpoint** - This is what AI crawlers use

### When Making Changes

Always consider:
- Does this help businesses rank in AI search?
- Does this make client reporting easier?
- Does this improve the admin workflow?
- Does this increase MRR?

### Testing AI Optimization

After deployment, verify:
1. `/api/ai-directory` returns JSON with businesses
2. `/robots.txt` allows AI crawlers
3. `/sitemap.xml` lists all pages
4. Listing pages have rich metadata
5. Analytics tracking works (check browser console)

Then wait 1-2 weeks and test in ChatGPT:
```
"What are the best gyms in Ulaanbaatar, Mongolia?"
```

Your listed businesses should appear!

### Selling Points for Clients

- "Traditional SEO takes months. AI SEO is instant (after indexing)"
- "Low competition in Mongolia - easy wins"
- "Measurable ROI - we track every view and click"
- "Monthly subscription - cancel anytime"
- "You'll appear before competitors who aren't listed"

### The Pitch

"When someone asks ChatGPT 'best gyms in Ulaanbaatar', your gym shows up first. We get you ranked #1 in AI search. ₮100,000/month."

---

**Remember:** Every feature should serve the core business model - getting clients ranked in AI search results and proving ROI through analytics.
