import { NextResponse } from 'next/server';
import { db } from '@/db';
import { petpoojaStoreState } from '@/db/schema';
import { verifyPetpoojaCallbackAuth } from '@/lib/petpooja/webhook';

export async function GET(req: Request) {
  const auth = verifyPetpoojaCallbackAuth(req);
  if (!auth.ok) {
    const error = 'error' in auth ? auth.error : 'Unauthorized';
    return NextResponse.json({ error }, { status: 401 });
  }

  const existing = await db.select().from(petpoojaStoreState).limit(1);
  const storeOpen = existing[0]?.storeOpen ?? true;

  return NextResponse.json({
    success: true,
    http_code: 200,
    status: 'success',
    store_open: storeOpen,
    store_status: storeOpen ? '1' : '0',
    message: 'Store Delivery Status fetched successfully',
  });
}

export async function POST(req: Request) {
  return GET(req);
}
