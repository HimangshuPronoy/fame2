"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { LayoutDashboard, Settings, LogOut, ArrowLeft, User } from "lucide-react";
import styles from "./layout.module.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // Block rendering entirely if not authenticated
  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingSpinner} />
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.loadingScreen}>
        <p>Redirecting to login...</p>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.replace("/");
  };

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.logoWrapper}>
          <Link href="/" className={styles.logo}>Fame<span style={{ color: '#3b82f6' }}>.</span></Link>
        </div>

        {/* User Avatar Section */}
        <div className={styles.userSection}>
          <div className={styles.userAvatar}>
            <User size={20} />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{profile?.full_name ?? user.email?.split("@")[0]}</span>
            <span className={styles.userRole}>{profile?.role === "admin" ? "Admin" : "Member"}</span>
          </div>
        </div>

        <nav className={styles.nav}>
          <Link href="/dashboard/user" className={styles.navItem}>
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </Link>
          <Link href="/dashboard/profile" className={styles.navItem}>
            <User size={18} />
            <span>Profile</span>
          </Link>
          <Link href="/dashboard/saved" className={styles.navItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>Saved</span>
          </Link>
          <Link href="/dashboard/bookings" className={styles.navItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Bookings</span>
          </Link>
          {profile?.role === "admin" && (
            <Link href="/dashboard/admin" className={styles.navItem}>
              <Settings size={18} />
              <span>Admin Panel</span>
            </Link>
          )}
        </nav>
        <div className={styles.footerNav}>
          <Link href="/" className={styles.navItem}>
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
          <button
            onClick={handleSignOut}
            className={`${styles.navItem} ${styles.logout}`}
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
