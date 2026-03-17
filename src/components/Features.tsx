import { Search, ShieldCheck, MapPin } from "lucide-react";
import styles from "./Features.module.css";

export default function Features() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>THREE SIMPLE STEPS</span>
          <h2 className={styles.title}>Experience the World of Fame</h2>
        </div>

        <div className={styles.stepsContainer}>
          <div className={styles.connectingLine}></div>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.iconCircle}>
                <Search size={24} strokeWidth={1.5} color="#111827" />
              </div>
              <h3 className={styles.cardTitle}>Discover Nearby</h3>
              <p className={styles.cardDesc}>
                Search by category or keyword to find the most trending spots in your current city.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.iconCircle}>
                <ShieldCheck size={24} strokeWidth={1.5} color="#111827" />
              </div>
              <h3 className={styles.cardTitle}>Verified Choice</h3>
              <p className={styles.cardDesc}>
                Check for the &apos;Fame Verified&apos; badge to ensure premium service and verified authenticity.
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.iconCircle}>
                <MapPin size={24} strokeWidth={1.5} color="#111827" />
              </div>
              <h3 className={styles.cardTitle}>Experience Excellence</h3>
              <p className={styles.cardDesc}>
                Use Fame hooks for instant access or book directly through our verified partners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
