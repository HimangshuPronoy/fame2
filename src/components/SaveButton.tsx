"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";

interface SaveButtonProps {
  listingId: string;
  variant?: "icon" | "full";
  className?: string;
}

export default function SaveButton({ listingId, variant = "icon", className = "" }: SaveButtonProps) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    async function checkSaved() {
      const { data, error } = await supabase
        .from("saved_listings")
        .select("id")
        .eq("user_id", user?.id)
        .eq("listing_id", listingId)
        .single();
      
      if (!error && data) setIsSaved(true);
    }
    checkSaved();
  }, [user, listingId]);

  const toggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Please log in to save listings.");
      return;
    }

    setLoading(true);

    if (isSaved) {
      const { error } = await supabase
        .from("saved_listings")
        .delete()
        .eq("user_id", user.id)
        .eq("listing_id", listingId);
      
      if (!error) setIsSaved(false);
    } else {
      const { error } = await supabase
        .from("saved_listings")
        .insert({ user_id: user.id, listing_id: listingId });
      
      if (!error) setIsSaved(true);
    }

    setLoading(false);
  };

  if (variant === "full") {
    return (
      <button 
        onClick={toggleSave} 
        disabled={loading}
        className={className}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', background: 'none', border: '1px solid #e5e7eb', padding: '8px 16px', borderRadius: '8px', transition: 'all 0.2s' }}
      >
        <Heart 
          size={18} 
          fill={isSaved ? "#ef4444" : "none"} 
          color={isSaved ? "#ef4444" : "currentColor"} 
        />
        <span>{isSaved ? "Saved" : "Save"}</span>
      </button>
    );
  }

  return (
    <button 
      onClick={toggleSave} 
      disabled={loading}
      className={className}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'none', border: 'none', transition: 'all 0.2s' }}
    >
      <motion.div
        whileTap={{ scale: 0.8 }}
        animate={{ scale: isSaved ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart 
          size={18} 
          fill={isSaved ? "#ef4444" : "none"} 
          color={isSaved ? "#ef4444" : "currentColor"} 
        />
      </motion.div>
    </button>
  );
}
