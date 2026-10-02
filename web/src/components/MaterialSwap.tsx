"use client";

import { track } from "@/lib/analytics";
import type { Combo } from "@/lib/image-map";
import { colourHex } from "@/lib/site";

type Props = {
  fabrics: string[];
  colours: string[];
  woodFinishes: string[];
  layoutOptions: string[];
  combo: Combo;
  summary: string;
  onChange: (next: Combo) => void;
  /** Dining sets expose timber finishes; sofas do too but with fewer options. */
  showLayout?: boolean;
};

/**
 * Reactive material swapping. Selecting a fabric, colour, timber or layout
 * updates client state instantly with no page reload; the parent swaps the
 * viewport with a 180ms crossfade.
 */
export function MaterialSwap({
  fabrics,
  colours,
  woodFinishes,
  layoutOptions,
  combo,
  summary,
  onChange,
  showLayout = true,
}: Props) {
  const select = (
    key: keyof Combo,
    value: string,
    eventName: "fabric_select" | null,
  ) => {
    onChange({ ...combo, [key]: value });
    if (eventName) track(eventName, { value: `${key}:${value}` });
  };

  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-espresso p-5">
      <p className="text-[11px] tracking-[0.18em] text-antique-gold uppercase">Selected combination</p>
      <p className="mt-2 font-serif text-2xl text-ivory" aria-live="polite">
        {summary}
      </p>

      {showLayout && layoutOptions.length > 0 && (
        <fieldset className="mt-5">
          <legend className="mb-2 text-[10px] tracking-[0.18em] text-muted uppercase">Layout</legend>
          <div className="flex flex-wrap gap-2">
            {layoutOptions.map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={combo.layout === option}
                onClick={() => select("layout", option, null)}
                className={`min-h-11 rounded-full border px-3.5 py-2 text-sm transition ${
                  combo.layout === option
                    ? "border-champagne bg-champagne/12 text-champagne"
                    : "border-white/12 text-ivory/85 hover:border-antique-gold/60"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset className="mt-5">
        <legend className="mb-2 text-[10px] tracking-[0.18em] text-muted uppercase">Fabric</legend>
        <div className="flex flex-wrap gap-2">
          {fabrics.map((fabric) => (
            <button
              key={fabric}
              type="button"
              aria-pressed={combo.fabric === fabric}
              onClick={() => select("fabric", fabric, "fabric_select")}
              className={`min-h-11 rounded-full border px-3.5 py-2 text-sm transition ${
                combo.fabric === fabric
                  ? "border-champagne bg-champagne/12 text-champagne"
                  : "border-white/12 text-ivory/85 hover:border-antique-gold/60"
              }`}
            >
              {fabric}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="mb-2 text-[10px] tracking-[0.18em] text-muted uppercase">Colour</legend>
        <div className="flex flex-wrap gap-2">
          {colours.map((colour) => {
            const active = combo.colour === colour;
            return (
              <button
                key={colour}
                type="button"
                aria-pressed={active}
                aria-label={`Colour ${colour}`}
                onClick={() => select("colour", colour, null)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                  active
                    ? "border-champagne bg-champagne/12 text-champagne"
                    : "border-white/12 text-ivory/85 hover:border-antique-gold/60"
                }`}
              >
                <span
                  aria-hidden
                  className="h-4 w-4 rounded-full border border-white/25"
                  style={{ background: colourHex[colour] ?? "#8A5A36" }}
                />
                {colour}
              </button>
            );
          })}
        </div>
      </fieldset>

      {woodFinishes.length > 0 && (
        <fieldset className="mt-5">
          <legend className="mb-2 text-[10px] tracking-[0.18em] text-muted uppercase">Timber</legend>
          <div className="flex flex-wrap gap-2">
            {woodFinishes.map((wood) => {
              const active = combo.wood === wood;
              return (
                <button
                  key={wood}
                  type="button"
                  aria-pressed={active}
                  aria-label={`Timber ${wood}`}
                  onClick={() => select("wood", wood, null)}
                  className={`min-h-11 rounded-full border px-3.5 py-2 text-sm transition ${
                    active
                      ? "border-champagne bg-champagne/12 text-champagne"
                      : "border-white/12 text-ivory/85 hover:border-antique-gold/60"
                  }`}
                >
                  {wood}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}
    </div>
  );
}
