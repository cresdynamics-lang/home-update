"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import {
  DropIcon,
  LayersIcon,
  PhoneIcon,
  RulerIcon,
  TruckIcon,
} from "./icons";
import { Em, GoldButton, OutlineButton, SectionLabel, SectionTitle, WaButton } from "./ui";
import { track } from "@/lib/analytics";
import { TrackedWhatsAppLink } from "@/components/TrackedWhatsAppLink";
import {
  colours,
  fabrics,
  journal,
  products,
  rooms,
  site,
  siteConfig,
  waLink,
  writeRoom,
} from "@/lib/site";

export function Hero() {
  return (
    <>
    <section className="relative flex min-h-[60svh] flex-col overflow-hidden sm:min-h-[64vh] lg:min-h-[76vh]">
      <div className="hero-scene absolute inset-0" aria-hidden="true">
        <Image
          src="/images/living-l-sofa.jpeg"
          alt=""
          fill
          priority
          className="hero-scene-image object-cover object-center"
          sizes="100vw"
        />
        <div className="hero-scene-light" />
      </div>
      <div className="hero-scrim absolute inset-0" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start px-5 pt-4 pb-0 sm:pt-14 sm:pb-12 md:justify-center md:pt-20 lg:px-8">
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
              onClick={() => track("whatsapp_click", { product: "The Truffle", ctaLocation: "hero-featured" })}
              className="mt-2 inline-block text-sm text-champagne hover:text-ivory"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask for today’s price →
            </a>
          </div>
        </div>

        <div className="max-w-2xl">
          <p className="animate-fade-up mb-3 text-[11px] tracking-[0.22em] text-champagne uppercase sm:mb-4">
            Home Update Furniture · Nairobi, Kenya
          </p>
          <h1 className="animate-fade-up-delay max-w-3xl font-serif text-3xl leading-[1.08] text-champagne sm:text-4xl lg:text-5xl xl:text-6xl">
            Sofas and dining sets <span className="text-ivory italic">made to fit home.</span>
          </h1>
          <p className="animate-fade-up-delay-2 mt-3 max-w-xl text-base leading-relaxed text-ivory/85 sm:mt-5 md:text-lg">
            Explore real furniture, compare sizes and finishes, or share your room measurements so
            our team can help you choose.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4 sm:mt-8">
            <WaButton pulse>Chat on WhatsApp for today’s price</WaButton>
            <Link href="/shop/" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/50 px-5 py-3 text-sm font-medium text-ivory transition hover:border-champagne hover:text-champagne">
              Explore furniture
            </Link>
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

    </section>
    <section aria-labelledby="fit-finder-title" className="relative z-10 bg-onyx px-5 py-3 sm:py-9 lg:px-8">
      <FitFinder />
    </section>
    </>
  );
}

