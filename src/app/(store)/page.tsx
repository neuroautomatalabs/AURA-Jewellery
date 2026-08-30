import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/data/products";
import { LiveBestsellers } from "@/components/LiveBestsellers";
import { HeroSection } from "@/components/HeroSection";
import { Reveal, Tilt3D } from "@/components/Motion";
import { getBestsellerProducts } from "@/lib/catalog";

const trust = [
  { title: "BIS Hallmarked", desc: "18K gold" },
  { title: "Certified diamonds", desc: "Authenticity assured" },
  { title: "Expert piercing", desc: "Book in studio" },
  { title: "Aftercare assistance", desc: "Healing support" },
];

export default async function HomePage() {
  const featured = await getBestsellerProducts(8);

  return (
    <>
      <HeroSection />

      <section className="border-b border-line bg-white">
        <div className="site-container grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
          {trust.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="bg-white px-4 py-6 text-center transition hover:bg-royal-soft/40 sm:py-7">
                <p className="text-sm font-bold text-royal">{item.title}</p>
                <p className="mt-1.5 text-xs text-ink-muted">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="site-gutter relative overflow-hidden bg-surface py-14 sm:py-20">
        <div
          className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[var(--site-max)]">
          <Reveal>
            <h2 className="text-center font-display text-4xl tracking-wide text-royal sm:text-5xl">
              Explore
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-sm text-ink-muted sm:text-base">
              Browse the full collection, or tap a placement on the map.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <Reveal delay={100}>
              <Tilt3D maxTilt={7} className="rounded-2xl">
                <Link
                  href="/shop"
                  className="group relative block min-h-[340px] overflow-hidden rounded-2xl shadow-[var(--shadow-soft)] sm:min-h-[420px]"
                >
                  <div className="metal-shine absolute inset-0">
                    <Image
                      src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85"
                      alt="Gold and diamond jewellery collection"
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-deep via-royal-deep/55 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <h3 className="font-display text-3xl text-white sm:text-4xl">
                      Gold &amp; Diamond
                    </h3>
                    <p className="mt-2 text-sm text-white/80">
                      Full catalog · Gold · Diamond · Ear & Nose filters
                    </p>
                    <span className="btn-gold mt-6">Browse collection</span>
                  </div>
                </Link>
              </Tilt3D>
            </Reveal>

            <Reveal delay={180}>
              <Tilt3D maxTilt={7} className="rounded-2xl">
                <Link
                  href="/piercings"
                  className="group relative block min-h-[340px] overflow-hidden rounded-2xl bg-royal-deep shadow-[var(--shadow-soft)] sm:min-h-[420px]"
                >
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="ear-glow absolute left-1/2 top-[38%] h-44 w-44 -translate-x-1/2 rounded-full bg-gold/30 blur-3xl" />
                    <div className="relative opacity-90 transition duration-700 group-hover:scale-[1.06]">
                      <svg
                        viewBox="0 0 200 260"
                        className="h-44 w-auto text-white/25 sm:h-52"
                        aria-hidden
                      >
                        <ellipse
                          cx="100"
                          cy="130"
                          rx="58"
                          ry="88"
                          fill="currentColor"
                          opacity="0.35"
                        />
                        <ellipse
                          cx="100"
                          cy="130"
                          rx="28"
                          ry="42"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle
                          cx="100"
                          cy="78"
                          r="4"
                          className="fill-gold-bright"
                        />
                        <circle
                          cx="132"
                          cy="118"
                          r="3.5"
                          className="fill-gold-bright"
                        />
                        <circle
                          cx="128"
                          cy="158"
                          r="3.5"
                          className="fill-gold-bright"
                        />
                        <circle
                          cx="108"
                          cy="198"
                          r="4"
                          className="fill-gold-bright"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-deep via-royal-deep/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <h3 className="font-display text-3xl text-white sm:text-4xl">
                      Shop by piercing
                    </h3>
                    <p className="mt-2 text-sm text-white/80">
                      Tap a placement · see matching studs
                    </p>
                    <span className="btn-outline-light mt-6 border-white/50">
                      Open ear map
                    </span>
                  </div>
                </Link>
              </Tilt3D>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="site-gutter bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[var(--site-max)]">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow text-gold">Curated picks</p>
                <h2 className="font-display mt-2 text-3xl text-royal sm:text-4xl">
                  Bestsellers
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-sm font-bold text-royal underline-offset-4 transition hover:text-royal-mid hover:underline"
              >
                View all
              </Link>
            </div>
          </Reveal>
          <div className="mt-9">
            <LiveBestsellers products={featured} />
          </div>
        </div>
      </section>

      <section className="site-gutter relative overflow-hidden bg-royal py-14 sm:py-16">
        <div
          className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-gold/15 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-[var(--site-max)]">
          <Reveal>
            <h2 className="text-center font-display text-3xl text-white sm:text-4xl">
              Starts from
            </h2>
            <p className="mt-2 text-center text-sm text-white/65">
              Clear pricing · three entry points
            </p>
          </Reveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {[
              {
                price: 2499,
                label: "Everyday 18K",
                desc: "Daily-wear gold studs",
              },
              {
                price: 4499,
                label: "Signature",
                desc: "Elevated everyday pieces",
              },
              {
                price: 6499,
                label: "Heritage",
                desc: "Richer traditional gold",
              },
            ].map((tier, i) => (
              <Reveal key={tier.price} delay={i * 100}>
                <Tilt3D maxTilt={8} className="rounded-2xl">
                  <Link
                    href="/shop"
                    className="depth-card group flex flex-col items-center rounded-2xl border border-white/15 bg-white/5 px-5 py-9 text-center backdrop-blur-sm hover:border-gold/50 hover:bg-white/10"
                  >
                    <p className="eyebrow text-gold-bright">{tier.label}</p>
                    <p className="font-display mt-4 text-3xl text-white sm:text-4xl">
                      {formatPrice(tier.price)}
                    </p>
                    <p className="mt-2 text-sm text-white/60">{tier.desc}</p>
                    <span className="mt-6 text-xs font-bold uppercase tracking-wider text-gold-bright transition group-hover:underline">
                      Browse →
                    </span>
                  </Link>
                </Tilt3D>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-gutter relative overflow-hidden border-t border-line bg-gold-soft py-16 sm:py-20">
        <div
          className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-gold/20 blur-3xl"
          aria-hidden
        />
        <Reveal>
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl text-royal sm:text-4xl md:text-5xl">
              Need expert guidance?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">
              Book an appointment for piercing or styling — or chat with us
              on WhatsApp for guidance.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/appointment" className="btn-primary">
                Book an appointment
              </Link>
              <a
                href="https://wa.me/918111000852"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
