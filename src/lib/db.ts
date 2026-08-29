import { Pool, neonConfig } from "@neondatabase/serverless";

const STORE_ROW_ID = "main";

let pool: Pool | null = null;
let schemaReady: Promise<void> | null = null;

export function databaseUrl() {
  return (
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim() ||
    ""
  );
}

export function hasDatabase() {
  return Boolean(databaseUrl());
}

function getPool() {
  const url = databaseUrl();
  if (!url) {
    throw new Error("DATABASE_URL or POSTGRES_URL is not configured.");
  }
  if (!pool) {
    neonConfig.fetchConnectionCache = true;
    pool = new Pool({ connectionString: url });
  }
  return pool;
}

export async function ensureSchema() {
  if (!hasDatabase()) return;
  if (!schemaReady) {
    schemaReady = (async () => {
      const client = await getPool().connect();
      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS aura_store (
            id TEXT PRIMARY KEY,
            payload JSONB NOT NULL,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
          )
        `);
      } finally {
        client.release();
      }
    })();
  }
  await schemaReady;
}

export async function withStoreTransaction<T>(
  fn: (payload: unknown | null) => Promise<{ result: T; payload: object }>,
): Promise<T> {
  await ensureSchema();
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const existing = await client.query<{ payload: unknown }>(
      "SELECT payload FROM aura_store WHERE id = $1 FOR UPDATE",
      [STORE_ROW_ID],
    );
    const { result, payload } = await fn(existing.rows[0]?.payload ?? null);
    if (existing.rows.length === 0) {
      await client.query(
        "INSERT INTO aura_store (id, payload) VALUES ($1, $2::jsonb)",
        [STORE_ROW_ID, JSON.stringify(payload)],
      );
    } else {
      await client.query(
        "UPDATE aura_store SET payload = $1::jsonb, updated_at = now() WHERE id = $2",
        [JSON.stringify(payload), STORE_ROW_ID],
      );
    }
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function readStorePayload() {
  await ensureSchema();
  const client = await getPool().connect();
  try {
    const result = await client.query<{ payload: unknown }>(
      "SELECT payload FROM aura_store WHERE id = $1",
      [STORE_ROW_ID],
    );
    return result.rows[0]?.payload ?? null;
  } finally {
    client.release();
  }
}
