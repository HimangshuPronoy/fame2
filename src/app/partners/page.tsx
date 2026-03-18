"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, TrendingUp, Users, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./partners.module.css";

const benefits = [
  "Access to a curated, high-net-worth demographic",
  "Dedicated account manager for optimized listing performance",
  "Feature spots in our exclusive 'Fame Journal'",
  "Advanced analytics dashboard for engagement metrics",
  "Priority support and seamless booking integrations"
];

export default function PartnersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("Dining");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      router.push("/login");
      return;
    }

    setSubmitting(true);
    setMessage("");

    const { error } = await supabase.from("partner_applications").insert({
      user_id: user.id,
      business_name: businessName,
      contact_name: contactName,
      email: email,
      phone: phone,
      website: website,
      category: category,
      description: description,
    });

    if (error) {
      setMessage("Error submitting application. Please try again.");
    } else {
      setMessage("Application submitted! Our team will review within 48 hours.");
      setBusinessName("");
      setContactName("");
      setEmail("");
      setPhone("");
      setWebsite("");
      setDescription("");
      setShowForm(false);
    }

    setSubmitting(false);
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32f7?auto=format&fit=crop&q=80&w=2061" 
            alt="Fame Partners" 
            fill 
            className={styles.heroImage} 
            priority
          />
          <div className={styles.heroOverlay} />
        </div>
        
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Partner with Us</h1>
          <p className={styles.subtitle}>
            Join the world&apos;s most exclusive directory. Elevate your brand by connecting with an audience that demands uncompromising quality.
          </p>
        </div>
      </section>

      <main className={styles.mainLayout}>
        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>2.5M+</div>
            <div className={styles.statLabel}>Monthly Views</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>$400k</div>
            <div className={styles.statLabel}>Avg User Income</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>40+</div>
            <div className={styles.statLabel}>Global Markets</div>
          </div>
        </div>

        {/* Content Section 1 */}
        <section className={styles.contentSection}>
          <div className={styles.textContent}>
            <span className={styles.tag}>Why Fame?</span>
            <h2 className={styles.sectionTitle}>An Audience Unlike Any Other</h2>
            <p className={styles.sectionText}>
              We don&apos;t accept everyone. Fame is an invite-only or highly vetted marketplace, ensuring that when your establishment is listed, it sits alongside the finest offerings in the world. Our users come here looking for the pinnacle of luxury, travel, and lifestyle experiences.
            </p>
            <div className={styles.benefitsList}>
              {benefits.map((benefit, i) => (
                <div key={i} className={styles.benefitItem}>
                  <CheckCircle2 color="#d4af37" size={20} />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.imageContent}>
            <Image 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070" 
              alt="Business Meeting"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </section>

        {/* Content Section 2 (Reversed) */}
        <section className={styles.contentSection} style={{ flexDirection: 'row-reverse' }}>
          <div className={styles.textContent}>
            <span className={styles.tag}>Growth Engine</span>
            <h2 className={styles.sectionTitle}>Precision Tools for Premium Brands</h2>
            <p className={styles.sectionText}>
              Beyond a simple listing, our proprietary Partner Dashboard provides real-time insights into how our elite clientele interacts with your brand. Track page views, conversion rates, and demographic shifts to optimize your offerings instantly.
            </p>
            <div className={styles.benefitsList} style={{ gap: '24px', marginTop: '32px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div className={styles.iconWrapper}><TrendingUp size={24} /></div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#fff' }}>Analytics</h4>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.5 }}>Understand exactly who is viewing your listing and when.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div className={styles.iconWrapper}><Users size={24} /></div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#fff' }}>Direct Engagement</h4>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.5 }}>Respond to inquiries and managing bookings via our secure portal.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <div className={styles.iconWrapper}><ShieldCheck size={24} /></div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#fff' }}>Brand Protection</h4>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.5 }}>Maintain complete control over your assets, imagery, and narrative.</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.imageContent}>
            <Image 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015" 
              alt="Analytics Dashboard"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Ready to elevate your presence?</h2>
          <p className={styles.ctaText}>
            Submit your application today. Our curation team reviews all partner requests within 48 hours to ensure alignment with our quality standards.
          </p>
          
          {message && (
            <div className={message.includes("Error") ? styles.errorMsg : styles.successMsg}>
              {message}
            </div>
          )}

          {!showForm ? (
            <button className={styles.ctaButton} onClick={() => setShowForm(true)}>
              Apply for Partnership
            </button>
          ) : (
            <form className={styles.applicationForm} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Business Name *</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                    placeholder="Your business name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Contact Name *</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="contact@business.com"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Website</label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://yourbusiness.com"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Category *</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option>Dining</option>
                    <option>Fitness</option>
                    <option>Wellness</option>
                    <option>Beauty</option>
                    <option>Nightlife</option>
                    <option>Travel</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Tell us about your business *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={5}
                  placeholder="Describe what makes your business unique and why you'd be a great fit for Fame..."
                />
              </div>

              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn} disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
