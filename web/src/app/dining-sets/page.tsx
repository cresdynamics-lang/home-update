import { CatalogPage } from "@/components/CatalogPage";

export const metadata = { title: "Dining Sets" };

export default function DiningSetsPage() {
  return (
    <CatalogPage
      eyebrow="Dining sets"
      title="Tables people"
      em="actually gather around."
      blurb="4, 6 and 8 seaters — round or rectangular — made to fit your room and your hosting rhythm."
      filter="dining"
    />
  );
}
