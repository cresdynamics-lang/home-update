"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { siteConfig } from "@/lib/site";

type Props = { product: Product };

/**
 * Web AR entry point. Renders nothing unless the product actually has a model
 * and the feature is enabled, so no fake AR is ever shipped. iOS uses Quick Look
 * (.usdz); Android hands the .glb to Scene Viewer.
 */
export function ARButton({ product }: Props) {
  const [unsupported, setUnsupported] = useState(false);

  const glb = product.model3d?.glb;
  const usdz = product.model3d?.usdz;
  const hasModel = siteConfig.ar.enabled && Boolean(glb || usdz);

  if (!hasModel) return null;

  const openSceneViewer = () => {
    if (!glb) return;
    const intent = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
      `${window.location.origin}${glb}`,
    )}&mode=ar_preferred#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(
      `${window.location.href}`,
    )};end;`;
    const link = document.createElement("a");
    link.href = intent;
    link.setAttribute("rel", "ar");
    link.click();
  };

  const isApple = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <div>
      {isApple && usdz ? (
        <a
          rel="ar"
          href={usdz}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-antique-gold/60 px-4 py-3 text-sm text-ivory transition hover:border-champagne"
        >
          View in your room
        </a>
      ) : (
        <button
          type="button"
          onClick={openSceneViewer}
          onError={() => setUnsupported(true)}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-antique-gold/60 px-4 py-3 text-sm text-ivory transition hover:border-champagne"
        >
          View in your room
        </button>
      )}
      {unsupported && (
        <p className="mt-2 text-xs text-muted">
          AR is not available on this device. Try the 2D room simulator instead.
        </p>
      )}
    </div>
  );
}
