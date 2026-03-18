"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Utensils, GlassWater, Dumbbell, ShoppingBag, Plane, Sparkles } from "lucide-react";
import styles from "./Categories.module.css";
import { supabase } from "@/lib/supabase";

interface CategoryData {
  title: string;
  dbCategory: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

const categoryConfig: CategoryData[] = [
  { title: "Restaurant", dbCategory: "Restaurants", icon: Utensils, color: "#ff4d4f", bg: "#fff1f0" },
  { title: "Nightlife", dbCategory: "Nightlife", icon: GlassWater, color: "#eb2f96", bg: "#fff0f6" },
  { title: "Fitness", dbCategory: "Fitness", icon: Dumbbell, color: "#fa541c", bg: "#fff2e8" },
  { title: "Shopping", dbCategory: "Beauty", icon: ShoppingBag, color: "#f5222d", bg: "#fff1f0" },
  { title: "Wellness", dbCategory: "Spa", icon: Plane, color: "#9333ea", bg: "#faf5ff" },
  { title: "Beauty", dbCategory: "Beauty", icon: Sparkles, color: "#fa8c16", bg: "#fff7e6" },
];

export default function Categories() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchCounts() {
      const { data } = await supabase
        .from("listings")
        .select("category")
        .eq("is_active", true);
      if (data) {
        const c: Record<string, number> = {};
        data.forEach((row: { category: string }) => {
          c[row.category] = (c[row.category] || 0) + 1;
        });
        setCounts(c);
      }
    }
    fetchCounts();
  }, []);

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
          {categoryConfig.map((cat) => (
            <Link href={`/listings?category=${cat.dbCategory}`} key={cat.title} className={styles.card} style={{ textDecoration: 'none' }}>
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: cat.bg, color: cat.color }}
              >
                <cat.icon size={24} strokeWidth={1.5} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{cat.title}</h3>
                <p className={styles.cardDesc}>{counts[cat.dbCategory] ?? 0} Places</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
