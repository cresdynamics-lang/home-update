"use client";

import Image from "next/image";

/**
 * Warms the image cache for the next variants a visitor is likely to pick.
 * Uses next/image so the request goes through the optimiser (AVIF/WebP at the
 * right width) instead of pulling the raw JPEG from /public.
 */
export function PreloadImages({
  sources,
  sizes,
}: {
  sources: string[];
  sizes?: string;
}) {
  if (sources.length === 0) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0">
      {sources.map((src) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={16}
          height={16}
          sizes={sizes}
          loading="eager"
          aria-hidden
        />
      ))}
    </div>
  );
}