"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import styles from "./create-listing.module.css";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

const CATEGORIES = ["Fitness", "Gym", "Restaurants", "Nightlife", "Spa", "Beauty", "Wellness", "Hotels"];

const emptyForm = {
  title: "",
  subtitle: "",
  description: "",
  category: "Fitness",
  location: "",
  phone: "",
  website: "",
  price: "",
  image_url: "",
};

export default function CreateListingPage() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Admin-only access
  if (!user || profile?.role !== "admin") {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h2>Access Denied</h2>
          <p>Only administrators can create listings.</p>
          <Link href="/dashboard" className={styles.backBtn}>
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleFormChange = (key: string, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !user) return;
    
    setSaving(true);

    const payload = {
      user_id: user.id,
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || null,
      description: form.description.trim() || null,
      category: form.category,
      location: form.location.trim() || null,
      phone: form.phone.trim() || null,
      website: form.website.trim() || null,
      price: form.price.trim() || null,
      image_url: form.image_url.trim() || null,
      is_featured: false,
      is_active: true,
      rating: 0,
      reviews: 0,
    };

    const { error } = await supabase.from("listings").insert([payload]);

    if (error) {
      alert("Error creating listing: " + error.message);
      setSaving(false);
      return;
    }

    setSaveSuccess(true);
    setTimeout(() => {
      router.push("/dashboard/admin");
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/dashboard/admin" className={styles.backBtn}>
          <ArrowLeft size={18} />
          <span>Back to Admin Dashboard</span>
        </Link>
        <div>
          <h1 className={styles.title}>Create New Listing</h1>
          <p className={styles.subtitle}>Add a new business to the platform</p>
        </div>
      </header>

      <div className={styles.card}>
        {saveSuccess ? (
          <div className={styles.successMessage}>
            <CheckCircle2 size={48} color="#10b981" />
            <h3 className={styles.successTitle}>Listing Created Successfully!</h3>
            <p className={styles.successDesc}>Redirecting you back to dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Title *</label>
              <input 
                type="text" 
                value={form.title} 
                onChange={(e) => handleFormChange("title", e.target.value)} 
                className={styles.input} 
                placeholder="e.g. Skyline Yoga Studio" 
                required 
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Subtitle</label>
                <input 
                  type="text" 
                  value={form.subtitle} 
                  onChange={(e) => handleFormChange("subtitle", e.target.value)} 
                  className={styles.input} 
                  placeholder="Short tagline" 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Category *</label>
                <select 
                  className={styles.select} 
                  value={form.category} 
                  onChange={(e) => handleFormChange("category", e.target.value)}
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Description</label>
              <textarea 
                value={form.description} 
                onChange={(e) => handleFormChange("description", e.target.value)} 
                className={styles.textarea} 
                placeholder="Describe the listing..." 
                rows={4}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Location</label>
                <input 
                  type="text" 
                  value={form.location} 
                  onChange={(e) => handleFormChange("location", e.target.value)} 
                  className={styles.input} 
                  placeholder="City, State" 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Phone</label>
                <input 
                  type="text" 
                  value={form.phone} 
                  onChange={(e) => handleFormChange("phone", e.target.value)} 
                  className={styles.input} 
                  placeholder="+1-555-000-1234" 
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Price</label>
                <input 
                  type="text" 
                  value={form.price} 
                  onChange={(e) => handleFormChange("price", e.target.value)} 
                  className={styles.input} 
                  placeholder="$$, $150/mo" 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Website URL</label>
                <input 
                  type="url" 
                  value={form.website} 
                  onChange={(e) => handleFormChange("website", e.target.value)} 
                  className={styles.input} 
                  placeholder="https://..." 
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label>Cover Image URL</label>
              <input 
                type="url" 
                value={form.image_url} 
                onChange={(e) => handleFormChange("image_url", e.target.value)} 
                className={styles.input} 
                placeholder="https://images.unsplash.com/..." 
              />
              <p className={styles.hint}>Tip: Use Unsplash for high-quality free images</p>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 size={18} className={styles.spinner} /> Creating...
                </>
              ) : (
                <>
                  <PlusCircle size={18} /> Create Listing
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
