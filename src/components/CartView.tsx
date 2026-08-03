"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { formatPrice, getProduct } from "@/data/products";
import { RETURN_POLICY } from "@/lib/return-policy";
import { loadRazorpayScript } from "@/lib/razorpay-client";
import type { Product, CartItem } from "@/lib/types";

type Line = { item: CartItem; product: Product };

export function CartView() {
  const router = useRouter();
  const { items, updateQty, removeItem, clear, count } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lines: Line[] = [];
  for (const item of items) {
    const product = getProduct(item.productId);
    if (product) lines.push({ item, product });
  }

  const subtotal = lines.reduce(
    (sum, { item, product }) => sum + product.price * item.qty,
    0,
  );

  async function startCheckout() {
    setError(null);

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("Please enter your name, email and phone before paying.");
      return;
    }

    setPaying(true);
    try {
      const orderRes = await fetch("/api/checkout/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: {
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
          },
        }),
      });

      const orderData = (await orderRes.json()) as {
        error?: string;
        orderId?: string;
        amount?: number;
        currency?: string;
        keyId?: string;
      };

      if (!orderRes.ok || !orderData.orderId || !orderData.keyId) {
        setError(orderData.error ?? "Could not start payment.");
        setPaying(false);
        return;
      }

      const ready = await loadRazorpayScript();
      if (!ready || !window.Razorpay) {
        setError("Payment widget failed to load. Please refresh and try again.");
        setPaying(false);
        return;
      }

      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount!,
        currency: orderData.currency ?? "INR",
        name: "Aura Jewellery",
        description: `Order · ${count} item${count === 1 ? "" : "s"}`,
        order_id: orderData.orderId,
        prefill: {
          name: name.trim(),
          email: email.trim(),
          contact: phone.trim(),
        },
        theme: { color: "#0b1f5c" },
        handler: async (response) => {
          try {
            const verifyRes = await fetch("/api/checkout/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = (await verifyRes.json()) as {
              success?: boolean;
              paymentId?: string;
              error?: string;
            };

            if (!verifyRes.ok || !verifyData.success) {
              setError(
                verifyData.error ??
                  "Payment received but verification failed. Contact the studio with your payment ID.",
              );
              return;
            }

            clear();
            const params = new URLSearchParams({
              payment_id: verifyData.paymentId ?? response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
            });
            router.push(`/checkout/success?${params.toString()}`);
          } catch {
            setError(
              "Payment may have succeeded but we could not verify it. Please contact the studio.",
            );
          } finally {
            setPaying(false);
          }
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
      });

      rzp.on("payment.failed", () => {
        setError("Payment failed or was cancelled. You can try again.");
        setPaying(false);
      });

      rzp.open();
    } catch {
      setError("Something went wrong starting checkout. Please try again.");
      setPaying(false);
    }
  }

  if (count === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <p className="eyebrow text-gold">Cart</p>
        <h1 className="font-display mt-3 text-4xl text-royal">
          Your cart is empty
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Browse the collection or tap a placement on the piercing map.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn-primary">
            Shop collection
          </Link>
          <Link href="/piercings" className="btn-gold">
            Piercing maps
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface">
      <div className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-4xl flex-wrap items-end justify-between gap-3 px-4 py-10 sm:px-6 sm:py-12">
          <div>
            <p className="eyebrow text-gold">Cart</p>
            <h1 className="font-display mt-2 text-3xl text-royal sm:text-4xl">
              {count} item{count === 1 ? "" : "s"}
            </h1>
          </div>
          <button
            type="button"
            onClick={clear}
            className="text-sm font-semibold text-ink-muted underline-offset-4 transition hover:text-royal hover:underline"
          >
            Clear cart
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <ul className="space-y-4">
        {lines.map(({ item, product }) => (
          <li
            key={`${item.productId}-${item.size ?? "default"}`}
            className="flex gap-4 rounded-2xl border border-line bg-white p-3.5 shadow-[var(--shadow-soft)] sm:p-4"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface sm:h-28 sm:w-28">
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.image}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </Link>
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <Link
                href={`/products/${product.id}`}
                className="font-display text-lg leading-snug text-royal transition hover:text-royal-mid"
              >
                {product.name}
              </Link>
              {item.size && (
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Size · {item.size}
                </p>
              )}
              <p className="mt-1 text-base font-bold text-royal">
                {formatPrice(product.price, product.currency)}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
                <div className="inline-flex items-center rounded-full border border-line bg-surface">
                  <button
                    type="button"
                    className="px-3 py-1.5 text-sm font-bold transition hover:text-royal"
                    aria-label="Decrease quantity"
                    onClick={() =>
                      updateQty(item.productId, item.size, item.qty - 1)
                    }
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    className="px-3 py-1.5 text-sm font-bold transition hover:text-royal"
                    aria-label="Increase quantity"
                    onClick={() =>
                      updateQty(item.productId, item.size, item.qty + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId, item.size)}
                  className="text-xs font-semibold text-ink-muted transition hover:text-royal"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl border border-line bg-white p-5 shadow-[var(--shadow-soft)] sm:p-7">
        <div className="flex items-center justify-between">
          <span className="text-sm text-ink-muted">Subtotal</span>
          <span className="font-display text-2xl text-royal">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="mt-6 space-y-3 border-t border-line pt-6">
          <p className="field-label mb-0">Checkout details</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="field-label">Full name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="field-input"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="field-label">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="field-input"
                placeholder="you@email.com"
              />
            </label>
            <label className="block">
              <span className="field-label">Phone</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                className="field-input"
                placeholder="+91 …"
              />
            </label>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-line bg-surface px-4 py-3.5">
          <p className="text-sm font-semibold text-royal">Return policy</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            {RETURN_POLICY.summary}
          </p>
          <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-ink-muted">
            {RETURN_POLICY.points.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800"
          >
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={startCheckout}
          disabled={paying}
          className="btn-primary mt-5 w-full"
        >
          {paying ? "Opening payment…" : `Pay ${formatPrice(subtotal)}`}
        </button>
        <p className="mt-3 text-center text-[11px] text-ink-muted">
          Secure checkout via Razorpay · UPI, cards &amp; netbanking
        </p>
        <Link
          href="/shop"
          className="mt-3 block text-center text-sm font-semibold text-royal underline-offset-4 transition hover:underline"
        >
          Continue shopping
        </Link>
      </div>
      </div>
    </div>
  );
}
