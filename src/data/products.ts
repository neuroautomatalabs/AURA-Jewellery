import type { Product, ProductSpecRow } from "@/lib/types";
import { getPiercing } from "@/data/piercings";

export const products: Product[] = [
  {
    id: "g18-petal-stud",
    name: "Petal Bloom Stud in 18K Gold",
    metal: "gold",
    karat: "18k",
    price: 4200,
    currency: "INR",
    piercings: ["lobe-lower", "aura-lobe", "helix", "forward-helix"],
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=85",
    style: "stud",
    unit: "single",
    description: "Soft petal silhouette in hallmarked 18K gold for daily wear.",
  },
  {
    id: "g18-dot-stud",
    name: "Classic Dot Stud – 18K Gold",
    metal: "gold",
    karat: "18k",
    price: 2499,
    currency: "INR",
    piercings: [
      "lobe-lower",
      "aura-lobe",
      "tragus",
      "helix",
      "low-helix",
      "forward-helix",
      "antitragus",
      "nostril",
      "high-nostril",
    ],
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85",
    style: "stud",
    unit: "single",
    description: "Minimal round stud — the everyday essential.",
  },
  {
    id: "g18-sphere-mini",
    name: "Mini Sphere Cartilage Stud",
    metal: "gold",
    karat: "18k",
    price: 3100,
    currency: "INR",
    piercings: [
      "tragus",
      "daith",
      "rook",
      "hidden-rook",
      "antitragus",
      "nostril",
      "high-nostril",
      "nose-tip",
    ],
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=85",
    style: "stud",
    unit: "single",
    description: "Compact sphere sized for cartilage placements.",
  },
  {
    id: "g22-lotus-stud",
    name: "Heritage Lotus Stud in 22K Gold",
    metal: "gold",
    karat: "22k",
    price: 6890,
    currency: "INR",
    piercings: ["lobe-lower", "aura-lobe", "conch", "nostril"],
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=85",
    style: "stud",
    unit: "single",
    description: "Traditional lotus motif in rich 22K gold.",
  },
  {
    id: "g22-coin-stud",
    name: "Polished Coin Stud – 22K",
    metal: "gold",
    karat: "22k",
    price: 7420,
    currency: "INR",
    piercings: ["lobe-lower", "aura-lobe", "contraconch", "conch"],
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=85",
    style: "stud",
    unit: "single",
    description: "Polished disc with a soft bevel edge.",
  },
  {
    id: "g22-temple-drop",
    name: "Temple Drop Charm – 22K Gold",
    metal: "gold",
    karat: "22k",
    price: 9200,
    currency: "INR",
    piercings: ["lobe-lower", "low-helix"],
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=85",
    style: "charm",
    unit: "single",
    description: "A gentle drop for lobe and low helix styling.",
  },
  {
    id: "g18-bar-helix",
    name: "Slim Helix Bar in 18K Gold",
    metal: "gold",
    karat: "18k",
    price: 3890,
    currency: "INR",
    piercings: ["helix", "aura-helix", "low-helix", "forward-helix", "bridge"],
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=85",
    style: "stud",
    unit: "single",
    description: "Elongated bar that follows the helix curve.",
  },
  {
    id: "g18-floral-lobe",
    name: "Floral Filigree Lobe Stud – 18K",
    metal: "gold",
    karat: "18k",
    price: 5120,
    currency: "INR",
    piercings: ["lobe-lower", "aura-lobe", "nostril"],
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=85",
    style: "stud",
    unit: "single",
    description: "Openwork floral detail for a graceful lobe look.",
  },
  {
    id: "d-solitaire",
    name: "Solitaire Diamond Spark Stud",
    metal: "diamond",
    price: 18500,
    currency: "INR",
    piercings: [
      "lobe-lower",
      "aura-lobe",
      "helix",
      "forward-helix",
      "tragus",
      "conch",
      "nostril",
      "high-nostril",
      "nose-tip",
    ],
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=85",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85",
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=900&q=85",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=85",
    ],
    sku: "AJDS0142",
    productSize: "3.0 mm",
    backSide: "Flat back · Length 6 mm · Thickness 0.8 mm",
    diamondShape: "Round Brilliant Cut",
    diamondCarat: "0.08 ct",
    diamondCount: "1 Pc",
    diamondColor: "E-F",
    diamondClarity: "VVS",
    style: "stud",
    unit: "single",
    description: "Single brilliant-cut diamond on a secure flat back.",
  },
  {
    id: "d-cluster-trio",
    name: "Diamond Cluster Trio Stud",
    metal: "diamond",
    price: 24800,
    currency: "INR",
    piercings: ["lobe-lower", "aura-lobe", "contraconch", "conch"],
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=85",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=85",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=85",
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=900&q=85",
    ],
    sku: "AJDC0318",
    productSize: "4.2 mm",
    backSide: "Screw back · Length 8 mm · Thickness 0.8 mm",
    diamondShape: "Round Brilliant Cut",
    diamondCarat: "0.12 ct",
    diamondCount: "3 Pcs",
    diamondColor: "E-F",
    diamondClarity: "VVS",
    style: "stud",
    unit: "single",
    description: "Three diamonds nestled in a soft cluster.",
  },
  {
    id: "d-invisible-set",
    name: "Invisible Set Diamond Stud",
    metal: "diamond",
    price: 32000,
    currency: "INR",
    piercings: ["rook", "aura-rook", "hidden-rook", "daith", "tragus"],
    image:
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=85",
    style: "stud",
    unit: "single",
    description: "Flush-set diamonds for a continuous light line.",
  },
  {
    id: "d-floating",
    name: "Floating Diamond Ear Stud",
    metal: "diamond",
    price: 27500,
    currency: "INR",
    piercings: [
      "aura-helix",
      "helix",
      "contraconch",
      "aura-rook",
      "forward-helix",
    ],
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=85",
    style: "stud",
    unit: "single",
    description: "Light-catching floating diamond for upper ear edits.",
  },
  {
    id: "d-marquise",
    name: "Marquise Diamond Tip Stud",
    metal: "diamond",
    price: 29800,
    currency: "INR",
    piercings: ["helix", "aura-helix", "low-helix", "forward-helix"],
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=85",
    style: "stud",
    unit: "single",
    description: "Faceted marquise that traces the rim of the ear.",
  },
  {
    id: "d-daith-gem",
    name: "Daith Diamond Gem Stud",
    metal: "diamond",
    price: 21000,
    currency: "INR",
    piercings: ["daith", "rook", "antitragus"],
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=85",
    style: "stud",
    unit: "single",
    description: "Curved-friendly gem stud sized for inner folds.",
  },
  {
    id: "g18-conch-bloom",
    name: "Conch Bloom Centrepiece – 18K",
    metal: "gold",
    karat: "18k",
    price: 5600,
    currency: "INR",
    piercings: ["conch", "contraconch"],
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=85",
    style: "stud",
    unit: "single",
    description: "Blooming centrepiece made for the conch bowl.",
  },
  {
    id: "g22-lobe-pair",
    name: "Heritage Pair Studs – 22K Gold",
    metal: "gold",
    karat: "22k",
    price: 11200,
    currency: "INR",
    piercings: ["lobe-lower", "aura-lobe"],
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85",
    style: "stud",
    unit: "pair",
    description: "Matched 22K studs for traditional lobe styling.",
  },
  {
    id: "d-antitragus-mini",
    name: "Mini Brilliance Diamond Stud",
    metal: "diamond",
    price: 16200,
    currency: "INR",
    piercings: [
      "antitragus",
      "tragus",
      "hidden-rook",
      "nostril",
      "high-nostril",
    ],
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=85",
    style: "stud",
    unit: "single",
    description: "Tiny diamond for smaller cartilage points.",
  },
  {
    id: "g18-star-stud",
    name: "Starlight Stud in 18K Gold",
    metal: "gold",
    karat: "18k",
    price: 3650,
    currency: "INR",
    piercings: ["lobe-lower", "aura-lobe", "helix", "forward-helix", "nostril"],
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=85",
    style: "stud",
    unit: "single",
    description: "A tiny star motif that catches light with every turn.",
  },
  {
    id: "g18-nose-pin",
    name: "Classic Filigree Nose Pin – 18K",
    metal: "gold",
    karat: "18k",
    price: 2890,
    currency: "INR",
    piercings: ["nostril", "high-nostril"],
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=85",
    style: "stud",
    unit: "single",
    description: "Delicate filigree nose pin for everyday nostril wear.",
  },
  {
    id: "g22-nose-ring",
    name: "Polished Nose Ring – 22K",
    metal: "gold",
    karat: "22k",
    price: 4580,
    currency: "INR",
    piercings: ["nostril", "septum"],
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=85",
    style: "hoop",
    unit: "single",
    description: "Slim polished hoop for nostril or septum styling.",
  },
  {
    id: "d-nose-solitaire",
    name: "Solitaire Diamond Nose Pin",
    metal: "diamond",
    price: 14200,
    currency: "INR",
    piercings: ["nostril", "high-nostril", "nose-tip"],
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=85",
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=85",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&q=85",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=900&q=85",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=900&q=85",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=85",
    ],
    sku: "AJNP0299",
    productSize: "3.3 mm",
    backSide: "Screw · Length 8 mm · Thickness 0.8 mm",
    diamondShape: "Round Brilliant Cut",
    diamondCarat: "0.05 ct",
    diamondCount: "1 Pc",
    diamondColor: "E-F",
    diamondClarity: "VVS",
    style: "stud",
    unit: "single",
    description: "Brilliant diamond pin sized for the nostril.",
  },
  {
    id: "g18-septum-clicker",
    name: "Aura Septum Clicker – 18K",
    metal: "gold",
    karat: "18k",
    price: 5200,
    currency: "INR",
    piercings: ["septum", "nasallang"],
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=85",
    style: "hoop",
    unit: "single",
    description: "Smooth clicker designed for comfortable septum wear.",
  },
  {
    id: "g18-bridge-bar",
    name: "Bridge Bar in 18K Gold",
    metal: "gold",
    karat: "18k",
    price: 4100,
    currency: "INR",
    piercings: ["bridge", "nasallang"],
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=85",
    style: "stud",
    unit: "single",
    description: "Straight bar for bridge and nasallang placements.",
  },
];

