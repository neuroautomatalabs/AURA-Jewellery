import type { Metadata, Viewport } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Aura Jewellery | Gold & Diamond Piercing Studs",
    template: "%s | Aura Jewellery",
  },
  description:
    "Shop hallmarked gold and certified diamond studs. Explore the animated ear map, filter 18K · 22K · Diamond, and book an appointment.",
};

export const viewport: Viewport = {
  themeColor: "#0b1f5c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="site-shell antialiased">
        <Header />
        <main className="site-main">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
