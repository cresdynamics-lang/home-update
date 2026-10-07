import type { Metadata } from "next";
import FabricsAndColoursPageContent from "@/app/fabrics-and-colours/page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Furniture Fabrics & Colours in Nairobi | Home Update", "Explore upholstery fabrics and colour options for Home Update furniture. Ask about the exact fabric composition, care instructions and sample availability.", "/furniture-fabrics-colours-nairobi/");

export default function FurnitureFabricsColoursNairobiPage() {
  return <FabricsAndColoursPageContent />;
}
