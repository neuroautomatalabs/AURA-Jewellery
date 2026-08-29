import { neon } from "@neondatabase/serverless";

const STORE_ROW_ID = "main";

let sql: ReturnType<typeof neon> | null = null;
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

function getSql() {
  const url = databaseUrl();
  if (!url) {
    throw new Error("DATABASE_URL or POSTGRES_URL is not configured.");
  }
  if (!sql) {
    sql = neon(url);
  }
  return sql;
}

export async function ensureSchema() {
  if (!hasDatabase()) return;
  if (!schemaReady) {
    schemaReady = (async () => {
      const query = getSql();
      await query`
        CREATE TABLE IF NOT EXISTS aura_store (
          id TEXT PRIMARY KEY,
          payload JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
    })();
  }
  await schemaReady;
}

export async function withStoreTransaction<T>(
  fn: (payload: unknown | null) => Promise<{ result: T; payload: object }>,
): Promise<T> {
  await ensureSchema();
  const query = getSql();
  const rows = (await query`
    SELECT payload FROM aura_store WHERE id = ${STORE_ROW_ID}
  `) as { payload: unknown }[];
  const { result, payload } = await fn(rows[0]?.payload ?? null);
  const serialized = JSON.stringify(payload);

  if (!rows[0]) {
    await query`
      INSERT INTO aura_store (id, payload)
      VALUES (${STORE_ROW_ID}, ${serialized}::jsonb)
    `;
  } else {
    await query`
      UPDATE aura_store
      SET payload = ${serialized}::jsonb, updated_at = now()
      WHERE id = ${STORE_ROW_ID}
    `;
  }

  return result;
}

export async function readStorePayload() {
  await ensureSchema();
  const query = getSql();
  const rows = (await query`
    SELECT payload FROM aura_store WHERE id = ${STORE_ROW_ID}
  `) as { payload: unknown }[];
  return rows[0]?.payload ?? null;
}
