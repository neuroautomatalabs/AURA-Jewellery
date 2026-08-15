import type {
  AppointmentStatus,
  CustomRequestStatus,
  OrderStatus,
} from "@/lib/commerce";
import { ORDER_STATUS_LABEL } from "@/lib/commerce";

const ORDER_CLASS: Record<OrderStatus, string> = {
  pending_payment: "bg-slate-100 text-slate-700",
  paid: "bg-royal-soft text-royal",
  confirmed: "bg-indigo-100 text-indigo-800",
  making: "bg-gold-soft text-royal-deep",
  packed: "bg-cyan-100 text-cyan-900",
  shipped: "bg-violet-100 text-violet-800",
  delivered: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
  refunded: "bg-orange-100 text-orange-800",
  return_requested: "bg-amber-100 text-amber-900",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${ORDER_CLASS[status]}`}
    >
      {ORDER_STATUS_LABEL[status]}
    </span>
  );
}

export function SimpleStatusBadge({
  status,
}: {
  status: AppointmentStatus | CustomRequestStatus | "live" | "draft";
}) {
  const map: Record<string, string> = {
    new: "bg-royal-soft text-royal",
    confirmed: "bg-indigo-100 text-indigo-800",
    completed: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-red-100 text-red-800",
    contacted: "bg-cyan-100 text-cyan-900",
    quoted: "bg-gold-soft text-royal-deep",
    accepted: "bg-emerald-100 text-emerald-800",
    declined: "bg-red-100 text-red-800",
    live: "bg-emerald-100 text-emerald-800",
    draft: "bg-slate-100 text-slate-700",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${map[status]}`}
    >
      {status}
    </span>
  );
}
