"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/piercings", label: "Ear Map" },
  { href: "/guides", label: "Guides" },
  { href: "/appointment", label: "Book" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="sticky top-0 z-50">
      <div className="bg-royal-deep px-3 py-2 text-center text-[11px] font-medium tracking-wide text-white sm:text-xs">
        Hallmarked gold &amp; certified diamonds · Free styling consultation
      </div>

      <header className="bg-royal text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="shrink-0">
            <span className="font-display text-2xl tracking-[0.08em] sm:text-[1.85rem]">
              Aura
            </span>
            <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.32em] text-gold-bright">
              Jewellery
            </span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 md:flex"
            aria-label="Primary"
          >
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3.5 py-2 text-[13px] font-semibold tracking-wide transition ${
                    active
                      ? "bg-white text-royal"
                      : "text-white/90 hover:bg-white/15"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/shop" className="btn-gold hidden sm:inline-flex">
              Shop now
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/30 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="flex w-4 flex-col gap-1">
                <span
                  className={`h-0.5 w-full bg-white transition ${open ? "translate-y-[6px] rotate-45" : ""}`}
                />
                <span
                  className={`h-0.5 w-full bg-white transition ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`h-0.5 w-full bg-white transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            className="border-t border-white/10 bg-royal-deep px-4 py-2 md:hidden"
          >
            <ul>
              {links.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-md px-3 py-3.5 text-base font-medium ${
                        active ? "bg-white/15" : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
}
