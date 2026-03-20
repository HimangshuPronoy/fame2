"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Heart, Calendar, Award, Users, Sparkles, History, UserCheck, Search } from "lucide-react";
import Image from "next/image";
import styles from "./user.module.css";
import { useAuth } from "@/lib/auth-context";
import { supabase, Listing } from "@/lib/supabase";

export default function UserDashboard() {
  const { user, profile } = useAuth();
  const [savedListings, setSavedListings] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentListings, setRecentListings] = useState<Listing[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Recent listings
      const { data } = await supabase
        .from("listings")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(4);
      if (user) {
        const { data: saved } = await supabase
          .from("saved_listings")
          .select("listing_id")
          .eq("user_id", user.id);
        if (saved) setSavedListings(saved.map((s: { listing_id: string }) => s.listing_id));
      }

      if (data) setRecentListings(data as Listing[]);
      setLoading(false);
    }
    fetchData();
  }, [user]);



  const displayName = profile?.full_name ?? user?.email?.split("@")[0] ?? "there";


  if (loading) {
    return (
      <div className={styles.container} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <p className={styles.loadingText}>Loading your personalized dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitleGroup}>
          <h1 className={styles.title}>Welcome back, {displayName}</h1>
          <p className={styles.subtitle}>Discover the best of Ulaanbaatar, curated for you.</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/listings" className={styles.primaryBtn}>
            <Search size={18} />
            <span>Explore Now</span>
          </Link>
        </div>
      </header>

      {/* Stats Overview */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Saved Items</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>{savedListings.length}</span>
            </div>
          </div>
          <div className={styles.statIcon} style={{ background: '#fff1f2', color: '#f43f5e' }}>
            <Heart size={24} />
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>My Bookings</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>12</span>
            </div>
          </div>
          <div className={styles.statIcon} style={{ background: '#f0fdf4', color: '#22c55e' }}>
            <Calendar size={24} />
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Total Reviews</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>8</span>
            </div>
          </div>
          <div className={styles.statIcon} style={{ background: '#fefce8', color: '#eab308' }}>
            <Star size={24} />
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Fame Points</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>1,240</span>
            </div>
          </div>
          <div className={styles.statIcon} style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <Award size={24} />
          </div>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        {/* Main Content */}
        <div className={styles.leftCol}>
          <section className={styles.mainSection}>
            <div className={styles.sectionHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} className={styles.sparkleIcon} />
                <h2 className={styles.sectionTitle}>Recommended for You</h2>
              </div>
              <Link href="/listings" className={styles.textLink}>View all recommendations</Link>
            </div>
            
            <div className={styles.recommendationsList}>
              {recentListings.slice(0, 3).map((listing: Listing) => (
                <Link href={`/listing/${listing.id}`} key={listing.id} className={styles.recItem}>
                  <div className={styles.recImgWrapper}>
                    {listing.image_url ? (
                      <Image src={listing.image_url} fill alt={listing.title} className={styles.recImg} />
                    ) : (
                      <div className={styles.imgPlaceholder} />
                    )}
                  </div>
                  <div className={styles.recInfo}>
                    <h4 className={styles.recTitle}>{listing.title}</h4>
                    <span className={styles.recCategory}>{listing.category}</span>
                    <div className={styles.recRating}>
                      <Star size={12} fill="#eab308" color="#eab308" />
                      <span>{listing.rating} ({listing.reviews} reviews)</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.mainSection} style={{ marginTop: '24px' }}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>My Recent Activity</h2>
              <History size={18} className={styles.historyIcon} />
            </div>
            <div className={styles.activityTimeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <p>You bookmarked <strong>Grand Restaurant</strong></p>
                  <span>2 hours ago</span>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <p>Booking confirmed at <strong>Alpha Fitness</strong></p>
                  <span>Yesterday</span>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <p>You left a 5-star review for <strong>Sky Spa</strong></p>
                  <span>3 days ago</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Widgets */}
        <div className={styles.rightCol}>
          <section className={styles.sideWidget + ' ' + styles.aiWidget}>
            <div className={styles.widgetHeader}>
              <Sparkles size={18} className={styles.aiIcon} />
              <h3 className={styles.widgetTitle}>AI Assistant Tips</h3>
            </div>
            <p className={styles.aiText}>Based on your interest in <strong>Gyms</strong>, you might enjoy the new HIIT classes at Alpha Fitness next week!</p>
            <button className={styles.aiActionBtn}>Show More Tips</button>
          </section>

          <section className={styles.sideWidget}>
            <h3 className={styles.widgetTitle}>Quick Access</h3>
            <div className={styles.quickLinks}>
              <Link href="/dashboard/saved" className={styles.quickLink}>
                <Heart size={16} />
                <span>My Saved Items</span>
              </Link>
              <Link href="/dashboard/bookings" className={styles.quickLink}>
                <Calendar size={16} />
                <span>Manage Bookings</span>
              </Link>
              <Link href="/concierge" className={styles.quickLink}>
                <Users size={16} />
                <span>Concierge Service</span>
              </Link>
            </div>
          </section>

          <section className={styles.sideWidget + ' ' + styles.statusWidget}>
            <div className={styles.statusHeader}>
              <div className={styles.userIconWrapper}>
                <UserCheck size={20} />
              </div>
              <div>
                <h4 className={styles.statusName}>Gold Member</h4>
                <p className={styles.statusPoints}>760 points to Platinum</p>
              </div>
            </div>
            <div className={styles.progressBarMini}>
              <div className={styles.progressFillMini} style={{ width: '45%' }} />
            </div>
          </section>

          <section className={styles.sideWidget}>
             <h3 className={styles.widgetTitle}>Member Support</h3>
             <p className={styles.supportText}>Have a question about your membership or bookings?</p>
             <button className={styles.supportBtn}>Contact Support</button>
          </section>
        </div>
      </div>
    </div>
  );
}
