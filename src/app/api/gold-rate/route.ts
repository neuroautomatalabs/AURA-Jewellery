import { NextResponse } from "next/server";
import { fetchCjaRates } from "@/lib/cja-rates";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rates = await fetchCjaRates();
    return NextResponse.json(rates, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err) {
    console.error("Gold rate scrape failed", err);
    return NextResponse.json(
      {
        error:
          "Live gold rates are temporarily unavailable. Please try again shortly.",
      },
      { status: 502 },
    );
  }
}
