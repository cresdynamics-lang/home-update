import type { Metadata } from "next";
import { CatalogPage } from "@/components/CatalogPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("TV Stands in Nairobi | Home Update", "Explore timber TV stands with cable management and finish options.", "/shop/tv-stands/");

export default function TvStandsPage() {
  return <CatalogPage eyebrow="TV Stands" title="A considered place" em="for the screen." blurb="Timber tones include Mahogany, Walnut, Natural Oak and Ebony. Confirm dimensions and TV compatibility with us." filter="tv-stands" basePath="/shop/tv-stands" />;
}
