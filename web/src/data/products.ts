export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "dining" | "sofa";
  subtype: string;
  tags: string[];
  bestseller?: boolean;
  sale?: boolean;
  priceFrom: number | null;
  priceNote: string;
  dimensions: { w: number; d: number; h: number };
  seats?: number;
  layoutOptions: string[];
  fabrics: string[];
  colours: string[];
  woodFinishes: string[];
  waterResistant: boolean;
  leadTimeDays: { min: number; max: number } | "made to order";
  bestFor: string;
  minRoom: { w: number; d: number };
  images: string[];
  model3d?: { glb?: string; usdz?: string } | null;
  warranty: string;
  careNotes: string[];

  /**
   * PLACEHOLDER variant photography. Each option maps to an image so that
   * swapping a fabric/colour/finish visibly changes the viewport.
   * TODO(OWNER): replace with real per-fabric and per-finish photography.
   */
  variants?: {
    fabric?: Record<string, string>;
    colour?: Record<string, string>;
    wood?: Record<string, string>;
  };

  /** Proof badges. Video is a slot: null until the owner supplies the clip. */
  proofVideo?: string | null;

  /** Performance claims shown as toggle badges. */
  resilience?: {
    waterResistant?: boolean;
    kidFriendly?: boolean;
    petFriendly?: boolean;
    wipeClean?: boolean;
  };

  /** Clearance rules used by the 2D simulator, in cm. */
  clearance?: { chairPulloutCm: number; corridorCm: number };

  /** Price band for filtering. Null until the owner confirms real prices. */
  priceRange?: { min: number; max: number } | null;

  /** Short selling note used in the comparison matrix. */
  buildNote?: string;
};

/**
 * Items the owner must confirm before the placeholders become public facts.
 * Rendered in the product flow and mirrored in OWNER_TODO.md.
 */
export const ownerTodo = [
  "Confirm final showroom address, hours and delivery zones for Nairobi and nearby counties.",
  "Validate all product pricing, lead times, warranty terms and water-resistant claims with the owner.",
  "Collect final fabric/finish photography for each product variant and upload the matching image references.",
  "Add real 3D .glb/.usdz models only for products that have approved assets.",
  "Confirm the liquid-beading or wipe-clean video for the proof badges and replace the placeholder if needed.",
  "Verify room-fit assumptions and clearance values for each SKU before publication.",
  "Set a real sale end date in src/lib/site.ts to enable the countdown, or leave it hidden.",
] as const;

/** Standard clearance rules by category, in cm. */
export const CLEARANCE = {
  dining: { chairPulloutCm: 60, corridorCm: 90 },
  sofa: { chairPulloutCm: 60, corridorCm: 90 },
} as const;

