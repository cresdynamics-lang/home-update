# Owner confirmation checklist

These are **placeholders until the owner signs off**. They are deliberately
visible in the product flow so no unconfirmed claim is published as fact.

## Status: BETA — placeholders in place

Nothing below is presented as confirmed. Where a value is unknown the site shows
"Ask for today's price", hides the timer, or shows an explicit placeholder.

## Must confirm before public beta

- [ ] **Prices** — real KES figures and price tiers for every product, in
      `src/data/products.ts` (`priceFrom`). Until then every price reads
      "Ask for today's price".
- [ ] **Lead times** — real business-day windows per product, plus any
      made-to-order exceptions.
- [ ] **Warranty terms** — replace the placeholder warranty string on every
      product.
- [ ] **Delivery zones** — which counties and areas you deliver to, and the
      delivery/setup fee.
- [ ] **Showroom address and opening hours** — currently "Nairobi, Kenya" and
      "Mon–Sat · 9am–6pm" in `src/lib/site.ts`, and in the `FurnitureStore`
      JSON-LD in `src/app/layout.tsx`. The schema currently omits the street
      address entirely rather than guessing it.
- [ ] **Fabric and finish photography** — 6–8 images per product, and a real
      image for each fabric/colour/timber combination. The `variants` map in
      `src/data/products.ts` currently points at placeholder imagery so that
      swapping visibly works; these must be replaced with real shots.
- [ ] **Proof badge video** — a short muted loop of liquid beading for the
      water-resistant / wipe-clean claims. The video slot exists; without the
      clip the UI shows an honest placeholder instead of the claim.
- [ ] **3D models** — approved `.glb` (Android Scene Viewer) and `.usdz` (iOS
      Quick Look) per product. AR stays hidden until a real model exists.
- [ ] **Water-resistance wording** — every sofa claim is qualified as applying to
      **covered balconies**. Confirm this is accurate before it goes live.
- [ ] **Clearance assumptions** — the 90 cm walkway and 60 cm chair pull-out
      values, and each product's `minRoom`, drive the simulator verdicts.
- [ ] **Room-fit review** — check the fit verdicts against real pieces.
- [ ] **Sale end date** — only set `siteConfig.saleEnd` to a genuine end date.
      While it is `null` no timer or end date is shown at all.

## Verified working with no 3D assets

Everything functions today. AR is hidden by feature flag and falls back to the
2D clearance simulator. All product, category and journal pages are statically
generated, and the build, typecheck and lint are clean.