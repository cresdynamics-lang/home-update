import Image from "next/image";
import { notFound } from "next/navigation";
import { OutlineButton, SectionLabel, WaButton } from "@/components/ui";
import { colours, formatKes, products } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-20">
      <div className="relative min-h-[480px] overflow-hidden rounded-[1.5rem]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="50vw"
          priority
        />
      </div>
      <div>
        <SectionLabel>{product.category}</SectionLabel>
        <h1 className="font-serif text-4xl text-champagne md:text-5xl">{product.name}</h1>
        <p className="mt-4 text-muted">
          Best for {product.bestFor}. Size: {product.size}. Real room photos, custom fabrics, and
          setup included in the conversation.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-ivory/85"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-2">
          {colours.map((c) => (
            <span
              key={c.name}
              title={c.name}
              className="h-5 w-5 rounded-full border border-white/20"
              style={{ background: c.hex }}
            />
          ))}
        </div>
        <p className="mt-8 text-lg tracking-wide text-champagne">{formatKes(product.fromKes)}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <WaButton message={`Hi — I’d like today’s price for ${product.name}.`} pulse>
            Get today’s price
          </WaButton>
          <OutlineButton href="/size-guide">Check size guide</OutlineButton>
        </div>
      </div>
    </div>
  );
}
