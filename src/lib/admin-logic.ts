import {
  canTransition,
  type AppointmentStatus,
  type CatalogProduct,
  type CustomRequestStatus,
  type OrderStatus,
  type AuraStore,
} from "@/lib/commerce";
import type { MetalType, PiercingId, Product } from "@/lib/types";

const PIERCING_IDS = new Set<string>([
  "aura-helix",
  "aura-rook",
  "helix",
  "contraconch",
  "conch",
  "low-helix",
  "lobe-lower",
  "aura-lobe",
  "antitragus",
  "tragus",
  "daith",
  "forward-helix",
  "hidden-rook",
  "rook",
  "nostril",
  "septum",
]);

export function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function parseBestsellerRank(raw: string) {
  if (!raw) return null;
  const rank = Number(raw);
  if (!Number.isFinite(rank) || rank < 1) return null;
  return Math.min(99, Math.floor(rank));
}

export function slugify(name: string) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
  return `${base || "piece"}-${Date.now().toString(36).slice(-4)}`;
}

export function catalogProductFromForm(
  form: FormData,
  imageUrls: string[],
  existing?: CatalogProduct,
): { error: string } | { product: CatalogProduct } {
  const existingId = text(form, "id");
  const name = text(form, "name");
  const price = Number(text(form, "price"));
  const metal = text(form, "metal") as MetalType;
  const style = text(form, "style") as Product["style"];
  const unit = text(form, "unit") as Product["unit"];
  const description = text(form, "description");

  if (!name) return { error: "Name is required." };
  if (!Number.isFinite(price) || price < 1) {
    return { error: "Enter a valid price in INR." };
  }
  if (metal !== "gold" && metal !== "diamond") {
    return { error: "Choose gold or diamond." };
  }
  if (!["stud", "hoop", "charm"].includes(style)) {
    return { error: "Choose a style." };
  }
  if (unit !== "single" && unit !== "pair") {
    return { error: "Choose single or pair." };
  }
  if (!imageUrls.length) return { error: "Add at least one photo." };

  const piercings = form
    .getAll("piercings")
    .map((value) => (typeof value === "string" ? value : ""))
    .filter((id): id is PiercingId => PIERCING_IDS.has(id));

  const stockRaw = text(form, "stock");
  const stamp = new Date().toISOString();

  const product: CatalogProduct = {
    id: existingId || existing?.id || slugify(name),
    name,
    metal,
    karat: metal === "gold" ? "18k" : undefined,
    price,
    currency: "INR",
    piercings,
    image: imageUrls[0],
    images: imageUrls.length > 1 ? imageUrls.slice(1) : undefined,
    sku: text(form, "sku") || undefined,
    style,
    unit,
    description,
    sizes:
      style === "stud" && unit === "single"
        ? form
            .getAll("sizes")
            .map((value) => (typeof value === "string" ? value.trim() : ""))
            .filter(Boolean)
        : undefined,
    productSize: text(form, "productSize") || undefined,
    backSide: text(form, "backSide") || undefined,
    metalDisplay: text(form, "metalDisplay") || undefined,
    metalTone: text(form, "metalTone") || undefined,
    styleDisplay: text(form, "styleDisplay") || undefined,
    certification: text(form, "certification") || undefined,
    diamondShape: text(form, "diamondShape") || undefined,
    diamondCarat: text(form, "diamondCarat") || undefined,
    diamondCount: text(form, "diamondCount") || undefined,
    diamondColor: text(form, "diamondColor") || undefined,
    diamondClarity: text(form, "diamondClarity") || undefined,
    published: text(form, "published") === "on",
    stock: stockRaw === "" ? null : Math.max(0, Math.floor(Number(stockRaw))),
    bestseller: text(form, "bestseller") === "on",
    bestsellerRank: parseBestsellerRank(text(form, "bestsellerRank")),
    createdAt: existing?.createdAt ?? stamp,
    updatedAt: stamp,
  };

  if (!product.bestseller) product.bestsellerRank = null;

  if (stockRaw !== "" && !Number.isFinite(product.stock)) {
    return { error: "Stock must be a number, or leave blank for made-to-order." };
  }

  return { product };
}

