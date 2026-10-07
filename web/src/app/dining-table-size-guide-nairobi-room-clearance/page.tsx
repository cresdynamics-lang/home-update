import type { Metadata } from "next";
import DiningSizeGuideContent from "@/app/size-guide/dining-table-size-guide/page";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Dining Table Size Guide for Nairobi Homes | Room Clearance",
  description: "Plan dining table dimensions, chair pull-out and walkway clearance for a Nairobi home. Compare a measured footprint and ask Home Update to review it.",
  alternates: { canonical: "https://homeupdate.co.ke/dining-table-size-guide-nairobi-room-clearance/", languages: { "en-KE": "https://homeupdate.co.ke/dining-table-size-guide-nairobi-room-clearance/" } },
};

export default function NairobiDiningTableSizeGuidePage() {
  return <><BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Furniture size guide", path: "/furniture-size-guide-nairobi/" }, { name: "Dining table size guide", path: "/dining-table-size-guide-nairobi-room-clearance/" }]} /><DiningSizeGuideContent /></>;
}
