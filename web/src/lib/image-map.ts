import type { Product } from "@/data/products";

export type Combo = { fabric?: string; colour?: string; wood?: string; layout?: string };

/**
 * Resolve the image for a fabric/colour/wood combination.
 * Falls back through fabric -> colour -> wood -> first image so a swap always
 * changes the viewport even when variant photography is still pending.
 */
export function resolveVariantImage(product: Product, combo: Combo): string {
  const v = product.variants;
  if (v?.fabric && combo.fabric && v.fabric[combo.fabric]) return v.fabric[combo.fabric];
  if (v?.colour && combo.colour && v.colour[combo.colour]) return v.colour[combo.colour];
  if (v?.wood && combo.wood && v.wood[combo.wood]) return v.wood[combo.wood];
  return product.images[0];
}

/**
 * Build the gallery for a combination: the resolved image first, then the rest
 * of the product gallery with duplicates removed.
 */
export function resolveGallery(product: Product, combo: Combo): string[] {
  const primary = resolveVariantImage(product, combo);
  const rest = product.images.filter((src) => src !== primary);
  return [primary, ...rest];
}

/**
 * The images a visitor is most likely to request next, so they can be warmed
 * through the image optimiser (AVIF/WebP) rather than fetching raw JPEGs.
 */
export function nextVariantImages(product: Product, combo: Combo, limit = 2): string[] {
  const candidates: string[] = [];

  if (combo.fabric) {
    for (const fabric of product.fabrics) {
      if (fabric === combo.fabric) continue;
      const resolved = resolveVariantImage(product, { ...combo, fabric });
      if (!candidates.includes(resolved)) candidates.push(resolved);
      if (candidates.length >= limit) return candidates;
    }
  }

  if (combo.colour) {
    for (const colour of product.colours) {
      if (colour === combo.colour) continue;
      const resolved = resolveVariantImage(product, { ...combo, colour });
      if (!candidates.includes(resolved)) candidates.push(resolved);
      if (candidates.length >= limit) return candidates;
    }
  }

  return candidates;
}

export function comboSummary(product: Pick<Product, "name">, combo: Combo): string {
  const parts = [product.name];
  if (combo.layout) parts.push(combo.layout);
  if (combo.fabric) parts.push(combo.fabric);
  if (combo.colour) parts.push(combo.colour);
  if (combo.wood) parts.push(`${combo.wood} legs`);
  return parts.join(", ");
}