export function formatPrice(amount: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Shopify-style price line: 5,900.00 INR */
export function formatPricePlain(amount: number, currency = "INR") {
  const formatted = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${formatted} ${currency}`;
}

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function getProductSku(product: Product) {
  if (product.sku) return product.sku;
  return `AJ${product.id.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 8)}`;
}

export function getProductImages(product: Product): string[] {
  if (product.images?.length) return product.images;
  const base = product.image.split("?")[0];
  return [
    `${base}?w=900&q=85`,
    `${base}?w=900&h=900&fit=crop&crop=entropy&q=85`,
    `${base}?w=900&h=900&fit=crop&crop=edges&q=85`,
    `${base}?w=900&h=1100&fit=crop&crop=top&q=85`,
  ];
}

export function getMetalLabel(product: Product) {
  if (product.metal === "diamond") {
    return "18K Solid Gold setting · Natural Diamond";
  }
  return product.karat === "22k"
    ? "22K Solid Gold (BIS Hallmark)"
    : "18K Solid Gold (BIS Hallmark)";
}

export function getProductDetailRows(product: Product): ProductSpecRow[] {
  const placements = product.piercings
    .map((id) => getPiercing(id)?.name)
    .filter(Boolean)
    .join(", ");

  const rows: ProductSpecRow[] = [
    { label: "Style No", value: getProductSku(product) },
    { label: "Metal", value: getMetalLabel(product) },
    {
      label: "Metal tone",
      value: "Yellow Gold Solid",
    },
    {
      label: "Style",
      value: `${product.style.charAt(0).toUpperCase()}${product.style.slice(1)} · ${
        product.unit === "pair" ? "Sold as pair" : "Single piece"
      }`,
    },
  ];

  if (product.productSize) {
    rows.push({ label: "Product size", value: product.productSize });
  } else if (product.style === "stud") {
    rows.push({
      label: "Product size",
      value: product.unit === "pair" ? "Matched pair · lobe ready" : "Select size at checkout",
    });
  }

  if (product.backSide) {
    rows.push({ label: "Back / post", value: product.backSide });
  } else {
    rows.push({
      label: "Back / post",
      value:
        product.style === "hoop"
          ? "Hinged / clicker closure"
          : "Secure flat or screw back",
    });
  }

  if (placements) {
    rows.push({ label: "Best for", value: placements });
  }

  rows.push({
    label: "Certification",
    value:
      product.metal === "diamond"
        ? "BIS Hallmark gold · Natural diamond with certificate"
        : "BIS Hallmark",
  });

  return rows;
}

export function getDiamondDetailRows(product: Product): ProductSpecRow[] {
  if (product.metal !== "diamond") return [];
  return [
    {
      label: "Shape",
      value: product.diamondShape ?? "Round Brilliant Cut",
    },
    {
      label: "Carat weight",
      value: product.diamondCarat ?? "See certificate",
    },
    {
      label: "Number of diamonds",
      value: product.diamondCount ?? "1 Pc",
    },
    {
      label: "Color grade",
      value: product.diamondColor ?? "E-F",
    },
    {
      label: "Clarity grade",
      value: product.diamondClarity ?? "VVS",
    },
  ];
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.id !== product.id)
    .map((p) => ({
      product: p,
      score:
        (p.metal === product.metal ? 2 : 0) +
        p.piercings.filter((id) => product.piercings.includes(id)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.product);
}

export function filterProducts(
  list: Product[],
  opts: {
    metal?: "gold" | "diamond" | "all";
    karat?: "18k" | "22k" | "all";
    piercing?: string | null;
  },
) {
  return list.filter((p) => {
    if (opts.metal && opts.metal !== "all" && p.metal !== opts.metal)
      return false;
    if (
      opts.karat &&
      opts.karat !== "all" &&
      opts.metal !== "diamond" &&
      p.metal === "gold" &&
      p.karat !== opts.karat
    )
      return false;
    if (
      opts.piercing &&
      !p.piercings.includes(opts.piercing as Product["piercings"][number])
    )
      return false;
    return true;
  });
}
