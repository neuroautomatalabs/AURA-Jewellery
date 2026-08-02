import Link from "next/link";
import Image from "next/image";
import { products, formatPrice } from "@/data/products";
import { ProductGrid } from "@/components/ProductGrid";

const trust = [
  { title: "BIS Hallmarked", desc: "18K & 22K gold" },
  { title: "Certified diamonds", desc: "Authenticity assured" },
  { title: "Expert piercing", desc: "Book in studio" },
  { title: "WhatsApp help", desc: "Styling guidance" },
];

export default function HomePage() {
  const featured = products.slice(0, 8);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-royal text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1600&q=85"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-royal-deep via-royal/95 to-royal-mid/80" />
        </div>

        <div className="relative mx-auto flex min-h-[78dvh] max-w-7xl flex-col justify-end px-4 pb-14 pt-20 sm:px-6 sm:pb-20 lg:justify-center">
          <p className="animate-rise text-[11px] font-bold uppercase tracking-[0.28em] text-gold-bright">
            Piercing jewellery studio
          </p>
          <p className="animate-rise font-display mt-3 text-5xl tracking-wide sm:text-6xl md:text-7xl">
            Aura Jewellery
          </p>
          <h1 className="animate-rise-delay-1 mt-5 max-w-lg text-xl font-medium leading-snug text-white/95 sm:text-2xl">
            Gold &amp; diamond studs — one collection, every piercing.
          </h1>
          <p className="animate-rise-delay-2 mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
            Shop the full catalog, or explore our animated ear map to find
            pieces by placement.
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="btn-gold">
              Shop gold &amp; diamond
            </Link>
            <Link href="/piercings" className="btn-outline-light">
              Try ear map
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-line sm:grid-cols-4">
          {trust.map((item) => (
            <div
              key={item.title}
              className="bg-white px-4 py-5 text-center sm:py-6"
            >
              <p className="text-sm font-bold text-royal">{item.title}</p>
              <p className="mt-1 text-xs text-ink-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Single collection + ear map — two clear paths */}
      <section className="bg-surface px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-display text-4xl tracking-wide text-royal sm:text-5xl">
            Explore
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5">
            <Link
              href="/shop"
              className="group relative min-h-[320px] overflow-hidden rounded-2xl sm:min-h-[400px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85"
                alt="Gold and diamond jewellery collection"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-deep via-royal-deep/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="font-display text-3xl text-white sm:text-4xl">
                  Gold &amp; Diamond
                </p>
                <p className="mt-2 text-sm text-white/80">
                  Full catalog · 18K · 22K · Diamond filters
                </p>
                <span className="btn-gold mt-5">Browse collection</span>
              </div>
            </Link>

            <Link
              href="/piercings"
              className="group relative min-h-[320px] overflow-hidden rounded-2xl bg-royal-deep sm:min-h-[400px]"
            >
              <div className="absolute inset-0 flex items-center justify-center p-6 opacity-90 transition group-hover:scale-[1.03]">
                <div className="ear-glow h-40 w-40 rounded-full bg-gold/25 blur-3xl" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-royal-deep via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="font-display text-3xl text-white sm:text-4xl">
                  Shop by piercing
                </p>
                <p className="mt-2 text-sm text-white/80">
                  Tap a placement · see matching studs
                </p>
                <span className="btn-outline-light mt-5 border-white/50">
                  Open ear map
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-3xl text-royal sm:text-4xl">
              Bestsellers
            </h2>
            <Link href="/shop" className="text-sm font-bold text-royal underline-offset-4 hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-8">
            <ProductGrid products={featured} />
          </div>
        </div>
      </section>

      <section className="bg-royal px-4 py-12 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-display text-3xl text-white sm:text-4xl">
            Starts from
          </h2>
          <p className="mt-2 text-center text-sm text-white/65">
            Clear pricing · three entry points
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
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
                label: "Heritage 22K",
                desc: "Richer traditional gold",
              },
            ].map((tier) => (
              <Link
                key={tier.price}
                href="/shop"
                className="group flex flex-col items-center rounded-2xl border border-white/15 bg-white/5 px-5 py-8 text-center transition hover:border-gold/50 hover:bg-white/10"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-bright">
                  {tier.label}
                </p>
                <p className="font-display mt-3 text-3xl text-white sm:text-4xl">
                  {formatPrice(tier.price)}
                </p>
                <p className="mt-2 text-sm text-white/60">{tier.desc}</p>
                <span className="mt-5 text-xs font-bold uppercase tracking-wider text-gold-bright transition group-hover:underline">
                  Browse
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-2xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="font-display text-2xl text-royal sm:text-3xl">
              Need expert guidance?
            </p>
            <p className="mt-2 max-w-lg text-sm text-ink-muted">
              Our specialists help you pick the perfect stud — metal, size and
              style.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-lg bg-[#25D366] px-5 text-sm font-bold text-white"
            >
              Chat on WhatsApp
            </a>
            <Link href="/appointment" className="btn-primary">
              Book appointment
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-royal-deep px-4 py-14 text-white sm:px-6 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-3xl sm:text-4xl">Visit Aura Jewellery</p>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/70">
            Book a studio appointment — confirmation emails go to you and us.
          </p>
          <Link href="/appointment" className="btn-gold mt-7">
            Book an appointment
          </Link>
        </div>
      </section>
    </>
  );
}
