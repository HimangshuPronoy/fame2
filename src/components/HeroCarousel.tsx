"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SearchBar from "./SearchBar";
import styles from "./HeroCarousel.module.css";

const backgrounds = [
  {
    id: "cocktail",
    src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=2070", // Luxury cocktail
    alt: "Luxury Cocktail Event",
  },
  {
    id: "luxury-pool",
    src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=2070", // Luxury modern pool estate
    alt: "Premium Estate Pool",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 4000); // Slower transition for premium feel
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          className={styles.bgImageWrapper}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Image
            src={backgrounds[currentIndex].src}
            alt={backgrounds[currentIndex].alt}
            fill
            priority
            className={styles.bgImage}
          />
          <div className={styles.overlay} />
        </motion.div>
      </AnimatePresence>

      <div className={styles.container}>
        <div className={styles.content}>
          <motion.div 
            className={styles.subtitleWrapper}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className={styles.line}></div>
            <span className={styles.subtitleTag}>AI-POWERED DISCOVERY</span>
          </motion.div>

          <motion.h1 
            className={styles.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Find the Best <br />
            <span className={styles.italicText}>Businesses.</span>
          </motion.h1>
          
          <motion.p 
            className={styles.description}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Discover Mongolia&apos;s top-rated restaurants, gyms, spas, and nightlife.
            Curated recommendations powered by AI, trusted by locals.
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className={styles.searchWrapper}
        >
          <SearchBar />
        </motion.div>
      </div>
    </section>
  );
}
