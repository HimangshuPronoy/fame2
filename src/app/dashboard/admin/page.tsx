"use client";

import { useState, useEffect, useCallback } from "react";
import { PlusCircle, Edit2, Trash2, CheckCircle2, X, Loader2 } from "lucide-react";
import styles from "./admin.module.css";
import { supabase, Listing } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";

const CATEGORIES = ["Fitness", "Gym", "Restaurants", "Nightlife", "Spa", "Beauty", "Wellness", "Hotels"];

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
  gallery_images: [] as string[],
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
  social_twitter: "",
  social_linkedin: "",
  is_featured: false,
};

export default function AdminDashboard() {
  useAuth(); // Auth context available for future use
  const { t } = useLanguage();
  const [listings, setListings] = useState<Listing[]>([]);
  const [dbLoading, setDbLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [clearingData, setClearingData] = useState(false);

  const fetchListings = useCallback(async () => {
    setDbLoading(true);
    const { data } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setListings(data as Listing[]);
    setDbLoading(false);
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleFormChange = (key: string, val: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (listing: Listing) => {
    setEditingId(listing.id);
    setForm({
      title: listing.title,
      subtitle: listing.subtitle ?? "",
      description: listing.description ?? "",
      bio: listing.bio ?? "",
      category: listing.category,
      location: listing.location ?? "",
      address: listing.address ?? "",
      city: listing.city ?? "",
      country: listing.country ?? "Mongolia",
      phone: listing.phone ?? "",
      email: listing.email ?? "",
      website: listing.website ?? "",
      booking_url: listing.booking_url ?? "",
      menu_url: listing.menu_url ?? "",
      video_url: listing.video_url ?? "",
      price: listing.price ?? "",
      image_url: listing.image_url ?? "",
      gallery_images: [],
      hours: listing.hours as typeof emptyForm.hours ?? emptyForm.hours,
      amenities: listing.amenities ?? [],
      tags: listing.tags ?? [],
      social_facebook: listing.social_links?.facebook ?? "",
      social_instagram: listing.social_links?.instagram ?? "",
      social_twitter: listing.social_links?.twitter ?? "",
      social_linkedin: listing.social_links?.linkedin ?? "",
      is_featured: listing.is_featured,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);

    const social_links: Record<string, string> = {};
    if (form.social_facebook) social_links.facebook = form.social_facebook;
    if (form.social_instagram) social_links.instagram = form.social_instagram;
    if (form.social_twitter) social_links.twitter = form.social_twitter;
    if (form.social_linkedin) social_links.linkedin = form.social_linkedin;

    const payload = {
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || null,
      description: form.description.trim() || null,
      bio: form.bio.trim() || null,
      category: form.category,
      location: form.location.trim() || null,
      address: form.address.trim() || null,
      city: form.city.trim() || null,
      country: form.country.trim() || null,
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
      website: form.website.trim() || null,
      booking_url: form.booking_url.trim() || null,
      menu_url: form.menu_url.trim() || null,
      video_url: form.video_url.trim() || null,
      price: form.price.trim() || null,
      image_url: form.image_url.trim() || null,
      hours: form.hours,
      amenities: form.amenities.length > 0 ? form.amenities : null,
      tags: form.tags.length > 0 ? form.tags : null,
      social_links: Object.keys(social_links).length > 0 ? social_links : null,
      is_featured: form.is_featured,
      is_active: true,
    };

    if (editingId) {
      await supabase.from("listings").update(payload).eq("id", editingId);
    } else {
      const { data: newListing } = await supabase.from("listings").insert([payload]).select().single();
      
      // Add gallery images if any
      if (newListing && form.gallery_images.length > 0) {
        const imageRecords = form.gallery_images.map((url, index) => ({
          listing_id: newListing.id,
          image_url: url,
          display_order: index,
        }));
        await supabase.from("listing_images").insert(imageRecords);
      }
    }

    setSaveSuccess(true);
    await fetchListings();
    setTimeout(() => {
      setSaveSuccess(false);
      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
    }, 1500);
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    setDeleteId(id);
    await supabase.from("listings").update({ is_active: false }).eq("id", id);
    await fetchListings();
    setDeleteId(null);
  };

  const handleClearAllData = async () => {
    if (!confirm('⚠️ WARNING: This will delete ALL listings from the database. This action cannot be undone. Are you sure?')) {
      return;
    }
    
    setClearingData(true);
    try {
      const response = await fetch('/api/clear-seed-data', { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        alert('✅ All listings cleared successfully!');
        await fetchListings();
      } else {
        alert('❌ Error: ' + (data.error || 'Failed to clear data'));
      }
    } catch (error) {
      alert('❌ Error clearing data: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
    setClearingData(false);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <h1 className={styles.title}>{t('admin.title')}</h1>
            <p className={styles.subtitle}>{t('admin.subtitle')}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
              className={styles.dangerBtn} 
              onClick={handleClearAllData}
              disabled={clearingData}
              title={t('admin.clearAll')}
            >
              {clearingData ? <Loader2 size={18} /> : '🗑️'}
              <span>{clearingData ? t('common.loading') : t('admin.clearAll')}</span>
            </button>
            <button className={styles.addBtn} onClick={openAdd}>
              <PlusCircle size={18} />
              <span>{t('admin.addListing')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Add / Edit Form */}
      {showForm && (
        <section className={styles.section}>
          <div className={styles.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 className={styles.cardTitle}>{editingId ? "Edit Listing" : "Add New Listing"}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Title *</label>
                <input type="text" value={form.title} onChange={(e) => handleFormChange("title", e.target.value)} className={styles.input} placeholder="e.g. Skyline Yoga Studio" required />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Subtitle</label>
                  <input type="text" value={form.subtitle} onChange={(e) => handleFormChange("subtitle", e.target.value)} className={styles.input} placeholder="Short tagline" />
                </div>
                <div className={styles.formGroup}>
                  <label>Category *</label>
                  <select className={styles.select} value={form.category} onChange={(e) => handleFormChange("category", e.target.value)}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea value={form.description} onChange={(e) => handleFormChange("description", e.target.value)} className={styles.input} style={{ height: 80, resize: "vertical" }} placeholder="Describe the listing..." />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Location</label>
                  <input type="text" value={form.location} onChange={(e) => handleFormChange("location", e.target.value)} className={styles.input} placeholder="City, State" />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone</label>
                  <input type="text" value={form.phone} onChange={(e) => handleFormChange("phone", e.target.value)} className={styles.input} placeholder="+1-555-000-1234" />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Price</label>
                  <input type="text" value={form.price} onChange={(e) => handleFormChange("price", e.target.value)} className={styles.input} placeholder="$$$, $150/mo" />
                </div>
                <div className={styles.formGroup}>
                  <label>Website URL</label>
                  <input type="url" value={form.website} onChange={(e) => handleFormChange("website", e.target.value)} className={styles.input} placeholder="https://..." />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Cover Image URL</label>
                <input type="url" value={form.image_url} onChange={(e) => handleFormChange("image_url", e.target.value)} className={styles.input} placeholder="https://images.unsplash.com/..." />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="checkbox" id="featured" checked={form.is_featured} onChange={(e) => handleFormChange("is_featured", e.target.checked)} style={{ width: 16, height: 16, accentColor: "#111827" }} />
                <label htmlFor="featured" style={{ fontSize: "0.9rem", color: "#374151", cursor: "pointer" }}>Mark as Featured</label>
              </div>

              {saveSuccess ? (
                <div className={styles.successMessage}>
                  <CheckCircle2 size={18} /> {editingId ? "Updated" : "Added"} successfully!
                </div>
              ) : (
                <button type="submit" className={styles.submitBtn} disabled={saving}>
                  {saving ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Saving...</> : editingId ? "Update Listing" : "Save Listing"}
                </button>
              )}
            </form>
          </div>
        </section>
      )}

      {/* Listings Table */}
      <section className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>All Listings ({listings.length})</h2>
          <div className={styles.tableWrapper}>
            {dbLoading ? (
              <p style={{ padding: "24px", textAlign: "center", color: "#9ca3af" }}>Loading...</p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((item) => (
                    <tr key={item.id}>
                      <td className={styles.fw500}>
                        {item.title}
                        {item.is_featured && <span className={styles.tag} style={{ marginLeft: 8, background: "#fef9c3", color: "#854d0e" }}>⭐ Featured</span>}
                      </td>
                      <td><span className={styles.tag}>{item.category}</span></td>
                      <td>{item.location ?? "—"}</td>
                      <td>{item.price ?? "—"}</td>
                      <td>
                        <span className={`${styles.status} ${item.is_active ? styles.activeStatus : ""}`}>
                          {item.is_active ? "Active" : "Hidden"}
                        </span>
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button className={styles.iconBtn} title="Edit" onClick={() => openEdit(item)}><Edit2 size={16} /></button>
                          <button
                            className={`${styles.iconBtn} ${styles.danger}`}
                            title="Archive"
                            onClick={() => handleDelete(item.id)}
                            disabled={deleteId === item.id}
                          >
                            {deleteId === item.id ? <Loader2 size={16} /> : <Trash2 size={16} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {listings.length === 0 && (
                    <tr><td colSpan={6} className={styles.emptyTable}>No listings yet. Click &quot;Add Listing&quot; to create one.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
