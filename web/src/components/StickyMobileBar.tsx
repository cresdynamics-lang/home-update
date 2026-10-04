"use client";

import { track } from "@/lib/analytics";
import { site } from "@/lib/site";
import { whatsappHref } from "@/lib/whatsapp";

/** Sticky mobile action bar: WhatsApp (green) and Call. */
export function StickyMobileBar({ message, productName }: { message: string; productName?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-espresso/95 p-3 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-md items-center gap-2">
        <a
          href={whatsappHref(message)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { product: productName, ctaLocation: "sticky-mobile", linkUrl: whatsappHref(message) })}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-wa px-4 text-sm font-medium text-white"
        >
          WhatsApp
        </a>
        <a
          href={`tel:${site.phoneTel}`}
          onClick={() => track("call_click", { product: productName, linkUrl: `tel:${site.phoneTel}`, ctaLocation: "sticky-mobile" })}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-antique-gold/60 px-4 text-sm text-ivory"
        >
          Call
        </a>
      </div>
    </div>
  );
}
