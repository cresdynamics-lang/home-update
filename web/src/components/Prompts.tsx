"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon } from "@/components/icons";
import { CONSENT_COOKIE, siteConfig, STORAGE_KEYS } from "@/lib/site";
import { useStoredValue } from "@/lib/use-storage";
import { whatsappHref } from "@/lib/whatsapp";
import { track } from "@/lib/analytics";

/**
 * Session prompts. At most ONE proactive prompt per session (the fit finder).
 * The cookie notice is a consent control rather than a marketing prompt, so it
 * is always available and never competes for attention.
 */
export function Prompts() {
  const pathname = usePathname();
  const hasStickyProductBar = /^\/(?:shop\/[^/]+\/[^/]+|dining-sets\/[^/]+|sofas\/[^/]+)\/?$/.test(pathname);
  const [showFitFinder, setShowFitFinder] = useState(false);
  const cookieAck = useStoredValue(STORAGE_KEYS.cookie);
  const showCookie = cookieAck === "";

  useEffect(() => {
    try {
      const seen = window.sessionStorage.getItem(STORAGE_KEYS.promo);
      if (seen) return;
      const timer = window.setTimeout(() => {
        window.sessionStorage.setItem(STORAGE_KEYS.promo, "1");
        setShowFitFinder(true);
      }, siteConfig.promo.fitFinderDelayMs);
      return () => window.clearTimeout(timer);
    } catch {
      return;
    }
  }, []);

  const dismissCookie = (ack: boolean) => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.cookie, ack ? "accepted" : "essential");
      document.cookie = `${CONSENT_COOKIE}=${ack ? "accepted" : "essential"}; Max-Age=31536000; Path=/; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
      window.dispatchEvent(new Event("home-update-storage"));
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      {showCookie && (
        <div
          role="dialog"
          aria-label="Cookie notice"
          className={`fixed inset-x-2 ${hasStickyProductBar ? "bottom-20 sm:bottom-20" : "bottom-2 sm:bottom-3"} z-70 mx-auto max-w-sm rounded-lg border border-white/12 bg-espresso/97 p-2 shadow-xl backdrop-blur sm:inset-x-auto sm:right-4 sm:mx-0 md:bottom-5`}
        >
          <div className="flex items-center gap-2">
            <p className="min-w-0 flex-1 text-[10px] leading-3 text-ivory/90">
              Allow optional analytics and ads measurement?
            </p>
            <button
              type="button"
              onClick={() => dismissCookie(true)}
              className="min-h-9 shrink-0 rounded-full bg-champagne px-2.5 text-[10px] font-medium text-onyx"
            >
              Allow
            </button>
            <button
              type="button"
              onClick={() => dismissCookie(false)}
              className="min-h-9 shrink-0 rounded-full border border-white/12 px-2 text-[10px] text-ivory/85"
            >
              Essential only
            </button>
          </div>
        </div>
      )}

      {showFitFinder && (
        <div
          role="dialog"
          aria-label="Find your fit"
          className="fixed inset-x-3 bottom-20 z-65 mx-auto max-w-lg rounded-2xl border border-antique-gold/25 bg-espresso/97 p-5 shadow-2xl backdrop-blur md:bottom-24"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] tracking-[0.18em] text-antique-gold uppercase">Not sure what fits?</p>
              <h2 className="mt-1 font-serif text-2xl text-ivory">Tell us your room size.</h2>
            </div>
            <button
              type="button"
              onClick={() => setShowFitFinder(false)}
              aria-label="Close"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 text-ivory"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-2 text-sm text-muted">
            Send us the length and width and we will suggest a piece that actually fits.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={whatsappHref(
                "Hi Home Update, please help me find the right piece. My room measures (length) x (width) metres.",
              )}
              onClick={() => track("whatsapp_click", { ctaLocation: "fit-finder-prompt" })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-wa px-4 text-sm font-medium text-white"
            >
              Ask on WhatsApp
            </a>
            <Link
              href="/size-guide/"
              onClick={() => setShowFitFinder(false)}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-antique-gold/60 px-4 text-sm text-ivory"
            >
              Open the simulator
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
