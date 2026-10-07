import type { Metadata } from "next";
import type { Product } from "@/data/products";
import { site } from "@/lib/site";

export const PRODUCT_PATHS: Record<string, string> = {
  fluted: "/dining-sets-nairobi/6-seater-dining-set-nairobi-apartments/",
  orbit: "/dining-sets-nairobi/4-seater-round-dining-set-nairobi/",
  ivory: "/dining-sets-nairobi/ivory-4-seater-dining-set-nairobi/",
  regent: "/dining-sets-nairobi/regent-8-seater-dining-set-nairobi/",
  cloud: "/sofas-nairobi/cloud-curved-l-shaped-sectional-sofa/",
  truffle: "/sofas-nairobi/truffle-modular-sectional-sofa/",
  linen: "/sofas-nairobi/l-shaped-sectional-sofa-nairobi/",
  "metro-tv-stand": "/tv-stands-nairobi/custom-tv-stand-cable-management/",
  "arc-tv-stand": "/tv-stands-nairobi/arc-low-tv-media-console/",
  "nest-coffee-table": "/coffee-tables-nairobi/nesting-coffee-tables-small-apartments/",
  "vale-coffee-table": "/coffee-tables-nairobi/vale-fluted-oval-coffee-table/",
};

export function productPath(product: Product) {
  return PRODUCT_PATHS[product.id] ?? `/shop/${product.category}/${product.slug}/`;
}

export function productMetadata(product: Product): Metadata {
  const url = `${site.url}${productPath(product)}`;
  const titleById: Record<string, string> = {
    fluted: "6-Seater Dining Set in Nairobi",
    cloud: "The Cloud Curved L-Shaped Sofa",
    truffle: "The Truffle Modular Sectional Sofa",
    linen: "L-Shaped Sofa in Nairobi",
    orbit: "The Orbit 4-Seater Round Dining Set",
  };
  const title = titleById[product.id] ?? product.name;
  const description = `${product.name}: ${product.dimensions.w} × ${product.dimensions.d} cm${product.seats ? `, ${product.seats} seats` : ""}. Check room fit and ask for today's price on WhatsApp.`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { "en-KE": url } },
    openGraph: {
      title,
      description,
      type: "website",
      url,
      images: [{ url: product.images[0], width: 1200, height: 630, alt: product.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: [product.images[0]] },
    ...(product.conceptPreview ? { robots: { index: false, follow: true } } : {}),
  };
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${site.url}${path.endsWith("/") ? path : `${path}/`}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: { "en-KE": url } },
    openGraph: { title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function productStructuredData(product: Product) {
  const path = productPath(product);
  const url = `${site.url}${path}`;
  const categoryPath = `${site.url}${product.category === "dining" ? "/dining-sets-nairobi/" : product.category === "sofa" ? "/sofas-nairobi/" : product.category === "tv-stands" ? "/tv-stands-nairobi/" : "/coffee-tables-nairobi/"}`;
  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    sku: product.id,
    description: `${product.name}, ${product.subtype}, ${product.dimensions.w} × ${product.dimensions.d} × ${product.dimensions.h} cm.`,
    image: product.images.map((src) => `${site.url}${src}`),
    brand: { "@type": "Brand", name: site.name },
    category: product.category,
    ...(product.materials?.length ? { material: product.materials.join(", ") } : {}),
    ...(product.priceFrom !== null && product.priceFrom > 0 && product.availability
      ? {
          offers: {
            "@type": "Offer",
            url,
            price: product.priceFrom,
            priceCurrency: "KES",
            availability: product.availability,
            itemCondition: "https://schema.org/NewCondition",
            seller: { "@id": `${site.url}/#organization` },
          },
        }
      : {}),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Width", value: `${product.dimensions.w} cm` },
      { "@type": "PropertyValue", name: "Depth", value: `${product.dimensions.d} cm` },
      { "@type": "PropertyValue", name: "Height", value: `${product.dimensions.h} cm` },
      ...(product.seats ? [{ "@type": "PropertyValue", name: "Seats", value: `${product.seats}` }] : []),
    ],
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
      { "@type": "ListItem", position: 2, name: product.category, item: categoryPath },
      { "@type": "ListItem", position: 3, name: product.name, item: url },
    ],
  };
  return [productData, breadcrumbs];
}
