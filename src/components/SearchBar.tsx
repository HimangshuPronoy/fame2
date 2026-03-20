"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchBar.module.css";
import { useLanguage } from "@/lib/language-context";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { t } = useLanguage();

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
        placeholder={t('home.search.placeholder')}
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.buttonWrapper}>
        <button onClick={handleSearch} className={styles.searchButton}>
          {t('home.search.exploreNow')}
        </button>
      </div>
    </div>
  );
}
