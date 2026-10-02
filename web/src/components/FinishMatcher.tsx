"use client";

import { useMemo, useState } from "react";
import { curtainOptions, floorOptions, wallOptions, fabricInfo } from "@/lib/site";

type Props = {
  fabric?: string;
  colour?: string;
  onUploadPhoto?: () => void;
};

/**
 * Contextual finish matcher. The visitor picks a floor, curtain and wall tone
 * and sees a one-line recommendation beside their chosen upholstery and timber.
 */
export function FinishMatcher({ fabric, colour, onUploadPhoto }: Props) {
  const [floor, setFloor] = useState<string>(floorOptions[1].name);
  const [curtains, setCurtains] = useState<string>(curtainOptions[1].name);
  const [wall, setWall] = useState<string>(wallOptions[0].name);

  const recommendation = useMemo(() => {
    const warmFloor = floor.includes("warm") || floor.includes("parquet");
    const warmCurtain = curtains === "Beige" || curtains === "Oat linen";
    const cool = floor.includes("grey") || floor.includes("cool") || wall === "Cool grey";

    if (warmFloor && warmCurtain) return "Warm, layered and calm.";
    if (cool) return "Cool, modern and grounded.";
    if (warmFloor) return "Warm and welcoming — a good match for timber.";
    return "Bright, clean and easy to style.";
  }, [curtains, floor, wall]);

  const info = fabric ? fabricInfo[fabric] : undefined;
  const swatchTile = (options: readonly { name: string; hex: string }[], value: string) =>
    options.find((o) => o.name === value) ?? options[0];

  return (
    <section className="rounded-[1.35rem] border border-white/10 bg-espresso p-5" aria-label="Contextual finish matcher">
      <p className="text-[11px] tracking-[0.18em] text-antique-gold uppercase">Contextual finish matcher</p>
      <p className="mt-2 text-sm text-ivory/85">
        See your room&apos;s palette beside the upholstery and timber you picked.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <SwatchSelect
          label="Floor"
          value={floor}
          options={floorOptions}
          onChange={setFloor}
        />
        <SwatchSelect
          label="Curtains"
          value={curtains}
          options={curtainOptions}
          onChange={setCurtains}
        />
        <SwatchSelect label="Wall tone" value={wall} options={wallOptions} onChange={setWall} />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Tile
          label="Floor"
          swatch={swatchTile(floorOptions, floor).hex}
        />
        <Tile label="Curtains" swatch={swatchTile(curtainOptions, curtains).hex} />
        <Tile label="Wall" swatch={swatchTile(wallOptions, wall).hex} />
        {colour ? <Tile label="Upholstery" swatch={colourToHex(colour)} /> : null}
        <Tile label="Timber" swatch="#8A5A36" />
      </div>

      <p className="mt-4 font-serif text-2xl text-champagne">{recommendation}</p>
      <p className="mt-2 text-sm text-muted">
        {info
          ? `${info.name}: ${info.feel.toLowerCase()}. ${info.care}.`
          : "This combination keeps the room warm, balanced and layered with the natural palette of the Home Update collection."}
      </p>

      {onUploadPhoto && (
        <button
          type="button"
          onClick={onUploadPhoto}
          className="mt-6 min-h-11 w-full rounded-full border border-antique-gold/60 px-4 py-3 text-sm text-ivory transition hover:border-champagne"
        >
          Upload a photo of your room
        </button>
      )}
    </section>
  );
}

function SwatchSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly { name: string; hex: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] tracking-[0.18em] text-muted uppercase">{label}</span>
      <div className="flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-onyx px-3">
        <span
          aria-hidden
          className="h-5 w-5 shrink-0 rounded-full border border-white/20"
          style={{ background: options.find((o) => o.name === value)?.hex ?? "#8A5A36" }}
        />
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="min-h-11 w-full bg-transparent text-sm text-ivory outline-none"
        >
          {options.map((o) => (
            <option key={o.name} value={o.name}>
              {o.name}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}

function Tile({ label, swatch }: { label: string; swatch: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span
        aria-hidden
        className="h-12 w-12 rounded-full border border-white/20"
        style={{ background: swatch }}
      />
      <span className="text-[10px] tracking-wide text-muted uppercase">{label}</span>
    </div>
  );
}

function colourToHex(colour: string) {
  const map: Record<string, string> = {
    Cream: "#F3E9DA",
    Oat: "#D8C3A5",
    Sand: "#C4A484",
    Stone: "#A89888",
    Truffle: "#6B5344",
    Ivory: "#F1E8D6",
    Charcoal: "#2B2B2B",
    Sage: "#8A9A7B",
    Navy: "#2C3E50",
  };
  return map[colour] ?? "#8A5A36";
}
