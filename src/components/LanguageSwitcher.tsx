"use client";

import { useLanguage } from '@/lib/language-context';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={styles.switcher}>
      <button
        className={`${styles.btn} ${language === 'en' ? styles.active : ''}`}
        onClick={() => setLanguage('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        className={`${styles.btn} ${language === 'mn' ? styles.active : ''}`}
        onClick={() => setLanguage('mn')}
        aria-label="Монгол хэл рүү шилжих"
      >
        МН
      </button>
    </div>
  );
}
