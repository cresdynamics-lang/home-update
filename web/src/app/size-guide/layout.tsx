import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Furniture Size Guide for Kenyan Homes | Home Update",
  description: "Measure your room and compare furniture footprints before you choose. Send dimensions on WhatsApp for help checking fit.",
  alternates: { canonical: "https://homeupdate.co.ke/size-guide/", languages: { "en-KE": "https://homeupdate.co.ke/size-guide/" } },
};

export default function SizeGuideLayout({ children }: LayoutProps<"/size-guide">) {
  return <><BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Size guide", path: "/size-guide/" }]} />{children}</>;
}
