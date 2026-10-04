import Image from "next/image";
import Link from "next/link";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import { WaButton } from "./ui";
import { CallButton } from "./CallButton";
import { site, waLink } from "@/lib/site";

const columns = [
  {
    title: "Shop",
    links: [
      ["Dining Sets", "/dining-sets/"],
      ["4-Seater Round Tables", "/dining-sets/4-seater-round-dining-tables/"],
      ["6-Seater Tables", "/dining-sets/6-seater-dining-tables/"],
      ["Sofas & Sectionals", "/sofas/"],
      ["L-Shaped Sofas", "/sofas/l-shaped-sofas/"],
      ["Furniture collection", "/#bestsellers"],
      ["Current prices", "/sale/"],
    ],
  },
  {
    title: "Design",
    links: [
      ["Fabrics & Colours", "/fabrics-and-colours/"],
      ["Match My Room", "/match-my-room/"],
      ["Size Guide", "/size-guide/"],
      ["Custom Design", "/custom-design/"],
      ["Ask about fabric samples", "/contact/"],
    ],
  },
  {
    title: "Learn",
    links: [
      ["The Journal", "/journal/"],
      ["Buying Guides", "/journal/"],
      ["Small-Space Ideas", "/journal/small-living-room-sofa-ideas-nairobi/"],
      ["Fabric Care", "/fabrics-and-colours/"],
      ["FAQs", "/faqs/"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Home Update", "/about/"],
      ["Ask about Delivery & Setup", "/contact/"],
      ["Ask about Warranty & Returns", "/contact/"],
      ["Ask about an in-person visit", "/contact/"],
      ["Contact", "/contact/"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-onyx">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-8 lg:px-8">
        <div className="mb-14 grid gap-6 rounded-[1.5rem] border border-antique-gold/20 bg-[linear-gradient(135deg,#1a110d_0%,#0a0808_55%,#24180f_100%)] p-8 md:grid-cols-[1.4fr_auto] md:items-center">
          <div>
            <p className="mb-2 text-[11px] tracking-[0.22em] text-antique-gold uppercase">
              Ready when you are
            </p>
            <h2 className="font-serif text-3xl text-ivory md:text-4xl">
              Your home, <em className="text-champagne italic">updated.</em>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Send us the piece you love and your room size. We reply with price, fabric options
              and delivery time. No pressure, no commitment.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <WaButton pulse />
            <CallButton />
          </div>
        </div>

        <div className="mb-12 grid gap-6 rounded-2xl border border-white/8 bg-espresso/60 p-5 md:grid-cols-[1fr_auto] md:items-center md:px-7">
          <div>
            <p className="text-[11px] tracking-[0.22em] text-antique-gold uppercase">
              Stay inspired
            </p>
            <p className="mt-1 font-serif text-2xl text-ivory">
              Request our Fabric &amp; Size Guide on WhatsApp.
            </p>
          </div>
          <form
            className="flex flex-col gap-3 sm:flex-row"
            action={waLink("Please send me the Fabric & Size Guide.")}
          >
            <input
              type="tel"
              name="phone"
              placeholder="Your WhatsApp number"
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-onyx px-5 py-3 text-sm text-ivory outline-none placeholder:text-muted focus:border-antique-gold/50"
            />
            <WaButton className="shrink-0">Send me the guide</WaButton>
          </form>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_repeat(4,1fr)_1.1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative h-14 w-14 overflow-hidden rounded-full border border-antique-gold/40">
                <Image
                  src="/images/logo.jpeg"
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="56px"
                />
              </span>
              <span className="font-serif text-base tracking-[0.08em] text-champagne uppercase">
                Home Update
                <span className="mt-0.5 block text-[10px] tracking-[0.24em] text-muted">
                  Furniture
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>
            <div className="mt-5 flex gap-3 text-xs text-muted">
              {["IG", "FB", "TT", "PIN"].map((s) => (
                <span
                  key={s}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-full grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:contents">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-[11px] tracking-[0.2em] text-antique-gold uppercase">
                  {col.title}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="text-sm text-ivory/80 hover:text-champagne">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <p className="mb-4 text-[11px] tracking-[0.2em] text-antique-gold uppercase">
              Talk to us
            </p>
            <ul className="space-y-3 text-sm text-ivory/85">
              <li>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="inline-flex items-center gap-2 hover:text-champagne"
                >
                  <PhoneIcon className="h-4 w-4 text-antique-gold" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={waLink()}
                  className="inline-flex items-center gap-2 hover:text-champagne"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="h-4 w-4 text-wa" />
                  WhatsApp: fastest reply
                </a>
              </li>
              <li className="text-muted">Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/8 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4 text-xs text-muted">
            <Link href="/about/">About Home Update</Link>
            <Link href="/sale/">Current prices</Link>
            <Link href="/contact/">Contact</Link>
            <a href="/sitemap.xml">XML sitemap</a>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted">
            <span>We accept</span>
            {["M-Pesa", "Card", "Bank transfer"].map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/10 px-3 py-1 text-ivory/80"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/8 bg-espresso/50 p-5 md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <p className="font-serif text-lg text-champagne italic">
              Designed, engineered &amp; powered by Cres Dynamics Ltd
            </p>
            <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted">
              Building digital systems that businesses run on. Websites, CRMs, ads and automation
              for growing African businesses.
            </p>
          </div>
          <div className="mt-4 space-y-1 text-xs text-antique-gold md:mt-0 md:text-right">
            <a href="https://www.cresdynamics.com" className="block hover:text-champagne">
              www.cresdynamics.com
            </a>
            <a href="mailto:info@cresdynamics.com" className="block hover:text-champagne">
              info@cresdynamics.com
            </a>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted/80">
          © {new Date().getFullYear()} Home Update Furniture. All rights reserved. Prices, sizes
          and delivery zones confirmed on WhatsApp.
        </p>
      </div>
    </footer>
  );
}
