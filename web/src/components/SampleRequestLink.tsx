"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

export function SampleRequestLink() {
  return (
    <Link
      href="/contact/"
      onClick={() => track("sample_request", { ctaLocation: "fabrics-page" })}
      className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-champagne px-5 py-3 text-sm font-medium text-onyx transition hover:bg-antique-gold"
    >
      Ask about fabric samples
    </Link>
  );
}
