import type { Metadata } from "next";
import { CatalogPage } from "@/components/CatalogPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("TV Stands in Nairobi | Media Consoles & Cable Storage", "Compare TV stand concepts for Nairobi homes, including listed footprints and cable-storage ideas. Confirm construction, supported load and availability with Home Update.", "/tv-stands-nairobi/");

export default function TvStandsNairobiPage() {
  return <CatalogPage eyebrow="TV stands · Nairobi" title="Media consoles for" em="your living room." blurb="Review concept footprints and cable-storage ideas. Construction, supported load, screen compatibility, photography and availability must be confirmed before ordering." filter="tv-stands" basePath="/tv-stands-nairobi" />;
}
