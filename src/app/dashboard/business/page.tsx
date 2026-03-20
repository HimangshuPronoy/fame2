"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { supabase, Listing, MonthlyReport } from "@/lib/supabase";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { BarChart3, MessageSquare, TrendingUp, Calendar, CheckCircle2, Target, Share2, Clock, Plus } from "lucide-react";
import styles from "./business.module.css";
import Link from "next/link";

export default function BusinessOwnerDashboard() {
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const [listings, setListings] = useState<Listing[]>([]);
  const [reports, setReports] = useState<MonthlyReport[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    
    try {
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
    } catch (error) {
      console.error("Error fetching business dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Map reports to chart data
  const chartData = reports.length > 0 
    ? [...reports].reverse().map(r => ({
        name: r.month.split('-')[1] + '/' + r.month.split('-')[0].slice(2),
        views: r.views,
        clicks: r.clicks,
        mentions: r.ai_mentions
      }))
    : [
        { name: 'Jan', views: 400, clicks: 240, mentions: 12 },
        { name: 'Feb', views: 300, clicks: 139, mentions: 22 },
        { name: 'Mar', views: 200, clicks: 980, mentions: 15 },
        { name: 'Apr', views: 278, clicks: 390, mentions: 28 },
      ];

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
          <h2>{t('common.error')}</h2>
          <p>{t('dashboard.business.reports.empty')}</p>
          <Link href="/dashboard" className={styles.backBtn}>{t('common.back')}</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>{t('dashboard.loading')}</div>
      </div>
    );
  }

  // Derive stats
  const totalViews = listings.reduce((acc: number, curr: Listing) => acc + (curr.views || 0), 0);
  const totalAiMentions = reports.reduce((acc: number, curr: MonthlyReport) => acc + curr.ai_mentions, 0);
  const avgConversion = listings.length > 0 ? (listings.reduce((acc: number, curr: Listing) => acc + (curr.clicks || 0), 0) / (totalViews || 1) * 100).toFixed(1) : '0.0';

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitleGroup}>
          <h1 className={styles.title}>{t('dashboard.business.welcome').replace('{name}', profile?.full_name?.split(" ")[0] || "Business Owner")}</h1>
          <p className={styles.subtitle}>{t('dashboard.business.subtitle')}</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/dashboard/create-listing" className={styles.primaryBtn}>
            <Plus size={18} />
            <span>{t('dashboard.business.addNew')}</span>
          </Link>
        </div>
      </header>

      {/* Stats Overview */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>{t('dashboard.business.stats.views')}</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>{totalViews.toLocaleString()}</span>
              {totalViews > 0 && (
                <span className={styles.statChange + ' ' + styles.up}>
                  <TrendingUp size={12} />
                  12.5%
                </span>
              )}
            </div>
          </div>
          <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <BarChart3 size={24} />
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>{t('dashboard.business.stats.mentions')}</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>{totalAiMentions}</span>
              {totalAiMentions > 0 && (
                <span className={styles.statChange + ' ' + styles.up}>
                  <TrendingUp size={12} />
                  8.2%
                </span>
              )}
            </div>
          </div>
          <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
            <Target size={24} />
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>{t('dashboard.business.stats.growth')}</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>+{(totalViews * 0.15).toFixed(0)}</span>
              <span className={styles.statChange + ' ' + styles.up}>
                <TrendingUp size={12} />
                24%
              </span>
            </div>
          </div>
          <div className={styles.statIcon} style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
            <Share2 size={24} />
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>{t('dashboard.business.stats.conversion')}</span>
            <div className={styles.statValueGroup}>
              <span className={styles.statValue}>{avgConversion}%</span>
              <span className={styles.statChange + ' ' + styles.up}>
                <TrendingUp size={12} />
                1.4%
              </span>
            </div>
          </div>
          <div className={styles.statIcon} style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316' }}>
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        {/* Main Analytics Content */}
        <div className={styles.leftCol}>
          <section className={styles.mainSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('dashboard.business.analytics.title')}</h2>
              <div className={styles.rangeTabs}>
                <button className={styles.rangeTab + ' ' + styles.active}>{t('dashboard.business.analytics.weekly')}</button>
                <button className={styles.rangeTab}>{t('dashboard.business.analytics.monthly')}</button>
                <button className={styles.rangeTab}>{t('dashboard.business.analytics.yearly')}</button>
              </div>
            </div>
            
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
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
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Area 
                    type="monotone" 
                    dataKey="views" 
                    stroke="var(--accent)" 
                    fillOpacity={1} 
                    fill="url(#colorViews)" 
                    strokeWidth={3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="clicks" 
                    stroke="#a855f7" 
                    fillOpacity={1} 
                    fill="url(#colorClicks)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.sectionHeader} style={{ marginTop: '32px' }}>
              <h2 className={styles.sectionTitle}>AI Mentions & Social Growth</h2>
            </div>
            
            <div className={styles.chartContainer} style={{ height: '250px', marginBottom: '32px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
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
                    cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                      fontSize: '12px'
                    }} 
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="mentions" name="AI Mentions" fill="var(--accent)" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.summaryTableWrapper}>
              <table className={styles.summaryTable}>
                <thead>
                  <tr>
                    <th>{t('dashboard.business.table.source')}</th>
                    <th>{t('dashboard.business.table.views')}</th>
                    <th>{t('dashboard.business.table.clicks')}</th>
                    <th>{t('dashboard.business.table.conversion')}</th>
                    <th>{t('dashboard.business.table.trend')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{t('business.analytics.google')}</td>
                    <td>842</td>
                    <td>124</td>
                    <td>14.7%</td>
                    <td className={styles.up}><TrendingUp size={14} /></td>
                  </tr>
                  <tr>
                    <td>AI Mentions (ChatGPT/Claude)</td>
                    <td>{totalAiMentions}</td>
                    <td>{(totalAiMentions * 0.45).toFixed(0)}</td>
                    <td>45.0%</td>
                    <td className={styles.up}><TrendingUp size={14} /></td>
                  </tr>
                  <tr>
                    <td>{t('business.analytics.social')}</td>
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
            <h2 className={styles.sectionTitle}>{t('dashboard.business.reports.title')}</h2>
            {reports.length === 0 ? (
              <p className={styles.emptyState}>{t('dashboard.business.reports.empty')}</p>
            ) : (
              <div className={styles.reportsList}>
                {reports.slice(0, 3).map((report: MonthlyReport) => (
                  <div key={report.id} className={styles.reportItem}>
                    <div className={styles.reportDate}>
                      <Calendar size={16} />
                      {new Date(report.month).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                    </div>
                    <p className={styles.reportDescription}>{report.work_completed}</p>
                    <div className={styles.reportPills}>
                      <span className={styles.reportPill}><TrendingUp size={12} /> {report.ai_mentions} {t('dashboard.business.stats.mentions')}</span>
                      <span className={styles.reportPill}><Clock size={12} /> {report.views.toLocaleString()} {t('dashboard.business.stats.views')}</span>
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
              <h3 className={styles.widgetTitle}>{t('dashboard.business.plan.title')}</h3>
            </div>
            <div className={styles.planProgress}>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '65%' }} />
              </div>
              <span className={styles.progressText}>{t('dashboard.business.plan.completed').replace('{percent}', '65')}</span>
            </div>
            <ul className={styles.taskList}>
              <li className={styles.taskItem}>
                <CheckCircle2 size={16} className={styles.taskDone} />
                <span>{t('business.tasks.optimize')}</span>
              </li>
              <li className={styles.taskItem}>
                <CheckCircle2 size={16} className={styles.taskDone} />
                <span>{t('business.tasks.index')}</span>
              </li>
              <li className={styles.taskItem}>
                <div className={styles.taskBullet} />
                <span>{t('business.tasks.content')}</span>
              </li>
            </ul>
          </section>

          <section className={styles.sideWidget}>
            <div className={styles.widgetHeader}>
              <Clock size={18} className={styles.widgetIcon} />
              <h3 className={styles.widgetTitle}>{t('dashboard.business.doing.title')}</h3>
            </div>
            <div className={styles.activeTask}>
              <div className={styles.activeTaskPulse} />
              <div className={styles.activeTaskInfo}>
                <span className={styles.activeTaskName}>{t('business.active.seo')}</span>
                <span className={styles.activeTaskSub}>{t('business.active.gym')}</span>
              </div>
            </div>
          </section>

          <section className={styles.sideWidget + ' ' + styles.contactWidget}>
            <h3 className={styles.widgetTitle}>{t('dashboard.business.help.title')}</h3>
            <p className={styles.contactText}>{t('dashboard.business.help.text')}</p>
            <Link href="/dashboard/business/contact" className={styles.contactActionBtn}>
              <MessageSquare size={16} />
              <span>{t('dashboard.business.help.button')}</span>
            </Link>
          </section>

          <section className={styles.sideWidget}>
            <h3 className={styles.widgetTitle}>{t('dashboard.business.activity.title')}</h3>
            <div className={styles.activityList}>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}><Plus size={14} /></div>
                <div className={styles.activityInfo}>
                  <p>{t('business.activity.photos')}</p>
                  <span>{t('business.activity.time.2h')}</span>
                </div>
              </div>
              <div className={styles.activityItem}>
                <div className={styles.activityIcon}><Share2 size={14} /></div>
                <div className={styles.activityInfo}>
                  <p>{t('business.activity.links')}</p>
                  <span>{t('business.activity.time.yest')}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
