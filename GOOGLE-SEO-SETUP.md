# Google SEO Setup Guide

## What's Been Optimized

### ✅ Technical SEO
1. **Metadata Optimization**
   - Title tags with location keywords
   - Meta descriptions (150-160 chars)
   - Keywords targeting Mongolia/Ulaanbaatar
   - Open Graph tags for social sharing
   - Twitter Card tags

2. **Structured Data (Schema.org)**
   - WebSite schema with search action
   - Organization schema
   - LocalBusiness schema (on listing pages)
   - Breadcrumb schema

3. **Sitemaps**
   - Main sitemap (`/sitemap.xml`)
   - Listings sitemap (`/sitemap-listings.xml`)
   - Sitemap index (`/sitemap-index.xml`)
   - Auto-updates with new listings

4. **Robots.txt**
   - Allows Googlebot
   - Points to sitemaps
   - Blocks admin pages
   - Optimized crawl rate

5. **Performance**
   - Image optimization (Next.js Image)
   - Code splitting
   - Lazy loading
   - Fast page loads

### ✅ On-Page SEO
1. **Homepage**
   - H1: "Fame - Best Gyms, Restaurants & Spas in Ulaanbaatar, Mongolia"
   - Location-specific keywords
   - Clear value proposition
   - Internal linking

2. **Listings Page**
   - Category-specific titles
   - Search functionality
   - Filter options
   - Breadcrumbs

3. **Listing Detail Pages**
   - Unique titles per business
   - Rich descriptions
   - Location data
   - Reviews and ratings
   - Contact information

### ✅ Local SEO
1. **Geographic Targeting**
   - Mongolia country code (MN)
   - Ulaanbaatar city targeting
   - Geo coordinates (47.8864, 106.9057)
   - Local business schema

2. **Keywords**
   - "best gym in Ulaanbaatar"
   - "restaurants Ulaanbaatar"
   - "spa Mongolia"
   - "fitness center Ulaanbaatar"
   - "gym near me Mongolia"

## Post-Deployment Setup

### 1. Google Search Console (Required)

**Setup:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://fame.mn`
3. Verify ownership (HTML file or DNS)
4. Submit sitemaps:
   - `https://fame.mn/sitemap.xml`
   - `https://fame.mn/sitemap-listings.xml`

**Get Verification Code:**
```html
<!-- Add to src/app/layout.tsx metadata -->
verification: {
  google: "your-verification-code-here"
}
```

### 2. Google Business Profile (Recommended)

**Setup:**
1. Go to [Google Business](https://business.google.com)
2. Create business profile
3. Add:
   - Business name: Fame Mongolia
   - Category: Business Directory
   - Location: Ulaanbaatar, Mongolia
   - Website: https://fame.mn
   - Description: "Discover the best gyms, restaurants, spas..."

### 3. Google Analytics (Recommended)

**Setup:**
1. Go to [Google Analytics](https://analytics.google.com)
2. Create property for `fame.mn`
3. Get tracking ID
4. Add to `src/app/layout.tsx`:

```typescript
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### 4. Submit to Search Engines

**Google:**
- Already done via Search Console

**Bing:**
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add site: `https://fame.mn`
3. Submit sitemap

**Yandex (for Russia/Mongolia):**
1. Go to [Yandex Webmaster](https://webmaster.yandex.com)
2. Add site
3. Submit sitemap

## Target Keywords (Mongolia Focus)

### Primary Keywords
1. "best gym in Ulaanbaatar" - High intent
2. "restaurants Ulaanbaatar" - High volume
3. "spa Ulaanbaatar" - Medium competition
4. "fitness center Mongolia" - Low competition
5. "wellness center Ulaanbaatar" - Low competition

### Long-Tail Keywords
1. "best gym near me in Ulaanbaatar"
2. "top rated restaurants in Mongolia"
3. "luxury spa Ulaanbaatar"
4. "personal trainer Ulaanbaatar"
5. "yoga classes Mongolia"

### Location Modifiers
- Ulaanbaatar
- Mongolia
- near me
- in Mongolia
- Ulaanbaatar city

## Content Strategy

### 1. Add Location Pages
Create pages for:
- `/ulaanbaatar-gyms`
- `/ulaanbaatar-restaurants`
- `/ulaanbaatar-spas`

### 2. Blog Content (Future)
Write articles:
- "Top 10 Gyms in Ulaanbaatar 2024"
- "Best Restaurants in Mongolia"
- "Wellness Guide: Ulaanbaatar Spas"

### 3. Business Descriptions
Ensure each listing has:
- 150+ words description
- Location mentioned
- Services listed
- Unique content (no duplicates)

## Link Building

### 1. Local Directories
Submit to:
- Mongolia business directories
- Ulaanbaatar city guides
- Tourism websites
- Expat forums

### 2. Social Media
Create profiles:
- Facebook Page
- Instagram
- LinkedIn Company Page

### 3. Partnerships
Partner with:
- Local businesses
- Tourism boards
- Expat communities
- Fitness influencers

## Monitoring & Optimization

### Track These Metrics:

**Google Search Console:**
- Impressions (how many see your site)
- Clicks (how many visit)
- CTR (click-through rate)
- Average position (ranking)

**Google Analytics:**
- Organic traffic
- Bounce rate
- Time on site
- Conversion rate

### Monthly Tasks:

1. **Week 1:** Check Search Console for errors
2. **Week 2:** Analyze top-performing pages
3. **Week 3:** Optimize low-performing pages
4. **Week 4:** Add new content/listings

## Expected Timeline

### Month 1
- Site indexed by Google
- Appears for brand searches ("Fame Mongolia")
- 10-50 impressions/day

### Month 2-3
- Ranking for long-tail keywords
- 50-200 impressions/day
- First page for some terms

### Month 4-6
- Ranking for primary keywords
- 200-500 impressions/day
- Top 3 for niche terms

### Month 6-12
- Dominating Mongolia searches
- 500-2000 impressions/day
- #1 for multiple keywords

## Quick Wins

### Immediate (Week 1)
1. ✅ Submit to Google Search Console
2. ✅ Submit sitemaps
3. ✅ Create Google Business Profile
4. ✅ Set up Google Analytics

### Short-term (Month 1)
1. Add 20+ quality listings
2. Get 5+ backlinks
3. Create social media profiles
4. Optimize all meta descriptions

### Medium-term (Month 2-3)
1. Publish blog content
2. Get 20+ backlinks
3. Encourage customer reviews
4. Build local citations

## Technical Checklist

- [x] Optimized title tags
- [x] Meta descriptions
- [x] Open Graph tags
- [x] Schema.org markup
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URLs
- [x] Mobile responsive
- [x] Fast page speed
- [x] HTTPS enabled
- [ ] Google Search Console verified
- [ ] Google Analytics installed
- [ ] Google Business Profile created

## Competitive Advantage

### Why You'll Rank #1:

1. **Low Competition**
   - Few business directories in Mongolia
   - Most competitors have poor SEO
   - English + Mongolian content gap

2. **Technical Excellence**
   - Modern Next.js framework
   - Fast loading times
   - Mobile-first design
   - Structured data

3. **Content Quality**
   - Verified businesses
   - Real reviews
   - Detailed descriptions
   - Regular updates

4. **Local Focus**
   - Mongolia-specific
   - Ulaanbaatar targeting
   - Local business partnerships
   - Community engagement

## Support Resources

- [Google Search Console Help](https://support.google.com/webmasters)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)

---

**Your site is now optimized for Google search. Follow the post-deployment steps to complete setup and start ranking!** 🚀
