import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { SectionLabel, SectionTitle } from "@/components/ui";
import { site } from "@/lib/site";

const questions = [
  { q: "How do I get today's price?", a: "Message Home Update with the product name and the configuration or finish you are considering. We will confirm the current price and availability before you order." },
  { q: "Can I change a product's dimensions or finish?", a: "Custom options can vary by product. Share the measurements and finish you have in mind and ask us to confirm what is possible, its price and lead time." },
  { q: "How do I know if a table or sofa fits my room?", a: "Measure the usable room area, access route and the product footprint. Our room-fit tools are planning aids; ask us to confirm dimensions and clearances for the exact product and layout." },
  { q: "Which fabrics are water-resistant or suitable for children and pets?", a: "Do not rely on a fabric name alone. Ask for the composition, care instructions and evidence for the exact upholstery option. We only make performance claims when they are confirmed." },
  { q: "What are the delivery fees and lead times?", a: "Delivery coverage, fees, setup and lead time need to be confirmed for your location and selected product. Send your area and product name on WhatsApp for current details." },
  { q: "What warranty or return terms apply?", a: "Ask us to confirm the current warranty and returns terms for the product and order before you purchase." },
  { q: "Can I see a fabric sample or visit in person?", a: "Contact Home Update to confirm whether fabric samples or an in-person visit are currently available, and whether any fees or appointment arrangements apply." },
];

export const metadata: Metadata = {
  title: "Furniture FAQs | Home Update Nairobi",
  description: "Answers about furniture prices, room fit, custom options, upholstery, delivery and warranty. Confirm current details on WhatsApp.",
  alternates: { canonical: `${site.url}/furniture-faqs-prices-delivery-care/`, languages: { "en-KE": `${site.url}/furniture-faqs-prices-delivery-care/` } },
  openGraph: { title: "Furniture FAQs | Home Update Nairobi", description: "Answers about furniture prices, room fit, custom options, upholstery, delivery and warranty.", url: `${site.url}/furniture-faqs-prices-delivery-care/` },
};

export default function FAQsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <main className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Furniture FAQs", path: "/furniture-faqs-prices-delivery-care/" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SectionLabel>Frequently asked questions</SectionLabel>
      <SectionTitle>Useful answers before you <em className="text-champagne">choose.</em></SectionTitle>
      <div className="mt-8 space-y-6">
        {questions.map(({ q, a }) => (
          <section key={q} className="rounded-2xl border border-white/10 bg-espresso p-5">
            <h2 className="font-serif text-xl text-champagne">{q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{a}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
