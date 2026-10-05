import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductSEOPage } from "@/components/ProductSEOPage";
import { products } from "@/data/products";
import { getCatalogProducts } from "@/lib/catalog-store";
import { productMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const product = (await getCatalogProducts()).find((p) => p.category === category && p.slug === slug);
  return product ? productMetadata(product) : { title: "Shop | Home Update", robots: { index: false, follow: true } };
}

export default async function ShopProductPage({ params }: Props) {
  const { category, slug } = await params;
  const product = (await getCatalogProducts()).find((p) => p.category === category && p.slug === slug);
  if (!product) notFound();
  return <ProductSEOPage product={product} />;
}
