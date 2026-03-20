"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Mail, Phone } from "lucide-react";
import styles from "./Footer.module.css";
import { useLanguage } from "@/lib/language-context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              Fame<span className={styles.logoDot}>.</span>
            </Link>
            <p className={styles.brandDesc}>
              {t('footer.brandDesc')}
            </p>
            <div className={styles.socials}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socialLink}><Facebook size={20} /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socialLink}><Twitter size={20} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialLink}><Instagram size={20} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.socialLink}><Youtube size={20} /></a>
            </div>
          </div>

          <div className={styles.gridCol}>
            <h4 className={styles.colTitle}>{t('footer.quickLinks')}</h4>
            <ul className={styles.linkList}>
              <li><Link href="/listings" className={styles.link}>{t('footer.exploreListings')}</Link></li>
              <li><Link href="/listings" className={styles.link}>{t('footer.trendingLocations')}</Link></li>
              <li><Link href="/dashboard" className={styles.link}>{t('footer.submitListing')}</Link></li>
              <li><Link href="/login" className={styles.link}>{t('footer.memberLogin')}</Link></li>
              <li><Link href="/dashboard" className={styles.link}>{t('footer.adminPortal')}</Link></li>
            </ul>
          </div>

          <div className={styles.gridCol}>
            <h4 className={styles.colTitle}>{t('footer.categories')}</h4>
            <ul className={styles.linkList}>
              <li><Link href="/listings?category=Restaurants" className={styles.link}>{t('footer.fineDining')}</Link></li>
              <li><Link href="/listings?category=Nightlife" className={styles.link}>{t('footer.nightlife')}</Link></li>
              <li><Link href="/listings?category=Fitness" className={styles.link}>{t('footer.fitness')}</Link></li>
              <li><Link href="/listings?category=Retail" className={styles.link}>{t('footer.shopping')}</Link></li>
              <li><Link href="/listings?category=Wellness" className={styles.link}>{t('footer.wellness')}</Link></li>
            </ul>
          </div>

          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>{t('footer.contactUs')}</h4>
            <div className={styles.contactItem}>
              <MapPin size={18} className={styles.contactIcon} />
              <span>{t('footer.address')}</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={18} className={styles.contactIcon} />
              <a href="tel:+97600000000" className={styles.link}>+976 0000-0000</a>
            </div>
            <div className={styles.contactItem}>
              <Mail size={18} className={styles.contactIcon} />
              <a href="mailto:concierge@fame.mn" className={styles.link}>concierge@fame.mn</a>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Fame Luxury Directory. {t('footer.rights')}
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/" className={styles.bottomLink}>{t('footer.privacyPolicy')}</Link>
            <Link href="/" className={styles.bottomLink}>{t('footer.termsOfService')}</Link>
            <Link href="/" className={styles.bottomLink}>{t('footer.cookiePolicy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
