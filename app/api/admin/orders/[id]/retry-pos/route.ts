import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { userFoodOrders } from '@/db/schema';
import { isAdminAuthorized, adminUnauthorizedResponse } from '@/lib/admin/auth';
import { relayOrderToPetpooja } from '@/lib/petpooja/server';

type Params = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: Params) {
  if (!isAdminAuthorized(req)) return adminUnauthorizedResponse();
  const { id } = await params;
  const idNum = Number.parseInt(id, 10);
  if (!Number.isFinite(idNum)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const orders = await db.select().from(userFoodOrders).where(eq(userFoodOrders.id, idNum)).limit(1);
  if (orders.length === 0) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  const order = orders[0];
  const items = JSON.parse(order.items) as Array<{ id: string; name: string; quantity: number; price: number }>;
  const prefix = (process.env.PETPOOJA_ORDER_ID_PREFIX ?? 'AN-FOOD').trim();
  const posOrderId = order.posOrderId || `${prefix}-${order.id}`;
  const relay = await relayOrderToPetpooja({
    orderId: posOrderId,
    items,
    subtotal: Number(order.subtotal),
    tax: Number(order.tax),
    total: Number(order.total),
    guest: {
      name: order.guestName,
      phone: order.guestPhone,
      email: order.guestEmail,
      roomNumber: order.roomNumber,
    },
  });
  const relayError = 'error' in relay ? relay.error : null;

  const [updated] = await db
    .update(userFoodOrders)
    .set({
      posOrderId,
      posSyncStatus: relay.ok ? 'synced' : 'failed',
      posSyncMessage: relay.ok
        ? `Petpooja accepted order (HTTP ${relay.status})`
        : `Petpooja sync failed (HTTP ${relay.status}): ${relayError}`,
      errorMessage: relayError,
    })
    .where(eq(userFoodOrders.id, idNum))
    .returning();

  return NextResponse.json({
    success: relay.ok,
    order: updated,
    petpooja: relay,
  });
}
