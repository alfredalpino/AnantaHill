import { handleMenufetch } from '@/app/api/petpooja/handlers';

export async function POST(req: Request) {
  return handleMenufetch(req);
}
