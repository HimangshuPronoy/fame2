"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase, Booking, Listing } from "@/lib/supabase";
import Link from "next/link";
import { Calendar, Clock, Users, MapPin, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import styles from "./bookings.module.css";

type BookingWithListing = Booking & { listing: Listing };

export default function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingWithListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchBookings = async () => {
    const { data } = await supabase
      .from("bookings")
      .select(`
        *,
        listing:listings(*)
      `)
      .eq("user_id", user!.id)
      .order("booking_date", { ascending: false });

    if (data) setBookings(data as BookingWithListing[]);
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle size={20} />;
      case "cancelled":
        return <XCircle size={20} />;
      case "completed":
        return <CheckCircle size={20} />;
      default:
        return <AlertCircle size={20} />;
    }
  };

  const getStatusClass = (status: string) => {
    return styles[`status${status.charAt(0).toUpperCase()}${status.slice(1)}`];
  };

  if (loading) {
    return <div className={styles.loading}>Loading your bookings...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Bookings</h1>
        <p className={styles.subtitle}>
          {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className={styles.empty}>
          <Calendar size={64} />
          <h2>No bookings yet</h2>
          <p>Start exploring and book your first experience</p>
          <Link href="/listings" className={styles.browseBtn}>
            Browse Listings
          </Link>
        </div>
      ) : (
        <div className={styles.bookingsList}>
          {bookings.map((booking) => (
            <div key={booking.id} className={styles.bookingCard}>
              <div className={styles.bookingHeader}>
                <div>
                  <Link href={`/listing/${booking.listing.id}`} className={styles.listingTitle}>
                    {booking.listing.title}
                  </Link>
                  <div className={styles.location}>
                    <MapPin size={14} />
                    {booking.listing.location}
                  </div>
                </div>
                <div className={`${styles.status} ${getStatusClass(booking.status)}`}>
                  {getStatusIcon(booking.status)}
                  {booking.status}
                </div>
              </div>

              <div className={styles.bookingDetails}>
                <div className={styles.detail}>
                  <Calendar size={18} />
                  <span>{new Date(booking.booking_date).toLocaleDateString()}</span>
                </div>
                {booking.booking_time && (
                  <div className={styles.detail}>
                    <Clock size={18} />
                    <span>{booking.booking_time}</span>
                  </div>
                )}
                <div className={styles.detail}>
                  <Users size={18} />
                  <span>{booking.guests} {booking.guests === 1 ? "guest" : "guests"}</span>
                </div>
              </div>

              {booking.special_requests && (
                <div className={styles.requests}>
                  <strong>Special Requests:</strong> {booking.special_requests}
                </div>
              )}

              {booking.total_price && (
                <div className={styles.price}>
                  Total: ${booking.total_price.toFixed(2)}
                </div>
              )}

              <div className={styles.bookingFooter}>
                <span className={styles.bookingDate}>
                  Booked on {new Date(booking.created_at).toLocaleDateString()}
                </span>
                {booking.status === "pending" && (
                  <button className={styles.cancelBtn}>Cancel Booking</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
