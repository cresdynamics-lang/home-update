import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { SectionLabel, SectionTitle } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sofa Size Guide for Kenyan Homes | Home Update",
  description: "Measure your sofa area, entry path and walkways before choosing a layout. Share the measurements on WhatsApp for help.",
  alternates: { canonical: `${site.url}/size-guide/sofa-size-guide/`, languages: { "en-KE": `${site.url}/size-guide/sofa-size-guide/` } },
};

export default function SofaSizeGuidePage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Size guide", path: "/size-guide/" }, { name: "Sofa size guide", path: "/size-guide/sofa-size-guide/" }]} />
      <SectionLabel>Sofa size guide</SectionLabel>
      <SectionTitle>Measure the room and route before you <em className="text-champagne">choose a sofa.</em></SectionTitle>
      <p className="mt-4 max-w-3xl text-muted">Record the usable room width and depth, then mark doors, windows, sockets, radiators and the walkway you need to keep clear. Check the full sofa footprint, including a chaise or corner section.</p>
      <section className="mt-9 space-y-4 text-ivory/90">
        <h2 className="font-serif text-2xl text-champagne">Check access as well as the room</h2>
        <p>Measure the narrowest doorway, corridor, stairwell, lift and turn on the route into the room. Note whether removable legs or modular sections are available for the particular model; ask the store to confirm before purchase.</p>
        <h2 className="pt-3 font-serif text-2xl text-champagne">Sketch the full layout</h2>
        <p>Use masking tape or a paper plan to mark the sofa footprint and the route people walk through the room. Include coffee tables, doors that swing inward and any dining area that shares the space. Keep a comfortable passage where people need to move around the furniture.</p>
        <h2 className="pt-3 font-serif text-2xl text-champagne">Share the measurements</h2>
        <p>Send room width and depth, doorway and stair measurements, and a photo or simple floor-plan sketch. Ask us to confirm the current dimensions and configuration for the model you are considering before arranging delivery.</p>
      </section>
      <div className="mt-9 flex flex-wrap gap-4 text-champagne underline">
        <Link href="/sofas/">Browse sofas</Link>
        <Link href="/sofas/l-shaped-sofas/">Explore L-shaped sofas</Link>
        <Link href="/contact/">Ask about room fit on WhatsApp</Link>
      </div>
    </main>
  );
}
