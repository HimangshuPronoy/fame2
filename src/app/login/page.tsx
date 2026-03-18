"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import styles from "./login.module.css";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });

  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(form.email, form.password);
      if (error) {
        setError(error);
      } else {
        router.push("/dashboard");
      }
    } else {
      if (!form.fullName.trim()) {
        setError("Please enter your full name.");
        setLoading(false);
        return;
      }
      const { error } = await signUp(form.email, form.password, form.fullName);
      if (error) {
        setError(error);
      } else {
        setSuccess("Account created! Please check your email to confirm, then sign in.");
        setIsLogin(true);
        setForm({ fullName: "", email: form.email, password: "" });
      }
    }
    setLoading(false);
  };

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

          {error && (
            <div className={styles.errorMessage}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className={styles.successMessage}>
              <span>{success}</span>
            </div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            {!isLogin && (
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={styles.input}
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  required
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className={styles.input}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.passwordHeader}>
                <label>Password</label>
                {isLogin && <a href="#" className={styles.forgot}>Forgot?</a>}
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className={styles.input}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={6}
              />
            </div>

            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" required className={styles.checkbox} />
                <span>I accept the <a href="#" className={styles.link}>Terms of Service</a> and <a href="#" className={styles.link}>Privacy Policy</a>.</span>
              </label>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p className={styles.toggleText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(null); setSuccess(null); }}
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
