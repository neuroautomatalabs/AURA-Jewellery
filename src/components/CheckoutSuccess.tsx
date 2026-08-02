"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CheckoutSuccess() {
  const [paymentId, setPaymentId] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPaymentId(params.get("payment_id") ?? "");
    setOrderId(params.get("order_id") ?? "");
  }, []);

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-gold">
        Checkout
      </p>
      <h1 className="font-display mt-2 text-4xl text-royal">
        Payment successful
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        Thank you for shopping with Aura Jewellery. We have received your
        payment and will confirm your order shortly.
      </p>

      {(paymentId || orderId) && (
        <div className="mt-8 rounded-xl border border-line bg-surface px-4 py-4 text-left text-sm">
          {paymentId && (
            <p className="text-ink-muted">
              Payment ID{" "}
              <span className="font-semibold text-ink">{paymentId}</span>
            </p>
          )}
          {orderId && (
            <p className="mt-2 text-ink-muted">
              Order ID <span className="font-semibold text-ink">{orderId}</span>
            </p>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="btn-primary">
          Continue shopping
        </Link>
        <Link href="/piercings" className="btn-gold">
          Piercing maps
        </Link>
      </div>
    </div>
  );
}
