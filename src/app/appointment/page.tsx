import { AppointmentForm } from "@/components/AppointmentForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Appointment",
  description:
    "Request a piercing or jewellery appointment. Confirmation emails go to you and the studio.",
};

export default function AppointmentPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">
          Appointments
        </p>
        <h1 className="font-display mt-2 text-4xl text-royal sm:text-5xl">
          Book with Aura Jewellery
        </h1>
        <p className="mt-3 text-ink-muted leading-relaxed">
          Tell us when you would like to visit. We send a confirmation to your
          email and to our studio inbox.
        </p>
      </div>

      <div className="mt-10 rounded-sm border border-line bg-white p-4 sm:p-8">
        <AppointmentForm />
      </div>
    </div>
  );
}
