import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductSEOPage } from "@/components/ProductSEOPage";
import { getCatalogProducts } from "@/lib/catalog-store";
import { productMetadata } from "@/lib/seo";

const productByRoute: Record<string, string> = {
  "fluted-nesting-coffee-table-set": "nest-coffee-table",
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(productByRoute).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = (await getCatalogProducts()).find((item) => item.id === productByRoute[slug]);
  if (!product) return { title: "Coffee tables | Home Update", robots: { index: false, follow: true } };
  return {
    ...productMetadata(product),
    title: "Nesting Coffee Table Concept in Nairobi",
    description: "Explore the listed nesting table concept and confirm individual dimensions, construction, finish, price and availability with Home Update.",
    robots: { index: false, follow: true },
  };
}

export default async function CoffeeTableProductAlias({ params }: Props) {
  const { slug } = await params;
  const product = (await getCatalogProducts()).find((item) => item.id === productByRoute[slug]);
  if (!product) notFound();
  return <ProductSEOPage product={product} />;
}
