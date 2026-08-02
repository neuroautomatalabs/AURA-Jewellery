import type { Metadata } from "next";
import { CheckoutSuccess } from "@/components/CheckoutSuccess";

export const metadata: Metadata = {
  title: "Payment successful",
  description: "Your Aura Jewellery order payment was received.",
};

type Props = {
  searchParams: Promise<{ payment_id?: string; order_id?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <CheckoutSuccess
      paymentId={params.payment_id ?? ""}
      orderId={params.order_id ?? ""}
    />
  );
}
