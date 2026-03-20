"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase, MonthlyReport, ContactRequest, ProgressChart, Listing } from "@/lib/supabase";
import { BarChart3, MessageSquare, TrendingUp, Calendar } from "lucide-react";
import styles from "./business.module.css";
import Link from "next/link";

export default function BusinessOwnerDashboard() {
  const { user, profile } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [reports, setReports] = useState<MonthlyReport[]>([]);
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [charts, setCharts] = useState<ProgressChart[]>([]);
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
    
    // Fetch contact requests
    const { data: requestsData } = await supabase
      .from('contact_requests')
      .select('*')
      .eq('business_owner_id', user.id)
      .order('created_at', { ascending: false });
    
    // Fetch progress charts
    const { data: chartsData } = await supabase
      .from('progress_charts')
      .select('*')
      .eq('business_owner_id', user.id);
    
    if (listingsData) setListings(listingsData);
    if (reportsData) setReports(reportsData);
    if (requestsData) setRequests(requestsData);
    if (chartsData) setCharts(chartsData);
    
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
        <h1 className={styles.title}>Business Owner Dashboard</h1>
        <p className={styles.subtitle}>Track your performance and communicate with our team</p>
      </header>

      {/* Stats Overview */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#e0f2fe', color: '#0284c7' }}>
            <BarChart3 size={24} />
          </div>
          <div>
            <div className={styles.statValue}>{listings.length}</div>
            <div className={styles.statLabel}>Your Listings</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#fef3c7', color: '#f59e0b' }}>
            <Calendar size={24} />
          </div>
          <div>
            <div className={styles.statValue}>{reports.length}</div>
            <div className={styles.statLabel}>Monthly Reports</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#dbeafe', color: '#3b82f6' }}>
            <MessageSquare size={24} />
          </div>
          <div>
            <div className={styles.statValue}>{requests.filter(r => r.status === 'pending').length}</div>
            <div className={styles.statLabel}>Pending Requests</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#dcfce7', color: '#16a34a' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div className={styles.statValue}>{charts.length}</div>
            <div className={styles.statLabel}>Progress Charts</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={styles.mainGrid}>
        {/* Monthly Reports */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Monthly Work Reports</h2>
          {reports.length === 0 ? (
            <p className={styles.emptyState}>No reports yet. Your admin will add monthly updates here.</p>
          ) : (
            <div className={styles.reportsList}>
              {reports.map(report => (
                <div key={report.id} className={styles.reportCard}>
                  <div className={styles.reportHeader}>
                    <span className={styles.reportMonth}>
                      {new Date(report.month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <div className={styles.reportContent}>
                    <p className={styles.reportWork}>{report.work_completed}</p>
                    <div className={styles.reportStats}>
                      <div className={styles.reportStat}>
                        <span className={styles.reportStatLabel}>AI Mentions</span>
                        <span className={styles.reportStatValue}>{report.ai_mentions}</span>
                      </div>
                      <div className={styles.reportStat}>
                        <span className={styles.reportStatLabel}>Views</span>
                        <span className={styles.reportStatValue}>{report.views}</span>
                      </div>
                      <div className={styles.reportStat}>
                        <span className={styles.reportStatLabel}>Clicks</span>
                        <span className={styles.reportStatValue}>{report.clicks}</span>
                      </div>
                    </div>
                    {report.ranking_improvement && (
                      <div className={styles.reportImprovement}>
                        <strong>Ranking:</strong> {report.ranking_improvement}
                      </div>
                    )}
                    {report.notes && (
                      <div className={styles.reportNotes}>
                        <strong>Notes:</strong> {report.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Contact Form */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact Admin</h2>
          <Link href="/dashboard/business/contact" className={styles.contactBtn}>
            <MessageSquare size={18} />
            Send New Request
          </Link>
          
          <div className={styles.requestsList}>
            <h3 className={styles.subsectionTitle}>Your Requests</h3>
            {requests.length === 0 ? (
              <p className={styles.emptyState}>No requests yet.</p>
            ) : (
              requests.slice(0, 5).map(request => (
                <div key={request.id} className={styles.requestCard}>
                  <div className={styles.requestHeader}>
                    <span className={styles.requestSubject}>{request.subject}</span>
                    <span className={`${styles.requestStatus} ${styles[request.status]}`}>
                      {request.status}
                    </span>
                  </div>
                  <p className={styles.requestMessage}>{request.message}</p>
                  {request.admin_response && (
                    <div className={styles.adminResponse}>
                      <strong>Admin Response:</strong>
                      <p>{request.admin_response}</p>
                    </div>
                  )}
                  <span className={styles.requestDate}>
                    {new Date(request.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Progress Charts */}
      {charts.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Your Progress</h2>
          <div className={styles.chartsGrid}>
            {charts.map(chart => (
              <div key={chart.id} className={styles.chartCard}>
                <h3 className={styles.chartTitle}>{chart.title}</h3>
                {chart.description && (
                  <p className={styles.chartDescription}>{chart.description}</p>
                )}
                <div className={styles.chartPlaceholder}>
                  <BarChart3 size={48} />
                  <p>Chart: {chart.chart_type}</p>
                  <p className={styles.chartDataPoints}>{chart.data.length} data points</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
