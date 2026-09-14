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
      <div className="admin-shell min-h-dvh bg-surface">
        <AdminSidebar />
        <div className="lg:pl-60">
          <div className="mx-auto max-w-6xl px-3 py-4 sm:px-5 sm:py-6 lg:px-6 lg:py-8">
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
