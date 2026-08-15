import type { Guide } from "@/lib/types";

export const guides: Guide[] = [
  {
    slug: "first-piercing",
    title: "Your First Piercing",
    excerpt:
      "What to expect before, during, and after your first appointment — calm, clear, and practical.",
    readMinutes: 4,
    content: [
      "Book a consultation so we can map placements that suit your ear shape and lifestyle.",
      "Wear clean hair, eat a light meal, and avoid alcohol the day of your piercing.",
      "We use sterile, single-use needles and implant-grade or solid gold jewellery only.",
      "Plan for mild tenderness for a few days. Sleep on the opposite side when possible.",
      "Follow the aftercare card we give you — consistency heals faster than perfection.",
    ],
  },
  {
    slug: "aftercare",
    title: "Piercing Aftercare",
    excerpt:
      "A simple daily routine that protects fresh piercings without over-cleaning.",
    readMinutes: 5,
    content: [
      "Wash hands before you touch jewellery or the piercing site.",
      "Clean twice daily with sterile saline spray — no alcohol, peroxide, or tea tree oil.",
      "Pat dry with clean tissue. Do not twist or remove jewellery during healing.",
      "Avoid swimming pools, hot tubs, and makeup near the area until healed.",
      "If you see unusual swelling, heat, or discharge, contact us — we are here to help.",
    ],
  },
  {
    slug: "gold-vs-diamond",
    title: "Choosing Gold or Diamond",
    excerpt:
      "How metal and gem choice change look, weight, and everyday wear.",
    readMinutes: 3,
    content: [
      "18k gold is durable and ideal for everyday cartilage and lobe wear.",
      "Diamond studs add light and work beautifully as anchors in a curated ear edit.",
      "Match size to placement: smaller stones for tragus and rook, fuller stones for lobe and conch.",
      "Not sure? Tap a spot on our ear map and filter Gold or Diamond to see what fits.",
    ],
  },
  {
    slug: "curated-ear",
    title: "Building a Curated Ear",
    excerpt:
      "Balance, spacing, and metal harmony — how we style multiple piercings together.",
    readMinutes: 4,
    content: [
      "Start with one anchor piece (often lobe or conch), then add quieter companions.",
      "Keep metals consistent across the ear for a polished, intentional look.",
      "Leave breathing room between placements so each piece can be seen.",
      "Mix textures — a diamond stud beside a smooth gold disc creates depth.",
      "Bring photos or book an appointment; we style with your features, not trends alone.",
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}
