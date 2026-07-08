import { spawn } from 'node:child_process';

const command = process.argv.slice(2);

if (command.length === 0) {
  console.error('Usage: node scripts/with-local-database-url.mjs <command ...>');
  process.exit(1);
}

const localDatabaseUrl =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@127.0.0.1:5434/ananta?sslmode=disable';

const child = spawn(command[0], command.slice(1), {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    DATABASE_URL: localDatabaseUrl,
  },
});

child.on('exit', (code) => {
  process.exit(code ?? 1);
});
