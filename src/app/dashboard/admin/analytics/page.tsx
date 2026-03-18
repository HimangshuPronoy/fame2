"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Eye, MousePointer, Search, Sparkles, DollarSign, Users, BarChart3 } from "lucide-react";
import styles from "./analytics.module.css";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

interface ListingPerformance {
  listing_id: string;
  title: string;
  category: string;
  is_featured: boolean;
  total_views: number;
  total_clicks: number;
  search_appearances: number;
  ai_mentions: number;
  views_7d: number;
  views_30d: number;
  last_activity: string;
}

interface BusinessSubscription {
  id: string;
  listing_id: string;
  business_name: string;
  plan_type: string;
  monthly_fee: number;
  status: string;
  start_date: string;
}

export default function AnalyticsPage() {
  const { profile } = useAuth();
  const [performance, setPerformance] = useState<ListingPerformance[]>([]);
  const [subscriptions, setSubscriptions] = useState<BusinessSubscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "all">("30d");

  useEffect(() => {
    if (profile?.role !== "admin") return;
    
    async function fetchAnalytics() {
      setLoading(true);
      
      // Fetch performance data
      const { data: perfData } = await supabase
        .from("listing_performance")
        .select("*")
        .order("total_views", { ascending: false });
      
      if (perfData) setPerformance(perfData as ListingPerformance[]);
      
      // Fetch subscriptions
      const { data: subData } = await supabase
        .from("business_subscriptions")
        .select("*")
        .eq("status", "active");
      
      if (subData) setSubscriptions(subData as BusinessSubscription[]);
      
      setLoading(false);
    }
    
    fetchAnalytics();
  }, [profile]);

  if (profile?.role !== "admin") {
    return (
      <div className={styles.container}>
        <div className={styles.accessDenied}>
          <h2>Access Denied</h2>
          <p>Only administrators can view analytics.</p>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalRevenue = subscriptions.reduce((sum, sub) => sum + Number(sub.monthly_fee), 0);
  const totalClients = subscriptions.length;
  const totalViews = performance.reduce((sum, p) => sum + (timeRange === "7d" ? p.views_7d : timeRange === "30d" ? p.views_30d : p.total_views), 0);
  const totalAIMentions = performance.reduce((sum, p) => sum + p.ai_mentions, 0);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Business Analytics</h1>
          <p className={styles.subtitle}>Track client performance and revenue metrics</p>
        </div>
        <div className={styles.timeRange}>
          <button 
            className={timeRange === "7d" ? styles.active : ""}
            onClick={() => setTimeRange("7d")}
          >
            7 Days
          </button>
          <button 
            className={timeRange === "30d" ? styles.active : ""}
            onClick={() => setTimeRange("30d")}
          >
            30 Days
          </button>
          <button 
            className={timeRange === "all" ? styles.active : ""}
            onClick={() => setTimeRange("all")}
          >
            All Time
          </button>
        </div>
      </header>

      {/* Key Metrics */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ background: "#dcfce7" }}>
            <DollarSign size={24} color="#16a34a" />
          </div>
          <div>
            <p className={styles.metricLabel}>Monthly Revenue</p>
            <h3 className={styles.metricValue}>₮{totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ background: "#dbeafe" }}>
            <Users size={24} color="#2563eb" />
          </div>
          <div>
            <p className={styles.metricLabel}>Active Clients</p>
            <h3 className={styles.metricValue}>{totalClients}</h3>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ background: "#fef3c7" }}>
            <Eye size={24} color="#d97706" />
          </div>
          <div>
            <p className={styles.metricLabel}>Total Views</p>
            <h3 className={styles.metricValue}>{totalViews.toLocaleString()}</h3>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIcon} style={{ background: "#e9d5ff" }}>
            <Sparkles size={24} color="#9333ea" />
          </div>
          <div>
            <p className={styles.metricLabel}>AI Mentions</p>
            <h3 className={styles.metricValue}>{totalAIMentions}</h3>
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            <BarChart3 size={20} />
            Listing Performance
          </h2>
        </div>
        
        {loading ? (
          <p className={styles.loading}>Loading analytics...</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Business</th>
                  <th>Category</th>
                  <th><Eye size={16} /> Views</th>
                  <th><MousePointer size={16} /> Clicks</th>
                  <th><Search size={16} /> Searches</th>
                  <th><Sparkles size={16} /> AI Mentions</th>
                  <th>CTR</th>
                </tr>
              </thead>
              <tbody>
                {performance.map((item) => {
                  const views = timeRange === "7d" ? item.views_7d : timeRange === "30d" ? item.views_30d : item.total_views;
                  const ctr = views > 0 ? ((item.total_clicks / views) * 100).toFixed(1) : "0.0";
                  
                  return (
                    <tr key={item.listing_id}>
                      <td>
                        <Link href={`/listing/${item.listing_id}`} className={styles.businessLink}>
                          {item.title}
                        </Link>
                        {item.is_featured && <span className={styles.featuredBadge}>⭐</span>}
                      </td>
                      <td><span className={styles.categoryTag}>{item.category}</span></td>
                      <td className={styles.number}>{views.toLocaleString()}</td>
                      <td className={styles.number}>{item.total_clicks.toLocaleString()}</td>
                      <td className={styles.number}>{item.search_appearances.toLocaleString()}</td>
                      <td className={styles.number}>
                        <span className={styles.aiMentions}>{item.ai_mentions}</span>
                      </td>
                      <td className={styles.number}>{ctr}%</td>
                    </tr>
                  );
                })}
                {performance.length === 0 && (
                  <tr>
                    <td colSpan={7} className={styles.emptyState}>
                      No analytics data yet. Start tracking by adding listings.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Active Subscriptions */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>
            <TrendingUp size={20} />
            Active Subscriptions
          </h2>
          <Link href="/dashboard/admin/subscriptions" className={styles.manageBtn}>
            Manage
          </Link>
        </div>
        
        <div className={styles.subscriptionGrid}>
          {subscriptions.map((sub) => (
            <div key={sub.id} className={styles.subscriptionCard}>
              <h3>{sub.business_name}</h3>
              <div className={styles.subscriptionDetails}>
                <span className={styles.planBadge}>{sub.plan_type}</span>
                <span className={styles.price}>₮{sub.monthly_fee}/mo</span>
              </div>
              <p className={styles.startDate}>
                Since {new Date(sub.start_date).toLocaleDateString()}
              </p>
            </div>
          ))}
          {subscriptions.length === 0 && (
            <p className={styles.emptyState}>No active subscriptions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
