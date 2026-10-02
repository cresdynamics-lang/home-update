# Home Update Furniture

Premium dining sets & sofas site for **Home Update Furniture**, Nairobi, Kenya.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- TypeScript
- No runtime dependencies beyond React/Next

## Develop

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint    # eslint
npx tsc --noEmit
npm run build   # production build
npm start       # serve the build
```

## Brand

Design direction from the Home Update website preview: Onyx `#080808`, Espresso
`#14110E`, Timber `#8A5A36`, Antique Gold `#C9A45C`, Champagne `#E8CB8C`, Ivory
`#F1E8D6`. Cormorant Garamond for headlines, Jost for body and buttons. WhatsApp
green is reserved for the single primary action on a screen. Gold-on-black body
text uses Champagne, which meets WCAG AA on Onyx. Tokens live in
`src/app/globals.css`.

---

## Product data — single source of truth

Everything about the catalog lives in [`src/data/products.ts`](src/data/products.ts).
Nothing about a product is hard-coded in a component: price, lead time,
dimensions, fabrics, resilience claims and warranty are all read from this file.

Prices, lead times, water-resistance claims, warranty terms and delivery zones are
**placeholders until the owner confirms them**. When `priceFrom` is `null` the UI
renders `priceNote` ("Ask for today's price"). Nothing is ever shown as a fact
that has not been confirmed.

### Add a product

1. Open [`src/data/products.ts`](src/data/products.ts) and add an object to the
   `products` array.
2. Fill in the required fields:

   | Field | Notes |
   | --- | --- |
   | `id`, `slug`, `name` | `slug` becomes the URL: `/products/<slug>` |
   | `category` | `"dining"` or `"sofa"` |
   | `subtype`, `bestFor` | Shown on cards, pages and in the comparison matrix |
   | `tags` | e.g. `["bestseller", "sale"]` |
   | `priceFrom` | `number` or `null`. Keep `null` until prices are confirmed |
   | `priceNote` | e.g. `"Ask for today's price"` |
   | `dimensions` | `{ w, d, h }` in **cm** |
   | `seats` | Number, or omit for modular pieces |
   | `layoutOptions` | e.g. `["L-left chaise", "L-right chaise", "Modular"]` |
   | `fabrics`, `colours`, `woodFinishes` | Display names, matched to the tables in `src/lib/site.ts` |
   | `waterResistant` | Boolean. Keep `false`/flagged until confirmed |
   | `leadTimeDays` | `{ min, max }` in business days, or `"made to order"` |
   | `minRoom` | `{ w, d }` in **metres** |
   | `images` | 6–8 paths. First image is the card/default image |
   | `variants` | Maps each fabric/colour/wood to an image so swaps change the picture |
   | `resilience` | Which proof badges apply: `waterResistant`, `kidFriendly`, `petFriendly`, `wipeClean` |
   | `proofVideo` | Path to the liquid-beading clip, or `null` (renders an honest placeholder) |
   | `clearance` | `{ chairPulloutCm, corridorCm }` used by the simulator |
   | `model3d` | `{ glb?, usdz? }` or `null` |
   | `warranty`, `careNotes` | Copy shown on the product page |

3. Drop the media in [`public/images`](public/images).
4. If the product has approved 3D assets, add the files and reference them in
   `model3d`.

The page is statically generated automatically — `generateStaticParams` reads the
same array, so a new product needs no other wiring.

### Add product imagery

- Target **6–8 images per product**: front, angle, fabric close-up, dimension
  overlay, in-room, scale reference.
- Export as JPEG or PNG into [`public/images`](public/images). Next.js serves
  AVIF/WebP with responsive `srcset`, so **do not pre-compress** — just supply a
  clean master at the largest size you have.
- Always pass a correct `sizes` prop and descriptive `alt` text.
- For material swapping, add each fabric/colour/finish to `variants` and point it
  at the right image. Without it, swapping falls back to the product's first
  image. Current `variants` entries are **placeholders** pending real
  per-fabric photography.

### Add 3D files and enable AR

AR is feature-flagged and hidden unless a real model exists, so nothing fake ships.

1. Put the approved `.usdz` in [`public/models`](public/models) (create it) and
   the `.glb` alongside it.
