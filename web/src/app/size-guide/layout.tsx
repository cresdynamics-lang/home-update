import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Furniture Size Guide for Kenyan Homes | Home Update",
  description: "Measure your room and compare furniture footprints before you choose. Send dimensions on WhatsApp for help checking fit.",
  alternates: { canonical: "https://homeupdate.co.ke/furniture-size-guide-nairobi/", languages: { "en-KE": "https://homeupdate.co.ke/furniture-size-guide-nairobi/" } },
};

export default function SizeGuideLayout({ children }: LayoutProps<"/size-guide">) {
  return <>{children}</>;
}
