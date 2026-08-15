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
import {
  clearPagesAdminSession,
  pagesAdminSessionActive,
  readBrowserStore,
  setPagesAdminSession,
  subscribeBrowserStore,
  updateBrowserStore,
} from "@/lib/browser-store";
import type { AuraStore } from "@/lib/commerce";
import { isStaticPages, PAGES_ADMIN_PASSWORD } from "@/lib/static-pages";

export type AdminResult = { error?: string; id?: string; next?: string };

function apiPath(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${path}`;
}

async function fileToDataUrl(file: File) {
  if (file.size > 8 * 1024 * 1024) {
    throw new Error("Image must be under 8MB.");
  }
  try {
    const bitmap = await createImageBitmap(file);
    const max = 1400;
    const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Could not process image.");
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();
    return canvas.toDataURL("image/jpeg", 0.82);
  } catch {
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Could not read image."));
      reader.readAsDataURL(file);
    });
  }
}

async function postForm(path: string, form: FormData): Promise<AdminResult> {
  const res = await fetch(apiPath(path), {
    method: "POST",
    body: form,
    credentials: "include",
  });
  const json = (await res.json().catch(() => ({}))) as AdminResult;
  if (!res.ok) return { error: json.error || "Request failed." };
  return json;
}

export async function clientSession(): Promise<{
  ok: boolean;
  configured: boolean;
}> {
  if (isStaticPages) {
    return { ok: pagesAdminSessionActive(), configured: true };
  }
  const res = await fetch(apiPath("/api/admin/session"), {
    credentials: "include",
  });
  if (!res.ok) return { ok: false, configured: false };
  return res.json() as Promise<{ ok: boolean; configured: boolean }>;
}

export async function clientLogin(
  password: string,
  next: string,
): Promise<AdminResult> {
  if (isStaticPages) {
    if (password !== PAGES_ADMIN_PASSWORD) {
      return { error: "Incorrect password." };
    }
    setPagesAdminSession();
    return { next: next.startsWith("/admin") ? next : "/admin" };
  }

  const res = await fetch(apiPath("/api/admin/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ password, next }),
  });
  const json = (await res.json().catch(() => ({}))) as AdminResult;
  if (!res.ok) return { error: json.error || "Could not sign in." };
  return { next: json.next || "/admin" };
}

export async function clientLogout() {
  if (isStaticPages) {
    clearPagesAdminSession();
    return;
  }
  await fetch(apiPath("/api/admin/logout"), {
    method: "POST",
    credentials: "include",
  });
}

export async function clientReadStore(): Promise<AuraStore> {
  if (isStaticPages) return readBrowserStore();
  const res = await fetch(apiPath("/api/admin/store"), {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Could not load dashboard data.");
  return res.json() as Promise<AuraStore>;
}

export function watchStore(onChange: () => void) {
  if (!isStaticPages) return () => undefined;
  return subscribeBrowserStore(onChange);
}

export async function clientSaveProduct(form: FormData): Promise<AdminResult> {
  if (isStaticPages) {
    const photos = await resolvePhotoUrls(form, fileToDataUrl);
    if ("error" in photos) return photos;
    const store = readBrowserStore();
    const existing = store.products.find((p) => p.id === text(form, "id"));
    const built = catalogProductFromForm(form, photos.urls, existing);
    if ("error" in built) return built;
    updateBrowserStore((draft) => applySaveProduct(draft, built.product));
    return { id: built.product.id };
  }
  return postForm("/api/admin/mutate", withOp(form, "save-product"));
}

export async function clientDeleteProduct(form: FormData): Promise<AdminResult> {
  if (isStaticPages) {
    const id = text(form, "id");
    if (!id) return { error: "Missing product." };
    updateBrowserStore((draft) => applyDeleteProduct(draft, id));
    return {};
  }
  return postForm("/api/admin/mutate", withOp(form, "delete-product"));
}

export async function clientSaveBestsellers(
  form: FormData,
): Promise<AdminResult> {
  if (isStaticPages) {
    updateBrowserStore((draft) => applySaveBestsellers(draft, form));
    return {};
  }
  return postForm("/api/admin/mutate", withOp(form, "save-bestsellers"));
}

export async function clientUpdateOrderStatus(
  form: FormData,
): Promise<AdminResult> {
  if (isStaticPages) {
    updateBrowserStore((draft) => applyUpdateOrderStatus(draft, form));
    return {};
  }
  return postForm("/api/admin/mutate", withOp(form, "update-order"));
}

export async function clientUpdateAppointmentStatus(
  form: FormData,
): Promise<AdminResult> {
  if (isStaticPages) {
    updateBrowserStore((draft) => applyUpdateAppointmentStatus(draft, form));
    return {};
  }
  return postForm("/api/admin/mutate", withOp(form, "update-appointment"));
}

export async function clientUpdateCustomRequestStatus(
  form: FormData,
): Promise<AdminResult> {
  if (isStaticPages) {
    updateBrowserStore((draft) => applyUpdateCustomRequestStatus(draft, form));
    return {};
  }
  return postForm("/api/admin/mutate", withOp(form, "update-custom"));
}

function withOp(form: FormData, op: string) {
  form.set("op", op);
  return form;
}
