"use client";

import { useEffect } from "react";
import { STORAGE_KEYS } from "@/lib/site";
import { useStoredValue } from "@/lib/use-storage";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export function GoogleTagManager() {
  const consent = useStoredValue(STORAGE_KEYS.cookie);

  useEffect(() => {
    if (consent !== "accepted" || !gtmId || !/^GTM-[A-Z0-9]+$/.test(gtmId)) return;
    if (document.getElementById("google-tag-manager-loader")) return;

    const script = document.createElement("script");
    script.id = "google-tag-manager-loader";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    document.head.appendChild(script);
  }, [consent]);

  return null;
}
