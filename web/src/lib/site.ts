export { CLEARANCE, getProductById, getProductBySlug, ownerTodo, products } from "@/data/products";
export type { Product } from "@/data/products";

export const STORAGE_KEYS = {
  compare: "home-update-compare",
  shortlist: "home-update-shortlist",
  room: "home-update-room",
  combos: "home-update-combos",
  promo: "home-update-promo-seen",
  cookie: "home-update-cookie-ack",
} as const;

export const site = {
  name: "Home Update Furniture",
  shortName: "Home Update",
  phoneDisplay: "0743 844 362",
  phoneTel: "+254743844362",
  whatsapp: "254743844362",
  email: "hello@homeupdate.co.ke",
  address: "Nairobi, Kenya",
  hours: "Mon–Sat · 9am–6pm",
  tagline: "Dining sets and sofas designed for the way you live, host and relax.",
  url: "https://homeupdate.co.ke",
} as const;

export const siteConfig = {
  /**
   * Real sale end date (ISO 8601). The countdown is hidden entirely while this
   * is null, so no urgency is ever faked. Set it only when the owner confirms
   * a genuine end date.
   */
  saleEnd: null as string | null,
  analytics: {
    enabled: false,
    endpoint: "",
  },
  ar: {
    enabled: true,
  },
  promo: {
    /** Delay before the one-per-session fit-finder prompt, in ms. */
    fitFinderDelayMs: 12000,
  },
} as const;

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function readStoredIds(key: string): string[] {
  if (typeof window === "undefined") return [];
  const parsed = readJson<unknown>(key, []);
  return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
}

export function writeStoredIds(key: string, value: string[]) {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("home-update-storage"));
    return true;
  } catch {
    return false;
  }
}

export type RoomSize = { lengthM: number; widthM: number };

export function readRoom(): RoomSize | null {
  if (typeof window === "undefined") return null;
  const parsed = readJson<Partial<RoomSize> | null>(STORAGE_KEYS.room, null);
  if (!parsed) return null;
  const { lengthM, widthM } = parsed;
  if (typeof lengthM !== "number" || typeof widthM !== "number") return null;
  if (lengthM <= 0 || widthM <= 0) return null;
  return { lengthM, widthM };
}

export function writeRoom(room: RoomSize | null) {
  if (typeof window === "undefined") return false;
  try {
    if (room) window.localStorage.setItem(STORAGE_KEYS.room, JSON.stringify(room));
    else window.localStorage.removeItem(STORAGE_KEYS.room);
    window.dispatchEvent(new Event("home-update-storage"));
    return true;
  } catch {
    return false;
  }
}

export type ProductCombo = {
  fabric?: string;
  colour?: string;
  wood?: string;
  layout?: string;
};

export function readCombos(): Record<string, ProductCombo> {
  if (typeof window === "undefined") return {};
  const parsed = readJson<unknown>(STORAGE_KEYS.combos, {});
  return parsed && typeof parsed === "object" && !Array.isArray(parsed)
    ? (parsed as Record<string, ProductCombo>)
    : {};
}

export function writeCombo(productId: string, combo: ProductCombo) {
  if (typeof window === "undefined") return;
  try {
    const all = readCombos();
    all[productId] = combo;
    window.localStorage.setItem(STORAGE_KEYS.combos, JSON.stringify(all));
    window.dispatchEvent(new Event("home-update-storage"));
  } catch {
    /* storage unavailable: combo simply will not persist */
  }
}

export function waLink(message?: string) {
  const text = encodeURIComponent(
    message ??
      "Hi Home Update — I’d like today’s price and fabric options for a piece on your site.",
  );
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}

export function currentPageUrl() {
  if (typeof window === "undefined") return site.url;
  return window.location.href;
}

export const colours = [
  { name: "Cream", hex: "#F3E9DA" },
  { name: "Oat", hex: "#D8C3A5" },
  { name: "Sand", hex: "#C4A484" },
  { name: "Stone", hex: "#A89888" },
  { name: "Truffle", hex: "#6B5344" },
  { name: "Sage", hex: "#8A9A7B" },
  { name: "Navy", hex: "#2C3E50" },
  { name: "Charcoal", hex: "#2B2B2B" },
] as const;

