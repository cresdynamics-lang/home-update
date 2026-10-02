"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { RoomFitSimulator } from "@/components/RoomFitSimulator";
import { track } from "@/lib/analytics";
import type { Product } from "@/data/products";
import { products as allProducts } from "@/data/products";
import {
  fabricCompareOrder,
  fabricInfo,
  leadTimeLabel,
  priceLabel,
  STORAGE_KEYS,
  writeStoredIds,
} from "@/lib/site";
import { useStoredIds, useStoredRoom } from "@/lib/use-storage";
import { buildWhatsAppMessage, whatsappHref } from "@/lib/whatsapp";

type Row = {
  label: string;
  get: (p: Product) => string;
  /** Higher is better when this is set, so we can highlight the best cell. */
  better?: "high" | "low";
  numeric?: (p: Product) => number;
};

const ROWS: Row[] = [
  { label: "Type", get: (p) => p.subtype },
  { label: "Price / from", get: (p) => priceLabel(p), better: "low", numeric: (p) => p.priceFrom ?? Number.MAX_SAFE_INTEGER },
  {
    label: "Dimensions",
    get: (p) => `${p.dimensions.w} × ${p.dimensions.d} × ${p.dimensions.h} cm`,
  },
  { label: "Seats", get: (p) => (p.seats ? `${p.seats}` : "Modular"), better: "high", numeric: (p) => p.seats ?? 0 },
  {
    label: "Footprint",
    get: (p) => `${p.dimensions.w * p.dimensions.d} cm² of floor`,
    better: "low",
    numeric: (p) => p.dimensions.w * p.dimensions.d,
  },
  {
    label: "Clearance needed",
    get: (p) => `${p.clearance?.corridorCm ?? 90} cm walkway`,
    better: "low",
    numeric: (p) => p.clearance?.corridorCm ?? 90,
  },
  { label: "Minimum room", get: (p) => `${p.minRoom.w} × ${p.minRoom.d} m` },
  { label: "Layouts", get: (p) => p.layoutOptions.join(", ") },
  { label: "Fabrics", get: (p) => p.fabrics.join(", ") },
  { label: "Colours", get: (p) => p.colours.join(", ") },
  { label: "Timber finishes", get: (p) => p.woodFinishes.join(", ") },
  {
    label: "Water-resistant",
    get: (p) => (p.resilience?.waterResistant ? "Yes*" : "No"),
    better: "high",
    numeric: (p) => (p.resilience?.waterResistant ? 1 : 0),
  },
  { label: "Kid friendly", get: (p) => (p.resilience?.kidFriendly ? "Yes" : "Caution") },
  { label: "Pet friendly", get: (p) => (p.resilience?.petFriendly ? "Yes" : "Caution") },
  { label: "Wipe-clean", get: (p) => (p.resilience?.wipeClean ? "Yes" : "No") },
  {
    label: "Lead time",
    get: (p) => leadTimeLabel(p.leadTimeDays),
    better: "low",
    numeric: (p) => (typeof p.leadTimeDays === "string" ? 999 : p.leadTimeDays.max),
  },
  { label: "Warranty", get: (p) => p.warranty },
  { label: "Best for", get: (p) => p.bestFor },
];