export function applySaveProduct(store: AuraStore, product: CatalogProduct) {
  const idx = store.products.findIndex((p) => p.id === product.id);
  if (idx >= 0) {
    product.createdAt = store.products[idx].createdAt;
    store.products[idx] = product;
  } else {
    store.products.unshift(product);
  }
}

export function applyDeleteProduct(store: AuraStore, id: string) {
  store.products = store.products.filter((p) => p.id !== id);
  if (!store.deletedProductIds.includes(id)) {
    store.deletedProductIds.push(id);
  }
}

export function applySaveBestsellers(store: AuraStore, form: FormData) {
  const selected = new Set(
    form
      .getAll("bestsellerId")
      .filter(
        (value): value is string => typeof value === "string" && value.length > 0,
      ),
  );
  const stamp = new Date().toISOString();
  for (const product of store.products) {
    product.bestseller = selected.has(product.id);
    product.bestsellerRank = product.bestseller
      ? parseBestsellerRank(text(form, `rank_${product.id}`))
      : null;
    product.updatedAt = stamp;
  }
}

export function applyUpdateOrderStatus(store: AuraStore, form: FormData) {
  const id = text(form, "id");
  const status = text(form, "status") as OrderStatus;
  const note = text(form, "note");
  const courier = text(form, "courier");
  const trackingNumber = text(form, "trackingNumber");
  const internalNotes = text(form, "internalNotes");
  const order = store.orders.find((o) => o.id === id);
  if (!order) return;
  if (status && status !== order.status) {
    if (!canTransition(order.status, status)) return;
    order.status = status;
    order.timeline.push({
      status,
      at: new Date().toISOString(),
      note: note || undefined,
    });
  }
  if (courier !== undefined) order.courier = courier || undefined;
  if (trackingNumber !== undefined) {
    order.trackingNumber = trackingNumber || undefined;
  }
  if (form.has("internalNotes")) {
    order.internalNotes = internalNotes || undefined;
  }
  order.updatedAt = new Date().toISOString();
}

export function applyUpdateAppointmentStatus(store: AuraStore, form: FormData) {
  const id = text(form, "id");
  const status = text(form, "status") as AppointmentStatus;
  const row = store.appointments.find((a) => a.id === id);
  if (!row) return;
  row.status = status;
  row.updatedAt = new Date().toISOString();
}

export function applyUpdateCustomRequestStatus(
  store: AuraStore,
  form: FormData,
) {
  const id = text(form, "id");
  const status = text(form, "status") as CustomRequestStatus;
  const row = store.customRequests.find((a) => a.id === id);
  if (!row) return;
  row.status = status;
  row.updatedAt = new Date().toISOString();
}

export async function resolvePhotoUrls(
  form: FormData,
  saveFile: (file: File) => Promise<string>,
): Promise<{ error: string } | { urls: string[] }> {
  try {
    const orderRaw = text(form, "photoOrder");
    const order = orderRaw ? (JSON.parse(orderRaw) as unknown) : [];
    const slots = Array.isArray(order)
      ? order.filter(
          (item): item is string => typeof item === "string" && item.length > 0,
        )
      : [];
    const files = form
      .getAll("photos")
      .filter((item): item is File => item instanceof File && item.size > 0);

    const urls: string[] = [];
    let fileIndex = 0;
    for (const slot of slots) {
      if (slot === "new") {
        const file = files[fileIndex++];
        if (!file) continue;
        urls.push(await saveFile(file));
      } else if (slot.startsWith("/") || slot.startsWith("https://") || slot.startsWith("data:")) {
        urls.push(slot);
      }
    }
    if (!urls.length) return { error: "Add at least one photo." };
    return { urls };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Could not save photos.",
    };
  }
}
