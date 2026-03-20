"use client";

import { useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { 
  LayoutDashboard, 
  LogOut, 
  ArrowLeft, 
  User, 
  List, 
  PlusCircle, 
  Bell, 
  Search, 
  MessageCircle,
  ShieldAlert,
  Heart,
  Calendar
} from "lucide-react";
import styles from "./layout.module.css";
import { useLanguage } from "@/lib/language-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    router.replace("/");
  }, [signOut, router]);

  // Block rendering entirely if loading
  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingSpinner} />
        <p>{t('dashboard.loading')}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.loadingScreen}>
        <p>{t('dashboard.redirecting')}</p>
      </div>
    );
  }

  const isActive = (path: string) => pathname === path;

  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.logoWrapper}>
          <Link href="/" className={styles.logo}>
            Fame<span style={{ color: '#d4af37' }}>.</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          <div className={styles.navGroup}>
            <span className={styles.navGroupTitle}>{t('dashboard.nav.mainMenu')}</span>
            {profile?.role === "business_owner" ? (
              <>
                <Link 
                  href="/dashboard/business" 
                  className={`${styles.navItem} ${isActive('/dashboard/business') ? styles.navItemActive : ''}`}
                >
                  <LayoutDashboard size={18} />
                  <span>{t('dashboard.nav.overview')}</span>
                </Link>
                <Link 
                  href="/dashboard/my-listings" 
                  className={`${styles.navItem} ${isActive('/dashboard/my-listings') ? styles.navItemActive : ''}`}
                >
                  <List size={18} />
                  <span>{t('dashboard.nav.myListings')}</span>
                </Link>
                <Link 
                  href="/dashboard/create-listing" 
                  className={`${styles.navItem} ${isActive('/dashboard/create-listing') ? styles.navItemActive : ''}`}
                >
                  <PlusCircle size={18} />
                  <span>{t('dashboard.nav.createNew')}</span>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/dashboard/user" 
                  className={`${styles.navItem} ${isActive('/dashboard/user') ? styles.navItemActive : ''}`}
                >
                  <LayoutDashboard size={18} />
                  <span>{t('dashboard.nav.overview')}</span>
                </Link>
                <Link 
                  href="/dashboard/saved" 
                  className={`${styles.navItem} ${isActive('/dashboard/saved') ? styles.navItemActive : ''}`}
                >
                  <Heart size={18} />
                  <span>{t('dashboard.nav.savedItems')}</span>
                </Link>
                <Link 
                  href="/dashboard/bookings" 
                  className={`${styles.navItem} ${isActive('/dashboard/bookings') ? styles.navItemActive : ''}`}
                >
                  <Calendar size={18} />
                  <span>{t('dashboard.nav.myBookings')}</span>
                </Link>
              </>
            )}
          </div>

          <div className={styles.navGroup}>
            <span className={styles.navGroupTitle}>{t('dashboard.nav.account')}</span>
            <Link 
              href="/dashboard/profile" 
              className={`${styles.navItem} ${isActive('/dashboard/profile') ? styles.navItemActive : ''}`}
            >
              <User size={18} />
              <span>{t('dashboard.nav.settings')}</span>
            </Link>
            {profile?.role === "admin" && (
              <Link 
                href="/dashboard/admin" 
                className={`${styles.navItem} ${isActive('/dashboard/admin') ? styles.navItemActive : ''}`}
              >
                <ShieldAlert size={18} />
                <span>{t('dashboard.nav.adminPanel')}</span>
              </Link>
            )}
          </div>
        </nav>

        <div className={styles.footerNav}>
          <Link href="/" className={styles.navItem}>
            <ArrowLeft size={18} />
            <span>{t('dashboard.nav.backToSite')}</span>
          </Link>
          <button onClick={handleSignOut} className={`${styles.navItem} ${styles.logout}`}>
            <LogOut size={18} />
            <span>{t('dashboard.nav.logOut')}</span>
          </button>
        </div>
      </aside>

      <div className={styles.mainWrapper}>
        <header className={styles.topBar}>
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder={t('dashboard.search.placeholder')} 
              className={styles.searchInput} 
            />
          </div>
          
          <div className={styles.topBarActions}>
            <button className={styles.actionBtn}>
              <Bell size={20} />
              <span className={styles.notificationBadge} />
            </button>
            <button className={styles.actionBtn}>
              <MessageCircle size={20} />
            </button>
            <div className={styles.divider} />
            <div className={styles.userDropdown}>
              <div className={styles.userAvatarSmall}>
                {profile?.full_name?.[0] ?? user.email?.[0]?.toUpperCase()}
              </div>
              <span className={styles.userNameSmall}>
                {profile?.full_name ?? user.email?.split("@")[0]}
              </span>
            </div>
          </div>
        </header>

        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
