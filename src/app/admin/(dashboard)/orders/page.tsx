"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { OrderStatusBadge } from "@/app/admin/_components/StatusBadge";
import { useAdminStore } from "@/app/admin/_components/useAdminStore";
import {
  ORDER_STATUS_LABEL,
  ORDER_STATUSES,
  type OrderStatus,
} from "@/lib/commerce";
import { formatDateTime, inr } from "@/lib/format";

export default function AdminOrdersPage() {
  const { store, error } = useAdminStore();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");

  const list = useMemo(() => {
    if (!store) return [];
    const query = q.trim().toLowerCase();
    return store.orders.filter((order) => {
      if (status !== "all" && order.status !== status) return false;
      if (!query) return true;
      const hay = [
        order.id,
        order.customer.name,
        order.customer.email,
        order.customer.phone,
        order.razorpayPaymentId,
        order.trackingNumber,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(query);
    });
  }, [store, q, status]);

  if (error) return <p className="text-sm text-red-700">{error}</p>;
  if (!store) return <p className="text-sm text-ink-muted">Loading orders…</p>;

  return (
    <div>
      <p className="eyebrow text-gold">Fulfillment</p>
      <h1 className="font-display mt-1 text-3xl text-royal">Orders</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Paid → confirmed → production → packed → shipped → delivered. Returns and refunds sit at the end of the same trail.
      </p>

      <form
        className="mt-6 grid gap-3 rounded-xl border border-line bg-white p-4 sm:grid-cols-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="sm:col-span-2">
          <span className="field-label">Search</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="field-input"
            placeholder="Order ID, name, phone, payment ID…"
          />
        </label>
        <label>
          <span className="field-label">Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="field-input">
            <option value="all">All</option>
            {ORDER_STATUSES.map((s) => (
              <option key={s} value={s}>
                {ORDER_STATUS_LABEL[s]}
              </option>
            ))}
          </select>
        </label>
      </form>

      <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-surface text-[11px] uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Courier</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {list.map((order) => (
              <tr key={order.id} className="border-t border-line">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/orders/detail?id=${order.id}`}
                    className="font-semibold text-royal hover:underline"
                  >
                    {order.id}
                  </Link>
                  <p className="text-xs text-ink-muted">{formatDateTime(order.createdAt)}</p>
                </td>
                <td className="px-4 py-3">
                  {order.customer.name}
                  <p className="text-xs text-ink-muted">{order.customer.phone}</p>
                </td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={order.status as OrderStatus} />
                </td>
                <td className="px-4 py-3 text-ink-muted">
                  {order.trackingNumber
                    ? `${order.courier || "Courier"} · ${order.trackingNumber}`
                    : "—"}
                </td>
                <td className="px-4 py-3 text-right font-semibold">{inr(order.amountInr)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <p className="px-4 py-10 text-center text-sm text-ink-muted">
            No orders match these filters. Paid checkouts will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
