import { spawn } from 'node:child_process';
import { DEFAULT_LOCAL_DATABASE_URL, ensureLocalDatabase } from './ensure-database.mjs';

console.log('');
console.log('Ananta dev');
console.log('----------');
console.log('[dev] Bootstrapping local Postgres + schema (no Neon/Supabase required)...');

process.env.DATABASE_URL = DEFAULT_LOCAL_DATABASE_URL;

await ensureLocalDatabase(DEFAULT_LOCAL_DATABASE_URL);

console.log('[dev] Starting Next.js at http://localhost:3000');
console.log('');

const child = spawn('npx', ['next', 'dev'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    DATABASE_URL: DEFAULT_LOCAL_DATABASE_URL,
  },
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
