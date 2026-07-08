import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { foodItems } from '@/db/schema';
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
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
  const input = body as Record<string, unknown>;

  const patch: Record<string, unknown> = { updatedAt: new Date() };
  if (typeof input.name === 'string') patch.name = input.name.trim();
  if (typeof input.description === 'string') patch.description = input.description.trim();
  if (typeof input.category === 'string') patch.category = input.category.trim();
  if (input.price !== undefined && Number.isFinite(Number(input.price))) {
    patch.price = Number(input.price).toFixed(2);
  }
  if (typeof input.image === 'string') patch.image = input.image.trim();
  if (typeof input.isVeg === 'boolean') patch.isVeg = input.isVeg;
  if (typeof input.isAvailable === 'boolean') patch.isAvailable = input.isAvailable;
  if (typeof input.taxInclusive === 'boolean') patch.taxInclusive = input.taxInclusive;
  if (typeof input.isHidden === 'boolean') patch.isHidden = input.isHidden;
  if (typeof input.adminAvailabilityOverride === 'boolean') {
    patch.adminAvailabilityOverride = input.adminAvailabilityOverride;
  }
  if (typeof input.adminSuppressed === 'boolean') patch.adminSuppressed = input.adminSuppressed;

  const [updated] = await db
    .update(foodItems)
    .set(patch)
    .where(eq(foodItems.id, idNum))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: 'Food item not found' }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: Params) {
  if (!isAdminAuthorized(req)) return adminUnauthorizedResponse();
  const { id } = await params;
  const idNum = Number.parseInt(id, 10);
  if (!Number.isFinite(idNum)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const [updated] = await db
    .update(foodItems)
    .set({ adminSuppressed: true, isHidden: true, updatedAt: new Date() })
    .where(eq(foodItems.id, idNum))
    .returning({ id: foodItems.id });

  if (!updated) {
    return NextResponse.json({ error: 'Food item not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
