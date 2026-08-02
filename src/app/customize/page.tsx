import { CustomizeForm } from "@/components/CustomizeForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customize",
  description:
    "Request a custom gold piece — choose product, weight, purity, and share a reference image.",
};

export default function CustomizePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
          Custom made
        </p>
        <h1 className="font-display mt-2 text-4xl text-royal sm:text-5xl">
          Customize
        </h1>
        <p className="mt-3 text-ink-muted leading-relaxed">
          Tell us the piece you want — weight, purity, and a reference image —
          and we will craft it for you.
        </p>
      </div>

      <div className="mt-10 rounded-sm border border-line bg-white p-4 sm:p-8">
        <CustomizeForm />
      </div>
    </div>
  );
}
