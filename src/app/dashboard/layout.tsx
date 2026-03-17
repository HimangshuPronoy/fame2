import Link from "next/link";
import { LayoutDashboard, Users, Settings, LogOut, ArrowLeft } from "lucide-react";
import styles from "./layout.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.logoWrapper}>
          <Link href="/" className={styles.logo}>Fame</Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navItem}>
            <LayoutDashboard size={18} />
            <span>Overview</span>
          </Link>
          <Link href="/dashboard/user" className={styles.navItem}>
            <Users size={18} />
            <span>User View</span>
          </Link>
          <Link href="/dashboard/admin" className={styles.navItem}>
            <Settings size={18} />
            <span>Admin View</span>
          </Link>
        </nav>
        <div className={styles.footerNav}>
          <Link href="/" className={styles.navItem}>
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </Link>
          <Link href="/login" className={`${styles.navItem} ${styles.logout}`}>
            <LogOut size={18} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
