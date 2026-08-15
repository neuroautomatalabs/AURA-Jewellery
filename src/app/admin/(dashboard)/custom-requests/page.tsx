"use client";

import { clientUpdateCustomRequestStatus } from "@/lib/admin-client";
import { SimpleStatusBadge } from "@/app/admin/_components/StatusBadge";
import { useAdminStore } from "@/app/admin/_components/useAdminStore";
import type { CustomRequestStatus } from "@/lib/commerce";
import { formatDateTime } from "@/lib/format";

const STATUSES: CustomRequestStatus[] = [
  "new",
  "contacted",
  "quoted",
  "accepted",
  "declined",
];

export default function AdminCustomRequestsPage() {
  const { store, error, reload } = useAdminStore();

  if (error) return <p className="text-sm text-red-700">{error}</p>;
  if (!store) return <p className="text-sm text-ink-muted">Loading custom requests…</p>;

  return (
    <div>
      <p className="eyebrow text-gold">Made to order</p>
      <h1 className="font-display mt-1 text-3xl text-royal">Custom requests</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Weight and reference images from the Customize page.
      </p>

      <div className="mt-6 space-y-3">
        {store.customRequests.length === 0 && (
          <p className="text-sm text-ink-muted">No custom requests yet.</p>
        )}
        {store.customRequests.map((row) => (
          <article key={row.id} className="surface-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl text-royal">{row.name}</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  {[row.product, row.weight].filter(Boolean).join(" · ")}
                </p>
              </div>
              <SimpleStatusBadge status={row.status} />
            </div>
            <p className="mt-3 text-sm">
              <a className="text-royal hover:underline" href={`tel:${row.phone}`}>
                {row.phone}
              </a>
              {" · "}
              <a className="text-royal hover:underline" href={`mailto:${row.email}`}>
                {row.email}
              </a>
            </p>
            {row.notes && <p className="mt-2 text-sm text-ink-muted">{row.notes}</p>}
            {row.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={row.imageUrl}
                alt="Reference"
                className="mt-3 max-h-48 rounded-xl border border-line object-cover"
              />
            )}
            <p className="mt-2 text-xs text-ink-muted">{formatDateTime(row.createdAt)}</p>
            <form
              className="mt-4 flex flex-wrap items-end gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                await clientUpdateCustomRequestStatus(new FormData(e.currentTarget));
                await reload();
              }}
            >
              <input type="hidden" name="id" value={row.id} />
              <label>
                <span className="field-label">Status</span>
                <select name="status" defaultValue={row.status} className="field-input min-w-40">
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="btn-primary">
                Update
              </button>
            </form>
          </article>
        ))}
      </div>
    </div>
  );
}
