"use client";

import { DeleteProductButton } from "@/app/admin/_components/DeleteProductButton";
import { ProductForm } from "@/app/admin/_components/ProductForm";
import { useAdminStore } from "@/app/admin/_components/useAdminStore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function EditProductPage() {
  const search = useSearchParams();
  const id = search.get("id") || "";
  const saved = search.get("saved");
  const { store, error } = useAdminStore();

  if (error) return <p className="text-sm text-red-700">{error}</p>;
  if (!store) return <p className="text-sm text-ink-muted">Loading product…</p>;

  const product = store.products.find((p) => p.id === id);
  if (!product) {
    return (
      <div>
        <Link href="/admin/products" className="text-sm font-semibold text-royal hover:underline">
          ← Products
        </Link>
        <p className="mt-4 text-sm text-ink-muted">That product was not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Link href="/admin/products" className="text-sm font-semibold text-royal hover:underline">
        ← Products
      </Link>
      <p className="eyebrow mt-4 text-gold">Edit product</p>
      <h1 className="font-display mt-1 text-3xl text-royal">{product.name}</h1>
      {saved && (
        <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">
          Saved. {product.published ? "This piece is live on the shop." : "This piece is a draft."}
        </p>
      )}
      <div className="surface-card mt-6 p-5 sm:p-7">
        <ProductForm key={product.id + product.updatedAt} product={product} />
        <DeleteProductButton id={product.id} />
      </div>
    </div>
  );
}
