import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { SectionLabel, SectionTitle } from "@/components/ui";
import { TrackedWhatsAppLink } from "@/components/TrackedWhatsAppLink";
import { pageMetadata } from "@/lib/seo";
import { waLink } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata("Current Furniture Prices | Home Update", "Ask Home Update about current furniture prices and availability on WhatsApp.", "/sale/"),
  robots: { index: false, follow: true },
};

export default function SalePage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Current prices", path: "/sale/" }]} />
      <SectionLabel>Current prices</SectionLabel>
      <SectionTitle>Ask us to confirm today&apos;s <em className="text-champagne">price and availability.</em></SectionTitle>
      <p className="mt-4 max-w-2xl text-muted">Prices and promotions can change. No promotion is listed here until the current offer is confirmed. Share the piece you are interested in and we will check its latest price with you.</p>
      <TrackedWhatsAppLink href={waLink("Hi Home Update, please confirm today's price and availability.")} className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-wa px-5 py-3 text-sm font-medium text-white hover:bg-wa-dark">Ask on WhatsApp</TrackedWhatsAppLink>
    </main>
  );
}
