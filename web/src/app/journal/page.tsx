import { JournalTeaser } from "@/components/home";
import { Em, SectionLabel, SectionTitle } from "@/components/ui";

export const metadata = { title: "Journal" };

export default function JournalPage() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-5 pt-16 lg:px-8">
        <SectionLabel>Journal</SectionLabel>
        <SectionTitle>
          Ideas that change how you <Em>see home.</Em>
        </SectionTitle>
      </div>
      <JournalTeaser />
    </>
  );
}
