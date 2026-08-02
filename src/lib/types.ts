export type MetalType = "gold" | "diamond";
export type GoldKarat = "18k" | "22k";

export type EarPiercingId =
  | "aura-helix"
  | "aura-rook"
  | "helix"
  | "contraconch"
  | "conch"
  | "low-helix"
  | "lobe-lower"
  | "aura-lobe"
  | "antitragus"
  | "tragus"
  | "daith"
  | "forward-helix"
  | "hidden-rook"
  | "rook";

export type NosePiercingId =
  | "nostril"
  | "high-nostril"
  | "septum"
  | "bridge"
  | "nose-tip"
  | "nasallang";

export type PiercingId = EarPiercingId | NosePiercingId;

export type PiercingRegion = "ear" | "nose";

export interface PiercingSpot {
  id: PiercingId;
  name: string;
  shortName: string;
  region: PiercingRegion;
  /** Percent positions relative to ear image */
  x: number;
  y: number;
  healingWeeks: string;
  description: string;
}

/** Typical face diameters for single studs */
export type StudSize = "2.5mm" | "3mm" | "4mm" | "5mm" | "6mm";

export interface ProductSpecRow {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  metal: MetalType;
  karat?: GoldKarat;
  price: number;
  currency: string;
  piercings: PiercingId[];
  image: string;
  /** Extra gallery shots; falls back to crop variants of `image` */
  images?: string[];
  /** Store SKU shown on the product page */
  sku?: string;
  style: "stud" | "hoop" | "charm";
  /** Pair studs skip size picker; single studs show mm options */
  unit: "single" | "pair";
  description: string;
  /** Optional face size / hardware notes for the detail table */
  productSize?: string;
  backSide?: string;
  diamondShape?: string;
  diamondCarat?: string;
  diamondCount?: string;
  diamondColor?: string;
  diamondClarity?: string;
}

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  readMinutes: number;
  content: string[];
}

export interface CartItem {
  productId: string;
  size: StudSize | null;
  qty: number;
}
