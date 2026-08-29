import { Header } from "@/components/Header";
import { GoldRateBar } from "@/components/GoldRateBar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { fetchCjaRates } from "@/lib/cja-rates";

export default async function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let initialRates = null;
  try {
    initialRates = await fetchCjaRates();
  } catch {
    // Client falls back to /api/gold-rate and public/gold-rates.json.
  }

  return (
    <>
      <Header>
        <GoldRateBar initialRates={initialRates} />
      </Header>
      <main className="site-main">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
