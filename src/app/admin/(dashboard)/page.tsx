"use client";

import Link from "next/link";
import { OrderStatusBadge, SimpleStatusBadge } from "@/app/admin/_components/StatusBadge";
import { useAdminStore } from "@/app/admin/_components/useAdminStore";
import { ACTIVE_ORDER_STATUSES } from "@/lib/commerce";
import { formatDateTime, inr } from "@/lib/format";

export default function AdminHomePage() {
  const { store, error } = useAdminStore();

  if (error) return <p className="text-sm text-red-700">{error}</p>;
  if (!store) return <p className="text-sm text-ink-muted">Loading overview…</p>;

  const paidOrders = store.orders.filter((o) => o.status !== "pending_payment" && o.status !== "cancelled");
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const monthRevenue = paidOrders
    .filter((o) => new Date(o.createdAt) >= monthStart && o.status !== "refunded")
    .reduce((sum, o) => sum + o.amountInr, 0);
  const openOrders = store.orders.filter((o) =>
    ACTIVE_ORDER_STATUSES.includes(o.status),
  );
  const liveProducts = store.products.filter((p) => p.published).length;
  const newAppointments = store.appointments.filter((a) => a.status === "new").length;
  const newCustoms = store.customRequests.filter((a) => a.status === "new").length;

  const stats = [
    { label: "Open orders", value: String(openOrders.length), href: "/admin/orders" },
    { label: "Revenue this month", value: inr(monthRevenue), href: "/admin/orders" },
    { label: "Live products", value: String(liveProducts), href: "/admin/products" },
    { label: "New bookings", value: String(newAppointments), href: "/admin/appointments" },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow text-gold">Dashboard</p>
          <h1 className="font-display mt-1 text-3xl text-royal">Overview</h1>
        </div>
        <Link href="/admin/products/new" className="btn-gold">
          Add product
        </Link>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="surface-card p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              {stat.label}
            </p>
            <p className="font-display mt-2 text-2xl text-royal">{stat.value}</p>
          </Link>
        ))}
      </div>

      {newCustoms > 0 && (
        <p className="mt-4 rounded-xl bg-gold-soft px-4 py-3 text-sm text-royal-deep">
          {newCustoms} new custom request{newCustoms === 1 ? "" : "s"} waiting.{" "}
          <Link href="/admin/custom-requests" className="font-semibold underline">
            Review
          </Link>
        </p>
      )}

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-royal">Needs attention</h2>
          <Link href="/admin/orders" className="text-sm font-semibold text-royal hover:underline">
            All orders
          </Link>
        </div>
        {openOrders.length === 0 ? (
          <p className="text-sm text-ink-muted">No open orders right now.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-line bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-[11px] uppercase tracking-wider text-ink-muted">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {openOrders.slice(0, 8).map((order) => (
                  <tr key={order.id} className="border-t border-line">
                    <td className="px-4 py-3">
                      <Link href={`/admin/orders/detail?id=${order.id}`} className="font-semibold text-royal hover:underline">
                        {order.id}
                      </Link>
                      <p className="text-xs text-ink-muted">{formatDateTime(order.createdAt)}</p>
                    </td>
                    <td className="px-4 py-3">
                      {order.customer.name}
                      <p className="text-xs text-ink-muted">{order.customer.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {inr(order.amountInr)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display mb-4 text-xl text-royal">Latest appointments</h2>
          {store.appointments.length === 0 ? (
            <p className="text-sm text-ink-muted">No appointment requests yet.</p>
          ) : (
            <ul className="space-y-2">
              {store.appointments.slice(0, 5).map((row) => (
                <li key={row.id} className="surface-card flex items-center justify-between gap-3 p-3.5">
                  <div>
                    <p className="font-semibold text-ink">{row.name}</p>
                    <p className="text-xs text-ink-muted">
                      {row.date} · {row.time} · {row.interest}
                    </p>
                  </div>
                  <SimpleStatusBadge status={row.status} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2 className="font-display mb-4 text-xl text-royal">Custom requests</h2>
          {store.customRequests.length === 0 ? (
            <p className="text-sm text-ink-muted">No custom requests yet.</p>
          ) : (
            <ul className="space-y-2">
              {store.customRequests.slice(0, 5).map((row) => (
                <li key={row.id} className="surface-card flex items-center justify-between gap-3 p-3.5">
                  <div>
                    <p className="font-semibold text-ink">{row.name || "Request"}</p>
                    <p className="text-xs text-ink-muted">
                      {[row.product, row.weight].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <SimpleStatusBadge status={row.status} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
