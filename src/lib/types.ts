export type MetalType = "gold" | "diamond";
export type GoldKarat = "18k" | "22k";

export type PiercingId =
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

export interface PiercingSpot {
  id: PiercingId;
  name: string;
  shortName: string;
  /** Percent positions relative to ear image */
  x: number;
  y: number;
  healingWeeks: string;
  description: string;
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
  style: "stud" | "hoop" | "charm";
  description: string;
}

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  readMinutes: number;
  content: string[];
}
