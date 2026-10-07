import type { Metadata } from "next";
import { CatalogPage } from "@/components/CatalogPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Furniture Shop in Nairobi, Kenya | Home Update",
  "Browse dining sets, sofas, coffee tables and TV stand concepts for Nairobi homes. Compare listed sizes and ask Home Update for today's price.",
  "/furniture-shop-nairobi-kenya/",
);

export default function FurnitureShopNairobiPage() {
  return <CatalogPage eyebrow="Furniture shop · Nairobi" title="Furniture for" em="your home." blurb="Browse dining sets, sofas, coffee tables and TV stand concepts. Compare listed footprints and confirm current availability with the team." basePath="/furniture-shop-nairobi-kenya" />;
}
