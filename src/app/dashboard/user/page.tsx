"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Heart, Calendar, Award, Users, Sparkles, History, UserCheck, Search } from "lucide-react";
import Image from "next/image";
import styles from "./user.module.css";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { supabase, Listing } from "@/lib/supabase";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

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

  const [pointsHistory, setPointsHistory] = useState<{ name: string; points: number }[]>([]);
  const [categoryInterest, setCategoryInterest] = useState<{ name: string; value: number; color: string }[]>([]);

  useEffect(() => {
    const TIMEOUT_MS = 8000; // 8 second timeout safety
    let isMounted = true;

    async function fetchData() {
      if (!user) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      
      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Request timed out")), TIMEOUT_MS)
      );

      try {
        // Wrap fetching in a timeout
        const dataFetch = (async () => {
          // 1. Fetch counts & Data for Charts
          const [savedRes, bookingsRes, reviewsRes] = await Promise.all([
            supabase.from("saved_listings").select("listing_id, listings(title, category)").eq("user_id", user.id),
            supabase.from("bookings").select("id, created_at, listings(title)").eq("user_id", user.id),
            supabase.from("reviews").select("id, created_at, listing_id, rating, listings(title, category)").eq("user_id", user.id)
          ]);

          if (!isMounted) return;

          // Process Counts
          setSavedCount(savedRes.data?.length || 0);
          setBookingsCount(bookingsRes.data?.length || 0);
          setReviewsCount(reviewsRes.data?.length || 0);
          
          const currentPoints = (reviewsRes.data?.length || 0) * 100 + (bookingsRes.data?.length || 0) * 50;
          setFamePoints(currentPoints);

          // 2. Process Points History (Last 4 months)
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const now = new Date();
          const history = [];
          
          for (let i = 3; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const mName = months[d.getMonth()];
            
            // Calculate points for this month and earlier
            // history needs cumulative points
            const monthDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
            
            const reviewsCountUpTo = reviewsRes.data?.filter(r => new Date(r.created_at) <= monthDate).length || 0;
            const bookingsCountUpTo = bookingsRes.data?.filter(b => new Date(b.created_at) <= monthDate).length || 0;
            
            history.push({
              name: mName,
              points: (reviewsCountUpTo * 100) + (bookingsCountUpTo * 50)
            });
          }
          setPointsHistory(history);

          // 3. Process Category Interests
          const categories: Record<string, number> = {};
          
          // Count from saved listings
          savedRes.data?.forEach(item => {
            const listingsData = item.listings;
            const cat = Array.isArray(listingsData) 
              ? (listingsData[0] as { category: string } | undefined)?.category 
              : (listingsData as { category: string } | null)?.category;
            
            if (cat) categories[cat] = (categories[cat] || 0) + 1;
          });
          
          // Count from reviews (weighted more)
          reviewsRes.data?.forEach(item => {
            const listingsData = item.listings;
            const cat = Array.isArray(listingsData) 
              ? (listingsData[0] as { category: string } | undefined)?.category 
              : (listingsData as { category: string } | null)?.category;
            
            if (cat) categories[cat] = (categories[cat] || 0) + 2;
          });

          const colors = ['#3b82f6', '#10b981', '#f43f5e', '#eab308', '#a855f7', '#f97316'];
          const interestArray = Object.entries(categories)
            .map(([name, value], index) => ({
              name: t(`category.${name.toLowerCase()}`) || name,
              value,
              color: colors[index % colors.length]
            }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 4);

          // Fallback if no interests yet
          if (interestArray.length === 0) {
            interestArray.push({ name: t('dashboard.user.activity.empty'), value: 1, color: '#CBD5E1' });
          }
          setCategoryInterest(interestArray);

          // 4. Fetch recent listings (recommendations)
          const { data: listingsData } = await supabase
            .from("listings")
            .select("*")
            .eq("is_active", true)
            .order("created_at", { ascending: false })
            .limit(3);
          
          if (listingsData && isMounted) setRecentListings(listingsData as Listing[]);

          // 5. Build activity timeline
          const combinedActivity: Activity[] = [
            ...(bookingsRes.data || []).map(b => {
              const bWithListings = b as unknown as { id: string; created_at: string; listings?: { title: string } | { title: string }[] };
              const listingsData = bWithListings.listings;
              const title = Array.isArray(listingsData)
                ? (listingsData[0] as { title: string } | undefined)?.title
                : (listingsData as { title: string } | undefined)?.title;
                
              return {
                id: `b-${b.id}`,
                type: 'booking' as const,
                content: t('dashboard.user.activity.bookingConfirmed').replace('{title}', title || t('common.listing')),
                date: b.created_at
              };
            }),
            ...(reviewsRes.data || []).map(r => {
              const rWithListings = r as unknown as { id: string; created_at: string; rating?: number; listings?: { title: string } | { title: string }[] };
              const listingsData = rWithListings.listings;
              const title = Array.isArray(listingsData)
                ? (listingsData[0] as { title: string } | undefined)?.title
                : (listingsData as { title: string } | undefined)?.title;
                
              return {
                id: `r-${r.id}`,
                type: 'review' as const,
                content: t('dashboard.user.activity.reviewLeft')
                  .replace('{rating}', rWithListings.rating?.toString() || '5')
                  .replace('{title}', title || t('common.listing')),
                date: r.created_at
              };
            })
          ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);

          if (isMounted) setActivities(combinedActivity);
        })();

        await Promise.race([dataFetch, timeoutPromise]);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => { isMounted = false; };
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

      {/* Analytics Section */}
      <section className={styles.analyticsSection}>
        <div className={styles.chartCard}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Points Growth</h2>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={pointsHistory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    fontSize: '12px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="points" 
                  stroke="var(--accent)" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: 'var(--accent)', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Interests</h2>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={categoryInterest}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryInterest.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    fontSize: '12px'
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

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
