"use client";

import Script from "next/script";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { STORAGE_KEYS } from "@/lib/site";
import { useStoredValue } from "@/lib/use-storage";

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function MetaPixel() {
  const pathname = usePathname();
  const consent = useStoredValue(STORAGE_KEYS.cookie);
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current !== pathname && pixelId && consent === "accepted") {
      window.fbq?.("track", "PageView");
    }
    previousPath.current = pathname;
  }, [pathname, consent]);

  if (!pixelId) return null;
  return (
    <>
      {consent === "accepted" ? (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId.replace(/[^\w-]/g, "")}');fbq('track','PageView');`}
        </Script>
      ) : null}
      <noscript>
        <Image height={1} width={1} unoptimized loading="eager" style={{ display: "none" }} src="/api/meta-pixel-noscript/" alt="" />
      </noscript>
    </>
  );
}
