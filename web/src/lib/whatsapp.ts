import type { Product } from "@/data/products";
import { site } from "@/lib/site";
import type { Combo } from "@/lib/image-map";
import { productPath } from "@/lib/seo";

/**
 * Keep the WhatsApp share link deterministic for both SSR and hydration.
 * Using the canonical production URL avoids client/server mismatches caused by
 * localhost preview URLs during development.
 */
function pageUrl(product?: Product): string {
  if (product) return `${site.url}${productPath(product)}`;
  return site.url;
}

/**
 * Build the pre-filled WhatsApp message. Encodes product name, size, layout,
 * fabric, colour, timber, room size, selected comparison items and the page URL.
 */
export function buildWhatsAppMessage({
  product,
  combo,
  room,
  compare,
}: {
  product?: Product;
  combo?: Combo;
  room?: { lengthM: number; widthM: number } | null;
  compare?: Product[];
}): string {
  const parts: string[] = ["Hi Home Update,"];

  if (product) {
    const details: string[] = [];
    if (combo?.layout) details.push(combo.layout);
    if (combo?.fabric) details.push(combo.fabric);
    if (combo?.colour) details.push(combo.colour);
    if (combo?.wood) details.push(`${combo.wood} legs`);

    const size = `${product.dimensions.w}x${product.dimensions.d} cm`;
    const leadTime = product.leadTimeDays;
    const lead = leadTime === null
      ? "Ask us to confirm lead time"
      : typeof leadTime === "string"
        ? leadTime
        : `${leadTime.min}-${leadTime.max} business days`;

    parts.push(
      `I'm interested in ${product.name} (${size}${details.length ? `, ${details.join(", ")}` : ""}).`,
    );
    parts.push(`Listed lead time: ${lead}.`);
  }

  if (compare && compare.length > 0) {
    parts.push(`Comparing: ${compare.map((p) => `${p.name} (${p.dimensions.w}x${p.dimensions.d} cm)`).join(", ")}.`);
  }

  if (room && room.lengthM > 0 && room.widthM > 0) {
    parts.push(`My room is ${room.lengthM} x ${room.widthM} m.`);
  }

  parts.push("Please send price and delivery time.");
  parts.push(`Link: ${pageUrl(product)}`);
  return parts.join(" ");
}

export function whatsappHref(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Room photo upload instructions sent straight to WhatsApp. */
export function roomPhotoMessage(room?: { lengthM: number; widthM: number } | null) {
  const size = room ? ` My room measures ${room.lengthM} x ${room.widthM} m.` : "";
  return encodeURIComponent(
    `Hi Home Update, I'd like help matching a piece to my room.${size} Here is my photo — please send your best fabric and size suggestions. Link: ${site.url}`,
  );
}
