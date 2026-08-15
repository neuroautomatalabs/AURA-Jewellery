import { NextResponse } from "next/server";
import {
  adminPasswordConfigured,
  createAdminSession,
  passwordsMatch,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { password?: string; next?: string };
  try {
    body = (await request.json()) as { password?: string; next?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const password = body.password?.trim() ?? "";
  const next = body.next?.startsWith("/admin") ? body.next : "/admin";
  const expected = process.env.ADMIN_PASSWORD?.trim() ?? "";

  if (!adminPasswordConfigured()) {
    return NextResponse.json(
      {
        error:
          "Set ADMIN_PASSWORD in .env.local before signing in to the owner dashboard.",
      },
      { status: 400 },
    );
  }

  if (!password || !passwordsMatch(password, expected)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ ok: true, next });
}
