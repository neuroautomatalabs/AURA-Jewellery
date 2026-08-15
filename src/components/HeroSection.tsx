"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setOffset(window.scrollY * 0.28);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-royal text-white">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1600&q=85"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-parallax-img object-cover object-center opacity-[0.34]"
          style={{ transform: `translate3d(0, ${offset * 0.35}px, 0) scale(1.12)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-royal-deep via-royal/95 to-royal-mid/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(232,197,71,0.18),transparent_45%)]" />
        <span className="float-sparkle left-[18%] top-[28%]" />
        <span className="float-sparkle left-[72%] top-[36%]" />
        <span className="float-sparkle left-[58%] top-[62%]" />
      </div>

      <div
        className="relative mx-auto flex min-h-[82dvh] max-w-7xl flex-col justify-end px-4 pb-16 pt-24 sm:px-6 sm:pb-24 lg:justify-center lg:pb-20"
        style={{ transform: `translate3d(0, ${offset * -0.12}px, 0)` }}
      >
        <h1 className="animate-rise font-display text-5xl tracking-wide sm:text-6xl md:text-7xl lg:text-[5.25rem]">
          Aura Jewellery
        </h1>
        <p className="animate-rise-delay-2 mt-5 max-w-lg text-lg font-medium leading-snug text-white/95 sm:text-xl md:text-2xl">
          Gold &amp; diamond — everyone deserves a glitter.
        </p>
        <p className="animate-rise-delay-2 mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
          Shop the full catalog, or explore our animated ear map to find pieces
          by placement.
        </p>
        <div className="animate-rise-delay-3 mt-9 flex flex-wrap gap-3">
          <Link href="/shop" className="btn-gold">
            Shop by collection
          </Link>
          <Link href="/piercings" className="btn-outline-light">
            Shop by piercing
          </Link>
        </div>
      </div>
    </section>
  );
}
