"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { ARButton } from "@/components/ARButton";
import { Gallery } from "@/components/Gallery";
import { MaterialSwap } from "@/components/MaterialSwap";
import { ProofBadges } from "@/components/ProofBadges";
import { PreloadImages } from "@/components/PreloadImages";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { track, trackMeta } from "@/lib/analytics";
import { comboSummary, nextVariantImages, resolveGallery, type Combo } from "@/lib/image-map";
import { buildWhatsAppMessage, roomPhotoMessage, whatsappHref } from "@/lib/whatsapp";
import type { Product } from "@/data/products";
import {
  leadTimeLabel,
  priceLabel,
  readStoredIds,
  site,
  STORAGE_KEYS,
  writeCombo,
  writeStoredIds,
} from "@/lib/site";
import { useStoredCombo, useStoredIds, useStoredRoom } from "@/lib/use-storage";

// Below the fold on mobile: keep the simulator out of the initial bundle.
const RoomFitSimulator = dynamic(
  () => import("@/components/RoomFitSimulator").then((m) => m.RoomFitSimulator),
  {
    ssr: false,
    loading: () => <div className="h-96 shimmer rounded-[1.35rem]" aria-hidden />,
  },
);

const FinishMatcher = dynamic(
  () => import("@/components/FinishMatcher").then((m) => m.FinishMatcher),
  {
    ssr: false,
    loading: () => <div className="h-64 shimmer rounded-[1.35rem]" aria-hidden />,
  },
);

