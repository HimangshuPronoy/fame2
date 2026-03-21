"use client";

import { useState, useEffect, useCallback } from "react";
import { PlusCircle, Edit2, Trash2, X, Loader2, Users, FileText, Layout, Save, BarChart2 } from "lucide-react";
import { 
  ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend
} from 'recharts';
import styles from "./admin.module.css";
import { supabase, Listing, Profile } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";

const CATEGORIES = ["Fitness", "Gym", "Restaurants", "Nightlife", "Spa", "Beauty", "Wellness", "Hotels"];

interface JoinedReport {
  id: string;
  business_owner_id: string;
  listing_id: string;
  month: string;
  work_completed: string;
  ai_mentions: number;
  views: number;
  clicks: number;
  ranking_improvement: string | null;
  notes: string | null;
  listings: { title: string } | null;
  profiles: { full_name: string | null } | null;
}

const emptyForm = {
  title: "",
  subtitle: "",
  description: "",
  bio: "",
  category: "Fitness",
  location: "",
  address: "",
  city: "",
  country: "Mongolia",
  phone: "",
  email: "",
  website: "",
  booking_url: "",
  menu_url: "",
  video_url: "",
  price: "",
  image_url: "",
  hours: {
    monday: { open: "09:00", close: "18:00", closed: false },
    tuesday: { open: "09:00", close: "18:00", closed: false },
    wednesday: { open: "09:00", close: "18:00", closed: false },
    thursday: { open: "09:00", close: "18:00", closed: false },
    friday: { open: "09:00", close: "18:00", closed: false },
    saturday: { open: "10:00", close: "16:00", closed: false },
    sunday: { open: "", close: "", closed: true },
  },
  amenities: [] as string[],
  tags: [] as string[],
  social_facebook: "",
  social_instagram: "",
  is_featured: false,
};

const emptyReport = {
  business_owner_id: "",
  listing_id: "",
  month: new Date().toISOString().substring(0, 7), // YYYY-MM
  work_completed: "",
  ai_mentions: 0,
  views: 0,
  clicks: 0,
  ranking_improvement: "",
  notes: ""
};

