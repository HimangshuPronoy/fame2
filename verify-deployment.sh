#!/bin/bash

# Deployment Verification Script
# Run this after deploying to verify everything works

echo "🚀 Fame. AI SEO Platform - Deployment Verification"
echo "=================================================="
echo ""

# Check if URL is provided
if [ -z "$1" ]; then
    URL="http://localhost:3001"
    echo "⚠️  No URL provided, testing localhost: $URL"
else
    URL="$1"
    echo "🌐 Testing deployment: $URL"
fi

echo ""
echo "Testing API Endpoints..."
echo "------------------------"

# Test AI Directory API
echo -n "✓ AI Directory API (/api/ai-directory): "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/api/ai-directory")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ PASS ($STATUS)"
    BUSINESSES=$(curl -s "$URL/api/ai-directory" | grep -o '"total_businesses":[0-9]*' | grep -o '[0-9]*')
    echo "  → Found $BUSINESSES businesses"
else
    echo "❌ FAIL ($STATUS)"
fi

# Test Robots.txt
echo -n "✓ Robots.txt (/robots.txt): "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/robots.txt")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ PASS ($STATUS)"
    CRAWLERS=$(curl -s "$URL/robots.txt" | grep -c "User-agent:")
    echo "  → Configured for $CRAWLERS crawler types"
else
    echo "❌ FAIL ($STATUS)"
fi

# Test Sitemap
echo -n "✓ Sitemap (/sitemap.xml): "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/sitemap.xml")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ PASS ($STATUS)"
    URLS=$(curl -s "$URL/sitemap.xml" | grep -c "<loc>")
    echo "  → Contains $URLS URLs"
else
    echo "❌ FAIL ($STATUS)"
fi

# Test AI Discovery File
echo -n "✓ AI Discovery (/.well-known/ai.json): "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/.well-known/ai.json")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ PASS ($STATUS)"
else
    echo "❌ FAIL ($STATUS)"
fi

echo ""
echo "Testing Public Pages..."
echo "------------------------"

# Test Homepage
echo -n "✓ Homepage (/): "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ PASS ($STATUS)"
else
    echo "❌ FAIL ($STATUS)"
fi

# Test Listings Page
echo -n "✓ Listings Page (/listings): "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/listings")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ PASS ($STATUS)"
else
    echo "❌ FAIL ($STATUS)"
fi

# Test Login Page
echo -n "✓ Login Page (/login): "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/login")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ PASS ($STATUS)"
else
    echo "❌ FAIL ($STATUS)"
fi

echo ""
echo "Testing AI Crawler Compatibility..."
echo "------------------------------------"

# Test as GPTBot
echo -n "✓ GPTBot access: "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -A "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; GPTBot/1.0; +https://openai.com/gptbot" "$URL/api/ai-directory")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ PASS ($STATUS)"
else
    echo "❌ FAIL ($STATUS)"
fi

# Test as Claude
echo -n "✓ Claude-Web access: "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -A "Claude-Web" "$URL/api/ai-directory")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ PASS ($STATUS)"
else
    echo "❌ FAIL ($STATUS)"
fi

# Test as Google-Extended
echo -n "✓ Google-Extended access: "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -A "Google-Extended" "$URL/api/ai-directory")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ PASS ($STATUS)"
else
    echo "❌ FAIL ($STATUS)"
fi

echo ""
echo "Testing API Filters..."
echo "----------------------"

# Test category filter
echo -n "✓ Category filter (?category=Gym): "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/api/ai-directory?category=Gym")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ PASS ($STATUS)"
else
    echo "❌ FAIL ($STATUS)"
fi

# Test location filter
echo -n "✓ Location filter (?location=Ulaanbaatar): "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/api/ai-directory?location=Ulaanbaatar")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ PASS ($STATUS)"
else
    echo "❌ FAIL ($STATUS)"
fi

# Test search query
echo -n "✓ Search query (?q=fitness): "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL/api/ai-directory?q=fitness")
if [ "$STATUS" -eq 200 ]; then
    echo "✅ PASS ($STATUS)"
else
    echo "❌ FAIL ($STATUS)"
fi

echo ""
echo "=================================================="
echo "✅ Deployment verification complete!"
echo ""
echo "Next Steps:"
echo "1. Add test listings via /dashboard/admin"
echo "2. Wait 1-2 weeks for AI indexing"
echo "3. Test in ChatGPT: 'best gyms in Ulaanbaatar'"
echo "4. Start signing clients!"
echo ""
