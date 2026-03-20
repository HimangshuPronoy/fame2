import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Mail, Phone } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              Fame<span className={styles.logoDot}>.</span>
            </Link>
            <p className={styles.brandDesc}>
              Discover the extraordinary. We hand-verify the world&apos;s most exclusive restaurants, secret nightspots, and elite wellness centers.
            </p>
            <div className={styles.socials}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socialLink}><Facebook size={20} /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socialLink}><Twitter size={20} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialLink}><Instagram size={20} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.socialLink}><Youtube size={20} /></a>
            </div>
          </div>

          <div className={styles.gridCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li><Link href="/listings" className={styles.link}>Explore Listings</Link></li>
              <li><Link href="/listings" className={styles.link}>Trending Locations</Link></li>
              <li><Link href="/dashboard" className={styles.link}>Submit a Listing</Link></li>
              <li><Link href="/login" className={styles.link}>Member Login</Link></li>
              <li><Link href="/dashboard" className={styles.link}>Admin Portal</Link></li>
            </ul>
          </div>

          <div className={styles.gridCol}>
            <h4 className={styles.colTitle}>Categories</h4>
            <ul className={styles.linkList}>
              <li><Link href="/listings?category=Restaurants" className={styles.link}>Fine Dining</Link></li>
              <li><Link href="/listings?category=Nightlife" className={styles.link}>Exclusive Nightlife</Link></li>
              <li><Link href="/listings?category=Fitness" className={styles.link}>Elite Fitness</Link></li>
              <li><Link href="/listings?category=Retail" className={styles.link}>Luxury Shopping</Link></li>
              <li><Link href="/listings?category=Wellness" className={styles.link}>Wellness Spas</Link></li>
            </ul>
          </div>

          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Contact Us</h4>
            <div className={styles.contactItem}>
              <MapPin size={18} className={styles.contactIcon} />
              <span>123 Luxury Ave, Manhattan, NY 10001</span>
            </div>
            <div className={styles.contactItem}>
              <Phone size={18} className={styles.contactIcon} />
              <a href="tel:+1234567890" className={styles.link}>+1 (234) 567-890</a>
            </div>
            <div className={styles.contactItem}>
              <Mail size={18} className={styles.contactIcon} />
              <a href="mailto:concierge@fame.com" className={styles.link}>concierge@fame.com</a>
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Fame Luxury Directory. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/" className={styles.bottomLink}>Privacy Policy</Link>
            <Link href="/" className={styles.bottomLink}>Terms of Service</Link>
            <Link href="/" className={styles.bottomLink}>Cookie Context</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
