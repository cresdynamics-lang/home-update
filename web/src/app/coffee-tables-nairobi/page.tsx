import type { Metadata } from "next";
import { CatalogPage } from "@/components/CatalogPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Coffee Tables in Nairobi | Space-Saving Designs", "Explore oval and nesting coffee table concepts for Nairobi apartments. Compare listed footprints and confirm individual dimensions, construction and availability with Home Update.", "/coffee-tables-nairobi/");

export default function CoffeeTablesNairobiPage() {
  return <CatalogPage eyebrow="Coffee tables · Nairobi" title="Bring the room" em="together." blurb="Compare listed coffee-table concepts and footprints for sectional sofas. Confirm individual dimensions, construction, photography and availability before ordering." filter="coffee-tables" basePath="/coffee-tables-nairobi" />;
}
