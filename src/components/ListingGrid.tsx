"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Dumbbell, Utensils, Sparkles, MapPin, 
  Phone, Camera, Video, Heart, Star, ChevronLeft, ChevronRight 
} from "lucide-react";
import styles from "./ListingGrid.module.css";

const mockListings = [
  {
    id: 1,
    title: "Beauty hairsalon",
    subtitle: "Modern Hair Style Salon",
    category: "Beauty",
    Icon: Sparkles,
    catColor: "#22c55e",
    location: "Manhattan, New York",
    phone: "+84-666-888-99",
    price: "80$",
    rating: 5,
    reviews: 3,
    imagesCount: 5,
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1516975080661-46bbfcb6be76?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 2,
    title: "Get into Fitness",
    subtitle: "We Care For you",
    category: "Fitness",
    Icon: Dumbbell,
    catColor: "#22c55e",
    location: "Brooklyn, New York",
    phone: "+84-666-888-99",
    price: "100$",
    rating: 4.5,
    reviews: 3,
    imagesCount: 3,
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 3,
    title: "Shape gym training",
    subtitle: "Best Traveling in The UK",
    category: "Fitness",
    Icon: Dumbbell,
    catColor: "#22c55e",
    location: "California",
    phone: "+84-666-888-99",
    price: "100$",
    rating: 4,
    reviews: 3,
    imagesCount: 5,
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 4,
    title: "Foodie Restaurant",
    subtitle: "One of the best Restaurant",
    category: "Restaurants",
    Icon: Utensils,
    catColor: "#22c55e",
    location: "Chicago",
    phone: "+84-666-888-99",
    price: "200$",
    rating: 4,
    reviews: 3,
    imagesCount: 6,
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 5,
    title: "Alpha Fitness",
    subtitle: "Premium Equipment & Classes",
    category: "Fitness",
    Icon: Dumbbell,
    catColor: "#22c55e",
    location: "Los Angeles",
    phone: "+84-666-888-99",
    price: "150$",
    rating: 5,
    reviews: 3,
    imagesCount: 4,
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 6,
    title: "Silver Rose Store",
    subtitle: "Outdoor, luxury for you",
    category: "Beauty",
    Icon: Sparkles,
    catColor: "#22c55e",
    location: "California",
    phone: "+84-666-888-99",
    price: "80$",
    rating: 4.5,
    reviews: 2,
    imagesCount: 4,
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=2074"
  },
  {
    id: 7,
    title: "Steakhouse Prime",
    subtitle: "Exquisite dining experience",
    category: "Restaurants",
    Icon: Utensils,
    catColor: "#22c55e",
    location: "Dallas, Texas",
    phone: "+84-666-888-99",
    price: "250$",
    rating: 5,
    reviews: 8,
    imagesCount: 7,
    authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1544025162-811c2a075253?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: 8,
    title: "The Velvet Lounge",
    subtitle: "Exclusive VIP Nightlife",
    category: "Nightlife",
    Icon: Sparkles,
    catColor: "#22c55e",
    location: "Miami, Florida",
    phone: "+84-666-888-99",
    price: "300$",
    rating: 4.8,
    reviews: 12,
    imagesCount: 5,
    authorAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=2070"
  }
];

export default function ListingGrid() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const scrollAmount = 400; // Roughly one card width
      
      // Handle wrapping behavior
      if (direction === 'right' && scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (direction === 'left' && scrollLeft <= 0) {
        scrollContainerRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scroll('right');
    }, 4000); // Scroll every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.header}>
            <span className={styles.subtitle}>HANDPICKED PLACES</span>
            <h2 className={styles.title}>See latest listings</h2>
          </div>
          <div className={styles.navControls}>
            <button onClick={() => scroll('left')} className={styles.navBtn} aria-label="Scroll left">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scroll('right')} className={styles.navBtn} aria-label="Scroll right">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className={styles.grid} ref={scrollContainerRef}>
          {mockListings.map((listing) => (
            <Link href={`/listing/${listing.id}`} key={listing.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={listing.image}
                  alt={listing.title}
                  fill
                  className={styles.image}
                />
                <div className={styles.badges}>
                  <span className={`${styles.badge} ${styles.badgeOpen}`}>Open</span>
                  <span className={`${styles.badge} ${styles.badgeFeatured}`}>Featured</span>
                </div>
                <div className={styles.authorAvatar}>
                  <Image src={listing.authorAvatar} alt="Author" fill className={styles.avatarImage} />
                </div>
              </div>
              
              <div className={styles.content}>
                <div className={styles.metaRow}>
                  <div className={styles.categoryInfo} style={{ color: listing.catColor }}>
                    <listing.Icon size={14} />
                    <span>{listing.category} <span className={styles.catCount}>+1</span></span>
                  </div>
                  <div className={styles.dot}></div>
                  <div className={styles.ratingInfo}>
                    <div className={styles.stars}>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          fill={i < Math.floor(listing.rating) ? "#fbbf24" : i < listing.rating ? "url(#half-star)" : "#e5e7eb"} 
                          color={i < Math.floor(listing.rating) ? "#fbbf24" : "#e5e7eb"} 
                        />
                      ))}
                    </div>
                    <span>({listing.reviews} Reviews)</span>
                  </div>
                </div>

                <h3 className={styles.cardTitle}>{listing.title}</h3>
                <p className={styles.cardSubtitle}>{listing.subtitle}</p>

                <div className={styles.detailsRow}>
                  <MapPin size={14} className={styles.detailIcon} />
                  <span>{listing.location}</span>
                </div>
                <div className={styles.detailsRow}>
                  <Phone size={14} className={styles.detailIcon} />
                  <span>{listing.phone}</span>
                </div>
              </div>

              <div className={styles.footer}>
                <div className={styles.priceContainer}>
                  <span className={styles.priceLabel}>From</span>
                  <span className={styles.priceValue}>{listing.price}</span>
                </div>
                <div className={styles.actions}>
                  <button className={styles.actionBtn}>
                    <Camera size={14} />
                    <span className={styles.countBadge}>{listing.imagesCount}</span>
                  </button>
                  <button className={styles.actionBtn}>
                    <Video size={14} />
                  </button>
                  <button className={`${styles.actionBtn} ${styles.heartBtn}`}>
                    <Heart size={14} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
