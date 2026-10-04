import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogPage } from "@/components/CatalogPage";
import { ProductSEOPage } from "@/components/ProductSEOPage";
import { products } from "@/data/products";
import { productMetadata, productPath } from "@/lib/seo";
import { site } from "@/lib/site";

const productSlugs: Record<string, string> = {
  "the-fluted-6-seater-dining-set": "fluted",
  "the-orbit-4-seater-round-dining-set": "orbit",
  "the-ivory-dining-set": "ivory",
  "the-regent-dining-set": "regent",
};

const collections = {
  "4-seater-round-dining-tables": { title: "4-Seater Round Dining Tables in Nairobi | Home Update", description: "Explore compact four-seat dining sets. Check dimensions and ask today's price on WhatsApp.", filter: (id: string) => ["orbit", "ivory"].includes(id) },
  "6-seater-dining-tables": { title: "6-Seater Dining Tables in Nairobi | Home Update", description: "Compare six-seat dining sets by dimensions and finish. Ask Home Update for today's price on WhatsApp.", filter: (id: string) => id === "fluted" },
  "8-seater-dining-tables": { title: "8-Seater Dining Tables in Nairobi | Home Update", description: "Explore eight-seat dining sets and check room fit. Ask for today's price and lead time on WhatsApp.", filter: (id: string) => id === "regent" },
};

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return [...Object.keys(productSlugs), ...Object.keys(collections)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filtered = Object.keys(await searchParams).length > 0;
  const product = products.find((item) => item.id === productSlugs[slug]);
  if (product) return filtered ? { ...productMetadata(product), robots: { index: false, follow: true } } : productMetadata(product);
  const collection = collections[slug as keyof typeof collections];
  if (!collection) return { title: "Dining sets | Home Update", robots: { index: false, follow: true } };
  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `${site.url}/dining-sets/${slug}/`, languages: { "en-KE": `${site.url}/dining-sets/${slug}/` } },
    openGraph: { title: collection.title, description: collection.description, url: `${site.url}/dining-sets/${slug}/` },
    twitter: { card: "summary_large_image", title: collection.title, description: collection.description },
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function DiningSubpage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.id === productSlugs[slug]);
  if (product) return <ProductSEOPage product={product} />;
  const collection = collections[slug as keyof typeof collections];
  if (!collection) notFound();
  const ids = products.filter((item) => item.category === "dining" && collection.filter(item.id)).map((item) => item.id);
  const url = `${site.url}/dining-sets/${slug}/`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Dining sets", item: `${site.url}/dining-sets/` },
        { "@type": "ListItem", position: 3, name: slug.replaceAll("-", " "), item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: slug.replaceAll("-", " "),
      itemListElement: ids.map((id, index) => {
        const product = products.find((item) => item.id === id)!;
        return { "@type": "ListItem", position: index + 1, url: `${site.url}${productPath(product)}`, item: { "@type": "Product", name: product.name } };
      }),
    },
  ];
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <CatalogPage
      eyebrow="Dining sets"
      title={slug.replaceAll("-", " ")}
      em="compare size and shape."
      blurb={collection.description}
      filter="dining"
      basePath={`/dining-sets/${slug}`}
      productIds={ids}
    />
    </>
  );
}
