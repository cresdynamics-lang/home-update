import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductSEOPage } from "@/components/ProductSEOPage";
import { getCatalogProducts } from "@/lib/catalog-store";
import { productMetadata } from "@/lib/seo";

const productByRoute: Record<string, string> = {
  "custom-tv-stand-cable-management": "metro-tv-stand",
  "arc-low-tv-media-console": "arc-tv-stand",
};
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(productByRoute).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = (await getCatalogProducts()).find((item) => item.id === productByRoute[slug]);
  if (!product) return { title: "TV stands in Nairobi | Home Update", robots: { index: false, follow: true } };
  return {
    ...productMetadata(product),
    title: { absolute: "Custom TV Stand with Cable Management in Nairobi" },
    description: "Explore the current TV console concept and confirm construction, supported load, cable layout, price and availability with Home Update.",
    alternates: { canonical: "https://homeupdate.co.ke/tv-stands-nairobi/custom-tv-stand-cable-management/" },
    robots: { index: false, follow: true },
  };
}

export default async function TvStandProductPage({ params }: Props) {
  const { slug } = await params;
  const product = (await getCatalogProducts()).find((item) => item.id === productByRoute[slug]);
  if (!product) notFound();
  return <ProductSEOPage product={product} />;
}
