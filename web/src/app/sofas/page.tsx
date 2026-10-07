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
  title: "Sofas in Nairobi | L-Shaped, Modular & Curved",
  description:
    "Explore curved, L-shaped and modular sofas. Compare listed dimensions, check room fit and ask today's price on WhatsApp.",
    alternates: { canonical: `${site.url}/sofas/`, languages: { "en-KE": `${site.url}/sofas/` } },
    openGraph: {
      title: "Sofas in Nairobi | L-Shaped, Modular & Curved | Home Update",
      description: "Explore curved, L-shaped and modular sofas. Compare listed dimensions, check room fit and ask today's price on WhatsApp.",
      url: `${site.url}/sofas/`,
    },
    twitter: { card: "summary_large_image", title: "Sofas in Nairobi | Home Update", description: "Explore curved, L-shaped and modular sofas. Compare listed dimensions, check room fit and ask today's price on WhatsApp." },
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
  };
}

export default function SofasPage() {
  const items = products.filter((product) => product.category === "sofa");
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Sofas",
    itemListElement: items.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${site.url}${productPath(product)}`,
      item: { "@type": "Product", name: product.name },
    })),
  };
  return (
    <>
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Sofas", path: "/sofas-nairobi/" }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
    <CatalogPage
      eyebrow="Sofas"
      title="Sofas that make people"
      em="stay."
      blurb="Curved sectionals, long L-shapes and quiet lounge pieces — sized for the rooms you already have."
      filter="sofa"
      basePath="/sofas"
    />
    </>
  );
}
