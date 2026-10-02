"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { CloseIcon } from "@/components/icons";
import { track } from "@/lib/analytics";
import type { Product } from "@/data/products";
import { leadTimeLabel, priceLabel, readStoredIds, STORAGE_KEYS, writeStoredIds } from "@/lib/site";
import { useStoredIds } from "@/lib/use-storage";
import { buildWhatsAppMessage, whatsappHref } from "@/lib/whatsapp";

/** Quick-view modal opened from a product card without leaving the listing. */
export function QuickViewModal({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const compareIds = useStoredIds(STORAGE_KEYS.compare);
  const shortlistIds = useStoredIds(STORAGE_KEYS.shortlist);

  const isCompared = compareIds.includes(product.id);
  const isSaved = shortlistIds.includes(product.id);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const toggle = (key: string) => {
    const raw = readStoredIds(key);
    if (key === STORAGE_KEYS.compare && !raw.includes(product.id) && raw.length >= 3) return;
    const next = raw.includes(product.id)
      ? raw.filter((i) => i !== product.id)
      : [...raw, product.id];
    writeStoredIds(key, next);
    if (key === STORAGE_KEYS.compare) {
      track("compare_add", { product: product.name, value: product.slug });
    }
  };

  const waHref = whatsappHref(
    buildWhatsAppMessage({ product, combo: { fabric: product.fabrics[0] } }),
  );

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-onyx/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
      onClick={onClose}
    >
      <div
        className="slide-up max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-[1.5rem] border border-white/10 bg-espresso p-5 sm:rounded-[1.5rem]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-antique-gold uppercase">{product.subtype}</p>
            <h2 className="mt-1 font-serif text-3xl text-ivory">{product.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick view"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-ivory"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="640px"
          />
        </div>

        <p className="mt-4 text-lg font-medium text-champagne">{priceLabel(product)}</p>
        <p className="mt-1 text-sm text-muted">
          {product.dimensions.w} × {product.dimensions.d} × {product.dimensions.h} cm
          {product.seats ? ` · ${product.seats}-seater` : ""} · {leadTimeLabel(product.leadTimeDays)}
        </p>
        <p className="mt-3 text-sm text-ivory/90">{product.bestFor}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { product: product.name })}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-wa px-5 py-3 text-sm font-medium text-white transition hover:bg-wa-dark"
          >
            Ask for today’s price
          </a>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-antique-gold/60 px-5 py-3 text-sm text-ivory transition hover:border-champagne"
          >
            Full details
          </Link>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => toggle(STORAGE_KEYS.compare)}
            aria-pressed={isCompared}
            className={`min-h-11 flex-1 rounded-full border px-4 py-2 text-sm ${
              isCompared ? "border-champagne text-champagne" : "border-white/12 text-ivory/85"
            }`}
          >
            {isCompared ? "In compare" : "Compare"}
          </button>
          <button
            type="button"
            onClick={() => toggle(STORAGE_KEYS.shortlist)}
            aria-pressed={isSaved}
            className={`min-h-11 flex-1 rounded-full border px-4 py-2 text-sm ${
              isSaved ? "border-champagne text-champagne" : "border-white/12 text-ivory/85"
            }`}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
