import 'server-only';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString =
  process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@127.0.0.1:5434/ananta?sslmode=disable';

const client = postgres(connectionString, {
  prepare: false,
});

export const db = drizzle(client);
