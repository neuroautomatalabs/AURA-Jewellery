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
    <article className="bg-surface">
      <div className="border-b border-line bg-white">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
          <Link
            href="/guides"
            className="text-xs font-bold uppercase tracking-[0.18em] text-royal transition hover:text-royal-mid"
          >
            ← All guides
          </Link>
          <p className="mt-7 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            {guide.readMinutes} min read
          </p>
          <h1 className="font-display mt-3 text-4xl tracking-wide text-royal sm:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            {guide.excerpt}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
        <ol className="space-y-0 overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-soft)]">
          {guide.content.map((item, i) => (
            <li
              key={i}
              className="flex gap-4 border-b border-line px-5 py-5 last:border-b-0 sm:gap-5 sm:px-6 sm:py-6"
            >
              <span className="font-display text-2xl text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="pt-1 text-base leading-relaxed text-ink">{item}</p>
            </li>
          ))}
        </ol>

        <div className="relative mt-12 overflow-hidden rounded-2xl bg-royal px-6 py-10 text-center text-white sm:px-8">
          <div
            className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-gold/15 blur-3xl"
            aria-hidden
          />
          <p className="relative font-display text-2xl tracking-wide sm:text-3xl">
            Questions about your ear?
          </p>
          <p className="relative mx-auto mt-3 max-w-sm text-sm text-white/70">
            Our specialists are on WhatsApp — metal, size, and placement help.
          </p>
          <a
            href="https://wa.me/918111000852?text=Hi%20Aura%20Jewellery%2C%20I%20have%20a%20question%20about%20my%20ear%20piercing."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa relative mt-6"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
