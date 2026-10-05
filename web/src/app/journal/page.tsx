import { JournalPageClient } from "@/components/JournalPageClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Furniture Guides for Kenyan Homes | Home Update Journal",
  "Practical guides to dining table sizes, small-space sofas and furniture materials for Kenyan homes.",
  "/journal/",
);

export default function JournalPage() {
  return <JournalPageClient />;
}
