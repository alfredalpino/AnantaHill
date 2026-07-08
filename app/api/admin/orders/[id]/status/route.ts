import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { userFoodOrders } from '@/db/schema';
import { isAdminAuthorized, adminUnauthorizedResponse } from '@/lib/admin/auth';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Params) {
  if (!isAdminAuthorized(req)) return adminUnauthorizedResponse();
  const { id } = await params;
  const idNum = Number.parseInt(id, 10);
  if (!Number.isFinite(idNum)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  const status = String((body as Record<string, unknown>)?.status ?? '').trim();
  if (!status) {
    return NextResponse.json({ error: 'status is required' }, { status: 400 });
  }

  const [updated] = await db
    .update(userFoodOrders)
    .set({ status })
    .where(eq(userFoodOrders.id, idNum))
    .returning();
  if (!updated) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  return NextResponse.json(updated);
}
