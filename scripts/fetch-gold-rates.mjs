import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const CJA_URL = "https://coimbatorejewellery.org/";

const LABEL_TO_KEY = {
  "22kt gold rate": "gold22",
  "18kt gold rate": "gold18",
  "silver rate": "silver",
  "8g gold rate": "gold8g",
  "22kt return rate": "return22",
};

function parseAmount(raw) {
  const cleaned = String(raw).replace(/[^\d.]/g, "");
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : 0;
}

function normalizeLabel(label) {
  return String(label).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

async function fetchCjaRates() {
  const res = await fetch(CJA_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; AuraJewellery/1.0; +https://github.com/neuroautomatalabs/AURA-Jewellery)",
      Accept: "text/html,application/xhtml+xml",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`CJA rate fetch failed (${res.status})`);
  }

  const html = await res.text();
  const boxRe =
    /<div class="rate-box">[\s\S]*?<h4>([\s\S]*?)<\/h4>[\s\S]*?<span class="rate-price">([\s\S]*?)<\/span>/gi;

  const rates = [];
  const result = {
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

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "public", "gold-rates.json");

try {
  const rates = await fetchCjaRates();
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, `${JSON.stringify(rates, null, 2)}\n`, "utf8");
  console.log(
    `Wrote ${outPath} · 22K=${rates.gold22} · 18K=${rates.gold18} · updated=${rates.updatedAt ?? "n/a"}`,
  );
} catch (err) {
  console.error("Failed to fetch CJA gold rates:", err);
  // Keep deploy alive if CJA is briefly down — client will show fallback.
  process.exitCode = 0;
}
