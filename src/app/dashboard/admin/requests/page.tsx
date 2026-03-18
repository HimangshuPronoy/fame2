"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase, ConciergeRequest, PartnerApplication } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { MessageSquare, Briefcase, Clock, CheckCircle, XCircle } from "lucide-react";
import styles from "./requests.module.css";

export default function AdminRequestsPage() {
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [conciergeRequests, setConciergeRequests] = useState<ConciergeRequest[]>([]);
  const [partnerApps, setPartnerApps] = useState<PartnerApplication[]>([]);
  const [activeTab, setActiveTab] = useState<"concierge" | "partners">("concierge");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      router.push("/dashboard");
      return;
    }
    fetchData();
  }, [isAdmin, router]);

  const fetchData = async () => {
    const [concierge, partners] = await Promise.all([
      supabase.from("concierge_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("partner_applications").select("*").order("created_at", { ascending: false }),
    ]);

    if (concierge.data) setConciergeRequests(concierge.data as ConciergeRequest[]);
    if (partners.data) setPartnerApps(partners.data as PartnerApplication[]);
    setLoading(false);
  };

  const updateConciergeStatus = async (id: string, status: string) => {
    await supabase.from("concierge_requests").update({ status }).eq("id", id);
    fetchData();
  };

  const updatePartnerStatus = async (id: string, status: string) => {
    await supabase.from("partner_applications").update({ status }).eq("id", id);
    fetchData();
  };

  if (loading) {
    return <div className={styles.loading}>Loading requests...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Requests</h1>

      <div className={styles.tabs}>
        <button
          onClick={() => setActiveTab("concierge")}
          className={`${styles.tab} ${activeTab === "concierge" ? styles.tabActive : ""}`}
        >
          <MessageSquare size={20} />
          Concierge Requests ({conciergeRequests.length})
        </button>
        <button
          onClick={() => setActiveTab("partners")}
          className={`${styles.tab} ${activeTab === "partners" ? styles.tabActive : ""}`}
        >
          <Briefcase size={20} />
          Partner Applications ({partnerApps.length})
        </button>
      </div>

      {activeTab === "concierge" && (
        <div className={styles.requestsList}>
          {conciergeRequests.map((request) => (
            <div key={request.id} className={styles.requestCard}>
              <div className={styles.requestHeader}>
                <div>
                  <h3 className={styles.requestName}>{request.full_name}</h3>
                  <span className={styles.requestType}>{request.request_type}</span>
                </div>
                <span className={`${styles.status} ${styles[`status${request.status.charAt(0).toUpperCase()}${request.status.slice(1).replace("_", "")}`]}`}>
                  {request.status === "pending" && <Clock size={16} />}
                  {request.status === "completed" && <CheckCircle size={16} />}
                  {request.status === "cancelled" && <XCircle size={16} />}
                  {request.status.replace("_", " ")}
                </span>
              </div>

              <p className={styles.requestDetails}>{request.details}</p>

              <div className={styles.requestFooter}>
                <span className={styles.requestDate}>
                  {new Date(request.created_at).toLocaleString()}
                </span>
                <div className={styles.actions}>
                  {request.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateConciergeStatus(request.id, "in_progress")}
                        className={styles.actionBtn}
                      >
                        Start
                      </button>
                      <button
                        onClick={() => updateConciergeStatus(request.id, "completed")}
                        className={styles.actionBtnSuccess}
                      >
                        Complete
                      </button>
                    </>
                  )}
                  {request.status === "in_progress" && (
                    <button
                      onClick={() => updateConciergeStatus(request.id, "completed")}
                      className={styles.actionBtnSuccess}
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "partners" && (
        <div className={styles.requestsList}>
          {partnerApps.map((app) => (
            <div key={app.id} className={styles.requestCard}>
              <div className={styles.requestHeader}>
                <div>
                  <h3 className={styles.requestName}>{app.business_name}</h3>
                  <span className={styles.requestType}>{app.category}</span>
                </div>
                <span className={`${styles.status} ${styles[`status${app.status.charAt(0).toUpperCase()}${app.status.slice(1)}`]}`}>
                  {app.status === "pending" && <Clock size={16} />}
                  {app.status === "approved" && <CheckCircle size={16} />}
                  {app.status === "rejected" && <XCircle size={16} />}
                  {app.status}
                </span>
              </div>

              <div className={styles.appDetails}>
                <p><strong>Contact:</strong> {app.contact_name}</p>
                <p><strong>Email:</strong> {app.email}</p>
                {app.phone && <p><strong>Phone:</strong> {app.phone}</p>}
                {app.website && <p><strong>Website:</strong> <a href={app.website} target="_blank" rel="noopener noreferrer">{app.website}</a></p>}
              </div>

              <p className={styles.requestDetails}>{app.description}</p>

              <div className={styles.requestFooter}>
                <span className={styles.requestDate}>
                  {new Date(app.created_at).toLocaleString()}
                </span>
                {app.status === "pending" && (
                  <div className={styles.actions}>
                    <button
                      onClick={() => updatePartnerStatus(app.id, "approved")}
                      className={styles.actionBtnSuccess}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updatePartnerStatus(app.id, "rejected")}
                      className={styles.actionBtnDanger}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
