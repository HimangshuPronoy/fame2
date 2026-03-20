"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Share, Check, Calendar, Users } from "lucide-react";
import SaveButton from "./SaveButton";
import styles from "@/app/listing/[id]/page.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

interface BookingWidgetProps {
  listingId: string;
  price: string;
}

export default function BookingWidget({ listingId, price }: BookingWidgetProps) {
  const { user } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success">("idle");
  const [copied, setCopied] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [specialRequests, setSpecialRequests] = useState("");

  const handleBooking = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!showBookingForm) {
      setShowBookingForm(true);
      return;
    }

    if (!bookingDate) {
      alert(t('form.required'));
      return;
    }

    setBookingStatus("loading");

    const { error } = await supabase.from("bookings").insert({
      listing_id: listingId,
      user_id: user.id,
      booking_date: bookingDate,
      booking_time: bookingTime || null,
      guests: guests,
      special_requests: specialRequests || null,
    });

    if (error) {
      alert(t('common.error'));
      setBookingStatus("idle");
    } else {
      setBookingStatus("success");
      setTimeout(() => {
        setBookingStatus("idle");
        setShowBookingForm(false);
        setBookingDate("");
        setBookingTime("");
        setGuests(2);
        setSpecialRequests("");
      }, 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "FreshFame Listing",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.bookingWidget}>
      <div className={styles.priceHeader}>
        <span className={styles.priceLabel}>{t('listing.booking.startingFrom')}</span>
        <span className={styles.price}>{price}</span>
      </div>

      {showBookingForm && (
        <div className={styles.bookingForm}>
          <div className={styles.formGroup}>
            <label>
              <Calendar size={16} />
              {t('listing.booking.date')} *
            </label>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>{t('listing.booking.time')}</label>
            <input
              type="time"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>
              <Users size={16} />
              {t('listing.booking.guests')}
            </label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              min={1}
              max={20}
            />
          </div>

          <div className={styles.formGroup}>
            <label>{t('listing.booking.requests')}</label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={3}
              placeholder={t('listing.booking.requestsPlaceholder')}
            />
          </div>
        </div>
      )}

      <button 
        onClick={handleBooking}
        disabled={bookingStatus !== "idle"}
        className={styles.primaryBtn}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <AnimatePresence mode="wait">
          {bookingStatus === "idle" && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {showBookingForm ? t('listing.booking.confirmBtn') : t('listing.booking.requestBtn')}
            </motion.span>
          )}
          {bookingStatus === "loading" && (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {t('listing.booking.processing')}
            </motion.span>
          )}
          {bookingStatus === "success" && (
            <motion.span
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Check size={18} /> {t('listing.booking.confirmed')}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {showBookingForm && (
        <button
          onClick={() => setShowBookingForm(false)}
          className={styles.secondaryBtn}
        >
          {t('common.cancel')}
        </button>
      )}

      <div className={styles.actionRow}>
        <SaveButton listingId={listingId} variant="full" className={styles.iconBtn} />
        <button onClick={handleShare} className={styles.iconBtn}>
          {copied ? <Check size={18} color="#22c55e" /> : <Share size={18} />}
          {copied ? t('listing.booking.copied') : t('listing.booking.share')}
        </button>
      </div>
    </div>
  );
}
