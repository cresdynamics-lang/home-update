"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

export function TrackedWhatsAppLink({
  href,
  className,
  children,
  ctaLocation = "whatsapp-button",
}: {
  href: string;
  className?: string;
  children: ReactNode;
  ctaLocation?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("whatsapp_click", { ctaLocation, linkUrl: href })}
    >
      {children}
    </a>
  );
}
