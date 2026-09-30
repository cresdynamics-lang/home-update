import Image from "next/image";
import { notFound } from "next/navigation";
import { WaButton } from "@/components/ui";
import { journal } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return journal.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = journal.find((p) => p.slug === slug);
  return { title: post?.title ?? "Journal" };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = journal.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
      <p className="text-[11px] tracking-[0.2em] text-antique-gold uppercase">
        {post.minutes} min read
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-ivory md:text-5xl">
        {post.title}
      </h1>
      <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[1.35rem]">
        <Image src={post.image} alt="" fill className="object-cover" sizes="768px" priority />
      </div>
      <div className="mt-8 space-y-4 text-base leading-relaxed text-muted">
        <p>
          Most homes wait years for the “right time” to update a room. The truth: your furniture is
          already shaping how you host, rest and gather — whether it was chosen with care or not.
        </p>
        <p>
          Start with one decision: the piece you touch every day. Measure the room, pick a fabric that
          forgives real life, then message us with a photo. We reply with options that fit.
        </p>
      </div>
      <WaButton className="mt-10">Talk through this idea</WaButton>
    </article>
  );
}
