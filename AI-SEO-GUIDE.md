# AI SEO Strategy Guide

## How Fame. Gets Your Clients Ranked #1 in AI Search

This platform is designed to make your clients' businesses appear when users ask AI assistants (ChatGPT, Claude, Gemini) for recommendations.

## How It Works

### 1. AI-Optimized API Endpoint
**URL:** `https://fame.mn/api/ai-directory`

This endpoint provides structured, AI-friendly data that crawlers can easily index:
- Business names, descriptions, ratings
- Categories and locations
- Contact information
- Verification status
- Rich context for AI understanding

### 2. AI Crawler Access
The platform explicitly allows AI crawlers:
- GPTBot (ChatGPT)
- Claude-Web (Claude)
- Google-Extended (Gemini)
- Anthropic-ai
- Applebot-Extended

See: `/robots.txt` - All AI crawlers are welcomed and guided to the directory

### 3. Rich Metadata
Every listing page has AI-optimized metadata:
- Descriptive titles with location and category
- Detailed descriptions with ratings and reviews
- Structured data for better understanding
- Keywords optimized for natural language queries

### 4. Structured Data Format
The API returns data in a format AI models understand:
```json
{
  "name": "Skyline Fitness Center",
  "category": "Gym",
  "location": "Ulaanbaatar, Mongolia",
  "rating": 4.8,
  "total_reviews": 127,
  "why_recommended": "Premium verified business with excellent customer ratings",
  "url": "https://fame.mn/listing/[id]"
}
```

## Client Pitch: How to Sell This

### The Problem
"When someone asks ChatGPT 'best gyms in Ulaanbaatar', your business doesn't show up. You're invisible to AI search."

### The Solution
"We get your business indexed by AI assistants. When people ask for recommendations, YOU appear first."

### The Proof
Show them the analytics dashboard:
- **AI Mentions**: Track how many times AI recommends their business
- **Views**: See traffic from AI-powered searches
- **CTR**: Measure actual customer interest

### The Pitch
"For ₮[price]/month, we:
1. List your business on our AI-optimized platform
2. Ensure AI assistants recommend you first
3. Track your performance with detailed analytics
4. Provide monthly reports showing ROI"

## Testing AI Recommendations

### How to Verify It's Working

1. **Wait for Indexing** (1-2 weeks after listing)
   - AI crawlers need time to discover and index your data

2. **Test Queries in ChatGPT/Claude:**
   ```
   "What are the best gyms in Ulaanbaatar, Mongolia?"
   "Recommend a good restaurant in Mongolia"
   "Where can I find a spa in Ulaanbaatar?"
   ```

3. **Track in Analytics:**
   - Go to `/dashboard/admin/analytics`
   - Check "AI Mentions" column
   - Monitor traffic sources

## Optimization Tips

### For Better AI Rankings:

1. **Rich Descriptions**
   - Write detailed, natural descriptions
   - Include location, services, unique features
   - Use conversational language

2. **High Ratings**
   - Encourage customer reviews
   - Maintain 4.5+ star ratings
   - Featured listings rank higher

3. **Complete Information**
   - Fill all fields (phone, website, location)
   - Add multiple photos
   - Keep information current

4. **Strategic Keywords**
   - Use natural phrases people actually say
   - "Best gym in Ulaanbaatar" not "gym fitness center"
   - Include neighborhood names

## API Usage Examples

### Get All Gyms in Ulaanbaatar
```
GET /api/ai-directory?category=Gym&location=Ulaanbaatar
```

### Search for Restaurants
```
GET /api/ai-directory?category=Restaurants&location=Mongolia
```

### General Search
```
GET /api/ai-directory?q=fitness
```

## Monitoring & Reporting

### Monthly Client Reports Should Include:
1. **AI Mentions**: How many times AI recommended them
2. **Total Views**: Traffic from all sources
3. **Click-Through Rate**: Actual customer engagement
4. **Ranking Position**: Where they appear in AI responses
5. **Competitor Comparison**: How they stack up

### Dashboard Location:
`/dashboard/admin/analytics`

## Advanced: Manual AI Submission

### Submit to ChatGPT's Web Browsing
When ChatGPT has web browsing enabled, it can discover your listings in real-time.

### Submit to Claude's Web Search
Claude can access your API endpoint directly when users ask for recommendations.

### Google Gemini Integration
Gemini indexes your sitemap and API endpoint automatically.

## Technical Details

### Files Created:
- `/api/ai-directory/route.ts` - Main API endpoint
- `/robots.txt/route.ts` - AI crawler permissions
- `/sitemap.xml/route.ts` - Site structure for crawlers
- `/.well-known/ai.json` - AI platform discovery file

### SEO Enhancements:
- Rich metadata on all listing pages
- Structured data format
- Canonical URLs
- Open Graph tags
- Twitter cards

## Troubleshooting

### "AI isn't recommending my clients"
1. Check if listings are active (`is_active = true`)
2. Verify API endpoint is accessible: `/api/ai-directory`
3. Wait 1-2 weeks for indexing
4. Ensure descriptions are detailed and natural

### "Analytics showing zero AI mentions"
1. AI mentions must be tracked manually or via API
2. Use the tracking function: `trackAIMention(listingId, 'chatgpt', query)`
3. Set up automated monitoring (future feature)

### "Competitors ranking higher"
1. Check their rating (higher = better)
2. Verify they're marked as featured
3. Improve description quality
4. Add more reviews

## Future Enhancements

- [ ] Automated AI mention tracking
- [ ] Real-time ranking monitoring
- [ ] Competitor analysis tools
- [ ] A/B testing for descriptions
- [ ] AI response optimization suggestions

---

**Bottom Line:** This platform makes your clients discoverable in the age of AI search. When someone asks an AI assistant for recommendations in Mongolia, your clients appear first. That's the value you're selling.
