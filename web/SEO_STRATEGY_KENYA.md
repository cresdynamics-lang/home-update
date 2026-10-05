# Home Update Furniture: Kenya SEO and Positioning Plan

Prepared 3 October 2026 for the current Next.js storefront. This is a strategy and implementation specification, not a claim that keyword demand or rankings have already been measured. All search volumes are intentionally omitted. Any commercial fact marked **NEEDS CONFIRMATION** must be verified by the owner before publishing.

## 1. Executive Summary

1. Focus the first six months on Nairobi purchase intent for dining sets, L-shaped/modular sofas, fit confidence and custom sizing; expand Kenya-wide only when delivery terms are real.
2. Treat `homeupdate.co.ke` (non-www, HTTPS) as preferred because that is the current code canonical; verify domain ownership and redirects before launch.
3. Preserve authority with one-to-one 301 redirects from existing `/products/*`, `/fabrics`, `/size-guide`, `/custom-design`, `/sofas`, `/dining-sets` and journal URLs to their new canonical destinations.
4. The app is Next.js 16.3.7 App Router; product and journal detail routes use `generateStaticParams`, while filters and local-state tools are client-side.
5. Fix route canonicals first: the root metadata currently supplies a homepage canonical to routes that do not override it.
6. Give each useful collection, subcategory, product and guide a distinct indexable route; keep shortlist and dynamic compare states `noindex,follow` and out of sitemaps.
7. Make buyer confidence the differentiator: dimensions and clearances, custom options, honest price status, real fabric proof, delivery detail and direct WhatsApp context.
8. Do not publish unsupported water/stain resistance, kid/pet safety, warranty, delivery, showroom, review, payment or price assertions; current product data includes null prices and placeholder warranty text.
9. Build a 24-article library from measured customer questions, but avoid thin estate pages and AI-like generic guides; prioritize original photos, dimensions, local examples and verified answers.
10. Measure qualified outcomes (WhatsApp enquiries by landing page, calls, sample requests and showroom directions) alongside Search Console visibility and Core Web Vitals; targets below are proposed operating targets, not forecasts.

## 2. Search Intent and Keyword Map

### Research rules and status

- The phrases below are target hypotheses, not verified-volume keywords. Difficulty is an initial relative estimate for organic entry, not a keyword-tool score: **Low / Medium / High**. Validate in Google Keyword Planner with Kenya location and English language, Search Console after verification, Google autocomplete and People Also Ask on a logged-out Kenya-localized device.
- Search Console is not connected in this repo; Keyword Planner, live Google autocomplete and PAA were not accessible for this audit. Google SERP requests returned an automated-traffic challenge. DuckDuckGo result snapshots were used as a discovery aid only; they are not Google rankings and may be personalized or volatile.
- Ask the sales team to record the exact phrases prospects use in WhatsApp, including Kiswahili/Sheng; use natural phrases such as “bei ya dining table?”, “sofa ya L-shape”, “ya kuosha kirahisi”, “inaingia kwa nyumba yangu?” and “mnatuma Kiambu?” in FAQs and message flows, not awkward keyword-stuffed copy.
- Priority: **P1** = launch/early revenue, **P2** = build after commercial foundation, **P3** = only after real inventory/service evidence exists.

| Cluster / query group | Primary target page | Intent | Difficulty estimate | Priority |
|---|---|---|---|---|
| 6 seater dining table price in Kenya; “bei ya dining table ya watu sita” | `/dining-sets/6-seater-dining-tables/` | Transactional | High | P1 |
| dining table set Nairobi; “dining set Nairobi” | `/dining-sets/` | Local / transactional | High | P1 |
| marble top dining table Kenya | `/dining-sets/marble-top-dining-sets/` | Commercial | Medium | P2 |
| 4 seater round dining table; “round dining ya watu wanne” | `/dining-sets/4-seater-round-dining-tables/` | Commercial / transactional | Medium | P1 |
| 8 seater dining table | `/dining-sets/8-seater-dining-tables/` | Commercial | Medium | P2 |
| dining chairs Nairobi; “viti vya dining” | `/dining-sets/dining-chairs/` | Commercial / local | Medium | P2 |
| The Fluted 6 seater dining set | `/dining-sets/the-fluted-6-seater-dining-set/` | Transactional / brand | Low–medium | P1 |
| The Orbit 4 seater round dining set | `/dining-sets/the-orbit-4-seater-round-dining-set/` | Transactional / brand | Low–medium | P1 |
| The Ivory dining set; The Regent dining set | `/dining-sets/the-ivory-dining-set/`; `/dining-sets/the-regent-dining-set/` | Transactional / brand | Low–medium | P2 |
| L-shaped sofa price in Kenya; “bei ya sofa ya L Kenya” | `/sofas/l-shaped-sofas/` | Transactional | High | P1 |
| sofa set prices in Kenya; “sofa set bei gani Kenya?” | `/sofas/` | Commercial / transactional | High | P1 |
| modular sectional sofa Nairobi; “sofa modular Nairobi” | `/sofas/modular-sectional-sofas/` | Commercial / local | Medium | P1 |
| sofa with chaise Kenya | `/sofas/sofas-with-chaise/` | Commercial | Medium | P2 |
| sofa bed Nairobi; “sofa bed Nairobi” | `/sofas/sofa-beds/` | Transactional / local | Medium | P2 only if stocked or made |
| The Cloud curved L-shaped sofa | `/sofas/the-cloud-curved-l-shaped-sofa/` | Transactional / brand | Low–medium | P1 |
| The Truffle modular sectional | `/sofas/the-truffle-modular-sectional/` | Transactional / brand | Low–medium | P1 |
| The Linen L-shaped sofa | `/sofas/the-linen-l-shaped-sofa/` | Transactional / brand | Low–medium | P2 |
| water resistant sofa fabric; “kitambaa cha sofa kisichonyonya maji” | `/water-resistant-furniture/` | Informational / commercial | Medium | P1 after proof |
| sofa for kids and pets; “sofa rahisi kusafisha kwa watoto/pets” | `/family-and-pet-friendly-furniture/` | Informational / commercial | Medium | P1 after proof |
| easy clean dining chairs | `/dining-sets/dining-chairs/` plus relevant fabric pages | Commercial | Medium | P2; substantiate claims |
| best sofa for small living room Kenya; “sofa ya nyumba/room ndogo” | `/small-space-furniture/` | Informational / commercial | Medium | P1 |
| balcony sofa Nairobi | `/sofas/balcony-and-nook-sofas/` | Local / commercial | Low–medium | P2; specify covered/outdoor limits |
| dining table for small apartment; “dining table ya apartment ndogo” | `/small-space-furniture/` and dining size guide | Informational / commercial | Medium | P1 |
| custom furniture Nairobi; “furniture ya custom Nairobi” | `/custom-design/` | Local / transactional | High | P1 |
| furniture makers in Nairobi; “mafundi wa furniture Nairobi” | `/custom-design/` | Local / transactional | High | P1 |
| made to measure sofa Kenya; “sofa ya kupima room” | `/custom-design/` | Commercial / transactional | Medium | P1 |
| custom dining table size | `/custom-design/` and `/size-guide/dining-table-size-guide/` | Commercial | Medium | P2 |
| furniture shop in Nairobi; “duka la furniture Nairobi” | `/showroom/` once a real public showroom is confirmed; until then `/contact/` | Local | High | P1 only with real address/service details |
| furniture showroom Nairobi | `/showroom/` | Local / visit | High | P1 only after confirmation |
| furniture delivery Nairobi; “delivery ya furniture Nairobi” | `/delivery-and-setup/nairobi/` only with real terms | Local / transactional | Medium | P1 after confirmation |
| furniture delivery Kiambu / Mombasa / Nakuru / Kisumu; “mnatuma Kiambu/Mombasa?” | respective `/delivery-and-setup/{area}/` page | Local / transactional | Medium–high | P2/P3; build only with distinct actual terms |
| Kilimani, Kileleshwa, Lavington, Westlands, Karen, Runda, Syokimau, Ruaka, Kitengela, Thika Road furniture delivery | `/delivery-and-setup/nairobi/` only if it genuinely covers each place; no estate doorway pages | Local | Medium | P2 after delivery evidence |
| boucle vs velvet vs chenille; “boucle, velvet ama chenille?” | `/journal/boucle-vs-velvet-vs-chenille/` | Informational / comparison | Medium | P1 |
| how to choose dining table size | `/journal/how-to-choose-a-dining-table-size/` and `/size-guide/dining-table-size-guide/` (different roles) | Informational | Medium | P1 |
| how much space for a dining table | `/size-guide/dining-table-size-guide/` | Informational | Medium | P1 |
| how to measure a sofa for a room | `/journal/how-to-measure-your-room-for-a-sofa/` | Informational | Medium | P1 |
| Home Update furniture; Home Update Nairobi reviews | `/` and `/reviews/` (real reviews only) | Brand / local | Low–medium | P1 |

