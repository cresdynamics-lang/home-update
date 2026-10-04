import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-24 text-center">
      <p className="text-xs tracking-[0.2em] text-antique-gold uppercase">404 · Page not found</p>
      <h1 className="mt-3 font-serif text-4xl text-ivory">Let&apos;s find the right piece.</h1>
      <p className="mx-auto mt-4 max-w-xl text-muted">That page may have moved. Browse the furniture collection or send us a question on WhatsApp.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/dining-sets/" className="rounded-full bg-champagne px-5 py-3 text-sm font-medium text-onyx">Dining sets</Link>
        <Link href="/sofas/" className="rounded-full border border-antique-gold/50 px-5 py-3 text-sm text-ivory">Sofas</Link>
        <Link href="/size-guide/" className="rounded-full border border-antique-gold/50 px-5 py-3 text-sm text-ivory">Size guides</Link>
        <Link href="/contact/" className="rounded-full border border-antique-gold/50 px-5 py-3 text-sm text-ivory">Contact</Link>
      </div>
    </main>
  );
}
