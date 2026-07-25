import type { PiercingSpot } from "@/lib/types";

/** Hotspot % positions calibrated to /public/images/ear-piercing-map.png */
export const piercings: PiercingSpot[] = [
  {
    id: "aura-helix",
    name: "Aura Helix",
    shortName: "Aura Helix",
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
    x: 57,
    y: 36,
    healingWeeks: "6–12 months",
    description: "Flat mid-ear cartilage — a clean canvas for statement studs.",
  },
  {
    id: "daith",
    name: "Daith",
    shortName: "Daith",
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
    x: 53,
    y: 81,
    healingWeeks: "6–8 weeks",
    description:
      "The classic lobe — softest tissue, fastest heal, endless stud options.",
  },
];

export function getPiercing(id: string) {
  return piercings.find((p) => p.id === id);
}
