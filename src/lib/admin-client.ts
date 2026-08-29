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
import type { AuraStore } from "@/lib/commerce";

export type AdminResult = { error?: string; id?: string; next?: string };

async function postForm(path: string, form: FormData): Promise<AdminResult> {
  const res = await fetch(path, {
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
  const res = await fetch("/api/admin/session", {
    credentials: "include",
  });
  if (!res.ok) return { ok: false, configured: false };
  return res.json() as Promise<{ ok: boolean; configured: boolean }>;
}

export async function clientLogin(
  password: string,
  next: string,
): Promise<AdminResult> {
  const res = await fetch("/api/admin/login", {
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
  await fetch("/api/admin/logout", {
    method: "POST",
    credentials: "include",
  });
}

export async function clientReadStore(): Promise<AuraStore> {
  const res = await fetch("/api/admin/store", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Could not load dashboard data.");
  return res.json() as Promise<AuraStore>;
}

export async function clientSaveProduct(form: FormData): Promise<AdminResult> {
  return postForm("/api/admin/mutate", withOp(form, "save-product"));
}

export async function clientDeleteProduct(form: FormData): Promise<AdminResult> {
  return postForm("/api/admin/mutate", withOp(form, "delete-product"));
}

export async function clientSaveBestsellers(
  form: FormData,
): Promise<AdminResult> {
  return postForm("/api/admin/mutate", withOp(form, "save-bestsellers"));
}

export async function clientUpdateOrderStatus(
  form: FormData,
): Promise<AdminResult> {
  return postForm("/api/admin/mutate", withOp(form, "update-order"));
}

export async function clientUpdateAppointmentStatus(
  form: FormData,
): Promise<AdminResult> {
  return postForm("/api/admin/mutate", withOp(form, "update-appointment"));
}

export async function clientUpdateCustomRequestStatus(
  form: FormData,
): Promise<AdminResult> {
  return postForm("/api/admin/mutate", withOp(form, "update-custom"));
}

function withOp(form: FormData, op: string) {
  form.set("op", op);
  return form;
}
