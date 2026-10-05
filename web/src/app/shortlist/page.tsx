"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CloseIcon } from "@/components/icons";
import { track, trackMeta } from "@/lib/analytics";
import { products, leadTimeLabel, priceLabel, STORAGE_KEYS, writeStoredIds } from "@/lib/site";
import { useStoredIds, useStoredRoom } from "@/lib/use-storage";
import { buildWhatsAppMessage, whatsappHref } from "@/lib/whatsapp";
import { productPath } from "@/lib/seo";

export default function ShortlistPage() {
  const ids = useStoredIds(STORAGE_KEYS.shortlist);
  const room = useStoredRoom();
  const [copied, setCopied] = useState(false);

  const selected = products.filter((product) => ids.includes(product.id));

  const remove = (id: string) => {
    const next = ids.filter((i) => i !== id);
    writeStoredIds(STORAGE_KEYS.shortlist, next);
  };

  const message = buildWhatsAppMessage({ compare: selected, room });
  const shareUrl =
    typeof window === "undefined" ? "" : `${window.location.origin}/shortlist?items=${ids.join(",")}`;

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8 lg:py-20">
      <p className="text-[11px] tracking-[0.18em] text-antique-gold uppercase">Shortlist</p>
      <h1 className="mt-2 font-serif text-4xl text-ivory md:text-5xl">Your saved pieces</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Saved on this device. They will still be here after you close the tab.
      </p>

      {selected.length === 0 ? (
        <div className="mt-8 rounded-[1.35rem] border border-white/10 bg-espresso p-8 text-center">
          <p className="text-ivory/90">You have not saved anything yet.</p>
          <p className="mt-2 text-sm text-muted">
            Tap the heart on any piece and it will be waiting here when you come back.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/dining-sets/"
              className="inline-flex min-h-11 items-center rounded-full bg-champagne px-5 text-sm font-medium text-onyx"
            >
              Browse dining sets
            </Link>
            <Link
              href="/sofas/"
              className="inline-flex min-h-11 items-center rounded-full border border-antique-gold/60 px-5 text-sm text-ivory"
            >
              Browse sofas
            </Link>
          </div>
        </div>
      ) : (
        <>
          {room && (
            <p className="mt-6 rounded-xl border border-white/10 bg-espresso px-4 py-3 text-sm text-muted">
              Room size on file: <span className="text-champagne">{room.lengthM} × {room.widthM} m</span>.{" "}
              <Link href="/size-guide/" className="underline">
                Change it
              </Link>
            </p>
          )}

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {selected.map((product) => (
              <li key={product.id} className="rounded-[1.35rem] border border-white/10 bg-espresso p-4">
                <div className="flex gap-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-serif text-xl text-champagne">{product.name}</h2>
                    <p className="mt-0.5 text-[11px] tracking-wide text-muted uppercase">{product.subtype}</p>
                    <p className="mt-2 text-sm text-ivory/85">{priceLabel(product)}</p>
                    <p className="text-xs text-muted">{leadTimeLabel(product.leadTimeDays)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(product.id)}
                    aria-label={`Remove ${product.name} from shortlist`}
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 text-ivory/80"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>
                <Link
                  href={productPath(product)}
                  className="mt-3 inline-block text-sm text-champagne hover:underline"
                >
                  View {product.name} →
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappHref(message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                track("shortlist_send", { value: String(selected.length), ctaLocation: "shortlist" });
                track("whatsapp_click", { value: "shortlist", ctaLocation: "shortlist", linkUrl: whatsappHref(message) });
                trackMeta("InitiateCheckout", {
                  content_ids: selected.map((product) => product.id),
                  content_type: "product",
                  currency: "KES",
                });
              }}
              className="inline-flex min-h-12 items-center rounded-full bg-wa px-5 text-sm font-medium text-white"
            >
              Send my shortlist to WhatsApp
            </a>
            <Link
              href="/compare/"
              className="inline-flex min-h-12 items-center rounded-full border border-antique-gold/60 px-5 text-sm text-ivory"
            >
              Compare saved items
            </Link>
            {shareUrl && (
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard?.writeText(shareUrl).then(() => setCopied(true));
                }}
                className="inline-flex min-h-12 items-center rounded-full border border-white/12 px-5 text-sm text-ivory/85"
              >
                {copied ? "Link copied" : "Copy link to this shortlist"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
