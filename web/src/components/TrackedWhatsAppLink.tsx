"use client";

import type { ReactNode } from "react";
import { track, trackMeta } from "@/lib/analytics";

export function TrackedWhatsAppLink({
  href,
  className,
  children,
  ctaLocation = "whatsapp-button",
  initiateCheckout = false,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  ctaLocation?: string;
  initiateCheckout?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        track("whatsapp_click", { ctaLocation, linkUrl: href });
        if (initiateCheckout) trackMeta("InitiateCheckout", { content_name: "Custom furniture design", content_category: ctaLocation, currency: "KES" });
      }}
    >
      {children}
    </a>
  );
}
