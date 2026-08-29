import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type {
  AuraStore,
  StoreAppointment,
  StoreCustomRequest,
  StoreOrder,
} from "@/lib/commerce";
import { hasDatabase } from "@/lib/db";
import { readStorePg, updateStorePg } from "@/lib/store-pg";
import { parseStore, emptyStore } from "@/lib/store-core";

export {
  toCatalogProduct,
  toPublicProduct,
  nextOrderId,
  uid,
} from "@/lib/store-core";

const STORE_PATH = path.join(process.cwd(), "data", "aura-store.json");

let fileQueue: Promise<unknown> = Promise.resolve();

async function readStoreFile(): Promise<AuraStore> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    return parseStore(JSON.parse(raw) as Partial<AuraStore>);
  } catch {
    return emptyStore();
  }
}

async function writeStoreFile(store: AuraStore) {
  await mkdir(path.dirname(STORE_PATH), { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

async function updateStoreFile<T>(
  mutator: (store: AuraStore) => T | Promise<T>,
): Promise<T> {
  const run = fileQueue.then(async () => {
    const store = await readStoreFile();
    const result = await mutator(store);
    await writeStoreFile(store);
    return result;
  });
  fileQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export async function readStore() {
  if (hasDatabase()) return readStorePg();
  return readStoreFile();
}

export async function updateStore<T>(
  mutator: (store: AuraStore) => T | Promise<T>,
): Promise<T> {
  if (hasDatabase()) return updateStorePg(mutator);
  return updateStoreFile(mutator);
}

export async function getOrderByRazorpayId(razorpayOrderId: string) {
  const store = await readStore();
  return store.orders.find((o) => o.razorpayOrderId === razorpayOrderId);
}

export async function saveOrder(order: StoreOrder) {
  return updateStore((store) => {
    const idx = store.orders.findIndex((o) => o.id === order.id);
    if (idx >= 0) store.orders[idx] = order;
    else store.orders.unshift(order);
    return order;
  });
}

export async function saveAppointment(entry: StoreAppointment) {
  return updateStore((store) => {
    store.appointments.unshift(entry);
    return entry;
  });
}

export async function saveCustomRequest(entry: StoreCustomRequest) {
  return updateStore((store) => {
    store.customRequests.unshift(entry);
    return entry;
  });
}
