import { Suspense } from "react";
import { CatalogBrowser } from "@/components/CatalogBrowser";
import { Em, SectionLabel, SectionTitle } from "@/components/ui";
import { products } from "@/lib/site";

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
  filter?: "dining" | "sofa" | "all";
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

      <Suspense fallback={<div className="mt-10 h-64 shimmer rounded-[1.35rem]" />}>
        <CatalogBrowser
          products={products}
          category={filter ?? "all"}
          saleOnly={saleOnly}
          basePath={basePath}
          productIds={productIds}
        />
      </Suspense>
    </div>
  );
}
