import type { CheckoutLine } from "@/lib/checkout";
import type { Product } from "@/lib/types";

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "confirmed"
  | "making"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"
  | "return_requested";

export type AppointmentStatus =
  | "new"
  | "confirmed"
  | "completed"
  | "cancelled";

export type CustomRequestStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "accepted"
  | "declined";

export type ShippingAddress = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
};

export type OrderTimelineEntry = {
  status: OrderStatus;
  at: string;
  note?: string;
};

export type CatalogProduct = Product & {
  published: boolean;
  stock: number | null;
  bestseller: boolean;
  bestsellerRank: number | null;
  createdAt: string;
  updatedAt: string;
};

export type StoreOrder = {
  id: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  status: OrderStatus;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shipping: ShippingAddress;
  lines: CheckoutLine[];
  amountInr: number;
  currency: string;
  customerNote?: string;
  internalNotes?: string;
  courier?: string;
  trackingNumber?: string;
  timeline: OrderTimelineEntry[];
  createdAt: string;
  updatedAt: string;
};

export type StoreAppointment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  interest: string;
  piercing: string;
  notes: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
};

export type StoreCustomRequest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  product: string;
  weight: string;
  purity?: string;
  imageUrl: string;
  notes: string;
  status: CustomRequestStatus;
  createdAt: string;
  updatedAt: string;
};

export type AuraStore = {
  products: CatalogProduct[];
  orders: StoreOrder[];
  appointments: StoreAppointment[];
  customRequests: StoreCustomRequest[];
  deletedProductIds: string[];
  orderSeq: number;
};

export const ORDER_STATUSES: OrderStatus[] = [
  "pending_payment",
  "paid",
  "confirmed",
  "making",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
  "return_requested",
];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  pending_payment: "Awaiting payment",
  paid: "Paid",
  confirmed: "Confirmed",
  making: "In production",
  packed: "Packed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
  return_requested: "Return requested",
};

export const ORDER_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending_payment: ["paid", "cancelled"],
  paid: ["confirmed", "cancelled", "refunded"],
  confirmed: ["making", "packed", "cancelled"],
  making: ["packed", "cancelled"],
  packed: ["shipped", "cancelled"],
  shipped: ["delivered", "return_requested"],
  delivered: ["return_requested"],
  cancelled: [],
  refunded: [],
  return_requested: ["refunded", "confirmed"],
};

export const ACTIVE_ORDER_STATUSES: OrderStatus[] = [
  "paid",
  "confirmed",
  "making",
  "packed",
  "shipped",
  "return_requested",
];

export function canTransition(from: OrderStatus, to: OrderStatus) {
  return ORDER_TRANSITIONS[from].includes(to);
}
