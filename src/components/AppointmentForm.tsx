"use client";

import { useState, type FormEvent } from "react";
import { piercings } from "@/data/piercings";

type Status = "idle" | "loading" | "success" | "error";

export function AppointmentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
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
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  const field =
    "w-full min-h-12 rounded-sm border border-line bg-white px-3.5 text-ink outline-none transition focus:border-royal";

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-muted">
            Full name
          </span>
          <input name="name" required autoComplete="name" className={field} />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-muted">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            className={field}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-muted">
            Phone
          </span>
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            className={field}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-muted">
            Preferred date
          </span>
          <input name="date" type="date" required className={field} />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-muted">
            Preferred time
          </span>
          <select name="time" required className={field} defaultValue="">
            <option value="" disabled>
              Select time
            </option>
            <option>10:00 AM</option>
            <option>11:30 AM</option>
            <option>1:00 PM</option>
            <option>3:00 PM</option>
            <option>5:00 PM</option>
            <option>6:30 PM</option>
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-muted">
            Interest
          </span>
          <select name="interest" required className={field} defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option value="gold">Gold jewellery</option>
            <option value="diamond">Diamond jewellery</option>
            <option value="piercing">New piercing</option>
            <option value="styling">Ear styling consultation</option>
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-muted">
            Piercing placement (optional)
          </span>
          <select name="piercing" className={field} defaultValue="">
            <option value="">Not sure yet</option>
            {piercings.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-muted">
            Notes
          </span>
          <textarea
            name="notes"
            rows={4}
            placeholder="Tell us about your ear goals, metal preference, or questions…"
            className={`${field} min-h-[7rem] py-3`}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex min-h-12 w-full items-center justify-center rounded-sm bg-royal text-sm font-medium tracking-wide text-white transition hover:bg-royal-mid disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Submit appointment request"}
      </button>

      {message && (
        <p
          role="status"
          className={`rounded-sm px-4 py-3 text-sm ${
            status === "success"
              ? "bg-royal-soft text-royal"
              : "bg-red-50 text-red-800"
          }`}
        >
          {message}
        </p>
      )}

      <p className="text-center text-xs leading-relaxed text-ink-muted">
        You and our studio both receive an email confirmation after you submit.
      </p>
    </form>
  );
}
