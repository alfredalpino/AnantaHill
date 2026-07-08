import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { petpoojaStoreState } from '@/db/schema';
import { parseStoreOpen } from '@/lib/petpooja/inbound';
import { verifyPetpoojaCallbackAuth } from '@/lib/petpooja/webhook';

export async function POST(req: Request) {
  const auth = verifyPetpoojaCallbackAuth(req);
  if (!auth.ok) {
    const error = 'error' in auth ? auth.error : 'Unauthorized';
    return NextResponse.json({ error }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  const storeOpen = parseStoreOpen(body);
  if (storeOpen == null) {
    return NextResponse.json({ error: 'Missing store status value in payload' }, { status: 400 });
  }

  const existing = await db.select().from(petpoojaStoreState).limit(1);
  if (existing.length > 0) {
    await db
      .update(petpoojaStoreState)
      .set({
        storeOpen,
        lastPayload: JSON.stringify(body),
        updatedAt: new Date(),
      })
      .where(eq(petpoojaStoreState.id, existing[0].id));
  } else {
    await db.insert(petpoojaStoreState).values({
      storeOpen,
      lastPayload: JSON.stringify(body),
    });
  }

  return NextResponse.json({
    success: true,
    message: 'Store status updated successfully',
    store_open: storeOpen,
  });
}