export function ProductDetailClient({ product: initialProduct }: { product: Product }) {
  const [product, setProduct] = useState(initialProduct);
  const [edited, setEdited] = useState<Combo | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [compareFull, setCompareFull] = useState(false);

  const compareIds = useStoredIds(STORAGE_KEYS.compare);
  const shortlistIds = useStoredIds(STORAGE_KEYS.shortlist);
  const room = useStoredRoom();
  const savedCombo = useStoredCombo(product.id);

  const isCompared = compareIds.includes(product.id);
  const isSaved = shortlistIds.includes(product.id);

  useEffect(() => {
    let active = true;
    fetch("/api/catalog/", { cache: "no-store" })
      .then((response) => response.ok ? response.json() as Promise<Product[]> : null)
      .then((items) => {
        const latest = items?.find((item) => item.id === initialProduct.id);
        if (active && latest) setProduct(latest);
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, [initialProduct.id]);

  useEffect(() => {
    trackMeta("ViewContent", { content_name: product.name, content_category: product.category, content_ids: [product.id], value: product.priceFrom ?? undefined, currency: "KES" });
  }, [product]);

  const defaults = useMemo<Combo>(
    () => ({
      layout: product.layoutOptions[0],
      fabric: product.fabrics[0],
      colour: product.colours[0],
      wood: product.woodFinishes[0],
    }),
    [product],
  );

  const combo = edited ?? savedCombo ?? defaults;

const gallery = useMemo(() => resolveGallery(product, combo), [combo, product]);
  const summary = useMemo(() => comboSummary(product, combo), [combo, product]);

  // Warm the next variants through the optimiser so a swap feels instant.
  const upcoming = useMemo(() => nextVariantImages(product, combo), [combo, product]);

  const onComboChange = (next: Combo) => {
    setEdited(next);
    setGalleryIndex(0);
    writeCombo(product.id, next);
    trackMeta("CustomizeProduct", { content_name: product.name, wood: next.wood, fabric: next.fabric, length: next.layout });
  };

  const waHref = whatsappHref(buildWhatsAppMessage({ product, combo, room }));

  const toggle = (key: string) => {
    const raw = readStoredIds(key);
    if (key === STORAGE_KEYS.compare && !raw.includes(product.id) && raw.length >= 3) {
      setCompareFull(true);
      return;
    }
    const next = raw.includes(product.id) ? raw.filter((i) => i !== product.id) : [...raw, product.id];
    writeStoredIds(key, next);
    if (key === STORAGE_KEYS.shortlist && !raw.includes(product.id)) {
      track("shortlist_add", { product: product.name, itemId: product.id, ctaLocation: "product-detail" });
    }
    if (key === STORAGE_KEYS.compare) {
      setCompareFull(false);
      track("compare_add", { product: product.name, value: product.slug });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pt-10 pb-32 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-8 lg:pt-16 lg:pb-20">
      <div>
        <nav aria-label="Breadcrumb" className="mb-4 text-[11px] tracking-wide text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-champagne">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href={product.category === "dining" ? "/dining-sets-nairobi/" : product.category === "sofa" ? "/sofas-nairobi/" : product.category === "tv-stands" ? "/tv-stands-nairobi/" : "/coffee-tables-nairobi/"}
                className="hover:text-champagne"
              >
                {product.category === "dining" ? "Dining sets" : product.category === "sofa" ? "Sofas" : product.category === "tv-stands" ? "TV Stands" : "Coffee Tables"}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ivory/85">
              {product.name}
            </li>
          </ol>
        </nav>

        <Gallery
          images={gallery}
          alt={product.name}
          label={summary}
          index={galleryIndex}
          onIndexChange={setGalleryIndex}
          priority
        />
        <PreloadImages sources={upcoming} sizes="(max-width: 1024px) 100vw, 60vw" />

        <div className="mt-6">
          <MaterialSwap
            fabrics={product.fabrics}
            colours={product.colours}
            woodFinishes={product.woodFinishes}
            layoutOptions={product.layoutOptions}
            combo={combo}
            summary={summary}
            onChange={onComboChange}
          />
        </div>
      </div>

      <aside className="mt-10 space-y-5 lg:mt-0">
        <div>
          <p className="text-[11px] tracking-[0.22em] text-antique-gold uppercase">{product.subtype}</p>
          <h1 className="mt-2 font-serif text-4xl text-champagne sm:text-5xl">{product.name}</h1>
          <p className="mt-3 text-base text-ivory/85">{product.bestFor}</p>
        </div>

        <div className="rounded-[1.35rem] border border-white/10 bg-espresso p-5">
          <p className="text-2xl font-medium text-champagne">{priceLabel(product)}</p>
          <p className="mt-1 text-sm text-muted">
            {product.dimensions.w} × {product.dimensions.d} × {product.dimensions.h} cm
            {product.seats ? ` · seats ${product.seats}` : ""}
          </p>
          {product.maxTvSize ? <p className="mt-1 text-sm text-muted">TV support: {product.maxTvSize} · Cable management: {product.cableManagement ? "Yes" : "No"}{product.storageDrawers !== undefined ? ` · Drawers: ${product.storageDrawers}` : ""}</p> : null}
          {product.tableShape ? <p className="mt-1 text-sm text-muted">Shape: {product.tableShape} · Top: {product.topMaterial}</p> : null}
          <p className="mt-1 text-sm text-champagne">{leadTimeLabel(product.leadTimeDays)}</p>
          <p className="mt-3 text-sm text-muted">{product.priceNote}</p>

          <div className="mt-4">
            <ProofBadges product={product} />
          </div>
        </div>

        <div className="rounded-[1.35rem] border border-white/10 bg-espresso p-5">
          <p className="text-[11px] tracking-[0.18em] text-antique-gold uppercase">Buying notes</p>
          <dl className="mt-3 space-y-2.5 text-sm">
            <Row label="Room planning estimate" value={`${product.minRoom.w} × ${product.minRoom.d} m; confirm fit for your layout`} />
            <Row label="Walkway guide" value={`About ${product.clearance?.corridorCm ?? 90} cm; confirm the clearance for your layout`} />
            <Row
              label="Lead time"
              value={leadTimeLabel(product.leadTimeDays)}
            />
            <Row label="Warranty" value={product.warranty} />
            <Row label="Care" value="Ask us to confirm the care instructions for the selected materials." />
          </dl>
        </div>

        <ARButton product={product} />

        <div className="flex flex-col gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", {
              product: product.name,
              itemId: product.id,
              fabric: combo.fabric,
              configuration: combo.layout,
              ctaLocation: "product-primary",
              linkUrl: waHref,
            })}
            className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-wa px-5 py-3.5 text-base font-medium text-white transition hover:bg-wa-dark"
          >
            Enquire on WhatsApp
          </a>
          <a
            href={`tel:${site.phoneTel}`}
            onClick={() => track("call_click", { product: product.name, itemId: product.id, linkUrl: `tel:${site.phoneTel}`, ctaLocation: "product" })}
            className="inline-flex min-h-13 w-full items-center justify-center rounded-full border border-antique-gold/60 px-5 py-3.5 text-base text-ivory transition hover:border-champagne"
          >
            Call {site.phoneDisplay}
          </a>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => toggle(STORAGE_KEYS.compare)}
              aria-pressed={isCompared}
              className={`min-h-11 rounded-full border px-4 py-2.5 text-sm ${
                isCompared ? "border-champagne text-champagne" : "border-white/12 text-ivory/85"
              }`}
            >
              {isCompared ? "In compare" : "Compare"}
            </button>
            <button
              type="button"
              onClick={() => toggle(STORAGE_KEYS.shortlist)}
              aria-pressed={isSaved}
              className={`min-h-11 rounded-full border px-4 py-2.5 text-sm ${
                isSaved ? "border-champagne text-champagne" : "border-white/12 text-ivory/85"
              }`}
            >
              {isSaved ? "Saved" : "Save"}
            </button>
          </div>
          {compareFull && (
            <p className="text-sm text-champagne" role="status">
              You can compare up to 3 pieces. Remove one to add this.
            </p>
          )}
        </div>
      </aside>

      <div className="mt-10 lg:col-span-2 lg:mt-16">
        <RoomFitSimulator product={product} />
      </div>

      <div className="mt-6 lg:col-span-2">
        <FinishMatcher
          fabric={combo.fabric}
          colour={combo.colour}
          onUploadPhoto={() => {
            track("whatsapp_click", { product: product.name, itemId: product.id, fabric: combo.fabric, configuration: combo.layout, value: "room-photo", ctaLocation: "room-photo" });
            window.open(
              `https://wa.me/${site.whatsapp}?text=${roomPhotoMessage(room)}`,
              "_blank",
              "noopener,noreferrer",
            );
          }}
        />
      </div>

      <StickyMobileBar message={buildWhatsAppMessage({ product, combo, room })} productName={product.name} />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right text-ivory/90">{value}</dd>
    </div>
  );
}
