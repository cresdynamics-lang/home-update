import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel, SectionTitle } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dining Table Size Guide for Kenyan Homes | Home Update",
  description: "Measure your dining area, table footprint and chair clearance before you choose. Send room dimensions on WhatsApp for help.",
  alternates: { canonical: `${site.url}/dining-table-size-guide-nairobi-room-clearance/`, languages: { "en-KE": `${site.url}/dining-table-size-guide-nairobi-room-clearance/` } },
};

export default function DiningTableSizeGuidePage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <SectionLabel>Dining table size guide</SectionLabel>
      <SectionTitle>Measure your dining area before you <em className="text-champagne">choose a table.</em></SectionTitle>
      <p className="mt-4 max-w-3xl text-muted">Start with the clear floor area, including door swings, cupboards and the route people use to pass through the room. Measure the narrowest entrance and stair route too, so the table and chairs can reach the room.</p>
      <section className="mt-9 space-y-4 text-ivory/90">
        <h2 className="font-serif text-2xl text-champagne">Allow room to use the chairs</h2>
        <p>As a planning starting point, allow about 60 cm from the table edge for a chair to pull out. A main walkway of about 90 cm is more comfortable where people need to pass behind a seated person. These are practical estimates, not a guarantee of fit; chair shape, table base, walls and the route through the room all change the result.</p>
        <h2 className="pt-3 font-serif text-2xl text-champagne">Compare the table footprint with your room</h2>
        <p>Check both the table dimensions and the space around it. A round top can make corner movement easier, while a rectangular top may use a narrow room more efficiently. Seating capacity varies with chair width and table design, so confirm how many people a specific piece comfortably seats.</p>
        <h2 className="pt-3 font-serif text-2xl text-champagne">Send measurements before you enquire</h2>
        <p>Share the room length and width, table position, doorway width and any tight turns on the delivery route. We can help you compare the listed dimensions and confirm the model details before an order.</p>
      </section>
      <div className="mt-9 flex flex-wrap gap-4 text-champagne underline">
        <Link href="/dining-sets-nairobi/">Browse dining sets</Link>
        <Link href="/dining-sets-nairobi/4-seater-round-dining-tables-nairobi/">Explore four-seat round tables</Link>
        <Link href="/contact-home-update-furniture-nairobi/">Ask about room fit on WhatsApp</Link>
      </div>
    </main>
  );
}
