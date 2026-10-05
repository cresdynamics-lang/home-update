import type { Metadata } from "next";
import { CatalogPage } from "@/components/CatalogPage";

export const metadata: Metadata = {
  title: "Coffee Tables in Nairobi",
  description:
    "Explore oval, nesting and timber-tone coffee table concepts for sectional sofas. Ask Home Update about availability and pairing options on WhatsApp.",
  alternates: { canonical: "https://homeupdate.co.ke/coffee-tables/" },
};

export default function CoffeeTablesPage() {
  return (
    <CatalogPage
      eyebrow="Coffee tables"
      title="Bring the room"
      em="together."
      blurb="Compare shape, footprint and timber-tone concepts alongside sectional sofa pairings. Concept previews are labelled until confirmed product photography and availability are supplied."
      filter="coffee-tables"
      basePath="/coffee-tables"
    />
  );
}
