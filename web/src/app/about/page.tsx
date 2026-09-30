import { WhyUs } from "@/components/home";
import { Em, SectionLabel, SectionTitle } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata = { title: "About & Delivery" };

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <SectionLabel>About Home Update</SectionLabel>
        <SectionTitle>
          Furniture for the way you <Em>actually live.</Em>
        </SectionTitle>
        <p className="mt-4 max-w-2xl text-muted">
          {site.tagline} We help Nairobi homes choose dining sets and sofas with clear sizes, honest
          fabrics and delivery that includes setup.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Delivery & setup", "Scheduled delivery with placement in the room you choose."],
            ["Warranty", "Craftsmanship warranty details confirmed with your order on WhatsApp."],
            ["Showroom visits", "Message us to book a visit or a virtual room walkthrough."],
          ].map(([t, n]) => (
            <div key={t} className="rounded-2xl border border-white/8 bg-espresso p-5">
              <h2 className="font-serif text-xl text-champagne">{t}</h2>
              <p className="mt-2 text-sm text-muted">{n}</p>
            </div>
          ))}
        </div>
      </div>
      <WhyUs />
    </>
  );
}
