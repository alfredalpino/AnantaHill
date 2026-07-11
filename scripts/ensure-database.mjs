import { execSync } from 'node:child_process';
import { config } from 'dotenv';
import postgres from 'postgres';
import { applyDatabaseExtras } from './apply-database-extras.mjs';

// On Vercel, only use platform env vars — never a bundled .env file.
if (!process.env.VERCEL) {
  config({ path: '.env' });
  config({ path: '.env.local' });
}

export const DEFAULT_LOCAL_DATABASE_URL =
  'postgresql://postgres:postgres@127.0.0.1:5434/ananta?sslmode=disable';

const DOCKER_COMPOSE_CMD =
  'docker compose -f docker-compose.postgres.yml --env-file docker/postgres.local.env';

const REQUIRED_TABLES = ['food_items', 'food_menu_settings', 'petpooja_store_state', 'food_orders'];

function resolveDatabaseUrl() {
  return process.env.DATABASE_URL?.trim() || DEFAULT_LOCAL_DATABASE_URL;
}

function parseDatabaseUrl(url) {
  const parsed = new URL(url);
  const database = decodeURIComponent(parsed.pathname.replace(/^\//, ''));

  if (!database) {
    throw new Error(`DATABASE_URL is missing a database name: ${url}`);
  }

  return {
    host: parsed.hostname,
    port: parsed.port || '5432',
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database,
  };
}

function buildDatabaseUrl(sourceUrl, parts, databaseName = parts.database) {
  const user = encodeURIComponent(parts.user);
  const password = encodeURIComponent(parts.password);
  const query = new URL(sourceUrl).search;

  return `postgresql://${user}:${password}@${parts.host}:${parts.port}/${databaseName}${query}`;
}

function quoteIdent(identifier) {
  return `"${identifier.replace(/"/g, '""')}"`;
}

function isLocalDatabaseHost(hostname) {
  const host = hostname.toLowerCase();
  return host === 'localhost' || host === '127.0.0.1' || host === '::1' || host === '0.0.0.0';
}

function isLocalDatabaseUrl(url) {
  try {
    return isLocalDatabaseHost(new URL(url).hostname);
  } catch {
    return false;
  }
}

function resolvePostgresClientOptions(url) {
  const parsed = new URL(url);
  const sslmode = parsed.searchParams.get('sslmode')?.toLowerCase();

  return {
    prepare: false,
    connect_timeout: 10,
    max: 1,
    ssl:
      sslmode === 'require' || sslmode === 'verify-full' || sslmode === 'verify-ca'
        ? 'require'
        : process.env.VERCEL && !isLocalDatabaseHost(parsed.hostname)
          ? 'require'
          : undefined,
  };
}

async function withClient(url, callback) {
  const sql = postgres(url, resolvePostgresClientOptions(url));

  try {
    return await callback(sql);
  } finally {
    await sql.end({ timeout: 2 }).catch(() => undefined);
  }
}

async function canConnect(url) {
  try {
    await withClient(url, async (sql) => {
      await sql`SELECT 1`;
    });
    return true;
  } catch {
    return false;
  }
}

function startDockerPostgres() {
  execSync(`${DOCKER_COMPOSE_CMD} up -d --wait`, { stdio: 'inherit' });
}

async function waitForPostgres(url, attempts = 45) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    if (await canConnect(url)) return true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return false;
}

async function ensureDatabaseExists(sourceUrl, parts) {
  const adminUrl = buildDatabaseUrl(sourceUrl, parts, 'postgres');

  await withClient(adminUrl, async (sql) => {
    const existing = await sql`
      SELECT 1
      FROM pg_database
      WHERE datname = ${parts.database}
      LIMIT 1
    `;

    if (existing.length > 0) {
      console.log(`[db] Database "${parts.database}" already exists.`);
      return;
    }

    console.log(`[db] Creating database "${parts.database}"...`);
    await sql.unsafe(`CREATE DATABASE ${quoteIdent(parts.database)}`);
  });
}

function pushSchema(url) {
  console.log('[db] Applying schema with drizzle-kit push...');
  execSync('npx drizzle-kit push --force', {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: url,
    },
  });
}

async function verifySchema(url) {
  await withClient(url, async (sql) => {
    const rows = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = ANY(${REQUIRED_TABLES})
    `;

    const found = new Set(rows.map((row) => row.table_name));
    const missing = REQUIRED_TABLES.filter((table) => !found.has(table));

    if (missing.length > 0) {
      throw new Error(`Missing required tables after migration: ${missing.join(', ')}`);
    }
  });
}

export async function ensureLocalDatabase(databaseUrl = resolveDatabaseUrl()) {
  const parts = parseDatabaseUrl(databaseUrl);
  const adminUrl = buildDatabaseUrl(databaseUrl, parts, 'postgres');

  let connected = await canConnect(databaseUrl);

  if (!connected) {
    const adminConnected = await canConnect(adminUrl);

    if (!adminConnected) {
      console.log('[db] Starting local Postgres with Docker...');
      try {
        startDockerPostgres();
      } catch {
        console.error('[db] Could not start Docker Postgres. Install and open Docker Desktop, then run npm run dev again.');
        process.exit(1);
      }

      const ready = await waitForPostgres(adminUrl);
      if (!ready) {
        console.error('[db] Postgres did not become ready in time.');
        process.exit(1);
      }
    }

    await ensureDatabaseExists(databaseUrl, parts);
    connected = await canConnect(databaseUrl);

    if (!connected) {
      const ready = await waitForPostgres(databaseUrl);
      if (!ready) {
        console.error(`[db] Could not connect to database "${parts.database}".`);
        process.exit(1);
      }
    }
  }

  pushSchema(databaseUrl);
  await applyDatabaseExtras(databaseUrl);
  await verifySchema(databaseUrl);

  console.log('[db] Ready at', databaseUrl);
  return databaseUrl;
}

export async function ensureCloudDatabase(databaseUrl) {
  console.log('[db] Verifying cloud database (schema is managed via Supabase MCP)...');

  if (isLocalDatabaseUrl(databaseUrl)) {
    throw new Error(
      'DATABASE_URL on Vercel points to localhost. Replace it with a cloud Postgres URL (Supabase).',
    );
  }

  const connected = await canConnect(databaseUrl);
  if (!connected) {
    throw new Error(
      'Could not connect to DATABASE_URL on Vercel. Check the connection string (URL-encode special characters in the password), and use the Supabase transaction pooler URI with sslmode=require.',
    );
  }

  // Never run drizzle-kit push on Vercel — it hangs against Supabase poolers.
  // Schema is applied via Supabase MCP / migrations.
  await verifySchema(databaseUrl);

  console.log('[db] Cloud database verified.');
  return databaseUrl;
}

async function main() {
  const databaseUrl = resolveDatabaseUrl();

  if (process.env.VERCEL) {
    if (!process.env.DATABASE_URL?.trim()) {
      console.log('[db] No DATABASE_URL on Vercel; skipping cloud schema setup.');
      return;
    }

    await ensureCloudDatabase(databaseUrl);
    return;
  }

  await ensureLocalDatabase(databaseUrl);
}

if (process.argv[1]?.endsWith('ensure-database.mjs')) {
  main().catch((error) => {
    console.error('[db] Failed to prepare database:', error);
    process.exit(1);
  });
}
