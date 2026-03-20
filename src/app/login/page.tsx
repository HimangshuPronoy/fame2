"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import styles from "./login.module.css";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });

  const { signIn, signUp } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (isLogin) {
      const { error: signInError } = await signIn(form.email, form.password);
      if (signInError) {
        setError(signInError);
      } else {
        router.push("/dashboard");
      }
    } else {
      if (!form.fullName.trim()) {
        setError(t('auth.error.fullName') || "Please enter your full name.");
        setLoading(false);
        return;
      }
      const { error: signUpError } = await signUp(form.email, form.password, form.fullName);
      if (signUpError) {
        setError(signUpError);
      } else {
        setSuccess(t('auth.success') || "Account created! Please check your email to confirm, then sign in.");
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
          <ArrowLeft size={16} /> {t('auth.backToHome')}
        </Link>

        <div className={styles.formContainer}>
          <div className={styles.header}>
            <h1 className={styles.logo}>Fame<span style={{color: 'var(--accent)'}}>.</span></h1>
            <h2 className={styles.title}>{isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}</h2>
            <p className={styles.subtitle}>
              {isLogin
                ? t('auth.loginSubtitle')
                : t('auth.signupSubtitle')}
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
                <label>{t('auth.fullName')}</label>
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
              <label>{t('auth.email')}</label>
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
                <label>{t('auth.password')}</label>
                {isLogin && <a href="#" className={styles.forgot}>{t('auth.forgotPassword')}</a>}
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
                <span>{t('auth.acceptTerms')}</span>
              </label>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? t('auth.pleaseWait') : isLogin ? t('auth.signIn') : t('auth.signUp')}
            </button>
          </form>

          <p className={styles.toggleText}>
            {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
            <button
              onClick={() => { setIsLogin(!isLogin); setError(null); setSuccess(null); }}
              className={styles.toggleBtn}
            >
              {isLogin ? t('auth.signUp') : t('auth.login')}
            </button>
          </p>
        </div>
      </div>

      {/* Right Image Side */}
      <div className={styles.imageSide}>
        <div className={styles.imageOverlay}>
          <div className={styles.quote}>
            &quot;{isLogin ? "Fame has completely transformed how I discover the city's hidden gems." : "Join the most exclusive lifestyle directory in the city."}&quot;
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
