"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Heart, Calendar, Award, Users, Sparkles, History, UserCheck, Search } from "lucide-react";
import Image from "next/image";
import styles from "./user.module.css";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { supabase, Listing } from "@/lib/supabase";

interface Activity {
  id: string;
  type: 'booking' | 'review';
  content: string;
  date: string;
}

export default function UserDashboard() {
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const [savedCount, setSavedCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [famePoints, setFamePoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [recentListings, setRecentListings] = useState<Listing[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (!user) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      
      try {
        // 1. Fetch counts
        const [savedRes, bookingsRes, reviewsRes] = await Promise.all([
          supabase.from("saved_listings").select("id", { count: 'exact', head: true }).eq("user_id", user.id),
          supabase.from("bookings").select("id", { count: 'exact', head: true }).eq("user_id", user.id),
          supabase.from("reviews").select("id", { count: 'exact', head: true }).eq("user_id", user.id)
        ]);

        if (savedRes.count !== null) setSavedCount(savedRes.count);
        if (bookingsRes.count !== null) setBookingsCount(bookingsRes.count);
        if (reviewsRes.count !== null) setReviewsCount(reviewsRes.count);
        
        // Fame points (Mock logic for now, could be based on reviews/bookings)
        setFamePoints((reviewsRes.count || 0) * 100 + (bookingsRes.count || 0) * 50);

        // 2. Fetch recent listings (recommendations)
        const { data: listingsData } = await supabase
          .from("listings")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false })
          .limit(3);
        
        if (listingsData) setRecentListings(listingsData as Listing[]);

        // 3. Fetch simulated activity (since we don't have a dedicated activity table yet)
        const { data: recentBookings } = await supabase
          .from("bookings")
          .select("*, listings(title)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(2);
          
        const { data: recentReviews } = await supabase
          .from("reviews")
          .select("*, listings(title)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(2);

        const combinedActivity: Activity[] = [
          ...(recentBookings || []).map(b => ({
            id: `b-${b.id}`,
            type: 'booking' as const,
            content: t('dashboard.user.activity.bookingConfirmed').replace('{title}', b.listings?.title || ''),
            date: b.created_at
          })),
          ...(recentReviews || []).map(r => ({
            id: `r-${r.id}`,
            type: 'review' as const,
            content: t('dashboard.user.activity.reviewLeft')
              .replace('{rating}', r.rating.toString())
              .replace('{title}', r.listings?.title || ''),
            date: r.created_at
          }))
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setActivities(combinedActivity);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    if (user) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user, t]);

  const displayName = profile?.full_name ?? user?.email?.split("@")[0] ?? "there";

  if (loading) {
    return (
      <div className={styles.container} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <p className={styles.loadingText}>{t('dashboard.loading')}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitleGroup}>
          <h1 className={styles.title}>{t('dashboard.user.welcome').replace('{name}', displayName)}</h1>
          <p className={styles.subtitle}>{t('dashboard.user.subtitle')}</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/listings" className={styles.primaryBtn}>
            <Search size={18} />
            <span>{t('dashboard.user.explore')}</span>
          </Link>
        </div>
      </header>

      {/* Stats Overview */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>{t('dashboard.user.stats.saved')}</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>{savedCount}</span>
            </div>
          </div>
          <div className={styles.statIcon} style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e' }}>
            <Heart size={24} />
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>{t('dashboard.user.stats.bookings')}</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>{bookingsCount}</span>
            </div>
          </div>
          <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
            <Calendar size={24} />
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>{t('dashboard.user.stats.reviews')}</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>{reviewsCount}</span>
            </div>
          </div>
          <div className={styles.statIcon} style={{ background: 'rgba(234, 179, 8, 0.1)', color: '#eab308' }}>
            <Star size={24} />
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>{t('dashboard.user.stats.points')}</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>{famePoints.toLocaleString()}</span>
            </div>
          </div>
          <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
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
                <h2 className={styles.sectionTitle}>{t('dashboard.user.recommendations.title')}</h2>
              </div>
              <Link href="/listings" className={styles.textLink}>{t('dashboard.user.recommendations.viewAll')}</Link>
            </div>
            
            <div className={styles.recommendationsList}>
              {recentListings.map((listing: Listing) => (
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
                      <span>{listing.rating} ({listing.reviews} {t('listing.reviews')})</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.mainSection} style={{ marginTop: '24px' }}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('dashboard.user.activity.title')}</h2>
              <History size={18} className={styles.historyIcon} />
            </div>
            <div className={styles.activityTimeline}>
              {activities.length > 0 ? activities.map((activity) => (
                <div key={activity.id} className={styles.timelineItem}>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineContent}>
                    <p>{activity.content}</p>
                    <span>{new Date(activity.date).toLocaleDateString()}</span>
                  </div>
                </div>
              )) : (
                <p className={styles.emptyActivity}>{t('dashboard.user.activity.empty')}</p>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Widgets */}
        <div className={styles.rightCol}>
          <section className={styles.sideWidget + ' ' + styles.aiWidget}>
            <div className={styles.widgetHeader}>
              <Sparkles size={18} className={styles.aiIcon} />
              <h3 className={styles.widgetTitle}>{t('dashboard.user.aiTips.title')}</h3>
            </div>
            <p className={styles.aiText} dangerouslySetInnerHTML={{ __html: t('dashboard.user.aiTips.fitnessTip') }} />
            <button className={styles.aiActionBtn}>{t('dashboard.user.aiTips.showMore')}</button>
          </section>

          <section className={styles.sideWidget}>
            <h3 className={styles.widgetTitle}>{t('dashboard.user.quickAccess.title')}</h3>
            <div className={styles.quickLinks}>
              <Link href="/dashboard/saved" className={styles.quickLink}>
                <Heart size={16} />
                <span>{t('dashboard.nav.savedItems')}</span>
              </Link>
              <Link href="/dashboard/bookings" className={styles.quickLink}>
                <Calendar size={16} />
                <span>{t('dashboard.nav.myBookings')}</span>
              </Link>
              <Link href="/concierge" className={styles.quickLink}>
                <Users size={16} />
                <span>{t('dashboard.user.quickAccess.concierge')}</span>
              </Link>
            </div>
          </section>

          <section className={styles.sideWidget + ' ' + styles.statusWidget}>
            <div className={styles.statusHeader}>
              <div className={styles.userIconWrapper}>
                <UserCheck size={20} />
              </div>
              <div>
                <h4 className={styles.statusName}>{t('dashboard.user.status.title')}</h4>
                <p className={styles.statusPoints}>
                  {famePoints < 1000 
                    ? t('dashboard.user.status.points').replace('{points}', (1000 - famePoints).toString()).replace('{nextLevel}', 'Gold')
                    : famePoints < 5000
                    ? t('dashboard.user.status.points').replace('{points}', (5000 - famePoints).toString()).replace('{nextLevel}', 'Platinum')
                    : 'Elite Member'}
                </p>
              </div>
            </div>
            <div className={styles.progressBarMini}>
              <div className={styles.progressFillMini} style={{ width: `${Math.min(100, (famePoints % 1000) / 10)}%` }} />
            </div>
          </section>

          <section className={styles.sideWidget}>
             <h3 className={styles.widgetTitle}>{t('dashboard.user.support.title')}</h3>
             <p className={styles.supportText}>{t('dashboard.user.support.text')}</p>
             <button className={styles.supportBtn}>{t('dashboard.user.support.button')}</button>
          </section>
        </div>
      </div>
    </div>
  );
}
