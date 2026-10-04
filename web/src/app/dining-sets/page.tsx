import type { Metadata } from "next";
import { site } from "@/lib/site";
import { products } from "@/data/products";
import { productPath } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { CatalogPage } from "@/components/CatalogPage";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const filtered = Object.keys(params).length > 0;
  return {
  title: "Dining Sets in Nairobi | Home Update",
  description:
    "Explore dining sets by size, shape and finish. Compare listed dimensions and ask today's price on WhatsApp.",
    alternates: { canonical: `${site.url}/dining-sets/`, languages: { "en-KE": `${site.url}/dining-sets/` } },
    openGraph: {
      title: "Dining Sets in Nairobi | Home Update",
      description: "Explore dining sets by size, shape and finish. Compare listed dimensions and ask today's price on WhatsApp.",
      url: `${site.url}/dining-sets/`,
    },
    twitter: { card: "summary_large_image", title: "Dining Sets in Nairobi | Home Update", description: "Explore dining sets by size, shape and finish. Compare listed dimensions and ask today's price on WhatsApp." },
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function DiningSetsPage() {
  const items = products.filter((product) => product.category === "dining");
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Dining sets",
    itemListElement: items.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${site.url}${productPath(product)}`,
      item: { "@type": "Product", name: product.name },
    })),
  };
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Dining sets", path: "/dining-sets/" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    <CatalogPage
      eyebrow="Dining sets"
      title="Tables people"
      em="actually gather around."
      blurb="Explore the listed sizes and shapes, compare dimensions and ask us to confirm current options and prices."
      filter="dining"
      basePath="/dining-sets"
    />
    </>
  );
}
