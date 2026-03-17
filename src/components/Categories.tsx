import { Utensils, GlassWater, Dumbbell, ShoppingBag, Plane, Sparkles } from "lucide-react";
import styles from "./Categories.module.css";

const categories = [
  { id: 1, title: "Restaurant", desc: "45 Places", icon: Utensils, color: "#ff4d4f", bg: "#fff1f0" },
  { id: 2, title: "Nightlife", desc: "12 Places", icon: GlassWater, color: "#eb2f96", bg: "#fff0f6" },
  { id: 3, title: "Fitness", desc: "28 Places", icon: Dumbbell, color: "#fa541c", bg: "#fff2e8" },
  { id: 4, title: "Shopping", desc: "60 Places", icon: ShoppingBag, color: "#f5222d", bg: "#fff1f0" },
  { id: 5, title: "Traveling", desc: "15 Places", icon: Plane, color: "#ff4d4f", bg: "#fff1f0" },
  { id: 6, title: "Beauty", desc: "34 Places", icon: Sparkles, color: "#fa8c16", bg: "#fff7e6" },
];

export default function Categories() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <span className={styles.subtitle}>DISCOVER CATEGORIES</span>
            <h2 className={styles.title}>Searching is more easy<br/>by category</h2>
          </div>
          <p className={styles.description}>
            Explore our meticulously curated categories to find exactly what you&apos;re looking for. From world-class dining to elite fitness centers, discover the best your city has to offer.
          </p>
        </div>

        <div className={styles.grid}>
          {categories.map((cat) => (
            <div key={cat.id} className={styles.card}>
              <div 
                className={styles.iconWrapper} 
                style={{ backgroundColor: cat.bg, color: cat.color }}
              >
                <cat.icon size={24} strokeWidth={1.5} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{cat.title}</h3>
                <p className={styles.cardDesc}>{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
