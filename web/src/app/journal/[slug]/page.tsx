import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { WaButton } from "@/components/ui";
import { journalPosts, getPost } from "@/data/journal";
import { products, site } from "@/lib/site";
import { productPath } from "@/lib/seo";
import { buildJournalProductInquiryMessage, whatsappHref } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Journal" };

  const url = `${site.url}/journal/${post.slug}/`;
  return {
    title: `${post.title} | Home Update`,
    description: post.excerpt,
    alternates: { canonical: url, languages: { "en-KE": url } },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = products.filter((p) => post.relatedProducts.includes(p.id));
  const url = `${site.url}/journal/${post.slug}/`;
  const featuredProduct = related[0] ?? products[0];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      image: [`${site.url}${post.image}`],
      datePublished: post.publishedAt ?? "2024-01-01",
      dateModified: post.publishedAt ?? "2024-01-01",
      author: { "@type": "Organization", name: "Home Update Furniture" },
      publisher: { "@type": "Organization", name: "Home Update Furniture", logo: { "@type": "ImageObject", url: `${site.url}/images/logo.jpeg` } },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Journal", item: `${site.url}/journal/` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: post.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  const articleMessage = buildJournalProductInquiryMessage({ articleTitle: post.title, productName: featuredProduct.name, roomType: "Living Room", length: 4, width: 3 });

  return (
    <article className="mx-auto max-w-5xl px-5 py-16 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] tracking-[0.2em] text-antique-gold uppercase">{post.minutes} min read</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-ivory md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-ivory/85">{post.intro}</p>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.12em] text-muted">
          <span>{post.category ?? "Buying Guides"}</span>
          <span>•</span>
          <span>{post.publishedAt ?? "Updated recently"}</span>
          <span>•</span>
          <span>Home Update Furniture</span>
        </div>

        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[1.35rem]">
          <Image src={post.image} alt={post.title} fill className="object-cover" sizes="768px" priority />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="mx-auto max-w-3xl lg:mx-0">
          {post.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="font-serif text-2xl text-champagne md:text-3xl">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <div className="mt-12 rounded-[1.35rem] border border-antique-gold/40 bg-espresso p-5">
            <p className="text-[11px] tracking-[0.2em] text-antique-gold uppercase">5-minute action plan</p>
            <ul className="mt-4 space-y-3 text-sm text-ivory/90">
              <li>1. Measure your room length and width before shopping.</li>
              <li>2. Leave 90 cm of walking space around tables and sofas.</li>
              <li>3. Pick a fabric and finish that matches your real day-to-day use.</li>
              <li>4. Ask for a sample or room-fit recommendation before buying.</li>
            </ul>
          </div>

          {post.faq.length > 0 && (
            <section className="mt-12 rounded-[1.35rem] border border-white/10 bg-espresso p-6">
              <h2 className="font-serif text-2xl text-ivory">Questions we get asked</h2>
              <div className="mt-4 space-y-5">
                {post.faq.map((item) => (
                  <div key={item.q}>
                    <h3 className="text-base font-medium text-champagne">{item.q}</h3>
                    <p className="mt-1.5 text-base text-muted">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:pt-6">
          <div className="sticky top-24 space-y-5">
            <div className="rounded-[1.35rem] border border-white/10 bg-espresso p-4">
              <p className="text-[11px] tracking-[0.2em] text-antique-gold uppercase">Featured in this article</p>
              {featuredProduct && (
                <div className="mt-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image src={featuredProduct.images[0] ?? post.image} alt={featuredProduct.name} fill className="object-cover" sizes="260px" />
                  </div>
                  <h3 className="mt-3 font-serif text-2xl text-ivory">{featuredProduct.name}</h3>
                  <p className="mt-1 text-sm text-muted">{featuredProduct.subtype}</p>
                  <p className="mt-2 text-lg text-champagne">{featuredProduct.priceFrom ? `KES ${featuredProduct.priceFrom.toLocaleString("en-KE")}` : "Ask for today’s price"}</p>
                  <a href={whatsappHref(articleMessage)} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-wa px-4 text-sm font-medium text-white">Order on WhatsApp</a>
                </div>
              )}
            </div>

            <div className="rounded-[1.35rem] border border-white/10 bg-espresso p-4">
              <p className="text-[11px] tracking-[0.2em] text-antique-gold uppercase">Free guide</p>
              <h3 className="mt-2 font-serif text-2xl text-ivory">Get our fabric & size guide</h3>
              <div className="mt-3 flex gap-2">
                <input aria-label="WhatsApp lead capture" type="text" placeholder="Your phone number" className="min-h-11 flex-1 border border-white/10 bg-onyx px-3 text-sm text-ivory placeholder:text-muted" />
                <a href={whatsappHref(`Hi Home Update, I'd like the free fabric and size guide for ${post.title}.`)} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full bg-wa px-3 text-sm text-white">Send</a>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl text-ivory">Related reading</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {related.slice(0, 3).map((product) => (
              <Link key={product.id} href={productPath(product)} className="rounded-[1.1rem] border border-white/10 bg-espresso p-4 transition hover:border-antique-gold/40">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="240px" />
                </div>
                <h3 className="mt-3 font-serif text-xl text-ivory">{product.name}</h3>
                <p className="mt-1 text-sm text-muted">{product.subtype}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <WaButton className="mt-10" message={`Hi Home Update, I read "${post.title}" and I'd like help choosing.`}>Talk through this idea</WaButton>
    </article>
  );
}
