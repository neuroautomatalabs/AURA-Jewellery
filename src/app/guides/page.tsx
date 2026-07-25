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
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">Guides</p>
      <h1 className="font-display mt-2 text-4xl text-royal sm:text-5xl">
        Piercing guides
      </h1>
      <p className="mt-3 max-w-xl text-ink-muted">
        Short reads for healing, metal choice, and building a balanced ear.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="border border-line p-6 transition hover:border-royal/30 hover:bg-royal-soft/30"
          >
            <p className="text-xs text-ink-muted">{guide.readMinutes} min read</p>
            <h2 className="font-display mt-2 text-2xl text-ink sm:text-3xl">
              {guide.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {guide.excerpt}
            </p>
            <span className="mt-4 inline-block text-xs uppercase tracking-[0.18em] text-royal">
              Read guide →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