### SERP and competitor snapshot

These are **examples returned in DuckDuckGo discovery searches on 3 October 2026**, not a claim of Google top-five rank, market share or comprehensive competitor review. Confirm the current Google Kenya top five per query in a manual SERP log and audit their landing pages, pricing, delivery, review evidence, schema, mobile speed and links.

| Intent sample | Sites/pages surfaced in discovery results | Opportunity for Home Update |
|---|---|---|
| Dining price / 6-seater | [Monsoon Furniture Kenya](https://monsoonfurniture.co.ke/6-seater-dining-table-prices-in-kenya-monsoon/), [Jiji](https://jiji.co.ke/20-dining-tables/6-seat), [Jumia Kenya](https://www.jumia.co.ke/mlp-dining-table-set-6-seater/), [Furniture Village Kenya](https://furniturevillage.co.ke/product/6-seater-dinning-table/), [The Dining Shop Kenya](https://diningshop.co.ke/product-category/dining-sets/6-seater-dining-sets/); [Smart Furniture Kenya](https://smartfurniturekenya.co.ke/product-category/home-furniture/dining-tables-dining-sets/) also surfaced. | Competitors expose seat count and some listings/prices. Differentiate with a genuinely confirmed KES “from” price, usable room dimensions, chair clearance, customization and quote CTA. Avoid unsupported comparison claims or price undercutting. |
| Sofa / sectional | [Victoria Home Store sectional sofas](https://victoriahomestore.co.ke/product-category/living-room/sectional-sofas-kenya/), [Jiji L-shaped sofas](https://jiji.co.ke/20-sofas/l-shaped), [Bobby Furniture Kenya](https://www.bobbyfurniturekenya.co.ke/category/sectional-sofas), [Monsoon L-shape sofas](https://monsoonfurniture.co.ke/product-category/sofa-sets/l-shape-sofas/), [Modern Furnitures](https://modernfurnitures.co.ke/product-category/sofas/l-shaped-sofa/); [Jumia sectional sofas](https://www.jumia.co.ke/living-room-sectional-sofa/) also surfaced. | Many category/listing pages target broad selection. Win on exact product dimensions and room fit, left/right configuration, fabric-level evidence, helpful sample flow and meaningful comparisons. |
| Furniture shop / local | [Zenith Furnitures](https://zenithfurnitures.co.ke/), [Monsoon Furniture Kenya](https://monsoonfurniture.co.ke/), [Victoria Home Store](https://victoriahomestore.co.ke/), [Diamond Furniture](https://diamondfurniture.co.ke/), [Furniture Gallery Kenya](http://furnituregallerykenya.co.ke/); [Furniture Hub Kenya](https://furniturehubkenya.co.ke/) also surfaced. | Local competitors present Nairobi/coverage claims. Make Google Business Profile, real address, hours, directions, delivery zones and real customer-home evidence consistent before pursuing “showroom” or estate modifiers. |
| Custom / makers | [Sikam Furniture](https://sikamfurniture.com/), [Kamara custom furniture](https://kamara.africa/custom-furniture), [MonDee Furniture](https://mondeefurniture.com/sofas-nairobi), [New Face Furniture](https://newfacefurniture.co.ke/), [Andy On Point Concepts](http://andyonpointconcepts.co.ke/); [Tiri Furniture](https://www.tirifurnitures.com/) also surfaced. | Custom competitors already articulate made-to-measure. Show a simple process, what can change, actual lead-time band, before/after/customer proof, a measurement form and a message with dimensions prefilled. Do not claim fastest/best without evidence. |
| Guides / sizing / comparison | [Monsoon size guide](https://monsoonfurniture.co.ke/size-guide/), [Fair Deal Furniture dining guide](https://fairdealfurniture.co.ke/dining-tables-in-kenya/), [Elegant Households dining guide](https://eleganthouseholdske.com/blogs/news/shop-dining-table-kenya-how-to-choose-the-right-dining-table), [Furniva Interiors sofa guide](https://furnivainteriors.co.ke/how-to-choose-the-perfect-sofa-for-your-living-room-in-kenya-2025-guide/), [Victoria Home Store dining guide](https://victoriahomestore.co.ke/2025/10/02/how-to-choose-the-perfect-dining-set-for-your-home-in-kenya/). | Size advice exists. Make it local and actionable with a calculator/diagram, a stated measurement method, product examples linked to stock, answers to exact buyer questions and a WhatsApp result. Correct or qualify any clearance assertions with product/manufacturer validation. |
| Fabric performance | The returned query primarily showed non-Kenyan fabric articles rather than a clear set of local furniture-fabric specialists. | This is a research gap, not proof of zero competition. Publish only once actual fabric composition, cleaning method and test evidence are confirmed; show close-up photos/video and caveats. Capture Google PAA/autocomplete manually. |
| Brand | No reliable Google brand SERP captured in this audit. | Establish brand entity consistency, GBP, social profile links, reviews, contact information, branded title/snippet and Search Console brand-query baseline. |

**Research completion checklist:** in Keyword Planner export the exact query set by Kenya (and optionally Nairobi if available), date, match type and monthly-range columns; do not treat estimates as actual clicks. In Search Console review 3-, 6- and 16-month query/page/device/country data after verification. On mobile and desktop, record Google autocomplete, PAA, local pack and top-five organic URLs for 12 head queries; repeat quarterly. Add search date, device, location, result URL, title, snippet, content gap and evidence to the competitor log.

## 3. Differentiation and Conversion Copy

### Impact order and website placements

| Rank | Differentiator | Placement and proof required |
|---|---|---|
| 1 | Fit confidence | Homepage Fit Finder; category size/clearance links; product dimensions, room simulator and “send a room photo” WhatsApp action. Current app includes a room simulator and fit finder. State 60 cm chair pull-out and 90 cm walkway as planning guidance, not a universal building rule; validate per item and explain measuring points. |
| 2 | Price clarity | Category cards and product pages show “From KES X” only for confirmed prices/variant scope; otherwise “Ask for today’s price” and quick WhatsApp quote. Current `priceFrom` values are null. |
| 3 | Made to your size | Custom Design page, product option controls and quote form: dimensions, fabric, colour, timber and configuration. Confirm which dimensions/materials can in fact change, price effects and lead time. |
| 4 | Trust | Product, About, Contact and a future Reviews/Showroom page: legal business identity, real address/hours, warranty, policies, genuine reviews and customer homes. All need owner evidence. |
| 5 | Delivery and setup | Product/checkout quote and delivery pages: exact service area, delivery fee/inclusion, carry-up/access limits, setup, damage process and time estimate. **NEEDS CONFIRMATION**. |
| 6 | Fabric proof | Fabric pages and product selector: composition, care label, real swatches, sample request, unedited spill demonstration and explicit limits. Existing app has proof-video fields but no video; resilience claims need confirmation. |
| 7 | Fast, useful WhatsApp | Every product CTA sends product, page, selected fabric/colour/layout, room dimensions and asked action in prefilled text; measure click and qualified reply outcomes. Do not claim “minutes” until response-time SLA is staffed and measured. |
| 8 | Kenyan context | Guides/FAQ: Nairobi apartment measurements, entryways/stairwells, dust and humidity care, balconies only with suitable indoor/outdoor materials, local delivery details. Use practical, verified guidance, not stereotypes. |
| 9 | Side-by-side comparison | `/compare/` tool, accessible from product pages; dynamically selected state noindex. Compare dimensions, seats, layout, fabrics, care, lead time and quote status, not unverifiable quality superlatives. |

### “Why Home Update” copy

**Furniture should fit your room before it arrives.** Home Update helps you choose dining sets and sofas around the measurements, layout and finish of your home. Check dimensions and clearances, compare pieces, and ask us to confirm a configuration before you order. Where a product supports it, choose your size, fabric, colour or timber finish. Send a room photo or measurements on WhatsApp and we can help narrow the options. We show confirmed product and delivery information on each page; when a detail depends on your configuration, ask us for a current quote and lead time. Our aim is to make choosing feel clear, personal and practical, from first measurement to delivery planning.

Do not publish the paragraph’s custom/delivery assertions as universal promises until the owner confirms which SKUs and service zones support them.

### Six short USP lines

1. **See the size. Check the fit.**
2. **Dining sets and sofas shaped around your room.**
3. **Choose a finish; confirm your quote on WhatsApp.**
4. **Compare pieces before you decide.**
5. **Real dimensions. Clear care guidance.**
6. **Tell us your room size and we’ll help you choose.**

Use lines 1–2 on home/category pages, 1/3/5 on product pages, and 2/6 in ads. Only add “water-resistant”, “kid-friendly”, “made to measure”, “delivery and setup included”, warranty, M-Pesa/installments or sample-delivery language when supported with current business evidence.

## 4. Final URL Map and Migration

Use the requested lowercase paths and trailing slash on all non-root URLs. Canonicals, breadcrumbs, sitemap entries and internal links must use the same form. The repo currently uses no trailing slash in links and stores products under `/products/{slug}`; implement explicit `redirects()` in `next.config.ts` or permanent route redirects, then verify every old URL returns one 301 hop and ends at the new page.

```text
/
/dining-sets/
/dining-sets/4-seater-round-dining-tables/
/dining-sets/6-seater-dining-tables/
/dining-sets/8-seater-dining-tables/
/dining-sets/marble-top-dining-sets/
/dining-sets/dining-chairs/
/dining-sets/the-fluted-6-seater-dining-set/
/dining-sets/the-orbit-4-seater-round-dining-set/
/dining-sets/the-ivory-dining-set/
/dining-sets/the-regent-dining-set/
/sofas/
/sofas/l-shaped-sofas/
/sofas/modular-sectional-sofas/
/sofas/sofas-with-chaise/
/sofas/balcony-and-nook-sofas/
/sofas/sofa-beds/
/sofas/the-cloud-curved-l-shaped-sofa/
/sofas/the-truffle-modular-sectional/
/sofas/the-linen-l-shaped-sofa/
/fabrics-and-colours/
/fabrics-and-colours/boucle/
/fabrics-and-colours/performance-velvet/
/fabrics-and-colours/chenille/
/fabrics-and-colours/linen-blend/
/fabrics-and-colours/request-samples/
/match-my-room/
/size-guide/
/size-guide/dining-table-size-guide/
/size-guide/sofa-size-guide/
/custom-design/
/compare/
/water-resistant-furniture/
/family-and-pet-friendly-furniture/
/small-space-furniture/
/furniture-for-hosting/
/bestsellers/
/sale/
/bundles/dining-and-sofa-bundles/
/journal/
/journal/how-to-choose-a-dining-table-size/
/journal/how-many-people-does-a-6-seater-table-seat/
/journal/boucle-vs-velvet-vs-chenille/
/journal/best-sofa-fabric-for-kids-and-pets/
/journal/how-to-measure-your-room-for-a-sofa/
/journal/small-living-room-sofa-ideas-nairobi/
/journal/how-to-care-for-a-water-resistant-sofa/
/journal/marble-top-vs-wooden-dining-tables/
/about/
/delivery-and-setup/
/delivery-and-setup/nairobi/
/delivery-and-setup/kiambu/
/delivery-and-setup/mombasa/
/delivery-and-setup/nakuru/
/delivery-and-setup/kisumu/
/warranty-and-returns/
/showroom/
/reviews/
/customer-homes/
/faqs/
/contact/
```

**Page existence gate:** do not ship category, material, bundle, sofa-bed, showroom, reviews, city or customer-home URLs as empty shells. A page should have useful inventory or a substantive answer, unique text and image evidence, a clear CTA, internal links and an owner-approved service fact. Keep requested delivery URLs out of the live nav/sitemap until actual delivery details exist. If an old page has no relevant replacement, redirect only to the closest relevant parent when useful; otherwise return a true 404/410 rather than mass-redirecting to `/`.

**Initial redirect map:** `/products/the-fluted` → `/dining-sets/the-fluted-6-seater-dining-set/`; `/products/the-orbit` → `/dining-sets/the-orbit-4-seater-round-dining-set/`; `/products/the-ivory` → `/dining-sets/the-ivory-dining-set/`; `/products/the-regent` → `/dining-sets/the-regent-dining-set/`; `/products/the-cloud` → `/sofas/the-cloud-curved-l-shaped-sofa/`; `/products/the-truffle` → `/sofas/the-truffle-modular-sectional/`; `/products/the-linen` → `/sofas/the-linen-l-shaped-sofa/`; `/fabrics` → `/fabrics-and-colours/`; `/size-guide` → `/size-guide/`; current six journal slugs should each map to the closest new guide only after matching intent and reviewing content. `/compare` remains the same utility path, normalized to trailing slash.

**Crawl rules:** every indexable page gets its own absolute canonical. Query filters/sorting/compare configurations must have `noindex,follow` and canonical to the clean category/tool root as appropriate. Keep pagination crawlable via ordinary `<a href>` links and self-canonicalize each useful page; `rel=prev/next` may aid other crawlers but Google no longer uses it as an indexing signal. Do not block a URL in `robots.txt` if Google needs to see its `noindex`. Add `hreflang="en-KE"` and a self alternate only when the page is genuinely English for Kenya; do not emit fake language variants. Pick HTTPS non-www as canonical only after confirming DNS, TLS and www→non-www redirects. Add custom 404 links to dining, sofas, guides and contact.

## 5. On-Page SEO Specifications

Title formulas below should stay under 60 characters in normal rendering; descriptions should remain under 155 characters. Every page has one visible H1 matching its intent. Avoid repeated boilerplate and city mentions where the service is not available. Every template includes a useful visible FAQ block; FAQ schema is optional, and Google does not guarantee FAQ rich results.

| Template | Title formula / description formula | H1, headings, links, image alt pattern, FAQ |
|---|---|---|
| Home | `Dining Sets & Sofas in Nairobi \| Home Update` / “Shop dining sets and sofas made for Kenyan homes. Check room fit, choose finishes and ask today’s price on WhatsApp.” | H1: “Dining sets and sofas made to fit your home.” H2: Shop dining sets; Find a sofa; Check your room fit; Why Home Update; Bestsellers; Customer proof (only real); FAQs. Link to categories, Fit, custom, size guides and products. Alt: `[actual item] in [room/context], [view/finish]`. FAQs: custom sizes? quote? how measure? where delivery? only answer confirmed scope. |
| Category | `[Category] in Nairobi \| Home Update` / “Explore [category] by size, shape and finish. Compare dimensions and ask for today’s price on WhatsApp.” | H1: `[category + need]`. H2: Shop by size/layout; Compare options; Measure first; Materials/care; delivery info (confirmed); FAQs. Links down to subcategories/products and across to guides, room match, compare. Alt identifies product, angle, visible material and no unsupported property. FAQs: available sizes, price, fit, lead time, delivery. |
| Subcategory | `[specific type] in Kenya/Nairobi \| Home Update` / “Find [type] for [room/use]. See dimensions, finishes and fit guidance; ask us on WhatsApp.” | H1 specific phrase. H2 sizing, options, products, fit checklist, related alternatives, FAQs. Link parent, child products, sibling category, size guide, compare. Same alt pattern. FAQs focus on need-specific variations. |
| Product | `[Product] [primary type] \| Home Update` / “Explore [product], [dimensions/seats]. Check available [options] and ask today’s price and lead time on WhatsApp.” | H1 product + type. H2 overview, dimensions/seat count, materials and options, room-fit diagram, care, confirmed lead/delivery/warranty, compare, similar pieces, FAQs. Link category, size/fabric/custom guides, sibling comparisons and similar products. Alt: `[product] [front/side/detail] in [verified finish]`; diagram alt summarizes dimensions. FAQs: quote, capacity, config, care, lead, delivery, return/warranty. Must provide 300+ unique useful words per product plus dimensions, actual materials/fabrics, care, lead time, delivery and warranty only where confirmed, size diagram, comparison and similar pieces. |
| Fabric | `[Fabric] Upholstery & Care Guide \| Home Update` / “Compare [fabric] feel, care and confirmed performance. Ask for a sample or fabric advice on WhatsApp.” | H1 fabric. H2 composition, handfeel, sample/colour, test method and limits, care, matching products, FAQ. Link other fabric comparisons, request samples, product pages and care article. Alt shows actual swatch close-up and scale/context. FAQs on cleaning, pets, sunlight, spills; answer only from supplier care guidance/test. |
| Size guide / tool | `[Dining Table/Sofa] Size Guide for Kenyan Homes \| Home Update` / “Measure your room, entry path and clearances before choosing. Send dimensions on WhatsApp for help.” | H1 direct sizing task. H2 measure room, access route, item footprint, clearance, worked examples, printable diagram/tool, FAQ. Link categories/products/custom and related guide. Alt describes dimension diagram accessibly. FAQs exact clearances, doorways, round vs rectangle and how to send measurements. |
| Journal | `[Question answered clearly] \| Home Update Journal` / “Practical guide to [decision] for Kenyan homes. Compare options and ask us for help on WhatsApp.” | H1 question or topic. H2/H3 answer-first, evidence/method, examples, options, summary, FAQ. Link to one relevant guide, categories, products and one related article. Alt factual/editorial image description, not keyword stuffing. FAQ on adjacent follow-ups. |
| Delivery | `Furniture Delivery in [verified area] \| Home Update` / “See confirmed delivery zones, fees, estimated timing and setup details for [area]. Ask us on WhatsApp.” | H1 service + area. H2 coverage/limits, fee, timeline, access and assembly, service updates, proof/photos (real), FAQs. Link products, delivery parent, contact and showroom. Alt includes actual delivered product/area only with customer permission. FAQs by estate/route, fees, carry-up, assembly, timing. No page until verified distinct details exist. |
| About | `About Home Update Furniture Nairobi \| Home Update` / “Meet Home Update, a Nairobi furniture brand helping you choose dining sets and sofas around your room. Chat with us.” | H1 brand + purpose. H2 who, process, materials/workshop (verified), team, service, proof, FAQs. Link categories, custom, customer homes, contact. Alt real team/workshop/product photos; never stock photos presented as staff/work. FAQs service area, custom, showroom and contact. |
| Contact / showroom | `Contact Home Update Furniture Nairobi \| Home Update` / “Ask about dimensions, fabrics, price or delivery on WhatsApp. Call Home Update or get directions to our confirmed showroom.” | H1 contact brand. H2 WhatsApp, call, address/hours/map (confirmed), enquiry form, access, FAQs. Link categories, custom, delivery, policies. Alt location/signage only if real. FAQs response hours, address, directions, delivery, samples. Do not call it a showroom unless walk-in visits are offered. |

### Exact launch titles and meta descriptions

Descriptions have CTA context and avoid invented prices. Recheck rendered length and title template after implementation; metadata inheritance currently risks adding the brand twice on product/journal pages.

| Page | Title | Description |
|---|---|---|
| Home `/` | `Dining Sets & Sofas in Nairobi \| Home Update` | `Shop dining sets and sofas made for Kenyan homes. Check room fit, choose finishes and ask today's price on WhatsApp.` |
| Dining `/dining-sets/` | `Dining Sets in Nairobi \| Home Update` | `Explore dining sets by seat count, shape and finish. Check dimensions and ask Home Update for today's price on WhatsApp.` |
| Sofas `/sofas/` | `Sofas in Nairobi \| Home Update` | `Explore L-shaped, curved and modular sofas for Kenyan homes. Check room fit and ask today's price on WhatsApp.` |
| The Fluted | `The Fluted 6-Seater Dining Set \| Home Update` | `See The Fluted dimensions, finish options and room-fit guidance. Ask for today's price and confirmed lead time on WhatsApp.` |
| The Cloud | `The Cloud Curved L-Shaped Sofa \| Home Update` | `Explore The Cloud sofa dimensions and configuration options. Check your room fit and ask for today's price on WhatsApp.` |
| The Truffle | `The Truffle Modular Sectional Sofa \| Home Update` | `Explore The Truffle modular layout, dimensions and available fabrics. Ask for today's price and confirmed lead time on WhatsApp.` |
| The Orbit | `The Orbit 4-Seater Round Dining Set \| Home Update` | `See The Orbit round dining set dimensions and finish options. Ask for today's price and check your room fit on WhatsApp.` |

## 6. Structured Data (JSON-LD)

Only mark up content visible to users and true at crawl time. JSON-LD is not a ranking promise. Validate syntax and eligibility; Product snippets generally need a real Offer price or qualifying review data. Do not fabricate `InStock`, rating, review, warranty, exact address or geo. When no fixed real price exists, omit `offers` rather than publishing a price-less or misleading Offer; keep “ask for quote” as visible page copy. Use `AggregateRating`/`Review` only for verifiable first-party reviews that comply with Google’s policies; do not self-serve ratings for the business entity.

### Organization and LocalBusiness/FurnitureStore

The current app outputs `FurnitureStore` globally with locality “Nairobi”, placeholder address comment, phone and empty `sameAs`. Fill full address, geo, URL, hours and sameAs only when verified and exactly consistent with GBP and citations. `FurnitureStore` is a LocalBusiness subtype, so one accurate node can represent the entity.

```json
{
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "@id": "https://homeupdate.co.ke/#store",
  "name": "Home Update Furniture",
  "url": "https://homeupdate.co.ke/",
  "telephone": "+254743844362",
  "image": ["https://homeupdate.co.ke/images/curved-sofas.jpeg"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "NEEDS CONFIRMATION",
    "addressLocality": "Nairobi",
    "addressRegion": "Nairobi County",
    "postalCode": "NEEDS CONFIRMATION",
    "addressCountry": "KE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "NEEDS CONFIRMATION",
    "longitude": "NEEDS CONFIRMATION"
  },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "18:00"
  }],
  "sameAs": ["NEEDS CONFIRMATION: official social profile URLs"]
}
```

Do not leave literal `NEEDS CONFIRMATION` strings in production JSON-LD. Remove unknown properties until confirmed. Phone/hours shown above reflect current repo values and still need owner verification. Consider website `Organization` entity with `publisher` relation if separate from the physical store.

### Product and Offer

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": "https://homeupdate.co.ke/dining-sets/the-fluted-6-seater-dining-set/#product",
  "name": "The Fluted 6-Seater Dining Set",
  "description": "OWNER-APPROVED UNIQUE DESCRIPTION INCLUDING MATERIALS AND DIMENSIONS",
  "image": ["https://homeupdate.co.ke/images/6-seats-dinning.jpeg"],
  "sku": "OWNER SKU IF REAL",
  "brand": {"@type": "Brand", "name": "Home Update Furniture"},
  "category": "Dining sets",
  "material": "ONLY VERIFIED MATERIALS",
  "offers": {
    "@type": "Offer",
    "url": "https://homeupdate.co.ke/dining-sets/the-fluted-6-seater-dining-set/",
    "priceCurrency": "KES",
    "price": "CONFIRMED NUMERIC PRICE",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {"@id": "https://homeupdate.co.ke/#store"}
  }
}
```

Render `offers` only if the numeric price, stock/availability, condition and offer URL describe an actual purchasable offer. If availability changes, derive from inventory. If item is made-to-order, use the truthful supported state and wording; do not assume `InStock`. If a stable actual price is absent, leave the Offer out and keep a WhatsApp quote CTA. Add real `AggregateRating` only when visible and policy-compliant.

### BreadcrumbList, Article, FAQPage, ItemList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://homeupdate.co.ke/"},
    {"@type": "ListItem", "position": 2, "name": "Dining sets", "item": "https://homeupdate.co.ke/dining-sets/"},
    {"@type": "ListItem", "position": 3, "name": "The Fluted 6-Seater Dining Set", "item": "https://homeupdate.co.ke/dining-sets/the-fluted-6-seater-dining-set/"}
  ]
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Choose a Dining Table Size",
  "description": "OWNER-APPROVED SUMMARY",
  "image": ["https://homeupdate.co.ke/images/6-seats-dinning.jpeg"],
  "datePublished": "REAL ISO 8601 PUBLICATION DATE",
  "dateModified": "REAL ISO 8601 MODIFIED DATE",
  "author": {"@type": "Organization", "name": "Home Update Furniture"},
  "publisher": {"@id": "https://homeupdate.co.ke/#store"},
  "mainEntityOfPage": "https://homeupdate.co.ke/journal/how-to-choose-a-dining-table-size/"
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What measurements should I take before choosing a dining table?",
    "acceptedAnswer": {"@type": "Answer", "text": "Take the room length and width, table footprint, chair pull-out clearance and the narrowest doorway or stair route. Confirm fit for the specific model."}
  }]
}
```

FAQ content must match the visible page and be authored/verified; the current Google FAQ rich-result display is limited, so schema should support understanding, not be the reason to create FAQs.

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Dining sets",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "url": "https://homeupdate.co.ke/dining-sets/the-fluted-6-seater-dining-set/",
    "item": {"@type": "Product", "name": "The Fluted 6-Seater Dining Set"}
  }]
}
```

Validate representative pages with Google Rich Results Test (where the type is eligible), Schema.org Validator, Search Console URL Inspection and rendered-source checks. Also test JSON parsing, absolute image URLs, canonical equality, visible text parity, and never ship placeholders. Google has deprecated several rich-result types; check its current documentation before prioritizing display expectations.

## 7. Technical SEO and Performance Checklist

### Repo-specific actions

- [ ] Create route-specific `metadata`/`generateMetadata` for every indexable route, setting its own canonical and Open Graph URL; resolve duplicate brand suffixes caused by the root title template.
- [ ] Standardize trailing slash policy in Next config, every `Link`, canonical, sitemap, redirects and internal crawl.
- [ ] Implement the route tree above only when substantive content exists; add old URL → new URL 301s and test with an automated redirect list.
- [ ] Change current sitemap (currently 10 static + 7 product + 6 journal URLs; timestamps all use request-time `now`) to one source of truth for published routes, real `lastModified`, only canonical/indexable URLs and optional image entries. Split page/product/journal sitemaps if it improves operations; keep sitemap index if needed.
- [ ] Current `/shortlist` and `/compare` are omitted from sitemap but crawlable. Add `noindex,follow` metadata for shortlist and dynamic compare states. For compare's clean landing page, decide indexability based on useful explanatory content; query-selected states must noindex and canonicalize to `/compare/` or the clean parent.
- [ ] Add category ItemList and BreadcrumbList schema, route-accurate visible breadcrumbs; article structured data currently hardcodes one publication date, replace with real dates from data.
- [ ] Product schema currently claims `InStock` with no price when `priceFrom` is null, and the global store address is incomplete; correct before production. Remove the public “owner confirmation checklist” from commercial product copy after confirming data; resolve placeholders in owner-only operation docs, not indexed user copy.
- [ ] Add `hreflang en-KE` only with a correct canonical/hreflang pair; `lang="en-KE"` is already set on `<html>`.
- [ ] Add noindex for internal search/filter parameters while allowing crawler fetch; whitelist useful clean collection pages. Keep sorting/filter links as crawlable UI only if necessary, prevent crawl traps, and canonical query results to the clean category.
- [ ] Ensure every product is reachable within three clicks: home → category/subcategory → product, plus contextual links from guides. Provide plain anchors in SSR HTML.
- [ ] Custom 404 page should link back to dining, sofas, size guides, contact and searchable help. Validate status is 404, not soft 404.
- [ ] Verify robots allows crawl of all needed CSS/JS/images and points to canonical sitemap. A `Disallow` does not remove a URL from Google's index.
- [ ] Add Organization/store identifier and real NAP consistently; no fabricated addresses, coordinates, ratings or social links.

### Image, mobile, CWV and interstitials

- [ ] Existing code uses `next/image`, local JPEGs, responsive `sizes`, priority hints, AVIF/WebP output in Next config and `next/font/google` for Cormorant Garamond/Jost. Verify actual output; migrate large photos to optimized AVIF/WebP masters, retain suitable fallbacks, compress and set intrinsic dimensions/aspect ratios.
- [ ] Preload only the true LCP hero image; set accurate `sizes`, `priority`/preload on hero, lazy-load below-the-fold images and avoid preloading galleries. Set descriptive filenames and truthful alt text; decorative images use empty alt.
- [ ] Self-host WOFF2 variable fonts where licensing/build allows; subset only used glyphs/weights and subsets, preload only above-fold font, `font-display: swap`; test Jost/Cormorant layout shift. Current setup downloads from Google at build time; verify build/network reproducibility before choosing self-hosting.
- [ ] Avoid shipping autoplay video backgrounds to mobile without a clear product benefit, a static poster, compressed source, no forced download on save-data/low-bandwidth, and reduced-motion treatment. Keep hero text readable over its poster.
- [ ] No modal, timed prompt or exit-intent overlay may obscure the main content on initial load. Current prompts should be non-blocking, delayed only after meaningful engagement, dismissible, frequency-capped, keyboard accessible and absent for crawlers only by UX rules, not cloaking.
- [ ] Target field CWV at the 75th percentile: LCP < 2.5s, CLS < 0.1, INP < 200ms on mobile. Measure CrUX/Search Console and Lighthouse/WebPageTest on mid-range Android over throttled 4G; compare real-user p75, not a single lab score. Track image transfer, JS hydration, third-party scripts and font shifts.
- [ ] Test at 320–430 CSS px, keyboard, reduced motion, slow 4G, no storage, no JS fallback for core links, and image failure. Keep WhatsApp/call anchors server-rendered and usable.

## 8. Local SEO and Off-Page Plan

### Google Business Profile

- Claim/verify only the real business profile. Choose the closest available primary category (Furniture store) and secondary category (Sofa store only if eligible); no keyword-stuffed business name.
- Set service area only where delivery/customer service is genuine. A service-area business should hide its residential address; a showroom should display only a staffed customer-facing address with permission.
- Add accurate hours, phone `0743 844 362` / international `+254743844362`, website, WhatsApp URL, products, real exterior/interior/product photos, accessibility/visit notes, Q&A and weekly useful posts. Confirm number/ownership consistency first.
- Add a GBP UTM to website and WhatsApp routes where applicable. Track direction clicks in GBP Insights and GA4; map click is not proof of a showroom visit.
- Ask each purchaser for an honest review after delivery/setup. Never condition incentives on positive sentiment or ask only happy customers. Reply to every review with consent/privacy care; move private order resolution off-thread.

### NAP, proof and relationships

- Maintain identical business name, phone, URL, address (if public), hours and service descriptions on Facebook, Instagram, TikTok, Pinterest, Jiji and legitimate Kenyan directories. Audit duplicates and update wrong old numbers/addresses; prioritize accurate profiles over quantity.
- Build a photo/video consent workflow: product delivered, estate/county only with customer permission, dimensions/use context, photo credit and review wording permission. Publish customer homes only with explicit written consent; no invented estate names, before/after stories or testimonials.
- Build relationships with Nairobi home/interior publications and creators, independent interior designers, architects, developers, Airbnb/serviced-apartment operators, real-estate communities and material suppliers. Offer a practical measurement/fit guide or room collaboration; seek editorial links naturally, disclose paid work, never buy link networks.
- Make short Reels/TikTok room makeovers demonstrative: starting room/measurements, real product and fabric, result, fit caveat, caption links to the matching product/guide. Repurpose each clip into product proof, journal illustration and GBP post.
- Avoid thin estate pages for Kilimani, Kileleshwa, Lavington, Westlands, Karen, Runda, Syokimau, Ruaka, Kitengela and Thika Road. Create one only if it has unique delivery facts, local FAQs, actual relevant customer proof and a real service route; otherwise cover the region on the Nairobi service page.

## 9. First 90-Day Content Calendar

Word counts are editorial targets, not ranking factors. Every article requires a human fact check, original Kenya-relevant examples and a clear way to contact. Week counts start at owner approval and access to real imagery. Internal link names below refer to the final URL map. Do not release a claim-driven piece while required evidence remains unconfirmed.

| Week | Topic / target keyword | Intent | URL | Target words | Internal links | CTA |
|---:|---|---|---|---:|---|---|
| 1 | How to choose a dining table size | Informational / commercial | `/journal/how-to-choose-a-dining-table-size/` | 1,200 | dining size guide, 4/6/8 seaters, Fluted, Orbit | Send room dimensions on WhatsApp |
| 1 | 6-seater capacity: how many people really fit? | Informational / transactional | `/journal/how-many-people-does-a-6-seater-table-seat/` | 900 | 6-seater, Fluted, dining size guide | Ask if your room/table fits |
| 2 | Measure your room and delivery route for a sofa | Informational | `/journal/how-to-measure-your-room-for-a-sofa/` | 1,100 | sofa guide, Cloud, Truffle, custom design | Share room + doorway measurements |
| 2 | Four-seater round dining tables for apartments | Commercial | `/dining-sets/4-seater-round-dining-tables/` | 700 | Orbit, small-space page, dining guide | Ask for options and quote |
| 3 | Boucle vs velvet vs chenille | Informational / comparison | `/journal/boucle-vs-velvet-vs-chenille/` | 1,400 | all fabric pages, request samples, product pages | Ask for a suitable swatch |
| 3 | Six-seater dining sets: sizes, shapes and quote factors | Transactional | `/dining-sets/6-seater-dining-tables/` | 900 | Fluted, dining guide, compare | Ask today's confirmed price |
| 4 | Small living-room sofa ideas for Nairobi apartments | Informational / commercial | `/journal/small-living-room-sofa-ideas-nairobi/` | 1,200 | small-space page, sofa size guide, Cloud, Linen | Check your layout on WhatsApp |
| 4 | The Orbit product story and fit guide | Transactional | `/dining-sets/the-orbit-4-seater-round-dining-set/` | 450 unique product copy | round table category, dining guide, compare | Confirm finish and quote |
| 5 | How much clearance around a dining table? | Informational | `/size-guide/dining-table-size-guide/` | 1,000 | 4/6/8 seaters, Fluted, Orbit, custom | Use fit checker / share dimensions |
| 5 | Marble-top vs wooden dining tables | Informational / commercial | `/journal/marble-top-vs-wooden-dining-tables/` | 1,200 | marble category, dining, care/FAQs | Compare finishes on WhatsApp |
| 6 | Best sofa fabric for kids and pets (evidence-led) | Informational / commercial | `/journal/best-sofa-fabric-for-kids-and-pets/` | 1,300 | fabric pages, sample request, family page | Ask for care details/sample; publish after proof |
| 6 | The Cloud: dimensions and curved L configuration | Transactional | `/sofas/the-cloud-curved-l-shaped-sofa/` | 450 unique product copy | L-shaped, sofa guide, compare | Check left/right layout |
| 7 | How to care for a water-resistant sofa (only validated fabrics) | Informational | `/journal/how-to-care-for-a-water-resistant-sofa/` | 1,000 | water-resistant page, fabric pages, Truffle only if substantiated | Send fabric name for care advice |
| 7 | Water-resistant furniture: what the test proves and does not | Informational / commercial | `/water-resistant-furniture/` | 800 | relevant fabrics, product pages, proof clip | View proof, ask about fabric; gate on evidence |
| 8 | The Truffle modular sectional: layout and room fit | Transactional | `/sofas/the-truffle-modular-sectional/` | 500 unique product copy | modular, sofa size, compare, custom | Send room dimensions/config preference |
| 8 | Nairobi delivery and setup: areas, timing, access | Local / transactional | `/delivery-and-setup/nairobi/` | 700 | delivery parent, contact, product pages | Confirm estate, floor and delivery quote |
| 9 | Small-space furniture: dining + lounge layout guide | Informational / commercial | `/small-space-furniture/` | 1,000 | round tables, sofa pages, both size guides | Submit a room photo/dimensions |
| 9 | The Fluted: 6-seater table and chair clearance | Transactional | `/dining-sets/the-fluted-6-seater-dining-set/` | 500 unique product copy | 6-seater, size guide, compare | Ask for quote and lead time |
| 10 | Custom furniture in Nairobi: choices, quote and process | Local / transactional | `/custom-design/` | 900 | product pages, size guides, contact | Start a custom WhatsApp brief |
| 10 | How to choose a sofa size and configuration | Informational / commercial | `/size-guide/sofa-size-guide/` | 1,100 | Cloud, Truffle, Linen, measure article | Send floor plan or measurements |
| 11 | Festive hosting checklist: seats, serving space and walkways | Seasonal / commercial | `/furniture-for-hosting/` | 900 | dining 6/8 seaters, bundles, size guide | Plan a dining setup before buying |
| 11 | Request fabric samples: colour and light at home | Transactional | `/fabrics-and-colours/request-samples/` | 500 | fabric pages, product pages, contact | Request sample; publish after sample policy confirmation |
| 12 | New-year home refresh: sofa and dining fit plan | Seasonal / commercial | `/bundles/dining-and-sofa-bundles/` | 900 | sofa/dining categories, compare, room match | Ask for a coordinated quote |
| 13 | Real customer home: [consented estate] dining/sofa project | Local / trust | `/customer-homes/` with unique story URL only if approved | 700 | product, relevant category, review page | View the piece / request similar; requires consent |

**Calendar caveat:** Day 90 lands in early January 2027 from this brief date, so the festive article should publish before the 2026 holiday search period, while the new-year refresh publishes in late December/early January. Swap weeks around seasonality. The `/delivery-and-setup/nairobi/`, sample request, bundle and customer story pages must be delayed if service details, samples, stock/bundle scope or consent are missing; substitute a fully supported buying guide rather than publish a stub. This schedule includes 24 planned assets, with conditional pages clearly gated.

## 10. Conversion Measurement and Roadmap

### Analytics implementation

- Verify GA4 property, Search Console domain property and GTM container ownership; configure through consent-aware, performance-conscious scripts. No IDs are in repo. Keep secrets/IDs in environment variables, not committed source. Document cookie/privacy language and obtain consent where legally required.
- `src/lib/analytics.ts` currently pushes events to `dataLayer`, but `siteConfig.analytics.enabled` is false and there is no GTM/GA loader in the repo. Existing event names cover `compare_add`, `simulator_run`, `fabric_select`, `whatsapp_click`, `shortlist_send`. Standardize naming and payloads, and instrument every CTA consistently.
- Required events: `whatsapp_click` (product, page path, fabric, colour/layout, CTA location; never send personal data), `call_click`, `compare_add`, `size_checker_used` (dimensions bucket only if privacy-approved), `shortlist_send`, `sample_request`, `showroom_directions_click`. Optionally `quote_submit`, `view_item`, `view_item_list`, `select_item` using GA4 recommended structures.
- A normal `wa.me` link click is not a completed enquiry. Report it as an outbound intent; reconcile qualified WhatsApp conversations/orders via a privacy-safe CRM/manual weekly count, campaign context, or approved offline import. Do not upload phone/message contents to GA4.
- Make tracked event parameters consistent: `page_location`, `page_type`, `item_id`, `item_name`, `category`, `fabric`, `configuration`, `cta_location`, `service_area`, `link_url`. Use `dataLayer` pushes and a GTM click/event trigger, deduplicate against any direct gtag event, and test once per CTA in GTM Preview/GA4 DebugView.
- Dashboard: GSC impressions, clicks, CTR, average position by query/page/device/country; organic landing sessions; engaged sessions; WhatsApp click-through by landing page/category/product; calls; samples; directions; qualified leads/orders if CRM tracking is available; CWV p75. Separate branded/non-branded and local/country queries.

### 30 / 60 / 90-day roadmap

Targets are proposed process and outcome targets because no GA4/GSC baseline or sales conversion history is available. At day 30, record baseline first; then assess changes against the same date range and seasonality. Do not promise ranking positions.

| Timing / owner | Actions | Measurable target / exit condition |
|---|---|---|
| Days 0–30 — Owner + SEO lead + developer | Confirm prices, SKU availability, fabrics/composition, tested claims, dimensions/clearances, lead times, warranty, returns, delivery zones/fees, setup, address/hours, payment options, official social URLs and image consent. Verify preferred domain and analytics/Search Console access. Freeze URL migration until redirect inventory is ready. | 100% of P1 SKU facts have an owner/source/date; no placeholder warranty/stock/proof/price is public; GSC/GA4/GTM ownership documented; baseline query and CWV exports saved. |
| Days 0–30 — Developer + SEO lead | Fix per-route canonicals/title inheritance; noindex utility states; normalize slashes; build redirect map; update robots/sitemaps/breadcrumbs/schema; fix real dates and offer conditions; add 404. | Every current live URL has an intentional 200/301/404/410 result; zero redirect chains in the migration test; every indexable route has unique title/description/canonical and one H1; sitemap contains canonical live URLs only. |
| Days 31–60 — Content + merchandising + owner | Publish validated home/categories and 4 key product detail pages; add useful sizing/compare links and real pictures; publish first 8 articles and 1–2 fabric guides if proof exists; begin GBP posts and review request flow. | All P1 pages are crawlable/rendered and linked within 3 clicks; every product has 300+ unique words and confirmed fields or transparent unknowns; 8 editorial assets pass evidence review; track click and lead actions in DebugView. |
| Days 31–60 — Local/partnership lead | Complete GBP, directory/NAP audit, real photo upload, map/directions CTA, initial partner outreach. | GBP profile completeness checklist 100%; zero known conflicting NAP citations; 10 qualified partner conversations initiated (activity target, not link promise); first consented customer proof only if available. |
| Days 61–90 — SEO lead + developer + analytics owner | Publish next 8 articles/pages, complete 24-piece plan only where assets/facts allow; inspect indexing/crawl errors and CWV; refine titles/internal links from GSC query data; audit redirects and noindex. | 16+ quality content assets live or deferred transparently; 100% intended canonical pages submitted/discovered; zero critical schema/404/redirect issues; p75 CWV reported with device split and remediation tickets; WhatsApp click reporting by landing page works. |
| Day 90 review — Owner + SEO lead | Compare first 28/56 days to baseline, separate branded vs non-branded, count qualified WhatsApp conversations and sales, review queries entering positions and conversion drop-offs. | Establish next-quarter numeric goals from actual baseline and sales capacity; prioritize pages with impressions but low CTR, relevant queries ranking 5–20, and landing pages generating qualified enquiries. Do not set artificial traffic/rank guarantees. |

## Owner Confirmation Register

**NEEDS CONFIRMATION before relevant pages/schema/copy go live:** final KES price and variant scope; stock or made-to-order status; material composition and timber species; actual fabric names/options; water/stain resistance test details and permission to publish proof video; child/pet/wipe-clean claims and limits; model-specific seating capacity/dimensions/clearance; lead time and when clock starts; Nairobi/Kiambu/Mombasa/Nakuru/Kisumu delivery availability, fees, timings, setup and access limits; warranty and returns; sample availability/shipping fee; M-Pesa/installment details; customer reviews/ratings and publication permission; customer home photos and estate consent; showroom address, public opening hours, coordinates and walk-in policy; legal business name; official social handles; sales reply SLA; bundle/discount terms and genuine sale dates.

## Repo Audit Basis

- Framework and routes: `web/package.json`, `web/src/app/`, product route `web/src/app/products/[slug]/page.tsx`, journal route `web/src/app/journal/[slug]/page.tsx`.
- Root metadata/store JSON-LD: `web/src/app/layout.tsx`.
- Sitemap and robots: `web/src/app/sitemap.ts`, `web/src/app/robots.ts`.
- Catalog and current product facts/placeholders: `web/src/data/products.ts`.
- Search/analytics event support and site defaults: `web/src/lib/analytics.ts`, `web/src/lib/site.ts`.
- Current key collection pages: `web/src/app/dining-sets/page.tsx`, `web/src/app/sofas/page.tsx`, `web/src/app/fabrics/page.tsx`.
- Search competitor discovery source was DuckDuckGo HTML snapshots on 3 October 2026; verify all listings, claims, availability and Google ranking positions before using as formal competitive intelligence.
