import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import styles from "./page.module.css";
import ListingDetailClient from "./ListingDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("id", resolvedParams.id)
    .eq("is_active", true)
    .single();

  if (!listing) {
    return {
      title: "Listing Not Found | Fame.",
    };
  }

  // AI-optimized metadata for better discoverability
  const description = listing.description || listing.subtitle || `${listing.title} - ${listing.category} in ${listing.location || "Mongolia"}. Rated ${listing.rating}/5 by ${listing.reviews} customers. ${listing.price || ""}`;
  
  return {
    title: `${listing.title} - ${listing.category} in ${listing.location || "Mongolia"} | Fame.`,
    description,
    keywords: [
      listing.title,
      listing.category,
      listing.location || "Mongolia",
      "Ulaanbaatar",
      "best " + listing.category.toLowerCase(),
      listing.category.toLowerCase() + " near me",
      "verified business",
      "customer reviews",
    ].join(", "),
    openGraph: {
      title: listing.title,
      description,
      images: listing.image_url ? [listing.image_url] : [],
      siteName: "Fame - Mongolia Business Directory",
    },
    twitter: {
      card: "summary_large_image",
      title: listing.title,
      description,
      images: listing.image_url ? [listing.image_url] : [],
    },
    alternates: {
      canonical: `https://fame.mn/listing/${listing.id}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export default async function ListingDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  const { data: listing, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", resolvedParams.id)
    .eq("is_active", true)
    .single();

  if (error || !listing) {
    notFound();
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      <ListingDetailClient listing={listing} />
    </div>
  );
}