export const colourHex: Record<string, string> = Object.fromEntries(
  colours.map((c) => [c.name, c.hex]),
);

/** Shared fabric reference used by the finish matcher and fabric comparison. */
export type FabricInfo = {
  name: string;
  feel: string;
  kids: "excellent" | "good" | "caution";
  pets: "excellent" | "good" | "caution";
  water: "excellent" | "good" | "caution";
  care: string;
  priceTier: 1 | 2 | 3;
};

export const fabricInfo: Record<string, FabricInfo> = {
  "Oat Bouclé": {
    name: "Oat Bouclé",
    feel: "Soft, nubby, warm",
    kids: "caution",
    pets: "caution",
    water: "caution",
    care: "Vacuum weekly, blot spills",
    priceTier: 3,
  },
  Bouclé: {
    name: "Bouclé",
    feel: "Soft, nubby, warm",
    kids: "caution",
    pets: "caution",
    water: "caution",
    care: "Vacuum weekly, blot spills",
    priceTier: 3,
  },
  "Performance Velvet": {
    name: "Performance Velvet",
    feel: "Plush, deep, luminous",
    kids: "excellent",
    pets: "excellent",
    water: "excellent",
    care: "Wipe clean with a damp cloth",
    priceTier: 2,
  },
  Chenille: {
    name: "Chenille",
    feel: "Cozy, durable, brushed",
    kids: "excellent",
    pets: "excellent",
    water: "good",
    care: "Vacuum, spot clean as needed",
    priceTier: 1,
  },
  "Linen Blend": {
    name: "Linen Blend",
    feel: "Airy, relaxed, natural",
    kids: "good",
    pets: "caution",
    water: "caution",
    care: "Wash covers, air dry",
    priceTier: 1,
  },
};

export const fabricCompareOrder = [
  "Oat Bouclé",
  "Bouclé",
  "Performance Velvet",
  "Chenille",
  "Linen Blend",
];

export const woodFinishes = [
  { name: "Mahogany", hex: "#6B3A22" },
  { name: "Walnut", hex: "#4E342E" },
  { name: "Natural Oak", hex: "#C9A97A" },
  { name: "Ebony", hex: "#2A2320" },
] as const;

export const floorOptions = [
  { name: "Grey porcelain", hex: "#9AA0A3" },
  { name: "Warm cream marble", hex: "#E7DCC9" },
  { name: "Cool white marble", hex: "#F2F3F0" },
  { name: "Walnut parquet", hex: "#8A5A36" },
] as const;

export const curtainOptions = [
  { name: "Beige", hex: "#D6C7AE" },
  { name: "Oat linen", hex: "#D8C3A5" },
  { name: "Silver-grey", hex: "#B9BEC2" },
  { name: "Ivory", hex: "#F1E8D6" },
] as const;

export const wallOptions = [
  { name: "Soft ivory", hex: "#EFE7DA" },
  { name: "Stone", hex: "#B6ABA0" },
  { name: "Warm white", hex: "#F4EFE7" },
  { name: "Cool grey", hex: "#AFB4B8" },
] as const;

export const rooms = [
  {
    title: "The table your family keeps meaning to sit at.",
    cta: "Explore dining sets",
    href: "/dining-sets",
    image: "/images/dining-set.jpeg",
  },
  {
    title: "The sofa that makes people stay.",
    cta: "Explore sofas",
    href: "/sofas",
    image: "/images/curved-sofas.jpeg",
  },
  {
    title: "The corner you walk past every day.",
    cta: "See ideas",
    href: "/journal",
    image: "/images/sofa-detail.jpeg",
  },
] as const;

