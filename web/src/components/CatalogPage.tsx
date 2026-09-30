import Image from "next/image";
import Link from "next/link";
import { Em, OutlineButton, SectionLabel, SectionTitle, WaButton } from "@/components/ui";
import { formatKes, products } from "@/lib/site";

export function CatalogPage({
  eyebrow,
  title,
  em,
  blurb,
  filter,
}: {
  eyebrow: string;
  title: string;
  em: string;
  blurb: string;
  filter?: "dining" | "sofa" | "all";
}) {
  const items = products.filter((p) => {
    const cat = p.category.toLowerCase();
    if (filter === "dining") return cat.includes("dining");
    if (filter === "sofa")
      return cat.includes("sofa") || cat.includes("sectional") || cat.includes("living");
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <SectionLabel>{eyebrow}</SectionLabel>
      <SectionTitle>
        {title} <Em>{em}</Em>
      </SectionTitle>
      <p className="mt-3 max-w-2xl text-muted">{blurb}</p>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6">
        {items.map((product) => (
          <article
            key={product.slug}
            className="overflow-hidden rounded-[1.35rem] border border-white/8 bg-espresso"
          >
            <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="33vw"
              />
            </Link>
            <div className="p-5">
              <h2 className="font-serif text-2xl text-ivory">{product.name}</h2>
              <p className="mt-1 text-[11px] tracking-[0.16em] text-muted uppercase">
                {product.category}
              </p>
              <p className="mt-4 text-sm text-champagne">{formatKes(product.fromKes)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <WaButton
                  className="!px-4 !py-2.5 text-xs"
                  message={`Hi — I’d like today’s price for ${product.name}.`}
                >
                  Get price
                </WaButton>
                <OutlineButton href={`/products/${product.slug}`} className="!px-4 !py-2.5 text-xs">
                  View details
                </OutlineButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
