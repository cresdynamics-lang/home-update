import {
  Bestsellers,
  ColourRange,
  CustomDesign,
  FabricsSection,
  Hero,
  JournalTeaser,
  MatchRoom,
  RoomsSection,
  SaleBanner,
  SizeGuideTeaser,
  ValueBar,
  WhyUs,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueBar />
      <RoomsSection />
      <Bestsellers />
      <FabricsSection />
      <ColourRange />
      <MatchRoom />
      <SizeGuideTeaser />
      <CustomDesign />
      <SaleBanner />
      <JournalTeaser />
      <WhyUs />
    </>
  );
}