function FitFinder() {
  const [room, setRoom] = useState("Choose a room");
  const [seats, setSeats] = useState("Not sure yet");
  const [fabric, setFabric] = useState("Not sure");
  const [colour, setColour] = useState("Not sure");
  const [roomLength, setRoomLength] = useState("");
  const [roomWidth, setRoomWidth] = useState("");

  const message = useMemo(
    () =>
      `Hi Home Update — I’m looking for a ${room.toLowerCase()} piece for ${seats.toLowerCase()} with a ${fabric.toLowerCase()} finish in ${colour} colour. My room is ${roomLength} m × ${roomWidth} m. Please review my measurements and advise what may work, then send the current price.`,
    [room, seats, fabric, colour, roomLength, roomWidth],
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const lengthM = Number(roomLength);
        const widthM = Number(roomWidth);
        if (!Number.isFinite(lengthM) || !Number.isFinite(widthM) || lengthM <= 0 || widthM <= 0) return;
        writeRoom({ lengthM, widthM });
        track("whatsapp_click", { ctaLocation: "fit-finder" });
        window.open(waLink(message), "_blank", "noopener,noreferrer");
      }}
      className="mx-auto grid max-w-7xl grid-cols-2 gap-2 rounded-xl border border-antique-gold/35 bg-espresso p-3 shadow-xl sm:gap-4 sm:p-5 lg:grid-cols-4 lg:items-end"
    >
      <div className="col-span-2 lg:col-span-4">
        <h2 id="fit-finder-title" className="font-serif text-xl text-ivory sm:text-2xl">Room advice from our team</h2>
        <p className="mt-1 hidden text-xs text-muted sm:block">Share your measurements and preferences. Our team will recommend options personally.</p>
      </div>
      <label className="min-w-0">
        <span className="mb-1 block text-[10px] tracking-[0.16em] text-muted uppercase sm:mb-1.5">Room length (m)</span>
        <input type="number" min="1" max="20" step="0.1" required value={roomLength} onChange={(event) => { const value = event.target.value; setRoomLength(value); const lengthM = Number(value); const widthM = Number(roomWidth); if (lengthM > 0 && widthM > 0) writeRoom({ lengthM, widthM }); }} className="min-h-11 w-full min-w-0 rounded-xl border border-white/10 bg-onyx px-2 text-sm text-ivory outline-none focus:border-antique-gold/50 sm:min-h-12 sm:px-3" />
      </label>
      <label className="min-w-0">
        <span className="mb-1 block text-[10px] tracking-[0.16em] text-muted uppercase sm:mb-1.5">Room width (m)</span>
        <input type="number" min="1" max="20" step="0.1" required value={roomWidth} onChange={(event) => { const value = event.target.value; setRoomWidth(value); const widthM = Number(value); const lengthM = Number(roomLength); if (lengthM > 0 && widthM > 0) writeRoom({ lengthM, widthM }); }} className="min-h-11 w-full min-w-0 rounded-xl border border-white/10 bg-onyx px-2 text-sm text-ivory outline-none focus:border-antique-gold/50 sm:min-h-12 sm:px-3" />
      </label>
      <button
        type="submit"
        className="col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-champagne px-4 py-2.5 text-xs font-medium text-onyx transition hover:bg-antique-gold sm:min-h-12 sm:px-5 sm:py-3 sm:text-sm lg:col-span-1"
      >
        Ask our team on WhatsApp
      </button>
      <details className="col-span-2 border-t border-white/10 pt-2 lg:col-span-4">
        <summary className="min-h-10 cursor-pointer py-2 text-xs text-champagne sm:text-sm">More preferences: room, seats and finish</summary>
        <div className="grid grid-cols-2 gap-2 pt-2 sm:gap-4 lg:grid-cols-4">
          {(
            [
              ["Room", ["Dining room", "Living room", "Both"], room, setRoom],
              ["Seats / Size", ["4 seats", "6 seats", "8 seats", "Custom"], seats, setSeats],
              ["Fabric", ["Not sure", "Velvet", "Bouclé", "Linen blend"], fabric, setFabric],
              ["Colour", ["Not sure", "Cream", "Truffle", "Charcoal"], colour, setColour],
            ] as const
          ).map(([label, options, value, setter]) => (
            <label key={label} className="min-w-0">
              <span className="mb-1 block text-[10px] tracking-[0.16em] text-muted uppercase">{label}</span>
              <select value={value} onChange={(event) => setter(event.target.value)} className="min-h-11 w-full min-w-0 appearance-none rounded-xl border border-white/10 bg-onyx px-2 text-xs text-ivory outline-none focus:border-antique-gold/50 sm:min-h-12 sm:px-3 sm:text-sm">
                {options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
          ))}
        </div>
      </details>
      <Link href="/size-guide/" className="col-span-2 inline-flex min-h-9 items-center justify-center text-xs text-champagne underline underline-offset-4 hover:text-ivory sm:min-h-11 sm:text-sm lg:col-span-4">
        Open the visual room simulator
      </Link>
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
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 50vw, 33vw"
                />
                <span className="absolute top-3 left-3 rounded-full bg-champagne px-2.5 py-1 text-[10px] font-semibold tracking-wide text-onyx uppercase">
                  {product.bestseller ? "Bestseller" : product.sale ? "Sale" : "Featured"}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-2xl text-ivory">{product.name}</h3>
                <p className="mt-1 text-[11px] tracking-[0.16em] text-muted uppercase">
                  {product.subtype}
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
                  <span>{product.dimensions.w} × {product.dimensions.d} cm</span>
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
                  {product.priceFrom ? `KES ${product.priceFrom.toLocaleString("en-KE")}` : "Ask for today’s price"}
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
  const [projectType, setProjectType] = useState("Sofa");
  const [roomLength, setRoomLength] = useState("");
  const [roomWidth, setRoomWidth] = useState("");
  const [designNotes, setDesignNotes] = useState("");

  const handleDesignInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = [
      "Hi Home Update, I'd like to discuss a custom design.",
      `I'm interested in: ${projectType}.`,
      `My room measures ${roomLength} m x ${roomWidth} m.`,
      designNotes.trim() ? `What I have in mind: ${designNotes.trim()}.` : "",
      "Please review the room measurements and advise what dimensions you recommend, along with finish options and a quote.",
    ].filter(Boolean).join(" ");

    track("whatsapp_click", { ctaLocation: "custom-design-room-measurements" });
    window.open(waLink(message), "_blank", "noopener,noreferrer");
  };

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
          <form onSubmit={handleDesignInquiry} className="mt-8 border-t border-white/10 pt-6">
            <h3 className="font-serif text-xl text-ivory">Share your room measurements</h3>
            <p className="mt-1 text-sm text-muted">Our team will review them and help plan a piece for your space.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-xs text-muted sm:col-span-2">
                What are you planning?
                <select value={projectType} onChange={(event) => setProjectType(event.target.value)} className="mt-1.5 min-h-11 w-full border border-white/10 bg-onyx px-3 text-sm text-ivory">
                  <option>Sofa</option>
                  <option>Dining set</option>
                  <option>Other custom furniture</option>
                </select>
              </label>
              <label className="text-xs text-muted">
                Room length (m)
                <input type="number" min="0.1" max="50" step="0.1" required value={roomLength} onChange={(event) => setRoomLength(event.target.value)} placeholder="e.g. 4.2" className="mt-1.5 min-h-11 w-full border border-white/10 bg-onyx px-3 text-sm text-ivory placeholder:text-muted" />
              </label>
              <label className="text-xs text-muted">
                Room width (m)
                <input type="number" min="0.1" max="50" step="0.1" required value={roomWidth} onChange={(event) => setRoomWidth(event.target.value)} placeholder="e.g. 3.5" className="mt-1.5 min-h-11 w-full border border-white/10 bg-onyx px-3 text-sm text-ivory placeholder:text-muted" />
              </label>
              <label className="text-xs text-muted sm:col-span-2">
                Design notes (optional)
                <textarea value={designNotes} onChange={(event) => setDesignNotes(event.target.value)} rows={2} placeholder="Preferred size, finish, or anything else to consider" className="mt-1.5 w-full border border-white/10 bg-onyx px-3 py-2 text-sm text-ivory placeholder:text-muted" />
              </label>
            </div>
            <button type="submit" className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-wa px-5 py-3 text-sm font-medium text-white transition hover:brightness-110 sm:w-auto">
              Discuss my room on WhatsApp
            </button>
          </form>
          <div className="mt-8 flex flex-wrap gap-3">
            <GoldButton href="/custom-design">Start your design</GoldButton>
            <TrackedWhatsAppLink
              href={waLink("Hi Home Update, I'd like to send my custom furniture design. Please help me confirm dimensions, finishes and a quote.")}
              ctaLocation="custom-design"
              initiateCheckout
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-antique-gold/60 px-5 py-3 text-sm font-medium text-ivory transition hover:border-champagne hover:text-champagne"
            >
              Send My Design on WhatsApp
            </TrackedWhatsAppLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SaleBanner() {
  // No urgency is faked: nothing renders unless the owner has set a real end
  // date in siteConfig. The date is printed statically (deterministic, and
  // visible to crawlers) rather than ticking on the client.
  const saleEndIso = siteConfig.saleEnd;

  return (
    <section className="bg-onyx py-8">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-6 rounded-[1.35rem] border border-antique-gold/25 bg-[linear-gradient(120deg,#2a1c14,#1a110d_45%,#3a2818)] p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <span className="mb-2 inline-flex rounded-full bg-champagne px-2.5 py-1 text-[10px] font-semibold tracking-wide text-onyx">
              SALE
            </span>
            <h2 className="font-serif text-3xl text-ivory md:text-4xl">The Home Update Sale.</h2>
            {saleEndIso ? (
              <p className="mt-2 text-sm text-champagne">Ends {formatDate(saleEndIso)}</p>
            ) : null}
          </div>
          <GoldButton href="/sale">Shop the sale</GoldButton>
        </div>
      </div>
    </section>
  );
}

/** Deterministic date format: fixed locale and timezone, no client/server drift. */
function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-KE", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Africa/Nairobi",
    });
  } catch {
    return iso;
  }
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
      onClick={() => track("whatsapp_click", { ctaLocation: "help-bubble" })}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-6 z-40 hidden max-w-[240px] items-center gap-3 rounded-2xl border border-white/10 bg-espresso/95 p-3 shadow-2xl backdrop-blur transition hover:-translate-y-0.5 md:flex md:right-6 md:bottom-6"
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
