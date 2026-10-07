import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductSEOPage } from "@/components/ProductSEOPage";
import { getCatalogProducts } from "@/lib/catalog-store";
import { productMetadata } from "@/lib/seo";

const productByRoute: Record<string, string> = {
  "nesting-coffee-tables-small-apartments": "nest-coffee-table",
  "vale-fluted-oval-coffee-table": "vale-coffee-table",
};
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(productByRoute).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = (await getCatalogProducts()).find((item) => item.id === productByRoute[slug]);
  if (!product) return { title: "Coffee tables in Nairobi | Home Update", robots: { index: false, follow: true } };
  return {
    ...productMetadata(product),
    title: { absolute: "Nesting Coffee Tables for Small Nairobi Apartments" },
    description: "Explore the nesting table concept and confirm individual dimensions, construction, finish, current price and availability with Home Update.",
    alternates: { canonical: "https://homeupdate.co.ke/coffee-tables-nairobi/nesting-coffee-tables-small-apartments/" },
    robots: { index: false, follow: true },
  };
}

export default async function CoffeeTableProductPage({ params }: Props) {
  const { slug } = await params;
  const product = (await getCatalogProducts()).find((item) => item.id === productByRoute[slug]);
  if (!product) notFound();
  return <ProductSEOPage product={product} />;
}
