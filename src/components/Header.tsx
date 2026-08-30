"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { useCart } from "@/components/CartProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/piercings", label: "Piercings" },
  { href: "/customize", label: "Customize" },
  { href: "/guides", label: "Guides" },
];

export function Header({ children }: { children?: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { count } = useCart();

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
      {children ?? (
        <div className="bg-royal-deep px-3 py-2 text-center text-[11px] font-medium tracking-wide text-white sm:text-xs">
          Hallmarked gold &amp; certified diamonds · Free styling consultation
        </div>
      )}

      <header className="border-b border-white/10 bg-royal text-white shadow-[0_8px_28px_rgb(7_20_64/0.28)]">
        <div className="site-container flex items-center justify-between gap-3 py-3.5">
          <Link href="/" className="group flex h-10 shrink-0 items-center overflow-hidden sm:h-12">
            <img
              src="/images/Logo-01.png"
              alt="Aura Jewellery"
              width={208}
              height={67}
              className="nav-logo transition group-hover:opacity-90"
            />
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
                  className={`relative rounded-md px-2.5 py-2 text-[12px] font-semibold tracking-wide transition lg:px-3.5 lg:text-[13px] ${
                    active
                      ? "bg-white/15 text-white"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gold-bright"
                      aria-hidden
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/25 transition hover:border-white/50 hover:bg-white/10"
              aria-label={`Cart${count ? `, ${count} items` : ""}`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-none stroke-current stroke-[1.75]"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.5 5h1.6l1.4 10.2a1.5 1.5 0 001.5 1.3h8.7a1.5 1.5 0 001.5-1.2L19.5 8H7"
                />
                <circle
                  cx="9.5"
                  cy="19.5"
                  r="1.2"
                  fill="currentColor"
                  stroke="none"
                />
                <circle
                  cx="16.5"
                  cy="19.5"
                  r="1.2"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-royal-deep shadow-sm">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>
            <Link href="/appointment" className="btn-gold hidden sm:inline-flex">
              Appointment
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/25 transition hover:border-white/50 hover:bg-white/10 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="flex w-4 flex-col gap-1">
                <span
                  className={`h-0.5 w-full bg-white transition duration-200 ${open ? "translate-y-[6px] rotate-45" : ""}`}
                />
                <span
                  className={`h-0.5 w-full bg-white transition duration-200 ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`h-0.5 w-full bg-white transition duration-200 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <nav
            id="mobile-nav"
            className="site-gutter border-t border-white/10 bg-royal-deep py-3 md:hidden"
          >
            <ul className="space-y-0.5">
              {links.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block rounded-lg px-3 py-3.5 text-base font-medium transition ${
                        active
                          ? "bg-white/15 text-white"
                          : "text-white/85 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/cart"
                  className="block rounded-lg px-3 py-3.5 text-base font-medium text-white/85 transition hover:bg-white/10 hover:text-white"
                >
                  Cart{count > 0 ? ` (${count})` : ""}
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/appointment" className="btn-gold w-full">
                  Appointment
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </div>
  );
}
