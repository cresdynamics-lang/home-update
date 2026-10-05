import { getCatalogProducts } from "@/lib/catalog-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getCatalogProducts(), {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
