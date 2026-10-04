"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CloseIcon,
  HeartIcon,
  MenuIcon,
  PhoneIcon,
  SearchIcon,
} from "./icons";
import { WaButton } from "./ui";
import { mega, nav, site } from "@/lib/site";
import { track } from "@/lib/analytics";

export function Header() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden border-b border-white/5 bg-onyx/95 text-[11px] tracking-wide text-muted md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 lg:px-8">
          <div className="flex items-center gap-5">
            <a href={`https://wa.me/${site.whatsapp}`} className="hover:text-champagne">
              Room-fit help on WhatsApp
            </a>
            <Link href="/about/" className="hover:text-champagne">
              Ask about delivery &amp; setup
            </Link>
            <Link href="/custom-design/" className="hover:text-champagne">
              Ask about custom options
            </Link>
          </div>
          <a
            href={`tel:${site.phoneTel}`}
            onClick={() => track("call_click", { linkUrl: `tel:${site.phoneTel}`, ctaLocation: "header" })}
            className="inline-flex items-center gap-2 text-champagne hover:text-ivory"
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>

      <div
        className={`border-b border-white/5 transition ${
          scrolled ? "bg-onyx/95 backdrop-blur-md" : "bg-onyx/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="relative h-11 w-11 overflow-hidden rounded-full border border-antique-gold/50">
              <Image
                src="/images/logo.jpeg"
                alt="Home Update Furniture"
                fill
                className="object-cover object-top"
                sizes="44px"
                priority
              />
            </span>
            <span className="font-serif text-sm tracking-[0.08em] text-champagne uppercase sm:text-[15px]">
              Home Update
              <span className="mt-0.5 block text-[10px] tracking-[0.28em] text-muted">
                Furniture
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => {
                  if (item.href === "/dining-sets" || item.href === "/sofas") {
                    setMegaOpen(true);
                  }
                }}
                className="relative rounded-full px-2.5 py-2 text-[12px] text-ivory/90 transition hover:bg-white/5 hover:text-champagne xl:px-3 xl:text-[13px]"
              >
                {item.label}
                {"hot" in item && item.hot ? (
                  <span className="ml-1 rounded-full bg-hot/90 px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-white">
                    HOT
                  </span>
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Search"
              className="hidden rounded-full p-2 text-ivory/80 hover:bg-white/5 hover:text-champagne md:inline-flex"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Wishlist"
              className="hidden rounded-full p-2 text-ivory/80 hover:bg-white/5 hover:text-champagne md:inline-flex"
            >
              <HeartIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex rounded-full border border-white/10 p-2 text-ivory lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {megaOpen ? (
          <div
            className="absolute inset-x-0 top-full hidden border-b border-white/5 bg-espresso/98 shadow-2xl lg:block"
            onMouseLeave={() => setMegaOpen(false)}
          >
            <div className="mx-auto grid max-w-7xl grid-cols-5 gap-8 px-8 py-8">
              {(
                [
                  ["Dining Sets", mega.dining],
                  ["Sofas", mega.sofas],
                  ["Design", mega.design],
                  ["Shop by need", mega.need],
                ] as const
              ).map(([title, links]) => (
                <div key={title}>
                  <p className="mb-3 text-[11px] tracking-[0.18em] text-antique-gold uppercase">
                    {title}
                  </p>
                  <ul className="space-y-2">
                    {links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-ivory/85 hover:text-champagne"
                          onClick={() => setMegaOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-onyx lg:hidden">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <p className="font-serif text-champagne">Menu</p>
            <button type="button" aria-label="Close" onClick={() => setOpen(false)}>
              <CloseIcon className="h-6 w-6 text-ivory" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-5 py-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-lg text-ivory hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="absolute inset-x-0 bottom-0 space-y-3 border-t border-white/10 bg-espresso p-5">
            <WaButton className="w-full" />
            <a
              href={`tel:${site.phoneTel}`}
              onClick={() => track("call_click", { linkUrl: `tel:${site.phoneTel}`, ctaLocation: "mobile-header" })}
              className="flex items-center justify-center gap-2 rounded-full border border-antique-gold/50 py-3 text-sm text-ivory"
            >
              <PhoneIcon className="h-4 w-4 text-antique-gold" />
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
