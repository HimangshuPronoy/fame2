import { NextResponse } from "next/server";

export async function GET() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Fame Mongolia",
    "alternateName": "Fame Business Directory",
    "url": "https://fame.mn",
    "description": "Discover the best gyms, restaurants, spas, wellness centers, and nightlife in Ulaanbaatar, Mongolia. Verified businesses with real customer reviews.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://fame.mn/listings?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fame Mongolia",
      "url": "https://fame.mn",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fame.mn/logo.png"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "MN",
        "addressLocality": "Ulaanbaatar"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Mongolia"
      }
    }
  };

  return NextResponse.json(schema, {
    headers: {
      "Content-Type": "application/ld+json",
      "Cache-Control": "public, s-maxage=86400",
    },
  });
}
