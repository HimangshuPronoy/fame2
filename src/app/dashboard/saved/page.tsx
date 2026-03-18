"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase, Listing } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, Star, Trash2 } from "lucide-react";
import styles from "./saved.module.css";

export default function SavedListingsPage() {
  const { user } = useAuth();
  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSavedListings();
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchSavedListings = async () => {
    const { data: saved } = await supabase
      .from("saved_listings")
      .select("listing_id")
      .eq("user_id", user!.id);

    if (saved && saved.length > 0) {
      const listingIds = saved.map((s) => s.listing_id);
      const { data: listings } = await supabase
        .from("listings")
        .select("*")
        .in("id", listingIds);

      if (listings) setSavedListings(listings as Listing[]);
    }
    setLoading(false);
  };

  const handleUnsave = async (listingId: string) => {
    await supabase
      .from("saved_listings")
      .delete()
      .eq("user_id", user!.id)
      .eq("listing_id", listingId);

    setSavedListings(savedListings.filter((l) => l.id !== listingId));
  };

  if (loading) {
    return <div className={styles.loading}>Loading your saved listings...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <Heart size={32} fill="currentColor" />
          Saved Listings
        </h1>
        <p className={styles.subtitle}>
          {savedListings.length} {savedListings.length === 1 ? "place" : "places"} you love
        </p>
      </div>

      {savedListings.length === 0 ? (
        <div className={styles.empty}>
          <Heart size={64} />
          <h2>No saved listings yet</h2>
          <p>Start exploring and save your favorite places</p>
          <Link href="/listings" className={styles.browseBtn}>
            Browse Listings
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {savedListings.map((listing) => (
            <div key={listing.id} className={styles.card}>
              <Link href={`/listing/${listing.id}`} className={styles.imageLink}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={listing.image_url || "/placeholder.jpg"}
                    alt={listing.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Link>

              <div className={styles.content}>
                <div className={styles.topRow}>
                  <span className={styles.category}>{listing.category}</span>
                  <button
                    onClick={() => handleUnsave(listing.id)}
                    className={styles.unsaveBtn}
                    title="Remove from saved"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <Link href={`/listing/${listing.id}`}>
                  <h3 className={styles.listingTitle}>{listing.title}</h3>
                </Link>

                {listing.subtitle && (
                  <p className={styles.subtitle}>{listing.subtitle}</p>
                )}

                <div className={styles.meta}>
                  {listing.location && (
                    <span className={styles.location}>
                      <MapPin size={14} />
                      {listing.location}
                    </span>
                  )}
                  <span className={styles.rating}>
                    <Star size={14} fill="currentColor" />
                    {listing.rating.toFixed(1)}
                  </span>
                </div>

                {listing.price && (
                  <div className={styles.price}>{listing.price}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
