# Owner confirmation checklist

The SEO and content implementation avoids presenting unverified business details as facts. Complete these items before relying on the site for paid promotion or local search listings.

## Product and service facts

- [ ] Confirm current KES prices and any genuine offer dates for each product.
- [ ] Confirm which SKUs/configurations are available, their dimensions, materials, finishes, and whether customization is possible.
- [ ] Verify and enter construction materials separately from finish names in `/admin`; confirm the TV console load rating/screen compatibility and individual nesting-table dimensions before making those SEO aliases indexable.
- [ ] Confirm live stock or availability, production lead times, delivery areas and fees, and setup terms.
- [ ] Confirm care instructions, fabric performance claims, warranty and return terms, payment options, and sample availability.
- [ ] Review room-fit estimates against the actual products; the size guides describe planning practices and are not guarantees of fit.
- [ ] Replace placeholder product/fabric imagery with approved photos that accurately depict current products and variants.
- [ ] Obtain permission and accurate details before publishing customer reviews, customer homes, or customer photographs.
- [ ] Confirm the Google Business Profile is verified and its name, address/service area, phone and website match the site.
- [ ] Configure a restricted server-side Google Places API (New) key and the Business Profile Place ID for Google review display; confirm API billing and attribution requirements.

## Business identity and local SEO

- [ ] Confirm the legal business name and the public phone number.
- [ ] Provide the verified showroom address, opening hours, and map coordinates if a showroom exists. Until then, the site does not publish a street address or `FurnitureStore` address schema.
- [ ] Confirm the official social profile URLs before adding `sameAs` links.
- [ ] Establish/verify the Google Business Profile and ensure its name, address/service area, phone, hours, and website match confirmed business details.

## Search and analytics accounts

- [ ] Set `NEXT_PUBLIC_GTM_ID` in the deployment environment and configure the approved GA4 property and consent settings in that GTM container.
- [ ] Set `NEXT_PUBLIC_GSC_VERIFICATION` or verify the domain using DNS in Google Search Console; submit `/sitemap.xml` after deployment.
- [ ] Review analytics consent and privacy wording against the deployed consent configuration and applicable policy.

## Deferred SEO landing pages

Pages for delivery areas, showroom, warranty/returns, fabric performance, reviews, and unsupported product categories remain unpublished or excluded from indexing until there is accurate, distinct information to support them. Publish each only after confirming facts and providing useful page content.

## Validation

The SEO code changes have not been run through a production build, typecheck, lint, or automated tests. Run the project's normal validation and inspect deployed canonical URLs, redirects, structured data, sitemap, robots file, consent behavior, and Search Console coverage before launch.

## Deployment and admin operations

- [ ] Configure persistent storage for admin catalog JSON and uploaded product/variant images. The local uploader writes to `public/images/uploads`, which is not durable on ephemeral/serverless deployment filesystems; deploy a persistent volume or implement an object-storage adapter before relying on admin uploads in production.
- [ ] Sign into `/admin`, upload a real primary gallery image and a variant image, save the product, then verify both images on the public page after a deployment/restart.
- [ ] Sign into `/admin` → Google reviews and verify that the Google Places connection loads the correct business and real review data.
- [ ] Test the homepage and product enquiry flows on mobile, including WhatsApp links, image loading, cookie consent, and navigation.
