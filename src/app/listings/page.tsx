"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Star, Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import styles from "./listings.module.css";
import Header from "@/components/Header";
import { supabase, Listing } from "@/lib/supabase";

import { useLanguage } from "@/lib/language-context";

const CATEGORIES = ["Fitness", "Gym", "Restaurants", "Nightlife", "Spa", "Beauty", "Wellness", "Hotels"];

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "newest" | "name">("rating");
  const { t } = useLanguage();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Read category and query from URL search params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    const q = params.get("q");
    if (cat) setSelectedCategory(cat);
    if (q) setSearch(q);
  }, []);

  const fetchListings = useCallback(async () => {
    setLoading(true);

    let query = supabase
      .from("listings")
      .select("*")
      .eq("is_active", true);

    // Server-side text search using ilike for fuzzy matching
    if (search.trim()) {
      const searchTerm = search.trim().toLowerCase();
      const q = `%${searchTerm}%`;
      
      // Check if search term matches a category name
      const matchedCategory = CATEGORIES.find(cat => 
        cat.toLowerCase().includes(searchTerm) || searchTerm.includes(cat.toLowerCase())
      );
      
      if (matchedCategory && !selectedCategory) {
        // If search matches a category and no category is selected, filter by that category
        query = query.eq("category", matchedCategory);
      } else {
        // Otherwise do a general text search
        query = query.or(`title.ilike.${q},subtitle.ilike.${q},description.ilike.${q},category.ilike.${q},location.ilike.${q}`);
      }
    }

    // Server-side category filter (applied AFTER search)
    if (selectedCategory) {
      query = query.eq("category", selectedCategory);
    }

    // Sorting
    if (sortBy === "rating") {
      query = query.order("is_featured", { ascending: false }).order("rating", { ascending: false });
    } else if (sortBy === "newest") {
      query = query.order("created_at", { ascending: false });
    } else {
      query = query.order("title", { ascending: true });
    }

    const { data } = await query;
    if (data) setListings(data as Listing[]);
    setLoading(false);
  }, [selectedCategory, search, sortBy]);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchListings();
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [fetchListings]);

  return (
    <div className={styles.pageWrapper}>
      <Header />

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {selectedCategory ? t(`category.${selectedCategory.toLowerCase()}`) : t('listings.title')}
          </h1>
          <p className={styles.heroSubtitle}>
            {selectedCategory
              ? t('listing.subtitle').replace('${category}', t(`category.${selectedCategory.toLowerCase()}`)) 
              : t('listings.subtitle')}
          </p>

          {/* Search */}
          <div className={styles.searchBar}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder={t('listings.search.placeholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            {search && (
              <button onClick={() => setSearch("")} className={styles.clearBtn}>
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills + Sort */}
      <div className={styles.categoryBar}>
        <div className={styles.pillScroll}>
          <button
            className={`${styles.categoryPill} ${!selectedCategory ? styles.categoryPillActive : ""}`}
            onClick={() => setSelectedCategory(null)}
          >
            {t('listings.filter.all')}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.categoryPill} ${selectedCategory === cat ? styles.categoryPillActive : ""}`}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            >
              {t(`category.${cat.toLowerCase()}`)}
            </button>
          ))}
        </div>

        <div className={styles.barRight}>
          <div className={styles.sortWrapper}>
            <label className={styles.sortLabel}>{t('listings.filter.sortBy')}</label>
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "rating" | "newest" | "name")}
            >
              <option value="rating">{t('listings.filter.topRated')}</option>
              <option value="newest">{t('listings.filter.newest')}</option>
              <option value="name">{t('listings.filter.az')}</option>
            </select>
          </div>
          <button className={styles.filterToggle} onClick={() => setShowFilters(!showFilters)}>
            <SlidersHorizontal size={16} />
            {t('listings.filter.toggle')}
            <ChevronDown size={14} className={showFilters ? styles.rotated : ""} />
          </button>
        </div>
      </div>

      {/* Expandable Filter Panel */}
      {showFilters && (
        <div className={styles.filterPanel}>
          <div className={styles.filterGroup}>
            <h4 className={styles.filterGroupTitle}>{t('form.category')}</h4>
            <div className={styles.filterChips}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterChip} ${selectedCategory === cat ? styles.filterChipActive : ""}`}
                  onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                >
                  {t(`category.${cat.toLowerCase()}`)}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.filterGroup}>
            <h4 className={styles.filterGroupTitle}>{t('listings.filter.sortBy')}</h4>
            <div className={styles.filterChips}>
              {[
                { value: "rating", label: `⭐ ${t('listings.filter.topRated')}` },
                { value: "newest", label: `🆕 ${t('listings.filter.newest')}` },
                { value: "name", label: `🔤 ${t('listings.filter.az')}` },
              ].map((s) => (
                <button
                  key={s.value}
                  className={`${styles.filterChip} ${sortBy === s.value ? styles.filterChipActive : ""}`}
                  onClick={() => setSortBy(s.value as "rating" | "newest" | "name")}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className={styles.resultsBar}>
        <span className={styles.resultsText}>
          {loading ? t('listings.results.searching') : t('listings.results.found').replace('{count}', listings.length.toString())}
        </span>
        {(selectedCategory || search) && (
          <button className={styles.clearFilter} onClick={() => { setSelectedCategory(null); setSearch(""); }}>
            {t('listings.results.clear')} <X size={14} />
          </button>
        )}
      </div>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {loading ? (
          <div className={styles.emptyState}>
            <div className={styles.spinner} />
            <p>{t('common.loading')}</p>
          </div>
        ) : listings.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyTitle}>{t('listings.empty.title')}</p>
            <p className={styles.emptyDesc}>{t('listings.empty.desc')}</p>
            <button className={styles.resetBtn} onClick={() => { setSelectedCategory(null); setSearch(""); }}>
              {t('listings.empty.reset')}
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {listings.map((listing, index) => (
              <Link
                href={`/listing/${listing.id}`}
                key={listing.id}
                className={styles.card}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className={styles.cardImageWrapper}>
                  {listing.image_url ? (
                    <Image
                      src={listing.image_url}
                      alt={listing.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.cardImage}
                      loading="lazy"
                      quality={85}
                    />
                  ) : (
                    <div className={styles.cardImagePlaceholder} />
                  )}
                  <button className={styles.heartBtn} onClick={(e) => e.preventDefault()}>
                    <Heart size={18} />
                  </button>
                  {listing.is_featured && (
                    <span className={styles.featuredBadge}>{t('listings.card.featured')}</span>
                  )}
                  <span className={styles.categoryBadge}>{t(`category.${listing.category.toLowerCase()}`)}</span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <div className={styles.ratingBadge}>
                      <Star size={12} fill="#fbbf24" color="#fbbf24" />
                      <span>{listing.rating}</span>
                    </div>
                    <span className={styles.reviewCount}>({listing.reviews} {t('listings.card.reviews')})</span>
                  </div>

                  <h3 className={styles.cardTitle}>{listing.title}</h3>
                  {listing.subtitle && (
                    <p className={styles.cardSubtitle}>{listing.subtitle}</p>
                  )}

                  {listing.location && (
                    <div className={styles.cardLocation}>
                      <MapPin size={13} />
                      <span>{listing.location}</span>
                    </div>
                  )}

                  <div className={styles.cardFooter}>
                    <span className={styles.cardPrice}>
                      {listing.price ?? t('listing.booking.contactForPrice')}
                    </span>
                    <span className={styles.viewLink}>{t('listings.card.viewDetails')} →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
