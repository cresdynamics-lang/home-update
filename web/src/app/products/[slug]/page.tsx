import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { getProductBySlug, ownerTodo, products } from "@/lib/site";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product" };

  const size = `${product.dimensions.w} × ${product.dimensions.d} cm`;
  const seats = product.seats ? `${product.seats}-seater ` : "";
  const title =
    product.category === "dining"
      ? `${seats}${product.subtype.replace(/^\d+-seater\s*/i, "")} ${size} in Nairobi | Home Update`
      : `${product.name} ${size} in Nairobi | Home Update`;

  const description = `${product.name} — ${size}${
    product.seats ? `, seats ${product.seats}` : ""
  }. ${product.bestFor}. Check room fit, choose a fabric and get today's price on WhatsApp.`;

  return {
    title,
    description,
    alternates: { canonical: `${site.url}/products/${product.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${site.url}/products/${product.slug}`,
      images: [{ url: product.images[0], width: 1200, height: 630, alt: product.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const url = `${site.url}/products/${product.slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: `${product.name}, ${product.subtype}, ${product.dimensions.w} x ${product.dimensions.d} x ${product.dimensions.h} cm. ${product.bestFor}.`,
      image: product.images.map((src) => `${site.url}${src}`),
      brand: { "@type": "Brand", name: site.name },
      category: product.category === "dining" ? "Dining tables" : "Sofas",
      material: [...product.fabrics, ...product.woodFinishes].join(", "),
      ...(product.priceFrom
        ? {
            offers: {
              "@type": "Offer",
              price: product.priceFrom,
              priceCurrency: "KES",
              availability: "https://schema.org/InStock",
              url,
              seller: { "@type": "Organization", name: site.name },
            },
          }
        : {
            offers: {
              "@type": "Offer",
              url,
              availability: "https://schema.org/InStock",
              priceCurrency: "KES",
              seller: { "@type": "Organization", name: site.name },
              description: "Ask for today's price on WhatsApp",
            },
          }),
      additionalProperty: [
        { "@type": "PropertyValue", name: "Width", value: `${product.dimensions.w} cm` },
        { "@type": "PropertyValue", name: "Depth", value: `${product.dimensions.d} cm` },
        { "@type": "PropertyValue", name: "Height", value: `${product.dimensions.h} cm` },
        ...(product.seats
          ? [{ "@type": "PropertyValue", name: "Seats", value: `${product.seats}` }]
          : []),
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        {
          "@type": "ListItem",
          position: 2,
          name: product.category === "dining" ? "Dining sets" : "Sofas",
          item: `${site.url}/${product.category === "dining" ? "dining-sets" : "sofas"}`,
        },
        { "@type": "ListItem", position: 3, name: product.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `How long does ${product.name} take to deliver in Nairobi?`,
          acceptedAnswer: {
            "@type": "Answer",
            text:
              typeof product.leadTimeDays === "string"
                ? `${product.name} is made to order. Message us on WhatsApp for a delivery date.`
                : `The listed lead time is ${product.leadTimeDays.min} to ${product.leadTimeDays.max} business days. Confirm the exact date on WhatsApp.`,
          },
        },
        {
          "@type": "Question",
          name: `What is the minimum room size for ${product.name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${product.name} measures ${product.dimensions.w} x ${product.dimensions.d} cm and works best in a room of at least ${product.minRoom.w} x ${product.minRoom.d} m. Use the room simulator on this page to check.`,
          },
        },
        {
          "@type": "Question",
          name: `Can I choose the fabric and colour for ${product.name}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Yes. Available fabrics: ${product.fabrics.join(", ")}. Available colours: ${product.colours.join(", ")}. Send your choice on WhatsApp and we will confirm availability and price.`,
          },
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
      <section className="mx-auto max-w-6xl px-5 pb-24 lg:px-8">
        <div className="rounded-[1.5rem] border border-antique-gold/25 bg-espresso p-6">
          <h2 className="font-serif text-3xl text-ivory">Owner confirmation checklist</h2>
          <p className="mt-2 text-sm text-muted">
            These are still to be confirmed by the owner. They are listed here so no placeholder is
            published as fact.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {ownerTodo.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-champagne" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}