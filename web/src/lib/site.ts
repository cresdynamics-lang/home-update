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
} as const;

export function waLink(message?: string) {
  const text = encodeURIComponent(
    message ??
      "Hi Home Update — I’d like today’s price and fabric options for a piece on your site.",
  );
  return `https://wa.me/${site.whatsapp}?text=${text}`;
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

export const products = [
  {
    slug: "the-fluted",
    name: "The Fluted",
    category: "8-seater dining set",
    image: "/images/6-seats-dinning.jpeg",
    bestFor: "Hosting dinners",
    size: "220 × 100 cm",
    tags: ["Water-resistant fabric", "Custom size"],
    fromKes: 185000,
    badge: "Bestseller",
  },
  {
    slug: "the-cloud",
    name: "The Cloud",
    category: "Curved sectional sofa",
    image: "/images/curved-sofas.jpeg",
    bestFor: "Open living rooms",
    size: "Custom modular",
    tags: ["Performance velvet", "Pet friendly"],
    fromKes: 210000,
    badge: "Bestseller",
  },
  {
    slug: "the-truffle",
    name: "The Truffle",
    category: "L-shaped sectional",
    image: "/images/long-l-sofa.jpeg",
    bestFor: "Family lounging",
    size: "Made to measure",
    tags: ["Custom depth", "Matched to room"],
    fromKes: 195000,
    badge: "Featured",
  },
  {
    slug: "round-four",
    name: "The Round Four",
    category: "4-seater dining set",
    image: "/images/4-seats-dinning.jpeg",
    bestFor: "Apartments & nooks",
    size: "Ø 110 cm",
    tags: ["Compact footprint", "Custom fabric"],
    fromKes: 98000,
    badge: "Bestseller",
  },
  {
    slug: "marble-lounge",
    name: "The Quiet Sunday",
    category: "Living set mood",
    image: "/images/living-marble.jpeg",
    bestFor: "Bright rooms",
    size: "Room-matched",
    tags: ["Soft neutrals", "Easy care"],
    fromKes: 175000,
    badge: "New",
  },
  {
    slug: "luxe-l",
    name: "The Stay Longer",
    category: "Tufted L-sofa",
    image: "/images/living-l-sofa.jpeg",
    bestFor: "Corner living",
    size: "Custom L-shape",
    tags: ["Water-resistant", "Deep seat"],
    fromKes: 205000,
    badge: "Bestseller",
  },
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
