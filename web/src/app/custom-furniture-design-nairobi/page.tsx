import type { Metadata } from "next";
import CustomDesignPageContent from "@/app/custom-design/page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("Custom Furniture Design in Nairobi | Home Update", "Discuss custom sofa, dining and furniture dimensions with Home Update. Share room measurements, finish preferences and ask for a current quote on WhatsApp.", "/custom-furniture-design-nairobi/");

export default function CustomFurnitureDesignNairobiPage() {
  return <CustomDesignPageContent />;
}
