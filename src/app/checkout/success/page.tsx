import type { Metadata } from "next";
import { CheckoutSuccess } from "@/components/CheckoutSuccess";

export const metadata: Metadata = {
  title: "Payment successful",
  description: "Your Aura Jewellery order payment was received.",
};

export default function CheckoutSuccessPage() {
  return <CheckoutSuccess />;
}
