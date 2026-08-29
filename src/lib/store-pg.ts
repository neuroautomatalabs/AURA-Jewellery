import type { AuraStore } from "@/lib/commerce";
import { readStorePayload, withStoreTransaction } from "@/lib/db";
import { emptyStore, parseStore } from "@/lib/store-core";

export async function readStorePg(): Promise<AuraStore> {
  const payload = await readStorePayload();
  if (!payload) {
    const seeded = emptyStore();
    await withStoreTransaction(async () => ({
      result: seeded,
      payload: seeded,
    }));
    return seeded;
  }
  return parseStore(payload as Partial<AuraStore>);
}

export async function updateStorePg<T>(
  mutator: (store: AuraStore) => T | Promise<T>,
): Promise<T> {
  return withStoreTransaction(async (payload) => {
    const store = payload ? parseStore(payload as Partial<AuraStore>) : emptyStore();
    const result = await mutator(store);
    return { result, payload: store };
  });
}
