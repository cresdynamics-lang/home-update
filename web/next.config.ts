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
      ["the-fluted", "/dining-sets/the-fluted-6-seater-dining-set/"],
      ["the-orbit", "/dining-sets/the-orbit-4-seater-round-dining-set/"],
      ["the-ivory", "/dining-sets/the-ivory-dining-set/"],
      ["the-regent", "/dining-sets/the-regent-dining-set/"],
      ["the-cloud", "/sofas/the-cloud-curved-l-shaped-sofa/"],
      ["the-truffle", "/sofas/the-truffle-modular-sectional/"],
      ["the-linen", "/sofas/the-linen-l-shaped-sofa/"],
    ] as const;
    const journalSlugs = [
      ["small-space-sofa-ideas", "small-living-room-sofa-ideas-nairobi"],
      ["fabrics-for-kids-and-pets", "best-sofa-fabric-for-kids-and-pets"],
      ["measure-before-you-fall", "how-to-measure-your-room-for-a-sofa"],
    ] as const;

    return [
      { source: "/fabrics", destination: "/fabrics-and-colours/", statusCode: 301 },
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
