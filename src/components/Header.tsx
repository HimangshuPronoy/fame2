"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/language-context";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut, loading } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    setMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoGroup}>
          <Link href="/" className={styles.logo}>
            Fame<span className={styles.logoDot}>.</span>
          </Link>
        </div>

        <nav className={styles.navDesktop}>
          <div className={styles.dropdownContainer}>
            <button className={styles.navLink}>{t('home.categories')}</button>
            <div className={styles.dropdownMenu}>
              <Link href="/listings?category=Gym" className={styles.dropdownItem}>{t('category.gym')}</Link>
              <Link href="/listings?category=Restaurants" className={styles.dropdownItem}>{t('category.restaurants')}</Link>
              <Link href="/listings?category=Spa" className={styles.dropdownItem}>{t('category.spa')}</Link>
              <Link href="/listings?category=Beauty" className={styles.dropdownItem}>{t('category.beauty')}</Link>
              <Link href="/listings?category=Nightlife" className={styles.dropdownItem}>{t('category.nightlife')}</Link>
            </div>
          </div>
          <Link href="/listings" className={styles.navLink}>{t('nav.listings')}</Link>
          <Link href="/how-it-works" className={styles.navLink}>{t('nav.howItWorks') || 'How it Works'}</Link>
          <Link href="/concierge" className={styles.navLink}>{t('nav.concierge') || 'Concierge'}</Link>
        </nav>

        <div className={styles.authGroup}>
          {loading ? null : user ? (
            <>
              <Link href="/dashboard" className={styles.loginLink} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <User size={16} />
                <span>{profile?.full_name?.split(" ")[0] ?? t('nav.dashboard')}</span>
              </Link>
              <button onClick={handleSignOut} className={styles.joinButton} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <LogOut size={16} /> {t('nav.logout')}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.loginLink}>{t('nav.login')}</Link>
              <Link href="/login" className={styles.joinButton}>{t('nav.join')}</Link>
            </>
          )}
        </div>

        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className={styles.mobileNav}>
          <Link href="/listings?category=Gym" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>{t('category.gym')}</Link>
          <Link href="/listings?category=Restaurants" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>{t('category.restaurants')}</Link>
          <Link href="/listings?category=Spa" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>{t('category.spa')}</Link>
          <Link href="/listings?category=Beauty" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>{t('category.beauty')}</Link>
          <Link href="/listings?category=Nightlife" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>{t('category.nightlife')}</Link>
          <Link href="/listings" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>{t('nav.listings')}</Link>
          <Link href="/how-it-works" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>{t('nav.howItWorks') || 'How it Works'}</Link>
          <Link href="/concierge" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>{t('nav.concierge') || 'Concierge'}</Link>
          <div className={styles.mobileAuthGroup}>
            {user ? (
              <>
                <Link href="/dashboard" className={styles.mobileLoginLink} onClick={() => setMobileMenuOpen(false)}>{t('nav.dashboard')}</Link>
                <button onClick={handleSignOut} className={styles.mobileJoinButton}>{t('nav.logout')}</button>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.mobileLoginLink} onClick={() => setMobileMenuOpen(false)}>{t('nav.login')}</Link>
                <Link href="/login" className={styles.mobileJoinButton} onClick={() => setMobileMenuOpen(false)}>{t('nav.join')}</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
