import type { MetadataRoute } from "next";
import { journalPosts } from "@/data/journal";
import { getCatalogProducts } from "@/lib/catalog-store";
import { productPath } from "@/lib/seo";
import { site } from "@/lib/site";

const staticPaths = [
  "/",
  "/furniture-shop-nairobi-kenya/",
  "/dining-sets-nairobi/",
  "/dining-sets-nairobi/4-seater-round-dining-tables-nairobi/",
  "/dining-sets-nairobi/6-seater-dining-tables-nairobi/",
  "/dining-sets-nairobi/8-seater-dining-tables-nairobi/",
  "/sofas-nairobi/",
  "/sofas-nairobi/l-shaped-sofas-nairobi/",
  "/sofas-nairobi/modular-sectional-sofas-nairobi/",
  "/sofas-nairobi/sofas-with-chaise-nairobi/",
  "/tv-stands-nairobi/",
  "/coffee-tables-nairobi/",
  "/furniture-fabrics-colours-nairobi/",
  "/furniture-size-guide-nairobi/",
  "/dining-table-size-guide-nairobi-room-clearance/",
  "/sofa-size-guide-nairobi-room-measurements/",
  "/match-furniture-to-my-room-nairobi/",
  "/custom-furniture-design-nairobi/",
  "/about-home-update-furniture-nairobi/",
  "/contact-home-update-furniture-nairobi/",
  "/furniture-faqs-prices-delivery-care/",
  "/journal/",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getCatalogProducts();
  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/" || path.includes("sets") || path.includes("sofas") ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/dining-sets-nairobi/" || path === "/sofas-nairobi/" ? 0.9 : 0.6,
  }));
  const productRoutes: MetadataRoute.Sitemap = products.filter((product) => !product.conceptPreview).map((product) => ({
    url: `${site.url}${productPath(product)}`,
    changeFrequency: "weekly",
    priority: 0.8,
    images: product.images.map((image) => `${site.url}${image}`),
  }));
  const journalRoutes: MetadataRoute.Sitemap = journalPosts.map((post) => ({
    url: `${site.url}/journal/${post.slug}/`,
    changeFrequency: "monthly",
    priority: 0.6,
    images: [`${site.url}${post.image}`],
  }));
  return [...staticRoutes, ...productRoutes, ...journalRoutes];
}
