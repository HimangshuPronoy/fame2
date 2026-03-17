"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./login.module.css";
import Image from "next/image";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.container}>
      {/* Left Form Side */}
      <div className={styles.formSide}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className={styles.formContainer}>
          <div className={styles.header}>
            <h1 className={styles.logo}>Fame<span style={{color: 'var(--accent)'}}>.</span></h1>
            <h2 className={styles.title}>{isLogin ? "Welcome Back" : "Create an Account"}</h2>
            <p className={styles.subtitle}>
              {isLogin 
                ? "Enter your details to access your Fame dashboard." 
                : "Join the most exclusive lifestyle directory today."}
            </p>
          </div>

          <form className={styles.form}>
            {!isLogin && (
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" className={styles.input} />
              </div>
            )}
            
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" className={styles.input} />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.passwordHeader}>
                <label>Password</label>
                {isLogin && <a href="#" className={styles.forgot}>Forgot?</a>}
              </div>
              <input type="password" placeholder="••••••••" className={styles.input} />
            </div>

            {/* Always show TOS checkboxes as requested */}
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" required className={styles.checkbox} />
                <span>I accept the <a href="#" className={styles.link}>Terms of Service</a> and <a href="#" className={styles.link}>Privacy Policy</a>.</span>
              </label>
            </div>

            <Link href="/dashboard" className={styles.submitBtn}>
              {isLogin ? "Sign In" : "Sign Up"}
            </Link>
          </form>

          <p className={styles.toggleText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className={styles.toggleBtn}
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Image Side */}
      <div className={styles.imageSide}>
        <div className={styles.imageOverlay}>
          <div className={styles.quote}>
            &quot;Fame has completely transformed how I discover the city&apos;s hidden gems.&quot;
            <span className={styles.author}>— Elite Member</span>
          </div>
        </div>
        <Image 
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1934&auto=format&fit=crop"
          alt="Luxury Restaurant"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
        />
      </div>
    </div>
  );
}
