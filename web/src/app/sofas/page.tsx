import { CatalogPage } from "@/components/CatalogPage";

export const metadata = { title: "Sofas" };

export default function SofasPage() {
  return (
    <CatalogPage
      eyebrow="Sofas"
      title="Sofas that make people"
      em="stay."
      blurb="Curved sectionals, long L-shapes and quiet lounge pieces — sized for the rooms you already have."
      filter="sofa"
    />
  );
}
