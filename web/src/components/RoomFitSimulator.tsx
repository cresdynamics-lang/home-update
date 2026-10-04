"use client";

import { useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import type { Product } from "@/data/products";
import { writeRoom, type RoomSize } from "@/lib/site";
import { useStoredRoom } from "@/lib/use-storage";

type Props = {
  product: Product;
  /** Used by the comparison page to draw several pieces in one room. */
  others?: Product[];
  /** Start from a stored room size when available. */
  onRun?: (verdict: Verdict) => void;
};

export type Verdict = {
  status: "PASS" | "TIGHT" | "WON'T FIT";
  reason: string;
  remainingM: { length: number; width: number };
};

const CHAIR_PULLOUT_CM = 60;
const CORRIDOR_CM = 90;

/**
 * 2D clearance simulator. Draws the room to scale, projects the piece's
 * footprint with its clearance zones and gives a PASS / TIGHT / WON'T FIT
 * verdict with one line of reasoning. The piece can be dragged and rotated.
 */
export function RoomFitSimulator({ product, others = [] }: Props) {
  // Start from the stored room size, then let the visitor override it.
  const stored = useStoredRoom();
  const [edited, setEdited] = useState<RoomSize | null>(null);
  const [unit, setUnit] = useState<"m" | "cm">("m");
  const [door, setDoor] = useState<"right" | "left" | "top" | "bottom" | "none">("right");
  const [x, setX] = useState(0.15);
  const [y, setY] = useState(0.15);
  const [rotation, setRotation] = useState(0);
  const [ran, setRan] = useState(false);
  const dragState = useRef<{ offsetX: number; offsetY: number; moved: boolean } | null>(null);

  const room = edited ?? stored ?? { lengthM: 4.2, widthM: 3.5 };
  const lengthM = room.lengthM;
  const widthM = room.widthM;

  const setLength = (value: number) => {
    const next = { ...room, lengthM: value };
    setEdited(next);
    writeRoom(next);
  };
  const setWidth = (value: number) => {
    const next = { ...room, widthM: value };
    setEdited(next);
    writeRoom(next);
  };

  const pieceW = product.dimensions.w / 100;
  const pieceD = product.dimensions.d / 100;
  const clearance = product.clearance ?? { chairPulloutCm: CHAIR_PULLOUT_CM, corridorCm: CORRIDOR_CM };
  const isDining = product.category === "dining";
  const pullout = clearance.chairPulloutCm / 100;
  const corridor = clearance.corridorCm / 100;

  const verdict: Verdict = useMemo(() => {
    const min = product.minRoom;
    const remainingLength = lengthM - pieceD;
    const remainingWidth = widthM - pieceW;

    if (lengthM < min.w || widthM < min.d) {
      const shortLength = lengthM < min.w ? `${(min.w - lengthM).toFixed(2)} m` : null;
      const shortWidth = widthM < min.d ? `${(min.d - widthM).toFixed(2)} m` : null;
      const parts = [shortLength ? `${shortLength} short on the long wall` : null, shortWidth ? `${shortWidth} short on the short wall` : null].filter(Boolean);
      return {
        status: "WON'T FIT",
        reason: `This piece wants about ${min.w} × ${min.d} m to keep the ${clearance.corridorCm} cm walkway clear — your room is ${parts.join(" and ") || "smaller"} than that.`,
        remainingM: { length: remainingLength, width: remainingWidth },
      };
    }

    const tight = lengthM < min.w + 0.3 || widthM < min.d + 0.3;
    if (tight) {
      return {
        status: "TIGHT",
        reason: `It will fit, but you keep only ${remainingLength.toFixed(2)} m of length past the piece — under the ${clearance.corridorCm} cm corridor we would want.`,
        remainingM: { length: remainingLength, width: remainingWidth },
      };
    }

    return {
      status: "PASS",
      reason: `${remainingLength.toFixed(2)} × ${remainingWidth.toFixed(2)} m of clear floor remains — enough for the ${clearance.corridorCm} cm walkway${isDining ? ` and ${clearance.chairPulloutCm} cm to pull chairs out` : ""}.`,
      remainingM: { length: remainingLength, width: remainingWidth },
    };
  }, [clearance.corridorCm, clearance.chairPulloutCm, isDining, lengthM, pieceD, pieceW, product.minRoom, widthM]);

  const run = () => {
    setRan(true);
    track("size_checker_used", { product: product.name, value: verdict.status, ctaLocation: "room-fit-simulator" });
  };

  // Scale the room into a fixed viewBox so both axes stay to the same scale.
  const viewW = 320;
  const maxRoom = 6;
  const scale = viewW / Math.max(lengthM, maxRoom);
  const viewH = widthM * scale;
  const piecePxW = pieceW * scale;
  const piecePxD = pieceD * scale;
  const pulloutPx = pullout * scale;

  const toSvg = (clientX: number, clientY: number, rect: DOMRect) => ({
    sx: ((clientX - rect.left) / rect.width) * viewW,
    sy: ((clientY - rect.top) / rect.height) * viewH,
  });

  const onPointerDown = (event: React.PointerEvent<SVGGElement>) => {
    const rect = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
    if (!rect) return;
    const { sx, sy } = toSvg(event.clientX, event.clientY, rect);
    dragState.current = { offsetX: sx - x * scale, offsetY: sy - y * scale, moved: false };
    (event.target as Element).setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<SVGGElement>) => {
    const state = dragState.current;
    const rect = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
    if (!state || !rect) return;
    const { sx, sy } = toSvg(event.clientX, event.clientY, rect);
    const nextX = Math.min(Math.max((sx - state.offsetX) / scale, 0), Math.max(0, lengthM - pieceW));
    const nextY = Math.min(Math.max((sy - state.offsetY) / scale, 0), Math.max(0, widthM - pieceD));
    state.moved = true;
    setX(nextX);
    setY(nextY);
  };

  const onPointerUp = () => {
    dragState.current = null;
  };

  const onDoubleClick = () => {
    setRotation((r) => (r + 90) % 360);
    setRan(true);
  };

  const unitValue = (value: number) => (unit === "m" ? value : Math.round(value * 100));
  const fromUnit = (value: string) => {
    const n = Number(value);
    if (!Number.isFinite(n)) return 0;
    return unit === "m" ? n : n / 100;
  };

  const doorRect = {
    right: { x: viewW - 8, y: viewH / 2 - 30, w: 8, h: 60 },
    left: { x: 0, y: viewH / 2 - 30, w: 8, h: 60 },
    top: { x: viewW / 2 - 30, y: 0, w: 60, h: 8 },
    bottom: { x: viewW / 2 - 30, y: viewH - 8, w: 60, h: 8 },
    none: null,
  }[door];

  return (
    <section
      className="rounded-[1.35rem] border border-white/10 bg-espresso p-5"
      aria-label="Room clearance simulator"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] tracking-[0.18em] text-antique-gold uppercase">
            2D clearance simulator
          </p>
          <p className="mt-1 text-sm text-muted">
            Drag the piece to place it. Double-click to rotate it 90°.
          </p>
          <p className="mt-2 max-w-2xl text-xs text-muted">
            Planning estimate only. The 60 cm chair pull-out and 90 cm walkway are starting guidelines; confirm the exact product dimensions, layout and access route before ordering.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              verdict.status === "PASS"
                ? "bg-green-500/12 text-green-300"
                : verdict.status === "TIGHT"
                  ? "bg-amber-500/12 text-amber-200"
                  : "bg-red-500/12 text-red-200"
            }`}
            role="status"
            aria-live="polite"
          >
            {verdict.status}
          </span>
          <div className="flex rounded-full border border-white/10 p-0.5">
            {(["m", "cm"] as const).map((u) => (
              <button
                key={u}
                type="button"
                aria-pressed={unit === u}
                onClick={() => setUnit(u)}
                className={`min-h-10 rounded-full px-3 text-xs ${
                  unit === u ? "bg-champagne text-onyx" : "text-ivory/75"
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[220px_1fr]">
        <div className="space-y-3">
          <NumField
            label="Room length"
            unit={unit}
            value={unitValue(lengthM)}
            onChange={(v) => setLength(clampTo(fromUnit(v), 1.2, 12))}
          />
          <NumField
            label="Room width"
            unit={unit}
            value={unitValue(widthM)}
            onChange={(v) => setWidth(clampTo(fromUnit(v), 1.2, 12))}
          />
          <label className="block">
            <span className="mb-2 block text-[10px] tracking-[0.18em] text-muted uppercase">
              Door / window
            </span>
            <select
              value={door}
              onChange={(event) => setDoor(event.target.value as typeof door)}
              className="min-h-11 w-full rounded-xl border border-white/10 bg-onyx px-3 text-sm text-ivory"
            >
              <option value="right">Right wall</option>
              <option value="left">Left wall</option>
              <option value="top">Top wall</option>
              <option value="bottom">Bottom wall</option>
              <option value="none">No door drawn</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-[10px] tracking-[0.18em] text-muted uppercase">
              Rotation ({rotation}°)
            </span>
            <input
              type="range"
              min="0"
              max="350"
              step="10"
              value={rotation}
              onChange={(event) => {
                setRotation(Number(event.target.value));
                setRan(true);
              }}
              className="w-full accent-champagne"
              aria-label="Rotate the selected piece"
            />
          </label>
          <button
            type="button"
            onClick={run}
            className="min-h-11 w-full rounded-full bg-champagne px-4 py-2.5 text-sm font-medium text-onyx"
          >
            Check this room
          </button>
        </div>

        <div>
          <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-onyx p-3">
            <svg
              viewBox={`0 0 ${viewW} ${viewH}`}
              className="h-auto w-full"
              role="img"
              aria-label={`Room ${lengthM.toFixed(2)} by ${widthM.toFixed(2)} metres with ${product.name} and its clearance zones drawn to scale`}
              style={{ maxHeight: 420 }}
            >
              <rect x="0" y="0" width={viewW} height={viewH} fill="#1c1917" />

              {/* Grid at 1 m */}
              {Array.from({ length: Math.ceil(Math.max(lengthM, widthM)) + 1 }).map((_, i) => (
                <g key={i} stroke="#c9a45c" strokeOpacity="0.14" strokeWidth="1">
                  <line x1={i * scale} y1="0" x2={i * scale} y2={viewH} />
                  <line x1="0" y1={i * scale} x2={viewW} y2={i * scale} />
                </g>
              ))}

              {/* Door */}
              {doorRect && (
                <rect
                  {...doorRect}
                  fill="#c9a45c"
                  fillOpacity="0.3"
                  stroke="#e8cb8c"
                  strokeWidth="1.5"
                />
              )}

              {/* Clearance zone for this piece */}
              <g
                transform={`rotate(${rotation} ${x * scale + piecePxW / 2} ${y * scale + piecePxD / 2})`}
              >
                <rect
                  x={(x - corridor) * scale}
                  y={(y - corridor) * scale}
                  width={(pieceW + corridor * 2) * scale}
                  height={(pieceD + corridor * 2) * scale}
                  rx="10"
                  fill="#c9a45c"
                  fillOpacity="0.10"
                  stroke="#c9a45c"
                  strokeDasharray="5 4"
                  strokeWidth="1"
                />
                {isDining && (
                  <rect
                    x={(x - pullout) * scale}
                    y={(y + pieceD) * scale}
                    width={piecePxW}
                    height={pulloutPx}
                    fill="#c9a45c"
                    fillOpacity="0.16"
                    stroke="#c9a45c"
                    strokeDasharray="4 3"
                    strokeWidth="1"
                  />
                )}
                <g
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                  onDoubleClick={onDoubleClick}
                  style={{ cursor: "grab", touchAction: "none" }}
                >
                  <rect
                    x={x * scale}
                    y={y * scale}
                    width={piecePxW}
                    height={piecePxD}
                    rx="8"
                    fill="#e8cb8c"
                    fillOpacity="0.45"
                    stroke="#f1e8d6"
                    strokeWidth="2"
                  />
                  <text
                    x={(x + pieceW / 2) * scale}
                    y={(y + pieceD / 2) * scale}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-onyx"
                    style={{ font: "600 11px var(--font-jost), sans-serif" }}
                  >
                    {product.dimensions.w}×{product.dimensions.d}
                  </text>
                </g>
              </g>

              {/* Other compared pieces */}
              {others.map((other) => (
                <g key={other.id}>
                  <rect
                    x={scale * 0.15}
                    y={viewH - (other.dimensions.d / 100) * scale - 6}
                    width={(other.dimensions.w / 100) * scale}
                    height={(other.dimensions.d / 100) * scale}
                    rx="8"
                    fill="none"
                    stroke="#8A5A36"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <text
                    x={scale * 0.15 + 6}
                    y={viewH - (other.dimensions.d / 100) * scale + 14}
                    className="fill-ivory"
                    style={{ font: "500 9px var(--font-jost), sans-serif" }}
                  >
                    {other.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <p className="mt-3 text-sm text-ivory/90">{verdict.reason}</p>

          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted">
            <li className="flex items-center gap-1.5">
              <span aria-hidden className="h-3 w-3 rounded-sm border border-champagne/60 bg-champagne/30" />
              Piece footprint
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden className="h-3 w-3 rounded-sm border border-dashed border-antique-gold" />
              {clearance.corridorCm} cm walkway
            </li>
            {isDining && (
              <li className="flex items-center gap-1.5">
                <span aria-hidden className="h-3 w-3 rounded-sm border border-dashed border-antique-gold" />
                {clearance.chairPulloutCm} cm chair pull-out
              </li>
            )}
          </ul>

          {ran && (
            <p className="mt-3 text-xs text-muted">
              Clear floor left: {verdict.remainingM.length.toFixed(2)} m ×{" "}
              {verdict.remainingM.width.toFixed(2)} m.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function clampTo(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function NumField({
  label,
  value,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  unit: "m" | "cm";
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] tracking-[0.18em] text-muted uppercase">
        Room {label} ({unit})
      </span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={unit === "m" ? 0.1 : 10}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 w-full rounded-xl border border-white/10 bg-onyx px-3 text-base text-ivory"
        aria-label={`Room ${label} in ${unit}`}
      />
    </label>
  );
}
