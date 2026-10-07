import type { Metadata } from "next";
import SizeGuidePageContent from "@/app/size-guide/page";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Furniture Size Guide for Nairobi Homes | Measure Room Fit",
  description: "Measure your Nairobi room, check listed furniture footprints and plan clearance before enquiring. Send the measurements to Home Update for personal advice.",
  alternates: { canonical: "https://homeupdate.co.ke/furniture-size-guide-nairobi/", languages: { "en-KE": "https://homeupdate.co.ke/furniture-size-guide-nairobi/" } },
};

export default function FurnitureSizeGuideNairobiPage() {
  return <><BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Furniture size guide for Nairobi homes", path: "/furniture-size-guide-nairobi/" }]} /><SizeGuidePageContent /></>;
}