export const products: Product[] = [
  {
    id: "fluted",
    slug: "the-fluted",
    name: "The Fluted",
    category: "dining",
    subtype: "6-seater dining",
    tags: ["bestseller", "sale"],
    bestseller: true,
    sale: true,
    priceFrom: null,
    priceNote: "Ask for today’s price",
    dimensions: { w: 170, d: 90, h: 76 },
    seats: 6,
    layoutOptions: ["Rectangular", "Round"],
    fabrics: ["Bouclé", "Performance Velvet", "Linen Blend"],
    colours: ["Cream", "Sand", "Truffle", "Stone"],
    woodFinishes: ["Mahogany", "Walnut", "Natural Oak", "Ebony"],
    waterResistant: false,
    leadTimeDays: { min: 10, max: 14 },
    bestFor: "Family dinners and gatherings",
    minRoom: { w: 3.5, d: 2.7 },
    images: [
      "/images/6-seats-dinning.jpeg",
      "/images/dining-close.jpeg",
      "/images/dining-set.jpeg",
      "/images/sofa-detail.jpeg",
      "/images/curved-sofas.jpeg",
      "/images/living-marble.jpeg",
    ],
    variants: {
      fabric: {
        "Bouclé": "/images/sofa-detail.jpeg",
        "Performance Velvet": "/images/living-marble.jpeg",
        "Linen Blend": "/images/dining-close.jpeg",
      },
      colour: {
        Cream: "/images/6-seats-dinning.jpeg",
        Sand: "/images/dining-set.jpeg",
        Truffle: "/images/dining-close.jpeg",
        Stone: "/images/living-marble.jpeg",
      },
      wood: {
        Mahogany: "/images/dining-close.jpeg",
        Walnut: "/images/dining-set.jpeg",
        "Natural Oak": "/images/6-seats-dinning.jpeg",
        Ebony: "/images/sofa-detail.jpeg",
      },
    },
    proofVideo: null,
    resilience: { waterResistant: false, kidFriendly: true, petFriendly: true, wipeClean: true },
    clearance: { chairPulloutCm: 60, corridorCm: 90 },
    priceRange: null,
    buildNote: "Custom timber stain per order.",
    model3d: null,
    warranty: "Placeholder warranty — confirm with owner.",
    careNotes: [
      "Dust often to keep the fluted finish looking sharp.",
      "Wipe spills promptly.",
    ],
  },
  {
    id: "cloud",
    slug: "the-cloud",
    name: "The Cloud",
    category: "sofa",
    subtype: "Curved L-shaped sofa",
    tags: ["bestseller"],
    bestseller: true,
    priceFrom: null,
    priceNote: "Ask for today’s price",
    dimensions: { w: 280, d: 170, h: 80 },
    seats: 3,
    layoutOptions: ["L-left chaise", "L-right chaise", "Modular"],
    fabrics: ["Oat Bouclé", "Performance Velvet", "Chenille", "Linen Blend"],
    colours: ["Cream", "Oat", "Sand", "Stone", "Truffle"],
    woodFinishes: ["Walnut", "Natural Oak", "Ebony"],
    waterResistant: false,
    leadTimeDays: { min: 7, max: 10 },
    bestFor: "Open-plan living rooms and family lounging",
    minRoom: { w: 3.8, d: 2.5 },
    images: [
      "/images/curved-sofas.jpeg",
      "/images/living-l-sofa.jpeg",
      "/images/long-l-sofa.jpeg",
      "/images/sofa-detail.jpeg",
      "/images/living-marble.jpeg",
      "/images/dining-set.jpeg",
    ],
    variants: {
      fabric: {
        "Oat Bouclé": "/images/sofa-detail.jpeg",
        "Performance Velvet": "/images/living-l-sofa.jpeg",
        Chenille: "/images/long-l-sofa.jpeg",
        "Linen Blend": "/images/living-marble.jpeg",
      },
      colour: {
        Cream: "/images/curved-sofas.jpeg",
        Oat: "/images/living-l-sofa.jpeg",
        Sand: "/images/living-marble.jpeg",
        Stone: "/images/dining-set.jpeg",
        Truffle: "/images/long-l-sofa.jpeg",
      },
      wood: {
        Walnut: "/images/sofa-detail.jpeg",
        "Natural Oak": "/images/living-marble.jpeg",
        Ebony: "/images/long-l-sofa.jpeg",
      },
    },
    proofVideo: null,
    resilience: { waterResistant: false, kidFriendly: true, petFriendly: true, wipeClean: true },
    clearance: { chairPulloutCm: 60, corridorCm: 90 },
    priceRange: null,
    buildNote: "Reversible left/right chaise.",
    model3d: null,
    warranty: "Placeholder warranty — confirm with owner.",
    careNotes: ["Vacuum weekly and rotate cushions.", "Spot clean on fabric zones."],
  },
  {
    id: "truffle",
    slug: "the-truffle",
    name: "The Truffle",
    category: "sofa",
    subtype: "Modular sectional",
    tags: ["popular"],
    priceFrom: null,
    priceNote: "Ask for today’s price",
    dimensions: { w: 300, d: 180, h: 82 },
    seats: 6,
    layoutOptions: ["Modular", "Open-plan", "Corner"],
    fabrics: ["Chenille", "Performance Velvet", "Bouclé", "Linen Blend"],
    colours: ["Truffle", "Stone", "Oat", "Charcoal"],
    woodFinishes: ["Walnut", "Mahogany", "Ebony"],
    waterResistant: true,
    leadTimeDays: { min: 12, max: 16 },
    bestFor: "Large family spaces and open-plan lounges",
    minRoom: { w: 4.2, d: 3.0 },
    images: [
      "/images/long-l-sofa.jpeg",
      "/images/living-l-sofa.jpeg",
      "/images/curved-sofas.jpeg",
      "/images/sofa-detail.jpeg",
      "/images/living-marble.jpeg",
      "/images/dining-close.jpeg",
    ],
    variants: {
      fabric: {
        Chenille: "/images/long-l-sofa.jpeg",
        "Performance Velvet": "/images/living-l-sofa.jpeg",
        "Bouclé": "/images/sofa-detail.jpeg",
        "Linen Blend": "/images/living-marble.jpeg",
      },
      colour: {
        Truffle: "/images/long-l-sofa.jpeg",
        Stone: "/images/curved-sofas.jpeg",
        Oat: "/images/living-l-sofa.jpeg",
        Charcoal: "/images/sofa-detail.jpeg",
      },
      wood: {
        Walnut: "/images/living-marble.jpeg",
        Mahogany: "/images/long-l-sofa.jpeg",
        Ebony: "/images/sofa-detail.jpeg",
      },
    },
    proofVideo: null,
    resilience: { waterResistant: true, kidFriendly: true, petFriendly: true, wipeClean: true },
    clearance: { chairPulloutCm: 60, corridorCm: 90 },
    priceRange: null,
    buildNote: "Built section by section for flexible room planning.",
    model3d: null,
    warranty: "Placeholder warranty — confirm with owner.",
    careNotes: [
      "Built section by section for flexible room planning.",
      "Use a fabric-safe cleaner for careful maintenance.",
    ],
  },
  {
    id: "linen",
    slug: "the-linen",
    name: "The Linen",
    category: "sofa",
    subtype: "L-shaped sofa",
    tags: ["popular"],
    priceFrom: null,
    priceNote: "Ask for today’s price",
    dimensions: { w: 270, d: 165, h: 78 },
    seats: 5,
    layoutOptions: ["L-left chaise", "L-right chaise", "Chaise"],
    fabrics: ["Linen Blend", "Bouclé", "Chenille"],
    colours: ["Cream", "Ivory", "Stone", "Oat"],
    woodFinishes: ["Natural Oak", "Walnut"],
    waterResistant: false,
    leadTimeDays: { min: 7, max: 10 },
    bestFor: "Light-filled apartments and calm corners",
    minRoom: { w: 2.9, d: 2.4 },
    images: [
      "/images/living-l-sofa.jpeg",
      "/images/sofa-detail.jpeg",
      "/images/curved-sofas.jpeg",
      "/images/living-marble.jpeg",
      "/images/long-l-sofa.jpeg",
      "/images/dining-set.jpeg",
    ],
    variants: {
      fabric: {
        "Linen Blend": "/images/living-marble.jpeg",
        "Bouclé": "/images/sofa-detail.jpeg",
        Chenille: "/images/long-l-sofa.jpeg",
      },
      colour: {
        Cream: "/images/living-l-sofa.jpeg",
        Ivory: "/images/curved-sofas.jpeg",
        Stone: "/images/living-marble.jpeg",
        Oat: "/images/long-l-sofa.jpeg",
      },
      wood: {
        "Natural Oak": "/images/living-marble.jpeg",
        Walnut: "/images/sofa-detail.jpeg",
      },
    },
    proofVideo: null,
    resilience: { waterResistant: false, kidFriendly: false, petFriendly: true, wipeClean: true },
    clearance: { chairPulloutCm: 60, corridorCm: 90 },
    priceRange: null,
    buildNote: "Compact L for smaller rooms.",
    model3d: null,
    warranty: "Placeholder warranty — confirm with owner.",
    careNotes: [
      "Brush the fabric lightly and vacuum under the seat.",
      "Avoid harsh direct sunlight to protect colour.",
    ],
  },
  {
    id: "ivory",
    slug: "the-ivory",
    name: "The Ivory",
    category: "dining",
    subtype: "Dining set",
    tags: ["sale"],
    sale: true,
    priceFrom: null,
    priceNote: "Ask for today’s price",
    dimensions: { w: 160, d: 90, h: 75 },
    seats: 4,
    layoutOptions: ["Round", "Rectangular"],
    fabrics: ["Linen Blend", "Performance Velvet"],
    colours: ["Ivory", "Cream", "Stone"],
    woodFinishes: ["Natural Oak", "Walnut"],
    waterResistant: false,
    leadTimeDays: { min: 10, max: 14 },
    bestFor: "Small dining spaces and calm kitchens",
    minRoom: { w: 2.8, d: 2.3 },
    images: [
      "/images/4-seats-dinning.jpeg",
      "/images/dining-close.jpeg",
      "/images/dining-set.jpeg",
      "/images/living-marble.jpeg",
      "/images/sofa-detail.jpeg",
      "/images/curved-sofas.jpeg",
    ],
    variants: {
      fabric: {
        "Linen Blend": "/images/dining-close.jpeg",
        "Performance Velvet": "/images/sofa-detail.jpeg",
      },
      colour: {
        Ivory: "/images/4-seats-dinning.jpeg",
        Cream: "/images/dining-set.jpeg",
        Stone: "/images/living-marble.jpeg",
      },
      wood: {
        "Natural Oak": "/images/4-seats-dinning.jpeg",
        Walnut: "/images/dining-close.jpeg",
      },
    },
    proofVideo: null,
    resilience: { waterResistant: false, kidFriendly: true, petFriendly: true, wipeClean: true },
    clearance: { chairPulloutCm: 60, corridorCm: 90 },
    priceRange: null,
    buildNote: "Compact 4-seater for small rooms.",
    model3d: null,
    warranty: "Placeholder warranty — confirm with owner.",
    careNotes: [
      "Use a soft cloth to polish timber surfaces.",
      "Avoid sitting on the tabletop edge with wet items.",
    ],
  },
  {
    id: "regent",
    slug: "the-regent",
    name: "The Regent",
    category: "dining",
    subtype: "8-seater dining",
    tags: ["bestseller"],
    bestseller: true,
    priceFrom: null,
    priceNote: "Ask for today’s price",
    dimensions: { w: 220, d: 100, h: 78 },
    seats: 8,
    layoutOptions: ["Rectangular", "Oval"],
    fabrics: ["Performance Velvet", "Bouclé"],
    colours: ["Charcoal", "Truffle", "Oat"],
    woodFinishes: ["Mahogany", "Ebony", "Walnut"],
    waterResistant: false,
    leadTimeDays: { min: 12, max: 18 },
    bestFor: "Hosting, family dining and formal evenings",
    minRoom: { w: 4.4, d: 2.2 },
    images: [
      "/images/6-seats-dinning.jpeg",
      "/images/dining-set.jpeg",
      "/images/dining-close.jpeg",
      "/images/living-marble.jpeg",
      "/images/curved-sofas.jpeg",
      "/images/sofa-detail.jpeg",
    ],
    variants: {
      fabric: {
        "Performance Velvet": "/images/living-marble.jpeg",
        "Bouclé": "/images/sofa-detail.jpeg",
      },
      colour: {
        Charcoal: "/images/sofa-detail.jpeg",
        Truffle: "/images/dining-close.jpeg",
        Oat: "/images/dining-set.jpeg",
      },
      wood: {
        Mahogany: "/images/dining-close.jpeg",
        Ebony: "/images/sofa-detail.jpeg",
        Walnut: "/images/dining-set.jpeg",
      },
    },
    proofVideo: null,
    resilience: { waterResistant: false, kidFriendly: true, petFriendly: true, wipeClean: true },
    clearance: { chairPulloutCm: 60, corridorCm: 90 },
    priceRange: null,
    buildNote: "Long-format table for hosting.",
    model3d: null,
    warranty: "Placeholder warranty — confirm with owner.",
    careNotes: ["Clean with a non-abrasive cloth.", "Protect from water marks and direct heat."],
  },
  {
    id: "orbit",
    slug: "the-orbit",
    name: "The Orbit",
    category: "dining",
    subtype: "Round dining set",
    tags: ["popular"],
    priceFrom: null,
    priceNote: "Ask for today’s price",
    dimensions: { w: 110, d: 110, h: 74 },
    seats: 4,
    layoutOptions: ["Round", "Compact"],
    fabrics: ["Linen Blend", "Chenille"],
    colours: ["Ivory", "Oat", "Stone"],
    woodFinishes: ["Natural Oak", "Walnut"],
    waterResistant: false,
    leadTimeDays: { min: 8, max: 12 },
    bestFor: "Apartments, nooks and compact breakfasts",
    minRoom: { w: 2.6, d: 2.6 },
    images: [
      "/images/4-seats-dinning.jpeg",
      "/images/dining-close.jpeg",
      "/images/dining-set.jpeg",
      "/images/sofa-detail.jpeg",
      "/images/living-l-sofa.jpeg",
      "/images/curved-sofas.jpeg",
    ],
    variants: {
      fabric: {
        "Linen Blend": "/images/dining-close.jpeg",
        Chenille: "/images/sofa-detail.jpeg",
      },
      colour: {
        Ivory: "/images/4-seats-dinning.jpeg",
        Oat: "/images/living-l-sofa.jpeg",
        Stone: "/images/dining-set.jpeg",
      },
      wood: {
        "Natural Oak": "/images/4-seats-dinning.jpeg",
        Walnut: "/images/dining-close.jpeg",
      },
    },
    proofVideo: null,
    resilience: { waterResistant: false, kidFriendly: true, petFriendly: true, wipeClean: true },
    clearance: { chairPulloutCm: 60, corridorCm: 90 },
    priceRange: null,
    buildNote: "Round footprint frees the corners.",
    model3d: null,
    warranty: "Placeholder warranty — confirm with owner.",
    careNotes: [
      "Keep chairs tucked in to protect the floor finish.",
      "Use a linen-safe cleaner for the upholstery.",
    ],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
