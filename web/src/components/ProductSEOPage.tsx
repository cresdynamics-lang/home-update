import Link from "next/link";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { ProductCard } from "@/components/ProductCard";
import { productStructuredData } from "@/lib/seo";
import { products, type Product } from "@/data/products";

const profiles: Record<string, { overview: string; planning: string; related: string[] }> = {
  fluted: {
    overview: "The Fluted is listed as a six-seat dining set with a 170 × 90 cm tabletop footprint. Use those figures as the starting point for planning the table position, chair pull-out and the route between the dining area and nearby rooms. The product page shows the currently listed finish and configuration choices; ask us to confirm what is available for the order you have in mind.",
    planning: "Before choosing The Fluted, measure the clear floor area rather than the room wall-to-wall. Mark the table footprint, chairs in use, door swings and the main path through the room. Also measure the narrowest doorway, stair turn or lift on the route to the dining area. Share these measurements with us so we can confirm the listed size and discuss whether a different specification is available.",
    related: ["regent", "orbit", "ivory"],
  },
  orbit: {
    overview: "The Orbit is listed as a round four-seat dining set with a 110 cm tabletop footprint. A round table can be useful when people need to move around a compact dining area, but the complete arrangement also depends on the chair size and the space needed to pull each chair out. Confirm the current options and measurements before placing an order.",
    planning: "Mark a circle for the table and include the chairs in their pulled-out position. Check that the route to the kitchen, balcony or living area stays usable and that doors can open fully. Measure the entry route to the room as well as the dining space itself. If you send the room dimensions and a photo, we can discuss the fit and confirm the current model specification.",
    related: ["ivory", "fluted", "regent"],
  },
  ivory: {
    overview: "The Ivory is listed as a four-seat dining set with a 160 × 90 cm footprint. Compare its listed dimensions with the usable part of your room, including space for chairs, serving and everyday movement. The photos and finish controls help you explore the current presentation; contact us to confirm the actual colours, upholstery and timber options available for a new order.",
    planning: "Write down the room's clear length and width, then sketch the table position and chairs. Include door openings, cupboards and the walkway people use most often. Check the delivery path from the building entrance to the room, especially tight turns and stairwells. Send the figures to us before ordering so we can review the fit against the currently listed dimensions.",
    related: ["orbit", "fluted", "regent"],
  },
  regent: {
    overview: "The Regent is listed as an eight-seat dining set with a 220 × 100 cm footprint. For a larger table, room planning matters as much as the top dimensions: allow for occupied chairs, serving access and the paths people use to move through the space. Confirm the seating arrangement and current specification with us before making plans around the listed size.",
    planning: "Measure the room's usable area and check how the table would sit beside walls, windows, storage and adjacent furniture. Sketch the chairs pulled out, then check the path around them. Measure access from the entrance through corridors, lifts and stairs. Share these details with us to discuss whether the Regent's listed dimensions suit the room and whether another configuration is available.",
    related: ["fluted", "ivory", "orbit"],
  },
  cloud: {
    overview: "The Cloud is listed as a curved L-shaped sofa measuring 280 × 170 × 80 cm, with the configuration choices shown on this page. An L-shaped footprint can serve a corner or define part of an open living area, but the longer and shorter sides need to be checked against the real room layout. Confirm the current configuration and measurements before ordering.",
    planning: "Mark both arms of the L on a floor plan, then include side tables, doors and the route people use across the room. Check whether the chaise orientation shown in your selection works with windows and access points. Measure the building entry route, lift and stair turns. Send a room photo and measurements so we can help confirm the listed footprint and available orientation.",
    related: ["linen", "truffle"],
  },
  truffle: {
    overview: "The Truffle is listed as a modular sectional sofa measuring 300 × 180 × 82 cm. The page presents several layout choices to help you compare how a sectional might sit in an open living area. Confirm the modules, total dimensions and available fabrics for the particular arrangement you want before relying on the on-page selections.",
    planning: "Sketch the full layout, including each side of the sectional, nearby tables and the main walking route. Measure the room and every narrow point on the delivery route. If the building has a lift, confirm its internal dimensions and door opening. Share a floor plan or photo with measurements so we can check the proposed configuration against the listed product details.",
    related: ["cloud", "linen"],
  },
  linen: {
    overview: "The Linen is listed as an L-shaped sofa measuring 270 × 165 × 78 cm, with left- and right-chaise choices shown on this page. Compare both orientations against the room's windows, doors and circulation path before choosing. Ask us to confirm which layouts and upholstery options are available for a current order.",
    planning: "Use masking tape or a room sketch to mark the long side and chaise depth. Include the coffee table, door swing and clear path to other parts of the home. Check the access route into the room, since the building entrance and stairs can be more restrictive than the final position. Send those measurements to us and ask us to confirm the selected orientation and dimensions.",
    related: ["cloud", "truffle"],
  },
};

