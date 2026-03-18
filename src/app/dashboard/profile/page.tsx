"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { User, Mail, Calendar, Shield, Bell, Heart } from "lucide-react";
import styles from "./profile.module.css";

const categories = ["Fitness", "Dining", "Wellness", "Beauty", "Nightlife", "Travel"];

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
    }
    if (user) {
      fetchPreferences();
    }
  }, [profile, user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchPreferences = async () => {
    const { data } = await supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", user!.id)
      .single();

    if (data) {
      setSelectedCategories(data.favorite_categories || []);
      setEmailNotifications(data.notification_email);
      setPushNotifications(data.notification_push);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setMessage("");

    // Update profile
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ full_name: fullName })
      .eq("id", user!.id);

    // Upsert preferences
    const { error: prefsError } = await supabase
      .from("user_preferences")
      .upsert({
        user_id: user!.id,
        favorite_categories: selectedCategories,
        notification_email: emailNotifications,
        notification_push: pushNotifications,
      });

    if (profileError || prefsError) {
      setMessage("Error saving profile");
    } else {
      setMessage("Profile saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    }

    setSaving(false);
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
      <div className={styles.header}>
        <h1 className={styles.title}>
          <User size={32} />
          My Profile
        </h1>
        <p className={styles.subtitle}>Manage your account settings and preferences</p>
      </div>

      <div className={styles.content}>
        {/* Account Info */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Account Information</h2>
          
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <Mail size={20} />
              <div>
                <div className={styles.label}>Email</div>
                <div className={styles.value}>{user?.email}</div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Calendar size={20} />
              <div>
                <div className={styles.label}>Member Since</div>
                <div className={styles.value}>
                  {profile?.created_at && new Date(profile.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Shield size={20} />
              <div>
                <div className={styles.label}>Role</div>
                <div className={styles.value}>
                  {profile?.role === "admin" ? "Administrator" : "Member"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Details */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Personal Details</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className={styles.input}
            />
          </div>
        </section>

        {/* Preferences */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Heart size={24} />
            Favorite Categories
          </h2>
          <p className={styles.sectionDesc}>
            Select your interests to get personalized recommendations
          </p>

          <div className={styles.categoryGrid}>
            {categories.map((category) => (
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
            <Bell size={24} />
            Notifications
          </h2>

          <div className={styles.toggleGroup}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className={styles.checkbox}
              />
              <span>Email Notifications</span>
              <p className={styles.toggleDesc}>
                Receive updates about bookings and new listings
              </p>
            </label>

            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={(e) => setPushNotifications(e.target.checked)}
                className={styles.checkbox}
              />
              <span>Push Notifications</span>
              <p className={styles.toggleDesc}>
                Get real-time alerts on your device
              </p>
            </label>
          </div>
        </section>

        {/* Save Button */}
        <div className={styles.actions}>
          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className={styles.saveBtn}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {message && (
            <div className={message.includes("Error") ? styles.errorMsg : styles.successMsg}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
