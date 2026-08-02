import { ShopExplorer } from "@/components/ShopExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ear & Nose Maps",
  description:
    "Animated interactive ear and nose maps. Tap a piercing placement to see matching gold and diamond pieces.",
};

export default function PiercingsPage() {
  return (
    <ShopExplorer
      mode="ear-map"
      title="Piercing Maps"
      subtitle="Tap glowing points on the ear or nose map to reveal pieces for that exact placement — different from browsing the full Shop."
    />
  );
}
