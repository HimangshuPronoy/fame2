"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase, Review } from "@/lib/supabase";
import { Star, User } from "lucide-react";
import styles from "./Reviews.module.css";

interface ReviewWithProfile extends Review {
  profile: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

interface ReviewsProps {
  listingId: string;
}

export default function Reviews({ listingId }: ReviewsProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<ReviewWithProfile[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [userReview, setUserReview] = useState<Review | null>(null);

  useEffect(() => {
    fetchReviews();
    if (user) {
      checkUserReview();
    }
  }, [listingId, user]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select(`
        *,
        profile:profiles(full_name, avatar_url)
      `)
      .eq("listing_id", listingId)
      .order("created_at", { ascending: false });

    if (data) setReviews(data as ReviewWithProfile[]);
  };

  const checkUserReview = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("listing_id", listingId)
      .eq("user_id", user!.id)
      .single();

    if (data) setUserReview(data as Review);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);

    const { error } = await supabase.from("reviews").insert({
      listing_id: listingId,
      user_id: user.id,
      rating: rating,
      title: title,
      comment: comment,
    });

    if (!error) {
      setShowForm(false);
      setTitle("");
      setComment("");
      setRating(5);
      fetchReviews();
      checkUserReview();
    }

    setSubmitting(false);
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Reviews</h2>
          <div className={styles.summary}>
            <Star size={20} fill="currentColor" />
            <span className={styles.avgRating}>{averageRating}</span>
            <span className={styles.reviewCount}>
              ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>

        {user && !userReview && (
          <button onClick={() => setShowForm(!showForm)} className={styles.writeBtn}>
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <div className={styles.formGroup}>
            <label>Rating</label>
            <div className={styles.starRating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={styles.starBtn}
                >
                  <Star
                    size={28}
                    fill={star <= rating ? "#d4af37" : "none"}
                    color={star <= rating ? "#d4af37" : "#666"}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sum up your experience"
              maxLength={100}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Your Review</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts..."
              rows={5}
              required
            />
          </div>

          <button type="submit" disabled={submitting} className={styles.submitBtn}>
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}

      <div className={styles.reviewsList}>
        {reviews.length === 0 ? (
          <div className={styles.empty}>
            <p>No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.userInfo}>
                  <div className={styles.avatar}>
                    <User size={20} />
                  </div>
                  <div>
                    <div className={styles.userName}>
                      {review.profile?.full_name || "Anonymous"}
                    </div>
                    <div className={styles.reviewDate}>
                      {new Date(review.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className={styles.reviewRating}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < review.rating ? "#d4af37" : "none"}
                      color={i < review.rating ? "#d4af37" : "#666"}
                    />
                  ))}
                </div>
              </div>

              {review.title && <h4 className={styles.reviewTitle}>{review.title}</h4>}
              {review.comment && <p className={styles.reviewComment}>{review.comment}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
