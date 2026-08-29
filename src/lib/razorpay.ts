import Razorpay from "razorpay";

export function getRazorpay() {
  const key_id = (
    process.env.RAZORPAY_KEY_ID ??
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ??
    ""
  ).trim();
  const key_secret = process.env.RAZORPAY_KEY_SECRET?.trim();

  if (!key_id || !key_secret) {
    return null;
  }

  return new Razorpay({ key_id, key_secret });
}

export function getRazorpayKeyId() {
  return (
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() ??
    process.env.RAZORPAY_KEY_ID?.trim() ??
    ""
  );
}

export function formatRazorpayError(err: unknown): string {
  if (err && typeof err === "object" && "error" in err) {
    const nested = (err as { error?: { description?: string; reason?: string } })
      .error;
    if (nested?.description) return nested.description;
    if (nested?.reason) return nested.reason;
  }
  if (err instanceof Error && err.message) return err.message;
  return "Payment provider error.";
}
