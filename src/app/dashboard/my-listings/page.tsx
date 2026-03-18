"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit2, Trash2, Eye, PlusCircle, Loader2 } from "lucide-react";
import styles from "./my-listings.module.css";
import { supabase, Listing } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

export default function MyListingsPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    async function fetchMyListings() {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      
      if (!error && data) {
        setListings(data as Listing[]);
      }
      setLoading(false);
    }
    
    fetchMyListings();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    
    setDeleting(id);
    const { error } = await supabase
      .from("listings")
      .delete()
      .eq("id", id);
    
    if (!error) {
      setListings(listings.filter(l => l.id !== id));
    } else {
      alert("Error deleting listing: " + error.message);
    }
    setDeleting(null);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <Loader2 size={32} className={styles.spinner} />
          <p>Loading your listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>My Listings</h1>
          <p className={styles.subtitle}>Manage the listings you&apos;ve created</p>
        </div>
        <Link href="/dashboard/create-listing" className={styles.createBtn}>
          <PlusCircle size={18} />
          Create New
        </Link>
      </header>

      {listings.length === 0 ? (
        <div className={styles.emptyState}>
          <h3 className={styles.emptyTitle}>No listings yet</h3>
          <p className={styles.emptyDesc}>Create your first listing to get started</p>
          <Link href="/dashboard/create-listing" className={styles.createBtn}>
            <PlusCircle size={18} />
            Create Listing
          </Link>
        </div>
      ) : (
        <div className={styles.grid}>
          {listings.map((listing) => (
            <div key={listing.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                {listing.image_url ? (
                  <Image
                    src={listing.image_url}
                    alt={listing.title}
                    fill
                    className={styles.image}
                    sizes="300px"
                  />
                ) : (
                  <div className={styles.imagePlaceholder} />
                )}
                {listing.is_featured && (
                  <span className={styles.featuredBadge}>Featured</span>
                )}
              </div>
              
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.category}>{listing.category}</span>
                  <span className={listing.is_active ? styles.statusActive : styles.statusInactive}>
                    {listing.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
                
                <h3 className={styles.cardTitle}>{listing.title}</h3>
                {listing.subtitle && (
                  <p className={styles.cardSubtitle}>{listing.subtitle}</p>
                )}
                
                <div className={styles.stats}>
                  <span>⭐ {listing.rating}</span>
                  <span>•</span>
                  <span>{listing.reviews} reviews</span>
                </div>
                
                <div className={styles.actions}>
                  <Link href={`/listing/${listing.id}`} className={styles.actionBtn}>
                    <Eye size={16} /> View
                  </Link>
                  <Link href={`/dashboard/edit-listing/${listing.id}`} className={styles.actionBtn}>
                    <Edit2 size={16} /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(listing.id)}
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    disabled={deleting === listing.id}
                  >
                    {deleting === listing.id ? (
                      <Loader2 size={16} className={styles.spinner} />
                    ) : (
                      <><Trash2 size={16} /> Delete</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
