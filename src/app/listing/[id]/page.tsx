import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Star, Heart, Share, Phone, Globe, Clock, LayoutGrid, Image as ImageIcon, MessageSquare, Map } from "lucide-react";
import styles from "./page.module.css";
import Header from "@/components/Header";

// Note: In a real app this would fetch from a DB
const mockListings = [
  {
    id: 1,
    title: "Beauty hairsalon",
    subtitle: "Modern Hair Style Salon",
    category: "Beauty",
    location: "Manhattan, New York",
    phone: "+84-666-888-99",
    price: "80$",
    rating: 5,
    reviews: 3,
    imagesCount: 5,
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    image: "https://images.unsplash.com/photo-1516975080661-46bbfcb6be76?auto=format&fit=crop&q=80&w=2070",
    description: "Experience premium hair care and styling at our internationally acclaimed salon in the heart of Manhattan. Our expert stylists use only the finest products to ensure your hair looks its absolute best."
  },
  {
    id: 5,
    title: "Alpha Fitness Studio",
    subtitle: "Premium Equipment & Classes",
    category: "Fitness & Gym",
    location: "123 Main St, Brooklyn, NY",
    phone: "+1-555-019-8822",
    price: "150$",
    rating: 4.8,
    reviews: 128,
    imagesCount: 8,
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=2070",
    description: "Alpha Fitness is your premier destination for achieving your fitness goals. Featuring state-of-the-art equipment, personalized training programs, and a vibrant community of health enthusiasts."
  }
];

export default async function ListingDetail({ params }: { params: Promise<{ id: string }> }) {
  // Find listing or fallback
  const resolvedParams = await params;
  const listing = mockListings.find(l => l.id === parseInt(resolvedParams.id)) || mockListings[1];

  return (
    <div className={styles.pageContainer}>
      <Header transparent={false} />

      <main className={styles.mainLayout}>
        {/* Left Sidebar Match Reference 3 */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <Link href="/listings" className={styles.backLink}>
              <ArrowLeft size={16} /> Back to Listings
            </Link>

            <nav className={styles.navMenu}>
              <button className={`${styles.navItem} ${styles.navItemActive}`}>
                <LayoutGrid size={18} /> Overview
              </button>
              <button className={styles.navItem}>
                <ImageIcon size={18} /> Gallery ({listing.imagesCount})
              </button>
              <button className={styles.navItem}>
                <MessageSquare size={18} /> Reviews ({listing.reviews})
              </button>
              <button className={styles.navItem}>
                <Map size={18} /> Location
              </button>
            </nav>

            <div className={styles.bookingWidget}>
              <div className={styles.priceHeader}>
                <span className={styles.priceLabel}>Starting from</span>
                <span className={styles.price}>{listing.price}</span>
              </div>
              <button className={styles.primaryBtn}>
                Request Booking
              </button>
              <div className={styles.actionRow}>
                <button className={styles.iconBtn}><Heart size={18} /> Save</button>
                <button className={styles.iconBtn}><Share size={18} /> Share</button>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className={styles.contentArea}>
          <div className={styles.heroHeader}>
            <div>
              <div className={styles.tags}>
                <span className={styles.tag}>{listing.category}</span>
                <span className={styles.tagStatus}>Open Now</span>
              </div>
              <h1 className={styles.title}>{listing.title}</h1>
              <p className={styles.subtitle}>{listing.subtitle}</p>
              
              <div className={styles.metaRow}>
                <div className={styles.ratingInfo}>
                  <Star size={16} fill="#fbbf24" color="#fbbf24" />
                  <span className={styles.rating}>{listing.rating}</span>
                  <span className={styles.reviews}>({listing.reviews} reviews)</span>
                </div>
                <div className={styles.location}>
                  <MapPin size={16} />
                  <span>{listing.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.imageGrid}>
            <div className={styles.mainImageWrapper}>
              <Image 
                src={listing.image} 
                alt={listing.title}
                fill
                priority
                className={styles.gridImage}
              />
            </div>
            <div className={styles.sideImages}>
              <div className={styles.smallImageWrapper}>
                 <Image src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2070" fill alt="detail 1" className={styles.gridImage} />
              </div>
              <div className={styles.smallImageWrapper}>
                 <Image src="https://images.unsplash.com/photo-1536922246289-88c42f957773?auto=format&fit=crop&q=80&w=2104" fill alt="detail 2" className={styles.gridImage} />
                 <div className={styles.moreImagesOverlay}>
                    <span>+{listing.imagesCount - 3} Photos</span>
                 </div>
              </div>
            </div>
          </div>

          <div className={styles.detailsGrid}>
            <section className={styles.cardSection}>
              <h2 className={styles.sectionTitle}>About this place</h2>
              <p className={styles.description}>{listing.description}</p>
            </section>

            <section className={styles.cardSection}>
              <h2 className={styles.sectionTitle}>Contact Information</h2>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <Phone size={18} className={styles.contactIcon} />
                  <span>{listing.phone}</span>
                </div>
                <div className={styles.contactItem}>
                  <Globe size={18} className={styles.contactIcon} />
                  <a href="#" className={styles.link}>Visit official website</a>
                </div>
                <div className={styles.contactItem}>
                  <Clock size={18} className={styles.contactIcon} />
                  <span>9:00 AM - 10:00 PM (Today)</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
