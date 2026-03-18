import Link from "next/link";
import { Home, Search } from "lucide-react";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.description}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.primaryBtn}>
            <Home size={18} />
            Go Home
          </Link>
          <Link href="/listings" className={styles.secondaryBtn}>
            <Search size={18} />
            Browse Listings
          </Link>
        </div>
      </div>
    </div>
  );
}
