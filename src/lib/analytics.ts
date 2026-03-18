import { supabase } from "./supabase";

export type AnalyticsEventType = "view" | "click" | "search_appearance" | "ai_mention";
export type AnalyticsSource = "web" | "chatgpt" | "claude" | "gemini" | "search" | null;

interface TrackEventParams {
  listingId: string;
  eventType: AnalyticsEventType;
  source?: AnalyticsSource;
  metadata?: Record<string, unknown>;
}

/**
 * Track analytics events for business listings
 * Used to measure listing performance for client reporting
 */
export async function trackEvent({
  listingId,
  eventType,
  source = "web",
  metadata = {},
}: TrackEventParams) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    await supabase.from("listing_analytics").insert({
      listing_id: listingId,
      event_type: eventType,
      source,
      user_id: user?.id || null,
      metadata,
    });
  } catch (error) {
    // Silently fail - don't break user experience if analytics fail
    console.error("Analytics tracking error:", error);
  }
}

/**
 * Track listing view
 */
export function trackListingView(listingId: string, source?: AnalyticsSource) {
  return trackEvent({
    listingId,
    eventType: "view",
    source,
  });
}

/**
 * Track listing click (phone, website, etc.)
 */
export function trackListingClick(
  listingId: string,
  clickType: "phone" | "website" | "directions",
  source?: AnalyticsSource
) {
  return trackEvent({
    listingId,
    eventType: "click",
    source,
    metadata: { click_type: clickType },
  });
}

/**
 * Track search appearance
 */
export function trackSearchAppearance(listingId: string, searchQuery: string) {
  return trackEvent({
    listingId,
    eventType: "search_appearance",
    source: "web",
    metadata: { search_query: searchQuery },
  });
}

/**
 * Track AI mention (for external tracking)
 */
export function trackAIMention(
  listingId: string,
  aiSource: "chatgpt" | "claude" | "gemini",
  query: string
) {
  return trackEvent({
    listingId,
    eventType: "ai_mention",
    source: aiSource,
    metadata: { query },
  });
}
