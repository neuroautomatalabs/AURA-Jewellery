"use client";

import { ProductImage } from "@/components/ProductImage";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { clientSaveBestsellers } from "@/lib/admin-client";
import { SimpleStatusBadge } from "@/app/admin/_components/StatusBadge";
import { useAdminStore } from "@/app/admin/_components/useAdminStore";
import { formatPrice } from "@/data/products";
import { useState } from "react";

export default function AdminBestsellersPage() {
  const search = useSearchParams();
  const saved = search.get("saved");
  const { store, error, reload } = useAdminStore();
  const [pending, setPending] = useState(false);
  const [justSaved, setJustSaved] = useState(Boolean(saved));

  if (error) return <p className="text-sm text-red-700">{error}</p>;
  if (!store) return <p className="text-sm text-ink-muted">Loading bestsellers…</p>;

  const products = [...store.products].sort((a, b) => {
    const aRank = a.bestseller ? (a.bestsellerRank ?? 99) : 999;
    const bRank = b.bestseller ? (b.bestsellerRank ?? 99) : 999;
    if (aRank !== bRank) return aRank - bRank;
    return a.name.localeCompare(b.name);
  });
  const selectedCount = products.filter((p) => p.bestseller && p.published).length;
  const usingFallback = !products.some((p) => p.bestseller);

  return (
    <div>
      <p className="eyebrow text-gold">Home page</p>
      <h1 className="font-display mt-1 text-3xl text-royal">Bestsellers</h1>
      <p className="mt-2 max-w-2xl text-sm text-ink-muted">
        Choose which live pieces appear in Bestsellers on the home page. Rank 1 shows first.
        Home shows up to 8. Drafts stay off the shop even if they are ticked here.
      </p>

      {justSaved && (
        <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">
          Saved. The home page Bestsellers row now uses this list.
        </p>
      )}

      {usingFallback && (
        <p className="mt-4 rounded-xl bg-gold-soft px-4 py-3 text-sm text-royal-deep">
          Nothing is marked yet, so home currently shows the first 8 live products. Tick pieces
          below and save to choose them yourself.
        </p>
      )}

      {!usingFallback && (
        <p className="mt-4 text-sm text-ink-muted">
          {selectedCount} live bestseller{selectedCount === 1 ? "" : "s"} will show on home
          {selectedCount > 8 ? " (first 8 by rank)" : ""}.
        </p>
      )}

      <form
        className="mt-6"
        onSubmit={async (e) => {
          e.preventDefault();
          setPending(true);
          await clientSaveBestsellers(new FormData(e.currentTarget));
          await reload();
          setJustSaved(true);
          setPending(false);
        }}
      >
        <div className="overflow-x-auto rounded-xl border border-line bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-surface text-[11px] uppercase tracking-wider text-ink-muted">
              <tr>
                <th className="px-4 py-3">On home</th>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-line">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      name="bestsellerId"
                      value={product.id}
                      defaultChecked={product.bestseller}
                      className="accent-royal h-4 w-4"
                      aria-label={`Show ${product.name} on home`}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      name={`rank_${product.id}`}
                      type="number"
                      min={1}
                      max={99}
                      defaultValue={product.bestsellerRank ?? ""}
                      className="field-input w-20"
                      placeholder="—"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface">
                        <ProductImage
                          src={product.image}
                          alt=""
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/admin/products/edit?id=${product.id}`}
                          className="font-semibold text-ink hover:text-royal hover:underline"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-ink-muted">{product.sku || product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <SimpleStatusBadge status={product.published ? "live" : "draft"} />
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {formatPrice(product.price, product.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <p className="px-4 py-10 text-center text-sm text-ink-muted">
              Add products first, then pick bestsellers here.
            </p>
          )}
        </div>

        <button type="submit" disabled={pending} className="btn-primary mt-5">
          {pending ? "Saving…" : "Save bestsellers"}
        </button>
      </form>
    </div>
  );
}
