import { CatalogPage } from "@/components/CatalogPage";

export const metadata = {
  title: "Dining Sets in Nairobi | 4, 6 & 8-Seater Tables",
  description:
    "Dining sets made to fit Kenyan homes. 4, 6 and 8-seater round and rectangular tables in Nairobi, with room-fit checks and today's price on WhatsApp.",
};

export default function DiningSetsPage() {
  return (
    <CatalogPage
      eyebrow="Dining sets"
      title="Tables people"
      em="actually gather around."
      blurb="4, 6 and 8 seaters — round or rectangular — made to fit your room and your hosting rhythm."
      filter="dining"
      basePath="/dining-sets"
    />
  );
}
