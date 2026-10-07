import { getGoogleReviews } from "@/lib/google-reviews";
import { SectionLabel, SectionTitle, Em } from "@/components/ui";

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return <span aria-label={`${rounded} out of 5 stars`} className="tracking-wide text-champagne">{"★".repeat(rounded)}{"☆".repeat(5 - rounded)}</span>;
}

export async function GoogleReviews() {
  const data = await getGoogleReviews();
  if (!data || data.reviews.length === 0) return null;

  return (
    <section aria-labelledby="google-reviews-title" className="border-y border-white/10 bg-espresso py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionLabel>Google reviews</SectionLabel>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionTitle>Kind words from <Em>our customers.</Em></SectionTitle>
            <p className="mt-3 text-sm text-muted">
              {data.rating !== null ? <><span className="text-ivory">{data.rating.toFixed(1)}</span> / 5 from {data.reviewCount ?? data.reviews.length} Google reviews</> : "Customer reviews on Google"}
            </p>
          </div>
          <a href={data.googleMapsUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center border border-white/20 px-4 text-sm text-ivory hover:border-champagne hover:text-champagne">
            See all reviews on Google
          </a>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.reviews.slice(0, 3).map((review, index) => (
            <article key={`${review.authorName}-${review.published}-${index}`} className="flex flex-col border border-white/10 bg-onyx p-5">
              <div className="flex items-center justify-between gap-3">
                <Stars rating={review.rating} />
                <span className="text-xs text-muted">{review.published}</span>
              </div>
              {review.text ? <p className="mt-4 flex-1 whitespace-pre-line text-sm leading-relaxed text-ivory/90">“{review.text}”</p> : <p className="mt-4 flex-1 text-sm text-muted">Rated on Google</p>}
              <a href={review.authorUrl} target="_blank" rel="noreferrer" className="mt-5 w-fit text-sm font-medium text-champagne underline underline-offset-4">{review.authorName} · Google</a>
            </article>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-muted">Reviews are shown from Google and are not edited by Home Update.</p>
      </div>
    </section>
  );
}
