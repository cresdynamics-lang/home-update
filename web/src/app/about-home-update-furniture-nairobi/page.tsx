import type { Metadata } from "next";
import AboutPageContent from "@/app/about/page";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("About Home Update Furniture in Nairobi", "Learn about Home Update Furniture in Nairobi and how our team helps customers compare room dimensions, furniture options and current order details.", "/about-home-update-furniture-nairobi/");

export default function AboutHomeUpdateNairobiPage() {
  return <AboutPageContent />;
}
