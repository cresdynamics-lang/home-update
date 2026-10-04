import { notFound } from "next/navigation";
import { permanentRedirect } from "next/navigation";
import { products } from "@/data/products";
import { productPath } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export default async function LegacyProductRoute({ params }: Props): Promise<never> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  permanentRedirect(productPath(product));
}
