"use client";

import { useState } from "react";
import { PlusCircle, Edit2, Trash2, CheckCircle2 } from "lucide-react";
import styles from "./admin.module.css";

// Initial mock data
const initialListings = [
  { id: 1, title: "Equinox Fitness", category: "Gym", price: "$150/mo", status: "Active" },
  { id: 2, title: "Lumina Restaurant", category: "Restaurant", price: "$$$", status: "Active" },
];

export default function AdminDashboard() {
  const [listings, setListings] = useState(initialListings);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newListing, setNewListing] = useState({ title: "", category: "Gym", price: "" });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListing.title || !newListing.price) return;
    
    const listing = {
      id: Date.now(),
      title: newListing.title,
      category: newListing.category,
      price: newListing.price,
      status: "Active"
    };

    // Simulate auto-refresh / state update
    setListings((prev) => [...prev, listing]);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowAddForm(false);
      setNewListing({ title: "", category: "Gym", price: "" });
    }, 2000);
  };

  const handleDelete = (id: number) => {
    setListings((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <h1 className={styles.title}>Admin Dashboard</h1>
            <p className={styles.subtitle}>Manage all listings, users, and requests.</p>
          </div>
          <button 
            className={styles.addBtn}
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <PlusCircle size={18} />
            <span>Add Manual Listing</span>
          </button>
        </div>
      </header>

      {showAddForm && (
        <section className={styles.section}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Add New Listing</h2>
            <form onSubmit={handleAddSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Listing Title</label>
                <input 
                  type="text" 
                  value={newListing.title}
                  onChange={(e) => setNewListing({...newListing, title: e.target.value})}
                  className={styles.input} 
                  placeholder="e.g. Skyline Yoga Studio" 
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select 
                    className={styles.select}
                    value={newListing.category}
                    onChange={(e) => setNewListing({...newListing, category: e.target.value})}
                  >
                    <option value="Gym">Gym</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Spa">Spa</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Price Range</label>
                  <input 
                    type="text" 
                    value={newListing.price}
                    onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                    className={styles.input} 
                    placeholder="e.g. $$, $120/mo" 
                  />
                </div>
              </div>
              
              {saveSuccess ? (
                <div className={styles.successMessage}>
                  <CheckCircle2 size={18} /> Added successfully! Refreshing list...
                </div>
              ) : (
                <button type="submit" className={styles.submitBtn}>
                  Save Listing
                </button>
              )}
            </form>
          </div>
        </section>
      )}

      <section className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Active Listings ({listings.length})</h2>
          
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((item) => (
                  <tr key={item.id}>
                    <td className={styles.fw500}>{item.title}</td>
                    <td>
                      <span className={styles.tag}>{item.category}</span>
                    </td>
                    <td>{item.price}</td>
                    <td>
                      <span className={`${styles.status} ${styles.activeStatus}`}>{item.status}</span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.iconBtn} title="Edit"><Edit2 size={16} /></button>
                        <button 
                          className={`${styles.iconBtn} ${styles.danger}`} 
                          title="Delete"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {listings.length === 0 && (
                  <tr>
                    <td colSpan={5} className={styles.emptyTable}>No listings available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
