import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    // AVIF first, then WebP: smallest payloads on mobile data.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    const products = [
      ["the-fluted", "/dining-sets-nairobi/6-seater-dining-set-nairobi-apartments/"],
      ["the-orbit", "/dining-sets-nairobi/4-seater-round-dining-set-nairobi/"],
      ["the-ivory", "/dining-sets-nairobi/ivory-4-seater-dining-set-nairobi/"],
      ["the-regent", "/dining-sets-nairobi/regent-8-seater-dining-set-nairobi/"],
      ["the-cloud", "/sofas-nairobi/cloud-curved-l-shaped-sectional-sofa/"],
      ["the-truffle", "/sofas-nairobi/truffle-modular-sectional-sofa/"],
      ["the-linen", "/sofas-nairobi/l-shaped-sectional-sofa-nairobi/"],
    ] as const;
    const seoProductSlugs = [
      ["/dining-sets/6-seater-dining-set-nairobi", "/dining-sets-nairobi/6-seater-dining-set-nairobi-apartments/"],
      ["/dining-sets/6-seater-dining-set-nairobi-apartments", "/dining-sets-nairobi/6-seater-dining-set-nairobi-apartments/"],
      ["/dining-sets/the-fluted-6-seater-dining-set", "/dining-sets-nairobi/6-seater-dining-set-nairobi-apartments/"],
      ["/dining-sets/the-orbit-4-seater-round-dining-set", "/dining-sets-nairobi/4-seater-round-dining-set-nairobi/"],
      ["/dining-sets/the-ivory-dining-set", "/dining-sets-nairobi/ivory-4-seater-dining-set-nairobi/"],
      ["/dining-sets/the-regent-dining-set", "/dining-sets-nairobi/regent-8-seater-dining-set-nairobi/"],
      ["/sofas/l-shaped-sofa-nairobi", "/sofas-nairobi/l-shaped-sectional-sofa-nairobi/"],
      ["/sofas/l-shaped-sectional-sofa-nairobi", "/sofas-nairobi/l-shaped-sectional-sofa-nairobi/"],
      ["/sofas/the-linen-l-shaped-sofa", "/sofas-nairobi/l-shaped-sectional-sofa-nairobi/"],
      ["/sofas/the-cloud-curved-l-shaped-sofa", "/sofas-nairobi/cloud-curved-l-shaped-sectional-sofa/"],
      ["/sofas/the-truffle-modular-sectional", "/sofas-nairobi/truffle-modular-sectional-sofa/"],
      ["/sofas/l-shaped-sectional-sofa-nairobi", "/sofas-nairobi/l-shaped-sectional-sofa-nairobi/"],
      ["/tv-stands/custom-hardwood-tv-stand-nairobi", "/tv-stands-nairobi/custom-tv-stand-cable-management/"],
      ["/tv-stands/custom-tv-stand-nairobi-cable-management", "/tv-stands-nairobi/custom-tv-stand-cable-management/"],
      ["/tv-stands/the-arc-tv-stand", "/tv-stands-nairobi/arc-low-tv-media-console/"],
      ["/shop/tv-stands/the-arc-tv-stand", "/tv-stands-nairobi/arc-low-tv-media-console/"],
      ["/shop/tv-stands/the-metro-tv-stand", "/tv-stands-nairobi/custom-tv-stand-cable-management/"],
      ["/coffee-tables/fluted-nesting-coffee-table-set", "/coffee-tables-nairobi/nesting-coffee-tables-small-apartments/"],
      ["/coffee-tables/nesting-coffee-tables-nairobi-small-apartments", "/coffee-tables-nairobi/nesting-coffee-tables-small-apartments/"],
      ["/coffee-tables/the-vale-coffee-table", "/coffee-tables-nairobi/vale-fluted-oval-coffee-table/"],
      ["/shop/coffee-tables/the-vale-coffee-table", "/coffee-tables-nairobi/vale-fluted-oval-coffee-table/"],
      ["/shop/coffee-tables/the-nest-nesting-coffee-tables", "/coffee-tables-nairobi/nesting-coffee-tables-small-apartments/"],
    ] as const;
    const publicPageSlugs = [
      ["/shop", "/furniture-shop-nairobi-kenya/"],
      ["/tv-stands", "/tv-stands-nairobi/"],
      ["/coffee-tables", "/coffee-tables-nairobi/"],
      ["/dining-sets", "/dining-sets-nairobi/"],
      ["/sofas", "/sofas-nairobi/"],
      ["/custom-design", "/custom-furniture-design-nairobi/"],
      ["/fabrics-and-colours", "/furniture-fabrics-colours-nairobi/"],
      ["/size-guide", "/furniture-size-guide-nairobi/"],
      ["/size-guide/dining-table-size-guide", "/dining-table-size-guide-nairobi-room-clearance/"],
      ["/size-guide/sofa-size-guide", "/sofa-size-guide-nairobi-room-measurements/"],
      ["/match-my-room", "/match-furniture-to-my-room-nairobi/"],
      ["/about", "/about-home-update-furniture-nairobi/"],
      ["/contact", "/contact-home-update-furniture-nairobi/"],
      ["/faqs", "/furniture-faqs-prices-delivery-care/"],
      ["/dining-sets/4-seater-round-dining-tables", "/dining-sets-nairobi/4-seater-round-dining-tables-nairobi/"],
      ["/dining-sets/6-seater-dining-tables", "/dining-sets-nairobi/6-seater-dining-tables-nairobi/"],
      ["/dining-sets/8-seater-dining-tables", "/dining-sets-nairobi/8-seater-dining-tables-nairobi/"],
      ["/sofas/l-shaped-sofas", "/sofas-nairobi/l-shaped-sofas-nairobi/"],
      ["/sofas/modular-sectional-sofas", "/sofas-nairobi/modular-sectional-sofas-nairobi/"],
      ["/sofas/sofas-with-chaise", "/sofas-nairobi/sofas-with-chaise-nairobi/"],
    ] as const;
    const journalSlugs = [
      ["small-space-sofa-ideas", "small-living-room-sofa-ideas-nairobi"],
      ["fabrics-for-kids-and-pets", "best-sofa-fabric-for-kids-and-pets"],
      ["measure-before-you-fall", "how-to-measure-your-room-for-a-sofa"],
    ] as const;

    return [
      { source: "/shop/tv-stands", destination: "/tv-stands-nairobi/", statusCode: 301 },
      { source: "/shop/coffee-tables", destination: "/coffee-tables-nairobi/", statusCode: 301 },
      { source: "/fabrics", destination: "/furniture-fabrics-colours-nairobi/", statusCode: 301 },
      ...publicPageSlugs.map(([source, destination]) => ({ source, destination, statusCode: 301 })),
      ...seoProductSlugs.map(([source, destination]) => ({ source, destination, statusCode: 301 })),
      ...journalSlugs.map(([oldSlug, newSlug]) => ({
        source: `/journal/${oldSlug}`,
        destination: `/journal/${newSlug}/`,
        statusCode: 301,
      })),
      ...products.map(([slug, destination]) => ({
        source: `/products/${slug}`,
        destination,
        statusCode: 301,
      })),
    ];
  },
};

export default nextConfig;
