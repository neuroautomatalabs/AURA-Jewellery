import { NextResponse } from "next/server";
import { buildCheckoutLines, validShipping } from "@/lib/checkout";
import type { CheckoutShipping } from "@/lib/checkout";
import { getRazorpay, getRazorpayKeyId } from "@/lib/razorpay";
import { nextOrderId, updateStore } from "@/lib/store";
import type { CartItem } from "@/lib/types";

type Body = {
  items?: CartItem[];
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  shipping?: Partial<CheckoutShipping>;
  note?: string;
};

function required(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  const keyId = getRazorpayKeyId();
  const razorpay = getRazorpay();

  if (!razorpay || !keyId) {
    return NextResponse.json(
      {
        error:
          "Payment is not configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env.local.",
      },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = body.customer?.name?.trim() ?? "";
  const email = body.customer?.email?.trim() ?? "";
  const phone = body.customer?.phone?.trim() ?? "";
  const shipping: CheckoutShipping = {
    line1: body.shipping?.line1?.trim() ?? "",
    line2: body.shipping?.line2?.trim() || undefined,
    city: body.shipping?.city?.trim() ?? "",
    state: body.shipping?.state?.trim() ?? "",
    pincode: body.shipping?.pincode?.trim() ?? "",
  };

  if (!required(name) || !required(email) || !required(phone)) {
    return NextResponse.json(
      { error: "Name, email and phone are required for checkout." },
      { status: 400 },
    );
  }

  if (!validShipping(shipping)) {
    return NextResponse.json(
      { error: "Please enter a complete shipping address with a 6-digit pincode." },
      { status: 400 },
    );
  }

  const { lines, amountPaise, amountInr, error } = await buildCheckoutLines(
    body.items ?? [],
  );

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (amountPaise < 100) {
    return NextResponse.json(
      { error: "Order total is too low to checkout." },
      { status: 400 },
    );
  }

  const local = await updateStore((store) => {
    const id = nextOrderId(store);
    const stamp = new Date().toISOString();
    const order = {
      id,
      status: "pending_payment" as const,
      customer: { name, email, phone },
      shipping,
      lines,
      amountInr,
      currency: "INR",
      customerNote: body.note?.trim() || undefined,
      timeline: [
        { status: "pending_payment" as const, at: stamp, note: "Checkout started" },
      ],
      createdAt: stamp,
      updatedAt: stamp,
    };
    store.orders.unshift(order);
    return order;
  });

  try {
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: local.id.slice(0, 40),
      notes: {
        aura_order_id: local.id,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        item_count: String(lines.reduce((n, l) => n + l.qty, 0)),
        summary: lines
          .map((l) => `${l.name}${l.size ? ` (${l.size})` : ""} x${l.qty}`)
          .join("; ")
          .slice(0, 480),
      },
    });

    await updateStore((store) => {
      const row = store.orders.find((o) => o.id === local.id);
      if (row) {
        row.razorpayOrderId = order.id;
        row.updatedAt = new Date().toISOString();
      }
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      amountInr,
      lines,
      customer: { name, email, phone },
      auraOrderId: local.id,
    });
  } catch (err) {
    console.error("Razorpay order create failed:", err);
    await updateStore((store) => {
      const row = store.orders.find((o) => o.id === local.id);
      if (row && row.status === "pending_payment") {
        row.status = "cancelled";
        row.timeline.push({
          status: "cancelled",
          at: new Date().toISOString(),
          note: "Payment session failed to start",
        });
        row.updatedAt = new Date().toISOString();
      }
    });
    return NextResponse.json(
      { error: "Could not start payment. Please try again." },
      { status: 500 },
    );
  }
}
