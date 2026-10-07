import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductSEOPage } from "@/components/ProductSEOPage";
import { CatalogPage } from "@/components/CatalogPage";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { getCatalogProducts } from "@/lib/catalog-store";
import { productMetadata, productPath, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const productsBySlug: Record<string, string> = {
  "cloud-curved-l-shaped-sectional-sofa": "cloud",
  "truffle-modular-sectional-sofa": "truffle",
  "l-shaped-sectional-sofa-nairobi": "linen",
};
const collections = {
  "l-shaped-sofas-nairobi": { title: "L-Shaped Sofas in Nairobi", description: "Compare L-shaped sofas by listed dimensions and configuration. Check room layout and ask the team about current fabric options and price.", ids: ["cloud", "linen"] },
  "modular-sectional-sofas-nairobi": { title: "Modular Sectional Sofas in Nairobi", description: "Explore modular sectional layouts and compare listed footprints. Ask Home Update to confirm available configurations and today's price.", ids: ["truffle"] },
  "sofas-with-chaise-nairobi": { title: "Sofas with Chaise in Nairobi", description: "Compare chaise sofa orientations and listed dimensions for Nairobi living rooms. Share room measurements for personal advice.", ids: ["cloud", "linen"] },
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
  return collection ? pageMetadata(collection.title, collection.description, `/sofas-nairobi/${slug}/`) : { title: "Sofas in Nairobi", robots: { index: false, follow: true } };
}

export default async function SofasNairobiSubpage({ params }: Props) {
  const { slug } = await params;
  const catalog = await getCatalogProducts();
  const product = catalog.find((item) => item.id === productsBySlug[slug]);
  if (product) return <ProductSEOPage product={product} />;
  const collection = collections[slug as keyof typeof collections];
  if (!collection) notFound();
  const items = catalog.filter((item) => collection.ids.includes(item.id));
  const jsonLd = { "@context": "https://schema.org", "@type": "ItemList", name: collection.title, itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, url: `${site.url}${productPath(item)}`, item: { "@type": "Product", name: item.name } })) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Sofas in Nairobi", path: "/sofas-nairobi/" }, { name: collection.title, path: `/sofas-nairobi/${slug}/` }]} /><CatalogPage eyebrow="Sofas · Nairobi" title={collection.title} em="compare current options." blurb={collection.description} filter="sofa" basePath={`/sofas-nairobi/${slug}`} productIds={items.map((item) => item.id)} /></>;
}
