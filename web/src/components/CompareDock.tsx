"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { buildWhatsAppMessage, whatsappHref } from "@/lib/whatsapp";
import { products, readStoredIds, STORAGE_KEYS, writeStoredIds } from "@/lib/site";
import { useStoredRoom } from "@/lib/use-storage";
import { track } from "@/lib/analytics";

export function CompareDock() {
  const [compared, setCompared] = useState<string[]>([]);
  const [savedCount, setSavedCount] = useState(0);
  const room = useStoredRoom();

  useEffect(() => {
    const sync = () => {
      setCompared(readStoredIds(STORAGE_KEYS.compare));
      setSavedCount(readStoredIds(STORAGE_KEYS.shortlist).length);
    };
    sync();
    window.addEventListener("home-update-storage", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("home-update-storage", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const chosen = useMemo(
    () => products.filter((product) => compared.includes(product.id)),
    [compared],
  );

  const compareMessage = useMemo(() => buildWhatsAppMessage({ compare: chosen, room }), [chosen, room]);

  if (compared.length === 0) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-antique-gold/30 bg-espresso/95 px-4 py-3 backdrop-blur md:px-8"
      role="region"
      aria-label="Compare dock"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          {chosen.map((product) => (
            <div
              key={product.id}
              className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10 bg-onyx"
            >
              <Image src={product.images[0]} alt="" fill className="object-cover" sizes="48px" />
            </div>
          ))}
          <span className="hidden text-sm text-ivory sm:inline">{chosen.length} selected</span>
        </div>
        <div className="flex items-center gap-2">
          {savedCount > 0 && (
            <Link
              href="/shortlist/"
              className="hidden min-h-11 items-center rounded-full border border-white/12 px-3 text-sm text-ivory/80 md:inline-flex"
            >
              Shortlist ({savedCount})
            </Link>
          )}
          <a
            href={whatsappHref(compareMessage)}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => track("whatsapp_click", { value: "compare-dock", ctaLocation: "compare-dock", linkUrl: whatsappHref(compareMessage) })}
            className="inline-flex min-h-11 items-center rounded-full bg-wa px-3 text-sm font-medium text-white"
          >
            Ask on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              writeStoredIds(STORAGE_KEYS.compare, []);
              setCompared([]);
            }}
            className="min-h-11 rounded-full border border-white/12 px-3 text-sm text-ivory/80"
          >
            Clear
          </button>
          <Link
            href="/compare/"
            className="inline-flex min-h-11 items-center rounded-full bg-champagne px-4 text-sm font-medium text-onyx"
          >
            Compare ({chosen.length})
          </Link>
        </div>
      </div>
    </div>
  );
}
