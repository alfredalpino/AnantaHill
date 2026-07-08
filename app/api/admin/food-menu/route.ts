import { NextResponse } from 'next/server';
import { db } from '@/db';
import { foodItems } from '@/db/schema';
import { isAdminAuthorized, adminUnauthorizedResponse } from '@/lib/admin/auth';

export async function GET(req: Request) {
  if (!isAdminAuthorized(req)) return adminUnauthorizedResponse();
  const rows = await db.select().from(foodItems).orderBy(foodItems.id);
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  if (!isAdminAuthorized(req)) return adminUnauthorizedResponse();

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const name = String(input.name ?? '').trim();
  const category = String(input.category ?? '').trim();
  const price = Number(input.price ?? 0);
  if (!name || !category || !Number.isFinite(price)) {
    return NextResponse.json({ error: 'name, category and price are required' }, { status: 400 });
  }

  const [created] = await db
    .insert(foodItems)
    .values({
      name,
      category,
      price: price.toFixed(2),
      description: String(input.description ?? '').trim() || null,
      image: String(input.image ?? '').trim() || null,
      isVeg: input.isVeg === undefined ? true : Boolean(input.isVeg),
      isAvailable: input.isAvailable === undefined ? true : Boolean(input.isAvailable),
      taxInclusive: input.taxInclusive === undefined ? false : Boolean(input.taxInclusive),
      isHidden: input.isHidden === undefined ? false : Boolean(input.isHidden),
    })
    .returning();

  return NextResponse.json(created, { status: 201 });
}
