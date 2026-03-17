import Image from "next/image";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    id: 1,
    name: "David Chen",
    role: "Nightlife Curator",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    quote: "Mapping out a night in a new city used to take hours. Fame does it in seconds with verified spots."
  },
  {
    id: 2,
    name: "Sofia Meyer",
    role: "Spa Reviewer",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    quote: "Luxury wellness spots are hard to verify. Fame's council does the work for us. Incredible service."
  },
  {
    id: 3,
    name: "Enkhbold T.",
    role: "Lifestyle Blogger",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    quote: "Fame has completely changed how I discover hidden gems in my city. The curation is perfectly aligned with premium tastes."
  }
];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Loved by Explorers</h2>
          <p className={styles.description}>
            Hear from our global community of lifestyle enthusiasts.
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
