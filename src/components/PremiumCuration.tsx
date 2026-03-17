import Image from "next/image";
import styles from "./PremiumCuration.module.css";

export default function PremiumCuration() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.subtitle}>PREMIUM CURATION</span>
          <h2 className={styles.title}>
            Only the <span className={styles.highlight}>Best</span><br />
            Makes the Cut.
          </h2>
          <p className={styles.description}>
            We don&apos;t list every place. We list the right places. Our &apos;Excellence Council&apos; personally visits and verifies every establishment before it earns the Fame mark.
          </p>

          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <h3 className={styles.statValue}>5.8k+</h3>
              <p className={styles.statLabel}>VERIFIED SPOTS</p>
            </div>
            <div className={styles.statItem}>
              <h3 className={styles.statValue}>12</h3>
              <p className={styles.statLabel}>GLOBAL CITIES</p>
            </div>
            <div className={styles.statItem}>
              <h3 className={styles.statValue}>24/7</h3>
              <p className={styles.statLabel}>ACCESS HOOKS</p>
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
