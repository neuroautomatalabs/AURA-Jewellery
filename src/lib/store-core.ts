import { products as seedProducts } from "@/data/products";
import type {
  AuraStore,
  CatalogProduct,
  StoreAppointment,
  StoreCustomRequest,
  StoreOrder,
} from "@/lib/commerce";
import type { Product } from "@/lib/types";

export function nowIso() {
  return new Date().toISOString();
}

export function toCatalogProduct(
  product: Product,
  index?: number,
): CatalogProduct {
  const stamp = nowIso();
  const featured = typeof index === "number" && index < 8;
  return {
    ...product,
    currency: product.currency || "INR",
    published: true,
    stock: null,
    bestseller: featured,
    bestsellerRank: featured ? index + 1 : null,
    createdAt: stamp,
    updatedAt: stamp,
  };
}

function without22k(value: string) {
  return value.replace(/22K/gi, "18K");
}

export function normalizeCatalogProduct(item: CatalogProduct): CatalogProduct {
  return {
    ...item,
    name: without22k(item.name),
    description: without22k(item.description),
    metalDisplay: item.metalDisplay ? without22k(item.metalDisplay) : undefined,
    karat: item.metal === "gold" ? "18k" : undefined,
    bestseller: Boolean(item.bestseller),
    bestsellerRank:
      typeof item.bestsellerRank === "number" ? item.bestsellerRank : null,
  };
}

export function toPublicProduct(product: CatalogProduct): Product {
  return {
    id: product.id,
    name: without22k(product.name),
    metal: product.metal,
    karat: product.metal === "gold" ? "18k" : undefined,
    price: product.price,
    currency: product.currency,
    piercings: product.piercings,
    image: product.image,
    images: product.images,
    sku: product.sku,
    style: product.style,
    unit: product.unit,
    description: without22k(product.description),
    productSize: product.productSize,
    sizes: product.sizes,
    backSide: product.backSide,
    metalDisplay: product.metalDisplay
      ? without22k(product.metalDisplay)
      : undefined,
    metalTone: product.metalTone,
    styleDisplay: product.styleDisplay,
    certification: product.certification,
    diamondShape: product.diamondShape,
    diamondCarat: product.diamondCarat,
    diamondCount: product.diamondCount,
    diamondColor: product.diamondColor,
    diamondClarity: product.diamondClarity,
  };
}

export function emptyStore(): AuraStore {
  return {
    products: seedProducts.map((product, index) =>
      toCatalogProduct(product, index),
    ),
    orders: [],
    appointments: [],
    customRequests: [],
    deletedProductIds: [],
    orderSeq: 1,
  };
}

export function mergeSeed(store: AuraStore) {
  const existing = new Set(store.products.map((p) => p.id));
  const deleted = new Set(store.deletedProductIds);
  for (const product of seedProducts) {
    if (existing.has(product.id) || deleted.has(product.id)) continue;
    store.products.push(toCatalogProduct(product));
  }
}

export function parseStore(raw: Partial<AuraStore> | null | undefined): AuraStore {
  const parsed = raw ?? {};
  const store: AuraStore = {
    products: (Array.isArray(parsed.products) ? parsed.products : []).map(
      (item) => normalizeCatalogProduct(item),
    ),
    orders: Array.isArray(parsed.orders) ? parsed.orders : [],
    appointments: Array.isArray(parsed.appointments)
      ? parsed.appointments
      : [],
    customRequests: Array.isArray(parsed.customRequests)
      ? parsed.customRequests
      : [],
    deletedProductIds: Array.isArray(parsed.deletedProductIds)
      ? parsed.deletedProductIds
      : [],
    orderSeq:
      typeof parsed.orderSeq === "number" && parsed.orderSeq > 0
        ? parsed.orderSeq
        : 1,
  };
  if (store.products.length === 0) {
    store.products = seedProducts.map((product, index) =>
      toCatalogProduct(product, index),
    );
  } else {
    mergeSeed(store);
  }
  return store;
}

