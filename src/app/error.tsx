"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import styles from "./not-found.module.css";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <AlertTriangle size={64} className={styles.icon} />
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.message}>
          We encountered an unexpected error. Don&apos;t worry, it&apos;s not your fault.
        </p>
        {error.message && (
          <p className={styles.errorDetails}>
            Error: {error.message}
          </p>
        )}
        <div className={styles.actions}>
          <button onClick={reset} className={styles.primaryBtn}>
            <RefreshCw size={18} />
            Try Again
          </button>
          <Link href="/" className={styles.secondaryBtn}>
            <Home size={18} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
