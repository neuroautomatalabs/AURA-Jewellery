import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Owner dashboard",
    template: "%s | Aura Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
