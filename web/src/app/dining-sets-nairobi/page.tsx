import type { Metadata } from "next";
import { CatalogPage } from "@/components/CatalogPage";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Dining Sets in Nairobi | 4, 6 & 8 Seater Tables", "Browse dining sets in Nairobi by seating capacity, table shape and listed dimensions. Ask Home Update to confirm options, availability and current prices.", "/dining-sets-nairobi/");

export default function DiningSetsNairobiPage() {
  return <><BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Dining sets in Nairobi", path: "/dining-sets-nairobi/" }]} /><CatalogPage eyebrow="Dining sets · Nairobi" title="Dining made for" em="your home." blurb="Compare four-, six- and eight-seat dining sets by their listed dimensions and shape. Send your room measurements for advice from the team." filter="dining" basePath="/dining-sets-nairobi" /></>;
}
