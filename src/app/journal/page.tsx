"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./journal.module.css";

const featuredArticle = {
  title: "The Rise of Underground Michelin Experiences in Tokyo",
  excerpt: "Discover the hidden culinary gems where world-class chefs are abandoning traditional fine dining for intimate, invite-only omakase counters hidden behind unmarked doors in Shinjuku and Shibuya.",
  author: "Elena Rossi",
  date: "Oct 24, 2024",
  readTime: "8 min read",
  category: "Gastronomy",
  image: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=2070"
};

const articles = [
  {
    id: 1,
    title: "10 Luxury Alpine Retreats to Book for the Upcoming Season",
    excerpt: "From Courchevel to St. Moritz, explore the most exclusive chalets offering private helipads, Michelin-trained personal chefs, and ski-in/ski-out access.",
    date: "Oct 22, 2024",
    category: "Travel",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 2,
    title: "The Resurgence of the Classic Martini: A Masterclass",
    excerpt: "World-renowned mixologists discuss the nuances of the perfect pour, the debate over gin versus vodka, and the importance of precise temperature control.",
    date: "Oct 18, 2024",
    category: "Nightlife",
    image: "https://images.unsplash.com/photo-1514361892635-427382283a21?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 3,
    title: "High-Performance Recovery: Inside Elite Cryotherapy Centers",
    excerpt: "Professional athletes aren't the only ones utilizing sub-zero temperatures. Explore how luxury wellness centers are incorporating cryotherapy for longevity.",
    date: "Oct 15, 2024",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2120"
  },
  {
    id: 4,
    title: "Curating a Modern Wine Cellar: An Investor's Guide",
    excerpt: "Beyond Bordeaux and Burgundy. How to identify emerging blue-chip wines from Napa Valley and Tuscany for long-term portfolio growth.",
    date: "Oct 10, 2024",
    category: "Collection",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 5,
    title: "The Architecture of Sound: Inside Private Listening Rooms",
    excerpt: "Why high-net-worth individuals are commissioning acoustically perfect rooms housing six-figure analog audio systems.",
    date: "Oct 05, 2024",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 6,
    title: "Sustainable Haute Couture: A Paradox?",
    excerpt: "Investigating how heritage fashion houses are adapting their supply chains and sourcing methods without compromising on craftsmanship.",
    date: "Sep 28, 2024",
    category: "Style",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070"
  }
];

export default function JournalPage() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image 
            src="https://images.unsplash.com/photo-1516280440503-a2f2dd9090aa?auto=format&fit=crop&q=80&w=2070" 
            alt="Fame Journal" 
            fill 
            className={styles.heroImage} 
            priority
          />
          <div className={styles.heroOverlay} />
        </div>
        
        <div className={styles.heroContent}>
          <h1 className={styles.title}>The Journal</h1>
          <p className={styles.subtitle}>
            Profiles, insights, and cultural commentary curating the pinnacle of modern luxury.
          </p>
        </div>
      </section>

      <main className={styles.mainLayout}>
        {/* Featured Article */}
        <article className={styles.featuredArticle}>
          <div className={styles.featuredImage}>
            <Image 
              src={featuredArticle.image} 
              alt={featuredArticle.title} 
              fill 
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.featuredContent}>
            <span className={styles.tag}>{featuredArticle.category}</span>
            <h2 className={styles.featuredTitle}>{featuredArticle.title}</h2>
            <p className={styles.featuredExcerpt}>{featuredArticle.excerpt}</p>
            <div className={styles.cardMeta} style={{ marginBottom: '32px' }}>
              <span>By {featuredArticle.author}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} /> {featuredArticle.readTime}
              </span>
            </div>
            <Link href="#" className={styles.readMore}>
              Read the Full Story <ArrowRight size={18} />
            </Link>
          </div>
        </article>

        <h3 className={styles.gridTitle}>Latest Stories</h3>
        
        {/* Article Grid */}
        <div className={styles.articleGrid}>
          {articles.map((article) => (
            <Link href="#" key={article.id} style={{ textDecoration: 'none' }}>
              <article className={styles.articleCard}>
                <div className={styles.cardImageWrapper}>
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    fill 
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span style={{ color: '#d4af37', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {article.category}
                    </span>
                    <span>{article.date}</span>
                  </div>
                  <h4 className={styles.cardTitle}>{article.title}</h4>
                  <p className={styles.cardExcerpt}>{article.excerpt}</p>
                  <span className={styles.readMore}>
                    Read Article <ArrowRight size={16} />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
