/**
 * Creates the Postgres schema for Aura store data.
 * Usage: DATABASE_URL=postgres://... npm run db:init
 */
import { Pool, neonConfig } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.error("Set DATABASE_URL first.");
  process.exit(1);
}

neonConfig.fetchConnectionCache = true;
const pool = new Pool({ connectionString: url });
const client = await pool.connect();

try {
  await client.query(`
    CREATE TABLE IF NOT EXISTS aura_store (
      id TEXT PRIMARY KEY,
      payload JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);
  console.log("Postgres schema ready (aura_store table).");
} finally {
  client.release();
  await pool.end();
}
