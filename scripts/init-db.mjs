/**
 * Creates the Postgres schema for Aura store data.
 * Usage: DATABASE_URL=postgres://... npm run db:init
 */
import { neon } from "@neondatabase/serverless";

const url =
  process.env.DATABASE_URL?.trim() ||
  process.env.POSTGRES_URL?.trim() ||
  "";

if (!url) {
  console.error("Set DATABASE_URL or POSTGRES_URL first.");
  process.exit(1);
}

const sql = neon(url);
await sql`
  CREATE TABLE IF NOT EXISTS aura_store (
    id TEXT PRIMARY KEY,
    payload JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;
console.log("Postgres schema ready (aura_store table).");
