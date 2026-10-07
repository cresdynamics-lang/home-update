import { Suspense } from "react";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { Em, SectionLabel, SectionTitle } from "@/components/ui";
import { products } from "@/lib/site";
import Link from "next/link";

export async function CatalogPage({
  eyebrow,
  title,
  em,
  blurb,
  filter,
  saleOnly,
  basePath,
  productIds,
}: {
  eyebrow: string;
  title: string;
  em: string;
  blurb: string;
  filter?: "dining" | "sofa" | "tv-stands" | "coffee-tables" | "all";
  saleOnly?: boolean;
  basePath: string;
  productIds?: string[];
}) {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <SectionLabel>{eyebrow}</SectionLabel>
      <SectionTitle>
        {title} <Em>{em}</Em>
      </SectionTitle>
      <p className="mt-3 max-w-2xl text-muted">{blurb}</p>

      <nav aria-label="Shop by category" className="mt-6 flex flex-wrap gap-2">
        {[["All", "/furniture-shop-nairobi-kenya/"], ["Dining Sets", "/dining-sets-nairobi/"], ["Sofas", "/sofas-nairobi/"], ["TV Stands", "/tv-stands-nairobi/"], ["Coffee Tables", "/coffee-tables-nairobi/"]].map(([label, href]) => (
          <Link key={href} href={href} className="rounded-full border border-white/15 px-4 py-2 text-sm text-ivory/85 hover:border-champagne hover:text-champagne">{label}</Link>
        ))}
      </nav>

      <Suspense fallback={<div className="mt-10 h-64 shimmer rounded-[1.35rem]" />}>
        <CatalogBrowser
          products={products}
          category={filter ?? "all"}
          saleOnly={saleOnly}
          basePath={basePath}
          productIds={productIds}
            compactProducts={filter === "tv-stands" || filter === "coffee-tables"}
        />
      </Suspense>
    </div>
  );
}
