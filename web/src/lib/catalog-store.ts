import "server-only";

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { products, type Product } from "@/data/products";

type CatalogDocument = {
  overrides: Record<string, Partial<Product>>;
  additions: Product[];
  deletedIds: string[];
};

function dataFile() {
  return process.env.CATALOG_DATA_PATH || join(process.cwd(), "data", "catalog-overrides.json");
}

async function readCatalogDocument(): Promise<CatalogDocument> {
  try {
    const parsed: unknown = JSON.parse(await readFile(/* turbopackIgnore: true */ dataFile(), "utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { overrides: {}, additions: [], deletedIds: [] };
    }
    const record = parsed as Record<string, unknown>;
    if (record.version === 2 && record.overrides && typeof record.overrides === "object") {
      return {
        overrides: record.overrides as Record<string, Partial<Product>>,
        additions: Array.isArray(record.additions) ? record.additions as Product[] : [],
        deletedIds: Array.isArray(record.deletedIds) ? record.deletedIds.filter((id): id is string => typeof id === "string") : [],
      };
    }
    return { overrides: record as Record<string, Partial<Product>>, additions: [], deletedIds: [] };
  } catch {
    return { overrides: {}, additions: [], deletedIds: [] };
  }
}

export async function getCatalogProducts(): Promise<Product[]> {
  const document = await readCatalogDocument();
  const deleted = new Set(document.deletedIds);
  const merged = [...products, ...document.additions].map((product) => {
    const override = document.overrides[product.id];
    if (!override) return product;
    return {
      ...product,
      ...override,
      dimensions: { ...product.dimensions, ...override.dimensions },
      variants: {
        ...product.variants,
        ...override.variants,
      },
    };
  });
  return merged.filter((product) => !deleted.has(product.id));
}

let transactionQueue = Promise.resolve();

async function persistCatalogDocument(document: CatalogDocument) {
    const file = dataFile();
    await mkdir(dirname(file), { recursive: true });
    const tempFile = `${file}.${process.pid}.tmp`;
    await writeFile(tempFile, JSON.stringify({ version: 2, ...document }, null, 2), { encoding: "utf8", mode: 0o600 });
    await rename(tempFile, file);
}

async function mutateCatalog<T>(mutate: (document: CatalogDocument) => { document: CatalogDocument; result: T }): Promise<T> {
  let result!: T;
  const transaction = transactionQueue.then(async () => {
    const update = mutate(await readCatalogDocument());
    await persistCatalogDocument(update.document);
    result = update.result;
  });
  transactionQueue = transaction.catch(() => undefined);
  await transaction;
  return result;
}

export async function saveCatalogProduct(product: Product): Promise<Product> {
  return mutateCatalog((document) => {
    const isBaseProduct = products.some((item) => item.id === product.id);
    if (isBaseProduct) {
      document.overrides[product.id] = product;
      document.deletedIds = document.deletedIds.filter((id) => id !== product.id);
    } else {
      const index = document.additions.findIndex((item) => item.id === product.id);
      if (index >= 0) document.additions[index] = product;
      else document.additions.push(product);
      document.deletedIds = document.deletedIds.filter((id) => id !== product.id);
    }
    return { document, result: product };
  });
}

export async function deleteCatalogProduct(id: string): Promise<boolean> {
  return mutateCatalog((document) => {
    const exists = products.some((item) => item.id === id) || document.additions.some((item) => item.id === id);
    if (!exists || document.deletedIds.includes(id)) return { document, result: false };
    document.deletedIds.push(id);
    return { document, result: true };
  });
}
