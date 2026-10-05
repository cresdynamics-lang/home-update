import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { CompareDock } from "@/components/CompareDock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HelpBubble } from "@/components/home";
import { Prompts } from "@/components/Prompts";
import { MetaPixel } from "@/components/MetaPixel";
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
    default: `${site.name} | Dining sets & sofas made to fit your home`,
    template: `%s | ${site.name}`,
  },
  description:
    "Premium dining sets and sofas designed for real Kenyan homes. Custom sizes, forgiving fabrics, delivery & setup. Chat on WhatsApp for today's price.",
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_KE",
    url: site.url,
    title: `${site.name} | Dining sets & sofas made to fit your home`,
    description:
      "Premium dining sets and sofas designed for real Kenyan homes. Custom sizes, forgiving fabrics, delivery & setup.",
    images: [{ url: "/images/curved-sofas.jpeg", width: 1200, height: 630, alt: "Curved sofa in a modern living room" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Dining sets & sofas`,
    description: "Premium dining sets and sofas made to fit real Kenyan homes.",
    images: ["/images/curved-sofas.jpeg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: site.name,
  image: `${site.url}/images/curved-sofas.jpeg`,
  url: site.url,
  telephone: site.phoneTel,
  email: site.email,
  priceRange: "KES",
  address: {
    "@type": "PostalAddress",
    // TODO(OWNER): replace with the confirmed showroom address.
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  areaServed: { "@type": "Country", name: "Kenya" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-KE"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-onyx font-sans text-ivory">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <HelpBubble />
        <CompareDock />
        <Prompts />
        <MetaPixel />
      </body>
    </html>
  );
}