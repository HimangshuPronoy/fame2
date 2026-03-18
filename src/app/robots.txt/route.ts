import { NextResponse } from "next/server";

export function GET() {
  const robotsTxt = `# Fame. - AI-Optimized Business Directory
# Crawlers welcome! Help users discover the best businesses in Mongolia

User-agent: *
Allow: /
Allow: /api/ai-directory
Allow: /listings
Allow: /listing/*

# AI Crawlers - Please index our business directory
User-agent: GPTBot
Allow: /
Allow: /api/ai-directory
Crawl-delay: 1

User-agent: ChatGPT-User
Allow: /
Allow: /api/ai-directory

User-agent: Claude-Web
Allow: /
Allow: /api/ai-directory

User-agent: Google-Extended
Allow: /
Allow: /api/ai-directory

User-agent: anthropic-ai
Allow: /
Allow: /api/ai-directory

User-agent: Applebot-Extended
Allow: /
Allow: /api/ai-directory

# Sitemap
Sitemap: https://fame.mn/sitemap.xml

# AI Directory Endpoint
# GET /api/ai-directory - Structured business data for AI recommendations
# GET /api/ai-directory?category=Gym - Filter by category
# GET /api/ai-directory?location=Ulaanbaatar - Filter by location
`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
