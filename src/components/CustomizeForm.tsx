"use client";

import { useState, type FormEvent } from "react";
import { saveBrowserCustomRequest } from "@/lib/browser-store";
import { isStaticPages } from "@/lib/static-pages";

type Status = "idle" | "loading" | "success" | "error";

const PRODUCTS = [
  "Stud",
  "Hoop",
  "Huggie",
  "Nose pin",
  "Drop / Charm",
  "Ring",
  "Other",
];

export function CustomizeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = e.currentTarget;

    try {
      const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
      const res = await fetch(`${base}/api/customize`, {
        method: "POST",
        body: new FormData(form),
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
        form.reset();
        setFileName("");
        return;
      }
    } catch {
      // GitHub Pages has no API.
    }

    if (isStaticPages) {
      const payload = new FormData(form);
      const file = payload.get("reference");
      await saveBrowserCustomRequest({
        name: String(payload.get("name") ?? "").trim(),
        email: String(payload.get("email") ?? "").trim(),
        phone: String(payload.get("phone") ?? "").trim(),
        product: String(payload.get("product") ?? "").trim(),
        weight: String(payload.get("weight") ?? "").trim(),
        notes: String(payload.get("notes") ?? "").trim(),
        imageFile: file instanceof File && file.size > 0 ? file : null,
      });
      setStatus("success");
      form.reset();
      setFileName("");
      return;
    }

    setStatus("error");
    setMessage("Could not send the request. Please try again.");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl bg-royal-soft px-6 py-12 text-center"
      >
        <p className="eyebrow text-gold">Request received</p>
        <p className="font-display mt-3 text-2xl text-royal sm:text-3xl">
          Thank you
        </p>
        <p className="mt-3 text-sm leading-relaxed text-royal/80">
          We received your custom request and will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-royal underline-offset-4 hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="field-label">Name</span>
          <input name="name" required className="field-input" autoComplete="name" />
        </label>
        <label className="block">
          <span className="field-label">Mobile number</span>
          <input
            name="phone"
            type="tel"
            required
            className="field-input"
            autoComplete="tel"
            inputMode="numeric"
            placeholder="10-digit number"
          />
        </label>
      </div>
      <label className="block">
        <span className="field-label">Email</span>
        <input name="email" type="email" required className="field-input" autoComplete="email" />
      </label>
      <label className="block">
        <span className="field-label">Product</span>
        <select name="product" required className="field-input" defaultValue="">
          <option value="" disabled>
            Select product
          </option>
          {PRODUCTS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="field-label">Weight</span>
        <div className="field-input flex items-stretch !p-0 overflow-hidden">
          <input
            name="weight"
            type="number"
            inputMode="decimal"
            min="0.1"
            step="0.1"
            required
            className="min-h-12 w-full bg-transparent px-3.5 outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            placeholder="e.g. 2.5"
          />
          <span className="flex shrink-0 items-center border-l border-line px-3.5 text-sm text-ink-muted">
            gm
          </span>
        </div>
      </label>

      <label className="block">
        <span className="field-label">Notes</span>
        <textarea name="notes" className="field-input" placeholder="Optional details" />
      </label>

      <label className="block">
        <span className="field-label">Reference image</span>
        <input
          name="reference"
          type="file"
          accept="image/*"
          className="block w-full text-sm text-ink-muted file:mr-3 file:min-h-10 file:cursor-pointer file:rounded-lg file:border-0 file:bg-royal file:px-4 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-white hover:file:bg-royal-mid"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setFileName(file ? file.name : "");
          }}
        />
        {fileName && (
          <p className="mt-2 text-xs text-ink-muted">Selected: {fileName}</p>
        )}
      </label>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800">
          {message}
        </p>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-full">
        {status === "loading" ? "Sending…" : "Submit request"}
      </button>
    </form>
  );
}
