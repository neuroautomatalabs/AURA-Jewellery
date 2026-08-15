"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CheckoutSuccess() {
  const [paymentId, setPaymentId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [auraOrder, setAuraOrder] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPaymentId(params.get("payment_id") ?? "");
    setOrderId(params.get("order_id") ?? "");
    setAuraOrder(params.get("aura_order") ?? "");
  }, []);

  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6 sm:py-24">
        <div className="surface-card px-6 py-12 sm:px-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-royal-soft">
            <svg
              viewBox="0 0 24 24"
              className="h-7 w-7 fill-none stroke-royal stroke-[2]"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="eyebrow mt-6 text-gold">Checkout</p>
          <h1 className="font-display mt-3 text-4xl text-royal">
            Payment successful
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Thank you for shopping with Aura Jewellery. We have received your
            payment and will confirm your order shortly.
          </p>

          {(paymentId || orderId || auraOrder) && (
            <div className="mt-8 rounded-xl border border-line bg-surface px-4 py-4 text-left text-sm">
              {auraOrder && (
                <p className="text-ink-muted">
                  Order{" "}
                  <span className="font-semibold text-ink">{auraOrder}</span>
                </p>
              )}
              {paymentId && (
                <p className={`${auraOrder ? "mt-2" : ""} text-ink-muted`}>
                  Payment ID{" "}
                  <span className="font-semibold text-ink">{paymentId}</span>
                </p>
              )}
              {orderId && (
                <p className="mt-2 text-ink-muted">
                  Razorpay order{" "}
                  <span className="font-semibold text-ink">{orderId}</span>
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
      </div>
    </div>
  );
}
