import type {
  EarPiercingId,
  NosePiercingId,
  PiercingSpot,
  PiercingRegion,
  PiercingId,
} from "@/lib/types";

export type EarPiercingSpot = PiercingSpot & {
  id: EarPiercingId;
  region: "ear";
};

export type NosePiercingSpot = PiercingSpot & {
  id: NosePiercingId;
  region: "nose";
};

/** Hotspot % positions calibrated to /public/images/ear-piercing-map.png */
export const earPiercings: EarPiercingSpot[] = [
  {
    id: "aura-helix",
    name: "Aura Helix",
    shortName: "Aura Helix",
    region: "ear",
    x: 53,
    y: 10,
    healingWeeks: "6–9 months",
    description:
      "A refined placement along the uppermost outer rim — ideal for delicate studs and petite hoops.",
  },
  {
    id: "aura-rook",
    name: "Aura Rook",
    shortName: "Aura Rook",
    region: "ear",
    x: 47,
    y: 17,
    healingWeeks: "6–12 months",
    description:
      "Sits on the upper inner flat of the ear. Looks striking with a single brilliant stud.",
  },
  {
    id: "helix",
    name: "Helix",
    shortName: "Helix",
    region: "ear",
    x: 66,
    y: 23,
    healingWeeks: "6–12 months",
    description:
      "Classic outer-rim cartilage piercing. Works beautifully with gold or diamond studs.",
  },
  {
    id: "forward-helix",
    name: "Forward Helix",
    shortName: "Forward Helix",
    region: "ear",
    x: 29,
    y: 27,
    healingWeeks: "6–12 months",
    description:
      "On the front curve near the face — perfect for stacked mini studs.",
  },
  {
    id: "hidden-rook",
    name: "Hidden Rook",
    shortName: "Hidden Rook",
    region: "ear",
    x: 39,
    y: 21,
    healingWeeks: "6–12 months",
    description:
      "Tucked under the upper fold for a discreet flash of metal or diamond.",
  },
  {
    id: "rook",
    name: "Rook",
    shortName: "Rook",
    region: "ear",
    x: 43,
    y: 28,
    healingWeeks: "6–12 months",
    description:
      "The antihelix fold. Curved bars and compact studs sit best here.",
  },
  {
    id: "contraconch",
    name: "Contraconch",
    shortName: "Contraconch",
    region: "ear",
    x: 57,
    y: 36,
    healingWeeks: "6–12 months",
    description: "Flat mid-ear cartilage — a clean canvas for statement studs.",
  },
  {
    id: "daith",
    name: "Daith",
    shortName: "Daith",
    region: "ear",
    x: 39,
    y: 43,
    healingWeeks: "6–12 months",
    description:
      "Innermost fold above the canal. Often styled with a small hoop or gem stud.",
  },
  {
    id: "tragus",
    name: "Tragus",
    shortName: "Tragus",
    region: "ear",
    x: 31,
    y: 49,
    healingWeeks: "6–12 months",
    description:
      "The small flap over the ear canal. Compact flat-back studs are ideal.",
  },
  {
    id: "conch",
    name: "Conch",
    shortName: "Conch",
    region: "ear",
    x: 53,
    y: 49,
    healingWeeks: "6–12 months",
    description:
      "The bowl of the ear. Holds bold studs and mid-size decorative pieces.",
  },
  {
    id: "low-helix",
    name: "Low Helix",
    shortName: "Low Helix",
    region: "ear",
    x: 69,
    y: 55,
    healingWeeks: "6–12 months",
    description:
      "Lower outer rim — bridges helix styling down toward the lobe.",
  },
  {
    id: "antitragus",
    name: "Antitragus",
    shortName: "Antitragus",
    region: "ear",
    x: 48,
    y: 59,
    healingWeeks: "6–12 months",
    description:
      "Small ridge above the lobe. Best with petite, low-profile studs.",
  },
  {
    id: "aura-lobe",
    name: "Aura Lobe",
    shortName: "Aura Lobe",
    region: "ear",
    x: 51,
    y: 69,
    healingWeeks: "6–8 weeks",
    description:
      "Upper lobe placement for layered looks with second and third holes.",
  },
  {
    id: "lobe-lower",
    name: "Lobe Lower",
    shortName: "Lobe",
    region: "ear",
    x: 53,
    y: 81,
    healingWeeks: "6–8 weeks",
    description:
      "The classic lobe — softest tissue, fastest heal, endless stud options.",
  },
];

export const nosePiercings: NosePiercingSpot[] = [
  {
    id: "bridge",
    name: "Bridge",
    shortName: "Bridge",
    region: "nose",
    x: 50,
    y: 22,
    healingWeeks: "8–12 weeks",
    description:
      "Across the upper bridge — styled with a slim bar or matching mini studs.",
  },
  {
    id: "high-nostril",
    name: "High Nostril",
    shortName: "High Nostril",
    region: "nose",
    x: 38,
    y: 48,
    healingWeeks: "4–6 months",
    description:
      "Higher on the nostril wall — perfect for a petite gold or diamond pin.",
  },
  {
    id: "nostril",
    name: "Nostril",
    shortName: "Nostril",
    region: "nose",
    x: 36,
    y: 62,
    healingWeeks: "3–4 months",
    description:
      "The classic side nostril — nose pins, studs, and fine rings shine here.",
  },
  {
    id: "septum",
    name: "Septum",
    shortName: "Septum",
    region: "nose",
    x: 50,
    y: 68,
    healingWeeks: "6–8 weeks",
    description:
      "Through the soft tissue of the septum — rings and clickers sit beautifully.",
  },
  {
    id: "nose-tip",
    name: "Nose Tip",
    shortName: "Tip",
    region: "nose",
    x: 50,
    y: 78,
    healingWeeks: "4–6 months",
    description:
      "Centered on the tip — a bold statement with a single brilliant stud.",
  },
  {
    id: "nasallang",
    name: "Nasallang",
    shortName: "Nasallang",
    region: "nose",
    x: 64,
    y: 58,
    healingWeeks: "4–6 months",
    description:
      "Through both nostrils and the septum — dramatic, best with a straight bar.",
  },
];

export const piercings: PiercingSpot[] = [...earPiercings, ...nosePiercings];

export function getPiercing(id: string) {
  return piercings.find((p) => p.id === id);
}

export function getPiercingsByRegion(region: PiercingRegion) {
  return piercings.filter((p) => p.region === region);
}

export function isNosePiercing(id: PiercingId) {
  return nosePiercings.some((p) => p.id === id);
}
