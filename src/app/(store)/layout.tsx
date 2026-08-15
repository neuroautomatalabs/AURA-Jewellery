import { Header } from "@/components/Header";
import { GoldRateBar } from "@/components/GoldRateBar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header>
        <GoldRateBar />
      </Header>
      <main className="site-main">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
