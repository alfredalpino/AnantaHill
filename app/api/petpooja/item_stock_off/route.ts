import { handleItemAvailability } from '@/app/api/petpooja/handlers';

export async function POST(req: Request) {
  return handleItemAvailability(req, false);
}
