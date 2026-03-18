import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse All Businesses - Gyms, Restaurants, Spas in Ulaanbaatar | Fame Mongolia",
  description: "Browse verified gyms, restaurants, spas, wellness centers, beauty salons, and nightlife in Ulaanbaatar, Mongolia. Filter by category, read reviews, and find the best businesses near you.",
  keywords: [
    "browse businesses Mongolia",
    "Ulaanbaatar business listings",
    "find gym Mongolia",
    "find restaurant Ulaanbaatar",
    "spa directory Mongolia",
    "fitness directory Ulaanbaatar",
    "business search Mongolia",
  ],
  openGraph: {
    title: "Browse All Businesses in Ulaanbaatar, Mongolia",
    description: "Find verified gyms, restaurants, spas, and more in Mongolia",
    url: "https://fame.mn/listings",
  },
  alternates: {
    canonical: "https://fame.mn/listings",
  },
};

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
