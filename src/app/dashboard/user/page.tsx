"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Send, ExternalLink, MapPin, Star, TrendingUp, BarChart3, Globe, Copy, Check, Heart, Calendar, Award, Users } from "lucide-react";
import Image from "next/image";
import styles from "./user.module.css";
import { useAuth } from "@/lib/auth-context";
import { supabase, Listing } from "@/lib/supabase";

export default function UserDashboard() {
  const { user, profile } = useAuth();
  const [requestSent, setRequestSent] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [recentListings, setRecentListings] = useState<Listing[]>([]);
  const [savedListings, setSavedListings] = useState<string[]>([]);
  const [totalListings, setTotalListings] = useState(0);
  const [featuredCount, setFeaturedCount] = useState(0);
  const [categoryBreakdown, setCategoryBreakdown] = useState<{category: string; count: number}[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [topRatedListings, setTopRatedListings] = useState<Listing[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Totals
      const { count: activeCount } = await supabase
        .from("listings")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      const { count: featCount } = await supabase
        .from("listings")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true)
        .eq("is_featured", true);

      // Category breakdown
      const { data: allListings } = await supabase
        .from("listings")
        .select("category")
        .eq("is_active", true);

      if (allListings) {
        const counts: Record<string, number> = {};
        allListings.forEach((l: { category: string }) => {
          counts[l.category] = (counts[l.category] || 0) + 1;
        });
        const sorted = Object.entries(counts)
          .map(([category, count]) => ({ category, count }))
          .sort((a, b) => b.count - a.count);
        setCategoryBreakdown(sorted);
      }

      // Recent listings
      const { data } = await supabase
        .from("listings")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(4);

      // Top rated listings
      const { data: topRated } = await supabase
        .from("listings")
        .select("*")
        .eq("is_active", true)
        .order("rating", { ascending: false })
        .limit(3);

      // Saved listings for user
      if (user) {
        const { data: saved } = await supabase
          .from("saved_listings")
          .select("listing_id")
          .eq("user_id", user.id);
        if (saved) setSavedListings(saved.map(s => s.listing_id));
      }

      if (activeCount !== null) setTotalListings(activeCount);
      if (featCount !== null) setFeaturedCount(featCount);
      if (data) setRecentListings(data as Listing[]);
      if (topRated) setTopRatedListings(topRated as Listing[]);
      setLoading(false);
    }
    fetchData();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;
    setRequestSent(true);
    setTimeout(() => { setRequestSent(false); setRequestText(""); }, 3000);
  };

  const copyProfileLink = () => {
    navigator.clipboard.writeText(`https://fame.app/u/${user?.id ?? ""}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const displayName = profile?.full_name ?? user?.email?.split("@")[0] ?? "there";
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "—";

  return (
    <div className={styles.container}>
      {/* Welcome Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, {displayName} 👋</h1>
          <p className={styles.subtitle}>Discover premium experiences curated just for you</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/dashboard/create-listing" className={styles.secondaryBtn}>
            <TrendingUp size={16} /> Create Listing
          </Link>
          <Link href="/listings" className={styles.primaryBtn}>
            <Globe size={16} /> Explore Listings
          </Link>
        </div>
      </header>

      {/* Stats Row */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statEmoji}>
            <BarChart3 size={22} className={styles.statIcon} style={{ color: '#3b82f6' }} />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statValue}>{loading ? "..." : totalListings}</h3>
            <p className={styles.statLabel}>Active Listings</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statEmoji}>
            <Award size={22} className={styles.statIcon} style={{ color: '#f59e0b' }} />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statValue}>{loading ? "..." : featuredCount}</h3>
            <p className={styles.statLabel}>Featured</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statEmoji}>
            <Heart size={22} className={styles.statIcon} style={{ color: '#ef4444' }} />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statValue}>{loading ? "..." : savedListings.length}</h3>
            <p className={styles.statLabel}>Saved</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statEmoji}>
            <Calendar size={22} className={styles.statIcon} style={{ color: '#10b981' }} />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statValue} style={{ fontSize: '0.95rem' }}>{memberSince}</h3>
            <p className={styles.statLabel}>Member Since</p>
          </div>
        </div>
      </section>

      <div className={styles.mainGrid}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          {/* Top Rated Listings */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>⭐ Top Rated</h2>
              <Link href="/listings?sort=rating" className={styles.linkBtn}>View All <ExternalLink size={14} /></Link>
            </div>
            <div className={styles.topRatedList}>
              {loading ? (
                <p className={styles.loadingText}>Loading...</p>
              ) : topRatedListings.length === 0 ? (
                <p className={styles.loadingText}>No listings yet.</p>
              ) : (
                topRatedListings.map((listing, idx) => (
                  <Link href={`/listing/${listing.id}`} key={listing.id} className={styles.topRatedItem}>
                    <div className={styles.rankBadge}>#{idx + 1}</div>
                    <div className={styles.topRatedImgWrapper}>
                      {listing.image_url ? (
                        <Image src={listing.image_url} fill alt={listing.title} className={styles.topRatedImg} sizes="80px" />
                      ) : (
                        <div style={{ background: "#f1f5f9", width: "100%", height: "100%", borderRadius: 10 }} />
                      )}
                    </div>
                    <div className={styles.topRatedDetails}>
                      <h4>{listing.title}</h4>
                      <div className={styles.topRatedMeta}>
                        <span className={styles.ratingBadge}>
                          <Star size={11} fill="#fbbf24" color="#fbbf24" /> {listing.rating}
                        </span>
                        <span className={styles.categoryTag}>{listing.category}</span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>📊 Category Breakdown</h2>
            <div className={styles.breakdownList}>
              {loading ? (
                <p className={styles.loadingText}>Loading...</p>
              ) : categoryBreakdown.length === 0 ? (
                <p className={styles.loadingText}>No data yet.</p>
              ) : (
                categoryBreakdown.map((item) => (
                  <div key={item.category} className={styles.breakdownRow}>
                    <div className={styles.breakdownLeft}>
                      <span className={styles.breakdownLabel}>{item.category}</span>
                      <span className={styles.breakdownCount}>{item.count} listings</span>
                    </div>
                    <div className={styles.breakdownBar}>
                      <div
                        className={styles.breakdownFill}
                        style={{ width: `${(item.count / totalListings) * 100}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Service Request */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>💬 Request Services</h2>
            <p className={styles.cardDesc}>
              Need photography, marketing, or profile upgrades? Drop us a message.
            </p>
            {requestSent ? (
              <div className={styles.successMessage}>
                <h3 className={styles.successTitle}>✅ Request Sent!</h3>
                <p className={styles.successDesc}>The Fame team will contact you shortly.</p>
                <button onClick={() => setRequestSent(false)} className={styles.buttonOutline}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <textarea
                  className={styles.textarea}
                  placeholder="Describe what you need help with..."
                  rows={3}
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  required
                />
                <button type="submit" className={styles.button} disabled={!requestText.trim()}>
                  <Send size={16} /> Submit Request
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          {/* Recent Listings */}
          <div className={`${styles.card} ${styles.hFull}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>🆕 Recent Listings</h2>
              <Link href="/listings" className={styles.linkBtn}>View All <ExternalLink size={14} /></Link>
            </div>
            <div className={styles.listingsList}>
              {loading && <p className={styles.loadingText}>Loading...</p>}
              {!loading && recentListings.length === 0 && (
                <p className={styles.loadingText}>No listings yet.</p>
              )}
              {recentListings.map((listing) => (
                <Link href={`/listing/${listing.id}`} key={listing.id} className={styles.listingItem}>
                  <div className={styles.listingImgWrapper}>
                    {listing.image_url ? (
                      <Image src={listing.image_url} fill alt={listing.title} className={styles.listingImg} sizes="64px" />
                    ) : (
                      <div style={{ background: "#f1f5f9", width: "100%", height: "100%", borderRadius: 10 }} />
                    )}
                  </div>
                  <div className={styles.listingDetails}>
                    <h4>{listing.title}</h4>
                    <p>
                      {listing.location && <><MapPin size={11} style={{ display: 'inline', marginRight: 2 }} />{listing.location}</>}
                    </p>
                    <div className={styles.listingMetrics}>
                      <span><Star size={10} fill="#fbbf24" color="#fbbf24" style={{ display: 'inline', marginRight: 2 }} />{listing.rating}</span>
                      <span>•</span>
                      <span className={styles.activeTag}>{listing.is_featured ? "Featured" : "Active"}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Account Info */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>👤 Your Account</h2>
              <button onClick={copyProfileLink} className={styles.copyBtn}>
                {copiedLink ? <Check size={14} /> : <Copy size={14} />}
                {copiedLink ? "Copied!" : "Copy Link"}
              </button>
            </div>
            <div className={styles.accountGrid}>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>Email</span>
                <span className={styles.accountValue}>{user?.email ?? "—"}</span>
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>Role</span>
                <span className={styles.accountValue} style={{ textTransform: 'capitalize' }}>{profile?.role ?? "user"}</span>
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>Name</span>
                <span className={styles.accountValue}>{profile?.full_name ?? "Not set"}</span>
              </div>
              <div className={styles.accountRow}>
                <span className={styles.accountLabel}>User ID</span>
                <span className={styles.accountValue} style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{user?.id?.slice(0, 12)}...</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>⚡ Quick Actions</h2>
            <div className={styles.quickActions}>
              <Link href="/dashboard/my-listings" className={styles.quickAction}>
                <BarChart3 size={18} /> My Listings
              </Link>
              <Link href="/listings" className={styles.quickAction}>
                <Globe size={18} /> Browse Listings
              </Link>
              <Link href="/concierge" className={styles.quickAction}>
                <Users size={18} /> Concierge Service
              </Link>
              {profile?.role === "admin" && (
                <Link href="/dashboard/admin" className={styles.quickAction}>
                  <BarChart3 size={18} /> Admin Panel
                </Link>
              )}
              <Link href="/" className={styles.quickAction}>
                <TrendingUp size={18} /> Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
