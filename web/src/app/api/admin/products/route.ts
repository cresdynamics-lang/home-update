import { type Product } from "@/data/products";
import { deleteCatalogProduct, getCatalogProducts, saveCatalogProduct } from "@/lib/catalog-store";
import { isAdminAuthenticated, isSameOrigin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const categories: Product["category"][] = ["dining", "sofa", "tv-stands", "coffee-tables"];
const tableShapes: NonNullable<Product["tableShape"]>[] = ["Round", "Oval", "Rectangular", "Fluted/Organic Nesting"];
const topMaterials: NonNullable<Product["topMaterial"]>[] = ["Marble", "Solid Wood", "Fluted Base"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function text(value: unknown, fallback: string, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : fallback;
}

function stringList(value: unknown, fallback: string[], maxItems = 30) {
  if (!Array.isArray(value)) return fallback;
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim().slice(0, 180))
    .filter(Boolean)
    .slice(0, maxItems);
}

function price(value: unknown, fallback: number | null) {
  if (value === null || value === "") return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= 0 && parsed <= 100_000_000 ? parsed : fallback;
}

function parseLeadTime(value: unknown, fallback: Product["leadTimeDays"]): Product["leadTimeDays"] {
  if (value === null || value === "") return null;
  if (value === "made to order") return value;
  if (!isRecord(value)) return fallback;
  const min = Number(value.min);
  const max = Number(value.max);
  if (!Number.isInteger(min) || !Number.isInteger(max) || min < 0 || max < min || max > 365) return fallback;
  return { min, max };
}

function parseProduct(value: unknown, current: Product): Product | null {
  if (!isRecord(value) || value.id !== current.id) return null;
  const dimensions = isRecord(value.dimensions) ? value.dimensions : {};
  const dimensionValue = (key: "w" | "d" | "h") => {
    const parsed = Number(dimensions[key]);
    return Number.isFinite(parsed) && parsed > 0 && parsed <= 2000 ? parsed : current.dimensions[key];
  };
  const images = stringList(value.images, current.images, 12);
  if (!images.length || images.some((image) => !image.startsWith("/images/") || image.includes("..") || image.includes("?"))) return null;

  const regularPrice = price(value.regularPrice, current.regularPrice ?? null);
  const salePrice = price(value.salePrice, current.salePrice ?? null);
  const onSale = typeof value.sale === "boolean" ? value.sale : current.sale;
  const inStock = typeof value.inStock === "boolean" ? value.inStock : current.inStock ?? current.availability === "https://schema.org/InStock";
  const category = categories.includes(value.category as Product["category"]) ? value.category as Product["category"] : current.category;
  const shape = tableShapes.includes(value.tableShape as NonNullable<Product["tableShape"]>) ? value.tableShape as Product["tableShape"] : current.tableShape;
  const material = topMaterials.includes(value.topMaterial as NonNullable<Product["topMaterial"]>) ? value.topMaterial as Product["topMaterial"] : current.topMaterial;
  const saleValid = !onSale || salePrice === null || regularPrice === null || salePrice <= regularPrice;
  if (!saleValid) return null;

  return {
    ...current,
    name: text(value.name, current.name, 100) || current.name,
    subtype: text(value.subtype, current.subtype, 140),
    slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(value.slug ?? "")) ? String(value.slug) : current.slug,
    category,
    tags: stringList(value.tags, current.tags),
    bestseller: typeof value.bestseller === "boolean" ? value.bestseller : current.bestseller,
    sale: onSale,
    regularPrice,
    salePrice,
    priceFrom: salePrice ?? regularPrice ?? null,
    inStock,
    availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    priceNote: text(value.priceNote, current.priceNote, 160),
    dimensions: { w: dimensionValue("w"), d: dimensionValue("d"), h: dimensionValue("h") },
    maxTvSize: text(value.maxTvSize, current.maxTvSize ?? "", 120) || undefined,
    cableManagement: typeof value.cableManagement === "boolean" ? value.cableManagement : current.cableManagement,
    storageDrawers: Number.isInteger(Number(value.storageDrawers)) ? Math.max(0, Math.min(20, Number(value.storageDrawers))) : current.storageDrawers,
    tableShape: shape,
    topMaterial: material,
    layoutOptions: stringList(value.layoutOptions, current.layoutOptions),
    fabrics: stringList(value.fabrics, current.fabrics),
    colours: stringList(value.colours, current.colours),
    woodFinishes: stringList(value.woodFinishes, current.woodFinishes),
    leadTimeDays: parseLeadTime(value.leadTimeDays, current.leadTimeDays),
    warranty: text(value.warranty, current.warranty, 500),
    careNotes: stringList(value.careNotes, current.careNotes),
    images,
    buildNote: text(value.buildNote, current.buildNote ?? "", 500),
  };
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json(await getCatalogProducts(), { headers: { "Cache-Control": "no-store, max-age=0" } });
}

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSameOrigin(request)) return Response.json({ error: "Request origin rejected." }, { status: 403 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
  const id = isRecord(body) && typeof body.id === "string" ? body.id : "";
  const currentProduct = (await getCatalogProducts()).find((item) => item.id === id);
  if (!currentProduct) return Response.json({ error: "Unknown product." }, { status: 404 });
  const updated = parseProduct(body, currentProduct);
  if (!updated) return Response.json({ error: "Product data is invalid. Check prices, image paths and required values." }, { status: 400 });
  const duplicate = (await getCatalogProducts()).some((product) =>
    product.id !== updated.id && product.category === updated.category && product.slug === updated.slug,
  );
  if (duplicate) return Response.json({ error: "That slug is already used in this category." }, { status: 409 });

  try {
    await saveCatalogProduct(updated);
    return Response.json(updated, { headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch {
    return Response.json({ error: "Catalog storage is not writable. Configure CATALOG_DATA_PATH to a persistent writable volume." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSameOrigin(request)) return Response.json({ error: "Request origin rejected." }, { status: 403 });
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!isRecord(body) || !categories.includes(body.category as Product["category"])) {
    return Response.json({ error: "Choose a valid product category." }, { status: 400 });
  }
  const category = body.category as Product["category"];
  const name = text(body.name, "", 100);
  if (!name) return Response.json({ error: "Product name is required." }, { status: 400 });
  const template = (await getCatalogProducts()).find((product) => product.category === category);
  if (!template) return Response.json({ error: "No category template is available." }, { status: 400 });
  const slug = typeof body.slug === "string" ? body.slug.trim() : "";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return Response.json({ error: "Slug must use lowercase letters, numbers and hyphens." }, { status: 400 });
  const currentProducts = await getCatalogProducts();
  if (currentProducts.some((product) => product.category === category && product.slug === slug)) {
    return Response.json({ error: "That slug is already used in this category." }, { status: 409 });
  }
  const draftId = `draft-${category}`;
  const draftTemplate = { ...template, id: draftId, category, slug, name };
  const candidate = { ...body, id: draftId, category, slug };
  const parsed = parseProduct(candidate, draftTemplate);
  if (!parsed) return Response.json({ error: "Product data is invalid. Check required fields, prices and local image paths." }, { status: 400 });
  const product: Product = { ...parsed, id: `admin-${category}-${slug}` };
  if (currentProducts.some((item) => item.id === product.id)) return Response.json({ error: "That product identifier already exists." }, { status: 409 });

  try {
    await saveCatalogProduct(product);
    return Response.json(product, { status: 201, headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch {
    return Response.json({ error: "Catalog storage is not writable. Configure CATALOG_DATA_PATH to persistent storage." }, { status: 503 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSameOrigin(request)) return Response.json({ error: "Request origin rejected." }, { status: 403 });
  const id = new URL(request.url).searchParams.get("id") ?? "";
  if (!id) return Response.json({ error: "Product id is required." }, { status: 400 });
  try {
    if (!(await deleteCatalogProduct(id))) return Response.json({ error: "Product not found." }, { status: 404 });
    return Response.json({ deleted: true });
  } catch {
    return Response.json({ error: "Catalog storage is not writable." }, { status: 503 });
  }
}
