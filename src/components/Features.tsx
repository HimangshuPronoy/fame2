"use client";

import { Search, ShieldCheck, MapPin } from "lucide-react";
import styles from "./Features.module.css";
import { useLanguage } from "@/lib/language-context";

export default function Features() {
  const { t } = useLanguage();
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>{t('features.subtitle')}</span>
          <h2 className={styles.title}>{t('features.title')}</h2>
        </div>

        <div className={styles.stepsContainer}>
          <div className={styles.connectingLine}></div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.iconCircle}>
                <Search size={24} strokeWidth={1.5} color="#111827" />
              </div>
              <h3 className={styles.cardTitle}>{t('features.step1.title')}</h3>
              <p className={styles.cardDesc}>
                {t('features.step1.desc')}
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.iconCircle}>
                <ShieldCheck size={24} strokeWidth={1.5} color="#111827" />
              </div>
              <h3 className={styles.cardTitle}>{t('features.step2.title')}</h3>
              <p className={styles.cardDesc}>
                {t('features.step2.desc')}
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.iconCircle}>
                <MapPin size={24} strokeWidth={1.5} color="#111827" />
              </div>
              <h3 className={styles.cardTitle}>{t('features.step3.title')}</h3>
              <p className={styles.cardDesc}>
                {t('features.step3.desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
