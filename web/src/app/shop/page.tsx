import type { Metadata } from "next";
import { CatalogPage } from "@/components/CatalogPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Shop Furniture in Nairobi | Home Update", "Browse dining sets, sofas, coffee tables and TV stands.", "/shop/");

export default function ShopPage() {
  return <CatalogPage eyebrow="Shop" title="Furniture for" em="your home." blurb="Browse the Home Update collection by category." basePath="/shop" />;
}
