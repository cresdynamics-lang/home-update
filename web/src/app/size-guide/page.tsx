import { SizeGuideTeaser } from "@/components/home";
import { Em, SectionLabel, SectionTitle, WaButton } from "@/components/ui";

export const metadata = { title: "Size Guide" };

export default function SizeGuidePage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <SectionLabel>Size guide</SectionLabel>
        <SectionTitle>
          Measure once. <Em>Order with confidence.</Em>
        </SectionTitle>
        <p className="mt-3 max-w-2xl text-muted">
          Send your room length and width on WhatsApp — we recommend seat counts and clearances that
          leave room to live.
        </p>
        <WaButton className="mt-8" message="Hi — can you help me size a dining set / sofa for my room?">
          Get a size recommendation
        </WaButton>
      </div>
      <SizeGuideTeaser />
    </>
  );
}
