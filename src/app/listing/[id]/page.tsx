import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Star, Phone, Globe, Clock, LayoutGrid, Image as ImageIcon, MessageSquare, Map } from "lucide-react";
import styles from "./page.module.css";
import Header from "@/components/Header";
import Reviews from "@/components/Reviews";
import BookingWidget from "@/components/BookingWidget";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  const { data: listing } = await supabase
    .from("listings")
    .select("*")
    .eq("id", resolvedParams.id)
    .eq("is_active", true)
    .single();

  if (!listing) {
    return {
      title: "Listing Not Found | Fame.",
    };
  }

  return {
    title: `${listing.title} | Fame.`,
    description: listing.subtitle || listing.description || `Discover ${listing.title} on Fame.`,
    openGraph: {
      title: listing.title,
      description: listing.subtitle || listing.description || "",
      images: listing.image_url ? [listing.image_url] : [],
    },
  };
}

export default async function ListingDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  const { data: listing, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", resolvedParams.id)
    .eq("is_active", true)
    .single();

  if (error || !listing) {
    notFound();
  }

  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.mainLayout}>
        {/* Left Sidebar */}
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
                <ImageIcon size={18} /> Gallery
              </button>
              <button className={styles.navItem}>
                <MessageSquare size={18} /> Reviews ({listing.reviews})
              </button>
              <button className={styles.navItem}>
                <Map size={18} /> Location
              </button>
            </nav>

            <div className={styles.bookingWidget}>
              <BookingWidget 
                listingId={listing.id} 
                price={listing.price ?? "Contact for pricing"} 
              />
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
                {listing.location && (
                  <div className={styles.location}>
                    <MapPin size={16} />
                    <span>{listing.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.imageGrid}>
            <div className={styles.mainImageWrapper}>
              {listing.image_url ? (
                <Image
                  src={listing.image_url}
                  alt={listing.title}
                  fill
                  priority
                  className={styles.gridImage}
                />
              ) : (
                <div style={{ background: "#f3f4f6", width: "100%", height: "100%" }} />
              )}
            </div>
            <div className={styles.sideImages}>
              <div className={styles.smallImageWrapper}>
                <Image src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2070" fill alt="detail 1" className={styles.gridImage} />
              </div>
              <div className={styles.smallImageWrapper}>
                <Image src="https://images.unsplash.com/photo-1536922246289-88c42f957773?auto=format&fit=crop&q=80&w=2104" fill alt="detail 2" className={styles.gridImage} />
                <div className={styles.moreImagesOverlay}>
                  <span>More Photos</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.detailsGrid}>
            {listing.description && (
              <section className={styles.cardSection}>
                <h2 className={styles.sectionTitle}>About this place</h2>
                <p className={styles.description}>{listing.description}</p>
              </section>
            )}

            <section className={styles.cardSection}>
              <h2 className={styles.sectionTitle}>Contact Information</h2>
              <div className={styles.contactList}>
                {listing.phone && (
                  <div className={styles.contactItem}>
                    <Phone size={18} className={styles.contactIcon} />
                    <span>{listing.phone}</span>
                  </div>
                )}
                {listing.website && (
                  <div className={styles.contactItem}>
                    <Globe size={18} className={styles.contactIcon} />
                    <a href={listing.website} className={styles.link} target="_blank" rel="noopener noreferrer">Visit official website</a>
                  </div>
                )}
                <div className={styles.contactItem}>
                  <Clock size={18} className={styles.contactIcon} />
                  <span>9:00 AM – 10:00 PM (Today)</span>
                </div>
              </div>
            </section>
          </div>

          {/* Reviews Section */}
          <div style={{ marginTop: '40px' }}>
            <Reviews listingId={listing.id} />
          </div>
        </div>
      </main>
    </div>
  );
}
