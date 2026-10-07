import { getGoogleReviews, isGoogleReviewsConfigured } from "@/lib/google-reviews";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!isGoogleReviewsConfigured()) {
    return Response.json({ configured: false, reviews: null }, { headers: { "Cache-Control": "no-store" } });
  }

  const result = await getGoogleReviews({ noStore: true });
  if (!result) {
    return Response.json({ configured: true, error: "Google reviews could not be loaded. Check the Places API key, place ID and API permissions." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }

  return Response.json({ configured: true, ...result }, { headers: { "Cache-Control": "no-store" } });
}
