"use client";

import { track } from "@/lib/analytics";
import { site } from "@/lib/site";
import { PhoneIcon } from "@/components/icons";

export function CallButton({ className }: { className?: string }) {
  return (
    <a
      href={`tel:${site.phoneTel}`}
      onClick={() => track("call_click", { linkUrl: `tel:${site.phoneTel}`, ctaLocation: "call-button" })}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-antique-gold/60 px-5 py-3 text-sm font-medium text-ivory transition hover:border-champagne hover:text-champagne ${className ?? ""}`}
    >
      <PhoneIcon className="h-4 w-4 text-antique-gold" />
      Call {site.phoneDisplay}
    </a>
  );
}
