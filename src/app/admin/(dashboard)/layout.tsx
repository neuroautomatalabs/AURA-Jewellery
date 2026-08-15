import { AdminSidebar } from "@/app/admin/_components/AdminSidebar";
import { AdminGate } from "@/app/admin/_components/AdminGate";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGate>
      <div className="min-h-dvh bg-surface">
        <AdminSidebar />
        <div className="lg:pl-64">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
            <Suspense
              fallback={
                <p className="text-sm text-ink-muted">Loading…</p>
              }
            >
              {children}
            </Suspense>
          </div>
        </div>
      </div>
    </AdminGate>
  );
}
