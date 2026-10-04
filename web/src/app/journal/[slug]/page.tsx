import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { WaButton } from "@/components/ui";
import { journalPosts, getPost } from "@/data/journal";
import { products, site } from "@/lib/site";
import { productPath } from "@/lib/seo";

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

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      image: [`${site.url}${post.image}`],
      author: { "@type": "Organization", name: site.name },
      publisher: { "@id": `${site.url}/#organization` },
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

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <p className="text-[11px] tracking-[0.2em] text-antique-gold uppercase">{post.minutes} min read</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ivory md:text-5xl">{post.title}</h1>
      <p className="mt-4 text-lg text-ivory/85">{post.intro}</p>

      <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[1.35rem]">
        <Image src={post.image} alt={post.title} fill className="object-cover" sizes="768px" priority />
      </div>

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

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl text-ivory">Pieces mentioned</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {related.map((product) => (
              <Link
                key={product.id}
                href={productPath(product)}
                className="inline-flex min-h-11 items-center rounded-full border border-antique-gold/60 px-4 text-sm text-ivory transition hover:border-champagne"
              >
                {product.name} →
              </Link>
            ))}
          </div>
        </section>
      )}

      <WaButton className="mt-10" message={`Hi Home Update, I read "${post.title}" and I'd like help choosing.`}>
        Talk through this idea
      </WaButton>
    </article>
  );
}
