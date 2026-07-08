import { NextResponse, after } from 'next/server';
import { inArray } from 'drizzle-orm';
import { db } from '@/db';
import { foodItems } from '@/db/schema';
import { parseItemIds } from '@/lib/petpooja/inbound';
import { verifyPetpoojaCallbackAuth } from '@/lib/petpooja/webhook';
import { syncPetpoojaMenuPayload } from '@/lib/petpooja/menu-sync';

function unauthorizedOrOk(req: Request): NextResponse | null {
  const auth = verifyPetpoojaCallbackAuth(req);
  if (!auth.ok) {
    const error = 'error' in auth ? auth.error : 'Unauthorized';
    return NextResponse.json({ error }, { status: 401 });
  }
  return null;
}

function itemStockSuccessResponse(message: string, extra: Record<string, unknown> = {}) {
  return NextResponse.json({
    code: 200,
    status: 'success',
    message,
    ...extra,
  });
}

function itemStockFailureResponse(message: string, statusCode = 400) {
  return NextResponse.json(
    {
      code: statusCode,
      status: 'failed',
      message,
    },
    { status: statusCode },
  );
}

export async function handlePushmenu(req: Request) {
  const denied = unauthorizedOrOk(req);
  if (denied) return denied;

  const payload = await req.json().catch(() => null);
  if (!payload) {
    return NextResponse.json({ success: '0', message: 'Menu sync failed' }, { status: 400 });
  }

  after(async () => {
    try {
      const stats = await syncPetpoojaMenuPayload(payload);
      console.info('Petpooja pushmenu sync completed', stats);
    } catch (error) {
      console.error('Petpooja pushmenu background sync failed', {
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  return NextResponse.json({
    success: '1',
    message: 'Menu items are successfully listed.',
  });
}

export async function handleItemAvailability(req: Request, defaultIsAvailable: boolean) {
  const denied = unauthorizedOrOk(req);
  if (denied) return denied;

  const payload = await req.json().catch(() => null);
  if (!payload) {
    return itemStockFailureResponse('Invalid JSON payload');
  }

  const payloadRecord = payload as Record<string, unknown>;
  let isAvailable = defaultIsAvailable;
  if (typeof payloadRecord.inStock === 'boolean') {
    isAvailable = payloadRecord.inStock;
  } else if (typeof payloadRecord.inStock === 'string') {
    const normalized = payloadRecord.inStock.trim().toLowerCase();
    if (['true', '1', 'yes', 'on'].includes(normalized)) isAvailable = true;
    if (['false', '0', 'no', 'off'].includes(normalized)) isAvailable = false;
  }

  const itemIds = parseItemIds(payload);
  if (itemIds.length === 0) {
    return itemStockFailureResponse('No item ids found in payload');
  }

  const numericIds = itemIds
    .map((id) => Number(id))
    .filter((n) => Number.isFinite(n))
    .map((n) => Math.trunc(n));

  const externalMatches = await db
    .update(foodItems)
    .set({ isAvailable, updatedAt: new Date() })
    .where(inArray(foodItems.petpoojaItemId, itemIds))
    .returning({ id: foodItems.id });

  let idMatches: Array<{ id: number }> = [];
  if (numericIds.length > 0) {
    idMatches = await db
      .update(foodItems)
      .set({ isAvailable, updatedAt: new Date() })
      .where(inArray(foodItems.id, numericIds))
      .returning({ id: foodItems.id });
  }

  const updatedIds = Array.from(new Set([...externalMatches, ...idMatches].map((r) => r.id)));

  return itemStockSuccessResponse('Stock status updated successfully', {
    success: true,
    in_stock: isAvailable,
    requestedItemIds: itemIds,
    updatedCount: updatedIds.length,
    updatedIds,
  });
}

export async function handleMenufetch(req: Request) {
  const denied = unauthorizedOrOk(req);
  if (denied) return denied;

  const menuRows = await db.select().from(foodItems).orderBy(foodItems.id);
  const menu = menuRows.map((item) => ({
    item_id: item.petpoojaItemId || String(item.id),
    local_id: String(item.id),
    item_name: item.name,
    category: item.category,
    price: Number(item.price),
    is_veg: Boolean(item.isVeg),
    in_stock: Boolean(item.isAvailable),
    tax_inclusive: Boolean(item.taxInclusive),
  }));

  return NextResponse.json({
    success: true,
    menu_count: menu.length,
    menu,
  });
}
