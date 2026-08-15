import { LoginForm } from "@/app/admin/_components/LoginForm";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Owner sign in",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-royal-deep px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[var(--shadow-lift)] sm:p-8">
        <p className="eyebrow text-gold">Aura Jewellery</p>
        <h1 className="font-display mt-2 text-3xl text-royal">Owner dashboard</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Sign in to manage products, orders, appointments and custom requests.
        </p>
        <div className="mt-6">
          <Suspense fallback={<p className="text-sm text-ink-muted">Loading…</p>}>
            <LoginForm next="/admin" />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
