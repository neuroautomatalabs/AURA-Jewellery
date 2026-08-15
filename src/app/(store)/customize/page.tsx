import { CustomizeForm } from "@/components/CustomizeForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customize",
  description:
    "Request a custom gold piece — choose product, weight, and share a reference image.",
};

export default function CustomizePage() {
  return (
    <div className="bg-surface">
      <div className="relative overflow-hidden border-b border-line bg-gradient-to-br from-royal-deep via-royal to-royal-mid text-white">
        <div
          className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-gold/20 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <p className="eyebrow text-gold-bright">Custom made</p>
          <h1 className="font-display mt-3 text-4xl tracking-wide sm:text-5xl">
            Customize
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
            Tell us the piece you want — weight and a reference image — and we
            will craft it for you.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="surface-card p-5 sm:p-8">
          <CustomizeForm />
        </div>
      </div>
    </div>
  );
}
