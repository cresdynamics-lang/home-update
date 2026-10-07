import { site } from "@/lib/site";

export type GoogleReview = {
  authorName: string;
  authorUrl: string;
  rating: number;
  text: string;
  published: string;
  googleMapsUrl: string;
};

export type GoogleReviewsResult = {
  businessName: string;
  rating: number | null;
  reviewCount: number | null;
  googleMapsUrl: string;
  reviews: GoogleReview[];
};

type PlacesReview = {
  authorAttribution?: { displayName?: string; uri?: string };
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
};

type PlacesResponse = {
  displayName?: { text?: string };
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

export function isGoogleReviewsConfigured() {
  return Boolean(process.env.GOOGLE_PLACES_API_KEY && process.env.GOOGLE_BUSINESS_PLACE_ID);
}

export async function getGoogleReviews(options: { noStore?: boolean } = {}): Promise<GoogleReviewsResult | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_BUSINESS_PLACE_ID;
  if (!apiKey || !placeId) return null;

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "displayName,rating,userRatingCount,reviews,googleMapsUri",
      },
      ...(options.noStore ? { cache: "no-store" as const } : { next: { revalidate: 3600 } }),
    });
    if (!response.ok) return null;

    const place = await response.json() as PlacesResponse;
    const googleMapsUrl = place.googleMapsUri || `https://www.google.com/maps/search/?api=1&query_place_id=${encodeURIComponent(placeId)}`;
    const reviews = (place.reviews ?? []).flatMap((review) => {
      const authorName = review.authorAttribution?.displayName?.trim();
      if (!authorName || !Number.isFinite(review.rating)) return [];
      return [{
        authorName,
        authorUrl: review.authorAttribution?.uri || googleMapsUrl,
        rating: Math.max(0, Math.min(5, Math.round(review.rating ?? 0))),
        text: review.text?.text?.trim() ?? "",
        published: review.relativePublishTimeDescription ?? "Google review",
        googleMapsUrl,
      }];
    });

    return {
      businessName: place.displayName?.text || site.name,
      rating: typeof place.rating === "number" ? place.rating : null,
      reviewCount: typeof place.userRatingCount === "number" ? place.userRatingCount : null,
      googleMapsUrl,
      reviews,
    };
  } catch {
    return null;
  }
}
