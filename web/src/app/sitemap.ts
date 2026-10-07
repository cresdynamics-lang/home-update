import type { MetadataRoute } from "next";
import { journalPosts } from "@/data/journal";
import { getCatalogProducts } from "@/lib/catalog-store";
import { productPath } from "@/lib/seo";
import { site } from "@/lib/site";

const staticPaths = [
  "/",
  "/shop/",
  "/tv-stands/",
  "/coffee-tables/",
  "/dining-sets/",
  "/dining-sets/4-seater-round-dining-tables/",
  "/dining-sets/6-seater-dining-tables/",
  "/dining-sets/8-seater-dining-tables/",
  "/sofas/",
  "/sofas/l-shaped-sofas/",
  "/sofas/modular-sectional-sofas/",
  "/sofas/sofas-with-chaise/",
  "/fabrics-and-colours/",
  "/size-guide/",
  "/size-guide/dining-table-size-guide/",
  "/size-guide/sofa-size-guide/",
  "/match-my-room/",
  "/custom-design/",
  "/about/",
  "/contact/",
  "/faqs/",
  "/journal/",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getCatalogProducts();
  const staticRoutes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "/" || path.includes("sets") || path.includes("sofas") ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/dining-sets/" || path === "/sofas/" ? 0.9 : 0.6,
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
