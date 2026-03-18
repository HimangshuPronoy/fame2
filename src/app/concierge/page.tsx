"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import styles from "./concierge.module.css";
import Image from "next/image";

export default function ConciergePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [requestType, setRequestType] = useState("Restaurant Reservation");
  const [details, setDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      router.push("/login");
      return;
    }

    setSubmitting(true);
    setMessage("");

    const { error } = await supabase.from("concierge_requests").insert({
      user_id: user.id,
      full_name: fullName,
      request_type: requestType,
      details: details,
    });

    if (error) {
      setMessage("Error submitting request. Please try again.");
    } else {
      setMessage("Request submitted! Our team will contact you within 2 hours.");
      setFullName("");
      setDetails("");
    }

    setSubmitting(false);
  };

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <Image 
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2070" 
          alt="Luxury Concierge Service" 
          fill 
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>The Concierge</h1>
          <p className={styles.subtitle}>Bespoke bookings and white-glove service for the extraordinary.</p>
        </div>
      </div>

      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.serviceGrid}>
            <div className={styles.formCard}>
              <h2>Request a Booking</h2>
              <p>Our specialists will secure your reservation within 2 hours.</p>
              
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. James Bond"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Request Type</label>
                  <select value={requestType} onChange={(e) => setRequestType(e.target.value)}>
                    <option>Restaurant Reservation</option>
                    <option>VIP Nightlife Access</option>
                    <option>Private Event</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Details</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you need..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    required
                  ></textarea>
                </div>
                {message && (
                  <div className={message.includes("Error") ? styles.errorMsg : styles.successMsg}>
                    {message}
                  </div>
                )}
                <button type="submit" className={styles.submitBtn} disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Request"}
                </button>
              </form>
            </div>
            
            <div className={styles.infoCard}>
              <h3>Elite Access, Guaranteed.</h3>
              <p>As a Fame member, you bypass the waitlists. Our concierge team holds exclusive relationships with the world&apos;s most sought-after venues.</p>
              <ul className={styles.benefitsList}>
                <li>✓ Priority Reservations</li>
                <li>✓ Secret Menu Access</li>
                <li>✓ 24/7 Dedicated Support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
