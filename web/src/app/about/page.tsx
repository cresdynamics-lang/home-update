import { WhyUs } from "@/components/home";
import { Em, SectionLabel, SectionTitle } from "@/components/ui";
import { site } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "About Home Update Furniture Nairobi | Home Update",
  "Meet Home Update Furniture and explore dining sets and sofas designed around real room measurements. Contact us on WhatsApp.",
  "/about-home-update-furniture-nairobi/",
);

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "About", path: "/about-home-update-furniture-nairobi/" }]} />
      <div className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <SectionLabel>About Home Update</SectionLabel>
        <SectionTitle>
          Furniture for the way you <Em>actually live.</Em>
        </SectionTitle>
        <p className="mt-4 max-w-2xl text-muted">
          {site.tagline} We help Nairobi homes choose dining sets and sofas with clear sizes, honest
          fabrics and delivery details before you order.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Delivery & setup", "Ask us to confirm service area, fees, timing and setup details."],
            ["Warranty", "Ask us to confirm the current warranty terms for your selected piece."],
            ["Visit options", "Contact us to confirm whether an in-person visit is available."],
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
