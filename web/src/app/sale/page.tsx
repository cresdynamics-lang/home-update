import { CatalogPage } from "@/components/CatalogPage";

export const metadata = {
  title: "Sale | Dining Sets & Sofas on Offer in Nairobi",
  description:
    "Selected dining sets and sofas with faster turnaround. Message us on WhatsApp for this week's list and today's price.",
};

export default function SalePage() {
  return (
    <CatalogPage
      eyebrow="Sale"
      title="The Home Update"
      em="Sale."
      blurb="Selected dining sets and sofas with faster turnaround. Message us for this week's list."
      filter="all"
      saleOnly
      basePath="/sale"
    />
  );
}
