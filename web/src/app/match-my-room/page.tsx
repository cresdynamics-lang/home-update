import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { RoomFitSimulator } from "@/components/RoomFitSimulator";
import { products, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Match Furniture to Your Room | Home Update",
  description: "Enter your room measurements and compare them with furniture footprints. Ask Home Update to confirm product fit on WhatsApp.",
  alternates: { canonical: `${site.url}/match-my-room/`, languages: { "en-KE": `${site.url}/match-my-room/` } },
};

export default function MatchMyRoomPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Match my room", path: "/match-my-room/" }]} />
      <p className="text-[11px] tracking-[0.18em] text-antique-gold uppercase">Match my room</p>
      <h1 className="mt-2 font-serif text-4xl text-ivory md:text-5xl">See how a piece could fit your <em className="text-champagne">room.</em></h1>
      <p className="mt-3 max-w-2xl text-muted">Enter room dimensions to compare a product footprint. Treat the result as a planning aid and confirm the product dimensions and clearances with us before ordering.</p>
      <div className="mt-10"><RoomFitSimulator product={products[0]} /></div>
    </main>
  );
}
