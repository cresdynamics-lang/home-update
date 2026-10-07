import type { Metadata } from "next";
import { FabricsSection, ColourRange } from "@/components/home";
import { SectionLabel, SectionTitle, Em } from "@/components/ui";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { SampleRequestLink } from "@/components/SampleRequestLink";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "Furniture Fabrics & Colours | Home Update",
  "Explore upholstery fabric and colour options for Home Update sofas. Ask about samples and care guidance on WhatsApp.",
  "/furniture-fabrics-colours-nairobi/",
);

export default function FabricsAndColoursPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Fabrics & colours", path: "/furniture-fabrics-colours-nairobi/" }]} />
      <div className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <SectionLabel>Fabrics &amp; colours</SectionLabel>
        <SectionTitle>
          Choose a fabric built for <Em>your home.</Em>
        </SectionTitle>
        <p className="mt-3 max-w-2xl text-muted">
          Explore the fabric and colour options shown with our furniture. Ask us to confirm the current options, care guidance and sample availability before ordering.
        </p>
        <SampleRequestLink />
      </div>
      <FabricsSection />
      <ColourRange />
    </>
  );
}
