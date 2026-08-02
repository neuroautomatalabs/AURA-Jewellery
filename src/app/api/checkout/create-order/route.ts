import { NextResponse } from "next/server";
import { buildCheckoutLines } from "@/lib/checkout";
import { getRazorpay, getRazorpayKeyId } from "@/lib/razorpay";
import type { CartItem } from "@/lib/types";

type Body = {
  items?: CartItem[];
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
  };
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

  if (!required(name) || !required(email) || !required(phone)) {
    return NextResponse.json(
      { error: "Name, email and phone are required for checkout." },
      { status: 400 },
    );
  }

  const { lines, amountPaise, amountInr, error } = buildCheckoutLines(
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

  try {
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `aura_${Date.now()}`.slice(0, 40),
      notes: {
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

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      amountInr,
      lines,
      customer: { name, email, phone },
    });
  } catch (err) {
    console.error("Razorpay order create failed:", err);
    return NextResponse.json(
      { error: "Could not start payment. Please try again." },
      { status: 500 },
    );
  }
}
