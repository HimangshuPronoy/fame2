"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase, Booking, Listing } from "@/lib/supabase";
import Link from "next/link";
import { Calendar, Clock, Users, MapPin, CheckCircle, XCircle, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import styles from "./bookings.module.css";
import { useLanguage } from "@/lib/language-context";

type BookingWithListing = Booking & { listing: Listing };

export default function BookingsPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [bookings, setBookings] = useState<BookingWithListing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from("bookings")
      .select(`
        *,
        listing:listings(*)
      `)
      .eq("user_id", userId)
      .order("booking_date", { ascending: false });

    if (data) setBookings(data as BookingWithListing[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      fetchBookings(user.id);
    }
  }, [user, fetchBookings]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle size={18} />;
      case "cancelled":
        return <XCircle size={18} />;
      case "completed":
        return <CheckCircle size={18} />;
      default:
        return <AlertCircle size={18} />;
    }
  };

  const getStatusClass = (status: string) => {
    return styles[`status${status.charAt(0).toUpperCase()}${status.slice(1)}`];
  };

  const getStatusLabel = (status: string) => {
    return t(`bookings.status.${status}`) || status;
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loader2 className="spin" size={40} />
        <span>{t('common.loading')}</span>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t('bookings.title')}</h1>
        <p className={styles.subtitle}>
          {bookings.length} {bookings.length === 1 ? t('bookings.guest') : t('bookings.guests')}
        </p>
      </header>

      {bookings.length === 0 ? (
        <div className={styles.empty}>
          <Calendar size={80} />
          <h2>{t('bookings.empty.title')}</h2>
          <p>{t('bookings.empty.text')}</p>
          <Link href="/listings" className={styles.browseBtn}>
            <span>{t('bookings.empty.browse')}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className={styles.bookingsList}>
          {bookings.map((booking) => (
            <section key={booking.id} className={styles.bookingCard}>
              <div className={styles.bookingHeader}>
                <div>
                  <Link href={`/listing/${booking.listing?.id}`} className={styles.listingTitle}>
                    {booking.listing?.title || "Unknown Listing"}
                  </Link>
                  <div className={styles.location}>
                    <MapPin size={16} />
                    {booking.listing?.location || "N/A"}
                  </div>
                </div>
                <div className={`${styles.status} ${getStatusClass(booking.status)}`}>
                  {getStatusIcon(booking.status)}
                  {getStatusLabel(booking.status)}
                </div>
              </div>

              <div className={styles.bookingDetails}>
                <div className={styles.detail}>
                  <Calendar size={20} />
                  <span>{new Date(booking.booking_date).toLocaleDateString()}</span>
                </div>
                {booking.booking_time && (
                  <div className={styles.detail}>
                    <Clock size={20} />
                    <span>{booking.booking_time}</span>
                  </div>
                )}
                <div className={styles.detail}>
                  <Users size={20} />
                  <span>
                    {booking.guests} {booking.guests === 1 ? t('bookings.guest') : t('bookings.guests')}
                  </span>
                </div>
              </div>

              {booking.special_requests && (
                <div className={styles.requests}>
                  <strong>{t('bookings.specialRequests')}:</strong> 
                  {booking.special_requests}
                </div>
              )}

              {booking.total_price && (
                <div className={styles.price}>
                  ${booking.total_price.toFixed(2)}
                </div>
              )}

              <footer className={styles.bookingFooter}>
                <span className={styles.bookingDate}>
                  {t('bookings.bookedOn')} {new Date(booking.created_at).toLocaleDateString()}
                </span>
                {booking.status === "pending" && (
                  <button className={styles.cancelBtn}>{t('bookings.cancel')}</button>
                )}
              </footer>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
