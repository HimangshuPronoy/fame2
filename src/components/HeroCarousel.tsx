"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SearchBar from "./SearchBar";
import styles from "./HeroCarousel.module.css";

const backgrounds = [
  {
    id: "luxury",
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2075&ixlib=rb-4.0.3", // Replace with an opulent mansion/pool image
    alt: "Luxury Estate",
  },
  {
    id: "nature",
    src: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2074&ixlib=rb-4.0.3",
    alt: "Nature background",
  },
  {
    id: "gym",
    src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
    alt: "Gym background",
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
            <span className={styles.subtitleTag}>CURATED EXCELLENCE</span>
          </motion.div>

          <motion.h1 
            className={styles.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover the <br />
            <span className={styles.italicText}>Extraordinary.</span>
          </motion.h1>
          
          <motion.p 
            className={styles.description}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Fame hand-verifies the world&apos;s most exclusive restaurants, secret
            nightspots, and elite wellness centers. Welcome to the pinnacle of
            lifestyle discovery.
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
