import { isAdminAuthenticated, isSameOrigin } from "@/lib/admin-auth";
import { createSale, getSales, type SaleSource, type SaleStatus } from "@/lib/sales-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const statuses: SaleStatus[] = ["enquiry", "confirmed", "paid", "delivered", "cancelled"];
const sources: SaleSource[] = ["whatsapp", "website", "phone", "showroom", "other"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json(await getSales(), { headers: { "Cache-Control": "no-store, max-age=0" } });
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
  if (!isRecord(body)) return Response.json({ error: "Invalid order." }, { status: 400 });

  const customerName = cleanText(body.customerName, 120);
  const contact = cleanText(body.contact, 80);
  const productName = cleanText(body.productName, 160);
  const productId = cleanText(body.productId, 100);
  const quantity = Number(body.quantity);
  const unitPriceKes = Number(body.unitPriceKes);
  const status = statuses.includes(body.status as SaleStatus) ? body.status as SaleStatus : "enquiry";
  const source = sources.includes(body.source as SaleSource) ? body.source as SaleSource : "other";
  const notes = cleanText(body.notes, 2000);

  if (!customerName || !contact || !productName || !Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
    return Response.json({ error: "Customer, contact, product and a quantity from 1 to 100 are required." }, { status: 400 });
  }
  if (!Number.isSafeInteger(unitPriceKes) || unitPriceKes < 0 || unitPriceKes > 100_000_000) {
    return Response.json({ error: "Enter a valid KES unit price. Use 0 only when no quote is confirmed." }, { status: 400 });
  }

  try {
    const sale = await createSale({ customerName, contact, productId, productName, quantity, unitPriceKes, status, source, notes });
    return Response.json(sale, { status: 201, headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch {
    return Response.json({ error: "Sales storage is not writable. Configure SALES_DATA_PATH on persistent storage." }, { status: 503 });
  }
}
