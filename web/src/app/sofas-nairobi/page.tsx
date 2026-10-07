import type { Metadata } from "next";
import { CatalogPage } from "@/components/CatalogPage";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Sofas in Nairobi | L-Shaped, Modular & Curved", "Browse sofas in Nairobi by shape, configuration and listed footprint. Compare L-shaped, curved and modular designs, then ask about current options and price.", "/sofas-nairobi/");

export default function SofasNairobiPage() {
  return <><BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Sofas in Nairobi", path: "/sofas-nairobi/" }]} /><CatalogPage eyebrow="Sofas · Nairobi" title="Sofas for living" em="your way." blurb="Compare curved, L-shaped and modular sofa footprints. Share your room measurements and the team can help discuss suitable configurations." filter="sofa" basePath="/sofas-nairobi" /></>;
}
