import { ShopExplorer } from "@/components/ShopExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ear Map",
  description:
    "Animated interactive ear map. Tap a piercing placement to see matching gold and diamond studs.",
};

export default function PiercingsPage() {
  return (
    <ShopExplorer
      mode="ear-map"
      title="Animated Ear Map"
      subtitle="A creative Aura ear — tap glowing points to reveal studs for that exact placement. This page is different from Shop."
    />
  );
}
