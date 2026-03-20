"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase, Listing, MonthlyReport } from "@/lib/supabase";
import { BarChart3, MessageSquare, TrendingUp, Calendar, CheckCircle2, Target, Share2, Clock, Plus } from "lucide-react";
import styles from "./business.module.css";
import Link from "next/link";

export default function BusinessOwnerDashboard() {
  const { user, profile } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [reports, setReports] = useState<MonthlyReport[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user?.id) return;
    
    setLoading(true);
    
    // Fetch business owner's listings
    const { data: listingsData } = await supabase
      .from('listings')
      .select('*')
      .eq('business_owner_id', user.id);
    
    // Fetch monthly reports
    const { data: reportsData } = await supabase
      .from('monthly_reports')
      .select('*')
      .eq('business_owner_id', user.id)
      .order('month', { ascending: false })
      .limit(6);
    
    if (listingsData) setListings(listingsData);
    if (reportsData) setReports(reportsData);
    
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user && profile?.role === 'business_owner') {
      fetchData();
    }
  }, [user, profile, fetchData]);

  // Access denied for non-business owners
  if (!user || profile?.role !== 'business_owner') {
    return (
      <div className={styles.container}>
        <div className={styles.accessDenied}>
          <h2>Access Denied</h2>
          <p>This dashboard is only for business owners.</p>
          <Link href="/dashboard" className={styles.backBtn}>Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
            <header className={styles.header}>
        <div className={styles.headerTitleGroup}>
          <h1 className={styles.title}>Welcome back, {profile?.full_name?.split(" ")[0]}</h1>
          <p className={styles.subtitle}>Here&apos;s what&apos;s happening with your business today.</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.primaryBtn}>
            <Plus size={18} />
            <span>Add New Listing</span>
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Total Views</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>{listings.reduce((acc, curr) => acc + (curr.views || 0), 0) || '1,284'}</span>
              <span className={styles.statChange + ' ' + styles.up}>
                <TrendingUp size={12} />
                12.5%
              </span>
            </div>
          </div>
          <div className={styles.statIcon} style={{ background: '#eff6ff', color: '#3b82f6' }}>
            <BarChart3 size={24} />
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>AI Mentions</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>{reports.reduce((acc, curr) => acc + curr.ai_mentions, 0) || '42'}</span>
              <span className={styles.statChange + ' ' + styles.up}>
                <TrendingUp size={12} />
                8.2%
              </span>
            </div>
          </div>
          <div className={styles.statIcon} style={{ background: '#f0fdf4', color: '#22c55e' }}>
            <Target size={24} />
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Social Growth</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>+856</span>
              <span className={styles.statChange + ' ' + styles.up}>
                <TrendingUp size={12} />
                24%
              </span>
            </div>
          </div>
          <div className={styles.statIcon} style={{ background: '#faf5ff', color: '#a855f7' }}>
            <Share2 size={24} />
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Conversion Rate</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>3.2%</span>
              <span className={styles.statChange + ' ' + styles.up}>
                <TrendingUp size={12} />
                1.4%
              </span>
            </div>
          </div>
          <div className={styles.statIcon} style={{ background: '#fff7ed', color: '#f97316' }}>
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        {/* Main Analytics Content */}
        <div className={styles.leftCol}>
          <section className={styles.mainSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Performance Analytics</h2>
              <div className={styles.rangeTabs}>
                <button className={styles.rangeTab + ' ' + styles.active}>Weekly</button>
                <button className={styles.rangeTab}>Monthly</button>
                <button className={styles.rangeTab}>Yearly</button>
              </div>
            </div>
            
            <div className={styles.chartPlaceholderLarge}>
              <div className={styles.customChart}>
                {/* Mock Chart Lines */}
                <svg width="100%" height="200" viewBox="0 0 800 200" preserveAspectRatio="none">
                  <path d="M0,150 Q200,120 400,160 T800,80" fill="none" stroke="#3b82f6" strokeWidth="3" />
                  <path d="M0,180 Q200,160 400,170 T800,120" fill="none" stroke="#a855f7" strokeWidth="3" opacity="0.5" />
                </svg>
                <div className={styles.chartLabels}>
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </div>

            <div className={styles.summaryTableWrapper}>
              <table className={styles.summaryTable}>
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Views</th>
                    <th>Clicks</th>
                    <th>Conversion</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Google Search</td>
                    <td>842</td>
                    <td>124</td>
                    <td>14.7%</td>
                    <td className={styles.up}><TrendingUp size={14} /></td>
                  </tr>
                  <tr>
                    <td>AI Mentions (ChatGPT/Claude)</td>
                    <td>312</td>
                    <td>56</td>
                    <td>17.9%</td>
                    <td className={styles.up}><TrendingUp size={14} /></td>
                  </tr>
                  <tr>
                    <td>Instagram/Meta</td>
                    <td>421</td>
                    <td>32</td>
                    <td>7.6%</td>
                    <td className={styles.up}><TrendingUp size={14} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.mainSection} style={{ marginTop: '24px' }}>
            <h2 className={styles.sectionTitle}>Monthly Work Reports</h2>
            {reports.length === 0 ? (
              <p className={styles.emptyState}>No reports yet. Your admin will add monthly updates here.</p>
            ) : (
              <div className={styles.reportsList}>
                {reports.slice(0, 2).map(report => (
                  <div key={report.id} className={styles.reportItem}>
                    <div className={styles.reportDate}>
                      <Calendar size={16} />
                      {new Date(report.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </div>
                    <p className={styles.reportDescription}>{report.work_completed}</p>
                    <div className={styles.reportPills}>
                      <span className={styles.reportPill}><TrendingUp size={12} /> {report.ai_mentions} AI Mentions</span>
                      <span className={styles.reportPill}><Clock size={12} /> {report.views} Views</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Actionable Sidebar Content */}
        <div className={styles.rightCol}>
          <section className={styles.sideWidget}>
            <div className={styles.widgetHeader}>
              <Target size={18} className={styles.widgetIcon} />
              <h3 className={styles.widgetTitle}>This Month&apos;s Plan</h3>
            </div>
            <div className={styles.planProgress}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '65%' }} />
              </div>
              <span className={styles.progressText}>65% Completed</span>
            </div>
            <ul className={styles.taskList}>
              <li className={styles.taskItem}>
                <CheckCircle2 size={16} className={styles.taskDone} />
                <span>Optimize Google Business Profile</span>
              </li>
              <li className={styles.taskItem}>
                <CheckCircle2 size={16} className={styles.taskDone} />
                <span>Index new services for AI</span>
              </li>
              <li className={styles.taskItem}>
                <div className={styles.taskBullet} />
                <span>Shoot social media content</span>
              </li>
            </ul>
          </section>

          <section className={styles.sideWidget}>
            <div className={styles.widgetHeader}>
              <Clock size={18} className={styles.widgetIcon} />
              <h3 className={styles.widgetTitle}>Currently Doing</h3>
            </div>
            <div className={styles.activeTask}>
              <div className={styles.activeTaskPulse} />
              <div className={styles.activeTaskInfo}>
                <span className={styles.activeTaskName}>SEO Content Writing</span>
                <span className={styles.activeTaskSub}>For &quot;Best Gym in UB&quot;</span>
              </div>
            </div>
          </section>

          <section className={styles.sideWidget + ' ' + styles.contactWidget}>
            <h3 className={styles.widgetTitle}>Need Help?</h3>
            <p className={styles.contactText}>Your dedicated manager is online. Send a direct request.</p>
            <Link href="/dashboard/business/contact" className={styles.contactActionBtn}>
              <MessageSquare size={16} />
              <span>Send Message</span>
            </Link>
          </section>

          <section className={styles.sideWidget}>
            <h3 className={styles.widgetTitle}>Recent Activity</h3>
            <div className={styles.activityList}>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}><Plus size={14} /></div>
                <div className={styles.activityInfo}>
                  <p>Added 5 new photos</p>
                  <span>2 hours ago</span>
                </div>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}><Share2 size={14} /></div>
                <div className={styles.activityInfo}>
                  <p>Social accounts linked</p>
                  <span>Yesterday</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
