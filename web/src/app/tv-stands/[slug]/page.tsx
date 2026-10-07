import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductSEOPage } from "@/components/ProductSEOPage";
import { getCatalogProducts } from "@/lib/catalog-store";
import { productMetadata } from "@/lib/seo";

const productByRoute: Record<string, string> = {
  "custom-tv-stand-nairobi-cable-management": "metro-tv-stand",
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(productByRoute).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = (await getCatalogProducts()).find((item) => item.id === productByRoute[slug]);
  if (!product) return { title: "TV stands | Home Update", robots: { index: false, follow: true } };
  return {
    ...productMetadata(product),
    title: "TV Stand Cable Storage Concept in Nairobi",
    description: "Review the listed TV console concept, then confirm construction, supported load, cable layout, price and availability with Home Update.",
    robots: { index: false, follow: true },
  };
}

export default async function TvStandProductAlias({ params }: Props) {
  const { slug } = await params;
  const product = (await getCatalogProducts()).find((item) => item.id === productByRoute[slug]);
  if (!product) notFound();
  return <ProductSEOPage product={product} />;
}
