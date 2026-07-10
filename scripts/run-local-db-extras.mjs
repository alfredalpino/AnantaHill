import { config } from 'dotenv';
import { applyDatabaseExtras } from './apply-database-extras.mjs';

config({ path: '.env' });
config({ path: '.env.local' });

const databaseUrl =
  process.env.DATABASE_URL?.trim() ||
  'postgresql://postgres:postgres@127.0.0.1:5434/ananta?sslmode=disable';

await applyDatabaseExtras(databaseUrl);
console.log('[db] Database extras applied.');
