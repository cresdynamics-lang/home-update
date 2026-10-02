import type { MetadataRoute } from "next";
import { journal, products, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/dining-sets`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/sofas`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/fabrics`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/size-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/custom-design`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/sale`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${site.url}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const journalRoutes: MetadataRoute.Sitemap = journal.map((post) => ({
    url: `${site.url}/journal/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...journalRoutes];
}