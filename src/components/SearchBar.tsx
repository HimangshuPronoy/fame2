import Link from "next/link";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <input 
        type="text" 
        placeholder="What are you looking for?" 
        className={styles.input}
      />
      <div className={styles.buttonWrapper}>
        <Link href="/listings" className={styles.searchButton}>
          EXPLORE NOW
        </Link>
      </div>
    </div>
  );
}
