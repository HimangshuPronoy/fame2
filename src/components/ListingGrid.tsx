"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dumbbell, Utensils, Sparkles, MapPin,
  Phone, Camera, Heart, Star, ChevronLeft, ChevronRight
} from "lucide-react";
import styles from "./ListingGrid.module.css";
import { supabase, Listing } from "@/lib/supabase";

const categoryIcons: Record<string, React.ElementType> = {
  Fitness: Dumbbell,
  Gym: Dumbbell,
  Restaurants: Utensils,
  Nightlife: Sparkles,
  Spa: Sparkles,
  Wellness: Sparkles,
  Beauty: Sparkles,
  default: Utensils,
};

import { useLanguage } from "@/lib/language-context";

export default function ListingGrid() {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchListings() {
      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("is_active", true)
        .order("is_featured", { ascending: false })
        .order("rating", { ascending: false })
        .limit(10);
      if (!error && data) setListings(data as Listing[]);
      setLoading(false);
    }
    fetchListings();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const scrollAmount = 400;
      if (direction === "right" && scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else if (direction === "left" && scrollLeft <= 0) {
        scrollContainerRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
      } else {
        scrollContainerRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => scroll("right"), 4000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.headerRow}>
            <div className={styles.header}>
              <span className={styles.subtitle}>{t('home.listings.trending')}</span>
              <h2 className={styles.title}>{t('home.listings.popular')}</h2>
            </div>
          </div>
          <div style={{ padding: "60px 0", textAlign: "center", color: "#9ca3af" }}>Loading listings...</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.header}>
            <span className={styles.subtitle}>{t('home.listings.trending')}</span>
            <h2 className={styles.title}>{t('home.listings.popular')}</h2>
          </div>
          <div className={styles.navControls}>
            <button onClick={() => scroll("left")} className={styles.navBtn} aria-label="Scroll left">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scroll("right")} className={styles.navBtn} aria-label="Scroll right">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className={styles.grid} ref={scrollContainerRef}>
          {listings.map((listing) => {
            const Icon = categoryIcons[listing.category] ?? categoryIcons.default;
            return (
              <Link href={`/listing/${listing.id}`} key={listing.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  {listing.image_url ? (
                    <Image src={listing.image_url} alt={listing.title} fill className={styles.image} />
                  ) : (
                    <div style={{ background: "#f3f4f6", width: "100%", height: "100%" }} />
                  )}
                  <div className={styles.badges}>
                    <span className={`${styles.badge} ${styles.badgeOpen}`}>{t('home.listings.open')}</span>
                    {listing.is_featured && (
                      <span className={`${styles.badge} ${styles.badgeFeatured}`}>{t('home.listings.featured')}</span>
                    )}
                  </div>
                  {listing.author_avatar && (
                    <div className={styles.authorAvatar}>
                      <Image src={listing.author_avatar} alt="Author" fill className={styles.avatarImage} />
                    </div>
                  )}
                </div>

                <div className={styles.content}>
                  <div className={styles.metaRow}>
                    <div className={styles.categoryInfo} style={{ color: "#22c55e" }}>
                      <Icon size={14} />
                      <span>{listing.category}</span>
                    </div>
                    <div className={styles.dot}></div>
                    <div className={styles.ratingInfo}>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={i < Math.floor(listing.rating) ? "#fbbf24" : "#e5e7eb"}
                            color={i < Math.floor(listing.rating) ? "#fbbf24" : "#e5e7eb"}
                          />
                        ))}
                      </div>
                      <span>({listing.reviews} {t('home.listings.reviews')})</span>
                    </div>
                  </div>

                  <h3 className={styles.cardTitle}>{listing.title}</h3>
                  <p className={styles.cardSubtitle}>{listing.subtitle}</p>

                  {listing.location && (
                    <div className={styles.detailsRow}>
                      <MapPin size={14} className={styles.detailIcon} />
                      <span>{listing.location}</span>
                    </div>
                  )}
                  {listing.phone && (
                    <div className={styles.detailsRow}>
                      <Phone size={14} className={styles.detailIcon} />
                      <span>{listing.phone}</span>
                    </div>
                  )}
                </div>

                <div className={styles.footer}>
                  <div className={styles.priceContainer}>
                    <span className={styles.priceLabel}>{t('home.listings.from')}</span>
                    <span className={styles.priceValue}>{listing.price ?? "—"}</span>
                  </div>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn}>
                      <Camera size={14} />
                    </button>
                    <button className={`${styles.actionBtn} ${styles.heartBtn}`}>
                      <Heart size={14} />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
