"use client";

import { clientUpdateAppointmentStatus } from "@/lib/admin-client";
import { SimpleStatusBadge } from "@/app/admin/_components/StatusBadge";
import { useAdminStore } from "@/app/admin/_components/useAdminStore";
import type { AppointmentStatus } from "@/lib/commerce";
import { formatDateTime } from "@/lib/format";

const STATUSES: AppointmentStatus[] = ["new", "confirmed", "completed", "cancelled"];

export default function AdminAppointmentsPage() {
  const { store, error, reload } = useAdminStore();

  if (error) return <p className="text-sm text-red-700">{error}</p>;
  if (!store) return <p className="text-sm text-ink-muted">Loading appointments…</p>;

  return (
    <div>
      <p className="eyebrow text-gold">Studio</p>
      <h1 className="font-display mt-1 text-3xl text-royal">Appointments</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Booking requests from the website. Confirm, complete, or cancel from here.
      </p>

      <div className="mt-6 space-y-3">
        {store.appointments.length === 0 && (
          <p className="text-sm text-ink-muted">No appointment requests yet.</p>
        )}
        {store.appointments.map((row) => (
          <article key={row.id} className="surface-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl text-royal">{row.name}</h2>
                <p className="mt-1 text-sm text-ink-muted">
                  {row.date} · {row.time} · {row.interest}
                  {row.piercing ? ` · ${row.piercing}` : ""}
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
            <p className="mt-2 text-xs text-ink-muted">{formatDateTime(row.createdAt)}</p>
            <form
              className="mt-4 flex flex-wrap items-end gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                await clientUpdateAppointmentStatus(new FormData(e.currentTarget));
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
