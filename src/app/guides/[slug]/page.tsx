import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "@/data/guides";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide" };
  return { title: guide.title, description: guide.excerpt };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/guides"
        className="text-xs uppercase tracking-[0.18em] text-royal hover:underline"
      >
        ← All guides
      </Link>
      <p className="mt-6 text-xs text-ink-muted">{guide.readMinutes} min read</p>
      <h1 className="font-display mt-2 text-4xl text-royal sm:text-5xl">
        {guide.title}
      </h1>
      <p className="mt-4 text-ink-muted leading-relaxed">{guide.excerpt}</p>

      <ol className="mt-10 space-y-5">
        {guide.content.map((item, i) => (
          <li key={i} className="flex gap-4 border-b border-line pb-5">
            <span className="font-display text-2xl text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="pt-1 text-base leading-relaxed text-ink">{item}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 bg-royal px-5 py-8 text-center text-white">
        <p className="font-display text-2xl tracking-wide">
          Questions about your ear?
        </p>
        <Link
          href="/appointment"
          className="mt-4 inline-flex min-h-11 items-center rounded-sm bg-white px-5 text-sm font-medium text-royal"
        >
          Book with Aura Jewellery
        </Link>
      </div>
    </article>
  );
}
