import { ProductForm } from "@/app/admin/_components/ProductForm";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Add product" };

export default function NewProductPage() {
  return (
    <div>
      <Link href="/admin/products" className="text-sm font-semibold text-royal hover:underline">
        ← Products
      </Link>
      <h1 className="font-display mt-3 text-3xl text-royal">Add product</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Live products appear in Shop, piercing maps, and checkout.
      </p>
      <div className="surface-card mt-6 p-5 sm:p-7">
        <ProductForm />
      </div>
    </div>
  );
}
