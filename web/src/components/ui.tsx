import Link from "next/link";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "./icons";
import { site, waLink } from "@/lib/site";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function WaButton({
  children = "Chat on WhatsApp",
  message,
  className,
  pulse,
}: {
  children?: React.ReactNode;
  message?: string;
  className?: string;
  pulse?: boolean;
}) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-full bg-wa px-5 py-3 text-sm font-medium text-white transition hover:bg-wa-dark",
        pulse && "wa-pulse",
        className,
      )}
    >
      <WhatsAppIcon className="h-4 w-4" />
      {children}
    </a>
  );
}

export function GoldButton({ children, href, className, external }: ButtonProps) {
  const classes = cx(
    "inline-flex items-center justify-center gap-2 rounded-full bg-champagne px-5 py-3 text-sm font-medium text-onyx transition hover:bg-antique-gold",
    className,
  );
  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
          <ArrowIcon className="h-4 w-4" />
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
        <ArrowIcon className="h-4 w-4" />
      </Link>
    );
  }
  return <button className={classes}>{children}</button>;
}

export function OutlineButton({ children, href, className }: ButtonProps) {
  const classes = cx(
    "inline-flex items-center justify-center gap-2 rounded-full border border-antique-gold/60 px-5 py-3 text-sm font-medium text-ivory transition hover:border-champagne hover:text-champagne",
    className,
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <button className={classes}>{children}</button>;
}

export function CallButton({ className }: { className?: string }) {
  return (
    <a
      href={`tel:${site.phoneTel}`}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-full border border-antique-gold/60 px-5 py-3 text-sm font-medium text-ivory transition hover:border-champagne hover:text-champagne",
        className,
      )}
    >
      <PhoneIcon className="h-4 w-4 text-antique-gold" />
      Call {site.phoneDisplay}
    </a>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-medium tracking-[0.22em] text-antique-gold uppercase">
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cx(
        "font-serif text-3xl leading-tight text-ivory md:text-4xl lg:text-[2.75rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Em({ children }: { children: React.ReactNode }) {
  return <em className="font-serif text-antique-gold italic">{children}</em>;
}
