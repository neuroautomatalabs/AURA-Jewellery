import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-royal text-white">
      <div className="site-container grid gap-10 py-16 md:grid-cols-4 md:gap-8">
        <div className="md:pr-4">
          <Link href="/" className="group block w-fit transition hover:opacity-90">
            <Image
              src="/aura-logo.png"
              alt="Aura Jewellery"
              width={1024}
              height={327}
              className="block h-auto w-48 max-w-full"
              priority
            />
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Handcrafted gold &amp; diamond piercing jewellery — hallmarked,
            certified, and styled for every placement.
          </p>
        </div>

        <div>
          <p className="eyebrow text-gold-bright">Navigate</p>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li>
              <Link href="/" className="link-quiet transition hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="link-quiet transition hover:text-white"
              >
                Shop collection
              </Link>
            </li>
            <li>
              <Link
                href="/piercings"
                className="link-quiet transition hover:text-white"
              >
                Shop by piercing
              </Link>
            </li>
            <li>
              <Link
                href="/customize"
                className="link-quiet transition hover:text-white"
              >
                Customize
              </Link>
            </li>
            <li>
              <Link
                href="/guides"
                className="link-quiet transition hover:text-white"
              >
                Guides
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold-bright">Help</p>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li>
              <Link
                href="/cart"
                className="link-quiet transition hover:text-white"
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                href="/appointment"
                className="link-quiet transition hover:text-white"
              >
                Book appointment
              </Link>
            </li>
            <li>
              <Link
                href="/guides/aftercare"
                className="link-quiet transition hover:text-white"
              >
                Aftercare
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-gold-bright">Contact</p>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            <a
              href="mailto:info@aurajewellery.in"
              className="transition hover:text-white"
            >
              info@aurajewellery.in
            </a>
            <br />
            <a href="tel:+918111000852" className="transition hover:text-white">
              +91 8111 000 852
            </a>
          </p>
          <a
            href="https://wa.me/918111000852"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa mt-6"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="site-gutter border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Aura Jewellery. All rights reserved.
      </div>
    </footer>
  );
}
