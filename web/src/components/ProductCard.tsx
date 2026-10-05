"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { QuickViewModal } from "@/components/QuickViewModal";
import { track } from "@/lib/analytics";
import type { Product } from "@/data/products";
import { leadTimeLabel, priceLabel, readStoredIds, STORAGE_KEYS, writeStoredIds } from "@/lib/site";
import { useStoredIds } from "@/lib/use-storage";
import { buildWhatsAppMessage, whatsappHref } from "@/lib/whatsapp";
import { productPath } from "@/lib/seo";

export function ProductCard({
  product,
  view = "grid",
  priority = false,
  compactSquare = false,
}: {
  product: Product;
  view?: "grid" | "list";
  priority?: boolean;
  compactSquare?: boolean;
}) {
  const compareIds = useStoredIds(STORAGE_KEYS.compare);
  const shortlistIds = useStoredIds(STORAGE_KEYS.shortlist);
  const [message, setMessage] = useState("");
  const [quickOpen, setQuickOpen] = useState(false);

  const isCompared = compareIds.includes(product.id);
  const isSaved = shortlistIds.includes(product.id);

  const toggleCollection = (key: string, value: string) => {
    const raw = readStoredIds(key);
    if (key === STORAGE_KEYS.compare && !raw.includes(value) && raw.length >= 3) {
      setMessage("You can compare up to 3 pieces at once.");
      return;
    }

    const next = raw.includes(value) ? raw.filter((item) => item !== value) : [...raw, value];
    writeStoredIds(key, next);
    if (key === STORAGE_KEYS.shortlist && !raw.includes(value)) {
      track("shortlist_add", { product: product.name, itemId: product.id, ctaLocation: "product-card" });
    }
    if (key === STORAGE_KEYS.compare) {
      setMessage("");
      track("compare_add", { product: product.name, itemId: product.id, value: product.slug, ctaLocation: "product-card" });
    }
  };

  const timberTone = product.woodFinishes[0] ?? product.colours[0] ?? "Natural Oak";
  const waHref = whatsappHref(buildWhatsAppMessage({ product, combo: { wood: timberTone } }));
  const listView = view === "list";

  return (
    <>
      <article
        className={`group overflow-hidden rounded-lg border ${compactSquare ? "border-antique-gold/40" : "border-white/8"} bg-espresso shadow-lg shadow-onyx/20 ${
          listView ? "sm:flex sm:items-stretch" : ""
        }`}
      >
        <Link
          href={productPath(product)}
          className={`relative block overflow-hidden ${listView ? "sm:w-56 sm:shrink-0" : compactSquare ? "aspect-square" : "aspect-4/5"}`}
        >
          <Image
            src={product.images[0]}
            alt={`${product.name} — ${product.subtype}`}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes={
              listView
                ? "(max-width: 640px) 100vw, 224px"
                : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            }
          />
          {(product.bestseller || product.sale) && (
            <span className="absolute top-3 left-3 rounded-full bg-champagne px-2.5 py-1 text-[10px] font-semibold tracking-wide text-onyx uppercase">
              {product.bestseller ? "Bestseller" : "Sale"}
            </span>
          )}
          {product.conceptPreview ? (
            <span className="absolute right-2 bottom-2 rounded bg-onyx/90 px-2 py-1 text-[9px] font-medium text-champagne">
              Concept preview · photo pending
            </span>
          ) : null}
        </Link>

        <div className={`p-4 sm:p-5 ${listView ? "sm:flex-1" : ""}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-serif text-2xl text-ivory">
                <Link href={productPath(product)} className="hover:text-champagne">
                  {product.name}
                </Link>
              </h2>
              <p className="mt-1 text-[11px] tracking-widest text-muted uppercase">{product.subtype}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <label className="flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border border-white/10 px-2.5 text-[11px] text-ivory/85">
                <input
                  type="checkbox"
                  checked={isCompared}
                  onChange={() => toggleCollection(STORAGE_KEYS.compare, product.id)}
                  aria-label={`Compare ${product.name}`}
                  className="h-4 w-4 accent-champagne"
                />
                Compare
              </label>
              <button
                type="button"
                aria-label={isSaved ? `Remove ${product.name} from shortlist` : `Save ${product.name}`}
                aria-pressed={isSaved}
                onClick={() => toggleCollection(STORAGE_KEYS.shortlist, product.id)}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border text-lg transition ${
                  isSaved
                    ? "border-champagne text-champagne"
                    : "border-white/10 text-ivory/80 hover:border-champagne hover:text-champagne"
                }`}
              >
                {isSaved ? "♥" : "♡"}
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-muted">
            <span>
              {product.dimensions.w} × {product.dimensions.d} cm
            </span>
            {product.seats ? <span>· {product.seats}-seater</span> : null}
            <span className="rounded-full border border-antique-gold/40 px-2.5 py-1 text-champagne">
              {leadTimeLabel(product.leadTimeDays)}
            </span>
          </div>

          <p className="mt-3 line-clamp-2 text-sm text-ivory/85">Best for {product.bestFor}</p>

          <p className="mt-3 text-base font-medium text-champagne">{priceLabel(product)}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { product: product.name, itemId: product.id, ctaLocation: "product-card", linkUrl: waHref })}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-wa px-4 py-2.5 text-sm font-medium text-white transition hover:bg-wa-dark"
            >
              {product.conceptPreview ? "Ask about this concept" : "Enquire"}
            </a>
            <button
              type="button"
              onClick={() => setQuickOpen(true)}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-antique-gold/60 px-4 py-2.5 text-sm text-ivory transition hover:border-champagne"
            >
              Quick view
            </button>
            <Link
              href={productPath(product)}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/12 px-4 py-2.5 text-sm text-ivory/85 transition hover:border-champagne"
            >
              Details
            </Link>
          </div>

          {message ? <p className="mt-3 text-xs text-champagne">{message}</p> : null}
        </div>
      </article>

      <QuickViewModal product={product} open={quickOpen} onClose={() => setQuickOpen(false)} />
    </>
  );
}
