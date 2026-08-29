export type CjaRate = {
  key: string;
  label: string;
  amount: number;
};

export type CjaRates = {
  rates: CjaRate[];
  gold22: number | null;
  gold18: number | null;
  silver: number | null;
  gold8g: number | null;
  return22: number | null;
  updatedAt: string | null;
  source: string;
  fetchedAt: string;
};

const CJA_URL = "https://coimbatorejewellery.org/";

const LABEL_TO_KEY: Record<string, keyof Pick<
  CjaRates,
  "gold22" | "gold18" | "silver" | "gold8g" | "return22"
>> = {
  "22kt gold rate": "gold22",
  "18kt gold rate": "gold18",
  "silver rate": "silver",
  "8g gold rate": "gold8g",
  "22kt return rate": "return22",
};

function parseAmount(raw: string): number {
  // CJA prices look like "↓ ₹ 14,505 (-295)" — take the first number group only.
  const match = raw.match(/(\d[\d,]*(?:\.\d+)?)/);
  if (!match) return 0;
  const value = Number(match[1].replace(/,/g, ""));
  return Number.isFinite(value) ? value : 0;
}

function normalizeLabel(label: string): string {
  return label.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

/** Scrape live CJA rates from the association homepage. */
export async function fetchCjaRates(): Promise<CjaRates> {
  const res = await fetch(`${CJA_URL}?_=${Date.now()}`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; AuraJewellery/1.0; +https://aurajewellery.in)",
      Accept: "text/html,application/xhtml+xml",
      "Cache-Control": "no-cache, no-store",
      Pragma: "no-cache",
    },
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`CJA rate fetch failed (${res.status})`);
  }

  const html = await res.text();
  const boxRe =
    /<div class="rate-box">[\s\S]*?<h4>([\s\S]*?)<\/h4>[\s\S]*?<span class="rate-price">([\s\S]*?)<\/span>/gi;

  const rates: CjaRate[] = [];
  const result: CjaRates = {
    rates,
    gold22: null,
    gold18: null,
    silver: null,
    gold8g: null,
    return22: null,
    updatedAt: null,
    source: CJA_URL,
    fetchedAt: new Date().toISOString(),
  };

  for (const match of html.matchAll(boxRe)) {
    const label = normalizeLabel(match[1]);
    const amount = parseAmount(match[2]);
    const key = label.toLowerCase().replace(/\s+/g, "-");
    rates.push({ key, label, amount });

    const mapped = LABEL_TO_KEY[label.toLowerCase()];
    if (mapped) {
      result[mapped] = amount;
    }
  }

  const updateMatch = html.match(/Update Time:\s*([^<]+)/i);
  if (updateMatch) {
    result.updatedAt = updateMatch[1].replace(/\s+/g, " ").trim();
  }

  if (!rates.length) {
    throw new Error("Could not parse gold rates from CJA.");
  }

  return result;
}

export function formatRateInr(amount: number, fractionDigits = 0): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(amount);
}
