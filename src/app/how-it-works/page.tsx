"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/lib/language-context";
import styles from "./page.module.css";
import { Search, ShieldCheck, MapPin } from "lucide-react";

export default function HowItWorksPage() {
  const { t } = useLanguage();

  return (
    <main>
      <Header />
      <div className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>{t('nav.howItWorks')}</h1>
          <p className={styles.subtitle}>Your personal lifestyle assistant for Ulaanbaatar&apos;s most exclusive experiences.</p>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.step}>
              <div className={styles.number}>1</div>
              <div className={styles.iconCircle}>
                <Search size={32} />
              </div>
              <h3>{t('features.step1.title')}</h3>
              <p>{t('features.step1.desc')}</p>
            </div>

            <div className={styles.step}>
              <div className={styles.number}>2</div>
              <div className={styles.iconCircle}>
                <ShieldCheck size={32} />
              </div>
              <h3>{t('features.step2.title')}</h3>
              <p>{t('features.step2.desc')}</p>
            </div>

            <div className={styles.step}>
              <div className={styles.number}>3</div>
              <div className={styles.iconCircle}>
                <MapPin size={32} />
              </div>
              <h3>{t('features.step3.title')}</h3>
              <p>{t('features.step3.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.bgLight}`}>
        <div className={styles.container}>
          <div className={styles.contentCenter}>
            <h2 className={styles.sectionTitle}>{t('curation.title')}</h2>
            <p className={styles.sectionDesc}>{t('curation.desc')}</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
