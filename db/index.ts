import 'server-only';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString =
  process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@127.0.0.1:5434/ananta?sslmode=disable';

function resolveSsl(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    const sslmode = parsed.searchParams.get('sslmode')?.toLowerCase();
    const isLocal = host === 'localhost' || host === '127.0.0.1' || host === '::1';
    if (sslmode === 'disable') return undefined;
    if (sslmode === 'require' || sslmode === 'verify-full' || sslmode === 'verify-ca') return 'require' as const;
    if (!isLocal && (host.includes('supabase.co') || host.includes('pooler.supabase.com') || process.env.VERCEL)) {
      return 'require' as const;
    }
  } catch {
    // fall through
  }
  return undefined;
}

const client = postgres(connectionString, {
  prepare: false,
  ssl: resolveSsl(connectionString),
});

export const db = drizzle(client);
