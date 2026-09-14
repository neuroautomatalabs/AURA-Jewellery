"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clientLogout } from "@/lib/admin-client";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/bestsellers", label: "Bestsellers" },
  { href: "/admin/appointments", label: "Appointments" },
  { href: "/admin/custom-requests", label: "Custom requests" },
];

function NavLinks({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="admin-nav flex flex-col gap-0.5" aria-label="Dashboard">
      {links.map((link) => {
        const active =
          link.href === "/admin"
            ? pathname === "/admin"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClick}
            className={`rounded-lg px-3 py-2.5 text-[15px] font-semibold transition sm:text-sm ${
              active
                ? "bg-white/15 text-white"
                : "text-white hover:bg-white/10"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  async function signOut() {
    await clientLogout();
    router.push("/admin/login");
  }

  return (
    <>
      <aside className="admin-nav hidden lg:fixed lg:inset-y-0 lg:flex lg:w-60 lg:flex-col bg-royal-deep text-white">
        <div className="px-5 py-5">
          <p className="font-display text-2xl tracking-wide text-white">Aura</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-gold-bright">
            Owner
          </p>
        </div>
        <div className="flex-1 overflow-y-auto px-3">
          <NavLinks />
        </div>
        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className="mb-1 block rounded-lg px-3 py-2.5 text-sm text-white transition hover:bg-white/10"
          >
            View store
          </Link>
          <button
            type="button"
            onClick={() => void signOut()}
            className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-white transition hover:bg-white/10"
          >
            Sign out
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-line bg-white px-3 py-2.5 sm:px-4 sm:py-3 lg:hidden">
        <p className="font-display text-lg text-royal sm:text-xl">Aura Owner</p>
        <button
          type="button"
          className="min-h-10 rounded-lg border border-line px-3 py-2 text-sm font-semibold text-royal"
          aria-expanded={open}
          aria-controls="admin-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>

      {open && (
        <div
          id="admin-mobile-menu"
          className="admin-nav fixed inset-x-0 bottom-0 top-[3.25rem] z-30 overflow-y-auto overscroll-contain bg-royal-deep px-3 py-3 text-white lg:hidden"
        >
          <NavLinks onClick={() => setOpen(false)} />
          <div className="mt-2 border-t border-white/10 pt-2">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2.5 text-[15px] text-white"
              onClick={() => setOpen(false)}
            >
              View store
            </Link>
            <button
              type="button"
              onClick={() => void signOut()}
              className="w-full rounded-lg px-3 py-2.5 text-left text-[15px] text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </>
  );
}
