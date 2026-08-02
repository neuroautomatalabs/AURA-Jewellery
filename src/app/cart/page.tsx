import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Your Aura Jewellery cart — review sizes and return policy, then pay securely with Razorpay.",
};

export default function CartPage() {
  return <CartView />;
}
