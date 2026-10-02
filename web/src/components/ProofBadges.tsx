"use client";

import { useId, useState } from "react";
import type { Product } from "@/data/products";

type BadgeKey = "waterResistant" | "kidFriendly" | "petFriendly" | "wipeClean";

const BADGE_META: Record<BadgeKey, { label: string; note: string }> = {
  waterResistant: {
    label: "Water-resistant",
    note: "Liquid beads on the surface for covered balconies and active homes. *for covered balconies.",
  },
  kidFriendly: {
    label: "Kid friendly",
    note: "Stitches and frames chosen for busy family living. *for covered balconies.",
  },
  petFriendly: {
    label: "Pet friendly",
    note: "Wipe-clean and durable surfaces that tolerate pet hair. *for covered balconies.",
  },
  wipeClean: {
    label: "Wipe-clean",
    note: "Spills lift with a damp cloth. *for covered balconies.",
  },
};

const ORDER: BadgeKey[] = ["waterResistant", "kidFriendly", "petFriendly", "wipeClean"];

/**
 * Performance badges shown as proof. Each badge toggles a panel that explains
 * the claim and, when the owner supplies a clip, loops a short muted video.
 * The "*for covered balconies" qualifier stays on every sofa claim.
 */
export function ProofBadges({ product }: { product: Product }) {
  const resilience = product.resilience ?? {};
  const [open, setOpen] = useState<BadgeKey | null>(null);
  const panelId = useId();

  const active = ORDER.filter((key) => resilience[key]);
  if (active.length === 0) return null;

  const isSofa = product.category === "sofa";
  const qualifier = isSofa ? "Applies to covered balconies." : "";

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {active.map((key) => {
          const meta = BADGE_META[key];
          const isOpen = open === key;
          return (
            <button
              key={key}
              type="button"
              aria-expanded={isOpen}
              aria-controls={isOpen ? panelId : undefined}
              onClick={() => setOpen(isOpen ? null : key)}
              className={`min-h-11 rounded-full border px-3 py-2 text-[12px] transition ${
                isOpen
                  ? "border-champagne bg-champagne/12 text-champagne"
                  : "border-antique-gold/40 text-ivory/90 hover:border-champagne"
              }`}
            >
              {meta.label}
            </button>
          );
        })}
      </div>

      {open && (
        <div
          id={panelId}
          className="crossfade mt-3 rounded-xl border border-white/10 bg-onyx/60 p-4"
          role="note"
        >
          <p className="text-sm text-ivory/90">{BADGE_META[open].note}</p>
          {qualifier && <p className="mt-1 text-xs text-muted">{qualifier}</p>}

          <div className="mt-3">
            {product.proofVideo ? (
              <video
                key={product.proofVideo}
                className="w-full rounded-lg"
                src={product.proofVideo}
                autoPlay
                loop
                muted
                playsInline
                controls
                aria-label={`${BADGE_META[open].label} demonstration`}
              />
            ) : (
              <div className="flex items-center gap-3 rounded-lg border border-dashed border-antique-gold/30 bg-espresso p-3">
                <span
                  aria-hidden
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-antique-gold/40 text-antique-gold"
                >
                  ▷
                </span>
                <p className="text-xs text-muted">
                  Liquid-beading video slot. The owner is supplying the real clip — we will not
                  publish an unverified claim in the meantime.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
