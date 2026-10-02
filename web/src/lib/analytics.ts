import { siteConfig } from "@/lib/site";

export type AnalyticsEvent =
  | "compare_add"
  | "simulator_run"
  | "fabric_select"
  | "whatsapp_click"
  | "shortlist_send";

type Payload = { product?: string; page?: string; value?: string };

/**
 * Lightweight analytics. Disabled until the owner sets an endpoint, so the site
 * never sends traffic anywhere by default. Events are also pushed to
 * window.dataLayer so a tag manager can pick them up without code changes.
 */
export function track(event: AnalyticsEvent, payload: Payload = {}) {
  if (typeof window === "undefined") return;

  const detail = {
    event,
    product: payload.product,
    value: payload.value,
    page: payload.page ?? window.location.pathname,
  };

  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (command: string, name: string, params: unknown) => void;
  };

  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(detail);

  if (siteConfig.analytics.enabled && siteConfig.analytics.endpoint) {
    w.gtag?.("event", event, { event_category: "engagement", ...detail });
  }
}