export function ProductSEOPage({ product }: { product: Product }) {
  const profile = profiles[product.id] ?? {
    overview: `${product.name} is a concept preview with listed dimensions of ${product.dimensions.w} × ${product.dimensions.d} × ${product.dimensions.h} cm. Confirm that the specification, materials, price and availability are approved before ordering.`,
    planning: `Measure the room footprint and the narrowest access route, then compare them with the listed ${product.dimensions.w} × ${product.dimensions.d} cm footprint. The photography is illustrative concept imagery, not a photograph of this exact product. Ask Home Update to confirm the design and finish before purchase.`,
    related: product.pairedProducts ?? [],
  };
  const similar = products.filter((item) => profile?.related.includes(item.id));
  const categoryLabel = product.category === "dining" ? "dining sets" : product.category === "sofa" ? "sofas" : product.category === "tv-stands" ? "TV stands" : "coffee tables";
  const faqs = [
    {
      question: `What is the current price of ${product.name}?`,
      answer: "Prices can depend on the chosen specification and current availability. Ask us on WhatsApp to confirm today's price before ordering.",
    },
    {
      question: `Will ${product.name} fit my room?`,
      answer: `The listed dimensions are ${product.dimensions.w} × ${product.dimensions.d} × ${product.dimensions.h} cm. Measure the room, clearances and access route, then ask us to confirm the product dimensions and fit for your layout.`,
    },
    {
      question: `What are the lead time and warranty for ${product.name}?`,
      answer: "Lead time and warranty terms need to be confirmed for the selected specification. Ask us for the current details before placing an order.",
    },
  ];
  const structuredData = [
    ...productStructuredData(product),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ProductDetailClient product={product} />
      <section className="mx-auto max-w-6xl space-y-10 px-5 pb-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl text-champagne">About {product.name}</h2>
            <p className="mt-3 leading-relaxed text-ivory/85">{profile?.overview}</p>
          </div>
          <div>
            <h2 className="font-serif text-2xl text-champagne">Plan the room and access route</h2>
            <p className="mt-3 leading-relaxed text-ivory/85">{profile?.planning}</p>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-champagne">Options and order details to confirm</h2>
          <p className="mt-3 leading-relaxed text-ivory/85">
            The page lists {product.layoutOptions.join(", ")} layouts and {product.fabrics.join(", ")} upholstery names, together with colour choices. These are options to discuss, not a guarantee that every combination is currently available. Ask us to confirm the selected configuration, materials, care instructions, current price, production lead time, delivery arrangements and warranty terms. If you are considering a custom specification, send the dimensions and finish preferences so we can tell you whether that change is possible and quote it accurately.
          </p>
        </div>

        <div>
          <h2 className="font-serif text-2xl text-champagne">Frequently asked questions</h2>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-medium text-ivory">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {similar.length > 0 ? (
          <div>
            <h2 className="font-serif text-2xl text-champagne">{product.category === "coffee-tables" ? "Pairs well with sectional sofas" : `Compare similar ${categoryLabel}`}</h2>
            <p className="mt-2 text-sm text-muted">Compare listed footprints and configurations. Ask us to confirm current product options and prices.</p>
            <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-3">
              {similar.map((item) => <ProductCard key={item.id} product={item} />)}
            </div>
          </div>
        ) : null}
        <p className="text-sm text-muted">
          <Link className="underline" href={product.category === "dining" ? "/size-guide/dining-table-size-guide/" : product.category === "sofa" ? "/size-guide/sofa-size-guide/" : "/size-guide/"}>Read the {product.category} size guide</Link>
          {" · "}
          <Link className="underline" href="/fabrics-and-colours/">Explore fabric and colour options</Link>
        </p>
      </section>
    </>
  );
}
