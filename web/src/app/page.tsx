import {
  Bestsellers,
  ColourRange,
  CustomDesign,
  FabricsSection,
  Hero,
  JournalTeaser,
  MatchRoom,
  RoomsSection,
  SizeGuideTeaser,
  ValueBar,
  WhyUs,
} from "@/components/home";
import { GoogleReviews } from "@/components/GoogleReviews";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dining Sets & Sofas in Nairobi | Home Update",
  description:
    "Shop dining sets and sofas made for Kenyan homes. Check room fit, choose finishes and ask today's price on WhatsApp.",
  alternates: { canonical: `${site.url}/`, languages: { "en-KE": `${site.url}/` } },
  openGraph: {
    title: "Dining Sets & Sofas in Nairobi | Home Update",
    description:
      "Shop dining sets and sofas made for Kenyan homes. Check room fit, choose finishes and ask today's price on WhatsApp.",
    url: `${site.url}/`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Dining Sets & Sofas in Nairobi | Home Update",
    description:
      "Shop dining sets and sofas made for Kenyan homes. Check room fit, choose finishes and ask today's price on WhatsApp.",
    images: ["/images/curved-sofas.jpeg"],
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueBar />
      <RoomsSection />
      <Bestsellers />
      <GoogleReviews />
      <FabricsSection />
      <ColourRange />
      <MatchRoom />
      <SizeGuideTeaser />
      <CustomDesign />
      <JournalTeaser />
      <WhyUs />
    </>
  );
}
import type { Metadata } from "next";