export const fabrics = [
  {
    name: "Bouclé",
    note: "Soft, textured, modern",
    tags: ["Statement", "Warm handfeel"],
    image: "/images/sofa-detail.jpeg",
  },
  {
    name: "Performance Velvet",
    note: "Deep, plush, rich",
    tags: ["Spill resistant", "Pet friendly"],
    image: "/images/living-l-sofa.jpeg",
  },
  {
    name: "Chenille",
    note: "Cozy, durable, warm",
    tags: ["Family ready", "Easy care"],
    image: "/images/long-l-sofa.jpeg",
  },
  {
    name: "Linen Blend",
    note: "Light, airy, relaxed",
    tags: ["Breathable", "Casual luxury"],
    image: "/images/living-marble.jpeg",
  },
] as const;

export const journal = [
  {
    slug: "balcony-is-a-room",
    title: "Your balcony is a room you have not furnished yet",
    minutes: 5,
    image: "/images/dining-close.jpeg",
  },
  {
    slug: "measure-before-you-fall",
    title: "Measure twice. Fall in love once.",
    minutes: 4,
    image: "/images/4-seats-dinning.jpeg",
  },
  {
    slug: "fabric-that-forgives",
    title: "The fabric test every Kenyan living room deserves",
    minutes: 6,
    image: "/images/curved-sofas.jpeg",
  },
  {
    slug: "small-space-sofa-ideas",
    title: "Small-space sofa ideas for Nairobi apartments",
    minutes: 6,
    image: "/images/living-l-sofa.jpeg",
  },
  {
    slug: "how-to-choose-dining-table-size",
    title: "How to choose a dining table size for your room",
    minutes: 7,
    image: "/images/6-seats-dinning.jpeg",
  },
  {
    slug: "fabrics-for-kids-and-pets",
    title: "Best sofa fabrics for homes with kids and pets",
    minutes: 5,
    image: "/images/sofa-detail.jpeg",
  },
] as const;

export const nav = [
  { label: "Dining Sets", href: "/dining-sets" },
  { label: "Sofas", href: "/sofas" },
  { label: "Fabrics & Colours", href: "/fabrics" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Custom Design", href: "/custom-design" },
  { label: "Sale", href: "/sale", hot: true },
  { label: "Journal", href: "/journal" },
] as const;

export const mega = {
  dining: [
    { label: "All dining sets", href: "/dining-sets" },
    { label: "4-seater round", href: "/dining-sets?seats=4" },
    { label: "6-seater tables", href: "/dining-sets?seats=6" },
    { label: "8-seater tables", href: "/dining-sets?seats=8" },
    { label: "Marble-top sets", href: "/dining-sets" },
    { label: "Dining chairs only", href: "/dining-sets" },
  ],
  sofas: [
    { label: "All sofas", href: "/sofas" },
    { label: "L-shaped sofas", href: "/sofas?shape=l" },
    { label: "Modular sectionals", href: "/sofas?shape=modular" },
    { label: "Sofas with chaise", href: "/sofas" },
    { label: "Balcony & nook picks", href: "/sofas" },
    { label: "Sofa beds", href: "/sofas" },
  ],
  design: [
    { label: "Fabrics & colours", href: "/fabrics" },
    { label: "Match my room", href: "/custom-design#match" },
    { label: "Size guide", href: "/size-guide" },
    { label: "Custom design", href: "/custom-design" },
    { label: "Request samples", href: "/contact" },
  ],
  need: [
    { label: "Water-resistant fabrics", href: "/fabrics" },
    { label: "Family & pet friendly", href: "/fabrics" },
    { label: "Small spaces", href: "/size-guide" },
    { label: "For hosting", href: "/dining-sets" },
    { label: "Bestsellers", href: "/#bestsellers" },
  ],
} as const;

export function formatKes(amount: number) {
  return `FROM KES ${amount.toLocaleString("en-KE")}`;
}

/** Human label for a price, or the "ask" note when no price is confirmed. */
export function priceLabel(product: { priceFrom: number | null; priceNote: string }) {
  return product.priceFrom ? `KES ${product.priceFrom.toLocaleString("en-KE")}` : product.priceNote;
}

export function leadTimeLabel(leadTime: { min: number; max: number } | "made to order") {
  return typeof leadTime === "string"
    ? "Made to order"
    : `Ready in ${leadTime.min}-${leadTime.max} days`;
}
