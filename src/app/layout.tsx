import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fame.mn'),
  title: {
    default: "Fame - Best Gyms, Restaurants & Spas in Mongolia | Ulaanbaatar Business Directory",
    template: "%s | Fame Mongolia"
  },
  description: "Discover the best gyms, restaurants, spas, wellness centers, and nightlife in Ulaanbaatar, Mongolia. Verified businesses with real customer reviews. Find top-rated fitness centers, dining, beauty salons, and more.",
  keywords: [
    // Location-based
    "Mongolia business directory",
    "Ulaanbaatar gyms",
    "Ulaanbaatar restaurants",
    "Ulaanbaatar spas",
    "best gym in Ulaanbaatar",
    "best restaurant in Mongolia",
    "fitness centers Ulaanbaatar",
    "wellness centers Mongolia",
    "beauty salons Ulaanbaatar",
    "nightlife Ulaanbaatar",
    // Service-based
    "gym near me Mongolia",
    "restaurants near me Ulaanbaatar",
    "spa near me Mongolia",
    "fitness classes Ulaanbaatar",
    "personal trainer Mongolia",
    "fine dining Ulaanbaatar",
    "massage spa Mongolia",
    // Business-focused
    "verified businesses Mongolia",
    "customer reviews Ulaanbaatar",
    "business listings Mongolia",
    "local businesses Ulaanbaatar",
    "Mongolia business search",
  ],
  authors: [{ name: "Fame Mongolia", url: "https://fame.mn" }],
  creator: "Fame Mongolia",
  publisher: "Fame Mongolia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fame.mn",
    title: "Fame - Best Gyms, Restaurants & Spas in Mongolia",
    description: "Discover verified gyms, restaurants, spas, and wellness centers in Ulaanbaatar, Mongolia. Real customer reviews and ratings.",
    siteName: "Fame Mongolia",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Fame - Mongolia Business Directory"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fame - Best Gyms, Restaurants & Spas in Mongolia",
    description: "Discover verified gyms, restaurants, spas, and wellness centers in Ulaanbaatar, Mongolia.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://fame.mn",
  },
  verification: {
    google: "your-google-verification-code", // Add after Google Search Console setup
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://fame.mn" />
        <meta name="geo.region" content="MN" />
        <meta name="geo.placename" content="Ulaanbaatar" />
        <meta name="geo.position" content="47.8864;106.9057" />
        <meta name="ICBM" content="47.8864, 106.9057" />
      </head>
      <body className={inter.variable}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
