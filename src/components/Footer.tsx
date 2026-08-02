import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-royal-deep text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <Link href="/">
            <p className="font-display text-3xl tracking-wide">Aura</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-bright">
              Jewellery
            </p>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Handcrafted gold &amp; diamond piercing jewellery in one collection.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-bright">
            Navigate
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop by Ornament</Link>
            </li>
            <li>
              <Link href="/piercings">Shop by Piercing</Link>
            </li>
            <li>
              <Link href="/customize">Customize</Link>
            </li>
            <li>
              <Link href="/guides">Guides</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-bright">
            Help
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>
              <Link href="/guides/aftercare">Aftercare</Link>
            </li>
            <li>
              <Link href="/appointment">Appointment</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-bright">
            Contact
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            hello@aurajewellery.com
            <br />
            +91 98765 43210
          </p>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-10 items-center rounded-lg bg-[#25D366] px-4 text-sm font-bold text-white"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Aura Jewellery. All rights reserved.
      </div>
    </footer>
  );
}
