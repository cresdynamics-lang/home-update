"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons";

type Props = {
  images: string[];
  alt: string;
  /** Aria description of what the user is looking at. */
  label: string;
  onIndexChange?: (index: number) => void;
  index?: number;
  /** Priority hint for the LCP image. */
  priority?: boolean;
  sizes?: string;
};

/**
 * Product gallery: thumbnail strip, swipe on mobile, keyboard and arrow
 * navigation, pinch-to-zoom on mobile and a cursor-tracking magnifier loupe on
 * desktop. The high-resolution image is only requested on first interaction.
 */
export function Gallery({
  images,
  alt,
  label,
  onIndexChange,
  index: controlledIndex,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 60vw",
}: Props) {
  const [internalIndex, setInternalIndex] = useState(0);
  const index = controlledIndex ?? internalIndex;
  const [zoomed, setZoomed] = useState(false);
  const [loupe, setLoupe] = useState<{
    x: number;
    y: number;
    backgroundPosition: string;
  } | null>(null);
  const [hiResSrc, setHiResSrc] = useState<string | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const pinchStart = useRef<number | null>(null);

  const setIndex = useCallback(
    (next: number) => {
      const clamped = (next + images.length) % images.length;
      if (controlledIndex === undefined) setInternalIndex(clamped);
      onIndexChange?.(clamped);
    },
    [controlledIndex, images.length, onIndexChange],
  );

  const goNext = useCallback(() => setIndex(index + 1), [index, setIndex]);
  const goPrev = useCallback(() => setIndex(index - 1), [index, setIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  const requestHiRes = useCallback(() => {
    const src = images[index];
    if (hiResSrc !== src) setHiResSrc(src);
  }, [hiResSrc, images, index]);

  const onTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    if (touch) touchStart.current = { x: touch.clientX, y: touch.clientY };
    if (event.touches.length === 2) {
      pinchStart.current = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY,
      );
    }
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (event.touches.length === 0 && pinchStart.current) {
      pinchStart.current = null;
      return;
    }
    if (pinchStart.current && event.touches.length === 0) {
      pinchStart.current = null;
    }
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) goNext();
      else goPrev();
    } else if (Math.abs(dx) < 12 && Math.abs(dy) < 12) {
      setZoomed((z) => !z);
    }
  };

  const onTouchMove = (event: React.TouchEvent) => {
    if (event.touches.length === 2 && pinchStart.current) {
      const distance = Math.hypot(
        event.touches[0].clientX - event.touches[1].clientX,
        event.touches[0].clientY - event.touches[1].clientY,
      );
      if (distance - pinchStart.current > 40) {
        pinchStart.current = null;
        setZoomed(true);
        requestHiRes();
      }
    }
  };

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (zoomed) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const bgX = Math.min(100, Math.max(0, (x / (rect.width || 400)) * 100));
    const bgY = Math.min(100, Math.max(0, (y / (rect.height || 300)) * 100));
    setLoupe({ x, y, backgroundPosition: `${bgX}% ${bgY}%` });
  };

  const current = images[index];

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-espresso">
        <div
          className="relative aspect-[4/3] w-full touch-pan-y"
          role="region"
          aria-label={`${alt} image gallery, image ${index + 1} of ${images.length}`}
          tabIndex={0}
          onMouseMove={onMouseMove}
          onMouseLeave={() => setLoupe(null)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClick={zoomed ? () => setZoomed(false) : undefined}
        >
          <div
            className={`absolute inset-0 ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
            style={
              zoomed
                ? { transform: "scale(2)", transformOrigin: loupe ? `${loupe.x}px ${loupe.y}px` : "center" }
                : undefined
            }
          >
            <Image
              key={current}
              src={current}
              alt={`${alt}: ${label} — view ${index + 1} of ${images.length}`}
              fill
              priority={priority}
              className="crossfade object-cover"
              sizes={sizes}
            />
          </div>

          {loupe && !zoomed && (
            <div
              aria-hidden
              className="pointer-events-none absolute z-10 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-champagne shadow-2xl sm:block"
              style={{ left: loupe.x, top: loupe.y, backgroundImage: `url(${hiResSrc ?? current})` }}
            >
              <div
                className="h-full w-full rounded-full"
                style={{
                  backgroundImage: `url(${hiResSrc ?? current})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "280%",
                  backgroundPosition: loupe.backgroundPosition,
                }}
              />
            </div>
          )}

          {zoomed && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setZoomed(false);
              }}
              className="absolute top-3 right-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-onyx/80 text-ivory"
              aria-label="Close zoom"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
            <span className="rounded-full bg-onyx/75 px-2.5 py-1 text-[11px] text-ivory">
              {index + 1} / {images.length}
            </span>
            <span className="rounded-full bg-onyx/75 px-2.5 py-1 text-[11px] text-champagne">
              Tap or pinch to zoom
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous image"
          className="absolute top-1/2 left-2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-onyx/80 text-ivory transition hover:bg-onyx sm:inline-flex"
        >
          <span aria-hidden>‹</span>
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next image"
          className="absolute top-1/2 right-2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-onyx/80 text-ivory transition hover:bg-onyx sm:inline-flex"
        >
          <span aria-hidden>›</span>
        </button>
      </div>

      <div
        className="scrollbar-none mt-4 flex gap-2 overflow-x-auto pb-2"
        role="tablist"
        aria-label={`${alt} thumbnails`}
      >
        {images.map((src, thumbIndex) => (
          <button
            key={src}
            type="button"
            role="tab"
            aria-selected={thumbIndex === index}
            aria-label={`View image ${thumbIndex + 1}`}
            onClick={() => {
              setIndex(thumbIndex);
              requestHiRes();
            }}
            onMouseEnter={requestHiRes}
            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border transition ${
              thumbIndex === index ? "border-champagne" : "border-white/10"
            }`}
          >
            <Image
              src={src}
              alt={`${alt} thumbnail ${thumbIndex + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
