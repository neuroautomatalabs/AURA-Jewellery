import type { AuraStore, StoreAppointment, StoreCustomRequest } from "@/lib/commerce";
import { demoStore, nowIso, parseStore, uid } from "@/lib/store-core";

export const BROWSER_STORE_KEY = "aura-store-v1";
export const BROWSER_STORE_EVENT = "aura-store-changed";
const AUTH_KEY = "aura-admin-session";

export function readBrowserStore(): AuraStore {
  if (typeof window === "undefined") return demoStore();
  try {
    const raw = window.localStorage.getItem(BROWSER_STORE_KEY);
    if (!raw) {
      const store = demoStore();
      window.localStorage.setItem(BROWSER_STORE_KEY, JSON.stringify(store));
      return store;
    }
    return parseStore(JSON.parse(raw) as Partial<AuraStore>);
  } catch {
    return demoStore();
  }
}

export function writeBrowserStore(store: AuraStore) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(BROWSER_STORE_KEY, JSON.stringify(store));
  window.dispatchEvent(new Event(BROWSER_STORE_EVENT));
}

export function updateBrowserStore(mutator: (store: AuraStore) => void) {
  const store = readBrowserStore();
  mutator(store);
  writeBrowserStore(store);
  return store;
}

export function subscribeBrowserStore(onChange: () => void) {
  if (typeof window === "undefined") return () => undefined;
  const handler = () => onChange();
  window.addEventListener(BROWSER_STORE_EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(BROWSER_STORE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}

export function pagesAdminSessionActive() {
  if (typeof window === "undefined") return false;
  const expiresAt = Number(window.localStorage.getItem(AUTH_KEY));
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export function setPagesAdminSession() {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  window.localStorage.setItem(AUTH_KEY, String(expiresAt));
}

export function clearPagesAdminSession() {
  window.localStorage.removeItem(AUTH_KEY);
}

export function saveBrowserAppointment(entry: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  interest: string;
  piercing?: string;
  notes?: string;
}) {
  const stamp = nowIso();
  updateBrowserStore((store) => {
    store.appointments.unshift({
      id: uid("apt"),
      name: entry.name,
      email: entry.email,
      phone: entry.phone,
      date: entry.date,
      time: entry.time,
      interest: entry.interest,
      piercing: entry.piercing || "",
      notes: entry.notes || "",
      status: "new",
      createdAt: stamp,
      updatedAt: stamp,
    } satisfies StoreAppointment);
  });
}

export async function saveBrowserCustomRequest(entry: {
  name: string;
  email: string;
  phone: string;
  product: string;
  weight: string;
  notes?: string;
  imageFile?: File | null;
}) {
  const stamp = nowIso();
  let imageUrl = "";
  if (entry.imageFile && entry.imageFile.size > 0) {
    imageUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Could not read image."));
      reader.readAsDataURL(entry.imageFile as File);
    });
  }
  updateBrowserStore((store) => {
    store.customRequests.unshift({
      id: uid("custom"),
      name: entry.name,
      email: entry.email,
      phone: entry.phone,
      product: entry.product,
      weight: entry.weight,
      imageUrl,
      notes: entry.notes || "",
      status: "new",
      createdAt: stamp,
      updatedAt: stamp,
    } satisfies StoreCustomRequest);
  });
}
