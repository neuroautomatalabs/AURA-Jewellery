import { Header } from "@/components/Header";
import { GoldRateBar } from "@/components/GoldRateBar";
import { GoldRatesProvider } from "@/components/GoldRatesProvider";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { fetchCjaRates } from "@/lib/cja-rates";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
    <GoldRatesProvider initialRates={initialRates}>
      <Header>
        <GoldRateBar />
      </Header>
      <main className="site-main">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </GoldRatesProvider>
  );
}
