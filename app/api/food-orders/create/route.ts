import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { petpoojaStoreState, userFoodOrders } from '@/db/schema';
import { computeFoodTotals, type FoodLineItem } from '@/lib/payments/foodPricing';
import { validateOrderableFoodItems } from '@/lib/food/order-validation';
import { createRazorpayAuthHeader, getRazorpayCredentials } from '@/lib/razorpay/server';

type CreatePayload = {
  items: FoodLineItem[];
  roomNumber?: string;
  guestName?: string;
  guestPhone?: string;
  guestEmail?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CreatePayload;
    const rawItems = Array.isArray(body.items) ? body.items : [];
    if (rawItems.length === 0) {
      return NextResponse.json({ error: 'Items required' }, { status: 400 });
    }

    // Cart sends numeric ids; normalize to FoodLineItem (string id).
    const items: FoodLineItem[] = rawItems.map((item) => ({
      id: String((item as FoodLineItem & { id: string | number })?.id ?? '').trim(),
      name: String((item as FoodLineItem)?.name ?? '').trim(),
      quantity: Number((item as FoodLineItem)?.quantity),
      price: Number((item as FoodLineItem)?.price),
    }));

    const storeState = await db.select().from(petpoojaStoreState).limit(1);
    if (storeState[0] && !storeState[0].storeOpen) {
      return NextResponse.json({ error: 'Store is currently closed' }, { status: 503 });
    }

    const invalidItem = items.find(
      (item) =>
        !item.id ||
        !item.name ||
        !Number.isFinite(item.quantity) ||
        item.quantity <= 0 ||
        !Number.isFinite(item.price) ||
        item.price < 0,
    );
    if (invalidItem) {
      return NextResponse.json({ error: 'Invalid items payload' }, { status: 400 });
    }

    const validationError = await validateOrderableFoodItems(items);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 409 });
    }

    const { subtotal, tax, total, totalSubunits } = computeFoodTotals(items);
    const minOrder = Number(process.env.FOOD_MIN_ORDER_INR ?? 0);
    if (Number.isFinite(minOrder) && minOrder > 0 && total < minOrder) {
      return NextResponse.json({ error: `Minimum order is ₹${minOrder}` }, { status: 400 });
    }

    const [created] = await db
      .insert(userFoodOrders)
      .values({
        guestName: body.guestName?.trim() || null,
        guestPhone: body.guestPhone?.trim() || null,
        guestEmail: body.guestEmail?.trim() || null,
        roomNumber: body.roomNumber?.trim() || null,
        items: JSON.stringify(items),
        subtotal: String(subtotal),
        tax: String(tax),
        total: String(total),
        paymentProvider: 'razorpay',
        paymentStatus: 'PENDING',
        posSyncStatus: 'pending',
        status: 'Pending',
      })
      .returning();

    const creds = getRazorpayCredentials();
    if (!creds.ok) {
      const error = 'error' in creds ? creds.error : 'Razorpay keys are not configured.';
      return NextResponse.json({ error }, { status: 500 });
    }

    const orderRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: createRazorpayAuthHeader(creds.keyId, creds.keySecret),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalSubunits,
        currency: 'INR',
        receipt: `an_food_${created.id}`,
        notes: {
          order_type: 'food',
          local_order_id: String(created.id),
        },
      }),
      cache: 'no-store',
    });

    const orderData = await orderRes.json();
    if (!orderRes.ok) {
      return NextResponse.json(
        { error: orderData?.error?.description || 'Failed to create Razorpay order.' },
        { status: 500 },
      );
    }

    await db
      .update(userFoodOrders)
      .set({ paymentOrderId: String(orderData.id) })
      .where(eq(userFoodOrders.id, created.id));

    return NextResponse.json({
      orderId: created.id,
      razorpayOrderId: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
      keyId: creds.keyId,
      subtotal,
      tax,
      total,
    });
  } catch (error) {
    console.error('Error creating food checkout order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
