"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut, loading } = useAuth();
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
            <button className={styles.navLink}>Categories</button>
            <div className={styles.dropdownMenu}>
              <Link href="/listings?category=Restaurants" className={styles.dropdownItem}>Fine Dining</Link>
              <Link href="/listings?category=Nightlife" className={styles.dropdownItem}>Nightlife</Link>
              <Link href="/listings?category=Fitness" className={styles.dropdownItem}>Elite Fitness</Link>
              <Link href="/listings?category=Spa" className={styles.dropdownItem}>Wellness Spas</Link>
            </div>
          </div>
          <Link href="/listings" className={styles.navLink}>Explore</Link>
          <Link href="/concierge" className={styles.navLink}>Concierge</Link>
          <Link href="/journal" className={styles.navLink}>Journal</Link>
          <Link href="/partners" className={styles.navLink}>For Partners</Link>
        </nav>

        <div className={styles.authGroup}>
          {loading ? null : user ? (
            <>
              <Link href="/dashboard" className={styles.loginLink} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <User size={16} />
                <span>{profile?.full_name?.split(" ")[0] ?? "Dashboard"}</span>
              </Link>
              <button onClick={handleSignOut} className={styles.joinButton} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <LogOut size={16} /> Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.loginLink}>Log In</Link>
              <Link href="/login" className={styles.joinButton}>Join</Link>
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
          <Link href="/listings?category=Restaurants" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Fine Dining</Link>
          <Link href="/listings?category=Nightlife" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Nightlife</Link>
          <Link href="/listings?category=Fitness" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Elite Fitness</Link>
          <Link href="/listings?category=Spa" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Wellness Spas</Link>
          <Link href="/listings" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Explore</Link>
          <Link href="/concierge" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Concierge</Link>
          <Link href="/journal" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>Journal</Link>
          <Link href="/partners" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>For Partners</Link>
          <div className={styles.mobileAuthGroup}>
            {user ? (
              <>
                <Link href="/dashboard" className={styles.mobileLoginLink} onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                <button onClick={handleSignOut} className={styles.mobileJoinButton}>Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.mobileLoginLink} onClick={() => setMobileMenuOpen(false)}>Log In</Link>
                <Link href="/login" className={styles.mobileJoinButton} onClick={() => setMobileMenuOpen(false)}>Join</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
