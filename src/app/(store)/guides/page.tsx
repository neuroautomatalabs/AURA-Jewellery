import Link from "next/link";
import { guides } from "@/data/guides";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Piercing Guides",
  description:
    "Aftercare, first piercing tips, gold vs diamond, and curated ear styling.",
};

export default function GuidesPage() {
  return (
    <div className="bg-surface">
      <div className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="eyebrow text-gold">Guides</p>
          <h1 className="font-display mt-3 text-4xl tracking-wide text-royal sm:text-5xl">
            Piercing guides
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
            Short reads for healing, metal choice, and building a balanced ear.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-5 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group surface-card flex flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-royal/20 hover:shadow-[var(--shadow-lift)] sm:p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {guide.readMinutes} min read
              </p>
              <h2 className="font-display mt-3 text-2xl text-ink transition group-hover:text-royal sm:text-3xl">
                {guide.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                {guide.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.18em] text-royal transition group-hover:gap-2">
                Read guide
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
