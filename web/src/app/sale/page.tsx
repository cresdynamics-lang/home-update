import { CatalogPage } from "@/components/CatalogPage";

export const metadata = { title: "Sale" };

export default function SalePage() {
  return (
    <CatalogPage
      eyebrow="Sale"
      title="The Home Update"
      em="Sale."
      blurb="Selected dining sets and sofas with faster turnaround. Message us for this week’s list."
      filter="all"
    />
  );
}
