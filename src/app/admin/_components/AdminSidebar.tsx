"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
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
    <nav className="flex flex-col gap-1" aria-label="Dashboard">
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
            className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
              active
                ? "bg-white/15 text-white"
                : "text-white/75 hover:bg-white/10 hover:text-white"
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

  async function signOut() {
    await clientLogout();
    router.push("/admin/login");
  }

  return (
    <>
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-royal-deep text-white">
        <div className="px-5 py-6">
          <p className="font-display text-2xl tracking-wide">Aura</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-gold-bright">
            Owner
          </p>
        </div>
        <div className="flex-1 px-3">
          <NavLinks />
        </div>
        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            className="mb-1 block rounded-lg px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            View store
          </Link>
          <button
            type="button"
            onClick={() => void signOut()}
            className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-white px-4 py-3 lg:hidden">
        <p className="font-display text-xl text-royal">Aura Owner</p>
        <button
          type="button"
          className="rounded-lg border border-line px-3 py-2 text-sm font-semibold text-royal"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>
      {open && (
        <div className="bg-royal-deep px-3 py-4 lg:hidden">
          <NavLinks onClick={() => setOpen(false)} />
          <Link
            href="/"
            className="mt-2 block rounded-lg px-3 py-2.5 text-sm text-white/70"
            onClick={() => setOpen(false)}
          >
            View store
          </Link>
          <button
            type="button"
            onClick={() => void signOut()}
            className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-white/70"
          >
            Sign out
          </button>
        </div>
      )}
    </>
  );
}
