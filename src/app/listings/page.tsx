"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  ChevronDown, ChevronUp, MapPin, 
  Camera, Heart, Star, Navigation
} from "lucide-react";
import styles from "./listings.module.css";
import Header from "@/components/Header"; /* Reuse our standard header, or we can build a custom topbar if needed. The image shows a dark topbar, which our header already is. */

const locations = ["New York", "Los Angeles", "Miami", "Chicago", "Dallas", "Houston"];

const mockListings = [
  // Los Angeles
  {
    id: 1,
    title: "Alpha Fitness",
    category: "Fitness & Gym",
    location: "222 Sunset Blvd, Los Angeles, CA",
    price: "$150/mo",
    rating: 5.0,
    distance: "1.2 mi",
    reviews: 215,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=2070",
    imagesCount: 9
  },
  {
    id: 2,
    title: "Elite Performance Gym",
    category: "Fitness & Gym",
    location: "890 Cedars, Los Angeles, CA",
    price: "$250/mo",
    rating: 5.0,
    distance: "4.5 mi",
    reviews: 89,
    image: "https://images.unsplash.com/photo-1536922246289-88c42f957773?auto=format&fit=crop&q=80&w=2104",
    imagesCount: 10
  },
  {
    id: 3,
    title: "Serenity Spa & Wellness",
    category: "Spas & Wellness",
    location: "456 Mulholland Dr, Los Angeles, CA",
    price: "$180/mo",
    rating: 4.8,
    distance: "2.1 mi",
    reviews: 143,
    image: "https://images.unsplash.com/photo-1544025162-811c2a075253?auto=format&fit=crop&q=80&w=2070",
    imagesCount: 7
  },
  {
    id: 4,
    title: "Nobu Restaurant LA",
    category: "Restaurants",
    location: "903 Malibu Coast, Los Angeles, CA",
    price: "$300/mo",
    rating: 4.9,
    distance: "6.2 mi",
    reviews: 321,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2070",
    imagesCount: 12
  },
  {
    id: 5,
    title: "Velvet Nightclub",
    category: "Nightlife",
    location: "100 Hollywood Blvd, Los Angeles, CA",
    price: "$400/mo",
    rating: 4.6,
    distance: "3.0 mi",
    reviews: 66,
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=2070",
    imagesCount: 5
  },
  // New York
  {
    id: 6,
    title: "Alpha Fitness Studio",
    category: "Fitness & Gym",
    location: "123 Main St, Brooklyn, NY",
    price: "$120/mo",
    rating: 4.8,
    distance: "2.4 mi",
    reviews: 128,
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=2070",
    imagesCount: 8
  },
  {
    id: 7,
    title: "The Iron Room",
    category: "Fitness & Gym",
    location: "101 Willow Ln, Manhattan, NY",
    price: "$200/mo",
    rating: 4.9,
    distance: "1.1 mi",
    reviews: 84,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2070",
    imagesCount: 6
  },
  // Miami
  {
    id: 8,
    title: "Zenith Wellness & Spa",
    category: "Spas & Wellness",
    location: "789 Elm Rd, Miami, FL",
    price: "$150/mo",
    rating: 4.7,
    distance: "5.0 mi",
    reviews: 210,
    image: "https://images.unsplash.com/photo-1544025162-811c2a075253?auto=format&fit=crop&q=80&w=2070",
    imagesCount: 12
  },
  // Chicago
  {
    id: 9,
    title: "Neon Boxing Club",
    category: "Fitness & Gym",
    location: "345 Maple Ct, Chicago, IL",
    price: "$90/mo",
    rating: 4.5,
    distance: "3.2 mi",
    reviews: 56,
    image: "https://images.unsplash.com/photo-1549476464-37392f717541?auto=format&fit=crop&q=80&w=2070",
    imagesCount: 4
  },
  // Dallas
  {
    id: 10,
    title: "Oasis Yoga Center",
    category: "Spas & Wellness",
    location: "111 Pinecrest Rd, Dallas, TX",
    price: "$110/mo",
    rating: 4.9,
    distance: "0.8 mi",
    reviews: 320,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=2099",
    imagesCount: 5
  },
  // Houston
  {
    id: 11,
    title: "Luxe Boutique",
    category: "Luxury Retail",
    location: "678 River Oaks Blvd, Houston, TX",
    price: "$350/mo",
    rating: 4.7,
    distance: "1.9 mi",
    reviews: 41,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070",
    imagesCount: 6
  }
];

