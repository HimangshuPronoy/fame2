"use client";

import { useLanguage } from '@/lib/language-context';
import styles from './test.module.css';

export default function TestLanguagePage() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={styles.container}>
      <h1>Language Test Page</h1>
      
      <div className={styles.info}>
        <p><strong>Current Language:</strong> {language}</p>
        <p><strong>Browser Language:</strong> {typeof window !== 'undefined' ? navigator.language : 'N/A'}</p>
        <p><strong>Timezone:</strong> {typeof window !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'N/A'}</p>
      </div>

      <div className={styles.buttons}>
        <button onClick={() => setLanguage('en')} className={language === 'en' ? styles.active : ''}>
          Switch to English
        </button>
        <button onClick={() => setLanguage('mn')} className={language === 'mn' ? styles.active : ''}>
          Switch to Mongolian
        </button>
      </div>

      <div className={styles.translations}>
        <h2>Translation Tests:</h2>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Translation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>nav.home</td>
              <td>{t('nav.home')}</td>
            </tr>
            <tr>
              <td>nav.listings</td>
              <td>{t('nav.listings')}</td>
            </tr>
            <tr>
              <td>nav.dashboard</td>
              <td>{t('nav.dashboard')}</td>
            </tr>
            <tr>
              <td>nav.login</td>
              <td>{t('nav.login')}</td>
            </tr>
            <tr>
              <td>nav.logout</td>
              <td>{t('nav.logout')}</td>
            </tr>
            <tr>
              <td>category.gym</td>
              <td>{t('category.gym')}</td>
            </tr>
            <tr>
              <td>category.restaurants</td>
              <td>{t('category.restaurants')}</td>
            </tr>
            <tr>
              <td>category.spa</td>
              <td>{t('category.spa')}</td>
            </tr>
            <tr>
              <td>admin.title</td>
              <td>{t('admin.title')}</td>
            </tr>
            <tr>
              <td>admin.addListing</td>
              <td>{t('admin.addListing')}</td>
            </tr>
            <tr>
              <td>form.save</td>
              <td>{t('form.save')}</td>
            </tr>
            <tr>
              <td>form.saving</td>
              <td>{t('form.saving')}</td>
            </tr>
            <tr>
              <td>day.monday</td>
              <td>{t('day.monday')}</td>
            </tr>
            <tr>
              <td>day.tuesday</td>
              <td>{t('day.tuesday')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.expected}>
        <h2>Expected Results:</h2>
        <h3>English (EN):</h3>
        <ul>
          <li>nav.home → Home</li>
          <li>nav.listings → Browse</li>
          <li>category.gym → Gym</li>
          <li>admin.title → Manage Listings</li>
          <li>day.monday → Monday</li>
        </ul>
        
        <h3>Mongolian (МН):</h3>
        <ul>
          <li>nav.home → Нүүр</li>
          <li>nav.listings → Жагсаалт</li>
          <li>category.gym → Спорт зал</li>
          <li>admin.title → Жагсаалт удирдах</li>
          <li>day.monday → Даваа</li>
        </ul>
      </div>
    </div>
  );
}
