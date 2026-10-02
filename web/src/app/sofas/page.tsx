import { CatalogPage } from "@/components/CatalogPage";

export const metadata = {
  title: "Sofas in Nairobi | L-Shaped, Modular & Curved",
  description:
    "Curved sectionals, long L-shapes and modular sofas sized for real Kenyan rooms. Check fit, pick a fabric and get today's price on WhatsApp.",
};

export default function SofasPage() {
  return (
    <CatalogPage
      eyebrow="Sofas"
      title="Sofas that make people"
      em="stay."
      blurb="Curved sectionals, long L-shapes and quiet lounge pieces — sized for the rooms you already have."
      filter="sofa"
      basePath="/sofas"
    />
  );
}
