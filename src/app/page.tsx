import { Metadata } from "next";
import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import Categories from "../components/Categories";
import Features from "../components/Features";
import PremiumCuration from "../components/PremiumCuration";
import Testimonials from "../components/Testimonials";
import ListingGrid from "../components/ListingGrid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Fame - Best Gyms, Restaurants & Spas in Ulaanbaatar, Mongolia",
  description: "Find the best gyms, restaurants, spas, wellness centers, and nightlife in Ulaanbaatar, Mongolia. Verified businesses with real customer reviews. Discover top-rated fitness centers, fine dining, beauty salons, and more in Mongolia's capital.",
  keywords: [
    "best gym Ulaanbaatar",
    "best restaurant Mongolia",
    "spa Ulaanbaatar",
    "fitness center Mongolia",
    "wellness Ulaanbaatar",
    "nightlife Mongolia",
    "beauty salon Ulaanbaatar",
    "gym near me Mongolia",
    "restaurants Ulaanbaatar",
    "business directory Mongolia",
  ],
  openGraph: {
    title: "Fame - Best Gyms, Restaurants & Spas in Ulaanbaatar, Mongolia",
    description: "Discover verified businesses in Mongolia with real customer reviews",
    url: "https://fame.mn",
    type: "website",
  },
  alternates: {
    canonical: "https://fame.mn",
  },
};

export default function Home() {
  return (
    <main>
      <Header />
      <HeroCarousel />
      <Categories />
      <ListingGrid />
      <Features />
      <PremiumCuration />
      <Testimonials />
      <Footer />
    </main>
  );
}
