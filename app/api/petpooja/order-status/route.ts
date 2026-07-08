import { NextResponse } from 'next/server';
import { db } from '@/db';
import { userFoodOrders } from '@/db/schema';
import { eq } from 'drizzle-orm';
import {
  extractPetpoojaOrderReference,
  mapPetpoojaStatusToLocal,
  parseLocalFoodOrderIdFromReference,
  verifyPetpoojaCallbackAuth,
} from '@/lib/petpooja/webhook';

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

  const orderReference = extractPetpoojaOrderReference(body);
  if (!orderReference) {
    return NextResponse.json({ error: 'Missing order reference in payload' }, { status: 400 });
  }

  const localOrderId = parseLocalFoodOrderIdFromReference(orderReference);
  if (!localOrderId) {
    return NextResponse.json(
      { error: 'Unknown order reference format', reference: orderReference },
      { status: 400 },
    );
  }

  const rawStatus =
    (body as Record<string, unknown>).status ??
    (body as Record<string, unknown>).order_status ??
    ((body as Record<string, unknown>).order &&
    typeof (body as Record<string, unknown>).order === 'object'
      ? ((body as Record<string, unknown>).order as Record<string, unknown>).status
      : null);

  const mappedStatus = mapPetpoojaStatusToLocal(rawStatus);

  const updated = await db
    .update(userFoodOrders)
    .set({ status: mappedStatus, posOrderStatus: String(rawStatus ?? '') })
    .where(eq(userFoodOrders.id, localOrderId))
    .returning({ id: userFoodOrders.id, status: userFoodOrders.status });

  if (updated.length === 0) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    orderReference,
    mappedStatus,
    order: updated[0],
  });
}
