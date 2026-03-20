"use client";

import Image from "next/image";
import styles from "./PremiumCuration.module.css";
import { useLanguage } from "@/lib/language-context";

export default function PremiumCuration() {
  const { t } = useLanguage();
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.subtitle}>{t('curation.subtitle')}</span>
          <h2 className={styles.title}>
            {t('curation.title').split(' ').map((word, i) => 
               word.toLowerCase() === 'best' || word === 'шилдэг' ? <span key={i} className={styles.highlight}>{word} </span> : word + ' '
            )}
          </h2>
          <p className={styles.description}>
            {t('curation.desc')}
          </p>

          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <h3 className={styles.statValue}>5.8k+</h3>
              <p className={styles.statLabel}>{t('curation.stats.verified')}</p>
            </div>
            <div className={styles.statItem}>
              <h3 className={styles.statValue}>12</h3>
              <p className={styles.statLabel}>{t('curation.stats.cities')}</p>
            </div>
            <div className={styles.statItem}>
              <h3 className={styles.statValue}>24/7</h3>
              <p className={styles.statLabel}>{t('curation.stats.access')}</p>
            </div>
          </div>
        </div>

        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            <Image 
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2080" 
              alt="Luxury Pool" 
              fill 
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
