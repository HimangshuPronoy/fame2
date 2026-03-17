"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = true }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // Only add scroll listener if we start transparent
    if (transparent) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [transparent]);

  // If it's explicitly set to not be transparent (e.g., on the listings page),
  // we treat it as "scrolled" immediately to give it a solid background.
  const isSolid = !transparent || scrolled;

  return (
    <header className={`${styles.header} ${isSolid ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.logoGroup}>
          <Link href="/" className={styles.logo}>
            Fame<span className={styles.logoDot}>.</span>
          </Link>
        </div>

        <nav className={styles.navDesktop}>
          <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
          <Link href="/listings" className={styles.navLink}>Explore</Link>
          <Link href="#" className={styles.navLink}>Review</Link>
        </nav>

        <div className={styles.authGroup}>
          <Link href="/login" className={styles.loginLink}>Log In</Link>
          <button className={styles.joinButton}>Join</button>
        </div>
      </div>
    </header>
  );
}
