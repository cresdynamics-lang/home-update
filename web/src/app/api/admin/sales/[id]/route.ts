import { isAdminAuthenticated, isSameOrigin } from "@/lib/admin-auth";
import { deleteSale, updateSale, type SaleStatus } from "@/lib/sales-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const statuses: SaleStatus[] = ["enquiry", "confirmed", "paid", "delivered", "cancelled"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export async function PATCH(request: Request, context: RouteContext<"/api/admin/sales/[id]">) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSameOrigin(request)) return Response.json({ error: "Request origin rejected." }, { status: 403 });

  const { id } = await context.params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }
  if (!isRecord(body)) return Response.json({ error: "Invalid update." }, { status: 400 });

  const changes: { status?: SaleStatus; notes?: string; quantity?: number; unitPriceKes?: number } = {};
  if ("status" in body) {
    if (!statuses.includes(body.status as SaleStatus)) return Response.json({ error: "Invalid sale status." }, { status: 400 });
    changes.status = body.status as SaleStatus;
  }
  if ("notes" in body) {
    if (typeof body.notes !== "string" || body.notes.length > 2000) return Response.json({ error: "Notes must be 2,000 characters or fewer." }, { status: 400 });
    changes.notes = body.notes.trim();
  }
  if ("quantity" in body) {
    const quantity = Number(body.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) return Response.json({ error: "Quantity must be from 1 to 100." }, { status: 400 });
    changes.quantity = quantity;
  }
  if ("unitPriceKes" in body) {
    const unitPriceKes = Number(body.unitPriceKes);
    if (!Number.isSafeInteger(unitPriceKes) || unitPriceKes < 0 || unitPriceKes > 100_000_000) return Response.json({ error: "Enter a valid KES price." }, { status: 400 });
    changes.unitPriceKes = unitPriceKes;
  }
  if (!Object.keys(changes).length) return Response.json({ error: "No supported fields to update." }, { status: 400 });

  try {
    const sale = await updateSale(id, changes);
    if (!sale) return Response.json({ error: "Sale record not found." }, { status: 404 });
    return Response.json(sale, { headers: { "Cache-Control": "no-store, max-age=0" } });
  } catch {
    return Response.json({ error: "Could not update the sales ledger." }, { status: 503 });
  }
}

export async function DELETE(request: Request, context: RouteContext<"/api/admin/sales/[id]">) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!isSameOrigin(request)) return Response.json({ error: "Request origin rejected." }, { status: 403 });
  const { id } = await context.params;
  try {
    if (!(await deleteSale(id))) return Response.json({ error: "Sale record not found." }, { status: 404 });
    return Response.json({ deleted: true });
  } catch {
    return Response.json({ error: "Could not delete the sales record." }, { status: 503 });
  }
}
