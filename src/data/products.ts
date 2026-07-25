import type { Product } from "@/lib/types";

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
    ],
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85",
    style: "stud",
    description: "Minimal round stud — the everyday essential.",
  },
  {
    id: "g18-sphere-mini",
    name: "Mini Sphere Cartilage Stud",
    metal: "gold",
    karat: "18k",
    price: 3100,
    currency: "INR",
    piercings: ["tragus", "daith", "rook", "hidden-rook", "antitragus"],
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=85",
    style: "stud",
    description: "Compact sphere sized for cartilage placements.",
  },
  {
    id: "g22-lotus-stud",
    name: "Heritage Lotus Stud in 22K Gold",
    metal: "gold",
    karat: "22k",
    price: 6890,
    currency: "INR",
    piercings: ["lobe-lower", "aura-lobe", "conch"],
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=85",
    style: "stud",
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
    description: "A gentle drop for lobe and low helix styling.",
  },
  {
    id: "g18-bar-helix",
    name: "Slim Helix Bar in 18K Gold",
    metal: "gold",
    karat: "18k",
    price: 3890,
    currency: "INR",
    piercings: ["helix", "aura-helix", "low-helix", "forward-helix"],
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=85",
    style: "stud",
    description: "Elongated bar that follows the helix curve.",
  },
  {
    id: "g18-floral-lobe",
    name: "Floral Filigree Lobe Stud – 18K",
    metal: "gold",
    karat: "18k",
    price: 5120,
    currency: "INR",
    piercings: ["lobe-lower", "aura-lobe"],
    image:
      "https://images.unsplash.com/photo-1601121141461-9d664305bec6?w=800&q=85",
    style: "stud",
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
    ],
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=85",
    style: "stud",
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
    style: "stud",
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
      "https://images.unsplash.com/photo-1601121141461-9d664305bec6?w=800&q=85",
    style: "stud",
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
    description: "Matched 22K studs for traditional lobe styling.",
  },
  {
    id: "d-antitragus-mini",
    name: "Mini Brilliance Diamond Stud",
    metal: "diamond",
    price: 16200,
    currency: "INR",
    piercings: ["antitragus", "tragus", "hidden-rook"],
    image:
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=85",
    style: "stud",
    description: "Tiny diamond for smaller cartilage points.",
  },
  {
    id: "g18-star-stud",
    name: "Starlight Stud in 18K Gold",
    metal: "gold",
    karat: "18k",
    price: 3650,
    currency: "INR",
    piercings: ["lobe-lower", "aura-lobe", "helix", "forward-helix"],
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=85",
    style: "stud",
    description: "A tiny star motif that catches light with every turn.",
  },
];

export function formatPrice(amount: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
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
