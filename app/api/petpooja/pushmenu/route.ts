import { handlePushmenu } from '@/app/api/petpooja/handlers';

export async function POST(req: Request) {
  return handlePushmenu(req);
}
