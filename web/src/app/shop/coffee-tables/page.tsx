import type { Metadata } from "next";
import { CatalogPage } from "@/components/CatalogPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Coffee Tables in Nairobi | Home Update", "Explore coffee tables in round, oval, rectangular and organic nesting shapes.", "/shop/coffee-tables/");

export default function CoffeeTablesPage() {
  return <CatalogPage eyebrow="Coffee Tables" title="The centre of" em="your living room." blurb="Explore round, oval, rectangular and fluted or organic nesting forms, with marble, solid wood and fluted base options." filter="coffee-tables" basePath="/shop/coffee-tables" />;
}
