import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { petpoojaStoreState } from '@/db/schema';
import { getFoodMenuForDisplay } from '@/lib/food/menu-server';

export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest) {
  try {
    const items = await getFoodMenuForDisplay();
    const storeState = await db.select().from(petpoojaStoreState).limit(1);
    return NextResponse.json({
      items,
      storeOpen: storeState[0]?.storeOpen ?? true,
      syncedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching food items:', error);
    return NextResponse.json({ error: 'Failed to fetch food items' }, { status: 500 });
  }
}
