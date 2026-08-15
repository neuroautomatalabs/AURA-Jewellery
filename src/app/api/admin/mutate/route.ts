import { NextResponse } from "next/server";
import {
  applyDeleteProduct,
  applySaveBestsellers,
  applySaveProduct,
  applyUpdateAppointmentStatus,
  applyUpdateCustomRequestStatus,
  applyUpdateOrderStatus,
  catalogProductFromForm,
  resolvePhotoUrls,
  text,
} from "@/lib/admin-logic";
import { requireAdminApi } from "@/lib/auth";
import { updateStore } from "@/lib/store";
import { saveUpload } from "@/lib/uploads";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await requireAdminApi())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const op = text(form, "op");

  try {
    if (op === "save-product") {
      const photos = await resolvePhotoUrls(form, (file) =>
        saveUpload(file, "product"),
      );
      if ("error" in photos) {
        return NextResponse.json({ error: photos.error }, { status: 400 });
      }
      const id = text(form, "id");
      const result = await updateStore((store) => {
        const existing = store.products.find((p) => p.id === id);
        const built = catalogProductFromForm(form, photos.urls, existing);
        if ("error" in built) return built;
        applySaveProduct(store, built.product);
        return { id: built.product.id };
      });
      if ("error" in result) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json(result);
    }

    if (op === "delete-product") {
      const id = text(form, "id");
      if (!id) {
        return NextResponse.json({ error: "Missing product." }, { status: 400 });
      }
      await updateStore((store) => applyDeleteProduct(store, id));
      return NextResponse.json({ ok: true });
    }

    if (op === "save-bestsellers") {
      await updateStore((store) => applySaveBestsellers(store, form));
      return NextResponse.json({ ok: true });
    }

    if (op === "update-order") {
      await updateStore((store) => applyUpdateOrderStatus(store, form));
      return NextResponse.json({ ok: true });
    }

    if (op === "update-appointment") {
      await updateStore((store) => applyUpdateAppointmentStatus(store, form));
      return NextResponse.json({ ok: true });
    }

    if (op === "update-custom") {
      await updateStore((store) => applyUpdateCustomRequestStatus(store, form));
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown action." }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Could not save changes.",
      },
      { status: 500 },
    );
  }
}
