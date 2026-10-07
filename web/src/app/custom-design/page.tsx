import { CustomDesign, MatchRoom } from "@/components/home";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Custom Furniture Design in Nairobi | Home Update",
  "Discuss furniture dimensions and finishes with Home Update. Share your room measurements and ask for a quote on WhatsApp.",
  "/custom-furniture-design-nairobi/",
);

export default function CustomDesignPage() {
  return (
    <>
    <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Custom design", path: "/custom-furniture-design-nairobi/" }]} />
    <div id="match" className="pt-8">
      <CustomDesign />
      <MatchRoom />
    </div>
    </>
  );
}
