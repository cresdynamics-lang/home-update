import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HelpBubble } from "@/components/home";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Dining sets & sofas made to fit your home`,
    template: `%s | ${site.name}`,
  },
  description:
    "Premium dining sets and sofas designed for real Kenyan homes. Custom sizes, forgiving fabrics, delivery & setup. Chat on WhatsApp for today’s price.",
  metadataBase: new URL("https://homeupdate.example"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable} h-full antialiased`}>
      <body className="min-h-full bg-onyx font-sans text-ivory">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <HelpBubble />
      </body>
    </html>
  );
}
