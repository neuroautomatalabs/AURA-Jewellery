"use client";

import { useMemo, useState, type FormEvent } from "react";
import { piercings } from "@/data/piercings";
import {
  APPOINTMENT_INTERESTS,
  APPOINTMENT_TIMES,
} from "@/lib/appointments";
import { saveBrowserAppointment } from "@/lib/browser-store";
import { isStaticPages } from "@/lib/static-pages";

type Status = "idle" | "loading" | "success" | "error";

const STUDIO_EMAIL = "studio-inbox@yourdomain.com";

function asText(value: FormDataEntryValue | undefined) {
  return typeof value === "string" ? value.trim() : "";
}

function todayLocalISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function openMailto(data: Record<string, FormDataEntryValue>) {
  const name = asText(data.name);
  const email = asText(data.email);
  const phone = asText(data.phone);
  const date = asText(data.date);
  const time = asText(data.time);
  const interest = asText(data.interest);
  const piercing = asText(data.piercing) || "Not sure yet";
  const notes = asText(data.notes) || "—";

  const subject = encodeURIComponent(`Appointment request — ${name}`);
  const body = encodeURIComponent(
    [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Interest: ${interest}`,
      `Preferred date: ${date}`,
      `Preferred time: ${time}`,
      ...(interest === "Piercing" ? [`Piercing: ${piercing}`] : []),
      `Notes: ${notes}`,
    ].join("\n"),
  );

  window.location.href = `mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`;
}

export function AppointmentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [interest, setInterest] = useState("");
  const minDate = useMemo(() => todayLocalISO(), []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

    try {
      const res = await fetch(`${base}/api/appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const json = (await res.json()) as { message?: string; error?: string };
        if (!res.ok) {
          setStatus("error");
          setMessage(json.error || "Something went wrong. Please try again.");
          return;
        }
        setStatus("success");
        setMessage(
          json.message ||
            "Appointment request sent. Check your inbox for confirmation.",
        );
        form.reset();
        setInterest("");
        return;
      }
    } catch {
      // No API available (e.g. GitHub Pages static host).
    }

    if (isStaticPages) {
      saveBrowserAppointment({
        name: asText(data.name),
        email: asText(data.email),
        phone: asText(data.phone),
        date: asText(data.date),
        time: asText(data.time),
        interest: asText(data.interest),
        piercing: asText(data.piercing),
        notes: asText(data.notes),
      });
    }

    openMailto(data);
    setStatus("success");
    setMessage(
      "Opening your email app with the appointment details. Send the message to complete your request.",
    );
    form.reset();
    setInterest("");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="field-label">Full name</span>
          <input name="name" required autoComplete="name" className="field-input" />
        </label>

        <label className="block">
          <span className="field-label">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            className="field-input"
          />
        </label>

        <label className="block">
          <span className="field-label">Phone</span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            className="field-input"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="field-label">Interest</span>
          <select
            name="interest"
            required
            className="field-input"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          >
            <option value="" disabled>
              Select
            </option>
            {APPOINTMENT_INTERESTS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        {interest === "Piercing" && (
          <label className="block sm:col-span-2">
            <span className="field-label">Piercing placement (optional)</span>
            <select name="piercing" className="field-input" defaultValue="">
              <option value="">Not sure yet</option>
              {piercings.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="block">
          <span className="field-label">Preferred date</span>
          <input
            name="date"
            type="date"
            required
            min={minDate}
            className="field-input"
          />
        </label>

        <label className="block">
          <span className="field-label">Preferred time</span>
          <select name="time" required className="field-input" defaultValue="">
            <option value="" disabled>
              Select time
            </option>
            {APPOINTMENT_TIMES.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <span className="mt-1.5 block text-xs text-ink-muted">
            11:00 AM – 8:00 PM · lunch 2:00–3:00 PM
          </span>
        </label>

        <label className="block sm:col-span-2">
          <span className="field-label">Notes</span>
          <textarea
            name="notes"
            rows={4}
            placeholder="Tell us about your ear goals, metal preference, or questions…"
            className="field-input"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full"
      >
        {status === "loading" ? "Sending…" : "Submit appointment request"}
      </button>

      {message && (
        <p
          role="status"
          className={`rounded-xl px-4 py-3.5 text-sm ${
            status === "success"
              ? "bg-royal-soft text-royal"
              : "bg-red-50 text-red-800"
          }`}
        >
          {message}
        </p>
      )}

      <p className="text-center text-xs leading-relaxed text-ink-muted">
        On the live site this opens your email app with a pre-filled request.
        Local server mode can send dual confirmation emails via SMTP.
      </p>
    </form>
  );
}
