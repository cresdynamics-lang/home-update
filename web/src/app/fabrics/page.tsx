import { FabricsSection, ColourRange } from "@/components/home";
import { GoldButton, SectionLabel, SectionTitle, Em } from "@/components/ui";

export const metadata = { title: "Fabrics & Colours" };

export default function FabricsPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <SectionLabel>Fabrics &amp; colours</SectionLabel>
        <SectionTitle>
          Choose a fabric built for <Em>real life.</Em>
        </SectionTitle>
        <p className="mt-3 max-w-2xl text-muted">
          From performance velvet to bouclé — pick a handfeel, then a shade that belongs with your
          tiles and curtains.
        </p>
        <GoldButton href="/contact" className="mt-8">
          Request fabric samples
        </GoldButton>
      </div>
      <FabricsSection />
      <ColourRange />
    </>
  );
}
