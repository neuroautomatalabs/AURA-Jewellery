"use client";

import { clientUpdateOrderStatus } from "@/lib/admin-client";
import { OrderStatusBadge } from "@/app/admin/_components/StatusBadge";
import { useAdminStore } from "@/app/admin/_components/useAdminStore";
import { ORDER_STATUS_LABEL, ORDER_TRANSITIONS } from "@/lib/commerce";
import { formatDateTime, inr } from "@/lib/format";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AdminOrderDetailPage() {
  const search = useSearchParams();
  const id = search.get("id") || "";
  const { store, error, reload } = useAdminStore();
  const [pending, setPending] = useState(false);

  if (error) return <p className="text-sm text-red-700">{error}</p>;
  if (!store) return <p className="text-sm text-ink-muted">Loading order…</p>;

  const order = store.orders.find((o) => o.id === id);
  if (!order) {
    return (
      <div>
        <Link href="/admin/orders" className="text-sm font-semibold text-royal hover:underline">
          ← Orders
        </Link>
        <p className="mt-4 text-sm text-ink-muted">That order was not found.</p>
      </div>
    );
  }

  const nextStatuses = ORDER_TRANSITIONS[order.status];

  return (
    <div>
      <Link href="/admin/orders" className="text-sm font-semibold text-royal hover:underline">
        ← Orders
      </Link>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-royal">{order.id}</h1>
          <p className="mt-1 text-sm text-ink-muted">{formatDateTime(order.createdAt)}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <ol className="mt-6 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
        {["paid", "confirmed", "making", "packed", "shipped", "delivered"].map((step, i) => {
          const reached =
            order.timeline.some((t) => t.status === step) || order.status === step;
          return (
            <li key={step} className={reached ? "text-royal" : ""}>
              {i > 0 && <span className="mr-2 text-line">→</span>}
              {ORDER_STATUS_LABEL[step as keyof typeof ORDER_STATUS_LABEL]}
            </li>
          );
        })}
      </ol>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="surface-card p-5">
          <h2 className="font-display text-lg text-royal">Customer</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div>
              <dt className="text-ink-muted">Name</dt>
              <dd className="font-semibold">{order.customer.name}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Phone</dt>
              <dd>
                <a className="text-royal hover:underline" href={`tel:${order.customer.phone}`}>
                  {order.customer.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-muted">Email</dt>
              <dd>
                <a className="text-royal hover:underline" href={`mailto:${order.customer.email}`}>
                  {order.customer.email}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section className="surface-card p-5">
          <h2 className="font-display text-lg text-royal">Ship to</h2>
          <p className="mt-3 text-sm leading-relaxed">
            {order.shipping.line1}
            {order.shipping.line2 ? (
              <>
                <br />
                {order.shipping.line2}
              </>
            ) : null}
            <br />
            {order.shipping.city}, {order.shipping.state} {order.shipping.pincode}
          </p>
          {order.customerNote && (
            <p className="mt-3 text-sm text-ink-muted">Note: {order.customerNote}</p>
          )}
        </section>
      </div>

      <section className="surface-card mt-6 p-5">
        <h2 className="font-display text-lg text-royal">Items</h2>
        <ul className="mt-3 divide-y divide-line text-sm">
          {order.lines.map((line) => (
            <li key={`${line.productId}-${line.size}`} className="flex justify-between gap-3 py-3">
              <div>
                <p className="font-semibold">{line.name}</p>
                <p className="text-xs text-ink-muted">
                  {line.size ? `Size ${line.size} · ` : ""}
                  Qty {line.qty}
                </p>
              </div>
              <p className="font-semibold">{inr(line.lineTotal)}</p>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-right font-display text-xl text-royal">{inr(order.amountInr)}</p>
        <div className="mt-3 space-y-1 text-xs text-ink-muted">
          {order.razorpayOrderId && <p>Razorpay order: {order.razorpayOrderId}</p>}
          {order.razorpayPaymentId && <p>Payment ID: {order.razorpayPaymentId}</p>}
        </div>
      </section>

      <section className="surface-card mt-6 p-5">
        <h2 className="font-display text-lg text-royal">Update order</h2>
        <form
          className="mt-4 grid gap-4 sm:grid-cols-2"
          onSubmit={async (e) => {
            e.preventDefault();
            setPending(true);
            await clientUpdateOrderStatus(new FormData(e.currentTarget));
            await reload();
            setPending(false);
          }}
        >
          <input type="hidden" name="id" value={order.id} />
          <label className="block">
            <span className="field-label">Move to</span>
            <select name="status" className="field-input" defaultValue={order.status}>
              <option value={order.status}>{ORDER_STATUS_LABEL[order.status]} (current)</option>
              {nextStatuses.map((s) => (
                <option key={s} value={s}>
                  {ORDER_STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="field-label">Status note</span>
            <input name="note" className="field-input" placeholder="Optional" />
          </label>
          <label className="block">
            <span className="field-label">Courier</span>
            <input
              name="courier"
              defaultValue={order.courier}
              className="field-input"
              placeholder="Delhivery, Blue Dart…"
            />
          </label>
          <label className="block">
            <span className="field-label">Tracking number</span>
            <input
              name="trackingNumber"
              defaultValue={order.trackingNumber}
              className="field-input"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="field-label">Internal notes</span>
            <textarea
              name="internalNotes"
              defaultValue={order.internalNotes}
              className="field-input"
              placeholder="Only visible to you"
            />
          </label>
          <div>
            <button type="submit" disabled={pending} className="btn-primary">
              {pending ? "Saving…" : "Save updates"}
            </button>
          </div>
        </form>
      </section>

      <section className="mt-6">
        <h2 className="font-display text-lg text-royal">Timeline</h2>
        <ol className="mt-3 space-y-3 border-l border-line pl-4">
          {order.timeline
            .slice()
            .reverse()
            .map((entry, i) => (
              <li key={`${entry.at}-${i}`}>
                <p className="text-sm font-semibold text-ink">
                  {ORDER_STATUS_LABEL[entry.status]}
                </p>
                <p className="text-xs text-ink-muted">{formatDateTime(entry.at)}</p>
                {entry.note && <p className="text-sm text-ink-muted">{entry.note}</p>}
              </li>
            ))}
        </ol>
      </section>
    </div>
  );
}
