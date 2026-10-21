export type TrackEventName =
  | "cta_click"
  | "form_start"
  | "form_step_complete"
  | "generate_lead"
  | "whatsapp_click";

type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/** Push a GA4/GTM event. No-ops during server render. */
export function trackEvent(event: TrackEventName, params: TrackParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const payload: Record<string, unknown> = { event };
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) payload[key] = value;
  }
  window.dataLayer.push(payload);
}