export default function ListingsPage() {
  const [activeLocation, setActiveLocation] = useState("Los Angeles");
  const [typeOpen, setTypeOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);

  // Filter States — no default; show all on first load
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const togglePrice = (priceRange: string) => {
    setSelectedPrices(prev => 
      prev.includes(priceRange)
        ? prev.filter(p => p !== priceRange)
        : [...prev, priceRange]
    );
  };

  const removeFilter = (type: 'category' | 'price', value: string) => {
    if (type === 'category') {
      setSelectedCategories(prev => prev.filter(c => c !== value));
    } else {
      setSelectedPrices(prev => prev.filter(p => p !== value));
    }
  };

  // Helper to check if a listing matches the price range (simple mockup logic mapping)
  const matchesPrice = (listingPrice: string, ranges: string[]) => {
    if (ranges.length === 0) return true;
    const numericPrice = parseInt(listingPrice.replace(/[^0-9]/g, ''));
    
    return ranges.some(range => {
      if (range === "Under $50") return numericPrice < 50;
      if (range === "$50 - $150") return numericPrice >= 50 && numericPrice <= 150;
      if (range === "$150 - $300") return numericPrice > 150 && numericPrice <= 300;
      if (range === "> $300") return numericPrice > 300;
      return true;
    });
  };

  // derived filtered listings
  const filteredListings = mockListings.filter(listing => {
    // Category match: use the category field directly
    const catMatch = selectedCategories.length === 0 ||
      selectedCategories.some(cat => {
        if (cat === "Fitness & Gym") return listing.category === "Fitness & Gym";
        return listing.category === cat;
      });

    const priceMatch = selectedPrices.length === 0 || matchesPrice(listing.price, selectedPrices);

    const cityMatch = listing.location.toLowerCase().includes(activeLocation.toLowerCase());

    return cityMatch && catMatch && priceMatch;
  });

  return (
    <div className={styles.pageContainer}>
      <Header transparent={false} />
      
      {/* Top Location Nav */}
      <div className={styles.topNavContainer}>
        <div className={styles.locationPills}>
          {locations.map(loc => (
            <button 
              key={loc}
              className={`${styles.pill} ${activeLocation === loc ? styles.pillActive : ''}`}
              onClick={() => setActiveLocation(loc)}
            >
              {loc}
            </button>
          ))}
          <button className={styles.pillDropdown}>
            More <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className={styles.mainLayout}>
        {/* Left Sidebar Filter (Floating card exact 1:1 match) */}
        <aside className={styles.sidebar}>
          <div className={styles.filterCard}>
            <h2 className={styles.filterTitle}>Filter by</h2>
            
            <div className={styles.filterSection}>
              <button 
                className={styles.sectionHeader}
                onClick={() => setTypeOpen(!typeOpen)}
              >
                Category
                {typeOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {typeOpen && (
                <div className={styles.checkboxList}>
                  {[
                    "Fitness & Gym",
                    "Restaurants",
                    "Nightlife",
                    "Spas & Wellness",
                    "Luxury Retail"
                  ].map(cat => (
                    <label key={cat} className={styles.checkboxItem}>
                      <input 
                        type="checkbox" 
                        checked={selectedCategories.includes(cat) || (cat === "Fitness & Gym" && selectedCategories.includes("Fitness"))} 
                        onChange={() => toggleCategory(cat === "Fitness & Gym" ? "Fitness" : cat)}
                      />
                      <span className={styles.checkboxCustom}></span>
                      {cat}
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.filterSection}>
              <button 
                className={styles.sectionHeader}
                onClick={() => setPriceOpen(!priceOpen)}
              >
                Price Range
                {priceOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              {priceOpen && (
                <div className={styles.checkboxList}>
                  {[
                    "Under $50",
                    "$50 - $150",
                    "$150 - $300",
                    "> $300"
                  ].map(priceRange => (
                    <label key={priceRange} className={styles.checkboxItem}>
                      <input 
                        type="checkbox" 
                        checked={selectedPrices.includes(priceRange)}
                        onChange={() => togglePrice(priceRange)}
                      />
                      <span className={styles.checkboxCustom}></span>
                      {priceRange}
                    </label>
                  ))}
                  
                  {/* Slider visual mockup */}
                  <div className={styles.sliderContainer}>
                    <div className={styles.sliderTrack}>
                      <div className={styles.sliderFill}></div>
                      <div className={styles.sliderHandle} style={{left: '20%'}}></div>
                      <div className={styles.sliderHandle} style={{left: '80%'}}></div>
                    </div>
                    <div className={styles.sliderLabels}>
                      <span>$50</span>
                      <span>$300</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <h1 className={styles.resultsCount}>
              {filteredListings.length} <span>(Places found)</span>
            </h1>
            
            <div className={styles.selectedFilters}>
              {selectedCategories.map(cat => (
                <span key={cat} className={styles.selectedPill}>
                  {cat === "Fitness" ? "Fitness & Gym" : cat} 
                  <span className={styles.removePill} onClick={() => removeFilter('category', cat)}>×</span>
                </span>
              ))}
              {selectedPrices.map(price => (
                <span key={price} className={styles.selectedPill}>
                  {price} 
                  <span className={styles.removePill} onClick={() => removeFilter('price', price)}>×</span>
                </span>
              ))}
            </div>
          </div>

          <div className={styles.grid}>
            {filteredListings.map(listing => (
              <div key={listing.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image 
                    src={listing.image} 
                    alt={listing.title}
                    fill
                    className={styles.cardImage}
                  />
                  <div className={styles.topLocationBadge}>
                    <MapPin size={12} /> {listing.location}
                  </div>
                  <div className={styles.cameraBadge}>
                    <Camera size={14} /> {listing.imagesCount}
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.price}>{listing.price}</h3>
                  <h4 className={styles.cardTitle}>{listing.title}</h4>
                  
                  <div className={styles.statsRow}>
                    <div className={styles.stat}>
                      <Star size={14} className={styles.statIcon} />
                      {listing.rating}
                    </div>
                    <div className={styles.stat}>
                      <Navigation size={14} className={styles.statIcon} />
                      {listing.distance}
                    </div>
                    <div className={styles.stat}>
                      <MapPin size={14} className={styles.statIcon} />
                      {listing.location.split(',')[0]}
                    </div>
                  </div>

                  <div className={styles.cardActions}>
                    <button className={styles.bookBtn}>Book Now</button>
                    <button className={styles.heartBtn}>
                      <Heart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
