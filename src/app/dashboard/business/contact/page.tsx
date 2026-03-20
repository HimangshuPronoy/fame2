"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Send } from "lucide-react";
import styles from "./contact.module.css";
import Link from "next/link";

export default function ContactAdminPage() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !subject.trim() || !message.trim()) return;

    setSending(true);

    const { error } = await supabase.from('contact_requests').insert([{
      business_owner_id: user.id,
      listing_id: null,
      subject: subject.trim(),
      message: message.trim(),
      status: 'pending'
    }]);

    if (error) {
      alert('Error sending request: ' + error.message);
      setSending(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push('/dashboard/business');
    }, 2000);
  };

  if (!user || profile?.role !== 'business_owner') {
    return (
      <div className={styles.container}>
        <div className={styles.accessDenied}>
          <h2>Access Denied</h2>
          <p>This page is only for business owners.</p>
          <Link href="/dashboard" className={styles.backBtn}>Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.success}>
          <h2>✅ Request Sent!</h2>
          <p>Your message has been sent to the admin. You&apos;ll receive a response soon.</p>
          <p>Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href="/dashboard/business" className={styles.backLink}>
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>

      <div className={styles.card}>
        <h1 className={styles.title}>Contact Admin</h1>
        <p className={styles.subtitle}>Send a message or request to the Fame team</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Subject *</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={styles.input}
              placeholder="e.g. Question about monthly report"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Message *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={styles.textarea}
              placeholder="Describe your question or request..."
              rows={6}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={sending}>
            {sending ? (
              <>Sending...</>
            ) : (
              <>
                <Send size={18} />
                Send Request
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
