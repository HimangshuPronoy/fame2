import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const baseUrl = "https://fame.mn";

  try {
    const { data: listings } = await supabase
      .from("listings")
      .select("id, title, category, location, updated_at")
      .eq("is_active", true);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${
    listings
      ?.map(
        (listing) => `
  <url>
    <loc>${baseUrl}/listing/${listing.id}</loc>
    <lastmod>${new Date(listing.updated_at || Date.now()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${baseUrl}/listing-images/${listing.id}.jpg</image:loc>
      <image:title>${listing.title} - ${listing.category} in ${listing.location || "Mongolia"}</image:title>
    </image:image>
  </url>`
      )
      .join("") || ""
  }
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Listings sitemap generation error:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
