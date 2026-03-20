"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/language-context";
import styles from "./page.module.css";
import { Smartphone, MessageSquare, Sparkles, ShieldCheck } from "lucide-react";

export default function ConciergePage() {
  const { t } = useLanguage();

  return (
    <main>
      <Header />
      <div className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.badge}>FAME EXCLUSIVE</span>
          <h1 className={styles.title}>{t('nav.concierge')}</h1>
          <p className={styles.subtitle}>
            Your personal lifestyle assistant for Ulaanbaatar&apos;s most exclusive experiences.
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <MessageSquare size={32} />
              </div>
              <h3>Instant Bookings</h3>
              <p>Skip the wait. Our concierge team handles all reservations for you directly.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <Sparkles size={32} />
              </div>
              <h3>Curated Itineraries</h3>
              <p>Personalized plans for your weekend, business trip, or special occasion.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <ShieldCheck size={32} />
              </div>
              <h3>Exclusive Access</h3>
              <p>Gain entry to member-only clubs and private events across the city.</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.iconWrapper}>
                <Smartphone size={32} />
              </div>
              <h3>24/7 Digital Assistant</h3>
              <p>Always available via WhatsApp or our premium app dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready for the Extraordinary?</h2>
            <p>Join Fame Premium today and unlock your personal concierge.</p>
            <button className={styles.primaryBtn}>{t('nav.join')}</button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
