import type { Metadata } from "next";
import type { Product } from "@/data/products";
import { site } from "@/lib/site";

export const PRODUCT_PATHS: Record<string, string> = {
  fluted: "/dining-sets/the-fluted-6-seater-dining-set/",
  orbit: "/dining-sets/the-orbit-4-seater-round-dining-set/",
  ivory: "/dining-sets/the-ivory-dining-set/",
  regent: "/dining-sets/the-regent-dining-set/",
  cloud: "/sofas/the-cloud-curved-l-shaped-sofa/",
  truffle: "/sofas/the-truffle-modular-sectional/",
  linen: "/sofas/the-linen-l-shaped-sofa/",
};

export function productPath(product: Product) {
  return PRODUCT_PATHS[product.id] ?? `/${product.category === "dining" ? "dining-sets" : "sofas"}/${product.slug}/`;
}

export function productMetadata(product: Product): Metadata {
  const url = `${site.url}${productPath(product)}`;
  const titleById: Record<string, string> = {
    fluted: "The Fluted 6-Seater Dining Set | Home Update",
    cloud: "The Cloud Curved L-Shaped Sofa | Home Update",
    truffle: "The Truffle Modular Sectional Sofa | Home Update",
    orbit: "The Orbit 4-Seater Round Dining Set | Home Update",
  };
  const title = titleById[product.id] ?? `${product.name} ${product.category === "dining" ? "Dining Set" : "Sofa"} | Home Update`;
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
  };
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = `${site.url}${path.endsWith("/") ? path : `${path}/`}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { "en-KE": url } },
    openGraph: { title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function productStructuredData(product: Product) {
  const path = productPath(product);
  const url = `${site.url}${path}`;
  const categoryPath = `${site.url}/${product.category === "dining" ? "dining-sets" : "sofas"}/`;
  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    name: product.name,
    description: `${product.name}, ${product.subtype}, ${product.dimensions.w} × ${product.dimensions.d} × ${product.dimensions.h} cm.`,
    image: product.images.map((src) => `${site.url}${src}`),
    brand: { "@type": "Brand", name: site.name },
    category: product.category === "dining" ? "Dining sets" : "Sofas",
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
      { "@type": "ListItem", position: 2, name: product.category === "dining" ? "Dining sets" : "Sofas", item: categoryPath },
      { "@type": "ListItem", position: 3, name: product.name, item: url },
    ],
  };
  return [productData, breadcrumbs];
}
