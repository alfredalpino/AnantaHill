import { NextResponse } from 'next/server';
import { desc } from 'drizzle-orm';
import { db } from '@/db';
import { userFoodOrders } from '@/db/schema';
import { isAdminAuthorized, adminUnauthorizedResponse } from '@/lib/admin/auth';

export async function GET(req: Request) {
  if (!isAdminAuthorized(req)) return adminUnauthorizedResponse();

  try {
    const orders = await db.select().from(userFoodOrders).orderBy(desc(userFoodOrders.createdAt));
    const formattedOrders = orders.map((order) => ({
      ...order,
      id: `ORD-${order.id}`,
      dbId: order.id,
      items: JSON.parse(order.items),
    }));
    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error('Error fetching admin orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
