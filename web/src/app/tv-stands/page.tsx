import type { Metadata } from "next";
import { CatalogPage } from "@/components/CatalogPage";

export const metadata: Metadata = {
  title: "TV Stands & Media Consoles in Nairobi",
  description:
    "Explore TV stand concepts with screen-size, cable-management and storage details. Ask Home Update about availability and finishes on WhatsApp.",
  alternates: { canonical: "https://homeupdate.co.ke/tv-stands/" },
};

export default function TvStandsPage() {
  return (
    <CatalogPage
      eyebrow="TV stands"
      title="Make room for"
      em="everything that belongs here."
      blurb="Compare console footprints, screen-size guidance, cable routes and timber tones. Concept previews are clearly labelled while product photography and availability are confirmed."
      filter="tv-stands"
      basePath="/tv-stands"
    />
  );
}
