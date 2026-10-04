import Image from "next/image";
import Link from "next/link";
import { Em, SectionLabel, SectionTitle } from "@/components/ui";
import { journalPosts } from "@/data/journal";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Furniture Guides for Kenyan Homes | Home Update Journal",
  "Practical guides to dining table sizes, small-space sofas and furniture materials for Kenyan homes.",
  "/journal/",
);

export default function JournalPage() {
  return (
    <>
    <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Journal", path: "/journal/" }]} />
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <SectionLabel>Journal</SectionLabel>
      <SectionTitle>
        Ideas that change how you <Em>see home.</Em>
      </SectionTitle>
      <p className="mt-3 max-w-2xl text-muted">
        Guides on sizing, fabric and fit — for apartments and family homes across Kenya.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {journalPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/journal/${post.slug}/`}
            className="group overflow-hidden rounded-[1.25rem] border border-white/8 bg-espresso transition hover:border-antique-gold/40"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                loading="lazy"
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <div className="p-5">
              <p className="text-[11px] tracking-wide text-muted uppercase">{post.minutes} min read</p>
              <h2 className="mt-2 font-serif text-xl leading-snug text-ivory group-hover:text-champagne">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </>
  );
}
