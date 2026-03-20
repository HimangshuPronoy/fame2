"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { User, Mail, Calendar, Shield, Bell, Heart, Save, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import styles from "./profile.module.css";
import { useLanguage } from "@/lib/language-context";

const categoriesList = ["Fitness", "Dining", "Wellness", "Beauty", "Nightlife", "Travel"];

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const { t } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const fetchPreferences = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (data) {
      setSelectedCategories(data.favorite_categories || []);
      setEmailNotifications(data.notification_email);
      setPushNotifications(data.notification_push);
    }
  }, []);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
    }
    if (user) {
      fetchPreferences(user.id);
    }
  }, [profile, user, fetchPreferences]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    setMessage("");
    setIsError(false);

    try {
      // Update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("id", user.id);

      // Upsert preferences
      const { error: prefsError } = await supabase
        .from("user_preferences")
        .upsert({
          user_id: user.id,
          favorite_categories: selectedCategories,
          notification_email: emailNotifications,
          notification_push: pushNotifications,
        });

      if (profileError || prefsError) {
        throw new Error("Failed to save profile or preferences");
      }
      
      setMessage(t('profile.saveSuccess') || "Profile saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch {
       setIsError(true);
       setMessage(t('profile.saveError') || "Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <User size={32} />
          {t('nav.profile')}
        </h1>
        <p className={styles.subtitle}>{t('profile.subtitle')}</p>
      </header>

      <div className={styles.content}>
        {/* Account Info */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Shield size={22} />
            {t('profile.accountInfo')}
          </h2>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <Mail size={18} />
              <div>
                <div className={styles.label}>{t('auth.email')}</div>
                <div className={styles.value}>{user?.email}</div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Calendar size={18} />
              <div>
                <div className={styles.label}>{t('profile.memberSince')}</div>
                <div className={styles.value}>
                  {profile?.created_at && new Date(profile.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Shield size={18} />
              <div>
                <div className={styles.label}>{t('profile.role')}</div>
                <div className={styles.value}>
                  {profile?.role === "admin" ? t('admin.title') : t('profile.member')}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Details */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t('profile.personalDetails')}</h2>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">{t('profile.fullName')}</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t('profile.fullNamePlaceholder')}
              className={styles.input}
            />
          </div>
        </section>

        {/* Favorites */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Heart size={22} />
            {t('profile.interests')}
          </h2>
          <p className={styles.sectionDesc}>{t('profile.interestsDesc')}</p>
          <div className={styles.categoryGrid}>
            {categoriesList.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`${styles.categoryBtn} ${
                  selectedCategories.includes(category) ? styles.categoryBtnActive : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Bell size={22} />
            {t('profile.notifications')}
          </h2>
          <div className={styles.toggleGroup}>
            <label className={styles.toggleLabel}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className={styles.checkbox}
                />
                <span>{t('profile.emailNotif')}</span>
              </div>
              <p className={styles.toggleDesc}>{t('profile.emailNotifDesc')}</p>
            </label>

            <label className={styles.toggleLabel}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                  className={styles.checkbox}
                />
                <span>{t('profile.pushNotif')}</span>
              </div>
              <p className={styles.toggleDesc}>{t('profile.pushNotifDesc')}</p>
            </label>
          </div>
        </section>

        <div className={styles.actions}>
          <button onClick={handleSaveProfile} disabled={saving} className={styles.saveBtn}>
            {saving ? <Loader2 className="spin" size={18} /> : <Save size={18} />}
            <span>{saving ? t('common.loading') : t('profile.saveChanges')}</span>
          </button>
          {message && (
            <div className={isError ? styles.errorMsg : styles.successMsg}>
              {isError ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