export function nextOrderId(store: AuraStore) {
  const stamp = new Date();
  const y = String(stamp.getFullYear()).slice(2);
  const m = String(stamp.getMonth() + 1).padStart(2, "0");
  const d = String(stamp.getDate()).padStart(2, "0");
  const seq = String(store.orderSeq).padStart(4, "0");
  store.orderSeq += 1;
  return `AJ-${y}${m}${d}-${seq}`;
}

export function uid(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}${Math.random()
    .toString(36)
    .slice(2, 6)}`;
}

export function publicCatalog(store: AuraStore): Product[] {
  return store.products.filter((p) => p.published).map(toPublicProduct);
}

export function publicBestsellers(store: AuraStore, limit = 8): Product[] {
  const live = store.products.filter((p) => p.published);
  const featured = live
    .filter((p) => p.bestseller)
    .sort((a, b) => (a.bestsellerRank ?? 99) - (b.bestsellerRank ?? 99))
    .map(toPublicProduct);
  if (featured.length) return featured.slice(0, limit);
  return live.slice(0, limit).map(toPublicProduct);
}

export function demoStore(): AuraStore {
  const store = emptyStore();
  const stamp = nowIso();
  const paidAt = new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString();
  const shippedAt = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString();
  const feature = store.products[0];
  const second = store.products[1] ?? feature;

  const paid: StoreOrder = {
    id: nextOrderId(store),
    status: "paid",
    customer: {
      name: "Ananya Sharma",
      email: "ananya.demo@example.com",
      phone: "9876543210",
    },
    shipping: {
      line1: "12, Park Street",
      city: "Mumbai",
      state: "MH",
      pincode: "400001",
    },
    lines: [
      {
        productId: feature.id,
        name: feature.name,
        size: "3mm",
        qty: 1,
        unitPrice: feature.price,
        lineTotal: feature.price,
      },
    ],
    amountInr: feature.price,
    currency: "INR",
    customerNote: "Please gift-wrap.",
    timeline: [{ status: "paid", at: paidAt, note: "Razorpay test payment" }],
    createdAt: paidAt,
    updatedAt: paidAt,
  };

  const shipped: StoreOrder = {
    id: nextOrderId(store),
    status: "shipped",
    customer: {
      name: "Rahul Iyer",
      email: "rahul.demo@example.com",
      phone: "9123456780",
    },
    shipping: {
      line1: "88, MG Road",
      city: "Bengaluru",
      state: "KA",
      pincode: "560001",
    },
    lines: [
      {
        productId: second.id,
        name: second.name,
        size: null,
        qty: 1,
        unitPrice: second.price,
        lineTotal: second.price,
      },
    ],
    amountInr: second.price,
    currency: "INR",
    courier: "Delhivery",
    trackingNumber: "AURA123456789",
    timeline: [
      { status: "paid", at: shippedAt },
      { status: "confirmed", at: shippedAt },
      { status: "making", at: shippedAt },
      { status: "packed", at: shippedAt },
      { status: "shipped", at: stamp, note: "Demo tracking" },
    ],
    createdAt: shippedAt,
    updatedAt: stamp,
  };

  const booking: StoreAppointment = {
    id: uid("apt"),
    name: "Meera Kapoor",
    email: "meera.demo@example.com",
    phone: "9000011111",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
    time: "11:00 AM",
    interest: "Piercing",
    piercing: "Helix",
    notes: "First cartilage piercing — would like gold options.",
    status: "new",
    createdAt: stamp,
    updatedAt: stamp,
  };

  const custom: StoreCustomRequest = {
    id: uid("custom"),
    name: "Dev Patel",
    email: "dev.demo@example.com",
    phone: "9888877777",
    product: "Stud",
    weight: "2.5gm",
    imageUrl: "",
    notes: "Looking for a custom 18K lotus stud, pair.",
    status: "new",
    createdAt: stamp,
    updatedAt: stamp,
  };

  store.orders = [paid, shipped];
  store.appointments = [booking];
  store.customRequests = [custom];
  return store;
}
