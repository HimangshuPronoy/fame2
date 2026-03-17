"use client";

import { useState } from "react";
import { Send, TrendingUp, Users, Activity, ExternalLink, Plus } from "lucide-react";
import Image from "next/image";
import styles from "./user.module.css";

export default function UserDashboard() {
  const [requestSent, setRequestSent] = useState(false);
  const [requestText, setRequestText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;
    
    // Simulate sending request
    setRequestSent(true);
    setTimeout(() => {
      setRequestSent(false);
      setRequestText("");
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back, Alex</h1>
          <p className={styles.subtitle}>Here&apos;s a quick overview of your profile and listings.</p>
        </div>
        <button className={styles.primaryActionBtn}>
          <Plus size={16} /> New Listing
        </button>
      </header>

      {/* Top Stats Row */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{backgroundColor: '#eff6ff', color: '#3b82f6'}}>
            <TrendingUp size={20} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Total Views</p>
            <h3 className={styles.statValue}>12,450</h3>
            <span className={styles.statTrend}>+14.5% this month</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{backgroundColor: '#fef2f2', color: '#ef4444'}}>
            <Users size={20} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Leads Gen</p>
            <h3 className={styles.statValue}>324</h3>
            <span className={styles.statTrend}>+5.2% this month</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{backgroundColor: '#f0fdf4', color: '#22c55e'}}>
            <Activity size={20} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Profile Score</p>
            <h3 className={styles.statValue}>94/100</h3>
            <span className={styles.statTrend}>Excellent standing</span>
          </div>
        </div>
      </section>

      <div className={styles.mainGrid}>
        {/* Left Column: Requests & Activity */}
        <div className={styles.leftCol}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Engagement Overview</h2>
            {/* CSS Mock Chart */}
            <div className={styles.chartContainer}>
              <div className={styles.chartBar}><div className={styles.chartFill} style={{height: '40%'}}></div><span className={styles.chartLabel}>Mon</span></div>
              <div className={styles.chartBar}><div className={styles.chartFill} style={{height: '70%'}}></div><span className={styles.chartLabel}>Tue</span></div>
              <div className={styles.chartBar}><div className={styles.chartFill} style={{height: '55%'}}></div><span className={styles.chartLabel}>Wed</span></div>
              <div className={styles.chartBar}><div className={styles.chartFill} style={{height: '90%'}}></div><span className={styles.chartLabel}>Thu</span></div>
              <div className={styles.chartBar}><div className={styles.chartFill} style={{height: '65%'}}></div><span className={styles.chartLabel}>Fri</span></div>
              <div className={styles.chartBar}><div className={styles.chartFill} style={{height: '30%'}}></div><span className={styles.chartLabel}>Sat</span></div>
              <div className={styles.chartBar}><div className={styles.chartFill} style={{height: '45%'}}></div><span className={styles.chartLabel}>Sun</span></div>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Request Client Services</h2>
            <p className={styles.cardDesc}>
              Need specialized photoshoots, premium cleaning, or marketing promotion?
            </p>

            {requestSent ? (
              <div className={styles.successMessage}>
                <h3 className={styles.successTitle}>Request Sent!</h3>
                <p className={styles.successDesc}>The Fame team will contact you shortly.</p>
                <button onClick={() => setRequestSent(false)} className={styles.buttonOutline}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <textarea
                  className={styles.textarea}
                  placeholder="e.g. Please update our menu images..."
                  rows={3}
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  required
                ></textarea>
                <button type="submit" className={styles.button} disabled={!requestText.trim()}>
                  <Send size={16} /> <span>Submit Request</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Active Listings */}
        <div className={styles.rightCol}>
          <div className={`${styles.card} ${styles.hFull}`}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Your Premium Listings</h2>
              <button className={styles.linkBtn}>View All <ExternalLink size={14}/></button>
            </div>
            
            <div className={styles.listingsList}>
              {/* Mock Listing 1 */}
              <div className={styles.listingItem}>
                <div className={styles.listingImgWrapper}>
                  <Image src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=2070" fill alt="gym" className={styles.listingImg} />
                </div>
                <div className={styles.listingDetails}>
                  <h4>Alpha Fitness Studio</h4>
                  <p>Brooklyn, NY</p>
                  <div className={styles.listingMetrics}>
                    <span>8.2k views</span>
                    <span>•</span>
                    <span className={styles.activeTag}>Active</span>
                  </div>
                </div>
              </div>

              {/* Mock Listing 2 */}
              <div className={styles.listingItem}>
                <div className={styles.listingImgWrapper}>
                  <Image src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=1934" fill alt="restaurant" className={styles.listingImg} />
                </div>
                <div className={styles.listingDetails}>
                  <h4>The Velvet Lounge</h4>
                  <p>Manhattan, NY</p>
                  <div className={styles.listingMetrics}>
                    <span>4.1k views</span>
                    <span>•</span>
                    <span className={styles.activeTag}>Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
