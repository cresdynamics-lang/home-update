import { ComparisonMatrix } from "@/components/ComparisonMatrix";
import { SectionLabel, SectionTitle } from "@/components/ui";

export const metadata = {
  title: "Compare furniture",
  description: "Compare dining sets and sofas side by side before sending your shortlist to WhatsApp.",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <SectionLabel>Compare</SectionLabel>
      <SectionTitle>Pick your top 3 and compare</SectionTitle>
      <ComparisonMatrix />
    </div>
  );
}
