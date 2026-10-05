import { cookies } from "next/headers";
import { CONSENT_COOKIE } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID?.replace(/[^\w-]/g, "");
  const consent = (await cookies()).get(CONSENT_COOKIE)?.value;
  if (!pixelId || consent !== "accepted") {
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }

  const pixelUrl = new URL("https://www.facebook.com/tr");
  pixelUrl.searchParams.set("id", pixelId);
  pixelUrl.searchParams.set("ev", "PageView");
  pixelUrl.searchParams.set("noscript", "1");
  return Response.redirect(pixelUrl, 302);
}
