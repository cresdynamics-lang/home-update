import Image from "next/image";
import Link from "next/link";
import {
  DropIcon,
  LayersIcon,
  PhoneIcon,
  RulerIcon,
  TruckIcon,
} from "./icons";
import { CallButton, Em, GoldButton, OutlineButton, SectionLabel, SectionTitle, WaButton } from "./ui";
import {
  colours,
  fabrics,
  formatKes,
  journal,
  products,
  rooms,
  site,
  waLink,
} from "@/lib/site";

export function Hero() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden sm:min-h-[85vh] lg:min-h-[92vh]">
      <Image
        src="/images/living-l-sofa.jpeg"
        alt="L-shaped sofa in a bright modern living room"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="hero-scrim absolute inset-0" />

      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-start px-5 pt-8 pb-36 sm:min-h-[85vh] sm:pt-14 md:justify-center md:pt-20 md:pb-36 lg:min-h-[92vh] lg:px-8 lg:pb-36">
        <div className="absolute top-8 right-5 hidden w-[240px] overflow-hidden rounded-2xl border border-white/10 glass md:block lg:right-8">
          <div className="relative h-28 w-full">
            <Image
              src="/images/long-l-sofa.jpeg"
              alt="The Truffle sectional"
              fill
              className="object-cover"
              sizes="240px"
            />
          </div>
          <div className="p-3">
            <p className="text-[10px] tracking-[0.18em] text-antique-gold uppercase">
              Featured today
            </p>
            <p className="mt-1 font-serif text-base text-ivory">The Truffle Sectional</p>
            <a
              href={waLink("Hi — I’d like today’s price for The Truffle Sectional.")}
              className="mt-2 inline-block text-sm text-champagne hover:text-ivory"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask for today’s price →
            </a>
          </div>
        </div>

        <div className="max-w-2xl">
          <p className="animate-fade-up mb-4 text-[11px] tracking-[0.22em] text-champagne uppercase">
            Dining sets · Sofas · Made to fit your home
          </p>
          <h1 className="animate-fade-up-delay font-serif text-4xl leading-[1.08] text-champagne sm:text-5xl lg:text-6xl">
            Look around your living room.{" "}
            <span className="text-ivory italic">Is this how you want to live?</span>
          </h1>
          <p className="animate-fade-up-delay-2 mt-5 max-w-xl text-base leading-relaxed text-ivory/85 md:text-lg">
            Every dinner, every guest and every quiet Sunday happens on your furniture. Make it
            worthy of the life you are living.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <WaButton pulse>Chat on WhatsApp for today’s price</WaButton>
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex items-center gap-2 text-sm text-ivory/90 hover:text-champagne"
            >
              <PhoneIcon className="h-4 w-4 text-antique-gold" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="absolute right-5 bottom-36 hidden max-w-[220px] rounded-2xl border border-white/10 p-4 glass lg:block lg:right-8">
          <p className="text-sm leading-snug text-ivory/90">
            Need help choosing? Tell us your room size and we will suggest the right piece.
          </p>
          <WaButton className="mt-3 !px-4 !py-2 text-xs">Chat with us</WaButton>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 translate-y-1/2 px-5 lg:px-8">
        <FitFinder />
      </div>
    </section>
  );
}

