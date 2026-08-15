import { AppointmentForm } from "@/components/AppointmentForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Appointment",
  description:
    "Book a piercing or consultation. Studio hours 11:00 AM – 8:00 PM, closed 2:00–3:00 PM for lunch.",
};

export default function AppointmentPage() {
  return (
    <div className="bg-surface">
      <div className="relative overflow-hidden border-b border-line bg-gradient-to-br from-royal-deep via-royal to-royal-mid text-white">
        <div
          className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-gold/20 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <p className="eyebrow text-gold-bright">Appointments</p>
          <h1 className="font-display mt-3 text-4xl tracking-wide sm:text-5xl">
            Book with Aura
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
            Choose piercing or consultation, then pick a preferred date and
            time. We are open 11:00 AM – 8:00 PM, closed 2:00–3:00 PM for lunch.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="surface-card p-5 sm:p-8">
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
}
