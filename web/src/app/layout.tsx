import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { CompareDock } from "@/components/CompareDock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HelpBubble } from "@/components/home";
import { Prompts } from "@/components/Prompts";
import { GoogleTagManager } from "@/components/GoogleTagManager";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Dining Sets & Sofas in Nairobi | Home Update",
    template: "%s",
  },
  description:
    "Shop dining sets and sofas made for Kenyan homes. Check room fit, choose finishes and ask today's price on WhatsApp.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_KE",
    images: [{ url: "/images/curved-sofas.jpeg", width: 1200, height: 630, alt: "Curved sofa in a modern living room" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/curved-sofas.jpeg"],
  },
  robots: { index: true, follow: true },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  telephone: site.phoneTel,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-KE"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-onyx font-sans text-ivory">
        <GoogleTagManager />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <HelpBubble />
        <CompareDock />
        <Prompts />
      </body>
    </html>
  );
}
