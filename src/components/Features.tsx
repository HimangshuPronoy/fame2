import { Search, ShieldCheck, MapPin } from "lucide-react";
import styles from "./Features.module.css";

export default function Features() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>HOW IT WORKS</span>
          <h2 className={styles.title}>Discover Businesses Near You</h2>
        </div>

        <div className={styles.stepsContainer}>
          <div className={styles.connectingLine}></div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.iconCircle}>
                <Search size={24} strokeWidth={1.5} color="#111827" />
              </div>
              <h3 className={styles.cardTitle}>Search & Discover</h3>
              <p className={styles.cardDesc}>
                Find the best gyms, restaurants, spas, and nightlife in your area. AI-powered recommendations.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.iconCircle}>
                <ShieldCheck size={24} strokeWidth={1.5} color="#111827" />
              </div>
              <h3 className={styles.cardTitle}>Verified Quality</h3>
              <p className={styles.cardDesc}>
                Every business is hand-curated and verified for quality. Only the best make it to Fame.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.iconCircle}>
                <MapPin size={24} strokeWidth={1.5} color="#111827" />
              </div>
              <h3 className={styles.cardTitle}>Visit & Enjoy</h3>
              <p className={styles.cardDesc}>
                Get directions, contact info, and all the details you need to experience the best spots.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
