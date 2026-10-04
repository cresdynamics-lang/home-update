declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export type AnalyticsEvent =
  | "compare_add"
  | "simulator_run"
  | "size_checker_used"
  | "fabric_select"
  | "whatsapp_click"
  | "shortlist_send"
  | "call_click"
  | "sample_request"
  | "showroom_directions_click";

type Payload = {
  product?: string;
  itemId?: string;
  page?: string;
  value?: string;
  fabric?: string;
  configuration?: string;
  ctaLocation?: string;
  serviceArea?: string;
  linkUrl?: string;
};

/**
 * Push analytics events to dataLayer for the consent-gated GTM integration.
 * Collection and GA4 consent settings are configured in the GTM container.
 */
export function track(event: AnalyticsEvent, payload: Payload = {}) {
  if (typeof window === "undefined") return;

  // Never send the WhatsApp message query string to analytics; it may contain
  // a customer's room details or other text they chose to include.
  const linkUrl = payload.linkUrl?.startsWith("https://wa.me/")
    ? payload.linkUrl.split("?", 1)[0]
    : payload.linkUrl?.startsWith("tel:")
      ? "tel:+254743844362"
      : undefined;

  const detail = {
    event,
    product: payload.product,
    value: payload.value,
    page: payload.page ?? window.location.pathname,
    page_location: payload.page ?? window.location.pathname,
    item_id: payload.itemId,
    fabric: payload.fabric,
    configuration: payload.configuration,
    cta_location: payload.ctaLocation,
    service_area: payload.serviceArea,
    link_url: linkUrl,
  };

  const w = window as unknown as {
    dataLayer?: unknown[];
  };

  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push(detail);

  // GA4 collection and consent settings belong in the connected GTM container.
}