function FitFinder() {
  return (
    <form
      action={waLink("Hi Home Update — please help me find my fit.")}
      className="mx-auto flex max-w-7xl flex-col gap-4 rounded-[1.35rem] border border-white/10 bg-espresso/95 p-4 shadow-2xl backdrop-blur md:flex-row md:items-end md:gap-3 md:p-5"
    >
      <div className="md:min-w-[9rem]">
        <p className="text-[10px] tracking-[0.18em] text-antique-gold uppercase">Find my fit</p>
        <p className="mt-1 text-sm text-ivory">In 4 quick choices</p>
      </div>
      {(
        [
          ["Room", ["Dining room", "Living room", "Both"]],
          ["Seats / Size", ["4 seats", "6 seats", "8 seats", "Custom"]],
          ["Fabric", ["Water-resistant", "Velvet", "Bouclé", "Linen blend"]],
          ["Colour", ["Oat", "Cream", "Truffle", "Charcoal"]],
        ] as const
      ).map(([label, options]) => (
        <label key={label} className="min-w-0 flex-1">
          <span className="mb-1.5 block text-[10px] tracking-[0.16em] text-muted uppercase">
            {label}
          </span>
          <select className="w-full appearance-none rounded-xl border border-white/10 bg-onyx px-3 py-3 text-sm text-ivory outline-none focus:border-antique-gold/50">
            {options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      ))}
      <GoldButton className="md:mb-0.5 md:!px-4">Find my fit</GoldButton>
    </form>
  );
}

export function ValueBar() {
  const items = [
    { icon: DropIcon, title: "Water-resistant fabrics", note: "Built for spills and real life" },
    { icon: RulerIcon, title: "Made to your size", note: "Custom lengths and depths" },
    { icon: LayersIcon, title: "Matched to your room", note: "Tiles, curtains, timber" },
    { icon: TruckIcon, title: "Delivered & set up", note: "Placed where you want it" },
  ];
  return (
    <section className="border-b border-white/5 bg-onyx pt-24 pb-10 md:pt-28">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {items.map(({ icon: Icon, title, note }) => (
          <div key={title} className="flex gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-antique-gold/35 text-antique-gold">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-ivory">{title}</p>
              <p className="mt-1 text-xs text-muted">{note}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function RoomsSection() {
  return (
    <section className="bg-onyx py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Three rooms</SectionLabel>
        <SectionTitle>
          Three rooms you have <Em>not used</Em> yet.
        </SectionTitle>
        <p className="mt-3 max-w-xl text-muted">
          Most homes are missing one of these. Which one is yours?
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5">
          {rooms.map((room) => (
            <Link
              key={room.href + room.title}
              href={room.href}
              className="group relative min-h-[260px] overflow-hidden rounded-[1.1rem] sm:min-h-[360px] sm:rounded-[1.35rem] lg:min-h-[420px]"
            >
              <Image
                src={room.image}
                alt=""
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6">
                <h3 className="font-serif text-base leading-snug text-ivory sm:text-2xl">
                  {room.title}
                </h3>
                <span className="mt-2 inline-flex rounded-full bg-champagne px-3 py-1.5 text-xs font-medium text-onyx sm:mt-4 sm:px-4 sm:py-2 sm:text-sm">
                  {room.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Bestsellers() {
  return (
    <section id="bestsellers" className="bg-onyx py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Bestsellers</SectionLabel>
        <SectionTitle>
          Pieces people <Em>keep choosing.</Em>
        </SectionTitle>
        <p className="mt-3 max-w-2xl text-muted">
          Real photos, real sizes, real fabrics. Tap WhatsApp and we send today’s price.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6">
          {products.map((product) => (
            <article
              key={product.slug}
              className="overflow-hidden rounded-[1.35rem] border border-white/8 bg-espresso"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 50vw, 33vw"
                />
                <span className="absolute top-3 left-3 rounded-full bg-champagne px-2.5 py-1 text-[10px] font-semibold tracking-wide text-onyx uppercase">
                  {product.badge}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-2xl text-ivory">{product.name}</h3>
                <p className="mt-1 text-[11px] tracking-[0.16em] text-muted uppercase">
                  {product.category}
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
                  <span>{product.size}</span>
                  <span>·</span>
                  <span>Best for {product.bestFor}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-ivory/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  {colours.slice(0, 5).map((c) => (
                    <span
                      key={c.name}
                      title={c.name}
                      className="h-4 w-4 rounded-full border border-white/20"
                      style={{ background: c.hex }}
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm tracking-wide text-champagne">
                  {formatKes(product.fromKes)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <WaButton
                    className="!px-4 !py-2.5 text-xs"
                    message={`Hi — I’d like today’s price for ${product.name}.`}
                  >
                    Get price
                  </WaButton>
                  <OutlineButton href={`/products/${product.slug}`} className="!px-4 !py-2.5 text-xs">
                    View details
                  </OutlineButton>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <OutlineButton href="/dining-sets">Shop all pieces</OutlineButton>
        </div>
      </div>
    </section>
  );
}

export function FabricsSection() {
  return (
    <section className="bg-onyx py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Fabrics</SectionLabel>
        <SectionTitle>
          Fabrics that <Em>forgive.</Em>
        </SectionTitle>
        <p className="mt-3 max-w-xl text-muted">
          Life happens on furniture. Choose a fabric built for spills, pets, kids and long Sundays.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5">
          {fabrics.map((fabric) => (
            <article
              key={fabric.name}
              className="overflow-hidden rounded-[1.25rem] border border-white/8 bg-espresso"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={fabric.image}
                  alt={fabric.name}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-xl text-champagne">{fabric.name}</h3>
                <p className="mt-1 text-[11px] tracking-[0.14em] text-muted uppercase">
                  {fabric.note}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {fabric.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-2 py-1 text-[11px] text-ivory/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ColourRange() {
  return (
    <section className="border-y border-white/5 bg-espresso/40 py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Colour range</SectionLabel>
        <SectionTitle>Pick the shade that belongs.</SectionTitle>
        <div className="mt-10 flex flex-wrap gap-6 md:gap-8">
          {colours.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-2">
              <span
                className="h-12 w-12 rounded-full border border-white/15 shadow-inner md:h-14 md:w-14"
                style={{ background: c.hex }}
              />
              <span className="text-xs text-muted">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MatchRoom() {
  return (
    <section className="bg-onyx py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Match my room</SectionLabel>
        <SectionTitle>
          Your tiles. Your curtains. <Em>Your sofa.</Em>
        </SectionTitle>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5">
          {[
            {
              title: "Warm Hamptons",
              note: "Warm, layered and calm. The classic living room.",
              imgs: ["/images/living-marble.jpeg", "/images/dining-set.jpeg", "/images/sofa-detail.jpeg"],
            },
            {
              title: "Soft Modern",
              note: "Clean lines with soft neutrals and quiet timber.",
              imgs: ["/images/curved-sofas.jpeg", "/images/living-l-sofa.jpeg", "/images/4-seats-dinning.jpeg"],
            },
            {
              title: "Hosting Ready",
              note: "Tables and chairs that invite people to linger.",
              imgs: ["/images/6-seats-dinning.jpeg", "/images/dining-close.jpeg", "/images/logo.jpeg"],
            },
            {
              title: "Corner Comfort",
              note: "Deep seats for the wall you walk past every day.",
              imgs: ["/images/long-l-sofa.jpeg", "/images/living-l-sofa.jpeg", "/images/sofa-detail.jpeg"],
            },
          ].map((card) => (
            <article
              key={card.title}
              className="rounded-[1.25rem] border border-white/8 bg-espresso p-4"
            >
              <div className="mb-4 grid grid-cols-3 gap-2">
                {card.imgs.map((src) => (
                  <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-lg">
                    <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                  </div>
                ))}
              </div>
              <h3 className="font-serif text-xl text-ivory">{card.title}</h3>
              <p className="mt-2 text-sm text-muted">{card.note}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/8 bg-espresso/70 p-5 md:flex-row md:items-center">
          <p className="text-sm text-ivory/90">Send us a photo of your room — we match fabrics and sizes.</p>
          <WaButton message="Hi — here’s my room photo. Please help match fabrics and sizes.">
            Send my room photo
          </WaButton>
        </div>
      </div>
    </section>
  );
}

export function SizeGuideTeaser() {
  return (
    <section className="bg-onyx py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Sizes for real rooms</SectionLabel>
        <SectionTitle>
          Not showrooms. <Em>Your room.</Em>
        </SectionTitle>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5">
          {[
            { seats: "4 seats", size: "Round · 110 cm", img: "/images/4-seats-dinning.jpeg" },
            { seats: "6 seats", size: "Rectangular · 170 cm", img: "/images/6-seats-dinning.jpeg" },
            { seats: "8 seats", size: "Rectangular · 220 cm", img: "/images/dining-set.jpeg" },
          ].map((item) => (
            <article
              key={item.seats}
              className="overflow-hidden rounded-[1.25rem] border border-white/8 bg-espresso"
            >
              <div className="relative aspect-[4/3]">
                <Image src={item.img} alt={item.seats} fill className="object-cover" sizes="33vw" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-2xl text-champagne">{item.seats}</h3>
                <p className="mt-1 text-sm text-muted">{item.size}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <OutlineButton href="/size-guide">Open the full size guide</OutlineButton>
        </div>
      </div>
    </section>
  );
}

export function CustomDesign() {
  return (
    <section className="bg-onyx py-16">
      <div className="mx-auto grid max-w-7xl items-stretch gap-0 overflow-hidden rounded-[1.5rem] border border-white/8 lg:grid-cols-2">
        <div className="relative min-h-[360px]">
          <Image
            src="/images/dining-set.jpeg"
            alt="Custom dining set"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
        <div className="bg-espresso p-8 md:p-12">
          <SectionLabel>Custom design</SectionLabel>
          <SectionTitle>
            Not quite right? <Em>Make it yours.</Em>
          </SectionTitle>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Length, depth, timber tone, fabric and seat count — we build around the room you already
            live in.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-ivory/90">
            {[
              "Any length, width or seat count",
              "Timber tone and finish",
              "Fabric and colour matched to your room",
              "Delivery and professional setup",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-antique-gold" />
                {item}
              </li>
            ))}
          </ul>
          <GoldButton href="/custom-design" className="mt-8">
            Start your design
          </GoldButton>
        </div>
      </div>
    </section>
  );
}

export function SaleBanner() {
  return (
    <section className="bg-onyx py-8">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-6 rounded-[1.35rem] border border-antique-gold/25 bg-[linear-gradient(120deg,#2a1c14,#1a110d_45%,#3a2818)] p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <span className="mb-2 inline-flex rounded-full bg-champagne px-2.5 py-1 text-[10px] font-semibold tracking-wide text-onyx">
              SALE
            </span>
            <h2 className="font-serif text-3xl text-ivory md:text-4xl">The Home Update Sale.</h2>
          </div>
          <div className="flex items-center gap-3 sale-tick">
            {[
              ["04", "Days"],
              ["12", "Hrs"],
              ["33", "Min"],
            ].map(([n, l]) => (
              <div
                key={l}
                className="min-w-[4.2rem] rounded-xl bg-onyx/70 px-3 py-2 text-center"
              >
                <p className="font-serif text-2xl text-champagne">{n}</p>
                <p className="text-[10px] tracking-wide text-muted uppercase">{l}</p>
              </div>
            ))}
          </div>
          <GoldButton href="/sale">Shop the sale</GoldButton>
        </div>
      </div>
    </section>
  );
}

export function JournalTeaser() {
  return (
    <section className="bg-onyx py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>From the journal</SectionLabel>
        <SectionTitle>
          Ideas that change how you <Em>see home.</Em>
        </SectionTitle>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5">
          {journal.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group overflow-hidden rounded-[1.25rem] border border-white/8 bg-espresso"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl leading-snug text-ivory group-hover:text-champagne">
                  {post.title}
                </h3>
                <div className="mt-4 flex items-center justify-between text-xs text-muted">
                  <span>{post.minutes} min read</span>
                  <span className="text-champagne">Read article →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  const reasons = [
    "You see exactly what you are getting — real room photos.",
    "Sizes are made for Kenyan rooms, not foreign showrooms.",
    "Fabrics chosen for spills, pets and everyday living.",
    "One WhatsApp message gets you price, options and timing.",
  ];
  return (
    <section className="bg-onyx py-16">
      <div className="mx-auto grid max-w-7xl items-stretch gap-8 px-5 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col justify-center">
          <SectionLabel>Why Home Update</SectionLabel>
          <SectionTitle>
            Buying furniture should feel <Em>easy.</Em>
          </SectionTitle>
          <ol className="mt-8 space-y-5">
            {reasons.map((reason, i) => (
              <li key={reason} className="flex gap-4">
                <span className="font-serif text-2xl text-antique-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="pt-1 text-sm leading-relaxed text-ivory/90 md:text-base">{reason}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem]">
          <Image
            src="/images/6-seats-dinning.jpeg"
            alt="Dining set styled in a modern home"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
      </div>
    </section>
  );
}

export function HelpBubble() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-4 z-40 flex max-w-[240px] items-center gap-3 rounded-2xl border border-white/10 bg-espresso/95 p-3 shadow-2xl backdrop-blur transition hover:-translate-y-0.5 md:right-6 md:bottom-6"
    >
      <span className="relative h-11 w-11 overflow-hidden rounded-full border border-wa/40">
        <Image src="/images/logo.jpeg" alt="" fill className="object-cover object-top" sizes="44px" />
      </span>
      <span>
        <span className="block text-xs text-wa">Online on WhatsApp</span>
        <span className="block text-sm text-ivory">Need help choosing?</span>
      </span>
    </a>
  );
}
