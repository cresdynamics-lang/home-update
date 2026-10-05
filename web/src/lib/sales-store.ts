import "server-only";

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";

export type SaleStatus = "enquiry" | "confirmed" | "paid" | "delivered" | "cancelled";
export type SaleSource = "whatsapp" | "website" | "phone" | "showroom" | "other";

export type SaleRecord = {
  id: string;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  customerName: string;
  contact: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPriceKes: number;
  status: SaleStatus;
  source: SaleSource;
  notes: string;
};

function salesFile() {
  return process.env.SALES_DATA_PATH || join(process.cwd(), "data", "sales-ledger.json");
}

async function readSales(): Promise<SaleRecord[]> {
  try {
    const parsed: unknown = JSON.parse(await readFile(/* turbopackIgnore: true */ salesFile(), "utf8"));
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is SaleRecord => Boolean(
      item && typeof item === "object"
      && typeof item.id === "string"
      && typeof item.createdAt === "string"
      && typeof item.updatedAt === "string"
      && typeof item.customerName === "string"
      && typeof item.contact === "string"
      && typeof item.productId === "string"
      && typeof item.productName === "string"
      && typeof item.quantity === "number"
      && typeof item.unitPriceKes === "number"
      && typeof item.status === "string"
      && typeof item.source === "string"
      && typeof item.notes === "string",
    ));
  } catch {
    return [];
  }
}

let transactionQueue = Promise.resolve();

async function persistSales(records: SaleRecord[]) {
    const file = salesFile();
    await mkdir(dirname(file), { recursive: true });
    const tempFile = `${file}.${process.pid}.tmp`;
    await writeFile(tempFile, JSON.stringify(records, null, 2), { encoding: "utf8", mode: 0o600 });
    await rename(tempFile, file);
}

async function mutateSales<T>(mutate: (records: SaleRecord[]) => { records: SaleRecord[]; result: T }): Promise<T> {
  let result!: T;
  const transaction = transactionQueue.then(async () => {
    const current = await readSales();
    const update = mutate(current);
    await persistSales(update.records);
    result = update.result;
  });
  transactionQueue = transaction.catch(() => undefined);
  await transaction;
  return result;
}

export async function getSales(): Promise<SaleRecord[]> {
  return (await readSales()).sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export async function createSale(input: Omit<SaleRecord, "id" | "createdAt" | "updatedAt">): Promise<SaleRecord> {
  return mutateSales((records) => {
    const now = new Date().toISOString();
    const paid = input.status === "paid";
    const record: SaleRecord = { ...input, id: randomUUID(), createdAt: now, updatedAt: now, ...(paid ? { paidAt: now } : {}) };
    return { records: [record, ...records], result: record };
  });
}

export async function updateSale(id: string, changes: Partial<Pick<SaleRecord, "status" | "notes" | "quantity" | "unitPriceKes">>): Promise<SaleRecord | null> {
  return mutateSales((records) => {
    const index = records.findIndex((record) => record.id === id);
    if (index === -1) return { records, result: null };
    const now = new Date().toISOString();
    const nextStatus = changes.status ?? records[index].status;
    const isPaid = nextStatus === "paid" || (nextStatus === "delivered" && Boolean(records[index].paidAt));
    const updated = {
      ...records[index],
      ...changes,
      updatedAt: now,
      paidAt: isPaid ? records[index].paidAt ?? now : undefined,
    };
    records[index] = updated;
    return { records, result: updated };
  });
}

export async function deleteSale(id: string): Promise<boolean> {
  return mutateSales((records) => {
    const remaining = records.filter((record) => record.id !== id);
    return { records: remaining, result: remaining.length !== records.length };
  });
}
