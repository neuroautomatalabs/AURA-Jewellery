"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "success";

const WEIGHTS = ["1gm", "2gm", "3gm", "4gm", "5gm", "6gm", "8gm", "10gm"];
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
  const [fileName, setFileName] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("success");
    e.currentTarget.reset();
    setFileName("");
  }

  const field =
    "w-full min-h-12 rounded-sm border border-line bg-white px-3.5 text-ink outline-none transition focus:border-royal";

  if (status === "success") {
    return (
      <div
        role="status"
        className="mx-auto max-w-xl rounded-sm bg-royal-soft px-6 py-10 text-center"
      >
        <p className="font-display text-2xl text-royal sm:text-3xl">
          Thank you
        </p>
        <p className="mt-3 text-sm leading-relaxed text-royal/80">
          We received your custom request and will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-royal underline-offset-4 hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-muted">
          Product
        </span>
        <select name="product" required className={field} defaultValue="">
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
        <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-muted">
          Weight
        </span>
        <select name="weight" required className={field} defaultValue="">
          <option value="" disabled>
            Select weight
          </option>
          {WEIGHTS.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </label>

      <fieldset>
        <legend className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-muted">
          Purity
        </legend>
        <div className="flex gap-3">
          {(["18k", "22k"] as const).map((karat) => (
            <label
              key={karat}
              className="flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-sm border border-line bg-white px-3.5 has-[:checked]:border-royal has-[:checked]:bg-royal-soft"
            >
              <input
                type="radio"
                name="purity"
                value={karat}
                required
                className="accent-royal"
              />
              <span className="text-sm font-medium text-ink">{karat.toUpperCase()}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-[0.16em] text-ink-muted">
          Reference image
        </span>
        <input
          name="reference"
          type="file"
          accept="image/*"
          required
          className="block w-full text-sm text-ink-muted file:mr-3 file:min-h-10 file:cursor-pointer file:rounded-sm file:border-0 file:bg-royal file:px-4 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-white hover:file:bg-royal-mid"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setFileName(file ? file.name : "");
          }}
        />
        {fileName && (
          <p className="mt-2 text-xs text-ink-muted">Selected: {fileName}</p>
        )}
      </label>

      <button
        type="submit"
        className="flex min-h-12 w-full items-center justify-center rounded-sm bg-royal text-sm font-medium tracking-wide text-white transition hover:bg-royal-mid"
      >
        Submit
      </button>
    </form>
  );
}