export function ComparisonMatrix() {
  const [diffOnly, setDiffOnly] = useState(false);
  const ids = useStoredIds(STORAGE_KEYS.compare);
  const room = useStoredRoom();

  const selected = useMemo(
    () => allProducts.filter((p) => ids.includes(p.id)).slice(0, 3),
    [ids],
  );

  const visibleRows = useMemo(() => {
    if (!diffOnly || selected.length < 2) return ROWS;
    return ROWS.filter((row) => {
      const values = selected.map((p) => row.get(p));
      return new Set(values).size > 1;
    });
  }, [diffOnly, selected]);

  const bestIdsFor = (row: Row) => {
    if (!row.better || !row.numeric || selected.length < 2) return new Set<string>();
    const values = selected.map((p) => ({ id: p.id, n: row.numeric!(p) }));
    const target =
      row.better === "high"
        ? Math.max(...values.map((v) => v.n))
        : Math.min(...values.map((v) => v.n));
    // Only highlight when there is a genuine winner.
    if (values.every((v) => v.n === target)) return new Set();
    return new Set(values.filter((v) => v.n === target).map((v) => v.id));
  };

  const fitVerdict = (p: Product) => {
    if (!room) return null;
    const pass = room.lengthM >= p.minRoom.w && room.widthM >= p.minRoom.d;
    return pass;
  };

  if (selected.length === 0) {
    return (
      <div className="mx-auto max-w-5xl rounded-[1.35rem] border border-white/10 bg-espresso p-8 text-center">
        <p className="text-ivory/90">No comparison saved yet.</p>
        <p className="mt-2 text-sm text-muted">
          Tick “Compare” on up to three pieces and they will appear here.
        </p>
        <Link
          href="/dining-sets"
          className="mt-6 inline-flex min-h-11 items-center rounded-full bg-champagne px-5 py-2.5 text-sm font-medium text-onyx"
        >
          Browse dining sets
        </Link>
      </div>
    );
  }

  const waHref = whatsappHref(buildWhatsAppMessage({ compare: selected, room }));

  const remove = (id: string) => {
    const next = ids.filter((i) => i !== id);
    writeStoredIds(STORAGE_KEYS.compare, next);
  };

  const fabsPresent = Array.from(
    new Set(selected.flatMap((p) => p.fabrics.map((f) => f))),
  ).filter((f) => fabricCompareOrder.includes(f) || Boolean(fabricInfo[f]));

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={diffOnly}
            onClick={() => setDiffOnly((v) => !v)}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm ${
              diffOnly ? "border-champagne bg-champagne/12 text-champagne" : "border-white/12 text-ivory/85"
            }`}
          >
            Show differences only
          </button>
          <span className="inline-flex min-h-11 items-center rounded-full border border-white/12 px-4 py-2 text-sm text-muted">
            {selected.length} of 3 selected
          </span>
        </div>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { value: "comparison" })}
          className="inline-flex min-h-11 items-center rounded-full bg-wa px-5 py-2.5 text-sm font-medium text-white"
        >
          Send comparison on WhatsApp
        </a>
      </div>

      {/* Sticky label column on mobile, columns on desktop */}
      <div className="scrollbar-thin overflow-x-auto">
        <div
          className="grid min-w-[640px] gap-3"
          style={{ gridTemplateColumns: `150px repeat(${selected.length}, minmax(180px, 1fr))` }}
        >
          {/* Header row */}
          <div className="sticky left-0 z-10 rounded-xl bg-espresso p-3 text-[11px] tracking-wide text-muted uppercase">
            Item
          </div>
          {selected.map((product) => (
            <div key={product.id} className="relative rounded-xl border border-white/10 bg-espresso p-3">
              <button
                type="button"
                onClick={() => remove(product.id)}
                aria-label={`Remove ${product.name} from comparison`}
                className="absolute top-2 right-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-onyx/80 text-ivory"
              >
                ×
              </button>
              <div className="relative h-28 overflow-hidden rounded-lg">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </div>
              <h2 className="mt-3 pr-6 font-serif text-xl text-ivory">{product.name}</h2>
              <p className="mt-0.5 text-[10px] tracking-[0.16em] text-muted uppercase">{product.subtype}</p>
              <Link
                href={`/products/${product.slug}`}
                className="mt-2 inline-block text-xs text-champagne hover:underline"
              >
                View piece →
              </Link>
            </div>
          ))}

          {/* Fit check row */}
          {room && (
            <>
              <div className="sticky left-0 z-10 rounded-xl bg-onyx p-3 text-sm text-muted">
                Fits your room
              </div>
              {selected.map((product) => {
                const pass = fitVerdict(product);
                return (
                  <div
                    key={`fit-${product.id}`}
                    className="rounded-xl border border-white/10 bg-espresso p-3 text-sm"
                  >
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                        pass ? "bg-green-500/12 text-green-300" : "bg-red-500/12 text-red-200"
                      }`}
                    >
                      <span aria-hidden>{pass ? "✓" : "✕"}</span>
                      {pass ? "Fits" : "Too big"}
                    </span>
                    <p className="mt-1.5 text-xs text-muted">
                      Needs {product.minRoom.w} × {product.minRoom.d} m
                    </p>
                  </div>
                );
              })}
            </>
          )}

          {/* Data rows */}
          {visibleRows.map((row) => {
            const best = bestIdsFor(row);
            return [
              <div
                key={`label-${row.label}`}
                className="sticky left-0 z-10 rounded-xl bg-onyx p-3 text-sm text-muted"
              >
                {row.label}
              </div>,
              ...selected.map((product) => (
                <div
                  key={`${product.id}-${row.label}`}
                  className={`rounded-xl border p-3 text-sm ${
                    best.has(product.id)
                      ? "border-champagne/50 bg-champagne/8 text-champagne"
                      : "border-white/10 bg-espresso text-ivory/90"
                  }`}
                >
                  {row.get(product)}
                  {best.has(product.id) && (
                    <span className="ml-2 text-[10px] uppercase opacity-80">best</span>
                  )}
                </div>
              )),
            ];
          })}
        </div>
      </div>

      <p className="text-xs text-muted">
        * Water-resistant claims apply to covered balconies. Values are confirmed on WhatsApp.
      </p>

      {room && selected.length > 1 && (
        <section aria-label="Footprint overlay">
          <h3 className="font-serif text-2xl text-ivory">Footprint overlay</h3>
          <p className="mt-1 text-sm text-muted">
            Your {room.lengthM} × {room.widthM} m room with each piece drawn to scale.
          </p>
          <div className="mt-4">
            <RoomFitSimulator product={selected[0]} others={selected.slice(1)} />
          </div>
        </section>
      )}

      {fabsPresent.length > 0 && (
        <section aria-label="Fabric comparison">
          <h3 className="font-serif text-2xl text-ivory">How the fabrics compare</h3>
          <div className="scrollbar-thin mt-4 overflow-x-auto">
            <table className="min-w-[620px] w-full border-collapse text-sm">
              <thead>
                <tr className="text-left text-[11px] tracking-wide text-muted uppercase">
                  <th className="rounded-l-xl bg-onyx p-3">Fabric</th>
                  {fabsPresent.map((f) => (
                    <th key={f} className="bg-onyx p-3 text-ivory/85">
                      {f}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(["feel", "kids", "pets", "water", "care"] as const).map((field) => (
                  <tr key={field}>
                    <td className="bg-onyx p-3 capitalize text-muted">{field}</td>
                    {fabsPresent.map((f) => {
                      const info = fabricInfo[f];
                      return (
                        <td key={`${f}-${field}`} className="bg-espresso p-3 text-ivory/90">
                          {info ? (info[field] as string) : "—"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td className="bg-onyx p-3 text-muted">Price tier</td>
                  {fabsPresent.map((f) => (
                    <td key={`${f}-tier`} className="bg-espresso p-3 text-ivory/90">
                      {fabricInfo[f] ? "$".repeat(fabricInfo[f].priceTier) : "—"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted">
            Real prices per fabric are confirmed on WhatsApp.
          </p>
        </section>
      )}
    </div>
  );
}
