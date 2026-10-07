import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductSEOPage } from "@/components/ProductSEOPage";
import { CatalogPage } from "@/components/CatalogPage";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { getCatalogProducts } from "@/lib/catalog-store";
import { productMetadata, productPath, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const productsBySlug: Record<string, string> = {
  "4-seater-round-dining-set-nairobi": "orbit",
  "6-seater-dining-set-nairobi-apartments": "fluted",
  "ivory-4-seater-dining-set-nairobi": "ivory",
  "regent-8-seater-dining-set-nairobi": "regent",
};
const collections = {
  "4-seater-round-dining-tables-nairobi": { title: "4-Seater Round Dining Tables in Nairobi", description: "Compare compact four-seat dining tables by shape and dimensions. Ask Home Update to confirm current finish options and pricing.", ids: ["orbit", "ivory"] },
  "6-seater-dining-tables-nairobi": { title: "6-Seater Dining Tables in Nairobi", description: "Review six-seat table dimensions and room clearances for Nairobi apartments. Ask Home Update to confirm today's price and availability.", ids: ["fluted"] },
  "8-seater-dining-tables-nairobi": { title: "8-Seater Dining Tables in Nairobi", description: "Explore larger dining sets and compare their listed dimensions. Confirm seating, delivery access and current price with Home Update.", ids: ["regent"] },
};
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...Object.keys(productsBySlug), ...Object.keys(collections)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const catalog = await getCatalogProducts();
  const product = catalog.find((item) => item.id === productsBySlug[slug]);
  if (product) return productMetadata(product);
  const collection = collections[slug as keyof typeof collections];
  return collection ? pageMetadata(collection.title, collection.description, `/dining-sets-nairobi/${slug}/`) : { title: "Dining sets in Nairobi", robots: { index: false, follow: true } };
}

export default async function DiningSetsNairobiSubpage({ params }: Props) {
  const { slug } = await params;
  const catalog = await getCatalogProducts();
  const product = catalog.find((item) => item.id === productsBySlug[slug]);
  if (product) return <ProductSEOPage product={product} />;
  const collection = collections[slug as keyof typeof collections];
  if (!collection) notFound();
  const items = catalog.filter((item) => collection.ids.includes(item.id));
  const jsonLd = { "@context": "https://schema.org", "@type": "ItemList", name: collection.title, itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, url: `${site.url}${productPath(item)}`, item: { "@type": "Product", name: item.name } })) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Dining sets in Nairobi", path: "/dining-sets-nairobi/" }, { name: collection.title, path: `/dining-sets-nairobi/${slug}/` }]} /><CatalogPage eyebrow="Dining sets · Nairobi" title={collection.title} em="compare current options." blurb={collection.description} filter="dining" basePath={`/dining-sets-nairobi/${slug}`} productIds={items.map((item) => item.id)} /></>;
}
