"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { RoomFitSimulator } from "@/components/RoomFitSimulator";
import { products } from "@/lib/site";

export default function SizeGuidePage() {
  const [active, setActive] = useState(products[1].id);
  const product = products.find((p) => p.id === active) ?? products[0];

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
      <p className="text-[11px] tracking-[0.18em] text-antique-gold uppercase">Size guide</p>
      <h1 className="mt-2 font-serif text-4xl text-ivory md:text-5xl">
        Measure once. <em className="text-champagne italic">Order with confidence.</em>
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Enter your room in metres, pick a piece, and we will draw it to scale with the walkways and
        chair pull-outs you actually need.
      </p>

      <div className="mt-10">
        <RoomFitSimulator product={product} />
      </div>

      <div className="mt-12">
        <h2 className="font-serif text-2xl text-ivory">Try another piece</h2>
        <div className="scrollbar-none mt-4 flex gap-2 overflow-x-auto pb-2">
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              aria-pressed={active === p.id}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm ${
                active === p.id
                  ? "border-champagne bg-champagne/12 text-champagne"
                  : "border-white/12 text-ivory/85"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}