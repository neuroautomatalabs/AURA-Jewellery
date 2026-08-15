import { NextResponse } from "next/server";
import {
  adminPasswordConfigured,
  isAdmin,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: await isAdmin(),
    configured: adminPasswordConfigured(),
  });
}
