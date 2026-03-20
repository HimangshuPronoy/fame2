"use client";

import Image from "next/image";
import styles from "./Testimonials.module.css";
import { useLanguage } from "@/lib/language-context";

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      id: 1,
      name: "David Chen",
      role: t('testimonials.role.curator'),
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      quote: t('testimonials.quote1')
    },
    {
      id: 2,
      name: "Sofia Meyer",
      role: t('testimonials.role.reviewer'),
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      quote: t('testimonials.quote2')
    },
    {
      id: 3,
      name: "Enkhbold T.",
      role: t('testimonials.role.blogger'),
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      quote: t('testimonials.quote3')
    }
  ];
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('testimonials.title')}</h2>
          <p className={styles.description}>
            {t('testimonials.desc')}
          </p>
        </div>

        <div className={styles.carouselContainer}>
          <div className={styles.carousel}>
            {testimonials.map((t) => (
              <div key={t.id} className={styles.card}>
                <div className={styles.authorRow}>
                  <div className={styles.avatarWrapper}>
                    <Image src={t.avatar} alt={t.name} fill className={styles.avatar} />
                  </div>
                  <div className={styles.authorInfo}>
                    <h4 className={styles.authorName}>{t.name}</h4>
                    <p className={styles.authorRole}>{t.role}</p>
                  </div>
                </div>
                <p className={styles.quote}>&quot;{t.quote}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
