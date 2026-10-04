import { Em, SectionLabel, SectionTitle, WaButton } from "@/components/ui";
import { CallButton } from "@/components/CallButton";
import { site } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Contact Home Update Furniture Nairobi | Home Update",
  "Ask Home Update about furniture dimensions, finishes or today's price. Call or send your question on WhatsApp.",
  "/contact/",
);

export default function ContactPage() {
  return (
    <>
    <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }]} />
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <SectionLabel>Contact</SectionLabel>
      <SectionTitle>
        Three ways to <Em>start.</Em>
      </SectionTitle>
      <p className="mt-3 max-w-xl text-muted">
        Send a product question, room dimensions or a photo on WhatsApp, or call if you prefer a voice.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="rounded-[1.25rem] border border-white/8 bg-espresso p-6">
          <h2 className="font-serif text-2xl text-ivory">WhatsApp</h2>
          <p className="mt-2 text-sm text-muted">Send a photo, room size or piece name.</p>
          <WaButton className="mt-6" pulse />
        </div>
        <div className="rounded-[1.25rem] border border-white/8 bg-espresso p-6">
          <h2 className="font-serif text-2xl text-ivory">Call</h2>
          <p className="mt-2 text-sm text-muted">{site.phoneDisplay}</p>
          <CallButton className="mt-6" />
        </div>
        <div className="rounded-[1.25rem] border border-white/8 bg-espresso p-6">
          <h2 className="font-serif text-2xl text-ivory">Room details</h2>
          <p className="mt-2 text-sm text-muted">
            Share your room dimensions, access route and the product you are considering. We will confirm current product and delivery details with you.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
