import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogPage } from "@/components/CatalogPage";
import { ProductSEOPage } from "@/components/ProductSEOPage";
import { getCatalogProducts } from "@/lib/catalog-store";
import { productMetadata, productPath } from "@/lib/seo";
import { site } from "@/lib/site";

const productSlugs: Record<string, string> = {
  "the-cloud-curved-l-shaped-sofa": "cloud",
  "the-truffle-modular-sectional": "truffle",
  "the-linen-l-shaped-sofa": "linen",
};

const collections = {
  "l-shaped-sofas": { title: "L-Shaped Sofas in Nairobi | Home Update", description: "Explore L-shaped sofas by dimensions and configuration. Check room fit and ask today's price on WhatsApp.", filter: (id: string) => ["cloud", "linen"].includes(id) },
  "modular-sectional-sofas": { title: "Modular Sectional Sofas in Nairobi | Home Update", description: "Compare modular sofa dimensions and layouts. Ask Home Update to confirm configuration and today's price.", filter: (id: string) => id === "truffle" },
  "sofas-with-chaise": { title: "Sofas with Chaise in Nairobi | Home Update", description: "Explore chaise sofa layouts and check how they fit your room. Ask for options and today's price on WhatsApp.", filter: (id: string) => ["cloud", "linen"].includes(id) },
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
  const catalog = await getCatalogProducts();
  const product = catalog.find((item) => item.id === productSlugs[slug] || item.category === "sofa" && item.slug === slug);
  if (product) return filtered ? { ...productMetadata(product), robots: { index: false, follow: true } } : productMetadata(product);
  const collection = collections[slug as keyof typeof collections];
  if (!collection) return { title: "Sofas | Home Update", robots: { index: false, follow: true } };
  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `${site.url}/sofas/${slug}/`, languages: { "en-KE": `${site.url}/sofas/${slug}/` } },
    openGraph: { title: collection.title, description: collection.description, url: `${site.url}/sofas/${slug}/` },
    twitter: { card: "summary_large_image", title: collection.title, description: collection.description },
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function SofaSubpage({ params }: Props) {
  const { slug } = await params;
  const catalog = await getCatalogProducts();
  const product = catalog.find((item) => item.id === productSlugs[slug] || item.category === "sofa" && item.slug === slug);
  if (product) return <ProductSEOPage product={product} />;
  const collection = collections[slug as keyof typeof collections];
  if (!collection) notFound();
  const ids = catalog.filter((item) => item.category === "sofa" && collection.filter(item.id)).map((item) => item.id);
  const url = `${site.url}/sofas/${slug}/`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Sofas", item: `${site.url}/sofas/` },
        { "@type": "ListItem", position: 3, name: slug.replaceAll("-", " "), item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: slug.replaceAll("-", " "),
      itemListElement: ids.map((id, index) => {
        const product = catalog.find((item) => item.id === id)!;
        return { "@type": "ListItem", position: index + 1, url: `${site.url}${productPath(product)}`, item: { "@type": "Product", name: product.name } };
      }),
    },
  ];
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <CatalogPage
      eyebrow="Sofas"
      title={slug.replaceAll("-", " ")}
      em="compare size and layout."
      blurb={collection.description}
      filter="sofa"
      basePath={`/sofas/${slug}`}
      productIds={ids}
    />
    </>
  );
}
