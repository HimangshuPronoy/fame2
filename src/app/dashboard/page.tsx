"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function DashboardIndex() {
  const { profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (profile?.role === "business_owner") {
        router.replace("/dashboard/business");
      } else {
        router.replace("/dashboard/user");
      }
    }
  }, [profile, loading, router]);

  return (
    <div style={{ display: 'flex', height: '50vh', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '30px', height: '30px', border: '3px solid #e5e7eb', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

