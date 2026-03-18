"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/listings?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/listings");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search gyms, restaurants, spas..."
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.buttonWrapper}>
        <button onClick={handleSearch} className={styles.searchButton}>
          EXPLORE NOW
        </button>
      </div>
    </div>
  );
}
