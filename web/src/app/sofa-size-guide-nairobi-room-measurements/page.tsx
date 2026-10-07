import type { Metadata } from "next";
import SofaSizeGuideContent from "@/app/size-guide/sofa-size-guide/page";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Sofa Size Guide for Nairobi Homes | Room Measurements",
  description: "Measure a Nairobi living room for sofa width, chaise depth, walkways and delivery access. Share the measurements with Home Update for a personal review.",
  alternates: { canonical: "https://homeupdate.co.ke/sofa-size-guide-nairobi-room-measurements/", languages: { "en-KE": "https://homeupdate.co.ke/sofa-size-guide-nairobi-room-measurements/" } },
};

export default function NairobiSofaSizeGuidePage() {
  return <><BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Furniture size guide", path: "/furniture-size-guide-nairobi/" }, { name: "Sofa size guide", path: "/sofa-size-guide-nairobi-room-measurements/" }]} /><SofaSizeGuideContent /></>;
}