2. Set `model3d: { glb: "/models/<name>.glb", usdz: "/models/<name>.usdz" }`.
3. iOS uses Quick Look via `<a rel="ar">`; Android hands the `.glb` to Scene
   Viewer. Set `siteConfig.ar.enabled = false` in `src/lib/site.ts` to switch AR
   off site-wide — the 2D simulator remains as the fallback.

---

## Site configuration

Edit `siteConfig` in [`src/lib/site.ts`](src/lib/site.ts):

- `saleEnd` — ISO date. **While it is `null` no sale countdown or end date is
  rendered at all.** Only set it to a real, confirmed end date; never fake urgency.
- `analytics` — disabled until you add an endpoint. Events (`compare_add`,
  `simulator_run`, `fabric_select`, `whatsapp_click`, `shortlist_send`) are still
  pushed to `window.dataLayer` so a tag manager can pick them up.
- `ar.enabled` — master switch for Web AR.
- `promo.fitFinderDelayMs` — delay before the one-per-session fit-finder prompt.

Contact details, nav and the 7-link menu are in the same file.

## How the site is built

- **Gallery** — thumbnail strip, swipe on mobile, arrow/keyboard navigation,
  pinch-to-zoom, and a cursor-tracking magnifier on desktop. The high-resolution
  image is only fetched on first interaction; upcoming variants are warmed
  through the optimiser so swaps feel instant.
- **Reactive materials** — fabric, colour, timber and layout swap the viewport
  with a 180 ms crossfade and update the text summary. The choice is saved
  locally and returned on the next visit.
- **Clearance simulator** — draws the room to scale, projects the footprint with
  its 90 cm walkway and 60 cm chair pull-out, and returns PASS / TIGHT / WON'T
  FIT with a one-line reason. Drag to place, double-click to rotate, switch
  between metres and centimetres. Your room size is remembered.
- **Comparison** — up to three pieces, with a "show differences only" toggle,
  best-value highlighting, a fit check against your saved room, a to-scale
  footprint overlay and a fabric comparison table.
- **WhatsApp funnel** — every page builds a pre-filled message containing the
  product, size, layout, fabric, colour, timber, your room size, any compared
  items and the page URL, sent as one tap to `wa.me/254743844362`.
- **Persistence** — shortlist, compare picks, room size and material choices are
  kept in `localStorage`, wrapped in try/catch with a graceful empty state, and
  shared across mounted components via `useSyncExternalStore`.

## Performance notes

Measured against the production build:

- Image weight on a product page: **1,441 KB → 113 KB** after routing variant
  preloading through the image optimiser (previously the preload helper fetched
  raw JPEGs from `/public`).
- Cumulative Layout Shift: **0–0.001** (target < 0.1).
- First-load JS: ~186–193 KB gzipped per page, of which the large majority is
  the React/Next framework and polyfill baseline; application code is a small
  fraction. The simulator and finish matcher are dynamically imported so they
  stay out of the initial bundle.
- Render-blocking resources: 0 ms savings. Unused JavaScript: 0 ms.

Run Lighthouse yourself on a quiet machine before launch; headless runs on a busy
build box are too noisy to quote a trustworthy score.

## SEO

- Unique title, description, canonical and Open Graph/Twitter tags per product,
  category and journal page, with Nairobi/Kenya phrasing.
- JSON-LD: `Product` (+ `Offer` in KES when a price exists), `BreadcrumbList`,
  `FAQPage` per product, `BlogPosting` per article, and a site-wide
  `FurnitureStore` schema.
- `src/app/sitemap.ts` and `src/app/robots.ts` generate `/sitemap.xml` and
  `/robots.txt` from the data files.
- Product, category and journal pages are statically generated, so crawlers see
  full content.

## Owner must provide before public beta

- Real prices and price tiers in KES for every product.
- Confirmed lead times and delivery windows for Nairobi and nearby counties.
- Warranty terms and after-sales policy.
- Delivery zone coverage, showroom address and real opening hours.
- Photography for every fabric and timber-finish combination (replacing the
  placeholder `variants` mappings).
- The liquid-beading / wipe-clean video for the proof badges.
- Approved `.glb` and `.usdz` models for any product that should support AR.
- A real sale end date, if a sale is actually running.

See [OWNER_TODO.md](OWNER_TODO.md) for the checklist.