"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Em, SectionLabel, SectionTitle } from "@/components/ui";
import { journalPosts } from "@/data/journal";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const categories = ["All", "Buying Guides", "Small Spaces", "Fabric & Care", "Hosting", "Colour & Curtains"] as const;

export function JournalPageClient() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return journalPosts;
    return journalPosts.filter((post) => {
      const key = post.category ?? "Buying Guides";
      const normalized = key === "Small Spaces" ? "Small Spaces" : key === "Fabric & Care" ? "Fabric & Care" : key === "Hosting" ? "Hosting" : key === "Colour & Curtains" ? "Colour & Curtains" : "Buying Guides";
      return normalized === activeCategory;
    });
  }, [activeCategory]);

  const featured = journalPosts.find((post) => post.slug === "balcony-is-a-room") ?? journalPosts[0];

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

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`min-h-10 rounded-full border px-3 text-sm transition ${activeCategory === category ? "border-antique-gold bg-antique-gold/10 text-champagne" : "border-white/10 bg-espresso text-muted hover:border-antique-gold/40 hover:text-ivory"}`}
            >
              {category}
            </button>
          ))}
        </div>

        {featured && (
          <article className="mt-8 overflow-hidden rounded-[1.5rem] border border-white/10 bg-espresso shadow-2xl">
            <div className="grid gap-0 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="relative min-h-[260px]">
                <Image src={featured.image} alt={featured.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" priority />
              </div>
              <div className="flex flex-col justify-center p-6 lg:p-8">
                <p className="text-[11px] tracking-[0.2em] text-antique-gold uppercase">Featured story</p>
                <h2 className="mt-3 font-serif text-3xl text-ivory lg:text-4xl">{featured.title}</h2>
                <p className="mt-3 text-sm text-muted">{featured.excerpt}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-wide text-muted">
                  <span>{featured.minutes} min read</span>
                  <span>•</span>
                  <span>{featured.publishedAt ?? "Updated recently"}</span>
                </div>
                <Link href={`/journal/${featured.slug}/`} className="mt-6 inline-flex min-h-11 w-fit items-center rounded-full bg-champagne px-4 text-sm font-medium text-onyx">Read article →</Link>
              </div>
            </div>
          </article>
        )}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
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
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-antique-gold/40 bg-antique-gold/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-champagne">{post.category ?? "Buying Guides"}</span>
                  <span className="text-[11px] text-muted">{post.minutes} min</span>
                </div>
                <h2 className="mt-3 font-serif text-xl leading-snug text-ivory group-hover:text-champagne">{post.title}</h2>
                <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
                <p className="mt-4 text-sm font-medium text-champagne">Read article →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
