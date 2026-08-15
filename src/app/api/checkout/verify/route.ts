import crypto from "crypto";
import { NextResponse } from "next/server";
import { updateStore } from "@/lib/store";

type Body = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    return NextResponse.json(
      { success: false, error: "Payment is not configured." },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const orderId = body.razorpay_order_id?.trim() ?? "";
  const paymentId = body.razorpay_payment_id?.trim() ?? "";
  const signature = body.razorpay_signature?.trim() ?? "";

  if (!orderId || !paymentId || !signature) {
    return NextResponse.json(
      { success: false, error: "Missing payment details." },
      { status: 400 },
    );
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const ok =
    expected.length === signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));

  if (!ok) {
    return NextResponse.json(
      { success: false, error: "Payment verification failed." },
      { status: 400 },
    );
  }

  const paid = await updateStore((store) => {
    const row = store.orders.find((o) => o.razorpayOrderId === orderId);
    if (!row) return null;
    row.razorpayPaymentId = paymentId;
    if (row.status === "pending_payment") {
      row.status = "paid";
      row.timeline.push({
        status: "paid",
        at: new Date().toISOString(),
        note: "Razorpay payment verified",
      });
    }
    row.updatedAt = new Date().toISOString();
    return row;
  });

  return NextResponse.json({
    success: true,
    orderId,
    paymentId,
    auraOrderId: paid?.id ?? null,
  });
}
