import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { GoldButton, SectionLabel, SectionTitle } from "@/components/ui";
import { pageMetadata } from "@/lib/seo";

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
      <GoldButton href="https://wa.me/254743844362?text=Hi%20Home%20Update%2C%20please%20confirm%20today%E2%80%99s%20price%20and%20availability." external className="mt-8">Ask on WhatsApp</GoldButton>
    </main>
  );
}
