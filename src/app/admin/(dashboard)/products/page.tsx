"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SimpleStatusBadge } from "@/app/admin/_components/StatusBadge";
import { useAdminStore } from "@/app/admin/_components/useAdminStore";
import { ProductImage } from "@/components/ProductImage";
import { formatPrice, getCategoryLabel, productHasRegion } from "@/data/products";
import type { PiercingRegion } from "@/lib/types";

export default function AdminProductsPage() {
  const { store, error } = useAdminStore();
  const [q, setQ] = useState("");
  const [metal, setMetal] = useState("all");
  const [category, setCategory] = useState("all");
  const [style, setStyle] = useState("all");
  const [status, setStatus] = useState("all");

  const list = useMemo(() => {
    if (!store) return [];
    const query = q.trim().toLowerCase();
    return store.products.filter((p) => {
      if (query && !`${p.name} ${p.sku ?? ""} ${p.id}`.toLowerCase().includes(query)) {
        return false;
      }
      if (metal !== "all" && p.metal !== metal) return false;
      if (category !== "all" && !productHasRegion(p, category as PiercingRegion)) {
        return false;
      }
      if (style !== "all" && p.style !== style) return false;
      if (status === "live" && !p.published) return false;
      if (status === "draft" && p.published) return false;
      if (status === "bestseller" && !p.bestseller) return false;
      return true;
    });
  }, [store, q, metal, category, style, status]);

  if (error) return <p className="text-sm text-red-700">{error}</p>;
  if (!store) return <p className="text-sm text-ink-muted">Loading products…</p>;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-gold">Catalog</p>
          <h1 className="font-display mt-1 text-3xl text-royal">Products</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {list.length} pieces · use Edit to change price, photos, filters or visibility
          </p>
        </div>
        <Link href="/admin/products/new" className="btn-gold">
          Add product
        </Link>
      </div>

      <form
        className="mt-6 grid gap-3 rounded-xl border border-line bg-white p-4 sm:grid-cols-2 lg:grid-cols-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="lg:col-span-2">
          <span className="field-label">Search</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} className="field-input" placeholder="Name, SKU…" />
        </label>
        <label>
          <span className="field-label">Metal</span>
          <select value={metal} onChange={(e) => setMetal(e.target.value)} className="field-input">
            <option value="all">All</option>
            <option value="gold">Gold</option>
            <option value="diamond">Diamond</option>
          </select>
        </label>
        <label>
          <span className="field-label">Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="field-input">
            <option value="all">All</option>
            <option value="ear">Ear</option>
            <option value="nose">Nose</option>
          </select>
        </label>
        <label>
          <span className="field-label">Style</span>
          <select value={style} onChange={(e) => setStyle(e.target.value)} className="field-input">
            <option value="all">All</option>
            <option value="stud">Stud</option>
            <option value="hoop">Hoop</option>
            <option value="charm">Charm</option>
          </select>
        </label>
        <label>
          <span className="field-label">Visibility</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="field-input">
            <option value="all">All</option>
            <option value="live">Live</option>
            <option value="draft">Draft</option>
            <option value="bestseller">Bestsellers</option>
          </select>
        </label>
      </form>

      <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-surface text-[11px] uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Metal</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.id} className="border-t border-line">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-surface">
                      <ProductImage
                        src={p.image}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-ink">{p.name}</p>
                      <p className="text-xs text-ink-muted">
                        {p.sku || p.id}
                        {p.bestseller ? " · Home bestseller" : ""}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize">{p.metal}</td>
                <td className="px-4 py-3 text-ink-muted">{getCategoryLabel(p)}</td>
                <td className="px-4 py-3 font-semibold">{formatPrice(p.price, p.currency)}</td>
                <td className="px-4 py-3 text-ink-muted">
                  {p.stock == null ? "Made to order" : p.stock}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <SimpleStatusBadge status={p.published ? "live" : "draft"} />
                    {p.bestseller && (
                      <span className="inline-flex rounded-full bg-gold-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-royal-deep">
                        Home {p.bestsellerRank ?? ""}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/edit?id=${p.id}`}
                    className="btn-primary min-h-9 px-3 text-[11px]"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <p className="px-4 py-10 text-center text-sm text-ink-muted">
            No products match these filters.
          </p>
        )}
      </div>
    </div>
  );
}
