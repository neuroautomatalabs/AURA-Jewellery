"use client";

import { useRouter } from "next/navigation";
import { clientDeleteProduct } from "@/lib/admin-client";

export function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();

  return (
    <form
      className="mt-6 border-t border-line pt-5"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!confirm("Remove this product from the shop?")) return;
        const formData = new FormData(e.currentTarget);
        await clientDeleteProduct(formData);
        router.push("/admin/products");
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
      >
        Delete product
      </button>
    </form>
  );
}
