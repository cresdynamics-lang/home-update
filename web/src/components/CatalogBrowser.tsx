"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CloseIcon } from "@/components/icons";
import type { Product } from "@/data/products";

const SORTS = [
  { value: "popular", label: "Popular" },
  { value: "price", label: "Price" },
  { value: "newest", label: "Newest" },
] as const;

const FABRICS = ["Oat Bouclé", "Bouclé", "Performance Velvet", "Chenille", "Linen Blend"];
const COLOURS = ["Cream", "Oat", "Sand", "Stone", "Truffle", "Ivory", "Charcoal"];
const WIDTHS = [
  { value: "under-200", label: "Under 200 cm" },
  { value: "200-260", label: "200-260 cm" },
  { value: "over-260", label: "Over 260 cm" },
];

type Props = {
  products: Product[];
  category?: "dining" | "sofa" | "all";
  saleOnly?: boolean;
  basePath: string;
  productIds?: string[];
};

export function CatalogBrowser({ products, category = "all", saleOnly, basePath, productIds }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [view, setView] = useState<"grid" | "list">("grid");
  const [sheetOpen, setSheetOpen] = useState(false);

  const get = (key: string) => searchParams.get(key) ?? "";
  const seats = get("seats");
  const sort = get("sort") || "popular";
  const width = get("width");
  const fabric = get("fabric");
  const colour = get("colour");

  const setParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    const query = params.toString();
    const cleanPath = basePath.endsWith("/") ? basePath : `${basePath}/`;
    router.push(query ? `${cleanPath}?${query}` : cleanPath, { scroll: false });
  };

  useEffect(() => {
    if (!sheetOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sheetOpen]);

  const filtered = useMemo(() => {
    let items = products.filter((product) => {
      if (productIds && !productIds.includes(product.id)) return false;
      if (saleOnly) return Boolean(product.sale);
      if (category === "dining") return product.category === "dining";
      if (category === "sofa") return product.category === "sofa";
      return true;
    });

    if (seats) items = items.filter((p) => p.seats === Number(seats));
    if (width) {
      items = items.filter((p) => {
        const w = p.dimensions.w;
        if (width === "under-200") return w < 200;
        if (width === "200-260") return w >= 200 && w <= 260;
        return w > 260;
      });
    }
    if (fabric) items = items.filter((p) => p.fabrics.includes(fabric));
    if (colour) items = items.filter((p) => p.colours.includes(colour));

    if (sort === "price") {
      items = [...items].sort((a, b) => (a.priceFrom ?? 1e9) - (b.priceFrom ?? 1e9));
    } else if (sort === "newest") {
      items = [...items].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      items = [...items].sort(
        (a, b) => Number(b.bestseller ?? false) - Number(a.bestseller ?? false),
      );
    }
    return items;
  }, [products, category, saleOnly, seats, width, fabric, colour, sort]);

  const activeCount =
    (seats ? 1 : 0) +
    (width ? 1 : 0) +
    (fabric ? 1 : 0) +
    (colour ? 1 : 0);

  const clearAll = () => router.push(basePath.endsWith("/") ? basePath : `${basePath}/`, { scroll: false });

  const FilterControls = (
    <div className="space-y-6">
      <FilterGroup label="Seats">
        <div className="flex flex-wrap gap-2">
          {["4", "5", "6", "8"].map((s) => (
            <Pill
              key={s}
              active={seats === s}
              onClick={() => setParam("seats", seats === s ? null : s)}
            >
              {s}
            </Pill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Width">
        <div className="flex flex-wrap gap-2">
          {WIDTHS.map((w) => (
            <Pill key={w.value} active={width === w.value} onClick={() => setParam("width", width === w.value ? null : w.value)}>
              {w.label}
            </Pill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Fabric">
        <div className="flex flex-wrap gap-2">
          {FABRICS.map((f) => (
            <Pill key={f} active={fabric === f} onClick={() => setParam("fabric", fabric === f ? null : f)}>
              {f}
            </Pill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Colour">
        <div className="flex flex-wrap gap-2">
          {COLOURS.map((c) => (
            <Pill key={c} active={colour === c} onClick={() => setParam("colour", colour === c ? null : c)}>
              {c}
            </Pill>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Features">
        <div className="flex flex-wrap gap-2">
        </div>
      </FilterGroup>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={clearAll}
          className="min-h-11 w-full rounded-full border border-white/12 px-4 py-2 text-sm text-ivory/85"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.35rem] border border-white/10 bg-espresso p-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted">{filtered.length} results</span>
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-antique-gold/60 px-4 py-2 text-sm text-ivory lg:hidden"
          >
            Filters{activeCount > 0 ? ` (${activeCount})` : ""}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 sm:flex" role="tablist" aria-label="Sort">
            {SORTS.map((s) => (
              <button
                key={s.value}
                type="button"
                role="tab"
                aria-selected={sort === s.value}
                onClick={() => setParam("sort", s.value === "popular" ? null : s.value)}
                className={`min-h-11 rounded-full px-3 py-1.5 text-sm ${
                  sort === s.value ? "bg-champagne text-onyx" : "border border-white/10 text-ivory/80"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 rounded-full border border-white/10 p-1">
            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-sm ${
                view === "grid" ? "bg-champagne text-onyx" : "text-ivory/70"
              }`}
            >
              ▦
            </button>
            <button
              type="button"
              aria-label="List view"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-sm ${
                view === "list" ? "bg-champagne text-onyx" : "text-ivory/70"
              }`}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 hidden rounded-[1.35rem] border border-white/10 bg-espresso p-5 lg:block">
        {FilterControls}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-[1.35rem] border border-white/10 bg-espresso p-8 text-center text-muted">
          No pieces match those filters yet.{" "}
          <button type="button" onClick={clearAll} className="text-champagne underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div
          className={`mt-8 grid gap-4 ${
            view === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} view={view} priority={i < 2} />
          ))}
        </div>
      )}

      {sheetOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-end bg-onyx/80 backdrop-blur-sm lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          onClick={() => setSheetOpen(false)}
        >
          <div
            className="slide-up max-h-[85vh] w-full overflow-y-auto rounded-t-[1.5rem] border-t border-white/10 bg-espresso p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-serif text-2xl text-ivory">Filters</h2>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Close filters"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ivory"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            {FilterControls}
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              className="mt-6 min-h-11 w-full rounded-full bg-champagne px-4 py-3 text-sm font-medium text-onyx"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2 text-[10px] tracking-[0.18em] text-antique-gold uppercase">{label}</legend>
      {children}
    </fieldset>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-full border px-3.5 py-2 text-sm transition ${
        active ? "border-champagne bg-champagne/12 text-champagne" : "border-white/12 text-ivory/85"
      }`}
    >
      {children}
    </button>
  );
}
