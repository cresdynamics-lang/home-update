"use client";

import { useMemo } from "react";
import { CloseIcon } from "@/components/icons";
import { buildFitFinderMessage, whatsappHref } from "@/lib/whatsapp";
import type { FitFloorType, FitRoomType } from "@/components/fit-finder/useFitFinder";

export function RoomSizeModal({
  isOpen,
  onClose,
  roomType,
  length,
  width,
  floorType,
  step,
  setStep,
  setRoomType,
  setLength,
  setWidth,
  setFloorType,
  recommendation,
}: {
  isOpen: boolean;
  onClose: () => void;
  roomType: FitRoomType;
  length: number;
  width: number;
  floorType: FitFloorType;
  step: number;
  setStep: (value: number) => void;
  setRoomType: (value: FitRoomType) => void;
  setLength: (value: number) => void;
  setWidth: (value: number) => void;
  setFloorType: (value: FitFloorType) => void;
  recommendation: string;
}) {
  const message = useMemo(() => buildFitFinderMessage({ roomType, length, width, floorType }), [roomType, length, width, floorType]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-onyx/80 p-4 backdrop-blur-md">
      <div className="w-full max-w-2xl overflow-hidden rounded-[1.5rem] border border-antique-gold/35 bg-espresso shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-antique-gold uppercase">Room fit finder</p>
            <h2 className="mt-1 font-serif text-3xl text-ivory">Find the right fit</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close fit finder" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-ivory">
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-5 flex gap-2 text-[11px] uppercase tracking-[0.18em] text-muted">
            {[1, 2, 3, 4].map((value) => (
              <span key={value} className={`inline-flex h-8 w-8 items-center justify-center rounded-full border ${step === value ? "border-antique-gold bg-antique-gold/10 text-champagne" : "border-white/10"}`}>
                {value}
              </span>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted">Choose the space you’re planning for.</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {(["Dining Room", "Living Room / Sofa", "Covered Balcony", "Both"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setRoomType(option as FitRoomType);
                      setStep(2);
                    }}
                    className={`min-h-12 rounded-full border px-4 text-sm transition ${roomType === option ? "border-champagne bg-antique-gold/10 text-champagne" : "border-white/10 bg-onyx text-ivory hover:border-antique-gold/40"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-ivory">
                  Room length (m)
                  <input type="number" min="1" step="0.1" value={length} onChange={(event) => setLength(Number(event.target.value) || 0)} className="mt-2 min-h-11 w-full border border-white/10 bg-onyx px-3 text-ivory" />
                </label>
                <label className="block text-sm text-ivory">
                  Room width (m)
                  <input type="number" min="1" step="0.1" value={width} onChange={(event) => setWidth(Number(event.target.value) || 0)} className="mt-2 min-h-11 w-full border border-white/10 bg-onyx px-3 text-ivory" />
                </label>
              </div>

              <label className="block text-sm text-ivory">
                Floor / wall tone
                <select value={floorType} onChange={(event) => setFloorType(event.target.value as FitFloorType)} className="mt-2 min-h-11 w-full border border-white/10 bg-onyx px-3 text-ivory">
                  {(["Cream tiles", "Grey tiles", "Wood floor", "Dark tiles"] as const).map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => setStep(1)} className="min-h-11 border border-white/10 px-4 text-sm text-ivory">Back</button>
                <button type="button" onClick={() => setStep(3)} className="min-h-11 bg-champagne px-5 text-sm font-medium text-onyx">Calculate fit</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="rounded-[1.2rem] border border-antique-gold/35 bg-onyx p-4">
                <p className="text-[11px] tracking-[0.18em] text-antique-gold uppercase">Fit feedback</p>
                <p className="mt-2 text-base text-ivory/90">{recommendation}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1rem] border border-white/10 bg-onyx p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted">Room size</p>
                  <p className="mt-2 text-lg font-medium text-ivory">{length}m × {width}m</p>
                </div>
                <div className="rounded-[1rem] border border-white/10 bg-onyx p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted">Clearance</p>
                  <p className="mt-2 text-lg font-medium text-ivory">Comfortable 85cm walk zone</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => setStep(2)} className="min-h-11 border border-white/10 px-4 text-sm text-ivory">Edit details</button>
                <a href={whatsappHref(message)} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center bg-wa px-5 text-sm font-medium text-white">Get My Recommendation on WhatsApp</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