export default function AdminDashboard() {
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  
  const [activeTab, setActiveTab] = useState<'listings' | 'users' | 'reports' | 'analytics'>('listings');
  const [listings, setListings] = useState<Listing[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [reports, setReports] = useState<JoinedReport[]>([]);
  const [dbLoading, setDbLoading] = useState(true);
  
  const [showListingForm, setShowListingForm] = useState(false);
  const [editingListingId, setEditingListingId] = useState<string | null>(null);
  const [listingForm, setListingForm] = useState(emptyForm);
  
  const [showReportForm, setShowReportForm] = useState(false);
  const [editingReportId, setEditingReportId] = useState<string | null>(null);
  const [reportForm, setReportForm] = useState(emptyReport);
  
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [clearingData, setClearingData] = useState(false);

  const fetchListings = useCallback(async () => {
    const { data } = await supabase.from("listings").select("*").order("created_at", { ascending: false });
    if (data) setListings(data);
  }, []);

  const fetchProfiles = useCallback(async () => {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (data) setProfiles(data);
  }, []);

  const fetchReports = useCallback(async () => {
    const { data } = await supabase
      .from("monthly_reports")
      .select("*, listings(title), profiles:business_owner_id(full_name)")
      .order("month", { ascending: false });
    if (data) setReports(data as unknown as JoinedReport[]);
  }, []);

  const fetchData = useCallback(async () => {
    setDbLoading(true);
    const timeout = setTimeout(() => setDbLoading(false), 8000);
    try {
      await Promise.all([fetchListings(), fetchProfiles(), fetchReports()]);
    } catch (e) {
      console.error(e);
    } finally {
      clearTimeout(timeout);
      setDbLoading(false);
    }
  }, [fetchListings, fetchProfiles, fetchReports]);

  const [platformGrowthData, setPlatformGrowthData] = useState<{name: string, users: number, listings: number}[]>([]);

  useEffect(() => {
    if (profiles.length > 0 || listings.length > 0) {
      const now = new Date();
      const weeks = [];
      for (let i = 5; i >= 0; i--) {
        const weekEnd = new Date(now.getTime() - (i * 7 * 24 * 60 * 60 * 1000));
        const weekName = `Week ${6-i}`;
        
        const userCount = profiles.filter(p => new Date(p.created_at) <= weekEnd).length;
        const listingCount = listings.filter(l => new Date(l.created_at) <= weekEnd).length;
        
        weeks.push({
          name: weekName,
          users: userCount,
          listings: listingCount
        });
      }
      setPlatformGrowthData(weeks);
    }
  }, [profiles, listings]);

  useEffect(() => {
    if (user && profile?.role === 'admin') {
      fetchData();
    } else if (user && profile) {
      setDbLoading(false);
    }
  }, [user, profile, fetchData]);

  const handleRoleChange = async (profileId: string, newRole: 'user' | 'business_owner' | 'admin') => {
    setActionId(profileId);
    await supabase.from("profiles").update({ role: newRole }).eq("id", profileId);
    await fetchProfiles();
    setActionId(null);
  };

  const deleteListing = async (id: string) => {
    if (!confirm("Archive this listing?")) return;
    setActionId(id);
    await supabase.from("listings").update({ is_active: false }).eq("id", id);
    await fetchListings();
    setActionId(null);
  };

  const deleteReport = async (id: string) => {
    if (!confirm("Delete this report?")) return;
    setActionId(id);
    await supabase.from("monthly_reports").delete().eq("id", id);
    await fetchReports();
    setActionId(null);
  };

  const submitListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const socialLinks: Record<string, string> = {};
    if (listingForm.social_facebook) socialLinks.facebook = listingForm.social_facebook;
    if (listingForm.social_instagram) socialLinks.instagram = listingForm.social_instagram;
    
    const { social_facebook: _sf, social_instagram: _si, ...rest } = listingForm;
    void _sf; void _si;
    const dbPayload = {
      ...rest,
      social_links: socialLinks,
      is_active: true
    } as Record<string, unknown>;

    if (editingListingId) {
      await supabase.from("listings").update(dbPayload).eq("id", editingListingId);
    } else {
      await supabase.from("listings").insert([dbPayload]);
    }
    
    setSaveSuccess(true);
    await fetchListings();
    setTimeout(() => {
      setSaveSuccess(false);
      setShowListingForm(false);
      setEditingListingId(null);
    }, 1000);
    setSaving(false);
  };

  const submitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const finalReportForm = { ...reportForm };
    if (!reportForm.business_owner_id && reportForm.listing_id) {
       const listing = listings.find(l => l.id === reportForm.listing_id);
       if (listing?.business_owner_id) {
         finalReportForm.business_owner_id = listing.business_owner_id;
       }
    }

    if (editingReportId) {
      await supabase.from("monthly_reports").update(finalReportForm).eq("id", editingReportId);
    } else {
      await supabase.from("monthly_reports").insert([finalReportForm]);
    }
    
    setSaveSuccess(true);
    await fetchReports();
    setTimeout(() => {
      setSaveSuccess(false);
      setShowReportForm(false);
      setEditingReportId(null);
    }, 1000);
    setSaving(false);
  };

  const handleClearAllData = async () => {
    if (!confirm('⚠️ WARNING: This will delete ALL listings. Are you sure?')) return;
    setClearingData(true);
    try {
      const resp = await fetch('/api/clear-seed-data', { method: 'POST' });
      if (resp.ok) await fetchListings();
    } catch (e) {
      console.error(e);
    }
    setClearingData(false);
  };

  if (!user || profile?.role !== 'admin') {
    return <div className={styles.container}><h1>Access Denied</h1></div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <h1 className={styles.title}>{t('admin.title')}</h1>
            <p className={styles.subtitle}>{t('admin.subtitle')}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className={styles.dangerBtn} onClick={handleClearAllData} disabled={clearingData}>
              {clearingData ? <Loader2 className="spin" size={18} /> : <Trash2 size={18} />}
              <span>{t('admin.clearAll')}</span>
            </button>
            <button className={styles.addBtn} onClick={() => { setShowListingForm(true); setEditingListingId(null); setListingForm(emptyForm); }}>
              <PlusCircle size={18} />
              <span>{t('admin.addListing')}</span>
            </button>
          </div>
        </div>
      </header>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === 'listings' ? styles.activeTab : ''}`} onClick={() => setActiveTab('listings')}>
          <Layout size={18} className={styles.tabIcon} />
          <span>{t('admin.tabs.listings')}</span>
          <span className={styles.badge}>{listings.length}</span>
        </button>
        <button className={`${styles.tab} ${activeTab === 'users' ? styles.activeTab : ''}`} onClick={() => setActiveTab('users')}>
          <Users size={18} className={styles.tabIcon} />
          <span>{t('admin.tabs.users')}</span>
          <span className={styles.badge}>{profiles.length}</span>
        </button>
        <button className={`${styles.tab} ${activeTab === 'reports' ? styles.activeTab : ''}`} onClick={() => setActiveTab('reports')}>
          <FileText size={18} className={styles.tabIcon} />
          <span>{t('admin.tabs.reports')}</span>
          <span className={styles.badge}>{reports.length}</span>
        </button>
        <button className={`${styles.tab} ${activeTab === 'analytics' ? styles.activeTab : ''}`} onClick={() => setActiveTab('analytics')}>
          <BarChart2 size={18} className={styles.tabIcon} />
          <span>Analytics</span>
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'analytics' && (
          <div className={styles.analyticsSection}>
            <div className={styles.chartCardAdmin}>
              <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>Platform Growth</h3>
                <p className={styles.chartSubtitle}>New Users vs New Listings (Last 6 Weeks)</p>
              </div>
              <div className={styles.chartWrapperAdmin}>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={platformGrowthData}>
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
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                    <Bar dataKey="listings" name="New Listings" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={20} />
                    <Line type="monotone" dataKey="users" name="New Users" stroke="var(--accent)" strokeWidth={3} dot={{ r: 4, fill: 'var(--accent)', strokeWidth: 2, stroke: '#fff' }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>{t('admin.tabs.listings')}</h2>
            {dbLoading ? <Loader2 className="spin" /> : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{t('admin.table.title')}</th>
                    <th>{t('admin.table.category')}</th>
                    <th>{t('admin.table.status')}</th>
                    <th>{t('admin.table.actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map(l => (
                    <tr key={l.id}>
                      <td className={styles.fw500}>{l.title}</td>
                      <td><span className={styles.tag}>{l.category}</span></td>
                      <td><span className={`${styles.status} ${l.is_active ? styles.activeStatus : ''}`}>{l.is_active ? 'Active' : 'Archived'}</span></td>
                      <td>
                        <div className={styles.actions}>
                          <button className={styles.iconBtn} onClick={() => { 
                            setEditingListingId(l.id); 
                            setListingForm({
                              ...emptyForm, 
                              ...l, 
                              social_facebook: (l.social_links as Record<string, string> | null)?.facebook || "",
                              social_instagram: (l.social_links as Record<string, string> | null)?.instagram || ""
                            } as unknown as typeof emptyForm); 
                            setShowListingForm(true); 
                          }}><Edit2 size={16} /></button>
                          <button className={`${styles.iconBtn} ${styles.danger}`} onClick={() => deleteListing(l.id)} disabled={actionId === l.id}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {activeTab === 'users' && (
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>{t('admin.tabs.users')}</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{t('admin.table.user')}</th>
                  <th>{t('admin.table.id')}</th>
                  <th>{t('admin.table.role')}</th>
                  <th>{t('admin.table.manage')}</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map(p => (
                  <tr key={p.id}>
                    <td className={styles.fw500}>{p.full_name || 'Anonymous User'}</td>
                    <td><span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{p.id.substring(0,8)}...</span></td>
                    <td><span className={`${styles.roleBadge} ${styles[`role_${p.role}`]}`}>{p.role}</span></td>
                    <td>
                      <select 
                        className={styles.select} 
                        value={p.role} 
                        onChange={(e) => handleRoleChange(p.id, e.target.value as Profile['role'])}
                        disabled={actionId === p.id}
                      >
                        <option value="user">Member (User)</option>
                        <option value="business_owner">Business Owner</option>
                        <option value="admin">Platform Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {activeTab === 'reports' && (
          <section className={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 className={styles.cardTitle}>{t('admin.tabs.reports')}</h2>
              <button className={styles.addBtn} onClick={() => { setShowReportForm(true); setEditingReportId(null); setReportForm(emptyReport); }}>
                <PlusCircle size={16} /> {t('admin.form.report.create')}
              </button>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{t('admin.table.month')}</th>
                  <th>{t('admin.table.business')}</th>
                  <th>{t('admin.table.views')}</th>
                  <th>{t('admin.table.mentions')}</th>
                  <th>{t('admin.table.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {reports.map(r => (
                  <tr key={r.id}>
                    <td>{r.month}</td>
                    <td className={styles.fw500}>{r.listings?.title || 'Unknown'}</td>
                    <td>{r.views}</td>
                    <td>{r.ai_mentions}</td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.iconBtn} onClick={() => { setEditingReportId(r.id); setReportForm({
                          business_owner_id: r.business_owner_id,
                          listing_id: r.listing_id,
                          month: r.month,
                          work_completed: r.work_completed || "",
                          ai_mentions: r.ai_mentions || 0,
                          views: r.views || 0,
                          clicks: r.clicks || 0,
                          ranking_improvement: r.ranking_improvement || "",
                          notes: r.notes || ""
                        }); setShowReportForm(true); }}><Edit2 size={16} /></button>
                        <button className={`${styles.iconBtn} ${styles.danger}`} onClick={() => deleteReport(r.id)} disabled={actionId === r.id}><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>

      {/* Listing Form Modal */}
      {showListingForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: '20px' }}>
                <h2 className={styles.cardTitle}>{editingListingId ? t('admin.form.editListing') : t('admin.form.newListing')}</h2>
                <button onClick={() => setShowListingForm(false)} className={styles.iconBtn}><X size={20} /></button>
              </div>
              <form onSubmit={submitListing} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>{t('form.title')} *</label>
                  <input type="text" value={listingForm.title} onChange={(e) => setListingForm({...listingForm, title: e.target.value})} className={styles.input} required />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Category *</label>
                    <select className={styles.select} value={listingForm.category} onChange={(e) => setListingForm({...listingForm, category: e.target.value})}>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Price Range</label>
                    <input type="text" value={listingForm.price} onChange={(e) => setListingForm({...listingForm, price: e.target.value})} className={styles.input} placeholder="$$$, $150/mo" />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Cover Image URL</label>
                  <input type="url" value={listingForm.image_url} onChange={(e) => setListingForm({...listingForm, image_url: e.target.value})} className={styles.input} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input type="checkbox" checked={listingForm.is_featured} onChange={(e) => setListingForm({...listingForm, is_featured: e.target.checked})} />
                  <label>Mark as Featured</label>
                </div>
                {saveSuccess ? <div className={styles.successMessage}>{t('form.saved')}</div> : (
                  <button type="submit" className={styles.submitBtn} disabled={saving}>
                    {saving ? <Loader2 className="spin" size={16} /> : <Save size={16} />} <span>{editingListingId ? t('admin.form.update') : t('admin.form.save')}</span>
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Report Form Modal */}
      {showReportForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3>{editingReportId ? 'Edit Report' : 'Create Report'}</h3>
                <button onClick={() => setShowReportForm(false)} className={styles.iconBtn}><X size={20} /></button>
              </div>
              <form onSubmit={submitReport} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label>Listing</label>
                    <select className={styles.select} value={reportForm.listing_id} onChange={e => setReportForm({...reportForm, listing_id: e.target.value})} required>
                      <option value="">Select...</option>
                      {listings.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Month</label>
                    <input type="month" className={styles.input} value={reportForm.month} onChange={e => setReportForm({...reportForm, month: e.target.value})} required />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}><label>Views</label><input type="number" className={styles.input} value={reportForm.views} onChange={e => setReportForm({...reportForm, views: parseInt(e.target.value)})} /></div>
                  <div className={styles.formGroup}><label>AI Mentions</label><input type="number" className={styles.input} value={reportForm.ai_mentions} onChange={e => setReportForm({...reportForm, ai_mentions: parseInt(e.target.value)})} /></div>
                </div>
                <div className={styles.formGroup}><label>Work Completed</label><textarea className={styles.input} value={reportForm.work_completed} onChange={e => setReportForm({...reportForm, work_completed: e.target.value})} /></div>
                {saveSuccess ? <div className={styles.successMessage}>Saved!</div> : (
                  <button type="submit" className={styles.submitBtn} disabled={saving}>
                    {saving ? <Loader2 className="spin" /> : <Save size={18} />} <span>{editingReportId ? 'Update' : 'Send'}</span>
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
